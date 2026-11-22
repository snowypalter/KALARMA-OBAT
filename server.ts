import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { GoogleGenAI, ThinkingLevel, type Content, type GenerateContentResponse } from '@google/genai';
import { knowledgeBase } from './server/knowledgeBase.ts';

const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY_MISSING');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

interface IncomingMessage {
  role: 'user' | 'model';
  text: string;
}

function buildSanitizedHistory(messages: IncomingMessage[]): Content[] {
  const cleaned: Content[] = [];
  for (const msg of messages) {
    const text = (msg.text || '').trim();
    if (!text) continue;
    if (cleaned.length === 0 && msg.role !== 'user') continue;

    const lastRole = cleaned.length > 0 ? cleaned[cleaned.length - 1].role : null;
    if (lastRole === msg.role) {
      const prevParts = cleaned[cleaned.length - 1].parts ?? [];
      const prevText = prevParts[0]?.text ?? '';
      cleaned[cleaned.length - 1] = {
        role: msg.role,
        parts: [{ text: `${prevText}\n\n${text}` }],
      };
    } else {
      cleaned.push({
        role: msg.role,
        parts: [{ text }],
      });
    }
  }

  if (cleaned.length > 0 && cleaned[cleaned.length - 1].role === 'user') {
    cleaned.pop();
  }
  return cleaned;
}

function formatGeminiError(err: unknown): { status: number; message: string } {
  let raw = err instanceof Error ? err.message : String(err);

  // Parse escaped raw JSON error strings if present
  try {
    const parsed = JSON.parse(raw);
    if (parsed.error?.message) {
      try {
        const inner = JSON.parse(parsed.error.message);
        if (inner.error?.message) {
          raw = inner.error.message;
        } else {
          raw = parsed.error.message;
        }
      } catch {
        raw = parsed.error.message;
      }
    }
  } catch {
    // not json, keep raw string
  }

  if (raw.includes('GEMINI_API_KEY_MISSING')) {
    return {
      status: 500,
      message: 'API key Gemini belum dikonfigurasi pada server. Silakan periksa berkas .env.',
    };
  }
  if (raw.includes('PERMISSION_DENIED') || raw.includes('API_KEY_INVALID') || raw.includes('403') || raw.includes('400')) {
    return {
      status: 400,
      message: 'Kunci API Gemini tidak valid atau izin akses ditolak. Periksa API key Anda.',
    };
  }
  if (raw.includes('RESOURCE_EXHAUSTED') || raw.includes('429')) {
    return {
      status: 429,
      message: 'Batas kuota harian/menit API Gemini sementara tercapai. Silakan coba kembali dalam beberapa saat.',
    };
  }
  if (raw.includes('503') || raw.includes('UNAVAILABLE') || raw.includes('high demand') || raw.includes('overloaded')) {
    return {
      status: 503,
      message: 'Layanan model AI Google sedang mengalami lonjakan antrean tinggi (High Demand). Silakan kirim ulang pertanyaan Anda atau gunakan Mode Cepat.',
    };
  }
  if (raw.includes('NOT_FOUND') || raw.includes('404')) {
    return {
      status: 404,
      message: 'Model Gemini yang diminta tidak ditemukan atau tidak didukung pada versi API saat ini.',
    };
  }
  return {
    status: 500,
    message: `Terjadi kendala saat memproses jawaban AI: ${raw}`,
  };
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '50mb' }));

  await knowledgeBase.ensureInitialized();

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, summary: knowledgeBase.getSummary() });
  });

  app.get('/api/knowledge', async (_req, res) => {
    try {
      await knowledgeBase.ensureInitialized();
      res.json(knowledgeBase.getSummary());
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Gagal memuat ringkasan sumber pengetahuan.',
      });
    }
  });

  app.post('/api/knowledge/reload', async (_req, res) => {
    try {
      const summary = await knowledgeBase.reload();
      res.json(summary);
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Gagal memuat ulang folder sumber buku.',
      });
    }
  });

  app.post('/api/knowledge/upload', async (req, res) => {
    try {
      const { fileName, base64Data } = req.body as { fileName?: string; base64Data?: string };
      if (!fileName || !base64Data) {
        res.status(400).json({ error: 'fileName dan base64Data wajib disertakan.' });
        return;
      }

      const ext = path.extname(fileName).toLowerCase();
      if (!['.zip', '.pdf', '.txt', '.md', '.csv', '.json', '.html', '.htm'].includes(ext)) {
        res.status(400).json({
          error: 'Format file tidak didukung. Gunakan file .zip, .pdf, .txt, atau .md.',
        });
        return;
      }

      const buffer = Buffer.from(base64Data, 'base64');
      if (buffer.length === 0) {
        res.status(400).json({ error: 'File kosong atau rusak.' });
        return;
      }

      const summary = await knowledgeBase.ingestUploadedFile(fileName, buffer);
      res.json(summary);
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Gagal memproses file sumber buku.',
      });
    }
  });

  app.delete('/api/knowledge/:fileName', async (req, res) => {
    try {
      const summary = await knowledgeBase.deleteUploadedBook(req.params.fileName);
      res.json(summary);
    } catch (err) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Gagal menghapus file buku.',
      });
    }
  });

  app.post('/api/chat', async (req, res) => {
    try {
      await knowledgeBase.ensureInitialized();

      const {
        messages = [],
        activeTab = 'beranda',
        speedMode = 'standar',
      } = req.body as {
        messages?: IncomingMessage[];
        activeTab?: string;
        speedMode?: 'standar' | 'cepat';
      };

      const latestUserMessage = [...messages].reverse().find((m) => m.role === 'user')?.text?.trim();
      if (!latestUserMessage) {
        res.status(400).json({ error: 'Pesan pertanyaan tidak boleh kosong.' });
        return;
      }

      const ai = getGeminiClient();
      const summary = knowledgeBase.getSummary();
      const retrievedChunks = knowledgeBase.retrieveRelevantChunks(latestUserMessage, 10);

      const booksOverview =
        summary.books.length > 0
          ? summary.books
              .map(
                (b, i) =>
                  `${i + 1}. [${b.bookName}] (${b.fileName}) — Bab: ${b.chapters.join('; ')}`
              )
              .join('\n')
          : '- Belum ada file buku yang dimuat di knowledge_books.';

      const contextBlock = retrievedChunks
        .map(
          (chunk, idx) =>
            `[Kutipan ${idx + 1} | Jenis: ${
              chunk.sourceType === 'book' ? 'BUKU REFERENSI UTAMA' : 'Isi Website Ruang Obat'
            } | Nama Buku: ${chunk.bookName || chunk.sourceName} | Bab Buku: ${
              chunk.chapterTitle || chunk.sectionTitle
            } | Berkas: ${chunk.fileName || chunk.sourceName}]\n${chunk.text}`
        )
        .join('\n\n---\n\n');

      const systemInstruction = `Kamu adalah "Asisten Ruang Obat", chatbot edukasi farmasi klinis dan komunitas untuk website "Ruang Obat" ("Kenali label obatmu, kelola obat di rumahmu").

ATURAN PENGUNCIAN SUMBER & SITASI KETAT (PRIORITAS TERTINGGI — WAJIB DIPATUHI):
1. PRIORITAS MUTLAK BUKU REFERENSI: Kamu TERKUNCI untuk mengutamakan dan mengutip materi secara ketat dari ${summary.books.length} berkas buku referensi resmi di folder \`knowledge_books\` (terutama *Buku Ajar Farmakologi (HKI, 2022)* — 11 bab dan *Farmakologi dan Terapi Edisi 4 (FKUI)* — 24 berkas / 56 bab) yang diberikan pada blok "KONTEKS SUMBER" di bawah.
2. Konteks website Ruang Obat hanya digunakan sebagai pelengkap bila pengguna bertanya tentang cara menggunakan fitur/menu website (Beranda, Cek Label, Lemari Obat, Latihan, Pustaka).
3. DILARANG KERAS MENGARANG / HALUSINASI: Jangan pernah mengarang fakta farmakologi, angka regulasi, atau mengutip buku/pedoman luar yang tidak ada di dalam "KONTEKS SUMBER".
4. WAJIB MENAMPILKAN NAMA BUKU & BAB BUKU DI SETIAP JAWABAN:
   - Sebutkan secara jelas nama buku dan bab saat menjelaskan materi di dalam paragraf/poin jawaban (contoh: *"Menurut **Buku Ajar Farmakologi (HKI, 2022)** pada **Bab VII: Penggolongan Jenis Obat**..."* atau *"Berdasarkan **Farmakologi dan Terapi Edisi 4 (FKUI)** pada **Bab 39: Pengantar Antimikroba**..."*).
   - Akhiri **SETIAP** jawaban dengan bagian khusus berformat persis seperti ini:
     **Sumber Buku & Bab yang Dikutip:**
     - **[Nama Buku Persis dari Konteks]** — [Nama Bab Buku Persis dari Konteks]
5. KEJUJURAN JIKA TIDAK ADA DI SUMBER: Jika topik pertanyaan sama sekali tidak ditemukan pada kutipan dari ${summary.books.length} berkas buku di ` + '`knowledge_books`' + `, nyatakan secara jujur bahwa informasi tersebut belum tercakup pada kutipan buku referensi yang sedang dimuat, sebutkan bab terdekat yang tersedia jika relevan, dan sarankan berkonsultasi dengan apoteker atau dokter.

ATURAN ETIKA & KESELAMATAN PASIEN (WAJIB DIPATUHI):
- Edukasi umum saja: DILARANG memberikan diagnosis penyakit pribadi, resep obat, atau menghitung/menyarankan dosis obat personal untuk pasien tertentu.
- Jika pengguna menanyakan keluhan penyakit berat, gejala tanda bahaya (red flags), atau dosis personal anak/dewasa, ingatkan dengan sopan untuk segera berkonsultasi langsung dengan apoteker atau dokter.

GAYA KOMUNIKASI:
- Bahasa Indonesia yang ramah, jelas, terstruktur dengan poin-poin singkat agar nyaman dibaca di layar ponsel maupun desktop.
- Pengguna saat ini membuka tab: "${activeTab}".

DAFTAR LENGKAP ${summary.books.length} BERKAS BUKU REFERENSI DI \`knowledge_books/\`:
${booksOverview}`;

      const priorMessages = messages.slice(0, -1);
      const history = buildSanitizedHistory(priorMessages);

      const candidateModels =
        speedMode === 'cepat'
          ? ['gemini-3.1-flash-lite', 'gemini-3.5-flash', 'gemini-3.6-flash']
          : ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-3.1-flash-lite'];

      const enrichedPrompt = `KONTEKS SUMBER (PRIORITAS UTAMA: 35 BERKAS BUKU KNOWLEDGE_BOOKS):
${contextBlock || 'Belum ada potongan konteks yang cocok.'}

PERTANYAAN PENGGUNA:
${latestUserMessage}

INSTRUKSI AKHIR: Jawab dengan mengutip ketat isi buku pada KONTEKS SUMBER di atas dan WAJIB menutup jawaban dengan bagian "**Sumber Buku & Bab yang Dikutip:**" berisi Nama Buku dan Bab Buku yang digunakan.`;

      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');

      // Prioritize book sources in returned citation badges, deduplicated by bookName + chapterTitle
      const sortedForCitations = [...retrievedChunks].sort((a, b) => {
        if (a.sourceType === b.sourceType) return 0;
        return a.sourceType === 'book' ? -1 : 1;
      });

      const sources = Array.from(
        new Map(
          sortedForCitations.map((c) => {
            const book = c.bookName || c.sourceName;
            const chapter = c.chapterTitle || c.sectionTitle.replace(/\s*\(Bagian \d+\)$/i, '');
            return [
              `${book}::${chapter}`,
              {
                sourceType: c.sourceType,
                sourceName: book,
                sectionTitle: chapter,
                bookName: book,
                chapterTitle: chapter,
              },
            ];
          })
        ).values()
      ).slice(0, 6);

      let usedModel = candidateModels[0];
      let streamSuccess = false;
      let lastError: unknown = null;

      for (const modelToTry of candidateModels) {
        try {
          const thinkingConfig = modelToTry.includes('flash-lite')
            ? { thinkingLevel: ThinkingLevel.MINIMAL }
            : { thinkingLevel: ThinkingLevel.LOW };

          const chat = ai.chats.create({
            model: modelToTry,
            history,
            config: {
              systemInstruction,
              thinkingConfig,
            },
          });

          const stream = await chat.sendMessageStream({ message: enrichedPrompt });
          usedModel = modelToTry;

          for await (const chunk of stream) {
            const c = chunk as GenerateContentResponse;
            const delta = c.text;
            if (delta) {
              res.write(`data: ${JSON.stringify({ type: 'chunk', text: delta })}\n\n`);
            }
          }

          streamSuccess = true;
          break; // Berhasil streaming dari model ini, keluar loop
        } catch (streamErr) {
          lastError = streamErr;
          console.warn(`[AI Fallback] Model ${modelToTry} mengalami kendala:`, streamErr instanceof Error ? streamErr.message : streamErr);
          // Coba model kandidat berikutnya di list
          continue;
        }
      }

      if (!streamSuccess) {
        throw lastError || new Error('Semua model AI sedang mengalami lonjakan antrean.');
      }

      res.write(`data: ${JSON.stringify({ type: 'done', sources, model: usedModel })}\n\n`);
      res.end();
    } catch (err) {
      const formatted = formatGeminiError(err);
      if (!res.headersSent) {
        res.status(formatted.status).json({ error: formatted.message });
      } else {
        res.write(`data: ${JSON.stringify({ type: 'error', error: formatted.message })}\n\n`);
        res.end();
      }
    }
  });

  if (!IS_PROD) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ruang Obat server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Ruang Obat server:', err);
  process.exit(1);
});
