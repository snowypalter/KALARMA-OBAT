import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  ScanSearch,
  Archive,
  Dumbbell,
  BookOpen,
} from 'lucide-react';

export interface WalkthroughStep {
  id: 'cek-label' | 'lemari-stok' | 'latihan' | 'belajar-cepat';
  stepNumber: number;
  title: string;
  description: string;
  tip: string;
  icon: React.ElementType;
  accentBg: string;
  accentText: string;
}

export const WALKTHROUGH_STEPS: WalkthroughStep[] = [
  {
    id: 'cek-label',
    stepNumber: 1,
    title: 'Simulasi Cek Label Obat',
    description:
      'Ketuk 6 titik kritis pada kemasan Tablet, Sirup, dan Salep untuk mengenali arti logo golongan, aturan pakai, tanggal kedaluwarsa, hingga kode NIE BPOM.',
    tip: 'Mulai dari sini jika Anda belum terbiasa membaca etiket obat kemasan.',
    icon: ScanSearch,
    accentBg: 'bg-secondary',
    accentText: 'text-forest',
  },
  {
    id: 'lemari-stok',
    stepNumber: 2,
    title: 'Lemari Obat & Grafik Stok',
    description:
      'Catat obat yang tersimpan di rumah. Grafik otomatis mengelompokkan status Aman, Segera Kedaluwarsa (≤ 30 hari), dan Kedaluwarsa agar mudah dipantau.',
    tip: 'Klik salah satu kategori pada grafik untuk langsung menyaring daftar obat.',
    icon: Archive,
    accentBg: 'bg-status-aman-bg',
    accentText: 'text-status-aman-text',
  },
  {
    id: 'latihan',
    stepNumber: 3,
    title: 'Skenario Kasus, Flashcard & Kuis',
    description:
      'Latih pengambilan keputusan swamedikasi lewat cerita bercabang, hafalkan istilah dengan Flashcard 3D, dan ukur pemahaman lewat Kuis Pre/Post-Test.',
    tip: 'Semua jawaban kuis disertai alasan ilmiah dari pedoman resmi.',
    icon: Dumbbell,
    accentBg: 'bg-sand-soft',
    accentText: 'text-forest',
  },
  {
    id: 'belajar-cepat',
    stepNumber: 4,
    title: 'Kamus Istilah & Pustaka Resmi',
    description:
      'Temukan arti istilah seperti BUD, Exp. Date, dan P.No 1–6 di Kamus Label Obat, serta lihat sumber rujukan Kemenkes RI & BPOM di tab Pustaka.',
    tip: 'Gunakan tombol "Panduan Fitur" di atas kapan saja untuk memutar ulang tur ini.',
    icon: BookOpen,
    accentBg: 'bg-status-segera-bg',
    accentText: 'text-status-segera-text',
  },
];

interface BerandaWalkthroughProps {
  isActive: boolean;
  currentStepIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectStep: (index: number) => void;
  onClose: () => void;
  onJumpToFeature?: (stepId: WalkthroughStep['id']) => void;
}

export const BerandaWalkthrough: React.FC<BerandaWalkthroughProps> = ({
  isActive,
  currentStepIndex,
  onNext,
  onPrev,
  onSelectStep,
  onClose,
  onJumpToFeature,
}) => {
  if (!isActive) return null;

  const step = WALKTHROUGH_STEPS[currentStepIndex];
  const Icon = step.icon;
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === WALKTHROUGH_STEPS.length - 1;

  return (
    <section
      aria-label="Panduan Interaktif Fitur Beranda"
      className="ro-fade-in rounded-2xl bg-surface border border-line-strong/60 shadow-sm p-5 sm:p-6 space-y-4 relative overflow-hidden"
    >
      {/* Top Progress Strip */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-forest text-sand flex items-center justify-center shrink-0">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-brand block leading-none">
              Panduan Pengguna Baru
            </span>
            <span className="text-xs text-ink-muted font-mono tabular-nums mt-1 block">
              Langkah {step.stepNumber} dari {WALKTHROUGH_STEPS.length}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-semibold text-ink-muted hover:text-forest hover:bg-surface-muted flex items-center gap-1 transition-colors cursor-pointer"
          aria-label="Tutup panduan fitur"
        >
          <span>Lewati</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Step Content */}
      <div className="p-4 rounded-xl bg-surface-warm border border-line flex items-start gap-3.5">
        <div
          className={`w-10 h-10 rounded-xl ${step.accentBg} ${step.accentText} flex items-center justify-center shrink-0 mt-0.5`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-forest">
            {step.title}
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            {step.description}
          </p>
          <p className="text-xs text-forest font-medium bg-secondary/50 border border-line rounded-lg px-3 py-1.5">
            Tips: {step.tip}
          </p>
        </div>
      </div>

      {/* Step Dots & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Pilih langkah panduan">
          {WALKTHROUGH_STEPS.map((s, idx) => {
            const active = idx === currentStepIndex;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Langkah ${idx + 1}: ${s.title}`}
                onClick={() => onSelectStep(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  active ? 'w-7 bg-forest' : 'w-2.5 bg-line hover:bg-line-strong/60'
                }`}
              />
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 flex-wrap">
          {onJumpToFeature && (
            <button
              type="button"
              onClick={() => onJumpToFeature(step.id)}
              className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-secondary/70 hover:bg-secondary text-forest text-xs font-semibold transition-colors cursor-pointer"
            >
              Coba Fitur Ini
            </button>
          )}

          {!isFirst && (
            <button
              type="button"
              onClick={onPrev}
              className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-surface border border-line hover:bg-surface-muted text-ink text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>
          )}

          {!isLast ? (
            <button
              type="button"
              onClick={onNext}
              className="min-h-[44px] px-4 py-1.5 rounded-xl bg-brand hover:bg-forest text-on-brand text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-1.5 rounded-xl bg-status-aman-text hover:bg-forest text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Selesai</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

interface FeatureTooltipProps {
  title: string;
  content: string;
  align?: 'left' | 'right';
}

export const FeatureTooltip: React.FC<FeatureTooltipProps> = ({
  title,
  content,
  align = 'right',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={wrapperRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={`Info fitur: ${title}`}
        className={`min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus ${
          isOpen
            ? 'bg-forest text-on-brand'
            : 'bg-surface-muted hover:bg-secondary text-ink-muted hover:text-forest border border-line'
        }`}
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className={`absolute top-full mt-2 z-30 w-64 sm:w-72 p-4 rounded-2xl bg-forest text-white shadow-xl border border-white/10 text-left space-y-1.5 ro-fade-in ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-sand">{title}</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white/75 hover:text-white cursor-pointer p-0.5"
              aria-label="Tutup tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-[#D2E4DC]/90 leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
};
