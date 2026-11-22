import React, { useState } from 'react';
import { SCENARIO_ITEMS } from '../../data/latihanData';
import { ScenarioOption } from '../../types/latihan';
import {
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  User,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const SkenarioModule: React.FC = () => {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<ScenarioOption | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<Record<string, boolean>>({});

  const scenario = SCENARIO_ITEMS[activeScenarioIndex];

  const handleSelectOption = (option: ScenarioOption) => {
    setSelectedOption(option);
    if (option.isBestPractice) {
      setCompletedScenarios((prev) => ({ ...prev, [scenario.id]: true }));
    }
  };

  const handleNextScenario = () => {
    if (activeScenarioIndex < SCENARIO_ITEMS.length - 1) {
      setActiveScenarioIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handleResetCurrent = () => {
    setSelectedOption(null);
  };

  const handleSwitchScenario = (index: number) => {
    setActiveScenarioIndex(index);
    setSelectedOption(null);
  };

  return (
    <div className="space-y-6">
      {/* Scenario Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {SCENARIO_ITEMS.map((item, idx) => {
          const isCurrent = idx === activeScenarioIndex;
          const isDone = completedScenarios[item.id];
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSwitchScenario(idx)}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border ${
                isCurrent
                  ? 'bg-forest text-white border-forest'
                  : isDone
                  ? 'bg-status-aman-bg text-status-aman-text border-status-aman-text/25'
                  : 'bg-surface text-ink border-line hover:border-line-strong'
              }`}
            >
              <span>Kasus {idx + 1}</span>
              {isDone && (
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${
                    isCurrent ? 'text-sand' : 'text-status-aman-text'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Main Scenario Card */}
      <div className="bg-surface rounded-3xl border border-line shadow-xs overflow-hidden">
        {/* Editorial Dark Forest Header */}
        <div className="p-5 sm:p-7 bg-forest text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-sand">
                {scenario.badge}
              </span>
              <span className="text-secondary/50" aria-hidden="true">·</span>
              <span className="text-secondary/85 font-mono tabular-nums">
                Kasus {activeScenarioIndex + 1} dari {SCENARIO_ITEMS.length}
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-white leading-snug">
              {scenario.title}
            </h2>
            <p className="text-xs sm:text-sm text-secondary/85">
              {scenario.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 px-3.5 py-2 rounded-xl border border-white/10 text-xs text-sand font-medium shrink-0">
            <GitBranch className="w-4 h-4" />
            <span>Cerita Keputusan</span>
          </div>
        </div>

        {/* Narrative & Patient Profile */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Patient Profile */}
          <div className="p-4 rounded-2xl bg-surface-muted/60 border border-line flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-secondary text-forest flex items-center justify-center shrink-0 mt-0.5">
              <User className="w-5 h-5" />
            </div>
            <div className="text-xs sm:text-sm space-y-0.5">
              <div className="font-bold text-forest">
                {scenario.patientProfile.name}{' '}
                <span className="font-normal text-ink-muted">
                  · {scenario.patientProfile.age}
                </span>
              </div>
              <p className="text-ink-muted text-xs leading-relaxed">
                <strong className="text-ink">Kondisi:</strong> {scenario.patientProfile.condition}
              </p>
            </div>
          </div>

          {/* Story Narrative (Editorial warm quote surface, zero thick left border) */}
          <blockquote className="p-5 rounded-2xl bg-surface-warm border border-line text-ink text-sm sm:text-base leading-relaxed font-display italic">
            &ldquo;{scenario.story}&rdquo;
          </blockquote>

          {/* Dilemma Question & Options */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2 text-forest font-bold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-brand shrink-0" />
              <span>{scenario.question}</span>
            </div>

            <div className="space-y-2.5">
              {scenario.options.map((opt, i) => {
                const isSelected = selectedOption?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 cursor-pointer border ${
                      isSelected
                        ? opt.isBestPractice
                          ? 'bg-status-aman-bg/80 border-status-aman-text text-forest font-medium'
                          : 'bg-status-kedaluwarsa-bg/80 border-status-kedaluwarsa-text text-status-kedaluwarsa-text font-medium'
                        : 'bg-surface border-line hover:border-line-strong hover:bg-surface-warm text-ink'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                        isSelected
                          ? opt.isBestPractice
                            ? 'bg-status-aman-text text-white'
                            : 'bg-status-kedaluwarsa-text text-white'
                          : 'bg-surface-muted text-forest'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 leading-relaxed pt-0.5">{opt.text}</span>
                    {isSelected &&
                      (opt.isBestPractice ? (
                        <CheckCircle2 className="w-5 h-5 text-status-aman-text shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-status-kedaluwarsa-text shrink-0 mt-0.5" />
                      ))}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Result Box */}
          {selectedOption && (
            <div
              className={`p-5 rounded-2xl border space-y-3.5 ro-fade-in ${
                selectedOption.isBestPractice
                  ? 'bg-status-aman-bg/65 border-status-aman-text/30 text-forest'
                  : 'bg-status-kedaluwarsa-bg/65 border-status-kedaluwarsa-text/30 text-status-kedaluwarsa-text'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2.5">
                {selectedOption.isBestPractice ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-status-aman-text text-white text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Pilihan Tepat &amp; Rasional
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-status-kedaluwarsa-text text-white text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Berisiko &amp; Tidak Dianjurkan
                  </span>
                )}
                <span className="text-xs font-bold uppercase tracking-wider opacity-85">
                  {selectedOption.consequence}
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-ink">
                {selectedOption.feedback}
              </p>

              <div className="p-3.5 rounded-xl bg-surface border border-line text-xs text-ink space-y-1">
                <div className="font-bold text-forest flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-brand" />
                  <span>Alasan Ilmiah Farmakologi</span>
                </div>
                <p className="leading-relaxed text-ink-muted">
                  {selectedOption.scientificReason}
                </p>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={handleResetCurrent}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-xl bg-surface border border-line text-forest hover:bg-surface-muted text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Coba Pilihan Lain</span>
                </button>

                {activeScenarioIndex < SCENARIO_ITEMS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextScenario}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-brand hover:bg-forest text-on-brand text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Lanjut ke Kasus Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-xs font-bold text-status-aman-text flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Semua Kasus Skenario Selesai!</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section: Red Flags */}
          <div className="p-4 sm:p-5 rounded-2xl bg-status-segera-bg/65 border border-status-segera-text/20 text-ink space-y-2.5">
            <div className="flex items-center gap-2 font-bold text-status-segera-text text-xs sm:text-sm">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Tanda Bahaya: Kapan Pasien Wajib Segera ke Dokter / Apoteker?</span>
            </div>
            <ul className="text-xs text-ink-muted space-y-1.5 list-disc list-inside">
              {scenario.redFlags.map((flag, idx) => (
                <li key={idx} className="leading-relaxed">
                  {flag}
                </li>
              ))}
            </ul>
          </div>

          {/* Official Reference Citation */}
          <div className="pt-3 border-t border-line flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-muted">
            <span>Rujukan: {scenario.referenceCitation}</span>
            <span className="text-brand font-semibold">
              Tugas Akhir Berbasis Proyek S1 Farmasi Klinik dan Komunitas
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
