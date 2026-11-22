import React, { useState, useEffect, useRef } from 'react';
import { TabType } from '../types';
import { SHOW_REVIEWER_TOOLS } from '../config/appConfig';
import {
  Pill,
  FileText,
  Share2,
  Check,
  MoreVertical,
  Info,
  ShieldAlert,
  Sun,
  Moon,
  Monitor,
  Compass,
  Palette,
} from 'lucide-react';

interface HeaderProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  onOpenTinjau?: () => void;
  onOpenAbout: () => void;
  onOpenDisclaimer: () => void;
  onOpenWalkthrough?: () => void;
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenTinjau,
  onOpenAbout,
  onOpenDisclaimer,
  onOpenWalkthrough,
  theme,
  onThemeChange,
}) => {
  const [copiedPublicLink, setCopiedPublicLink] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems: { id: TabType; label: string }[] = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'cek-label', label: 'Cek Label' },
    { id: 'lemari', label: 'Lemari Obat' },
    { id: 'latihan', label: 'Latihan' },
    { id: 'pustaka', label: 'Pustaka' },
  ];

  // Close dropdown on click outside or Escape
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handlePublicShare = async () => {
    const shareUrl =
      typeof window !== 'undefined'
        ? window.location.href
        : 'https://ais-pre-i6cmepgnonm4mfj7yg2xyk-74888050060.asia-east1.run.app';
    const shareData = {
      title: 'Ruang Obat – Kenali Label Obatmu, Kelola Obat di Rumahmu',
      text: 'Media edukasi informasi label obat dan pengelolaan obat rumah tangga.',
      url: shareUrl,
    };

    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // Fallback ke salin tautan jika share dibatalkan atau tidak didukung
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedPublicLink(true);
      setTimeout(() => setCopiedPublicLink(false), 2500);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-bg/95 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8 h-16 md:h-[68px] flex items-center justify-between gap-3 sm:gap-6 md:gap-4 lg:gap-8">
        {/* Zone 1: Single-element Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('beranda')}
          className="min-h-[44px] flex items-center gap-2.5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-xl py-1 shrink-0 group"
          aria-label="Kembali ke Beranda Ruang Obat"
        >
          <span className="w-8 h-8 rounded-xl bg-forest text-on-brand flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
            <Pill className="w-4 h-4 -rotate-45" />
          </span>
          <span className="font-display text-lg sm:text-xl font-semibold text-forest tracking-tight whitespace-nowrap">
            Ruang Obat
          </span>
        </button>

        {/* Zone 2: Desktop & Tablet Single-Line Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-3.5 lg:gap-7 text-xs lg:text-sm"
          aria-label="Navigasi Desktop"
        >
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative min-h-[44px] whitespace-nowrap shrink-0 py-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-forest font-semibold'
                    : 'text-ink-muted hover:text-forest font-medium'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-brand rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: CTA Bagikan & Tombol Titik Tiga (More Menu) */}
        <div className="flex items-center gap-2 shrink-0 relative" ref={menuRef}>
          {SHOW_REVIEWER_TOOLS ? (
            <button
              type="button"
              onClick={onOpenTinjau}
              className="h-10 sm:h-11 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-on-brand bg-brand hover:bg-forest rounded-xl flex items-center gap-2 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus whitespace-nowrap"
              aria-label="Buka berkas dokumen dan tinjauan Tugas Akhir Berbasis Proyek"
            >
              <FileText className="w-4 h-4 text-sand shrink-0" />
              <span className="hidden sm:inline">Tinjau / Bagikan</span>
              <span className="sm:hidden">Tinjau</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublicShare}
              className={`h-10 sm:h-11 px-3.5 sm:px-4 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus whitespace-nowrap ${
                copiedPublicLink
                  ? 'bg-status-aman-text text-on-brand'
                  : 'bg-brand hover:bg-forest text-on-brand'
              }`}
              aria-label="Bagikan tautan Ruang Obat"
            >
              {copiedPublicLink ? (
                <>
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 shrink-0" />
                  <span>Bagikan</span>
                </>
              )}
            </button>
          )}

          {/* Tombol Ikon Titik Tiga Vertikal (More Menu) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Buka menu lainnya"
            aria-expanded={isMenuOpen}
            aria-haspopup="menu"
            className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl flex items-center justify-center border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus shrink-0 ${
              isMenuOpen
                ? 'bg-surface-muted border-line-strong text-forest ring-1 ring-line-strong'
                : 'bg-surface border-line hover:border-line-strong hover:bg-surface-muted text-forest'
            }`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div
              role="menu"
              aria-label="Menu Opsi Ruang Obat"
              className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-surface rounded-2xl shadow-xl border border-line p-2 z-50 ro-sheet-in text-ink space-y-1.5"
            >
              {/* Opsi 1: Tentang Ruang Obat */}
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenAbout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-muted text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer group"
              >
                <span className="w-8 h-8 rounded-lg bg-sand-soft text-forest flex items-center justify-center shrink-0 border border-sand/50">
                  <Info className="w-4 h-4 text-brand" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-forest leading-snug">
                    Tentang Ruang Obat
                  </div>
                  <div className="text-[11px] text-ink-muted truncate">
                    Profil platform, pustaka resmi, &amp; identitas tim
                  </div>
                </div>
              </button>

              {/* Opsi 2: Pemberitahuan Edukasi */}
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenDisclaimer();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-muted text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer group"
              >
                <span className="w-8 h-8 rounded-lg bg-status-segera-bg text-status-segera-text flex items-center justify-center shrink-0 border border-status-segera-text/30">
                  <ShieldAlert className="w-4 h-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-forest leading-snug">
                    Pemberitahuan Edukasi
                  </div>
                  <div className="text-[11px] text-ink-muted truncate">
                    Disclaimer medis &amp; prinsip patient safety
                  </div>
                </div>
              </button>

              {/* Opsi 3: Pengaturan Tema (Terang / Gelap / Sistem) */}
              <div className="px-3 py-2.5 rounded-xl bg-surface-warm border border-line/70 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-forest">
                  <span className="flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-brand" />
                    <span>Pengaturan Tema</span>
                  </span>
                  <span className="text-[10px] text-ink-muted font-normal capitalize">
                    {theme === 'system' ? 'Sistem' : theme === 'dark' ? 'Gelap' : 'Terang'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1 p-1 bg-surface-muted rounded-xl border border-line/60">
                  <button
                    type="button"
                    onClick={() => onThemeChange('light')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === 'light'
                        ? 'bg-surface text-forest shadow-xs'
                        : 'text-ink-muted hover:text-forest'
                    }`}
                  >
                    <Sun className="w-3 h-3 text-amber-600" />
                    <span>Terang</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onThemeChange('dark')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-surface text-forest shadow-xs'
                        : 'text-ink-muted hover:text-forest'
                    }`}
                  >
                    <Moon className="w-3 h-3 text-indigo-500" />
                    <span>Gelap</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onThemeChange('system')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      theme === 'system'
                        ? 'bg-surface text-forest shadow-xs'
                        : 'text-ink-muted hover:text-forest'
                    }`}
                  >
                    <Monitor className="w-3 h-3 text-brand" />
                    <span>Sistem</span>
                  </button>
                </div>
              </div>

              {/* Opsi 4: Bantuan / Panduan Singkat */}
              {onOpenWalkthrough && (
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenWalkthrough();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-muted text-left text-xs sm:text-sm font-medium transition-colors cursor-pointer group"
                >
                  <span className="w-8 h-8 rounded-lg bg-secondary text-brand flex items-center justify-center shrink-0 border border-line">
                    <Compass className="w-4 h-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-forest leading-snug">
                      Bantuan / Panduan Singkat
                    </div>
                    <div className="text-[11px] text-ink-muted truncate">
                      Tur panduan fitur langkah demi langkah
                    </div>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
