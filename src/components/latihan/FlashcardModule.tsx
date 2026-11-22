import React, { useState } from 'react';
import { FLASHCARD_ITEMS } from '../../data/latihanData';
import { FlashcardItem } from '../../types/latihan';
import {
  Layers,
  RotateCw,
  CheckCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  BookmarkCheck,
  AlertCircle,
} from 'lucide-react';

export const FlashcardModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'logo' | 'titik-kritis' | 'dagusibu'
  >('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const [understoodIds, setUnderstoodIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ruang_obat_understood_flashcards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const filteredCards: FlashcardItem[] = FLASHCARD_ITEMS.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev + 1 < filteredCards.length ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setShowHint(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredCards.length - 1));
  };

  const toggleUnderstood = (id: string) => {
    let updated: string[];
    if (understoodIds.includes(id)) {
      updated = understoodIds.filter((item) => item !== id);
    } else {
      updated = [...understoodIds, id];
    }
    setUnderstoodIds(updated);
    try {
      localStorage.setItem('ruang_obat_understood_flashcards', JSON.stringify(updated));
    } catch {
      // storage unavailable
    }
  };

  const handleResetProgress = () => {
    setUnderstoodIds([]);
    try {
      localStorage.removeItem('ruang_obat_understood_flashcards');
    } catch {
      // ignore
    }
  };

  const isCurrentUnderstood = understoodIds.includes(currentCard?.id);
  const progressPercent = Math.round(
    (understoodIds.length / FLASHCARD_ITEMS.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Category Pills & Progress Bar */}
      <div className="space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-line">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowHint(false);
              }}
              className={`min-h-[44px] px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-surface text-forest shadow-xs'
                  : 'text-ink-muted hover:text-forest'
              }`}
            >
              Semua ({FLASHCARD_ITEMS.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('logo');
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowHint(false);
              }}
              className={`min-h-[44px] px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCategory === 'logo'
                  ? 'bg-surface text-forest shadow-xs'
                  : 'text-ink-muted hover:text-forest'
              }`}
            >
              Logo Golongan
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('titik-kritis');
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowHint(false);
              }}
              className={`min-h-[44px] px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCategory === 'titik-kritis'
                  ? 'bg-surface text-forest shadow-xs'
                  : 'text-ink-muted hover:text-forest'
              }`}
            >
              Titik Kritis (ED/BUD)
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('dagusibu');
                setCurrentIndex(0);
                setIsFlipped(false);
                setShowHint(false);
              }}
              className={`min-h-[44px] px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                selectedCategory === 'dagusibu'
                  ? 'bg-surface text-forest shadow-xs'
                  : 'text-ink-muted hover:text-forest'
              }`}
            >
              Dagusibu
            </button>
          </div>

          {understoodIds.length > 0 && (
            <button
              type="button"
              onClick={handleResetProgress}
              className="min-h-[44px] px-2 text-xs text-ink-muted hover:text-status-kedaluwarsa-text flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Progres ({understoodIds.length})</span>
            </button>
          )}
        </div>

        {/* Progress Tracker */}
        <div className="bg-surface p-4 rounded-2xl border border-line space-y-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-ink flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-4 h-4 text-brand" />
              <span>Penguasaan Materi Flashcard</span>
            </span>
            <span className="text-forest font-mono tabular-nums font-bold">
              {understoodIds.length} / {FLASHCARD_ITEMS.length} Kartu ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2 bg-surface-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Flashcard 3D Interactive Container */}
      {currentCard && (
        <div className="perspective-1000 max-w-2xl mx-auto">
          <div
            onClick={handleFlip}
            className={`relative min-h-[390px] sm:min-h-[430px] w-full rounded-3xl transition-transform duration-500 cursor-pointer transform-style-3d shadow-xs hover:shadow-md ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* FRONT FACE */}
            <div className="absolute inset-0 backface-hidden bg-surface rounded-3xl border border-line p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {currentCard.categoryLabel}
                  </span>
                  <div className="flex items-center gap-2.5">
                    {isCurrentUnderstood && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-status-aman-text bg-status-aman-bg px-2.5 py-0.5 rounded-lg">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Paham
                      </span>
                    )}
                    <span className="text-xs text-ink-muted font-mono tabular-nums">
                      {currentIndex + 1} / {filteredCards.length}
                    </span>
                  </div>
                </div>

                <div className="pt-4 text-center space-y-3.5">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary text-forest flex items-center justify-center">
                    <Layers className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-forest leading-snug">
                    {currentCard.title}
                  </h3>
                  <p className="text-ink-muted text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                    {currentCard.frontPrompt}
                  </p>
                </div>

                {currentCard.frontHint && (
                  <div className="pt-2 text-center" onClick={(e) => e.stopPropagation()}>
                    {showHint ? (
                      <div className="p-3.5 bg-status-segera-bg/75 rounded-xl border border-status-segera-text/20 text-xs text-status-segera-text ro-fade-in">
                        <span className="font-bold">Petunjuk: </span>
                        {currentCard.frontHint}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setShowHint(true)}
                        className="min-h-[44px] inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-forest font-semibold cursor-pointer py-2 px-3"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Buka Petunjuk</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-center gap-2 text-xs text-brand font-semibold">
                <RotateCw className="w-4 h-4" />
                <span>Ketuk kartu untuk melihat penjelasan resmi</span>
              </div>
            </div>

            {/* BACK FACE */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-forest text-white rounded-3xl border border-forest p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-4 overflow-y-auto pr-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sand">
                    Penjelasan Klinis &amp; Regulasi
                  </span>
                  <span className="text-xs text-secondary/75 font-mono tabular-nums">
                    {currentIndex + 1} / {filteredCards.length}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-semibold text-white">
                  {currentCard.title}
                </h3>

                <p className="text-xs sm:text-sm text-secondary leading-relaxed bg-white/10 p-3.5 rounded-2xl border border-white/10">
                  {currentCard.backDefinition}
                </p>

                <div className="space-y-1.5 text-xs text-secondary/90">
                  <div className="font-semibold text-sand">Ketentuan Penting:</div>
                  <ul className="list-disc list-inside space-y-1.5 text-secondary/85">
                    {currentCard.backRules.map((rule, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>

                {currentCard.warningNote && (
                  <div className="p-3 rounded-xl bg-status-kedaluwarsa-bg/15 border border-status-kedaluwarsa-bg/30 text-xs text-status-kedaluwarsa-bg flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{currentCard.warningNote}</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-sand">
                <span className="truncate max-w-[260px]">
                  Sumber: {currentCard.referenceSource}
                </span>
                <span className="underline underline-offset-4">Ketuk untuk membalik</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation & Action Buttons */}
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-surface border border-line hover:border-line-strong text-forest text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-surface border border-line hover:border-line-strong text-forest text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {currentCard && (
          <button
            type="button"
            onClick={() => toggleUnderstood(currentCard.id)}
            className={`min-h-[44px] px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
              isCurrentUnderstood
                ? 'bg-status-aman-text hover:bg-forest text-white'
                : 'bg-brand hover:bg-forest text-on-brand'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>
              {isCurrentUnderstood ? 'Sudah Ditandai Paham' : 'Tandai Sudah Paham'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
