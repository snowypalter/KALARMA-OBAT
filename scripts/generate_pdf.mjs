import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'a4',
});

// Primary Colors
const TEAL_DARK = [15, 118, 110]; // #0f766e
const TEAL_LIGHT = [240, 253, 250]; // #f0fdfa
const SLATE_DARK = [30, 41, 59]; // #1e293b
const SLATE_MUTED = [100, 116, 139]; // #64748b
const AMBER_DARK = [180, 83, 9]; // #b45309
const BORDER_COLOR = [226, 232, 240]; // #e2e8f0

let pageNum = 1;

function drawHeaderFooter(title) {
  // Top Header Line
  doc.setDrawColor(...BORDER_COLOR);
  doc.setLineWidth(0.3);
  doc.line(15, 14, 195, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...SLATE_MUTED);
  doc.text('RUANG OBAT · PROTOTIPE MEDIA EDUKASI SKRIPSI S1 FARMASI', 15, 11);
  doc.text(title, 195, 11, { align: 'right' });

  // Bottom Footer Line
  doc.line(15, 282, 195, 282);
  doc.text(
    'Edukasi umum, bukan diagnosis atau saran dosis pribadi. Tanyakan ke apoteker atau dokter.',
    15,
    286
  );
  doc.text(`Halaman ${pageNum}`, 195, 286, { align: 'right' });
}

// ==========================================
// HALAMAN 1: COVER / HALAMAN JUDUL
// ==========================================
// Decorative Header Bar
doc.setFillColor(...TEAL_DARK);
doc.rect(0, 0, 210, 22, 'F');

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(255, 255, 255);
doc.text('INSTRUMEN PENELITIAN SKRIPSI S1 FARMASI KLINIS & KOMUNITAS', 105, 14, { align: 'center' });

// Main Card Box
doc.setFillColor(248, 250, 252);
doc.setDrawColor(...TEAL_DARK);
doc.setLineWidth(0.8);
doc.roundedRect(15, 35, 180, 115, 4, 4, 'FD');

// Subtitle pill
doc.setFillColor(...TEAL_LIGHT);
doc.setDrawColor(153, 246, 228);
doc.roundedRect(25, 44, 160, 10, 2, 2, 'FD');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...TEAL_DARK);
doc.text('DOKUMEN SPESIFIKASI PROTOTIPE MEDIA EDUKASI DIGITAL', 105, 50.5, { align: 'center' });

// Big Title
doc.setFont('helvetica', 'bold');
doc.setFontSize(26);
doc.setTextColor(...SLATE_DARK);
doc.text('RUANG OBAT', 105, 70, { align: 'center' });

// Tagline
doc.setFont('helvetica', 'normal');
doc.setFontSize(13);
doc.setTextColor(...TEAL_DARK);
doc.text('"Kenali label obatmu, kelola obat di rumahmu"', 105, 80, { align: 'center' });

doc.setDrawColor(...BORDER_COLOR);
doc.setLineWidth(0.4);
doc.line(40, 88, 170, 88);

// Description paragraph
doc.setFont('helvetica', 'normal');
doc.setFontSize(10);
doc.setTextColor(...SLATE_MUTED);
const coverDesc =
  'Dokumen prototipe media edukasi interaktif untuk pengenalan informasi etiket/kemasan obat dan pengelolaan obat rumah tangga (Dagusibu). Disiapkan untuk peninjauan Dosen Pembimbing, Dosen Penguji, dan Evaluasi Desain Instruksional menggunakan Claude AI.';
const splitCoverDesc = doc.splitTextToSize(coverDesc, 150);
doc.text(splitCoverDesc, 105, 96, { align: 'center' });

// Information Grid Box
doc.setFillColor(255, 255, 255);
doc.setDrawColor(...BORDER_COLOR);
doc.roundedRect(15, 160, 180, 80, 3, 3, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...SLATE_DARK);
doc.text('INFORMASI IDENTITAS PENELITIAN', 22, 172);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...SLATE_DARK);

const metaRows = [
  ['Nama Aplikasi Web', ': Ruang Obat (Mobile-First Progressive Web App)'],
  ['Bidang Keilmuan', ': Farmasi Klinis & Komunitas (S1 Farmasi)'],
  ['Sasaran Edukasi', ': Mahasiswa Non-Kesehatan dan Masyarakat Umum'],
  ['Peneliti / Penyusun', ': [ISI NAMA PENGEMBANG / PENELITI SKRIPSI]'],
  ['NIM & Institusi', ': [ISI NIM, PROGRAM STUDI, DAN UNIVERSITAS]'],
  ['Tahun Penyusunan', ': 2026'],
  ['Tautan Web Aktif', ': https://ais-pre-i6cmepgnonm4mfj7yg2xyk-74888050060.asia-east1.run.app'],
  ['Status Prototipe', ': Tahap 2 Selesai Penuh (Beranda, Cek Label, Lemari, Skenario, Flashcard, Kuis)'],
];

let curY = 181;
metaRows.forEach(([label, val]) => {
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...SLATE_MUTED);
  doc.text(label, 22, curY);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...SLATE_DARK);
  doc.text(val, 65, curY);
  curY += 7.5;
});

// Bottom Notice
doc.setFillColor(254, 243, 199);
doc.setDrawColor(253, 230, 138);
doc.roundedRect(15, 248, 180, 24, 2, 2, 'FD');
doc.setFont('helvetica', 'bold');
doc.setFontSize(9);
doc.setTextColor(...AMBER_DARK);
doc.text('CATATAN KHUSUS KEPATUHAN ETIKA FARMASI (PATIENT SAFETY):', 22, 255);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8.5);
doc.text(
  'Aplikasi ini tidak memuat kalkulator dosis, diagnosis, atau anjuran obat mandiri. Seluruh konten berpedoman pada Kemenkes RI, BPOM RI, dan Farmakope Indonesia.',
  22,
  261,
  { maxWidth: 166 }
);

// ==========================================
// HALAMAN 2: LATAR BELAKANG & ATURAN KETAT
// ==========================================
doc.addPage();
pageNum++;
drawHeaderFooter('Bab I: Latar Belakang & Batasan');

doc.setFont('helvetica', 'bold');
doc.setFontSize(16);
doc.setTextColor(...SLATE_DARK);
doc.text('BAB I: LATAR BELAKANG & BATASAN ETIKA', 15, 26);

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...TEAL_DARK);
doc.text('1.1 Masalah dan Urgensi Penelitian', 15, 36);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...SLATE_DARK);
const p1 =
  'Tingkat literasi masyarakat umum dan mahasiswa non-kesehatan dalam membaca etiket atau label obat jadi masih relatif rendah. Fenomena swamedikasi yang sering dijumpai meliputi: ketidakmampuan membedakan golongan obat (bebas, bebas terbatas, dan keras), ketidakpahaman membedakan Tanggal Kedaluwarsa pabrik (Expired Date) dengan Beyond Use Date (BUD) pada sediaan yang telah dibuka, penggunaan antibiotik sisa teman tanpa resep dokter, serta cara pembuangan obat rusak yang berpotensi disalahgunakan atau mencemari lingkungan.';
doc.text(doc.splitTextToSize(p1, 180), 15, 43);

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...TEAL_DARK);
doc.text('1.2 Tujuan Media Edukasi "Ruang Obat"', 15, 72);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);
doc.setTextColor(...SLATE_DARK);
const p2 =
  'Aplikasi "Ruang Obat" dirancang sebagai instrumen penelitian skripsi untuk menjembatani komunikasi informasi kefarmasian dalam format yang ramah pengguna, interaktif, dan mudah diakses melalui peramban web ponsel pintar (mobile-first). Fokus edukasi diarahkan pada pengenalan 6 titik informasi label kemasan dan penerapan prinsip DAGUSIBU (Dapatkan, Gunakan, Simpan, Buang) di lingkungan rumah tangga.';
doc.text(doc.splitTextToSize(p2, 180), 15, 79);

doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...TEAL_DARK);
doc.text('1.3 Aturan Ketat & Batasan Produk (Ethical Safeguards)', 15, 108);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9.5);

const rules = [
  [
    'A. Tanpa Kalkulator Dosis & Diagnosis',
    'Aplikasi dengan tegas TIDAK menyediakan alat kalkulasi dosis atau sistem penegakan diagnosis penyakit, guna mencegah terjadinya bahaya swamedikasi berisiko tinggi.',
  ],
  [
    'B. Tanpa Klaim Berlebihan & Testimoni Palsu',
    'Aplikasi tidak memuat klaim sepihak seperti "pasti sembuh", "terverifikasi apoteker", atau testimoni buatan untuk menjaga netralitas instrumen akademik.',
  ],
  [
    'C. Berbasis Sitasi Resmi (BPOM, Kemenkes, Farmakope)',
    'Semua uraian medis menggunakan placeholder rujukan resmi berformat [ISI DARI RUJUKAN: nama sumber] yang disupervisi oleh peneliti.',
  ],
  [
    'D. Kerahasiaan Data Lemari Obat (100% On-Device)',
    'Daftar persediaan obat di rumah yang dimasukkan pengguna hanya tersimpan secara lokal di memori peramban (localStorage) tanpa transmisi ke server luar.',
  ],
  [
    'E. Disclaimer Wajib Terpampang',
    'Footer aplikasi secara konsisten menampilkan peringatan: "Edukasi umum, bukan diagnosis atau saran dosis pribadi. Tanyakan ke apoteker atau dokter."',
  ],
];

let ruleY = 116;
rules.forEach(([head, desc]) => {
  doc.setFillColor(...TEAL_LIGHT);
  doc.setDrawColor(...BORDER_COLOR);
  doc.roundedRect(15, ruleY, 180, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...TEAL_DARK);
  doc.text(head, 20, ruleY + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...SLATE_DARK);
  doc.text(desc, 20, ruleY + 11.5, { maxWidth: 170 });

  ruleY += 21;
});

// Architecture Tree Box
doc.setFillColor(248, 250, 252);
doc.setDrawColor(...BORDER_COLOR);
doc.roundedRect(15, ruleY + 3, 180, 48, 2, 2, 'FD');

doc.setFont('helvetica', 'bold');
doc.setFontSize(9.5);
doc.setTextColor(...SLATE_DARK);
doc.text('PETA ARSITEKTUR NAVIGASI RUANG OBAT:', 20, ruleY + 10);

doc.setFont('courier', 'normal');
doc.setFontSize(8.5);
doc.setTextColor(...SLATE_MUTED);
const treeText = [
  'Ruang Obat',
  '  ├── Beranda             (2 Aksi Utama, Banner ED Dinamis, Skenario Teaser)',
  '  ├── Cek Label           (Simulasi Kemasan Tablet, Sirup, Salep + 6 Hotspots)',
  '  │     └── Kamus Label   (17+ Istilah & Simbol Resmi BPOM / Kemenkes)',
  '  ├── Lemari Obat Saya    (Inventaris, Status Aman/Segera/ED, Panduan Dagusibu)',
  '  ├── Latihan             (Skenario Bercabang, Flashcard, Uji Pemahaman/Kuis)',
  '  └── Pustaka & Tentang   (Daftar Regulasi Resmi, Identitas Peneliti, Batasan)',
];
let treeY = ruleY + 16;
treeText.forEach((t) => {
  doc.text(t, 20, treeY);
  treeY += 4.5;
});

// ==========================================
// HALAMAN 3: SPESIFIKASI FITUR DETAIL
// ==========================================
doc.addPage();
pageNum++;
drawHeaderFooter('Bab II: Spesifikasi Fitur Prototipe');

doc.setFont('helvetica', 'bold');
doc.setFontSize(16);
doc.setTextColor(...SLATE_DARK);
doc.text('BAB II: SPESIFIKASI FITUR PROTOTIPE AKTIF', 15, 26);

// Fitur 1: Cek Label
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...TEAL_DARK);
doc.text('2.1 Modul Cek Label: 6 Titik Kritis Kemasan Obat', 15, 36);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...SLATE_DARK);
doc.text(
  'Menyajikan visualisasi SVG interaktif untuk 3 bentuk sediaan obat yang paling umum di rumah: Tablet (Strip Foil), Sirup (Botol Cair & Sendok Takar), dan Salep (Tube Semipadat). Masing-masing dilengkapi 6 titik ketuk terstandar:',
  15,
  42,
  { maxWidth: 180 }
);

const hotspotsTable = [
  ['No', 'Titik Informasi Label', 'Rincian Penjelasan Edukatif & Rujukan Resmi'],
  [
    '1',
    'Logo Golongan Obat',
    'Identifikasi lingkaran hijau (bebas), biru (bebas terbatas P1-P6), dan merah K (obat keras). [Rujukan: BPOM - Pedoman Tanda Khusus Obat Jadi]',
  ],
  [
    '2',
    'Nama & Komposisi Zat',
    'Membedakan merk dagang vs zat generik aktif, dosis per tablet/5 mL, pencegahan duplikasi dosis. [Rujukan: Farmakope Indonesia]',
  ],
  [
    '3',
    'Indikasi Medis',
    'Kesesuaian gejala penyakit dengan indikasi resmi yang disetujui BPOM. [Rujukan: Informasi Produk BPOM]',
  ],
  [
    '4',
    'Aturan Pakai & Peringatan',
    'Frekuensi konsumsi, jarak waktu, hubungan dengan makan, dan tanda peringatan khusus. [Rujukan: Posologi Kemenkes]',
  ],
  [
    '5',
    'Tanggal Kedaluwarsa & Bets',
    'Letak cetak emboss/tinta Exp. Date, nomor bets penelusuran mutu, dan batas Beyond Use Date (BUD). [Rujukan: USP & BPOM]',
  ],
  [
    '6',
    'Nomor Izin Edar (NIE)',
    '15 digit verifikasi keaslian obat (DBL, DTL, DKL) melalui aplikasi BPOM Mobile. [Rujukan: BPOM RI]',
  ],
];

let tableY = 53;
hotspotsTable.forEach(([no, title, desc], idx) => {
  const isHead = idx === 0;
  doc.setFillColor(isHead ? TEAL_DARK[0] : idx % 2 === 0 ? 255 : 248, isHead ? TEAL_DARK[1] : 250, isHead ? TEAL_DARK[2] : 252);
  doc.setDrawColor(...BORDER_COLOR);
  doc.rect(15, tableY, 180, isHead ? 8 : 13, 'FD');

  doc.setFont('helvetica', isHead ? 'bold' : 'normal');
  doc.setFontSize(8);
  doc.setTextColor(isHead ? 255 : SLATE_DARK[0], isHead ? 255 : SLATE_DARK[1], isHead ? 255 : SLATE_DARK[2]);

  doc.text(no, 18, tableY + (isHead ? 5.5 : 5));
  doc.text(title, 27, tableY + (isHead ? 5.5 : 5), { maxWidth: 45 });
  doc.text(desc, 76, tableY + (isHead ? 5.5 : 4.5), { maxWidth: 115 });

  tableY += isHead ? 8 : 13;
});

// Fitur 2: Lemari Obat
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...TEAL_DARK);
doc.text('2.2 Modul Lemari Obat Saya & Algoritma Status Kedaluwarsa', 15, tableY + 10);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...SLATE_DARK);
const lemariDesc =
  'Pengguna dapat mengelola persediaan obat keluarga dengan input tanggal kedaluwarsa dan tanggal dibuka. Sistem otomatis mengklasifikasikan status obat secara objektif dengan indikator ganda (IKON + TEKS, bukan warna semata):';
doc.text(doc.splitTextToSize(lemariDesc, 180), 15, tableY + 16);

let lemariY = tableY + 26;
const statusCards = [
  ['🟢 AMAN (> 30 Hari)', 'Masa simpan masih panjang, obat layak disimpan sesuai suhu kemasan.'],
  ['🟡 SEGERA KEDALUWARSA (<= 30 Hari)', 'Memasuki batas kritis, perlu segera dikonsumsi jika sakit atau dipisahkan.'],
  ['🔴 KEDALUWARSA (< 0 Hari)', 'Telah melewati batas aman pabrik. Tautan otomatis membuka Panduan Pemusnahan Obat Rusak.'],
];

statusCards.forEach(([st, exp]) => {
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...BORDER_COLOR);
  doc.roundedRect(15, lemariY, 180, 11, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...SLATE_DARK);
  doc.text(st, 20, lemariY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...SLATE_MUTED);
  doc.text(exp, 85, lemariY + 7, { maxWidth: 105 });

  lemariY += 13;
});

// Fitur 3: Dagusibu
doc.setFont('helvetica', 'bold');
doc.setFontSize(11);
doc.setTextColor(...TEAL_DARK);
doc.text('2.3 Panduan Simpan & Buang (Prinsip Dagusibu)', 15, lemariY + 6);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...SLATE_DARK);
const daguDesc =
  'Memuat tata cara merusak sediaan obat sebelum dibuang (misal: menggerus tablet, mencampur dengan ampas kopi/tanah, merusak botol sirup, memotong label) agar tidak dipungut oknum pemalsu obat.';
doc.text(doc.splitTextToSize(daguDesc, 180), 15, lemariY + 12);

// ==========================================
// HALAMAN 4: LEMBAR VALIDASI DOSEN PEMBIMBING
// ==========================================
doc.addPage();
pageNum++;
drawHeaderFooter('Bab III: Instrumen Uji Kelayakan Dosen');

doc.setFont('helvetica', 'bold');
doc.setFontSize(16);
doc.setTextColor(...SLATE_DARK);
doc.text('BAB III: LEMBAR PENILAIAN & VALIDASI AHLI', 15, 26);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...SLATE_MUTED);
doc.text(
  'Instrumen penilaian kelayakan media edukasi oleh Dosen Pembimbing / Dosen Ahli Materi & Media Farmasi:',
  15,
  33
);

const valItems = [
  ['No', 'Indikator Penilaian Kelayakan Media', 'Skor (1-5)', 'Catatan / Rekomendasi Revisi'],
  ['1', 'Kebenaran 6 titik informasi label kemasan (NIE, ED, Logo, dll)', '[   ]', '...................................................'],
  ['2', 'Kepatuhan aspek Patient Safety (Bebas kalkulator/diagnosis liar)', '[   ]', '...................................................'],
  ['3', 'Ketepatan panduan Dagusibu (Penyimpanan & pemusnahan)', '[   ]', '...................................................'],
  ['4', 'Kejelasan bahasa awam untuk mahasiswa non-kesehatan', '[   ]', '...................................................'],
  ['5', 'Kemudahan navigasi mobile-first dan kecepatan respon UI', '[   ]', '...................................................'],
  ['6', 'Kesesuaian fitur Lemari Obat dengan masa simpan nyata', '[   ]', '...................................................'],
  ['7', 'Kelengkapan glosarium Kamus Label Obat resmi', '[   ]', '...................................................'],
];

let valY = 38;
valItems.forEach(([no, ind, sk, cat], idx) => {
  const isHead = idx === 0;
  doc.setFillColor(isHead ? TEAL_DARK[0] : idx % 2 === 0 ? 255 : 248, isHead ? TEAL_DARK[1] : 250, isHead ? TEAL_DARK[2] : 252);
  doc.setDrawColor(...BORDER_COLOR);
  doc.rect(15, valY, 180, isHead ? 8 : 12, 'FD');

  doc.setFont('helvetica', isHead ? 'bold' : 'normal');
  doc.setFontSize(8);
  doc.setTextColor(isHead ? 255 : SLATE_DARK[0], isHead ? 255 : SLATE_DARK[1], isHead ? 255 : SLATE_DARK[2]);

  doc.text(no, 18, valY + (isHead ? 5.5 : 7));
  doc.text(ind, 26, valY + (isHead ? 5.5 : 7), { maxWidth: 85 });
  doc.text(sk, 115, valY + (isHead ? 5.5 : 7), { align: 'center' });
  doc.text(cat, 130, valY + (isHead ? 5.5 : 7));

  valY += isHead ? 8 : 12;
});

// Scoring Guide Box
doc.setFillColor(248, 250, 252);
doc.setDrawColor(...BORDER_COLOR);
doc.roundedRect(15, valY + 6, 180, 22, 2, 2, 'FD');
doc.setFont('helvetica', 'bold');
doc.setFontSize(8.5);
doc.setTextColor(...SLATE_DARK);
doc.text('Keterangan Skala Nilai:  1 = Sangat Kurang  |  2 = Kurang  |  3 = Cukup  |  4 = Baik  |  5 = Sangat Baik', 20, valY + 13);
doc.setFont('helvetica', 'normal');
doc.setFontSize(8);
doc.text('Kesimpulan: [  ] Layak Tanpa Revisi    [  ] Layak dengan Revisi Kecil    [  ] Belum Layak Diuji Lapangan', 20, valY + 21);

// Signature Section
const sigY = valY + 36;
doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...SLATE_DARK);

doc.text('Kota .........................................., .............................. 2026', 120, sigY);
doc.text('Dosen Pembimbing / Ahli Penilai,', 120, sigY + 6);

doc.line(120, sigY + 30, 190, sigY + 30);
doc.text('( .................................................................... )', 120, sigY + 34);
doc.text('NIP: ..............................................................', 120, sigY + 39);

// ==========================================
// HALAMAN 5: PANDUAN EVALUASI CLAUDE AI
// ==========================================
doc.addPage();
pageNum++;
drawHeaderFooter('Bab IV: Evaluasi Instruksional Claude AI');

doc.setFont('helvetica', 'bold');
doc.setFontSize(16);
doc.setTextColor(...SLATE_DARK);
doc.text('BAB IV: EVALUASI INSTRUSIONAL CLAUDE AI', 15, 26);

doc.setFont('helvetica', 'normal');
doc.setFontSize(9);
doc.setTextColor(...SLATE_MUTED);
doc.text(
  'Teks prompt terstruktur di bawah ini dapat di-copy dan ditempelkan ke Claude AI untuk meminta analisis ahli desain instruksional dan kepatuhan farmasi klinis:',
  15,
  33,
  { maxWidth: 180 }
);

// Prompt Box
doc.setFillColor(248, 250, 252);
doc.setDrawColor(...BORDER_COLOR);
doc.roundedRect(15, 40, 180, 225, 2, 2, 'FD');

doc.setFont('courier', 'normal');
doc.setFontSize(7.5);
doc.setTextColor(...SLATE_DARK);

const promptLines = [
  '# Permohonan Review Media Edukasi Skripsi S1 Farmasi: "Ruang Obat"',
  '',
  'Halo Claude, saya mahasiswa S1 Farmasi Klinis dan Komunitas yang sedang',
  'menyusun skripsi media edukasi interaktif bernama "Ruang Obat"',
  '(Tagline: "Kenali label obatmu, kelola obat di rumahmu").',
  '',
  'Tautan Web Media Prototipe Aktif:',
  'https://ais-pre-bgveceomyvxxyzedwapdce-315876037641.asia-northeast1.run.app',
  '',
  'Sasaran Pengguna: Mahasiswa non-kesehatan dan masyarakat umum.',
  '',
  'Aturan Ketat & Batasan Skripsi (Ethical Boundaries):',
  '1. Murni edukasi umum; TIDAK ADA kalkulator dosis, diagnosis mandiri, atau',
  '   rekomendasi obat/dosis tertentu.',
  '2. Tidak mencantumkan klaim "ditinjau apoteker", "terverifikasi", atau testimoni.',
  '3. Seluruh materi edukasi mengacu pada BPOM RI, Kemenkes RI, dan Farmakope.',
  '4. Data lemari obat 100% tersimpan lokal di browser pengguna (localStorage).',
  '5. Disclaimer wajib di footer: "Edukasi umum, bukan diagnosis atau saran dosis',
  '   pribadi. Tanyakan ke apoteker atau dokter."',
  '',
  'Fitur yang Telah Selesai Dibangun:',
  '1. Beranda: Banner peringatan obat kedaluwarsa dinamis, 2 kartu aksi utama,',
  '   kartu skenario swamedikasi hari ini, akses cepat Kamus & Flashcard.',
  '2. Cek Label: Simulasi kemasan interaktif SVG (Tablet strip foil, Sirup botol cair,',
  '   Salep tube semipadat) dengan 6 titik ketuk resmi (Logo golongan obat, Nama &',
  '   komposisi, Indikasi, Aturan pakai, Tanggal kedaluwarsa & bets, NIE BPOM).',
  '3. Lemari Obat Saya: Inventaris mandiri, status otomatis (Aman, Segera kedaluwarsa',
  '   <=30 hari, Kedaluwarsa) dengan ikon & teks, filter chip, tambah/edit obat,',
  '   dan tautan langsung ke panduan pemusnahan obat.',
  '4. Panduan Simpan & Buang (Dagusibu): Petunjuk penyimpanan dan pemusnahan.',
  '5. Kamus Label Obat: Glosarium 17+ istilah resmi dengan live search & filter A-Z.',
  '6. Tentang: Tujuan penelitian skripsi, batasan produk, dan kebijakan privasi.',
  '',
  'Pertanyaan untuk Claude AI:',
  '1. Apakah tata letak 6 titik informasi label obat sudah komunikatif untuk audiens awam?',
  '2. Bagaimana evaluasi kepatuhan etika farmasi pada fitur Lemari Obat & status kedaluwarsa?',
  '3. Berikan saran konstruktif untuk modul selanjutnya (Skenario Bercabang, Flashcard, Kuis).',
];

let pY = 46;
promptLines.forEach((line) => {
  doc.text(line, 20, pY);
  pY += 4.5;
});

// Write to public directory
const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const outputPath = path.join(publicDir, 'Dokumen_Prototipe_Ruang_Obat.pdf');
const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
fs.writeFileSync(outputPath, pdfBuffer);

console.log(`PDF berhasil dibuat: ${outputPath} (${pdfBuffer.length} bytes)`);
