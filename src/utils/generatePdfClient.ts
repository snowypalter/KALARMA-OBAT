import { jsPDF } from 'jspdf';
import { IDENTITAS_PROYEK } from '../data/identitasProyek';

export const generateAndDownloadPdf = (options?: {
  researcherName?: string;
  nim?: string;
  university?: string;
}) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const TEAL_DARK: [number, number, number] = [36, 60, 54]; // #243C36
  const TEAL_LIGHT: [number, number, number] = [220, 234, 229]; // #DCEAE5
  const SLATE_DARK: [number, number, number] = [34, 49, 44]; // #22312C
  const SLATE_MUTED: [number, number, number] = [83, 100, 94]; // #53645E
  const AMBER_DARK: [number, number, number] = [124, 75, 12]; // #7C4B0C
  const BORDER_COLOR: [number, number, number] = [226, 228, 220]; // #E2E4DC

  const timListString =
    options?.researcherName ||
    IDENTITAS_PROYEK.timPengembang
      .map((anggota) => `${anggota.nama} (NIM ${anggota.nim})`)
      .join(', ');

  let pageNum = 1;

  function drawHeaderFooter(title: string) {
    // Top Header Line
    doc.setDrawColor(...BORDER_COLOR);
    doc.setLineWidth(0.3);
    doc.line(15, 14, 195, 14);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...SLATE_MUTED);
    doc.text(
      `RUANG OBAT · MEDIA EDUKASI ${IDENTITAS_PROYEK.jenisKarya.toUpperCase()}`,
      15,
      11
    );
    doc.text(title, 195, 11, { align: 'right' });

    // Bottom Footer Line
    doc.line(15, 282, 195, 282);
    doc.text(
      'Ruang Obat adalah media edukasi informasi obat dan tidak menggantikan saran apoteker atau dokter.',
      15,
      286
    );
    doc.text(`Halaman ${pageNum}`, 195, 286, { align: 'right' });
  }

  // ==========================================
  // HALAMAN 1: COVER / HALAMAN JUDUL
  // ==========================================
  doc.setFillColor(...TEAL_DARK);
  doc.rect(0, 0, 210, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text(
    `${IDENTITAS_PROYEK.jenisKarya.toUpperCase()} · ${IDENTITAS_PROYEK.programStudi.toUpperCase()}`,
    105,
    14,
    { align: 'center' }
  );

  // Main Card Box
  doc.setFillColor(251, 249, 245);
  doc.setDrawColor(...TEAL_DARK);
  doc.setLineWidth(0.8);
  doc.roundedRect(15, 34, 180, 108, 4, 4, 'FD');

  // Subtitle badge
  doc.setFillColor(...TEAL_LIGHT);
  doc.setDrawColor(94, 126, 116);
  doc.roundedRect(22, 43, 166, 10, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEAL_DARK);
  doc.text(
    'DOKUMEN SPESIFIKASI PENGEMBANGAN MEDIA EDUKASI DIGITAL',
    105,
    49.5,
    { align: 'center' }
  );

  // Big Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...SLATE_DARK);
  doc.text('RUANG OBAT', 105, 68, { align: 'center' });

  // Tagline
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(...TEAL_DARK);
  doc.text(`"${IDENTITAS_PROYEK.tagline}"`, 105, 78, { align: 'center' });

  doc.setDrawColor(...BORDER_COLOR);
  doc.setLineWidth(0.4);
  doc.line(40, 86, 170, 86);

  // Description paragraph
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(...SLATE_MUTED);
  const coverDesc =
    'Dokumen pengembangan media edukasi interaktif untuk pengenalan informasi etiket/kemasan obat dan pengelolaan obat rumah tangga (Dagusibu). Disiapkan untuk peninjauan Dosen Pembimbing dan Dosen Penguji.';
  const splitCoverDesc = doc.splitTextToSize(coverDesc, 150);
  doc.text(splitCoverDesc, 105, 95, { align: 'center' });

  // Information Grid Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...BORDER_COLOR);
  doc.roundedRect(15, 150, 180, 90, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...SLATE_DARK);
  doc.text('INFORMASI IDENTITAS PROYEK', 22, 161);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(...SLATE_DARK);

  const metaRows: [string, string][] = [
    ['Nama Aplikasi', `: ${IDENTITAS_PROYEK.namaAplikasi} (Media Edukasi Web Responsif)`],
    ['Kategori Proyek', `: ${IDENTITAS_PROYEK.kategoriProyek}`],
    ['Program Studi', `: ${IDENTITAS_PROYEK.programStudi}`],
    ['Institusi', `: ${options?.university || IDENTITAS_PROYEK.institusi}`],
    ['Jenis Karya', `: ${IDENTITAS_PROYEK.jenisKarya}`],
    ['Tim Pengembang', `: ${timListString}`],
    ['Tahun & Status', `: ${IDENTITAS_PROYEK.tahun} · ${IDENTITAS_PROYEK.statusVersi}`],
    [
      'Status Pengembangan',
      ': Beranda, Cek Label 3 Sediaan, Lemari Obat, Kamus, Latihan, & Pustaka',
    ],
  ];

  let curY = 170;
  metaRows.forEach(([label, val]) => {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...SLATE_MUTED);
    doc.text(label, 22, curY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...SLATE_DARK);
    const wrappedVal = doc.splitTextToSize(val, 122);
    doc.text(wrappedVal, 66, curY);
    curY += wrappedVal.length > 1 ? wrappedVal.length * 4.8 + 2.5 : 7;
  });

  // Bottom Notice
  doc.setFillColor(247, 234, 210);
  doc.setDrawColor(216, 185, 154);
  doc.roundedRect(15, 248, 180, 26, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.8);
  doc.setTextColor(...AMBER_DARK);
  doc.text('BATASAN EDUKASI & KESELAMATAN PASIEN (PATIENT SAFETY):', 22, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.text(IDENTITAS_PROYEK.kalimatBatasan, 22, 261, { maxWidth: 166 });

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
  doc.text('1.1 Masalah dan Urgensi Pengembangan', 15, 36);

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
  const p2 = `Aplikasi "Ruang Obat" dirancang sebagai media edukasi ${IDENTITAS_PROYEK.jenisKarya} untuk menjembatani komunikasi informasi kefarmasian dalam format yang ramah pengguna, interaktif, dan mudah diakses melalui peramban web ponsel pintar maupun desktop. Fokus edukasi diarahkan pada pengenalan 6 titik informasi label kemasan dan penerapan prinsip DAGUSIBU (Dapatkan, Gunakan, Simpan, Buang) di lingkungan rumah tangga.`;
  doc.text(doc.splitTextToSize(p2, 180), 15, 79);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...TEAL_DARK);
  doc.text('1.3 Aturan Ketat & Batasan Produk (Ethical Safeguards)', 15, 108);

  const rules = [
    [
      'A. Tanpa Kalkulator Dosis & Diagnosis',
      'Aplikasi dengan tegas TIDAK menyediakan alat kalkulasi dosis atau sistem penegakan diagnosis penyakit, guna mencegah terjadinya bahaya swamedikasi berisiko tinggi.',
    ],
    [
      'B. Tanpa Klaim Berlebihan & Testimoni Palsu',
      'Aplikasi tidak memuat klaim sepihak seperti "pasti sembuh", "terverifikasi apoteker", atau testimoni buatan untuk menjaga netralitas media edukasi akademik.',
    ],
    [
      'C. Berbasis Sitasi Buku Ajar & Regulasi Resmi',
      'Semua uraian medis mengacu langsung pada Buku Ajar Farmakologi (HKI 2022), Farmakologi dan Terapi Edisi 4 (FKUI), BPOM RI, Kemenkes RI (DAGUSIBU), dan Farmakope Indonesia Edisi VI.',
    ],
    [
      'D. Kerahasiaan Data Lemari Obat (100% On-Device)',
      'Daftar persediaan obat di rumah yang dimasukkan pengguna hanya tersimpan secara lokal di memori peramban (localStorage) tanpa transmisi ke server luar.',
    ],
    [
      'E. Batasan Edukasi Wajib Terpampang',
      `Footer aplikasi secara konsisten menampilkan peringatan: "${IDENTITAS_PROYEK.kalimatBatasan}"`,
    ],
  ];

  let ruleY = 116;
  rules.forEach(([head, desc]) => {
    doc.setFillColor(...TEAL_LIGHT);
    doc.setDrawColor(...BORDER_COLOR);
    doc.roundedRect(15, ruleY, 180, 19, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...TEAL_DARK);
    doc.text(head, 20, ruleY + 5.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(...SLATE_DARK);
    doc.text(desc, 20, ruleY + 11, { maxWidth: 170 });

    ruleY += 22;
  });

  // Architecture Tree Box
  doc.setFillColor(251, 249, 245);
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
    '  ├── Beranda             (2 Aksi Utama, Grafik Stok, Panduan Fitur, Skenario)',
    '  ├── Cek Label           (Simulasi Kemasan Tablet, Sirup, Salep + 6 Hotspots)',
    '  │     └── Kamus Label   (17+ Istilah & Simbol Resmi BPOM / Kemenkes)',
    '  ├── Lemari Obat Saya    (Inventaris, Pencarian, Status Aman/Segera/ED, Dagusibu)',
    '  ├── Latihan             (Skenario Bercabang, Flashcard 3D, Uji Pemahaman/Kuis)',
    '  └── Pustaka & Tentang   (Daftar Regulasi Resmi, Tim Pengembang, Batasan)',
  ];
  let treeY = ruleY + 16;
  treeText.forEach((t) => {
    doc.text(t, 20, treeY);
    treeY += 4.5;
  });

  // ==========================================
  // HALAMAN 3: SPESIFIKASI PENGEMBANGAN DETAIL
  // ==========================================
  doc.addPage();
  pageNum++;
  drawHeaderFooter('Bab II: Spesifikasi Fitur Pengembangan');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...SLATE_DARK);
  doc.text('BAB II: SPESIFIKASI PENGEMBANGAN FITUR AKTIF', 15, 26);

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
    doc.setFillColor(
      isHead ? TEAL_DARK[0] : idx % 2 === 0 ? 255 : 251,
      isHead ? TEAL_DARK[1] : idx % 2 === 0 ? 255 : 249,
      isHead ? TEAL_DARK[2] : idx % 2 === 0 ? 255 : 245
    );
    doc.setDrawColor(...BORDER_COLOR);
    doc.rect(15, tableY, 180, isHead ? 8 : 13, 'FD');

    doc.setFont('helvetica', isHead ? 'bold' : 'normal');
    doc.setFontSize(8);
    doc.setTextColor(
      isHead ? 255 : SLATE_DARK[0],
      isHead ? 255 : SLATE_DARK[1],
      isHead ? 255 : SLATE_DARK[2]
    );

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
    'Pengguna dapat mengelola persediaan obat keluarga dengan pencarian langsung, input tanggal kedaluwarsa, dan tanggal dibuka. Sistem otomatis mengklasifikasikan status obat secara objektif dengan indikator ganda (IKON + TEKS, bukan warna semata):';
  doc.text(doc.splitTextToSize(lemariDesc, 180), 15, tableY + 16);

  let lemariY = tableY + 26;
  const statusCards = [
    ['AMAN (> 30 Hari)', 'Masa simpan masih panjang, obat layak disimpan sesuai suhu kemasan.'],
    ['SEGERA KEDALUWARSA (<= 30 Hari)', 'Memasuki batas kritis, perlu segera diperiksa atau dipisahkan.'],
    ['KEDALUWARSA (< 0 Hari)', 'Telah melewati batas aman pabrik. Tautan otomatis membuka Panduan Pemusnahan Obat Rusak.'],
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
  // HALAMAN 4: LEMBAR VALIDASI DOSEN PEMBIMBING DAN PENGUJI
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
    'Instrumen penilaian kelayakan media edukasi oleh Dosen Pembimbing dan Dosen Penguji Ahli Materi & Media Farmasi:',
    15,
    33
  );

  const valItems = [
    ['No', 'Indikator Penilaian Kelayakan Media', 'Skor (1-5)', 'Catatan / Rekomendasi Revisi'],
    ['1', 'Kebenaran 6 titik informasi label kemasan (NIE, ED, Logo, dll)', '[   ]', '...................................................'],
    ['2', 'Kepatuhan aspek Patient Safety (Bebas kalkulator/diagnosis liar)', '[   ]', '...................................................'],
    ['3', 'Ketepatan panduan Dagusibu (Penyimpanan & pemusnahan)', '[   ]', '...................................................'],
    ['4', 'Kejelasan bahasa awam untuk mahasiswa non-kesehatan', '[   ]', '...................................................'],
    ['5', 'Kemudahan navigasi responsif dan kecepatan respon UI', '[   ]', '...................................................'],
    ['6', 'Kesesuaian fitur Lemari Obat dengan masa simpan nyata', '[   ]', '...................................................'],
    ['7', 'Kelengkapan glosarium Kamus Label Obat resmi', '[   ]', '...................................................'],
  ];

  let valY = 38;
  valItems.forEach(([no, ind, sk, cat], idx) => {
    const isHead = idx === 0;
    doc.setFillColor(
      isHead ? TEAL_DARK[0] : idx % 2 === 0 ? 255 : 251,
      isHead ? TEAL_DARK[1] : idx % 2 === 0 ? 255 : 249,
      isHead ? TEAL_DARK[2] : idx % 2 === 0 ? 255 : 245
    );
    doc.setDrawColor(...BORDER_COLOR);
    doc.rect(15, valY, 180, isHead ? 8 : 12, 'FD');

    doc.setFont('helvetica', isHead ? 'bold' : 'normal');
    doc.setFontSize(8);
    doc.setTextColor(
      isHead ? 255 : SLATE_DARK[0],
      isHead ? 255 : SLATE_DARK[1],
      isHead ? 255 : SLATE_DARK[2]
    );

    doc.text(no, 18, valY + (isHead ? 5.5 : 7));
    doc.text(ind, 26, valY + (isHead ? 5.5 : 7), { maxWidth: 85 });
    doc.text(sk, 115, valY + (isHead ? 5.5 : 7), { align: 'center' });
    doc.text(cat, 130, valY + (isHead ? 5.5 : 7));

    valY += isHead ? 8 : 12;
  });

  // Scoring Guide Box
  doc.setFillColor(251, 249, 245);
  doc.setDrawColor(...BORDER_COLOR);
  doc.roundedRect(15, valY + 6, 180, 22, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(...SLATE_DARK);
  doc.text(
    'Keterangan Skala Nilai:  1 = Sangat Kurang  |  2 = Kurang  |  3 = Cukup  |  4 = Baik  |  5 = Sangat Baik',
    20,
    valY + 13
  );
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    'Kesimpulan: [  ] Layak Tanpa Revisi    [  ] Layak dengan Revisi Kecil    [  ] Belum Layak Diuji Lapangan',
    20,
    valY + 21
  );

  // Signature Section
  const sigY = valY + 36;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...SLATE_DARK);

  doc.text('Tangerang, ........................................... 2026', 120, sigY);
  doc.text('Dosen Pembimbing / Penguji,', 120, sigY + 6);

  doc.line(120, sigY + 30, 190, sigY + 30);
  doc.text('( .................................................................... )', 120, sigY + 34);
  doc.text('NIDN / NIP: .......................................................', 120, sigY + 39);

  // Trigger client-side browser native download
  doc.save('Dokumen_Pengembangan_Ruang_Obat.pdf');
};
