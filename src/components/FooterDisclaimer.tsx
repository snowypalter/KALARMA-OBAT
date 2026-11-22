import React from 'react';
import { AlertCircle } from 'lucide-react';

interface FooterDisclaimerProps {
  onOpenAbout?: () => void;
}

export const FooterDisclaimer: React.FC<FooterDisclaimerProps> = ({ onOpenAbout }) => {
  return (
    <footer className="w-full bg-surface-muted/75 border-t border-line py-5 sm:py-6 px-4 sm:px-6 mb-20 md:mb-0">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-3">
        {/* Baris 1: Peringatan singkat Pemberitahuan Edukasi + tautan klik cepat */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm text-ink-muted leading-relaxed">
          <span className="inline-flex items-center gap-1.5 font-semibold text-forest shrink-0">
            <AlertCircle className="w-4 h-4 text-status-segera-text shrink-0" />
            <span>Pemberitahuan Edukasi:</span>
          </span>
          <span>
            Ruang Obat adalah media edukasi informasi obat dan tidak menggantikan saran apoteker atau dokter.
          </span>
          {onOpenAbout && (
            <button
              type="button"
              onClick={onOpenAbout}
              className="font-semibold text-brand hover:text-forest underline underline-offset-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-md px-1"
            >
              Tentang Website &amp; Tim Pengembang
            </button>
          )}
        </div>

        {/* Baris 2: Satu baris identitas kampus */}
        <div className="w-full max-w-3xl pt-2.5 border-t border-line/60 text-center text-xs text-ink-muted font-normal tracking-wide">
          © 2026 Ruang Obat · Farmasi Klinis dan Komunitas · Institut Kesehatan Widya Dharma Husada Tangerang
        </div>
      </div>
    </footer>
  );
};
