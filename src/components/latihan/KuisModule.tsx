import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/latihanData';
import { QuizMode } from '../../types/latihan';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  Award,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  BookOpen,
} from 'lucide-react';

export const KuisModule: React.FC = () => {
  const [mode, setMode] = useState<QuizMode>('posttest');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [showFormHint, setShowFormHint] = useState(false);

  const [pretestScore, setPretestScore] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('ruang_obat_pretest_score');
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  const [posttestScore, setPosttestScore] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('ruang_obat_posttest_score');
      return saved ? Number(saved) : null;
    } catch {
      return null;
    }
  });

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / totalQuestions) * 100);
  };

  const handleSubmit = () => {
    const score = calculateScore();
    setIsSubmitted(true);
    if (mode === 'pretest') {
      setPretestScore(score);
      try {
        localStorage.setItem('ruang_obat_pretest_score', String(score));
      } catch {
        // ignore
      }
    } else {
      setPosttestScore(score);
      try {
        localStorage.setItem('ruang_obat_posttest_score', String(score));
      } catch {
        // ignore
      }
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleReset = (newMode?: QuizMode) => {
    if (newMode) setMode(newMode);
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setShowFormHint(false);
  };

  const currentScore = calculateScore();

  const handleCopySummary = () => {
    const correctCount = QUIZ_QUESTIONS.filter(
      (q) => userAnswers[q.id] === q.correctIndex
    ).length;
    const modeLabel = mode === 'pretest' ? 'PRE-TEST (Uji Awal)' : 'POST-TEST (Uji Akhir)';
    const text = `--- HASIL EVALUASI LITERASI OBAT (RUANG OBAT) ---
Media Edukasi Tugas Akhir Berbasis Proyek S1 Farmasi Klinik dan Komunitas
Mode: ${modeLabel}
Waktu Selesai: ${new Date().toLocaleString('id-ID')}
Skor: ${currentScore} / 100 (${correctCount} dari ${totalQuestions} Benar)
Status: ${
      currentScore >= 80
        ? 'Sangat Baik (Literasi Tinggi)'
        : currentScore >= 60
        ? 'Baik (Cukup Paham)'
        : 'Perlu Edukasi Ulang'
    }
Rincian Jawaban:
${QUIZ_QUESTIONS.map(
  (q) =>
    `No ${q.id} [${q.competency}]: ${
      userAnswers[q.id] === q.correctIndex ? 'BENAR' : 'SALAH'
    }`
).join('\n')}
--------------------------------------------------`;

    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector & Header */}
      <div className="p-5 sm:p-6 bg-surface rounded-3xl border border-line space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand">
              Instrumen Evaluasi Tugas Akhir Berbasis Proyek · {totalQuestions} Butir Soal Terstandar
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-forest">
              Uji Pemahaman Literasi Obat
            </h2>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-surface-muted rounded-xl border border-line self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleReset('pretest')}
              className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'pretest'
                  ? 'bg-status-segera-text text-white shadow-xs'
                  : 'text-ink-muted hover:text-forest'
              }`}
            >
              Mode Pre-Test
            </button>
            <button
              type="button"
              onClick={() => handleReset('posttest')}
              className={`min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'posttest'
                  ? 'bg-forest text-white shadow-xs'
                  : 'text-ink-muted hover:text-forest'
              }`}
            >
              Mode Post-Test
            </button>
          </div>
        </div>

        <div className="text-xs sm:text-sm leading-relaxed">
          {mode === 'pretest' ? (
            <div className="text-status-segera-text bg-status-segera-bg/70 p-3.5 rounded-xl border border-status-segera-text/20">
              <strong>Catatan Pre-Test:</strong> Uji ini mengukur pengetahuan awal Anda sebelum mempelajari seluruh materi label kemasan dan Lemari Obat. Kerjakan secara spontan.
            </div>
          ) : (
            <div className="text-forest bg-secondary/50 p-3.5 rounded-xl border border-line">
              <strong>Catatan Post-Test:</strong> Uji ini mengukur peningkatan pemahaman Anda setelah mengeksplorasi fitur Cek Label 6 Titik, Lemari Obat, dan Kamus Label.
            </div>
          )}
        </div>
      </div>

      {/* Question Runner */}
      {!isSubmitted ? (
        <div className="space-y-4">
          <div className="bg-surface p-4 sm:p-5 rounded-2xl border border-line space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-ink-muted">
              <span className="font-mono tabular-nums">
                Pertanyaan {currentQuestionIndex + 1} dari {totalQuestions}
              </span>
              <span className="text-forest font-mono tabular-nums">
                Terjawab: {answeredCount} / {totalQuestions}
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isAnswered = userAnswers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`min-h-[44px] min-w-[44px] rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-forest text-sand ring-2 ring-brand/40'
                        : isAnswered
                        ? 'bg-secondary text-forest'
                        : 'bg-surface-muted text-ink-muted hover:bg-secondary/60'
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-surface rounded-3xl border border-line p-5 sm:p-7 space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-brand uppercase tracking-wider block">
                {currentQ.competency}
              </span>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-forest leading-snug">
                {currentQ.id}. {currentQ.question}
              </h3>
            </div>

            <div className="space-y-2.5">
              {currentQ.options.map((opt, i) => {
                const isSelected = userAnswers[currentQ.id] === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, i)}
                    className={`w-full p-4 rounded-2xl text-left text-xs sm:text-sm transition-all flex items-start gap-3.5 cursor-pointer border ${
                      isSelected
                        ? 'bg-secondary/60 border-forest text-forest font-semibold'
                        : 'bg-surface border-line hover:border-line-strong hover:bg-surface-warm text-ink'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                        isSelected
                          ? 'bg-forest text-sand'
                          : 'bg-surface-muted text-forest'
                      }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="leading-relaxed flex-1 pt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="min-h-[44px] px-4 py-2 rounded-xl border border-line text-forest hover:bg-surface-muted disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentQuestionIndex < totalQuestions - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  className="min-h-[44px] px-5 py-2 rounded-xl bg-brand hover:bg-forest text-on-brand text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="min-h-[44px] px-5 py-2 rounded-xl bg-status-aman-text hover:bg-forest text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Selesaikan &amp; Lihat Nilai</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 ro-fade-in">
          {/* Score Card */}
          <div className="p-6 sm:p-8 bg-forest text-white rounded-3xl text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 text-sand flex items-center justify-center border border-white/15">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <span className="text-xs uppercase tracking-[0.14em] text-sand font-semibold block">
                Hasil Evaluasi {mode === 'pretest' ? 'Pre-Test' : 'Post-Test'}
              </span>
              <div className="font-display text-5xl sm:text-6xl font-bold text-white tabular-nums">
                {currentScore}{' '}
                <span className="text-2xl text-sand font-mono">/ 100</span>
              </div>
              <p className="text-xs sm:text-sm text-secondary/90 max-w-lg mx-auto leading-relaxed">
                {currentScore >= 80
                  ? 'Tingkat Literasi Sangat Baik! Anda siap menerapkan swamedikasi yang aman dan bijak.'
                  : currentScore >= 60
                  ? 'Pemahaman Baik. Tingkatkan pemahaman pada bagian Beyond Use Date dan prinsip Dagusibu.'
                  : 'Perlu Mengulang Materi. Simak kembali 6 titik label kemasan dan panduan penyimpanan obat.'}
              </p>
            </div>

            {pretestScore !== null && posttestScore !== null && (
              <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 text-xs inline-flex items-center justify-center gap-2.5 text-secondary">
                <TrendingUp className="w-4 h-4 text-sand shrink-0" />
                <span className="font-mono tabular-nums">
                  Perbandingan: Pre-Test <strong>{pretestScore}</strong> &rarr; Post-Test{' '}
                  <strong>{posttestScore}</strong> (
                  {posttestScore >= pretestScore
                    ? `+${posttestScore - pretestScore}`
                    : posttestScore - pretestScore}{' '}
                  poin)
                </span>
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCopySummary}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-sand hover:bg-sand-soft text-forest text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-colors"
              >
                {hasCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Salin Rekap Evaluasi</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleReset()}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Uji Ini</span>
              </button>
            </div>
          </div>

          {/* Research Questionnaire Card */}
          <div className="p-5 rounded-2xl bg-status-segera-bg/65 border border-status-segera-text/20 text-ink space-y-3 text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="font-bold text-status-segera-text">
                  Integrasi Kuesioner Evaluasi Pengguna
                </div>
                <p className="text-ink-muted text-xs">
                  Mengikuti evaluasi Tugas Akhir Berbasis Proyek ini? Salin skor Anda ke formulir evaluasi resmi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFormHint((prev) => !prev)}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-status-segera-text hover:opacity-90 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-opacity cursor-pointer"
              >
                <span>Isi Kuesioner Google Form</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
            {showFormHint && (
              <p className="text-xs text-status-segera-text bg-surface p-3 rounded-xl border border-status-segera-text/20">
                Tautan kuesioner Google Form responden dapat disematkan langsung oleh peneliti sebelum distribusi lapangan, sambil tetap menyertakan hasil salinan rekap skor di atas.
              </p>
            )}
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h3 className="font-display text-lg sm:text-xl font-semibold text-forest">
              Pembahasan Ilmiah &amp; Kunci Jawaban Lengkap
            </h3>

            {QUIZ_QUESTIONS.map((q) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border bg-surface space-y-3.5 ${
                    isCorrect
                      ? 'border-status-aman-text/30'
                      : 'border-status-kedaluwarsa-text/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold text-white shrink-0 ${
                          isCorrect
                            ? 'bg-status-aman-text'
                            : 'bg-status-kedaluwarsa-text'
                        }`}
                      >
                        {q.id}
                      </span>
                      <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                        {q.competency}
                      </span>
                    </div>

                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-status-aman-text bg-status-aman-bg px-2.5 py-1 rounded-lg">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Benar (+10)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-status-kedaluwarsa-text bg-status-kedaluwarsa-bg px-2.5 py-1 rounded-lg">
                        <XCircle className="w-3.5 h-3.5" />
                        Salah (+0)
                      </span>
                    )}
                  </div>

                  <p className="font-bold text-forest text-sm sm:text-base leading-snug">
                    {q.question}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-surface-warm border border-line">
                      <span className="text-ink-muted font-medium">Jawaban Anda: </span>
                      <strong
                        className={
                          isCorrect
                            ? 'text-status-aman-text'
                            : 'text-status-kedaluwarsa-text'
                        }
                      >
                        {userAns !== undefined
                          ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}`
                          : 'Tidak dijawab'}
                      </strong>
                    </div>

                    {!isCorrect && (
                      <div className="p-3 rounded-xl bg-status-aman-bg/70 border border-status-aman-text/20 text-forest">
                        <span className="font-semibold text-status-aman-text">
                          Kunci Jawaban Benar:{' '}
                        </span>
                        <strong>
                          {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                        </strong>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 rounded-xl bg-secondary/45 border border-line text-xs text-ink space-y-1.5">
                    <div className="font-bold text-forest flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-brand" />
                      <span>Pembahasan Ilmiah Farmasi</span>
                    </div>
                    <p className="leading-relaxed text-ink-muted">{q.explanation}</p>
                    <div className="text-[11px] text-brand font-semibold pt-1">
                      Rujukan: {q.referenceSource}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
