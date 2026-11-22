import React, { useState, useEffect } from 'react';
import { PANDUAN_SIMPAN_BUANG } from '../data/panduanSimpanBuang';
import { ModalShell, RujukanText } from './ui';
import { Trash2, ShieldAlert, Sparkles, Check, BookOpen } from 'lucide-react';

interface PanduanSimpanBuangModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'simpan' | 'buang';
}

export const PanduanSimpanBuangModal: React.FC<PanduanSimpanBuangModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'simpan',
}) => {
  const [activeMode, setActiveMode] = useState<'simpan' | 'buang'>(initialTab);
  const [selectedSediaanIndex, setSelectedSediaanIndex] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setActiveMode(initialTab);
    }
  }, [isOpen, initialTab]);

  const currentItem =
    PANDUAN_SIMPAN_BUANG[selectedSediaanIndex] || PANDUAN_SIMPAN_BUANG[0];

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Panduan Simpan & Buang Obat"
      subtitle="Prinsip Dagusibu (Kelola Obat Rumah Tangga dengan Benar)"
      maxWidth="xl"
      headerIcon={<BookOpen className="w-5 h-5" />}
      footer={
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>Rujukan: Dagusibu Kemenkes &amp; BPOM RI</span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 font-semibold text-forest bg-surface border border-line hover:bg-surface-muted rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Mode Switcher: Simpan vs Buang */}
        <div className="grid grid-cols-2 gap-1.5 bg-surface-muted p-1.5 rounded-2xl border border-line">
          <button
            type="button"
            onClick={() => setActiveMode('simpan')}
            className={`min-h-[44px] flex items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeMode === 'simpan'
                ? 'bg-surface text-forest shadow-xs'
                : 'text-ink-muted hover:text-forest'
            }`}
          >
            <Sparkles className="w-4 h-4 text-brand" />
            <span>Cara Menyimpan</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('buang')}
            className={`min-h-[44px] flex items-center justify-center gap-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeMode === 'buang'
                ? 'bg-surface text-status-kedaluwarsa-text shadow-xs'
                : 'text-ink-muted hover:text-forest'
            }`}
          >
            <Trash2 className="w-4 h-4 text-status-kedaluwarsa-text" />
            <span>Cara Membuang (Rusak)</span>
          </button>
        </div>

        {/* Form Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-semibold text-ink-muted whitespace-nowrap">
            Bentuk:
          </span>
          {PANDUAN_SIMPAN_BUANG.map((item, idx) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setSelectedSediaanIndex(idx)}
              className={`min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                selectedSediaanIndex === idx
                  ? 'bg-brand text-on-brand border-brand'
                  : 'bg-surface border-line text-ink hover:bg-surface-muted'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-line">
            <h3 className="font-display text-lg font-semibold text-forest">
              {currentItem.title}
            </h3>
            <span className="text-xs text-ink-muted font-medium">
              {activeMode === 'simpan'
                ? 'Mode Penyimpanan Tepat'
                : 'Mode Pemusnahan & Pembuangan'}
            </span>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand">
              {activeMode === 'simpan'
                ? 'Langkah Penyimpanan Aman'
                : 'Langkah Membuang Obat Agar Tidak Disalahgunakan'}
            </h4>

            <ul className="space-y-2.5">
              {(activeMode === 'simpan'
                ? currentItem.simpanRules
                : currentItem.buangRules
              ).map((rule, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3.5 bg-surface-warm rounded-xl border border-line text-sm"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      activeMode === 'simpan'
                        ? 'bg-status-aman-bg text-status-aman-text'
                        : 'bg-status-kedaluwarsa-bg text-status-kedaluwarsa-text'
                    }`}
                  >
                    {activeMode === 'simpan' ? (
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    ) : (
                      <span className="text-xs font-mono font-bold">{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <RujukanText text={rule} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-status-segera-bg/70 rounded-2xl border border-status-segera-text/20 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-status-segera-text shrink-0 mt-0.5" />
            <div className="text-xs text-ink space-y-1 flex-1 min-w-0">
              <span className="font-bold text-status-segera-text block">
                Tanda Kerusakan Fisik Obat
              </span>
              <RujukanText text={currentItem.catatanPenting} block />
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
};
