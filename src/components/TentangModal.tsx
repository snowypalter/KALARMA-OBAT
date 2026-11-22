import React from 'react';
import { ModalShell } from './ui';
import { IDENTITAS_PROYEK } from '../data/identitasProyek';
import {
  Sparkles,
  BookOpen,
  Target,
  GraduationCap,
  Users,
  AlertTriangle,
  Lock,
  ScanSearch,
  Archive,
  Dumbbell,
  Bot,
} from 'lucide-react';

interface TentangModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TentangModal: React.FC<TentangModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Tentang Ruang Obat"
      subtitle="Media Edukasi Farmasi Klinis &amp; Komunitas Berbasis AI"
      maxWidth="xl"
      headerIcon={<Sparkles className="w-5 h-5 text-brand" />}
      footer={
        <div className="flex items-center justify-between gap-3 w-full">
          <span className="text-xs text-ink-muted font-medium">
            {IDENTITAS_PROYEK.statusVersi} · 2026
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 text-xs sm:text-sm font-semibold text-on-brand bg-brand hover:bg-forest rounded-xl transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      }
    >
      <div className="space-y-6 text-ink text-xs sm:text-sm leading-relaxed">
        {/* KARTU 1: TENTANG PLATFORM */}
        <section className="p-4 sm:p-5 rounded-2xl bg-surface-warm border border-line space-y-3">
          <div className="flex items-center gap-2.5 text-forest font-bold">
            <div className="w-8 h-8 rounded-xl bg-forest text-sand flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand block">
                Tentang Platform
              </span>
              <h3 className="font-display text-base font-semibold text-forest leading-tight">
                Ruang Obat — Edukasi Informasi Obat Berbasis AI
              </h3>
            </div>
          </div>

          <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
            <strong className="text-forest font-semibold">Ruang Obat</strong> adalah media edukasi informasi obat dan farmasi klinis berbasis AI yang terintegrasi dengan <strong className="text-forest">35 berkas pustaka resmi</strong> (<em>Buku Ajar Farmakologi HKI 2022</em> — 11 bab &amp; <em>Farmakologi dan Terapi Edisi 4 FKUI</em> — 24 berkas / 56 bab).
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-soft text-forest border border-sand/70 font-medium">
              <BookOpen className="w-3 h-3 text-brand" />
              <span>35 Berkas Buku Terindeks</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-forest border border-line font-medium">
              <Sparkles className="w-3 h-3 text-brand" />
              <span>RAG Terkunci &amp; Sitasi Bab</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-muted text-forest border border-line font-medium">
              <Lock className="w-3 h-3 text-brand" />
              <span>100% Data On-Device</span>
            </span>
          </div>
        </section>

        {/* KARTU 2: TUJUAN & FITUR UTAMA */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-forest font-bold">
            <Target className="w-4 h-4 text-brand shrink-0" />
            <h3 className="text-xs uppercase tracking-wider font-sans">
              Tujuan &amp; Fitur Utama
            </h3>
          </div>

          <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
            Membantu masyarakat mengenali simbol golongan obat, aturan pakai, batas masa simpan (BUD/ED), mengelola lemari obat rumah, serta berlatih pemahaman literasi obat.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-surface border border-line space-y-1.5">
              <div className="flex items-center gap-2 text-forest font-semibold text-xs sm:text-sm">
                <ScanSearch className="w-4 h-4 text-brand shrink-0" />
                <span>Cek Label Kemasan</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Simulasi 3 sediaan (Tablet, Sirup, Salep) dengan 6 titik ketuk kritis: logo lingkaran obat, nama/zat aktif, indikasi, aturan pakai, ED/bets, dan NIE BPOM 15 digit.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-line space-y-1.5">
              <div className="flex items-center gap-2 text-forest font-semibold text-xs sm:text-sm">
                <Archive className="w-4 h-4 text-[#B86E18] shrink-0" />
                <span>Lemari Obat Saya</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Manajemen stok obat rumah 100% lokal di perangkat (localStorage), pemantau batas Beyond Use Date (BUD), dan panduan pemusnahan obat kedaluwarsa.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-line space-y-1.5">
              <div className="flex items-center gap-2 text-forest font-semibold text-xs sm:text-sm">
                <Dumbbell className="w-4 h-4 text-[#3D5A6C] shrink-0" />
                <span>Latihan &amp; Evaluasi</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Skenario swamedikasi bercabang (AMR, takaran sirup, steroid kulit, antasida), flashcard interaktif 3D flip (12 kartu), dan kuis evaluasi Pre/Post-Test.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-line space-y-1.5">
              <div className="flex items-center gap-2 text-forest font-semibold text-xs sm:text-sm">
                <BookOpen className="w-4 h-4 text-brand shrink-0" />
                <span>Pustaka &amp; Asisten AI</span>
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Daftar regulasi resmi BPOM/Kemenkes serta chatbot farmakologi yang terkunci ketat mengutip bab dari 35 berkas pustaka resmi.
              </p>
            </div>
          </div>
        </section>

        {/* KARTU 3: IDENTITAS AKADEMIK */}
        <section className="p-4 sm:p-5 rounded-2xl bg-surface-muted/65 border border-line space-y-2.5">
          <div className="flex items-center gap-2 text-forest font-bold">
            <GraduationCap className="w-4 h-4 text-brand shrink-0" />
            <h3 className="text-xs uppercase tracking-wider font-sans">
              Identitas Akademik
            </h3>
          </div>

          <p className="text-ink-muted text-xs sm:text-sm leading-relaxed">
            Media Edukasi Tugas Akhir Berbasis Proyek — Program Studi S1 Farmasi Klinis dan Komunitas, Institut Kesehatan Widya Dharma Husada Tangerang (Versi Pengembangan 2026).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-ink-muted">
            <div className="p-2.5 rounded-xl bg-surface border border-line">
              <strong className="text-forest block">Program Studi:</strong>
              <span>S1 Farmasi Klinis dan Komunitas</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface border border-line">
              <strong className="text-forest block">Institusi:</strong>
              <span>Institut Kesehatan Widya Dharma Husada Tangerang</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface border border-line">
              <strong className="text-forest block">Jenis Karya:</strong>
              <span>Tugas Akhir Berbasis Proyek (2026)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-surface border border-line">
              <strong className="text-forest block">Status Pengembangan:</strong>
              <span>Versi Pengembangan 2026 (Aktif Penuh)</span>
            </div>
          </div>
        </section>

        {/* KARTU 4: TIM PENGEMBANG */}
        <section className="p-4 sm:p-5 rounded-2xl bg-surface-warm border border-line space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-forest font-bold">
              <Users className="w-4 h-4 text-brand shrink-0" />
              <h3 className="font-display text-base font-semibold text-forest">
                Tim Pengembang
              </h3>
            </div>
            <span className="text-[11px] font-mono text-brand font-semibold">
              3 Anggota Peneliti
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {IDENTITAS_PROYEK.timPengembang.map((anggota) => {
              const initials = anggota.nama
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('');
              return (
                <div
                  key={anggota.nim}
                  className="p-3 rounded-xl bg-surface border border-line flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-sand-soft text-forest font-bold text-xs flex items-center justify-center shrink-0 border border-sand/60">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-forest leading-snug line-clamp-2">
                        {anggota.nama}
                      </div>
                    </div>
                  </div>
                  <div className="pt-1.5 border-t border-line/60 flex items-center justify-between text-[11px]">
                    <span className="text-ink-muted">NIM</span>
                    <span className="font-mono font-semibold text-forest tabular-nums">
                      {anggota.nim}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-ink-muted text-center pt-1">
            Program Studi S1 Farmasi Klinis dan Komunitas · Institut Kesehatan Widya Dharma Husada Tangerang
          </p>
        </section>

        {/* KARTU 5: PEMBERITAHUAN EDUKASI & BATASAN KESELAMATAN */}
        <section className="p-4 rounded-2xl bg-status-segera-bg/50 border border-status-segera-text/30 text-status-segera-text space-y-2">
          <div className="flex items-center gap-2 font-bold text-status-segera-text text-xs sm:text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Pemberitahuan Edukasi &amp; Batasan Produk</span>
          </div>

          <p className="text-xs sm:text-sm font-medium leading-relaxed text-ink">
            Ruang Obat adalah media edukasi informasi obat dan tidak menggantikan saran apoteker atau dokter. Jangan mengobati diri sendiri tanpa bertanya kepada apoteker atau dokter.
          </p>

          <p className="text-[11px] sm:text-xs text-ink-muted leading-relaxed">
            Aplikasi ini <strong className="text-ink">TIDAK</strong> menyediakan kalkulator dosis personal, penegakan diagnosis penyakit, atau rekomendasi pemilihan obat tertentu untuk kondisi medis pribadi.
          </p>
        </section>
      </div>
    </ModalShell>
  );
};
