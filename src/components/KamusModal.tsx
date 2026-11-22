import React, { useState, useMemo, useEffect } from 'react';
import { KAMUS_ITEMS } from '../data/kamusData';
import { ModalShell, RujukanText } from './ui';
import { Search, X, BookA } from 'lucide-react';

interface KamusModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const KamusModal: React.FC<KamusModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedLetter, setSelectedLetter] = useState<string>('Semua');

  useEffect(() => {
    if (isOpen && initialQuery !== undefined) {
      setSearchQuery(initialQuery);
      setSelectedLetter('Semua');
    }
  }, [isOpen, initialQuery]);

  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    KAMUS_ITEMS.forEach((item) => {
      const firstChar = item.term.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        letters.add(firstChar);
      }
    });
    return ['Semua', ...Array.from(letters).sort()];
  }, []);

  const filteredItems = useMemo(() => {
    return KAMUS_ITEMS.filter((item) => {
      const matchesSearch =
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLetter =
        selectedLetter === 'Semua' ||
        item.term.toUpperCase().startsWith(selectedLetter);

      return matchesSearch && matchesLetter;
    });
  }, [searchQuery, selectedLetter]);

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Kamus Istilah & Simbol Label Obat"
      subtitle="Pahami singkatan dan istilah resmi pada kemasan obat"
      maxWidth="2xl"
      headerIcon={<BookA className="w-5 h-5" />}
      footer={
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span className="font-mono tabular-nums">
            {filteredItems.length} istilah terdaftar
          </span>
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
      <div className="space-y-4">
        {/* Search & Letter Filter */}
        <div className="p-4 bg-surface-warm rounded-2xl border border-line space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari istilah, misalnya 'BUD', 'Bets', 'Generik'..."
              className="w-full min-h-[44px] pl-10 pr-12 py-2 text-sm bg-surface border border-line rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
              aria-label="Cari istilah di kamus label obat"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] text-ink-muted hover:text-ink flex items-center justify-center cursor-pointer"
                aria-label="Hapus kata kunci pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {availableLetters.map((letter) => (
              <button
                key={letter}
                type="button"
                onClick={() => setSelectedLetter(letter)}
                className={`min-h-[44px] min-w-[44px] px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer shrink-0 ${
                  selectedLetter === letter
                    ? 'bg-brand text-on-brand'
                    : 'bg-surface border border-line text-ink hover:bg-surface-muted'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-ink-muted font-medium text-sm">
                Istilah &ldquo;{searchQuery}&rdquo; belum ditemukan di kamus.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLetter('Semua');
                }}
                className="min-h-[44px] px-3 text-xs font-semibold text-brand hover:text-forest underline cursor-pointer"
              >
                Reset pencarian
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-surface rounded-2xl border border-line hover:border-line-strong transition-colors space-y-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display font-semibold text-forest text-base sm:text-lg">
                    {item.term}
                  </h3>
                  <span className="text-xs font-semibold text-brand">
                    {item.category}
                  </span>
                </div>
                <div>
                  <RujukanText text={item.definition} block />
                </div>
                <div className="text-[11px] text-ink-muted pt-2 border-t border-line/70">
                  Rujukan: <span className="font-medium text-ink">{item.referenceSource}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ModalShell>
  );
};
