import React from 'react';
import { ModalShell } from './ui';
import { ShieldAlert, AlertTriangle, Stethoscope, Ban, Lock, BookOpen } from 'lucide-react';

interface PemberitahuanEdukasiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PemberitahuanEdukasiModal: React.FC<PemberitahuanEdukasiModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Pemberitahuan Edukasi"
      subtitle="Batasan Medis &amp; Prinsip Keselamatan Pasien (Patient Safety)"
      maxWidth="lg"
      headerIcon={<ShieldAlert className="w-5 h-5 text-status-segera-text" />}
      footer={
        <div className="flex items-center justify-between gap-3 w-full">
          <span className="text-xs text-ink-muted">
            Prinsip Keselamatan Pasien · Ruang Obat 2026
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-5 py-2 text-xs sm:text-sm font-semibold text-on-brand bg-brand hover:bg-forest rounded-xl transition-colors cursor-pointer"
          >
            Saya Mengerti
          </button>
        </div>
      }
    >
      <div className="space-y-4 text-ink text-xs sm:text-sm leading-relaxed">
        {/* Core Disclaimer Callout */}
        <div className="p-4 rounded-2xl bg-status-segera-bg/50 border border-status-segera-text/30 text-status-segera-text space-y-2">
          <div className="flex items-center gap-2 font-bold text-status-segera-text text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Pernyataan Keselamatan Medis Mutlak</span>
          </div>
          <p className="font-medium leading-relaxed text-ink">
            Ruang Obat adalah media edukasi informasi obat dan tidak menggantikan saran apoteker atau dokter. Jangan mengobati diri sendiri tanpa bertanya kepada apoteker atau dokter.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-xl bg-surface-warm border border-line space-y-1.5">
            <div className="flex items-center gap-2 text-forest font-bold">
              <Ban className="w-4 h-4 text-brand shrink-0" />
              <h4 className="font-semibold text-xs sm:text-sm">Tanpa Kalkulator Dosis</h4>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Platform dengan tegas tidak menyediakan alat penyesuaian atau kalkulasi dosis personal untuk mencegah risiko dosis berlebih atau sub-terapi.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-warm border border-line space-y-1.5">
            <div className="flex items-center gap-2 text-forest font-bold">
              <Stethoscope className="w-4 h-4 text-brand shrink-0" />
              <h4 className="font-semibold text-xs sm:text-sm">Bukan Alat Diagnosis</h4>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Materi ditujukan untuk pemahaman membaca kemasan (NIE, BUD, peringatan P.1–P.6) dan bukan pengganti pemeriksaan klinis oleh tenaga medis.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-warm border border-line space-y-1.5">
            <div className="flex items-center gap-2 text-forest font-bold">
              <BookOpen className="w-4 h-4 text-brand shrink-0" />
              <h4 className="font-semibold text-xs sm:text-sm">Sitasi 35 Berkas Buku</h4>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Seluruh rujukan dikunci dari <em>Buku Ajar Farmakologi (HKI 2022)</em> dan <em>Farmakologi &amp; Terapi Ed. 4 (FKUI)</em> serta regulasi BPOM dan Kemenkes RI.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-warm border border-line space-y-1.5">
            <div className="flex items-center gap-2 text-forest font-bold">
              <Lock className="w-4 h-4 text-brand shrink-0" />
              <h4 className="font-semibold text-xs sm:text-sm">Privasi 100% On-Device</h4>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              Data stok obat rumah Anda disimpan secara lokal di peramban (localStorage) tanpa transmisi ke server luar.
            </p>
          </div>
        </div>

        {/* Warning Red Flags */}
        <div className="p-3.5 rounded-xl bg-surface-muted border border-line text-xs text-ink-muted space-y-1">
          <div className="font-semibold text-forest">Tanda Bahaya (Segera Konsultasi ke Apoteker/Dokter):</div>
          <p>
            Apabila mengalami keluhan nyeri dada mendadak, sesak napas berat, ruam kulit melepuh luas setelah minum obat, demam tinggi &gt; 3 hari, atau keluhan pada ibu hamil/bayi, segera kunjungi fasilitas pelayanan kesehatan terdekat.
          </p>
        </div>
      </div>
    </ModalShell>
  );
};
