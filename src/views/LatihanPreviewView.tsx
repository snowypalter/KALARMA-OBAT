import React from 'react';
import { TabType } from '../types';
import { 
  GitBranch, 
  Layers, 
  FileCheck2, 
  ArrowLeft, 
  Sparkles, 
  ExternalLink,
  MessageCircleQuestion
} from 'lucide-react';

interface LatihanPreviewViewProps {
  onNavigate: (tab: TabType) => void;
}

export const LatihanPreviewView: React.FC<LatihanPreviewViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-150">
      {/* Header */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onNavigate('beranda')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-900 cursor-pointer mb-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Rencana Modul Evaluasi & Latihan</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Latihan & Uji Pemahaman
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Ruang interaktif untuk menguji literasi label obat dan simulasi pengambilan keputusan swamedikasi yang aman.
        </p>
      </div>

      {/* Notice Card for First Iteration */}
      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-teal-950 space-y-2 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-bold text-teal-900">
          <MessageCircleQuestion className="w-5 h-5 text-teal-700 shrink-0" />
          <span>Tahap 1 Selesai: Beranda, Cek Label, & Lemari Obat Telah Aktif Penuh</span>
        </div>
        <p className="leading-relaxed text-teal-900/90">
          Sesuai instruksi Anda, tahap awal difokuskan pada pematangan <strong>Beranda</strong>, simulasi interaktif <strong>Cek Label</strong> (Tablet, Sirup, Salep), dan <strong>Lemari Obat Saya</strong>. Tiga modul latihan di bawah telah disiapkan arsitektur datanya dan siap diaktifkan penuh begitu Anda mengonfirmasi!
        </p>
      </div>

      {/* 3 Modul Latihan Cards */}
      <div className="space-y-4">
        {/* Modul 1: Skenario Swamedikasi */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <GitBranch className="w-5 h-5 text-teal-700" />
              </div>
              <div>
                <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">
                  Modul 1
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Skenario Swamedikasi (Cerita Bercabang)
                </h2>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold shrink-0">
              3 Skenario
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Satu pertanyaan per layar dengan 2–3 pilihan respons realistis, disertai umpan balik singkat setelah memilih, dan selalu berakhir dengan panduan praktis <em>"Kapan harus bertanya ke apoteker"</em>. Disimpan dalam struktur JSON terpisah agar mudah disunting untuk instrumen skripsi.
          </p>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
            <div className="font-semibold text-slate-800">Contoh Kasus Siap Pakai:</div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-600">
              <li>Kasus A: Demam dan godaan meminum sisa antibiotik teman</li>
              <li>Kasus B: Batuk berdahak vs batuk kering dan sendok takar sirup</li>
              <li>Kasus C: Gatal kulit dan kekeliruan memakai salep kortikosteroid sembarangan</li>
            </ul>
          </div>
        </div>

        {/* Modul 2: Flashcard */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-indigo-700" />
              </div>
              <div>
                <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                  Modul 2
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Flashcard Interaktif
                </h2>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold shrink-0">
              Balik Kartu
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Metode belajar cepat dengan animasi membalik kartu (tampak depan: simbol atau pertanyaan label; tampak belakang: penjelasan ringkas dari rujukan resmi) dilengkapi tombol <em>"Sudah Paham"</em> dan <em>"Ulangi Nanti"</em>.
          </p>
        </div>

        {/* Modul 3: Uji Pemahaman */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Modul 3
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  Uji Pemahaman (Pretest / Posttest)
                </h2>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-semibold shrink-0">
              Kuis Skripsi
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Kuis pilihan ganda terstruktur dengan kalkulasi skor akhir. Dilengkapi tombol penanda mode (Pretest sebelum materi / Posttest setelah materi) serta tautan integrasi ke Google Form penelitian Anda:
          </p>

          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-center justify-between text-xs text-amber-950">
            <span>Evaluasi Pre-Test &amp; Post-Test aktif langsung pada tab Latihan dengan fitur salin rekap skor.</span>
            <ExternalLink className="w-4 h-4 text-amber-700 shrink-0 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};
