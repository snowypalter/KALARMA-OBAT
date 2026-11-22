import React, { useState } from 'react';
import { PackagingType } from '../types';
import { PACKAGING_ITEMS } from '../data/labelHotspots';
import { PackagingSvg } from '../components/PackagingSvg';
import { RujukanText } from '../components/ui';
import {
  Pill,
  FlaskConical,
  Pipette,
  ChevronLeft,
  ChevronRight,
  BookA,
  AlertCircle,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface CekLabelViewProps {
  onOpenKamus: () => void;
}

export const CekLabelView: React.FC<CekLabelViewProps> = ({ onOpenKamus }) => {
  const [selectedType, setSelectedType] = useState<PackagingType>('tablet');
  const [activeHotspotId, setActiveHotspotId] = useState<number>(1);

  const currentPackaging = PACKAGING_ITEMS[selectedType];
  const activeHotspot =
    currentPackaging.hotspots.find((h) => h.id === activeHotspotId) ||
    currentPackaging.hotspots[0];

  const handleNext = () => {
    const currentIndex = currentPackaging.hotspots.findIndex((h) => h.id === activeHotspotId);
    if (currentIndex < currentPackaging.hotspots.length - 1) {
      setActiveHotspotId(currentPackaging.hotspots[currentIndex + 1].id);
    } else {
      setActiveHotspotId(currentPackaging.hotspots[0].id);
    }
  };

  const handlePrev = () => {
    const currentIndex = currentPackaging.hotspots.findIndex((h) => h.id === activeHotspotId);
    if (currentIndex > 0) {
      setActiveHotspotId(currentPackaging.hotspots[currentIndex - 1].id);
    } else {
      setActiveHotspotId(
        currentPackaging.hotspots[currentPackaging.hotspots.length - 1].id
      );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 ro-fade-in">
      {/* Header & Packaging Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Simulasi Visual Interaktif
          </p>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-forest tracking-tight">
            Cek Label Kemasan Obat
          </h1>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            Pilih bentuk sediaan obat, lalu ketuk salah satu dari 6 titik bernomor pada kemasan untuk membaca fungsi resmi dan peringatannya.
          </p>
        </div>

        {/* Pemilih Jenis Kemasan: Tablet, Sirup, Salep */}
        <div
          className="p-1.5 bg-surface-muted rounded-2xl border border-line grid grid-cols-3 gap-1 w-full md:w-auto md:min-w-[340px]"
          role="radiogroup"
          aria-label="Pilih bentuk sediaan kemasan obat"
        >
          <button
            type="button"
            role="radio"
            aria-checked={selectedType === 'tablet'}
            onClick={() => {
              setSelectedType('tablet');
              setActiveHotspotId(1);
            }}
            className={`min-h-[44px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedType === 'tablet'
                ? 'bg-surface text-forest shadow-xs'
                : 'text-ink-muted hover:text-forest'
            }`}
          >
            <Pill className="w-4 h-4 text-brand shrink-0" />
            <span>Tablet</span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={selectedType === 'sirup'}
            onClick={() => {
              setSelectedType('sirup');
              setActiveHotspotId(1);
            }}
            className={`min-h-[44px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedType === 'sirup'
                ? 'bg-surface text-forest shadow-xs'
                : 'text-ink-muted hover:text-forest'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-brand shrink-0" />
            <span>Sirup</span>
          </button>

          <button
            type="button"
            role="radio"
            aria-checked={selectedType === 'salep'}
            onClick={() => {
              setSelectedType('salep');
              setActiveHotspotId(1);
            }}
            className={`min-h-[44px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedType === 'salep'
                ? 'bg-surface text-forest shadow-xs'
                : 'text-ink-muted hover:text-forest'
            }`}
          >
            <Pipette className="w-4 h-4 text-brand shrink-0" />
            <span>Salep</span>
          </button>
        </div>
      </div>

      {/* 2-Zone Editorial Split (Left ~58%: Interactive Stage, Right ~42%: Detail Deck) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Zone: Packaging Visual Stage + Quick Point Switcher */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs px-1">
            <span className="font-semibold text-forest">{currentPackaging.title}</span>
            <span className="text-ink-muted">Ketuk angka 1–6 pada gambar kemasan</span>
          </div>

          <PackagingSvg
            type={selectedType}
            hotspots={currentPackaging.hotspots}
            activeHotspotId={activeHotspotId}
            onSelectHotspot={(id) => setActiveHotspotId(id)}
          />

          {/* Quick Hotspot Selector Grid/Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {currentPackaging.hotspots.map((h) => {
              const isCurrent = h.id === activeHotspotId;
              return (
                <button
                  key={h.id}
                  type="button"
                  onClick={() => setActiveHotspotId(h.id)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 text-left cursor-pointer border ${
                    isCurrent
                      ? 'bg-forest text-white border-forest shadow-xs'
                      : 'bg-surface text-ink border-line hover:border-line-strong hover:bg-surface-warm'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono font-bold shrink-0 ${
                      isCurrent
                        ? 'bg-sand text-forest'
                        : 'bg-surface-muted text-forest'
                    }`}
                  >
                    {h.number}
                  </span>
                  <span className="truncate">{h.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Zone: Structured Detail Card (Sticky on Desktop) */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-surface rounded-3xl border border-line p-5 sm:p-6 shadow-xs space-y-5">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-3 pb-4 border-b border-line">
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-forest text-sand font-mono font-bold text-sm flex items-center justify-center shrink-0">
                {activeHotspot.number}
              </span>
              <div>
                <span className="text-xs font-mono text-brand block">
                  Titik {activeHotspot.number} dari {currentPackaging.hotspots.length}
                </span>
                <h2 className="font-display text-lg sm:text-xl font-semibold text-forest leading-snug mt-0.5">
                  {activeHotspot.title}
                </h2>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenKamus}
              className="min-h-[44px] px-3 py-1.5 rounded-xl bg-surface-muted hover:bg-secondary/70 text-xs font-semibold text-forest flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
              title="Buka Kamus Label Obat"
            >
              <BookA className="w-3.5 h-3.5 text-brand" />
              <span>Kamus</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
            {activeHotspot.shortDescription}
          </p>

          {/* 3 Structured Reference Boxes */}
          <div className="space-y-3">
            <div className="p-3.5 bg-surface-warm rounded-2xl border border-line space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-forest">
                <HelpCircle className="w-4 h-4 text-brand shrink-0" />
                <span>Fungsi &amp; Informasi Resmi Label</span>
              </div>
              <div className="bg-surface p-2.5 rounded-xl border border-line/80">
                <RujukanText text={activeHotspot.content.meaning} block />
              </div>
            </div>

            <div className="p-3.5 bg-secondary/45 rounded-2xl border border-line space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-forest">
                <Lightbulb className="w-4 h-4 text-brand shrink-0" />
                <span>Tips Membaca &amp; Memahami</span>
              </div>
              <div className="bg-surface p-2.5 rounded-xl border border-line/80">
                <RujukanText text={activeHotspot.content.tips} block />
              </div>
            </div>

            <div className="p-3.5 bg-status-segera-bg/60 rounded-2xl border border-status-segera-text/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-status-segera-text">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Peringatan Keamanan Penggunaan</span>
              </div>
              <div className="bg-surface p-2.5 rounded-xl border border-status-segera-text/15">
                <RujukanText text={activeHotspot.content.warning} block />
              </div>
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="pt-3 border-t border-line flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrev}
              className="min-h-[44px] px-4 py-2 rounded-xl border border-line hover:bg-surface-muted text-forest font-semibold text-xs sm:text-sm flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <span className="text-xs font-mono tabular-nums text-ink-muted font-medium">
              {activeHotspot.number} / {currentPackaging.hotspots.length}
            </span>

            <button
              type="button"
              onClick={handleNext}
              className="min-h-[44px] px-4 py-2 rounded-xl bg-brand hover:bg-forest text-on-brand font-semibold text-xs sm:text-sm flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
