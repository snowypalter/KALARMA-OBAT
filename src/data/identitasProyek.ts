export interface PengembangItem {
  nama: string;
  nim: string;
}

export const TIM_PENGEMBANG: PengembangItem[] = [
  {
    nama: 'Andika Bella Pratama Putra',
    nim: '231030790839',
  },
  {
    nama: 'Nur Abdullah Kholiq',
    nim: '231030790829',
  },
  {
    nama: 'Syahrul Ramdhani',
    nim: '231030791114',
  },
];

export const IDENTITAS_PROYEK = {
  namaAplikasi: 'Ruang Obat',
  tagline: 'Kenali label obatmu, kelola obat di rumahmu',
  institusi: 'Institut Kesehatan Widya Dharma Husada Tangerang',
  programStudi: 'S1 Farmasi Klinik dan Komunitas',
  kategoriProyek:
    'Departemen Ilmu Farmasi Klinis — Website Berbasis Sistem Informasi / Media Edukasi Digital',
  jenisKarya: 'Tugas Akhir Berbasis Proyek',
  tahun: 2026,
  timPengembang: TIM_PENGEMBANG,
  kalimatBatasan:
    'Ruang Obat adalah media edukasi informasi obat dan tidak menggantikan saran apoteker atau dokter. Jangan mengobati diri sendiri tanpa bertanya kepada apoteker atau dokter.',
  statusVersi: 'Versi pengembangan 2026',
  taglineFooter:
    'Ruang Obat · Media Edukasi Tugas Akhir Berbasis Proyek S1 Farmasi Klinik dan Komunitas',
  badgeBeranda: 'Media Edukasi Farmasi Klinik dan Komunitas',
} as const;
