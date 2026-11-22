import React, { useState } from 'react';
import { ModalShell } from './ui';
import {
  Copy,
  Check,
  Share2,
  GraduationCap,
  ExternalLink,
  Printer,
  CheckCircle2,
  FileText,
  FileDown,
  Download,
} from 'lucide-react';
import { generateAndDownloadPdf } from '../utils/generatePdfClient';
import { IDENTITAS_PROYEK } from '../data/identitasProyek';

interface TinjauDosenModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'pdf' | 'link' | 'dosen';
}

export const TinjauDosenModal: React.FC<TinjauDosenModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'pdf',
}) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'link' | 'dosen'>(defaultTab);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedFullDoc, setCopiedFullDoc] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentOrigin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ais-pre-i6cmepgnonm4mfj7yg2xyk-74888050060.asia-east1.run.app';
  const sharedUrl =
    'https://ais-pre-i6cmepgnonm4mfj7yg2xyk-74888050060.asia-east1.run.app';
  const bestUrlToShare = currentOrigin.includes('localhost')
    ? sharedUrl
    : currentOrigin;

  const timDenganNim = IDENTITAS_PROYEK.timPengembang
    .map((a) => `${a.nama} (NIM ${a.nim})`)
    .join('; ');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bestUrlToShare).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handlePrintValidationSheet = () => {
    window.print();
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Berkas Dokumen & Tinjauan Pengembangan"
      subtitle="Dokumen PDF Resmi untuk Dosen Pembimbing dan Penguji"
      maxWidth="2xl"
      headerIcon={<FileText className="w-5 h-5" />}
      footer={
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span className="truncate max-w-[240px] sm:max-w-sm">
            {IDENTITAS_PROYEK.namaAplikasi} · {IDENTITAS_PROYEK.jenisKarya} {IDENTITAS_PROYEK.programStudi}
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
      <div className="space-y-5">
        {/* Tab Switcher (3 Tab untuk Dosen Pembimbing dan Penguji) */}
        <div className="grid grid-cols-3 gap-1 bg-surface-muted p-1.5 rounded-2xl border border-line text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('pdf')}
            className={`min-h-[44px] px-2 py-1.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'pdf'
                ? 'bg-surface text-forest shadow-xs'
                : 'text-ink-muted hover:text-forest'
            }`}
          >
            <FileDown className="w-3.5 h-3.5 text-brand shrink-0" />
            <span>File PDF</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('link')}
            className={`min-h-[44px] px-2 py-1.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'link'
                ? 'bg-surface text-forest shadow-xs'
                : 'text-ink-muted hover:text-forest'
            }`}
          >
            <Share2 className="w-3.5 h-3.5 text-brand shrink-0" />
            <span>Link Web</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dosen')}
            className={`min-h-[44px] px-2 py-1.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'dosen'
                ? 'bg-surface text-forest shadow-xs'
                : 'text-ink-muted hover:text-forest'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-brand shrink-0" />
            <span className="hidden sm:inline">Untuk Dosen</span>
            <span className="sm:hidden">Dosen</span>
          </button>
        </div>

        {/* TAB 1: FILE PDF PENGEMBANGAN */}
        {activeTab === 'pdf' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                Dokumen Pengembangan Siap Diberikan
              </p>
              <h3 className="font-display text-lg font-semibold text-forest">
                Dokumen PDF Pengembangan {IDENTITAS_PROYEK.jenisKarya} &ldquo;{IDENTITAS_PROYEK.namaAplikasi}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Berkas PDF ini disusun formal (4 halaman A4 standar akademik) untuk dosen pembimbing dan penguji, berisi rancangan pengembangan, batasan etika farmasi, tabel 6 titik kemasan, serta lembar validasi dosen.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-surface-warm rounded-2xl border border-line space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-forest text-sand flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-forest text-sm sm:text-base font-mono truncate">
                    Dokumen_Pengembangan_Ruang_Obat.pdf
                  </h4>
                  <p className="text-xs text-ink-muted font-medium">
                    4 Halaman Lengkap · Format Cetak A4 · {IDENTITAS_PROYEK.statusVersi}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-line">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <button
                    type="button"
                    disabled={isGenerating}
                    onClick={() => {
                      setIsGenerating(true);
                      try {
                        generateAndDownloadPdf();
                      } catch (err) {
                        console.error(err);
                      } finally {
                        setTimeout(() => setIsGenerating(false), 800);
                      }
                    }}
                    className="flex-1 min-h-[46px] px-5 py-2.5 rounded-xl bg-brand hover:bg-forest text-on-brand font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
                  >
                    <Download className="w-4 h-4 text-sand" />
                    <span>
                      {isGenerating
                        ? 'Membuat File PDF...'
                        : 'Unduh File PDF Sekarang (Di Perangkat)'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      const fullDoc = `# DOKUMEN SPESIFIKASI PENGEMBANGAN MEDIA EDUKASI DIGITAL
# ${IDENTITAS_PROYEK.namaAplikasi.toUpperCase()} ("${IDENTITAS_PROYEK.tagline}")

IDENTITAS PROYEK:
- Aplikasi Web: ${IDENTITAS_PROYEK.namaAplikasi} (Mobile-First Web App)
- Kategori Proyek: ${IDENTITAS_PROYEK.kategoriProyek}
- Jenis Karya: ${IDENTITAS_PROYEK.jenisKarya}
- Program Studi: ${IDENTITAS_PROYEK.programStudi}
- Institusi: ${IDENTITAS_PROYEK.institusi}
- Tim Pengembang: ${timDenganNim}
- Tahun: ${IDENTITAS_PROYEK.tahun}
- Status: ${IDENTITAS_PROYEK.statusVersi}

BAB I: LATAR BELAKANG & BATASAN ETIKA
1. Urgensi: Mengatasi ketidaktepatan swamedikasi, ketidakpahaman membedakan Expired Date pabrik vs Beyond Use Date (BUD), penyalahgunaan antibiotik sisa teman, dan pembuangan obat rusak yang berbahaya.
2. Batasan Etika Farmasi (Patient Safety):
   - TANPA kalkulator dosis & TANPA diagnosis mandiri
   - TANPA klaim berlebihan ("ditinjau apoteker", testimoni)
   - Seluruh materi menggunakan rujukan resmi Kemenkes RI, BPOM RI, dan Farmakope
   - Data lemari obat 100% tersimpan lokal di browser (localStorage)
   - Batasan wajib: "${IDENTITAS_PROYEK.kalimatBatasan}"

BAB II: SPESIFIKASI PENGEMBANGAN
1. Simulasi Kemasan Interaktif (Tablet, Sirup, Salep) dengan 6 Titik Kritis:
   - Titik 1: Logo Golongan Obat (Bebas Hijau, Bebas Terbatas Biru P1-P6, Keras Merah K)
   - Titik 2: Nama & Komposisi Zat Aktif (Generik vs Dagang, kekuatan dosis)
   - Titik 3: Indikasi Medis Terdaftar
   - Titik 4: Aturan Pakai, Waktu Makan & Peringatan Khusus
   - Titik 5: Tanggal Kedaluwarsa (Exp Date) & Nomor Bets Produksi
   - Titik 6: Nomor Izin Edar (NIE BPOM 15 digit resmi)
2. Lemari Obat Saya:
   - Status otomatis dengan IKON & TEKS:
     * Aman (> 30 hari)
     * Segera Kedaluwarsa (<= 30 hari)
     * Kedaluwarsa (lewat tanggal)
   - Tautan langsung ke Panduan Simpan & Buang (Dagusibu)
3. Kamus Label Obat:
   - Glosarium 17+ istilah resmi (NIE, BUD, ED, Rekonstitusi, Suhu Simpan, dll.)

BAB III: LEMBAR PENILAIAN & VALIDASI DOSEN PEMBIMBING DAN PENGUJI
- Tabel 7 Indikator Kelayakan Media/Materi (Skala 1-5)
- Kolom catatan asistensi & rekomendasi perbaikan
- Kolom persetujuan dan tanda tangan Dosen Pembimbing dan Penguji`;

                      navigator.clipboard.writeText(fullDoc).then(() => {
                        setCopiedFullDoc(true);
                        setTimeout(() => setCopiedFullDoc(false), 2500);
                      });
                    }}
                    className="min-h-[46px] px-4 py-2.5 rounded-xl bg-surface hover:bg-surface-muted border border-line text-forest font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copiedFullDoc ? (
                      <>
                        <Check className="w-4 h-4 text-status-aman-text" />
                        <span className="text-status-aman-text">Teks Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-brand" />
                        <span>Salin Naskah (.txt/.md)</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-[11px] text-ink-muted italic">
                  * Tombol unduh memproses file PDF langsung di memori perangkat Anda tanpa kendala jaringan.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">
                Struktur 4 Halaman Dokumen PDF
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {[
                  {
                    num: 1,
                    title: 'Halaman Judul (Cover)',
                    desc: 'Judul Tugas Akhir Berbasis Proyek, tagline, identitas tim pengembang, tautan web aktif, dan kepatuhan etika.',
                  },
                  {
                    num: 2,
                    title: 'Bab I: Latar Belakang & Etika',
                    desc: 'Urgensi swamedikasi awam, tujuan Dagusibu, 5 batasan etika ketat, & peta navigasi.',
                  },
                  {
                    num: 3,
                    title: 'Bab II: Spesifikasi Pengembangan',
                    desc: 'Tabel spesifikasi 6 titik kemasan (Tablet, Sirup, Salep), algoritma status lemari, & Dagusibu.',
                  },
                  {
                    num: 4,
                    title: 'Bab III: Lembar Penilaian Dosen',
                    desc: 'Tabel evaluasi 7 indikator kelayakan (skala 1-5) untuk dosen pembimbing dan penguji, catatan revisi, & kolom tanda tangan.',
                  },
                ].map((pg) => (
                  <div
                    key={pg.num}
                    className="p-3.5 bg-surface rounded-xl border border-line space-y-1"
                  >
                    <div className="font-bold text-forest flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-secondary text-forest flex items-center justify-center text-[10px] font-mono font-bold">
                        {pg.num}
                      </span>
                      <span>{pg.title}</span>
                    </div>
                    <p className="text-ink-muted text-[11px] leading-relaxed">
                      {pg.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Tautan Web & QR Code */}
        {activeTab === 'link' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-semibold text-forest">
                Tautan Akses Publik Web App
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Bagikan tautan ini kepada dosen pembimbing dan penguji, atau partisipan uji coba agar aplikasi dapat dibuka langsung di peramban ponsel maupun laptop.
              </p>
            </div>

            <div className="p-4 bg-surface-warm rounded-2xl border border-line space-y-2.5">
              <span className="text-xs font-bold text-forest block">
                Tautan Bersama (Shared Preview URL)
              </span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                <div className="flex-1 p-3 bg-surface border border-line rounded-xl text-xs font-mono text-forest break-all select-all">
                  {bestUrlToShare}
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className={`min-h-[44px] px-4 py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                    copiedLink
                      ? 'bg-status-aman-text text-white'
                      : 'bg-brand hover:bg-forest text-on-brand'
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Tautan</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4 bg-secondary/45 rounded-2xl border border-line flex flex-col sm:flex-row items-center gap-4">
              <div className="w-24 h-24 bg-surface p-2 rounded-xl border border-line flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-forest"
                  fill="currentColor"
                >
                  <rect x="5" y="5" width="28" height="28" rx="4" fill="currentColor" />
                  <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
                  <rect x="14" y="14" width="10" height="10" fill="currentColor" />
                  <rect x="67" y="5" width="28" height="28" rx="4" fill="currentColor" />
                  <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
                  <rect x="76" y="14" width="10" height="10" fill="currentColor" />
                  <rect x="5" y="67" width="28" height="28" rx="4" fill="currentColor" />
                  <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
                  <rect x="14" y="76" width="10" height="10" fill="currentColor" />
                  <rect x="38" y="10" width="8" height="8" fill="currentColor" />
                  <rect x="50" y="10" width="8" height="8" fill="currentColor" />
                  <rect x="44" y="24" width="8" height="8" fill="currentColor" />
                  <rect x="10" y="44" width="8" height="8" fill="currentColor" />
                  <rect x="24" y="44" width="8" height="8" fill="currentColor" />
                  <rect x="38" y="38" width="8" height="8" fill="currentColor" />
                  <rect x="52" y="38" width="8" height="8" fill="currentColor" />
                  <rect x="66" y="44" width="8" height="8" fill="currentColor" />
                  <rect x="80" y="44" width="8" height="8" fill="currentColor" />
                  <rect x="44" y="52" width="8" height="8" fill="currentColor" />
                  <rect x="38" y="66" width="8" height="8" fill="currentColor" />
                  <rect x="52" y="66" width="8" height="8" fill="currentColor" />
                  <rect x="66" y="66" width="8" height="8" fill="currentColor" />
                  <rect x="80" y="66" width="8" height="8" fill="currentColor" />
                  <rect x="44" y="80" width="8" height="8" fill="currentColor" />
                  <rect x="66" y="80" width="8" height="8" fill="currentColor" />
                  <rect x="80" y="80" width="8" height="8" fill="currentColor" />
                </svg>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold text-forest block">
                  Uji Coba Langsung di Smartphone
                </span>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Aplikasi ini dirancang dengan ergonomi sentuh yang nyaman di layar ponsel maupun layar lebar desktop.
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <a
                href={bestUrlToShare}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-4 py-2 rounded-xl border border-line hover:bg-surface-muted text-forest font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-brand" />
                <span>Buka di Tab Baru Peramban</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 3: Untuk Dosen Pembimbing dan Penguji */}
        {activeTab === 'dosen' && (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="font-display text-lg font-semibold text-forest">
                Panduan Validasi &amp; Tinjauan Dosen Pembimbing dan Penguji
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                Gunakan daftar periksa berikut saat asistensi atau peninjauan {IDENTITAS_PROYEK.jenisKarya} bersama dosen pembimbing dan penguji.
              </p>
            </div>

            <div className="p-3.5 bg-surface rounded-xl border border-line text-xs space-y-1 text-ink-muted">
              <div className="font-bold text-forest">
                {IDENTITAS_PROYEK.programStudi} · {IDENTITAS_PROYEK.institusi} ({IDENTITAS_PROYEK.tahun})
              </div>
              <div>Tim Pengembang: {timDenganNim}</div>
            </div>

            <div className="space-y-2.5">
              {[
                {
                  title: '1. Validasi 6 Titik Kritis Kemasan Obat',
                  desc: 'Memastikan titik ketuk pada kemasan Tablet, Sirup, dan Salep mencakup Logo Golongan, Zat Aktif, Indikasi, Aturan Pakai, ED/Bets, dan NIE BPOM sesuai rujukan resmi.',
                },
                {
                  title: '2. Kepatuhan Batasan Etika Farmasi (Patient Safety)',
                  desc: 'Aplikasi bebas dari kalkulator dosis, bebas alat diagnosis mandiri, dan bebas rekomendasi terapi pribadi untuk menjaga keselamatan pasien.',
                },
                {
                  title: '3. Prinsip Dagusibu & Pengelolaan Obat Rumah Tangga',
                  desc: 'Tersedia panduan penyimpanan dan pemusnahan obat kedaluwarsa/rusak agar tidak disalahgunakan atau mencemari lingkungan.',
                },
                {
                  title: '4. Integritas Data & Kerahasiaan (Data On-Device)',
                  desc: 'Semua pencatatan lemari obat hanya tersimpan di memori perangkat responden tanpa mengirim riwayat obat ke server luar.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-surface-warm rounded-xl border border-line flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <div className="text-xs text-ink-muted leading-relaxed">
                    <strong className="text-forest block mb-0.5">{item.title}</strong>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-status-segera-bg/70 rounded-2xl border border-status-segera-text/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs text-ink">
                <span className="font-bold text-status-segera-text block">
                  Butuh Lembar Cetak untuk Bimbingan?
                </span>
                <span className="text-ink-muted">
                  Anda dapat mencetak rangkuman checklist ini langsung untuk tatap muka bersama dosen pembimbing dan penguji.
                </span>
              </div>
              <button
                type="button"
                onClick={handlePrintValidationSheet}
                className="min-h-[44px] px-4 py-2 bg-status-segera-text hover:opacity-90 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Lembar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </ModalShell>
  );
};
