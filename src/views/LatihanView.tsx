import React, { useState } from 'react';
import { TabType } from '../types';
import { LatihanSubTab } from '../types/latihan';
import { SkenarioModule } from '../components/latihan/SkenarioModule';
import { FlashcardModule } from '../components/latihan/FlashcardModule';
import { KuisModule } from '../components/latihan/KuisModule';
import { GitBranch, Layers, FileCheck2, ArrowLeft } from 'lucide-react';

interface LatihanViewProps {
  onNavigate: (tab: TabType) => void;
  initialSubTab?: LatihanSubTab;
}

export const LatihanView: React.FC<LatihanViewProps> = ({
  onNavigate,
  initialSubTab = 'skenario',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<LatihanSubTab>(initialSubTab);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 ro-fade-in">
      {/* Top Breadcrumb & Editorial Header */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onNavigate('beranda')}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-forest cursor-pointer mb-1 py-2 pr-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          Media Edukasi Tugas Akhir Berbasis Proyek S1 Farmasi Klinik dan Komunitas · Modul Latihan &amp; Evaluasi
        </p>

        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-forest tracking-tight">
          Latihan &amp; Uji Pemahaman
        </h1>
        <p className="text-ink-muted text-sm sm:text-base max-w-2xl leading-relaxed">
          Asah ketepatan membaca label dan mengambil keputusan swamedikasi melalui skenario kasus nyata, flashcard interaktif, serta kuis evaluasi terstandar.
        </p>
      </div>

      {/* Sub-tab Navigation (Skenario, Flashcard, Kuis) */}
      <div
        className="grid grid-cols-3 gap-1.5 p-1.5 bg-surface-muted rounded-2xl border border-line"
        role="tablist"
        aria-label="Pilih modul latihan"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'skenario'}
          onClick={() => {
            setActiveSubTab('skenario');
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className={`min-h-[46px] px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'skenario'
              ? 'bg-surface text-forest shadow-xs'
              : 'text-ink-muted hover:text-forest'
          }`}
        >
          <GitBranch className="w-4 h-4 text-brand shrink-0" />
          <span className="truncate">Skenario Kasus</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'flashcard'}
          onClick={() => {
            setActiveSubTab('flashcard');
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className={`min-h-[46px] px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'flashcard'
              ? 'bg-surface text-forest shadow-xs'
              : 'text-ink-muted hover:text-forest'
          }`}
        >
          <Layers className="w-4 h-4 text-brand shrink-0" />
          <span className="truncate">Flashcard</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeSubTab === 'kuis'}
          onClick={() => {
            setActiveSubTab('kuis');
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          className={`min-h-[46px] px-2 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'kuis'
              ? 'bg-surface text-forest shadow-xs'
              : 'text-ink-muted hover:text-forest'
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-brand shrink-0" />
          <span className="truncate">Kuis Pre/Post</span>
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="pt-1">
        {activeSubTab === 'skenario' && <SkenarioModule />}
        {activeSubTab === 'flashcard' && <FlashcardModule />}
        {activeSubTab === 'kuis' && <KuisModule />}
      </div>
    </div>
  );
};
