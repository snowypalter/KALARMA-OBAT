export interface PustakaItem {
  id: string;
  penulis: string;
  tahun: string;
  judul: string;
  penerbit: string;
  kategori: string;
  tautanPlaceholder: string;
  catatan: string;
}

export const PUSTAKA_ITEMS: PustakaItem[] = [
  {
    id: 'ref-hki-2022',
    penulis: 'Dr. Siti Maemonah, dkk. (11 Bab Terindeks)',
    tahun: '2022',
    judul: 'Buku Ajar Farmakologi (HKI 2022) — Konsep Dasar, Penggolongan Obat, Prinsip Benar Pemberian, Bentuk Sediaan, dan Cara Pemberian Obat',
    penerbit: 'Zahir Publishing, Yogyakarta (ISBN 978-623-466-100-2)',
    kategori: 'Buku Ajar Farmakologi (11 Bab)',
    tautanPlaceholder: 'HKI 2022 — Bab I s.d. Bab XI (Tersedia di Asisten AI Ruang Obat)',
    catatan: 'Rujukan utama penggolongan obat Indonesia (Bebas, Bebas Terbatas Daftar W & P1–P6, Keras Daftar G & OWA, Psikotropika, Narkotika), bentuk sediaan padat/cair/semipadat, interaksi susu-obat, dan prosedur pemberian obat yang benar.'
  },
  {
    id: 'ref-fkui-ed4',
    penulis: 'Sulistia G. Ganiswarna (Editor Utama) dkk. — Bagian Farmakologi FKUI',
    tahun: '1995 / Cet. 2001',
    judul: 'Farmakologi dan Terapi Edisi 4 — Pengantar Farmakologi, Obat Lokal, Kemoterapi Antimikroba, Kortikosteroid, Toksikologi, dan Interaksi Obat (56 Bab)',
    penerbit: 'Bagian Farmakologi Fakultas Kedokteran Universitas Indonesia, Jakarta (ISBN 979-496-112-4)',
    kategori: 'Buku Teks Farmakologi Klinik (24 Berkas / 56 Bab)',
    tautanPlaceholder: 'Farmakologi & Terapi Ed. 4 FKUI — Seksi I s.d. XVII (Bab 1–56)',
    catatan: 'Rujukan komprehensif farmakokinetik-farmakodinamik (Bab 1), analgesik-antipiretik/AINS (Bab 15), antihistamin (Bab 18), kortikosteroid topikal (Bab 33), antasida & obat lokal kulit (Bab 34), antijamur & prinsip antimikroba/AMR (Bab 38–39), dasar toksikologi (Bab 52), interaksi obat (Bab 54), dan variabilitas respons pasien (Bab 56).'
  },
  {
    id: 'ref-1',
    penulis: 'Badan Pengawas Obat dan Makanan (BPOM RI)',
    tahun: '2022',
    judul: 'Peraturan BPOM tentang Kriteria dan Tata Laksana Registrasi Obat serta Pedoman Informasi Produk & Penandaan Kemasan Obat',
    penerbit: 'BPOM RI, Jakarta',
    kategori: 'Regulasi & Legalitas',
    tautanPlaceholder: 'https://jdih.pom.go.id/',
    catatan: 'Rujukan standar ketentuan Nomor Izin Edar (NIE) 15 digit (DBL, DTL, DKL), tanda khusus lingkaran golongan obat, nomor bets, dan informasi wajib pada etiket.'
  },
  {
    id: 'ref-2',
    penulis: 'Kementerian Kesehatan Republik Indonesia (Kemenkes RI)',
    tahun: '2021',
    judul: 'Pedoman Pengelolaan Obat Rusak dan Kedaluwarsa di Fasilitas Pelayanan Kefarmasian dan Rumah Tangga (Gerakan DAGUSIBU & GeMa CerMat)',
    penerbit: 'Direktorat Jenderal Kefarmasian dan Alat Kesehatan Kemenkes RI',
    kategori: 'Pedoman Komunitas',
    tautanPlaceholder: 'https://farmalkes.kemkes.go.id/',
    catatan: 'Prinsip Dapatkan, Gunakan, Simpan, dan Buang (DAGUSIBU) obat secara aman dan bertanggung jawab di lingkungan rumah tangga.'
  },
  {
    id: 'ref-3',
    penulis: 'Kementerian Kesehatan Republik Indonesia',
    tahun: '2020',
    judul: 'Farmakope Indonesia Edisi VI — Standar Baku Mutu Sediaan Farmasi dan Kondisi Penyimpanan',
    penerbit: 'Kementerian Kesehatan RI, Jakarta',
    kategori: 'Standar Mutu Farmasi',
    tautanPlaceholder: 'https://farmalkes.kemkes.go.id/',
    catatan: 'Baku mutu resmi bentuk sediaan obat (tablet, kapsul, suspensi, emulsi, salep, krim, guttae), homogenitas sediaan, dan rentang suhu penyimpanan (dingin, sejuk, kamar).'
  },
  {
    id: 'ref-4',
    penulis: 'World Health Organization (WHO)',
    tahun: '2019',
    judul: 'Guidelines for the Regulatory Assessment of Medicinal Products for Use in Self-Medication',
    penerbit: 'World Health Organization, Geneva',
    kategori: 'Kesehatan Global',
    tautanPlaceholder: 'https://www.who.int/publications/',
    catatan: 'Panduan internasional batasan swamedikasi rasional, pengawasan reaksi obat yang tidak diinginkan (farmakovigilans), serta pencegahan resistensi antimikroba (AMR).'
  },
  {
    id: 'ref-5',
    penulis: 'United States Pharmacopeia (USP)',
    tahun: '2023',
    judul: 'USP General Chapter <795> & <797>: Beyond-Use Date (BUD) Determination in Nonsterile and Sterile Preparations',
    penerbit: 'The United States Pharmacopeial Convention',
    kategori: 'Standar Internasional',
    tautanPlaceholder: 'https://www.uspnf.com/',
    catatan: 'Standar penentuan batas waktu aman penggunaan sediaan obat cair, topikal, sirup kering rekonstitusi, dan tetes mata steril setelah wadah primer dibuka.'
  }
];
