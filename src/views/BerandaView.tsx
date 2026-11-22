import React, { useState, useEffect, useRef } from 'react';
import { TabType, MedicineItem } from '../types';
import {
  calculateDaysRemaining,
  formatIndonesianDate,
  getMedicineStatus,
  getStatusMeta,
} from '../utils/medicineUtils';
import { SHOW_REVIEWER_TOOLS } from '../config/appConfig';
import { IDENTITAS_PROYEK } from '../data/identitasProyek';
import {
  ScanSearch,
  Archive,
  AlertTriangle,
  ChevronRight,
  BookA,
  Layers,
  HelpCircle,
  Share2,
  FileDown,
  FileText,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BookOpenCheck,
  Search,
  Dumbbell,
  Clock,
  Check,
  Info,
  HeartHandshake,
} from 'lucide-react';
import { generateAndDownloadPdf } from '../utils/generatePdfClient';
import { RingkasanStokObatChart } from '../components/RingkasanStokObatChart';
import { StatusBadge } from '../components/ui';
import {
  BerandaWalkthrough,
  FeatureTooltip,
  WALKTHROUGH_STEPS,
  WalkthroughStep,
} from '../components/BerandaWalkthrough';
import heroIllustration from '../assets/images/hero_ruang_obat_1795269701609.jpg';
import homeCareIllustration from '../assets/images/dagusibu_home_care_1795269733833.jpg';

const WALKTHROUGH_STORAGE_KEY = 'ruang_obat_walkthrough_done_v1';
const CHECKLIST_STORAGE_KEY = 'ruang_obat_safety_checklist_v1';

const SAFETY_CHECKLIST_ITEMS = [
  { id: 'logo', label: 'Periksa logo golongan obat (hijau, biru, atau merah K) sebelum konsumsi' },
  { id: 'bud', label: 'Catat tanggal buka pertama pada botol sirup atau tetes mata (batas BUD)' },
  { id: 'takaran', label: 'Gunakan sendok takar bawaan obat, bukan sendok makan dapur' },
  { id: 'simpan', label: 'Simpan obat di tempat sejuk dan kering, jauh dari kamar mandi lembap' },
  { id: 'kedaluwarsa', label: 'Pisahkan dan musnahkan obat kedaluwarsa sesuai panduan DAGUSIBU' },
];

const DAGUSIBU_STEPS = [
  {
    num: '01',
    title: 'Dapatkan',
    desc: 'Peroleh obat di apotek atau fasilitas berizin dan pastikan kemasan tersegel serta memiliki NIE BPOM.',
    actionLabel: 'Cek NIE Kemasan',
    target: 'cek-label' as const,
  },
  {
    num: '02',
    title: 'Gunakan',
    desc: 'Patuhi aturan pakai, dosis per takaran, dan tanda peringatan khusus tanpa berbagi antibiotik resep.',
    actionLabel: 'Latih Kasus Aman',
    target: 'latihan' as const,
  },
  {
    num: '03',
    title: 'Simpan',
    desc: 'Jaga di suhu ruang kering sesuai etiket, pisahkan dari jangkauan anak, dan pantau tanggal kedaluwarsa.',
    actionLabel: 'Panduan Simpan',
    target: 'simpan' as const,
  },
  {
    num: '04',
    title: 'Buang',
    desc: 'Rusak kemasan, campur isi tablet/salep dengan bahan tidak menarik, lalu lepas label sebelum dibuang.',
    actionLabel: 'Panduan Buang',
    target: 'buang' as const,
  },
];

interface BerandaViewProps {
  onNavigate: (tab: TabType) => void;
  onNavigateLemariWithFilter?: (filter: 'segera' | 'kedaluwarsa' | 'semua') => void;
  onNavigateLemariWithSearch?: (query: string) => void;
  onNavigateLatihan?: (subTab: 'skenario' | 'flashcard' | 'kuis') => void;
  medicines: MedicineItem[];
  onOpenKamus: (query?: string) => void;
  onOpenPanduan?: (mode?: 'simpan' | 'buang') => void;
  onOpenTinjau?: () => void;
  onOpenAbout?: () => void;
  externalWalkthroughTrigger?: number;
}

export const BerandaView: React.FC<BerandaViewProps> = ({
  onNavigate,
  onNavigateLemariWithFilter,
  onNavigateLemariWithSearch,
  onNavigateLatihan,
  medicines,
  onOpenKamus,
  onOpenPanduan,
  onOpenTinjau,
  onOpenAbout,
  externalWalkthroughTrigger,
}) => {
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem(WALKTHROUGH_STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const [walkthroughStepIndex, setWalkthroughStepIndex] = useState(0);
  const [heroImgError, setHeroImgError] = useState(false);
  const [careImgError, setCareImgError] = useState(false);
  const [heroSearch, setHeroSearch] = useState('');
  const [checkedSafetyIds, setCheckedSafetyIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['logo'];
    } catch {
      return ['logo'];
    }
  });

  const cekLabelRef = useRef<HTMLDivElement>(null);
  const lemariStokRef = useRef<HTMLDivElement>(null);
  const latihanRef = useRef<HTMLDivElement>(null);
  const belajarCepatRef = useRef<HTMLDivElement>(null);

  const activeStepId = isWalkthroughOpen
    ? WALKTHROUGH_STEPS[walkthroughStepIndex]?.id
    : null;

  const scrollToStepTarget = (stepId: WalkthroughStep['id']) => {
    const refMap: Record<WalkthroughStep['id'], React.RefObject<HTMLDivElement | null>> = {
      'cek-label': cekLabelRef,
      'lemari-stok': lemariStokRef,
      'latihan': latihanRef,
      'belajar-cepat': belajarCepatRef,
    };
    const target = refMap[stepId]?.current;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    if (!isWalkthroughOpen) return;
    if (walkthroughStepIndex > 0) {
      scrollToStepTarget(WALKTHROUGH_STEPS[walkthroughStepIndex].id);
    }
  }, [walkthroughStepIndex, isWalkthroughOpen]);

  useEffect(() => {
    if (externalWalkthroughTrigger && externalWalkthroughTrigger > 0) {
      setWalkthroughStepIndex(0);
      setIsWalkthroughOpen(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [externalWalkthroughTrigger]);

  const handleCloseWalkthrough = () => {
    setIsWalkthroughOpen(false);
    try {
      localStorage.setItem(WALKTHROUGH_STORAGE_KEY, 'true');
    } catch {
      // ignore storage errors
    }
  };

  const handleOpenWalkthrough = () => {
    setWalkthroughStepIndex(0);
    setIsWalkthroughOpen(true);
  };

  const handleJumpToFeature = (stepId: WalkthroughStep['id']) => {
    handleCloseWalkthrough();
    if (stepId === 'cek-label') {
      onNavigate('cek-label');
    } else if (stepId === 'lemari-stok') {
      onNavigate('lemari');
    } else if (stepId === 'latihan') {
      if (onNavigateLatihan) {
        onNavigateLatihan('skenario');
      } else {
        onNavigate('latihan');
      }
    } else if (stepId === 'belajar-cepat') {
      onOpenKamus();
    }
  };

  const toggleSafetyCheck = (id: string) => {
    setCheckedSafetyIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = heroSearch.trim();
    const hasMatchInMedicines =
      q.length > 0 &&
      medicines.some((m) => m.name.toLowerCase().includes(q.toLowerCase()));
    if (hasMatchInMedicines && onNavigateLemariWithSearch) {
      onNavigateLemariWithSearch(q);
    } else {
      onOpenKamus(q);
    }
  };

  const expiringOrExpired = medicines.filter((m) => {
    const days = calculateDaysRemaining(m.expiryDate);
    return days <= 30;
  });

  const warningCount = expiringOrExpired.length;
  const amanCount = medicines.length - warningCount;

  const nearestMedicines = [...medicines]
    .sort(
      (a, b) =>
        calculateDaysRemaining(a.expiryDate) - calculateDaysRemaining(b.expiryDate)
    )
    .slice(0, 4);

  const checklistProgress = Math.round(
    (checkedSafetyIds.length / SAFETY_CHECKLIST_ITEMS.length) * 100
  );

  return (
    <div className="space-y-10 sm:space-y-12 pb-12 ro-fade-in">
      {/* Opening Mountain Meadow Forest Hero + Integrated Search & Shortcut Tiles */}
      <section className="rounded-3xl bg-gradient-to-br from-forest via-forest to-[#1B2E29] text-white border border-forest p-5 sm:p-8 lg:p-10 shadow-sm space-y-7 relative overflow-hidden">
        {/* Top Editorial Kicker & Walkthrough Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="hidden xs:inline-block w-7 h-px bg-sand/70 shrink-0" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sand leading-snug">
              {IDENTITAS_PROYEK.badgeBeranda}
            </p>
          </div>

          <button
            type="button"
            onClick={isWalkthroughOpen ? handleCloseWalkthrough : handleOpenWalkthrough}
            className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
          >
            <Compass className="w-3.5 h-3.5 text-sand" />
            <span>{isWalkthroughOpen ? 'Tutup Panduan' : 'Panduan Fitur'}</span>
          </button>
        </div>

        {/* Hero Split Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5 text-left">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[3rem] font-semibold text-white leading-[1.12] tracking-tight text-balance">
              Kenali label obatmu,{' '}
              <span className="italic font-normal text-sand">
                kelola obat di rumahmu.
              </span>
            </h1>

            <p className="text-[#D2E4DC] text-sm sm:text-base max-w-xl leading-relaxed">
              Pelajari simbol golongan obat resmi, aturan pakai, serta batas masa simpan secara mandiri dan tenang untuk menjaga keselamatan keluarga.
            </p>

            {/* Quick Search Dock — Responsif Mobile, Tablet & Desktop */}
            <form
              onSubmit={handleHeroSearchSubmit}
              className="w-full max-w-full box-border p-2 sm:p-2.5 rounded-2xl bg-surface text-ink shadow-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2 overflow-hidden"
            >
              <div className="relative w-full max-w-full min-w-0 flex-1 flex items-center box-border">
                <Search className="w-4 h-4 text-ink-muted absolute left-3 pointer-events-none shrink-0" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Cari istilah (BUD, NIE) atau nama obat di lemari..."
                  aria-label="Cari istilah label obat atau nama obat"
                  className="w-full max-w-full min-h-[44px] pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-transparent text-ink placeholder:text-ink-muted/75 focus:outline-none box-border"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateLemariWithSearch) {
                      onNavigateLemariWithSearch(heroSearch.trim());
                    } else {
                      onNavigate('lemari');
                    }
                  }}
                  className="min-h-[44px] w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-muted hover:bg-secondary/70 text-forest text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center justify-center flex items-center whitespace-nowrap"
                >
                  Cari Lemari
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] w-full sm:w-auto px-4 py-2.5 rounded-xl bg-brand hover:bg-forest text-on-brand text-xs sm:text-sm font-semibold transition-colors cursor-pointer text-center justify-center flex items-center whitespace-nowrap"
                >
                  Cari Kamus
                </button>
              </div>
            </form>

            {/* 4 Mountain Meadow Category Shortcut Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('cek-label')}
                className="min-h-[44px] p-3 rounded-2xl bg-brand hover:bg-brand/90 border border-white/10 text-left flex items-center gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <ScanSearch className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs font-semibold text-white whitespace-nowrap">
                  Cek Label
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('lemari')}
                className="min-h-[44px] p-3 rounded-2xl bg-[#B86E18] hover:bg-[#a36114] border border-white/10 text-left flex items-center gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Archive className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs font-semibold text-white whitespace-nowrap">
                  Lemari Obat
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onNavigateLatihan) onNavigateLatihan('skenario');
                  else onNavigate('latihan');
                }}
                className="min-h-[44px] p-3 rounded-2xl bg-[#3D5A6C] hover:bg-[#344d5d] border border-white/10 text-left flex items-center gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Dumbbell className="w-4 h-4 text-white" />
                </span>
                <span className="text-xs font-semibold text-white whitespace-nowrap">
                  Latihan
                </span>
              </button>

              <button
                type="button"
                onClick={() => onOpenKamus('')}
                className="min-h-[44px] p-3 rounded-2xl bg-sand hover:bg-sand-soft border border-white/10 text-left flex items-center gap-2.5 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="w-8 h-8 rounded-lg bg-forest/15 flex items-center justify-center shrink-0">
                  <BookA className="w-4 h-4 text-forest" />
                </span>
                <span className="text-xs font-semibold text-forest whitespace-nowrap">
                  Kamus
                </span>
              </button>
            </div>
          </div>

          {/* Framed Warm Botanical Illustration */}
          <div className="lg:col-span-5">
            <figure className="rounded-2xl overflow-hidden border border-white/15 bg-surface-warm shadow-md">
              <div className="aspect-[4/3] overflow-hidden">
                {!heroImgError ? (
                  <img
                    src={heroIllustration}
                    alt="Ilustrasi rak apotek rumah tangga berisi botol sirup kaca amber, strip tablet, salep, dan daun eukaliptus"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-surface-warm via-secondary/40 to-sand-soft/50">
                    <div className="w-16 h-16 rounded-2xl bg-forest text-sand flex items-center justify-center mb-3">
                      <ScanSearch className="w-8 h-8" />
                    </div>
                    <p className="font-display text-lg text-forest font-semibold">
                      Ruang Edukasi Obat Keluarga
                    </p>
                  </div>
                )}
              </div>
              <figcaption className="px-4 py-2.5 bg-surface-warm text-forest border-t border-line flex items-center justify-between gap-2 text-xs">
                <span className="font-semibold">Simulasi 6 Titik Kemasan</span>
                <span className="font-mono text-[11px] text-ink-muted">Tablet · Sirup · Salep</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* 3-Column Trust & Pillar Strip along Hero Base */}
        <div className="pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm relative z-10">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-sand flex items-center justify-center shrink-0 mt-0.5">
              <BookOpenCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">6 Titik Label Resmi</p>
              <p className="text-xs text-[#D2E4DC]/90 leading-snug">Logo golongan, dosis, ED/BUD, &amp; NIE BPOM</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-sand flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Prinsip DAGUSIBU</p>
              <p className="text-xs text-[#D2E4DC]/90 leading-snug">Dapatkan, Gunakan, Simpan, dan Buang aman</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 text-sand flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-white">Rujukan BPOM &amp; Kemenkes</p>
              <p className="text-xs text-[#D2E4DC]/90 leading-snug">Data lemari tersimpan privat di perangkat</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive New-User Walkthrough */}
      <BerandaWalkthrough
        isActive={isWalkthroughOpen}
        currentStepIndex={walkthroughStepIndex}
        onNext={() =>
          setWalkthroughStepIndex((prev) =>
            Math.min(prev + 1, WALKTHROUGH_STEPS.length - 1)
          )
        }
        onPrev={() => setWalkthroughStepIndex((prev) => Math.max(prev - 1, 0))}
        onSelectStep={(idx) => {
          setWalkthroughStepIndex(idx);
          scrollToStepTarget(WALKTHROUGH_STEPS[idx].id);
        }}
        onClose={handleCloseWalkthrough}
        onJumpToFeature={handleJumpToFeature}
      />

      {/* Warning Banner: Hanya muncul bila ada data obat <= 30 hari atau sudah kedaluwarsa */}
      {warningCount > 0 && (
        <button
          type="button"
          onClick={() => {
            if (onNavigateLemariWithFilter) {
              onNavigateLemariWithFilter('segera');
            } else {
              onNavigate('lemari');
            }
          }}
          className="w-full min-h-[44px] p-4 sm:p-5 rounded-2xl bg-status-segera-bg/85 border border-status-segera-text/25 flex items-center justify-between gap-4 text-left transition-all hover:bg-status-segera-bg cursor-pointer group"
          aria-label={`Peringatan: ada ${warningCount} obat yang hampir atau telah kedaluwarsa. Ketuk untuk membuka lemari obat.`}
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-surface text-status-segera-text border border-status-segera-text/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-ink text-sm sm:text-base">
                  Perhatian Masa Simpan Obat
                </span>
                <span className="text-xs font-mono font-semibold tabular-nums text-status-segera-text">
                  · {warningCount} Obat perlu dicek
                </span>
              </div>
              <p className="text-xs sm:text-sm text-ink-muted mt-0.5 leading-relaxed">
                Terdapat {warningCount} persediaan obat di lemarimu yang mendekati atau melewati batas kedaluwarsa.
              </p>
            </div>
          </div>
          <div className="flex items-center text-status-segera-text font-semibold text-xs sm:text-sm shrink-0 group-hover:translate-x-1 transition-transform">
            <span className="hidden sm:inline mr-1">Periksa Lemari</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>
      )}

      {/* SECTION 01: Ringkasan Lemari & Pantauan Masa Simpan (Inspired by Image 1 Dashboard) */}
      <section aria-label="Ringkasan Lemari dan Jadwal Masa Simpan" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-line">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              <span className="font-mono text-forest">01</span>
              <span aria-hidden="true">/</span>
              <span>Pantauan Lemari Rumah</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-forest tracking-tight">
              Kondisi stok &amp; masa simpan.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted max-w-md leading-relaxed">
            Ringkasan visual persediaan obat di perangkat Anda beserta daftar obat yang paling dekat batas kedaluwarsanya.
          </p>
        </div>

        {/* 4 Botanical KPI Tiles (Inspired by Image 1) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          <button
            type="button"
            onClick={() => onNavigate('lemari')}
            className="relative overflow-hidden min-h-[44px] p-4 sm:p-5 rounded-2xl bg-surface-warm border border-line hover:border-line-strong hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-2 text-xs text-ink-muted font-medium relative z-10">
              <span>Total Obat</span>
              <Archive className="w-4 h-4 text-brand shrink-0" />
            </div>
            <div className="relative z-10">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-forest tabular-nums leading-none block">
                {medicines.length}
              </span>
              <span className="text-[11px] text-ink-muted mt-1.5 block group-hover:text-forest transition-colors">
                Tersimpan di perangkat →
              </span>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="w-14 h-14 text-brand/10 absolute -bottom-2 -right-2 pointer-events-none"
              fill="currentColor"
            >
              <path d="M54 10C30 10 14 26 14 50c24 0 40-16 40-40Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('lemari')}
            className="relative overflow-hidden min-h-[44px] p-4 sm:p-5 rounded-2xl bg-status-aman-bg/45 border border-status-aman-text/20 hover:border-status-aman-text/45 hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-2 text-xs text-status-aman-text font-semibold relative z-10">
              <span>Status Aman</span>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            </div>
            <div className="relative z-10">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-forest tabular-nums leading-none block">
                {amanCount}
              </span>
              <span className="text-[11px] text-ink-muted mt-1.5 block">
                Masa simpan &gt; 30 hari
              </span>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="w-14 h-14 text-status-aman-text/10 absolute -bottom-2 -right-2 pointer-events-none"
              fill="currentColor"
            >
              <path d="M54 10C30 10 14 26 14 50c24 0 40-16 40-40Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => {
              if (onNavigateLemariWithFilter) onNavigateLemariWithFilter('segera');
              else onNavigate('lemari');
            }}
            className={`relative overflow-hidden min-h-[44px] p-4 sm:p-5 rounded-2xl border hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group ${
              warningCount > 0
                ? 'bg-status-segera-bg/65 border-status-segera-text/25 hover:border-status-segera-text/50'
                : 'bg-sand-soft/50 border-line hover:border-line-strong'
            }`}
          >
            <div
              className={`flex items-center justify-between gap-2 text-xs font-semibold relative z-10 ${
                warningCount > 0 ? 'text-status-segera-text' : 'text-ink-muted'
              }`}
            >
              <span>Perlu Dicek</span>
              <AlertTriangle className="w-4 h-4 shrink-0" />
            </div>
            <div className="relative z-10">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-forest tabular-nums leading-none block">
                {warningCount}
              </span>
              <span className="text-[11px] text-ink-muted mt-1.5 block">
                ≤ 30 hari atau ED
              </span>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="w-14 h-14 text-status-segera-text/10 absolute -bottom-2 -right-2 pointer-events-none"
              fill="currentColor"
            >
              <path d="M54 10C30 10 14 26 14 50c24 0 40-16 40-40Z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('cek-label')}
            className="relative overflow-hidden min-h-[44px] p-4 sm:p-5 rounded-2xl bg-secondary/45 border border-line hover:border-line-strong hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between gap-2 text-xs text-forest font-semibold relative z-10">
              <span>Simulasi Label</span>
              <ScanSearch className="w-4 h-4 text-brand shrink-0" />
            </div>
            <div className="relative z-10">
              <span className="font-display text-2xl sm:text-3xl font-semibold text-forest tabular-nums leading-none block">
                3
              </span>
              <span className="text-[11px] text-ink-muted mt-1.5 block">
                Tablet · Sirup · Salep
              </span>
            </div>
            <svg
              aria-hidden="true"
              viewBox="0 0 64 64"
              className="w-14 h-14 text-brand/10 absolute -bottom-2 -right-2 pointer-events-none"
              fill="currentColor"
            >
              <path d="M54 10C30 10 14 26 14 50c24 0 40-16 40-40Z" />
            </svg>
          </button>
        </div>

        {/* Analytics Chart + Nearest Expiry Watchlist (Inspired by Image 1 Table + Charts) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div
            ref={lemariStokRef}
            className={`lg:col-span-7 rounded-2xl transition-all flex ${
              activeStepId === 'lemari-stok'
                ? 'ring-2 ring-brand ring-offset-4 ring-offset-bg'
                : ''
            }`}
          >
            <div className="w-full">
              <RingkasanStokObatChart
                medicines={medicines}
                onNavigateLemariWithFilter={onNavigateLemariWithFilter}
                onNavigateToLemari={() => onNavigate('lemari')}
              />
            </div>
          </div>

          {/* Upcoming Expiry Watchlist Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-surface border border-line flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-line">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-brand flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pantauan Terdekat</span>
                </span>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-forest">
                  Jadwal Masa Simpan
                </h3>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('lemari')}
                className="min-h-[44px] px-2.5 text-xs font-semibold text-brand hover:text-forest inline-flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>Semua</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {nearestMedicines.length === 0 ? (
              <div className="py-8 text-center space-y-2">
                <p className="text-sm font-medium text-ink-muted">
                  Belum ada obat di lemari.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('lemari')}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-brand text-on-brand text-xs font-semibold cursor-pointer"
                >
                  Catat Obat Pertama
                </button>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {nearestMedicines.map((med) => {
                  const days = calculateDaysRemaining(med.expiryDate);
                  const status = getMedicineStatus(med.expiryDate);
                  const meta = getStatusMeta(status, days);

                  return (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => {
                        if (
                          onNavigateLemariWithFilter &&
                          (status === 'segera' || status === 'kedaluwarsa')
                        ) {
                          onNavigateLemariWithFilter(status);
                        } else {
                          onNavigate('lemari');
                        }
                      }}
                      className="w-full min-h-[44px] py-3 flex items-center justify-between gap-3 text-left hover:bg-surface-warm/80 px-2 -mx-2 rounded-xl transition-colors cursor-pointer group"
                    >
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-sm font-semibold text-forest truncate group-hover:text-brand transition-colors">
                          {med.name}
                        </p>
                        <p className="text-xs text-ink-muted font-mono tabular-nums">
                          {formatIndonesianDate(med.expiryDate)} · {med.sediaan}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <StatusBadge status={status} label={meta.label} size="sm" />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            <p className="text-[11px] text-ink-muted pt-2 border-t border-line/70">
              Ketuk baris obat untuk membuka rincian status &amp; panduan simpannya.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 02: Eksplorasi Kemasan, Kasus Nyata & Aksi Cepat */}
      <section aria-label="Fitur Utama dan Aksi Cepat" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-line">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              <span className="font-mono text-forest">02</span>
              <span aria-hidden="true">/</span>
              <span>Eksplorasi &amp; Latihan</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-forest tracking-tight">
              Kenali kemasan, latih keputusan aman.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted max-w-md leading-relaxed">
            Simulasi 6 titik informasi label obat, skenario kasus swamedikasi harian, serta akses cepat menu penting.
          </p>
        </div>

        {/* 2 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Cek Label */}
          <div
            ref={cekLabelRef}
            className={`relative rounded-2xl transition-all ${
              activeStepId === 'cek-label'
                ? 'ring-2 ring-brand ring-offset-4 ring-offset-bg'
                : ''
            }`}
          >
            <button
              type="button"
              onClick={() => onNavigate('cek-label')}
              className="w-full h-full p-6 sm:p-7 rounded-2xl bg-surface border border-line hover:border-line-strong hover:-translate-y-0.5 hover:shadow-sm transition-all text-left flex flex-col justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pr-12">
                  <div className="w-12 h-12 rounded-xl bg-secondary text-forest flex items-center justify-center group-hover:bg-brand group-hover:text-on-brand transition-colors">
                    <ScanSearch className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-ink-muted">
                    6 Titik Kemasan
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-forest">
                    Cek Label Obat
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    Simulasi interaktif kemasan Tablet, Sirup, dan Salep. Ketuk 6 titik kritis untuk memahami logo golongan, aturan pakai, hingga nomor izin edar.
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-line/70 flex items-center text-brand group-hover:text-forest font-semibold text-sm">
                <span>Mulai Simulasi Kemasan</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <div className="absolute top-5 right-4 z-10">
              <FeatureTooltip
                title="Cek Label Obat (6 Titik)"
                content="Ketuk nomor 1–6 pada kemasan Tablet, Sirup, atau Salep untuk memahami arti logo golongan, dosis zat aktif, batas kedaluwarsa (ED/BUD), dan nomor NIE BPOM."
              />
            </div>
          </div>

          {/* Card 2: Lemari Obat */}
          <div className="relative rounded-2xl">
            <button
              type="button"
              onClick={() => onNavigate('lemari')}
              className="w-full h-full p-6 sm:p-7 rounded-2xl bg-surface border border-line hover:border-line-strong hover:-translate-y-0.5 hover:shadow-sm transition-all text-left flex flex-col justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pr-12">
                  <div className="w-12 h-12 rounded-xl bg-status-aman-bg text-status-aman-text flex items-center justify-center group-hover:bg-brand group-hover:text-on-brand transition-colors">
                    <Archive className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono tabular-nums text-ink-muted">
                    {medicines.length} Obat Tercatat
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-forest">
                    Lemari Obat Saya
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    Catat dan pantau tanggal kedaluwarsa obat rumah tangga secara otomatis dalam tiga status keselamatan, lengkap dengan saran pembuangan cerdas.
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-line/70 flex items-center text-brand group-hover:text-forest font-semibold text-sm">
                <span>Kelola Lemari Obat</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <div className="absolute top-5 right-4 z-10">
              <FeatureTooltip
                title="Lemari Obat Saya (Lokal)"
                content="Data persediaan obat Anda hanya tersimpan di memori perangkat ini (localStorage) tanpa dikirim ke server. Tersedia pula notifikasi cerdas cara memusnahkan obat kedaluwarsa."
              />
            </div>
          </div>
        </div>

        {/* 3-Column Editorial Insight Row (Inspired by Image 1 Bottom Row: Scenario + Quote + Quick Actions) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Col 1: Skenario Swamedikasi (Mountain Meadow Dark Card) */}
          <div
            ref={latihanRef}
            className={`lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-forest via-forest to-[#1B2E29] text-white flex flex-col justify-between space-y-5 transition-all ${
              activeStepId === 'latihan'
                ? 'ring-2 ring-brand ring-offset-4 ring-offset-bg'
                : ''
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 text-xs text-sand font-semibold uppercase tracking-[0.1em]">
                <span>Skenario Swamedikasi</span>
                <span className="text-[#D2E4DC]/85 font-mono normal-case tracking-normal">
                  Kasus Nyata
                </span>
              </div>

              <blockquote className="font-display italic text-xl sm:text-2xl text-white leading-snug">
                &ldquo;Demam, ada sisa antibiotik teman...&rdquo;
              </blockquote>

              <p className="text-xs sm:text-sm text-[#D2E4DC]/95 leading-relaxed">
                Teman sekamarmu memiliki sisa kapsul antibiotik dari resep bulan lalu dan menawarinya saat kamu demam tinggi. Apakah aman dilakukan?
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 space-y-3">
              <div className="flex items-center gap-2 text-xs text-sand">
                <HelpCircle className="w-4 h-4 shrink-0" />
                <span>Ketahui kapan saat tepat bertanya ke apoteker</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (onNavigateLatihan) onNavigateLatihan('skenario');
                  else onNavigate('latihan');
                }}
                className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-sand hover:bg-sand-soft text-forest font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Uji Pilihanmu di Latihan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Warm Botanical Quote Card (Inspired by Image 1 center quote card) */}
          <div className="lg:col-span-3 p-6 rounded-2xl bg-gradient-to-br from-surface-warm via-sand-soft/55 to-secondary/35 border border-line flex flex-col items-center justify-center text-center relative overflow-hidden">
            <svg
              aria-hidden="true"
              viewBox="0 0 80 80"
              className="w-20 h-20 text-brand/15 absolute -bottom-3 -right-3 pointer-events-none"
              fill="currentColor"
            >
              <path d="M68 12C38 12 18 32 18 62c30 0 50-20 50-50Z" />
            </svg>
            <div className="relative z-10 space-y-3 max-w-xs">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand block">
                Prinsip Utama
              </span>
              <p className="font-display italic text-lg sm:text-xl text-forest leading-snug">
                &ldquo;Membaca etiket obat secara utuh adalah langkah pertama menjaga keselamatan keluarga.&rdquo;
              </p>
              <div className="w-8 h-px bg-brand/40 mx-auto" aria-hidden="true" />
              <p className="text-xs text-ink-muted">
                Cek Logo · Cek ED/BUD · Tanya Apoteker
              </p>
            </div>
          </div>

          {/* Col 3: Quick Actions Stack (Inspired by Image 1 Quick Actions panel) */}
          <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-surface border border-line flex flex-col justify-between space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-forest pb-2 border-b border-line">
              <Sparkles className="w-4 h-4 text-brand" />
              <span>Aksi Cepat</span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => onNavigate('cek-label')}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-surface-warm hover:bg-secondary/45 border border-line text-left flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-forest transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <ScanSearch className="w-4 h-4 text-brand shrink-0" />
                  <span>Simulasi Label 6 Titik</span>
                </span>
                <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('lemari')}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-surface-warm hover:bg-secondary/45 border border-line text-left flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-forest transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Archive className="w-4 h-4 text-brand shrink-0" />
                  <span>Kelola Lemari Obat</span>
                </span>
                <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenPanduan) onOpenPanduan('buang');
                  else onNavigate('lemari');
                }}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-surface-warm hover:bg-secondary/45 border border-line text-left flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-forest transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <HeartHandshake className="w-4 h-4 text-brand shrink-0" />
                  <span>Panduan Simpan &amp; Buang</span>
                </span>
                <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />
              </button>

              {onOpenAbout && (
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-surface-warm hover:bg-secondary/45 border border-line text-left flex items-center justify-between gap-2 text-xs sm:text-sm font-semibold text-forest transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-brand shrink-0" />
                    <span>Tentang &amp; Profil Pengembang</span>
                  </span>
                  <ChevronRight className="w-4 h-4 text-ink-muted shrink-0" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: Alur DAGUSIBU & Daftar Periksa Keamanan Rumah (Inspired by Image 3 Pathway + Image 4 Checklist) */}
      <section aria-label="Alur DAGUSIBU dan Belajar Cepat" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-line">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
              <span className="font-mono text-forest">03</span>
              <span aria-hidden="true">/</span>
              <span>Literasi DAGUSIBU</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-forest tracking-tight">
              Empat langkah bijak kelola obat.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-muted max-w-md leading-relaxed">
            Ikuti alur pengelolaan obat dari saat membeli hingga memusnahkan agar khasiat terjaga dan keluarga terlindungi.
          </p>
        </div>

        {/* 4-Step Connected DAGUSIBU Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DAGUSIBU_STEPS.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-2xl bg-surface border border-line flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand">
                    Langkah {step.num}
                  </span>
                  <span className="w-6 h-px bg-line-strong/40" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl font-semibold text-forest">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (step.target === 'cek-label') onNavigate('cek-label');
                  else if (step.target === 'latihan') {
                    if (onNavigateLatihan) onNavigateLatihan('skenario');
                    else onNavigate('latihan');
                  } else if (step.target === 'simpan' || step.target === 'buang') {
                    if (onOpenPanduan) onOpenPanduan(step.target);
                    else onNavigate('lemari');
                  }
                }}
                className="min-h-[44px] pt-2 border-t border-line/70 text-xs font-semibold text-brand hover:text-forest inline-flex items-center justify-between gap-2 cursor-pointer"
              >
                <span>{step.actionLabel}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Interactive Home Safety Checklist (Image 4 Checklist) + Belajar Cepat Card */}
        <div
          ref={belajarCepatRef}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch transition-all rounded-3xl ${
            activeStepId === 'belajar-cepat'
              ? 'ring-2 ring-brand ring-offset-4 ring-offset-bg'
              : ''
          }`}
        >
          {/* Left: Home Safety Interactive Checklist (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-surface-warm border border-line flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">
                  Daftar Periksa Rumah
                </span>
                <span className="text-xs font-mono tabular-nums font-semibold text-forest">
                  {checkedSafetyIds.length}/{SAFETY_CHECKLIST_ITEMS.length} selesai
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-forest">
                Kebiasaan Aman Keluarga
              </h3>
              <div className="h-2 w-full rounded-full bg-surface-muted overflow-hidden">
                <div
                  className="h-full bg-brand rounded-full transition-all duration-300"
                  style={{ width: `${checklistProgress}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              {SAFETY_CHECKLIST_ITEMS.map((item) => {
                const checked = checkedSafetyIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleSafetyCheck(item.id)}
                    className={`w-full min-h-[44px] p-3 rounded-xl border text-left flex items-start gap-3 transition-colors cursor-pointer ${
                      checked
                        ? 'bg-status-aman-bg/45 border-status-aman-text/25 text-ink'
                        : 'bg-surface border-line hover:border-line-strong text-ink-muted'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        checked
                          ? 'bg-brand border-brand text-white'
                          : 'bg-surface border-line-strong/60'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </span>
                    <span
                      className={`text-xs leading-relaxed ${
                        checked ? 'line-through text-ink-muted' : 'text-ink'
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Belajar Cepat & Home Care Illustration (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl bg-surface-warm border border-line flex flex-col justify-between gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-5">
                <figure className="rounded-2xl overflow-hidden border border-line bg-bg aspect-[4/3]">
                  {!careImgError ? (
                    <img
                      src={homeCareIllustration}
                      alt="Ilustrasi kotak penyimpanan obat keluarga yang rapi lengkap dengan gelas takar"
                      referrerPolicy="no-referrer"
                      onError={() => setCareImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/40 text-forest p-6 text-center">
                      <span className="font-display text-base font-semibold">
                        Prinsip DAGUSIBU Rumah Tangga
                      </span>
                    </div>
                  )}
                </figure>
              </div>

              <div className="sm:col-span-7 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                    Belajar Cepat
                  </span>
                  <FeatureTooltip
                    title="Akses Cepat Belajar"
                    content="Buka Kamus Label Obat untuk mencari istilah medis resmi, atau gunakan Flashcard 3D untuk mengulang hafalan simbol dan aturan Dagusibu."
                  />
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-forest">
                  Perkuat Pemahaman Istilah &amp; Simbol
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Pelajari arti NIE, BUD, peringatan P.No 1–6, dan uji ingatanmu dengan kartu hafalan interaktif.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <button
                type="button"
                onClick={() => onOpenKamus('')}
                className="min-h-[44px] p-4 rounded-2xl bg-surface border border-line hover:border-line-strong hover:-translate-y-0.5 flex items-start gap-3.5 text-left transition-all cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary text-forest flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-on-brand transition-colors">
                  <BookA className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm sm:text-base font-bold text-forest">
                    Kamus Label Obat
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Cari arti NIE, BUD, Exp. Date, serta simbol lingkaran obat resmi
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onNavigateLatihan) onNavigateLatihan('flashcard');
                  else onNavigate('latihan');
                }}
                className="min-h-[44px] p-4 rounded-2xl bg-surface border border-line hover:border-line-strong hover:-translate-y-0.5 flex items-start gap-3.5 text-left transition-all cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-xl bg-sand-soft text-forest flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-on-brand transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm sm:text-base font-bold text-forest">
                    Flashcard 3D Cepat
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Latih daya ingat tanda peringatan P.No 1–6 dan aturan Dagusibu
                  </p>
                </div>
              </button>
            </div>

            {onOpenAbout && (
              <div className="pt-1 border-t border-line/70 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
                <span>Ingin mengenal profil pengembang &amp; batasan etika?</span>
                <button
                  type="button"
                  onClick={onOpenAbout}
                  className="min-h-[44px] inline-flex items-center px-2 font-semibold text-brand hover:text-forest underline underline-offset-4 cursor-pointer"
                >
                  Tentang Ruang Obat
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Closing Warm Editorial Banner (Inspired by Image 3 Bottom CTA) */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-secondary/60 via-surface-warm to-sand-soft/60 border border-line flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Evaluasi Pemahaman Mandiri
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-semibold text-forest">
            Siap menguji kecakapan membaca label obatmu?
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            Kerjakan kuis evaluasi singkat atau telusuri pustaka rujukan resmi BPOM RI dan Kementerian Kesehatan RI.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              if (onNavigateLatihan) onNavigateLatihan('kuis');
              else onNavigate('latihan');
            }}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-brand hover:bg-forest text-on-brand text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>Mulai Kuis Evaluasi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('pustaka')}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-muted border border-line text-forest text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            Lihat Pustaka
          </button>
        </div>
      </section>

      {/* Card: Berkas Dokumen Tugas Akhir Berbasis Proyek & Peninjauan (tersembunyi bila SHOW_REVIEWER_TOOLS = false) */}
      {SHOW_REVIEWER_TOOLS && onOpenTinjau && (
        <section className="p-5 sm:p-6 rounded-2xl bg-surface border border-line flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-forest text-sand flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Berkas {IDENTITAS_PROYEK.jenisKarya} · Format PDF Resmi A4
              </p>
              <h3 className="font-display text-lg font-semibold text-forest">
                Dokumen Pengembangan untuk Dosen Pembimbing dan Penguji
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted max-w-2xl leading-relaxed">
                Tersedia berkas PDF 4 halaman berisi identitas proyek, spesifikasi 6 titik kemasan, batasan etika farmasi, dan lembar penilaian dosen pembimbing dan penguji.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => generateAndDownloadPdf()}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-brand hover:bg-forest text-on-brand font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-sand" />
              <span>Unduh PDF</span>
            </button>

            <button
              type="button"
              onClick={onOpenTinjau}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-muted hover:bg-secondary/60 border border-line text-forest font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-brand" />
              <span>Buka Dokumen</span>
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
