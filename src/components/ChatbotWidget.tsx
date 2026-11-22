import React, { useState, useEffect, useRef } from 'react';
import { TabType } from '../types';
import {
  MessageSquareText,
  X,
  Send,
  Bot,
  User,
  BookOpen,
  Upload,
  RefreshCw,
  Trash2,
  RotateCcw,
  Sparkles,
  Zap,
  FileArchive,
  FileText,
  AlertCircle,
  CheckCircle2,
  Globe,
  Loader2,
} from 'lucide-react';

interface ChatSourceRef {
  sourceType: 'website' | 'book';
  sourceName: string;
  sectionTitle: string;
  bookName?: string;
  chapterTitle?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  sources?: ChatSourceRef[];
  modelUsed?: string;
  isError?: boolean;
}

interface BookSourceMeta {
  id: string;
  fileName: string;
  bookName?: string;
  chapters?: string[];
  origin: 'folder' | 'upload';
  fileType: 'zip' | 'pdf' | 'text';
  innerFiles: string[];
  chunkCount: number;
  totalChars: number;
  addedAt: string;
}

interface KnowledgeSummary {
  websiteChunks: number;
  websiteModules: string[];
  books: BookSourceMeta[];
  totalBookChunks: number;
}

interface ChatbotWidgetProps {
  currentTab: TabType;
  externalOpenTrigger?: number;
}

const CHAT_HISTORY_KEY = 'ruang_obat_chat_history_v1';

const INITIAL_BOT_MESSAGE: ChatMessage = {
  id: 'welcome-1',
  role: 'model',
  text: 'Halo! Saya **Asisten Ruang Obat**. Jawaban saya terkunci memprioritaskan dan mengutip langsung dari **35 berkas buku referensi** (*Buku Ajar Farmakologi HKI 2022* — 11 bab & *Farmakologi dan Terapi Edisi 4 FKUI* — 24 berkas / 56 bab) di folder pustaka, disertai pencantuman nama dan bab buku di setiap jawaban.\n\nSilakan pilih pertanyaan cepat di bawah atau ketik pertanyaanmu!',
};

const TAB_STARTER_QUESTIONS: Record<TabType, string[]> = {
  beranda: [
    'Jelaskan penggolongan obat Bebas, Bebas Terbatas, dan Obat Keras menurut HKI 2022.',
    'Apa perbedaan Expired Date (ED) dan Beyond Use Date (BUD)?',
    'Apa saja prinsip 7 Benar pemberian obat menurut buku ajar farmakologi?',
  ],
  'cek-label': [
    'Bagaimana penggolongan bentuk sediaan padat, cair (suspensi/emulsi), dan semipadat (salep/krim)?',
    'Kenapa sediaan suspensi wajib dikocok perlahan dan diukur pada dasar meniskus?',
    'Apa risiko duplikasi dosis dan interaksi obat menurut Farmakologi & Terapi FKUI?',
  ],
  lemari: [
    'Bagaimana cara membuang tablet dan sirup kedaluwarsa sesuai prinsip DAGUSIBU?',
    'Mengapa obat kedaluwarsa seperti tetrasiklin berbahaya menurut Dasar Toksikologi FKUI?',
    'Bagaimana aturan suhu simpan sediaan cair, salep, dan tetes mata agar mutu tetap stabil?',
  ],
  latihan: [
    'Mengapa penggunaan antibiotik yang tidak tepat memicu resistensi mikroba menurut Bab 39 FKUI?',
    'Kenapa sendok makan dapur tidak boleh dipakai untuk takaran sirup obat?',
    'Bagaimana mekanisme kerja antasida dan risiko penggunaan kortikosteroid topikal pada jamur?',
  ],
  pustaka: [
    'Cakupan materi apa saja yang dibahas dalam Buku Ajar Farmakologi HKI 2022?',
    'Apa perbedaan Farmakokinetik dan Farmakodinamik pada Bab 1 Farmakologi & Terapi Ed. 4?',
    'Jelaskan tanda peringatan P.No 1 sampai P.No 6 pada Obat Bebas Terbatas Daftar W.',
  ],
};

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const slice = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...slice);
  }
  return btoa(binary);
}

function renderFormattedLine(line: string, keyPrefix: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return (
    <React.Fragment key={keyPrefix}>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return (
            <strong key={idx} className="font-bold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </React.Fragment>
  );
}

function FormattedMessageText({ text }: { text: string }) {
  const blocks = text.split('\n');
  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed break-words">
      {blocks.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) return <div key={idx} className="h-1" />;

        if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('• ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="text-brand font-bold mt-0.5">•</span>
              <div className="flex-1">{renderFormattedLine(line.slice(2), `b-${idx}`)}</div>
            </div>
          );
        }

        const numberedMatch = line.match(/^(\d+\.)\s+(.*)$/);
        if (numberedMatch) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="font-bold text-forest font-mono shrink-0">
                {numberedMatch[1]}
              </span>
              <div className="flex-1">
                {renderFormattedLine(numberedMatch[2], `n-${idx}`)}
              </div>
            </div>
          );
        }

        return <p key={idx}>{renderFormattedLine(line, `p-${idx}`)}</p>;
      })}
    </div>
  );
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  currentTab,
  externalOpenTrigger = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'chat' | 'sources'>('chat');
  const [speedMode, setSpeedMode] = useState<'standar' | 'cepat'>('standar');
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [knowledge, setKnowledge] = useState<KnowledgeSummary | null>(null);
  const [isLoadingKnowledge, setIsLoadingKnowledge] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(CHAT_HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [INITIAL_BOT_MESSAGE];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (externalOpenTrigger > 0) {
      setIsOpen(true);
    }
  }, [externalOpenTrigger]);

  useEffect(() => {
    try {
      const toSave = messages.filter((m) => m.text.trim().length > 0).slice(-30);
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(toSave));
    } catch {
      // ignore storage quota errors
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && activePanel === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activePanel]);

  const fetchKnowledgeSummary = async () => {
    setIsLoadingKnowledge(true);
    try {
      const res = await fetch('/api/knowledge');
      if (res.ok) {
        const data = (await res.json()) as KnowledgeSummary;
        setKnowledge(data);
      }
    } catch {
      // silent fallback
    } finally {
      setIsLoadingKnowledge(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchKnowledgeSummary();
    }
  }, [isOpen]);

  const handleResetChat = () => {
    setMessages([INITIAL_BOT_MESSAGE]);
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch {
      // ignore
    }
  };

  const handleSendMessage = async (overrideText?: string) => {
    const trimmed = (overrideText ?? inputText).trim();
    if (!trimmed || isSending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const botPlaceholderId = `m-${Date.now() + 1}`;
    const botPlaceholder: ChatMessage = {
      id: botPlaceholderId,
      role: 'model',
      text: '',
    };

    const conversationForApi = [
      ...messages.filter((m) => !m.isError),
      userMsg,
    ].map((m) => ({
      role: m.role,
      text: m.text,
    }));

    setMessages((prev) => [...prev, userMsg, botPlaceholder]);
    if (!overrideText) setInputText('');
    setIsSending(true);
    setActivePanel('chat');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationForApi,
          activeTab: currentTab,
          speedMode,
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(
          errBody.error || `Gagal menghubungi asisten (HTTP ${response.status}).`
        );
      }

      if (!response.body) {
        throw new Error('Respons stream tidak tersedia.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let sseBuffer = '';
      let accumulatedText = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        sseBuffer += decoder.decode(value, { stream: true });
        const events = sseBuffer.split('\n\n');
        sseBuffer = events.pop() ?? '';

        for (const rawEvent of events) {
          const line = rawEvent.split('\n').find((l) => l.startsWith('data: '));
          if (!line) continue;

          const payloadStr = line.slice(6).trim();
          if (!payloadStr) continue;

          try {
            const payload = JSON.parse(payloadStr) as {
              type: 'chunk' | 'done' | 'error';
              text?: string;
              sources?: ChatSourceRef[];
              model?: string;
              error?: string;
            };

            if (payload.type === 'chunk' && payload.text) {
              accumulatedText += payload.text;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botPlaceholderId ? { ...m, text: accumulatedText } : m
                )
              );
            } else if (payload.type === 'done') {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botPlaceholderId
                    ? {
                        ...m,
                        text:
                          accumulatedText || 'Maaf, saya tidak menerima teks jawaban.',
                        sources: payload.sources,
                        modelUsed: payload.model,
                      }
                    : m
                )
              );
            } else if (payload.type === 'error') {
              throw new Error(
                payload.error || 'Terjadi kesalahan saat menghasilkan jawaban.'
              );
            }
          } catch (parseErr) {
            if (
              parseErr instanceof Error &&
              parseErr.message !== 'Unexpected end of JSON input'
            ) {
              throw parseErr;
            }
          }
        }
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Gagal terhubung ke server AI. Pastikan koneksi dan API key tersedia.';
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botPlaceholderId
            ? {
                ...m,
                text: message,
                isError: true,
              }
            : m
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setIsUploading(true);
    setUploadStatus(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64Data = arrayBufferToBase64(arrayBuffer);

      const res = await fetch('/api/knowledge/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: file.name,
          base64Data,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal mengunggah file buku.');
      }

      setKnowledge(data as KnowledgeSummary);
      setUploadStatus({
        type: 'success',
        message: `Berhasil memuat "${file.name}". Chatbot kini dapat menjawab dari isi buku tersebut!`,
      });
    } catch (err) {
      setUploadStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal memproses file.',
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleReloadFolder = async () => {
    setIsLoadingKnowledge(true);
    setUploadStatus(null);
    try {
      const res = await fetch('/api/knowledge/reload', { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal memuat ulang folder.');
      setKnowledge(data as KnowledgeSummary);
      setUploadStatus({
        type: 'success',
        message: 'Folder knowledge_books berhasil dipindai ulang.',
      });
    } catch (err) {
      setUploadStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal memuat ulang sumber.',
      });
    } finally {
      setIsLoadingKnowledge(false);
    }
  };

  const handleDeleteBook = async (fileName: string) => {
    setUploadStatus(null);
    try {
      const res = await fetch(`/api/knowledge/${encodeURIComponent(fileName)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menghapus buku.');
      setKnowledge(data as KnowledgeSummary);
      setUploadStatus({
        type: 'success',
        message: `Sumber "${fileName}" telah dihapus.`,
      });
    } catch (err) {
      setUploadStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Gagal menghapus file.',
      });
    }
  };

  const bookCount = knowledge?.books.length ?? 0;
  const starterQuestions =
    TAB_STARTER_QUESTIONS[currentTab] || TAB_STARTER_QUESTIONS.beranda;

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Buka Asisten Chatbot Ruang Obat"
          className="no-print fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 min-h-[50px] px-4 py-2.5 rounded-2xl bg-forest hover:bg-brand text-white shadow-lg border border-white/15 flex items-center gap-3 transition-transform duration-150 hover:scale-[1.02] active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
        >
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <MessageSquareText className="w-4 h-4 text-sand" />
          </div>
          <div className="text-left">
            <span className="text-xs sm:text-sm font-semibold block leading-tight">
              Tanya Ruang Obat
            </span>
            <span className="text-[10px] text-[#D2E4DC]/90 block leading-tight">
              35 Berkas Buku Farmakologi
            </span>
          </div>
        </button>
      )}

      {/* Chatbot Slide-over Panel */}
      {isOpen && (
        <div
          className="no-print fixed inset-0 z-50 flex items-end sm:items-center justify-end p-0 sm:p-4 bg-forest/55 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="chatbot-title"
        >
          <div className="bg-surface w-full sm:max-w-lg h-[90vh] sm:h-[670px] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-line flex flex-col overflow-hidden ro-sheet-in">
            {/* Top Header */}
            <div className="bg-forest text-white px-5 py-4 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-sand" />
                </div>
                <div className="min-w-0">
                  <h2
                    id="chatbot-title"
                    className="font-display text-base font-semibold text-white truncate"
                  >
                    Asisten Ruang Obat
                  </h2>
                  <p className="text-[11px] text-[#D2E4DC]/90 truncate">
                    {bookCount > 0
                      ? `Terkunci: ${bookCount} Berkas Buku (HKI 2022 & FKUI Ed. 4)`
                      : 'Memuat sumber buku referensi...'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Mulai percakapan baru"
                  aria-label="Mulai percakapan baru"
                  className="min-h-[40px] min-w-[40px] rounded-xl text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup Chatbot"
                  className="min-h-[40px] min-w-[40px] rounded-xl text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub-bar: Panel Switch + Speed Mode */}
            <div className="px-3.5 py-2.5 bg-surface-warm border-b border-line flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1 bg-surface-muted p-1 rounded-xl border border-line">
                <button
                  type="button"
                  onClick={() => setActivePanel('chat')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activePanel === 'chat'
                      ? 'bg-surface text-forest shadow-xs'
                      : 'text-ink-muted hover:text-forest'
                  }`}
                >
                  <MessageSquareText className="w-3.5 h-3.5" />
                  <span>Obrolan</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePanel('sources')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activePanel === 'sources'
                      ? 'bg-surface text-forest shadow-xs'
                      : 'text-ink-muted hover:text-forest'
                  }`}
                >
                  <FileArchive className="w-3.5 h-3.5" />
                  <span>Sumber Buku</span>
                  <span className="font-mono tabular-nums text-[10px] text-brand font-bold">
                    ({bookCount})
                  </span>
                </button>
              </div>

              {activePanel === 'chat' && (
                <button
                  type="button"
                  onClick={() =>
                    setSpeedMode((prev) => (prev === 'standar' ? 'cepat' : 'standar'))
                  }
                  title="Pilih mode respon: Standar (Gemini 3.5 Flash) atau Cepat (Gemini 3.1 Flash Lite)"
                  className={`px-2.5 py-1.5 rounded-xl text-[11px] font-semibold border flex items-center gap-1 transition-colors cursor-pointer ${
                    speedMode === 'cepat'
                      ? 'bg-status-segera-bg border-status-segera-text/30 text-status-segera-text'
                      : 'bg-surface border-line text-forest hover:border-line-strong'
                  }`}
                >
                  {speedMode === 'cepat' ? (
                    <>
                      <Zap className="w-3 h-3" />
                      <span>Mode Cepat</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 text-brand" />
                      <span>Mode Lengkap</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* PANEL 1: CHAT THREAD */}
            {activePanel === 'chat' ? (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg/70">
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-2.5 ${
                          isUser ? 'flex-row-reverse' : ''
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isUser
                              ? 'bg-forest text-sand'
                              : msg.isError
                              ? 'bg-status-kedaluwarsa-bg text-status-kedaluwarsa-text'
                              : 'bg-secondary text-forest'
                          }`}
                        >
                          {isUser ? (
                            <User className="w-4 h-4" />
                          ) : (
                            <Bot className="w-4 h-4" />
                          )}
                        </div>

                        <div
                          className={`max-w-[85%] space-y-1.5 ${
                            isUser ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div
                            className={`px-3.5 py-2.5 rounded-2xl ${
                              isUser
                                ? 'bg-forest text-white rounded-tr-sm'
                                : msg.isError
                                ? 'bg-status-kedaluwarsa-bg border border-status-kedaluwarsa-text/25 text-status-kedaluwarsa-text rounded-tl-sm'
                                : 'bg-surface border border-line text-ink rounded-tl-sm'
                            }`}
                          >
                            {msg.text ? (
                              isUser ? (
                                <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                                  {msg.text}
                                </p>
                              ) : (
                                <FormattedMessageText text={msg.text} />
                              )
                            ) : (
                              <div className="flex items-center gap-2 text-xs text-ink-muted py-0.5">
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-brand" />
                                <span>Menyusun jawaban dari sumber...</span>
                              </div>
                            )}
                          </div>

                          {msg.sources && msg.sources.length > 0 && (
                            <div className="pt-1 space-y-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-brand block">
                                Rujukan Sumber &amp; Bab Buku:
                              </span>
                              <div className="flex flex-col gap-1">
                                {msg.sources.map((src, i) => {
                                  const displayBook = src.bookName || src.sourceName;
                                  const displayChapter = src.chapterTitle || src.sectionTitle;
                                  return (
                                    <div
                                      key={i}
                                      className={`inline-flex items-start gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium border leading-snug ${
                                        src.sourceType === 'book'
                                          ? 'bg-sand-soft text-forest border-sand'
                                          : 'bg-secondary/60 text-forest border-line'
                                      }`}
                                    >
                                      {src.sourceType === 'book' ? (
                                        <BookOpen className="w-3 h-3 shrink-0 mt-0.5 text-brand" />
                                      ) : (
                                        <Globe className="w-3 h-3 shrink-0 mt-0.5 text-brand" />
                                      )}
                                      <span>
                                        <strong className="font-bold">{displayBook}</strong>
                                        {displayChapter && displayChapter !== displayBook
                                          ? ` — ${displayChapter}`
                                          : ''}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {messages.length === 1 && !isSending && (
                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand block">
                        Contoh Pertanyaan
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {starterQuestions.map((q, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSendMessage(q)}
                            className="text-left text-xs px-3.5 py-2.5 rounded-xl bg-surface border border-line hover:border-line-strong hover:bg-surface-warm text-ink font-medium transition-colors cursor-pointer"
                          >
                            &ldquo;{q}&rdquo;
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input Area */}
                <div className="p-3.5 bg-surface border-t border-line space-y-2 shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-end gap-2"
                  >
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Tanya materi farmakologi (HKI 2022, FKUI Ed. 4) atau label obat..."
                      aria-label="Tulis pertanyaan untuk asisten Ruang Obat"
                      disabled={isSending}
                      className="flex-1 min-h-[44px] max-h-28 px-3.5 py-2.5 text-xs sm:text-sm bg-bg border border-line rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-focus focus:bg-surface resize-none"
                    />
                    <button
                      type="submit"
                      disabled={isSending || !inputText.trim()}
                      aria-label="Kirim pertanyaan"
                      className="min-h-[44px] min-w-[44px] px-3.5 rounded-xl bg-forest hover:bg-brand disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                    >
                      {isSending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 text-sand" />
                      )}
                    </button>
                  </form>
                  <p className="text-[10px] text-ink-muted text-center leading-snug">
                    Edukasi umum bersumber ketat dari 35 berkas buku di knowledge_books, bukan diagnosis atau dosis pribadi.
                  </p>
                </div>
              </>
            ) : (
              /* PANEL 2: KNOWLEDGE SOURCES */
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-bg/70">
                <div className="p-4 rounded-2xl bg-surface border border-line space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sand-soft text-forest flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-forest">
                        Sumber Terkunci: {bookCount} Berkas Buku Farmakologi
                      </h3>
                      <p className="text-xs text-ink-muted leading-relaxed">
                        Asisten terkunci memprioritaskan dan mengutip langsung dari{' '}
                        <strong>Buku Ajar Farmakologi (HKI, 2022)</strong> dan{' '}
                        <strong>Farmakologi dan Terapi Edisi 4 (FKUI)</strong> di folder{' '}
                        <code className="bg-surface-muted px-1 rounded">knowledge_books/</code>. Anda tetap dapat menambah berkas tambahan jika diperlukan.
                      </p>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".zip,.pdf,.txt,.md,.csv,.json,.html,.htm"
                    onChange={(e) => handleUploadFiles(e.target.files)}
                    className="hidden"
                  />

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="min-h-[42px] px-4 py-2 rounded-xl bg-forest hover:bg-brand disabled:opacity-60 text-on-brand text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Memproses &amp; Mengindeks...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 text-sand" />
                          <span>Unggah File .zip / Buku</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      disabled={isLoadingKnowledge}
                      onClick={handleReloadFolder}
                      className="min-h-[42px] px-3.5 py-2 rounded-xl bg-surface border border-line hover:border-line-strong text-forest text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <RefreshCw
                        className={`w-3.5 h-3.5 ${
                          isLoadingKnowledge ? 'animate-spin' : ''
                        }`}
                      />
                      <span>Muat Ulang Folder</span>
                    </button>
                  </div>

                  {uploadStatus && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-start gap-2 border ${
                        uploadStatus.type === 'success'
                          ? 'bg-status-aman-bg border-status-aman-text/25 text-status-aman-text'
                          : 'bg-status-kedaluwarsa-bg border-status-kedaluwarsa-text/25 text-status-kedaluwarsa-text'
                      }`}
                    >
                      {uploadStatus.type === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      )}
                      <span>{uploadStatus.message}</span>
                    </div>
                  )}

                  <p className="text-[11px] text-ink-muted">
                    Tips: Anda juga dapat menaruh file{' '}
                    <code className="bg-surface-muted px-1 rounded">.zip</code> langsung ke folder{' '}
                    <code className="bg-surface-muted px-1 rounded">knowledge_books/</code> lalu tekan{' '}
                    <strong>Muat Ulang Folder</strong>.
                  </p>
                </div>

                {/* Loaded Books List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
                      Buku Referensi Terindeks ({knowledge?.books.length ?? 0})
                    </h4>
                    {knowledge && (
                      <span className="text-[11px] text-ink-muted font-mono tabular-nums">
                        {knowledge.totalBookChunks} segmen teks
                      </span>
                    )}
                  </div>

                  {!knowledge || knowledge.books.length === 0 ? (
                    <div className="p-5 rounded-2xl bg-surface border border-dashed border-line-strong/50 text-center space-y-1.5">
                      <BookOpen className="w-6 h-6 text-brand mx-auto" />
                      <p className="text-xs font-semibold text-forest">
                        Belum ada arsip buku (.zip) yang ditambahkan
                      </p>
                      <p className="text-[11px] text-ink-muted">
                        Saat ini asisten menggunakan seluruh isi website Ruang Obat sebagai sumber jawaban.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {knowledge.books.map((book) => (
                        <div
                          key={book.id}
                          className="p-3.5 rounded-xl bg-surface border border-line space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-2.5 min-w-0">
                              <div className="w-8 h-8 rounded-lg bg-sand-soft text-forest flex items-center justify-center shrink-0 mt-0.5">
                                {book.fileType === 'zip' ? (
                                  <FileArchive className="w-4 h-4" />
                                ) : (
                                  <FileText className="w-4 h-4" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="text-xs sm:text-sm font-bold text-forest leading-snug">
                                  {book.bookName || book.fileName}
                                </div>
                                <div className="text-[11px] font-medium text-brand truncate mt-0.5">
                                  {book.fileName}
                                </div>
                                <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-ink-muted mt-0.5 font-mono tabular-nums">
                                  <span>
                                    {book.origin === 'upload' ? 'Diunggah' : 'Folder knowledge_books'}
                                  </span>
                                  <span>·</span>
                                  <span>{book.chunkCount} segmen</span>
                                </div>
                              </div>
                            </div>

                            {book.origin === 'upload' && (
                              <button
                                type="button"
                                onClick={() => handleDeleteBook(book.fileName)}
                                aria-label={`Hapus ${book.fileName}`}
                                className="p-1.5 rounded-lg text-ink-muted hover:text-status-kedaluwarsa-text hover:bg-status-kedaluwarsa-bg/60 transition-colors cursor-pointer shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          {(book.chapters && book.chapters.length > 0 ? book.chapters : book.innerFiles).length > 0 && (
                            <div className="text-[11px] text-ink-muted bg-surface-warm rounded-lg p-2 border border-line/80">
                              <span className="font-semibold text-forest">Cakupan Bab: </span>
                              {(book.chapters && book.chapters.length > 0 ? book.chapters : book.innerFiles).join(' · ')}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Indexed Website Content */}
                <div className="p-4 rounded-2xl bg-surface border border-line space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-brand" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-forest">
                        Materi Website Ruang Obat (Aktif)
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono tabular-nums text-brand font-semibold">
                      {knowledge?.websiteChunks ?? 0} segmen
                    </span>
                  </div>
                  <ul className="text-xs text-ink-muted space-y-1 list-disc list-inside">
                    {(knowledge?.websiteModules ?? []).map((mod, i) => (
                      <li key={i}>{mod}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
