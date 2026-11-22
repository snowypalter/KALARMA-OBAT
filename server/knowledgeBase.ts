import fs from 'node:fs/promises';
import path from 'node:path';
import JSZip from 'jszip';
import { extractText } from 'unpdf';

export interface KnowledgeChunk {
  id: string;
  sourceType: 'website' | 'book';
  sourceName: string;
  bookName: string;
  chapterTitle: string;
  sectionTitle: string;
  fileName?: string;
  text: string;
  tokens: Set<string>;
}

export interface BookSourceMeta {
  id: string;
  fileName: string;
  bookName: string;
  chapters: string[];
  origin: 'folder' | 'upload';
  fileType: 'zip' | 'pdf' | 'text';
  innerFiles: string[];
  chunkCount: number;
  totalChars: number;
  addedAt: string;
}

export interface KnowledgeSummary {
  websiteChunks: number;
  websiteModules: string[];
  books: BookSourceMeta[];
  totalBookChunks: number;
}

const ROOT_DIR = process.cwd();
const KNOWLEDGE_DIR = path.join(ROOT_DIR, 'knowledge_books');
const UPLOADS_DIR = path.join(KNOWLEDGE_DIR, 'uploads');

const STOPWORDS = new Set([
  'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'pada', 'dengan', 'adalah', 'ini', 'itu',
  'atau', 'juga', 'bisa', 'dapat', 'apa', 'bagaimana', 'kenapa', 'mengapa', 'kapan',
  'siapa', 'mana', 'saja', 'ada', 'tidak', 'bukan', 'ya', 'oleh', 'dalam', 'akan',
  'seperti', 'tentang', 'seputar', 'isi', 'website', 'aplikasi', 'ruang', 'obat',
  'saya', 'aku', 'kamu', 'anda', 'kita', 'mereka', 'tolong', 'jelaskan', 'sebutkan',
  'caranya', 'jika', 'kalau', 'bila', 'saat', 'ketika', 'agar', 'supaya', 'karena',
  'buku', 'bab', 'referensi', 'sumber', 'tolong', 'terima', 'kasih', 'mohon',
  'the', 'and', 'for', 'with', 'that', 'this', 'from', 'are', 'was', 'what', 'how'
]);

const WEBSITE_INTENT_KEYWORDS = [
  'website', 'fitur', 'tab', 'beranda', 'cek label', 'hotspot', 'lemari obat',
  'latihan', 'kuis', 'pretest', 'posttest', 'flashcard', 'skenario', 'pustaka',
  'kamus', 'simulasi', 'navigasi', 'tombol', 'halaman', 'aplikasi', 'tinjau dosen',
  'unduh pdf', 'localstorage'
];

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 2 && !STOPWORDS.has(w));
}

function createChunksFromText(
  text: string,
  sourceType: 'website' | 'book',
  sourceName: string,
  sectionTitle: string,
  options?: {
    bookName?: string;
    chapterTitle?: string;
    fileName?: string;
    maxChunkChars?: number;
    overlapChars?: number;
  }
): KnowledgeChunk[] {
  const maxChunkChars = options?.maxChunkChars ?? 1300;
  const overlapChars = options?.overlapChars ?? 180;
  const bookName = options?.bookName ?? sourceName;
  const chapterTitle = options?.chapterTitle ?? sectionTitle;
  const fileName = options?.fileName;

  const cleaned = text.replace(/\r\n/g, '\n').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
  if (!cleaned) return [];

  const chunks: KnowledgeChunk[] = [];
  let start = 0;
  let part = 1;

  while (start < cleaned.length) {
    let end = Math.min(start + maxChunkChars, cleaned.length);
    if (end < cleaned.length) {
      const lastBreak = Math.max(
        cleaned.lastIndexOf('\n\n', end),
        cleaned.lastIndexOf('. ', end),
        cleaned.lastIndexOf('\n', end)
      );
      if (lastBreak > start + Math.floor(maxChunkChars * 0.45)) {
        end = lastBreak + 1;
      }
    }

    const slice = cleaned.slice(start, end).trim();
    if (slice.length >= 20) {
      const label = cleaned.length > maxChunkChars ? `${sectionTitle} (Bagian ${part})` : sectionTitle;
      chunks.push({
        id: `${sourceType}:${fileName || sourceName}:${chapterTitle}:${part}:${start}`,
        sourceType,
        sourceName,
        bookName,
        chapterTitle,
        sectionTitle: label,
        fileName,
        text: slice,
        tokens: new Set(tokenize(`${bookName} ${chapterTitle} ${slice}`)),
      });
      part++;
    }

    if (end >= cleaned.length) break;
    start = Math.max(end - overlapChars, start + 1);
  }

  return chunks;
}

interface ParsedMarkdownBook {
  bookName: string;
  chapters: Array<{ chapterTitle: string; content: string }>;
}

function parseMarkdownBook(raw: string, fallbackFileName: string): ParsedMarkdownBook {
  const normalized = raw.replace(/\r\n/g, '\n');
  const h1Match = normalized.match(/^#\s+(.+)$/m);
  let bookName = h1Match ? h1Match[1].trim() : fallbackFileName.replace(/\.(md|txt)$/i, '');

  if (!h1Match) {
    if (fallbackFileName.startsWith('HKI_2022')) {
      bookName = 'Buku Ajar Farmakologi (HKI, 2022)';
    } else if (fallbackFileName.startsWith('FKUI_Ed4')) {
      bookName = 'Farmakologi dan Terapi Edisi 4 (FKUI)';
    }
  }

  const lines = normalized.split('\n');
  const chapters: Array<{ chapterTitle: string; content: string }> = [];
  let currentChapter = '';
  let buffer: string[] = [];

  const flush = () => {
    const content = buffer.join('\n').trim();
    if (content.length >= 20) {
      chapters.push({
        chapterTitle: currentChapter || bookName,
        content,
      });
    }
    buffer = [];
  };

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      if (currentChapter) {
        flush();
      } else {
        buffer = [];
      }
      currentChapter = h2Match[1].trim();
      continue;
    }
    if (currentChapter) {
      buffer.push(line);
    } else if (!line.startsWith('# ')) {
      buffer.push(line);
    }
  }
  flush();

  if (chapters.length === 0 && normalized.trim().length >= 20) {
    chapters.push({
      chapterTitle: fallbackFileName.replace(/\.(md|txt)$/i, '').replace(/_/g, ' '),
      content: normalized.trim(),
    });
  }

  return { bookName, chapters };
}

function cleanTypeScriptDataForIndex(raw: string): string {
  return raw
    .replace(/^import\s+.*?;\s*$/gm, '')
    .replace(/export\s+(const|interface|type)\s+/g, '')
    .replace(/[{}\[\]]/g, ' ')
    .replace(/['"`]/g, '')
    .replace(/,\s*$/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

async function extractTextFromBuffer(fileName: string, buffer: Buffer): Promise<{ text: string; pages?: string[] }> {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === '.pdf') {
    const result = await extractText(new Uint8Array(buffer), { mergePages: false });
    const pages = Array.isArray(result.text) ? result.text : [String(result.text ?? '')];
    return { text: pages.join('\n\n'), pages };
  }
  if (ext === '.html' || ext === '.htm') {
    return { text: stripHtml(buffer.toString('utf8')) };
  }
  if (['.txt', '.md', '.csv', '.json', '.tsv'].includes(ext)) {
    return { text: buffer.toString('utf8') };
  }
  return { text: '' };
}

class KnowledgeBaseManager {
  private websiteChunks: KnowledgeChunk[] = [];
  private bookChunks: KnowledgeChunk[] = [];
  private booksMeta: BookSourceMeta[] = [];
  private websiteModules: string[] = [];
  private initialized = false;

  async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.reload();
    }
  }

  async reload(): Promise<KnowledgeSummary> {
    await fs.mkdir(KNOWLEDGE_DIR, { recursive: true });
    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    await this.loadWebsiteContent();
    await this.loadBookSources();
    this.initialized = true;
    return this.getSummary();
  }

  private async loadWebsiteContent(): Promise<void> {
    const chunks: KnowledgeChunk[] = [];
    const modules: string[] = [];

    try {
      const docMd = await fs.readFile(path.join(ROOT_DIR, 'DOKUMEN_PROTOTIPE_SKRIPSI.md'), 'utf8');
      chunks.push(
        ...createChunksFromText(docMd, 'website', 'Website: Ruang Obat', 'Dokumen & Spesifikasi Fitur', {
          bookName: 'Website Ruang Obat',
          chapterTitle: 'Spesifikasi Fitur & Batasan Etika',
        })
      );
      modules.push('Beranda & Spesifikasi Prototipe');
    } catch {
      // optional
    }

    const dataFiles: Array<{ file: string; label: string }> = [
      { file: 'src/data/labelHotspots.ts', label: 'Cek Label (6 Titik Kemasan Tablet, Sirup, Salep)' },
      { file: 'src/data/kamusData.ts', label: 'Kamus Label Obat (Glosarium Resmi)' },
      { file: 'src/data/panduanSimpanBuang.ts', label: 'Panduan Simpan & Buang (Prinsip DAGUSIBU)' },
      { file: 'src/data/latihanData.ts', label: 'Modul Latihan (Skenario Swamedikasi, Flashcard, Kuis)' },
      { file: 'src/data/pustakaData.ts', label: 'Pustaka Rujukan Farmasi (HKI 2022, FKUI Ed. 4, BPOM, Kemenkes)' },
      { file: 'src/data/initialMedicines.ts', label: 'Lemari Obat Saya (Contoh Inventaris & Status)' },
    ];

    for (const item of dataFiles) {
      try {
        const raw = await fs.readFile(path.join(ROOT_DIR, item.file), 'utf8');
        const cleaned = cleanTypeScriptDataForIndex(raw);
        chunks.push(
          ...createChunksFromText(cleaned, 'website', `Website: ${item.label}`, item.label, {
            bookName: 'Website Ruang Obat',
            chapterTitle: item.label,
          })
        );
        modules.push(item.label);
      } catch {
        // ignore missing file
      }
    }

    const navSummary = `
Navigasi dan Fitur Utama Website Ruang Obat:
1. Beranda: Ringkasan status obat di rumah (grafik Donut/Batang: Aman >30 hari, Segera Kedaluwarsa <=30 hari, Kedaluwarsa <0 hari), peringatan kedaluwarsa, skenario hari ini, akses cepat Kamus & Flashcard, serta Panduan Pengguna Baru.
2. Cek Label: Simulasi interaktif 3 bentuk sediaan (Tablet, Sirup 5 mL, Salep tube) dengan 6 titik kritis ketuk (Logo Golongan Obat, Nama & Komposisi Zat Aktif, Indikasi Medis, Aturan Pakai & Peringatan, Tanggal Kedaluwarsa/ED & BUD, Nomor Izin Edar NIE BPOM 15 digit).
3. Lemari Obat Saya: Manajemen stok obat pribadi tersimpan lokal di perangkat (localStorage), dilengkapi pencarian, filter status, tanggal dibuka untuk BUD, dan Panduan Simpan & Buang.
4. Latihan: 3 modul aktif: Skenario Swamedikasi Bercabang (4 kasus + Red Flags), Flashcard Interaktif 3D Flip (12 kartu), dan Kuis Evaluasi Pre-Test & Post-Test (10 soal dengan pembahasan ilmiah).
5. Pustaka: Rujukan Buku Ajar Farmakologi (HKI 2022), Farmakologi & Terapi Ed. 4 (FKUI), BPOM RI, Kemenkes RI (DAGUSIBU), Farmakope Indonesia VI, WHO, dan USP.
Batasan Etika Mutlak: Aplikasi ini murni edukasi umum, TIDAK menyediakan kalkulator dosis, TIDAK mendiagnosis penyakit, dan selalu menganjurkan konsultasi ke apoteker atau dokter.
`.trim();

    chunks.push(
      ...createChunksFromText(navSummary, 'website', 'Website: Gambaran Umum Ruang Obat', 'Panduan Fitur & Batasan Etika', {
        bookName: 'Website Ruang Obat',
        chapterTitle: 'Panduan Fitur & Batasan Etika',
      })
    );

    this.websiteChunks = chunks;
    this.websiteModules = modules;
  }

  private async indexSingleFile(filePath: string, fileName: string, origin: 'folder' | 'upload'): Promise<void> {
    const ext = path.extname(fileName).toLowerCase();
    const stat = await fs.stat(filePath);
    const buffer = await fs.readFile(filePath);

    if (ext === '.zip') {
      const zip = await JSZip.loadAsync(buffer);
      const innerFiles: string[] = [];
      const chaptersList: string[] = [];
      let totalChars = 0;
      const beforeCount = this.bookChunks.length;

      const entries = Object.values(zip.files).filter(
        (entry) => !entry.dir && !entry.name.startsWith('__MACOSX') && !path.basename(entry.name).startsWith('.')
      );

      for (const entry of entries) {
        const innerExt = path.extname(entry.name).toLowerCase();
        if (!['.pdf', '.txt', '.md', '.csv', '.json', '.html', '.htm'].includes(innerExt)) {
          continue;
        }
        try {
          const innerBuf = await entry.async('nodebuffer');
          const extracted = await extractTextFromBuffer(entry.name, innerBuf);
          if (innerExt === '.md') {
            const parsed = parseMarkdownBook(extracted.text, path.basename(entry.name));
            innerFiles.push(entry.name);
            for (const ch of parsed.chapters) {
              chaptersList.push(ch.chapterTitle);
              totalChars += ch.content.length;
              this.bookChunks.push(
                ...createChunksFromText(ch.content, 'book', parsed.bookName, ch.chapterTitle, {
                  bookName: parsed.bookName,
                  chapterTitle: ch.chapterTitle,
                  fileName: entry.name,
                })
              );
            }
          } else if (extracted.pages && extracted.pages.length > 0) {
            innerFiles.push(entry.name);
            const cleanTitle = path.basename(entry.name);
            extracted.pages.forEach((pageText, idx) => {
              const cleanedPage = pageText.trim();
              if (cleanedPage.length >= 20) {
                totalChars += cleanedPage.length;
                const chap = `${cleanTitle} (Halaman ${idx + 1})`;
                this.bookChunks.push(
                  ...createChunksFromText(cleanedPage, 'book', cleanTitle, chap, {
                    bookName: cleanTitle,
                    chapterTitle: chap,
                    fileName: entry.name,
                  })
                );
              }
            });
          } else if (extracted.text.trim().length >= 20) {
            innerFiles.push(entry.name);
            totalChars += extracted.text.length;
            const cleanTitle = path.basename(entry.name);
            this.bookChunks.push(
              ...createChunksFromText(extracted.text, 'book', cleanTitle, cleanTitle, {
                bookName: cleanTitle,
                chapterTitle: cleanTitle,
                fileName: entry.name,
              })
            );
          }
        } catch (err) {
          console.warn(`Gagal membaca entry zip ${entry.name}:`, err);
        }
      }

      this.booksMeta.push({
        id: `${origin}:${fileName}`,
        fileName,
        bookName: fileName,
        chapters: chaptersList.length > 0 ? chaptersList : innerFiles,
        origin,
        fileType: 'zip',
        innerFiles,
        chunkCount: this.bookChunks.length - beforeCount,
        totalChars,
        addedAt: stat.mtime.toISOString(),
      });
      return;
    }

    if (['.pdf', '.txt', '.md', '.csv', '.json', '.html', '.htm'].includes(ext)) {
      const beforeCount = this.bookChunks.length;
      const extracted = await extractTextFromBuffer(fileName, buffer);
      let totalChars = 0;
      let resolvedBookName = fileName;
      let chapters: string[] = [fileName];

      if (ext === '.md') {
        const parsed = parseMarkdownBook(extracted.text, fileName);
        resolvedBookName = parsed.bookName;
        chapters = parsed.chapters.map((c) => c.chapterTitle);
        for (const ch of parsed.chapters) {
          totalChars += ch.content.length;
          this.bookChunks.push(
            ...createChunksFromText(ch.content, 'book', resolvedBookName, ch.chapterTitle, {
              bookName: resolvedBookName,
              chapterTitle: ch.chapterTitle,
              fileName,
            })
          );
        }
      } else if (extracted.pages && extracted.pages.length > 0) {
        chapters = [`${fileName} (${extracted.pages.length} halaman)`];
        extracted.pages.forEach((pageText, idx) => {
          const cleanedPage = pageText.trim();
          if (cleanedPage.length >= 20) {
            totalChars += cleanedPage.length;
            const chap = `${fileName} (Halaman ${idx + 1})`;
            this.bookChunks.push(
              ...createChunksFromText(cleanedPage, 'book', fileName, chap, {
                bookName: fileName,
                chapterTitle: chap,
                fileName,
              })
            );
          }
        });
      } else if (extracted.text.trim().length >= 20) {
        totalChars += extracted.text.length;
        this.bookChunks.push(
          ...createChunksFromText(extracted.text, 'book', fileName, fileName, {
            bookName: fileName,
            chapterTitle: fileName,
            fileName,
          })
        );
      }

      this.booksMeta.push({
        id: `${origin}:${fileName}`,
        fileName,
        bookName: resolvedBookName,
        chapters,
        origin,
        fileType: ext === '.pdf' ? 'pdf' : 'text',
        innerFiles: [fileName],
        chunkCount: this.bookChunks.length - beforeCount,
        totalChars,
        addedAt: stat.mtime.toISOString(),
      });
    }
  }

  private async loadBookSources(): Promise<void> {
    this.bookChunks = [];
    this.booksMeta = [];

    try {
      const entries = await fs.readdir(KNOWLEDGE_DIR, { withFileTypes: true });
      const sortedEntries = entries
        .filter((e) => e.isFile() && e.name.toLowerCase() !== 'readme.txt' && !e.name.startsWith('.'))
        .sort((a, b) => a.name.localeCompare(b.name));

      for (const entry of sortedEntries) {
        await this.indexSingleFile(path.join(KNOWLEDGE_DIR, entry.name), entry.name, 'folder');
      }
    } catch (err) {
      console.warn('Gagal memindai folder knowledge_books:', err);
    }

    try {
      const uploadEntries = await fs.readdir(UPLOADS_DIR, { withFileTypes: true });
      const sortedUploads = uploadEntries
        .filter((e) => e.isFile() && !e.name.startsWith('.'))
        .sort((a, b) => a.name.localeCompare(b.name));

      for (const entry of sortedUploads) {
        await this.indexSingleFile(path.join(UPLOADS_DIR, entry.name), entry.name, 'upload');
      }
    } catch (err) {
      console.warn('Gagal memindai folder uploads:', err);
    }
  }

  async ingestUploadedFile(fileName: string, buffer: Buffer): Promise<KnowledgeSummary> {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    const safeName = path.basename(fileName).replace(/[^a-zA-Z0-9._-]/g, '_');
    const targetPath = path.join(UPLOADS_DIR, safeName);
    await fs.writeFile(targetPath, buffer);
    await this.reload();
    return this.getSummary();
  }

  async deleteUploadedBook(fileName: string): Promise<KnowledgeSummary> {
    const safeName = path.basename(fileName);
    const targetPath = path.join(UPLOADS_DIR, safeName);
    try {
      await fs.unlink(targetPath);
    } catch {
      // ignore if missing
    }
    await this.reload();
    return this.getSummary();
  }

  getSummary(): KnowledgeSummary {
    return {
      websiteChunks: this.websiteChunks.length,
      websiteModules: this.websiteModules,
      books: this.booksMeta,
      totalBookChunks: this.bookChunks.length,
    };
  }

  retrieveRelevantChunks(query: string, maxTotal = 10): KnowledgeChunk[] {
    const queryTokens = tokenize(query);
    const lowerQuery = query.toLowerCase().trim();
    const hasWebsiteIntent = WEBSITE_INTENT_KEYWORDS.some((kw) => lowerQuery.includes(kw));

    const scoreChunk = (chunk: KnowledgeChunk): number => {
      if (queryTokens.length === 0) return chunk.sourceType === 'book' ? 2 : 0.3;
      let score = 0;
      const lowerText = chunk.text.toLowerCase();
      const lowerTitle = `${chunk.bookName} ${chunk.chapterTitle} ${chunk.sectionTitle}`.toLowerCase();

      let matchedDistinctTokens = 0;

      for (const token of queryTokens) {
        let tokenMatched = false;
        if (chunk.tokens.has(token)) {
          score += 3;
          tokenMatched = true;
          if (lowerTitle.includes(token)) score += 4;
          const matches = lowerText.split(token).length - 1;
          score += Math.min(matches, 5) * 0.7;
        } else if (token.length >= 4 && (lowerText.includes(token) || lowerTitle.includes(token))) {
          score += 1.6;
          tokenMatched = true;
          if (lowerTitle.includes(token)) score += 2.2;
        }
        if (tokenMatched) matchedDistinctTokens++;
      }

      // Bonus for matching multiple query concepts in the same book chunk
      if (matchedDistinctTokens >= 2) {
        score += matchedDistinctTokens * 1.5;
      }

      if (lowerQuery.length >= 5 && lowerText.includes(lowerQuery)) {
        score += 6;
      }

      // Strong prioritization bonus for the 35 knowledge_books files
      if (chunk.sourceType === 'book' && score > 0) {
        score += 2.5;
      }

      return score;
    };

    const scoredBooks = this.bookChunks
      .map((chunk) => ({ chunk, score: scoreChunk(chunk) }))
      .sort((a, b) => b.score - a.score);

    const scoredWeb = this.websiteChunks
      .map((chunk) => ({ chunk, score: scoreChunk(chunk) }))
      .sort((a, b) => b.score - a.score);

    const selected: KnowledgeChunk[] = [];
    const seenIds = new Set<string>();
    const chapterCount = new Map<string, number>();

    const addChunk = (c: KnowledgeChunk) => {
      if (!seenIds.has(c.id)) {
        seenIds.add(c.id);
        selected.push(c);
      }
    };

    // Reserve max 2 slots for website context ONLY when website/UI intent is detected
    const webQuota = hasWebsiteIntent ? 2 : 0;
    const bookQuota = this.bookChunks.length > 0 ? maxTotal - webQuota : 0;

    // First pass: pick top scoring book chunks while keeping chapter diversity (max 3 chunks per chapter)
    for (const item of scoredBooks) {
      if (selected.length >= bookQuota) break;
      if (item.score <= 0 && selected.length >= 3) break;
      const key = `${item.chunk.bookName}::${item.chunk.chapterTitle}`;
      const count = chapterCount.get(key) ?? 0;
      if (count < 3) {
        addChunk(item.chunk);
        chapterCount.set(key, count + 1);
      }
    }

    // Second pass: if website intent exists, include up to 2 relevant website chunks
    if (webQuota > 0) {
      let addedWeb = 0;
      for (const item of scoredWeb) {
        if (selected.length >= maxTotal || addedWeb >= webQuota) break;
        if (item.score > 0) {
          addChunk(item.chunk);
          addedWeb++;
        }
      }
    }

    // Third pass: fill any remaining slots strictly from top book chunks first
    for (const item of scoredBooks) {
      if (selected.length >= maxTotal) break;
      addChunk(item.chunk);
    }

    // Fallback to website chunks only if books are completely empty
    if (selected.length === 0) {
      for (const item of scoredWeb.slice(0, maxTotal)) {
        addChunk(item.chunk);
      }
    }

    return selected;
  }
}

export const knowledgeBase = new KnowledgeBaseManager();
