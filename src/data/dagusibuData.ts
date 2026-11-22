/**
 * DAGUSIBU (Dapatkan, Gunakan, Simpan, Buang) Framework Data
 * Indonesian pharmaceutical safety principles for home medicine management
 */

export interface DagusibuStep {
  num: string;
  title: string;
  desc: string;
  actionLabel: string;
  target: 'cek-label' | 'latihan' | 'simpan' | 'buang';
}

export interface SafetyChecklistItem {
  id: string;
  label: string;
}

export const DAGUSIBU_STEPS: DagusibuStep[] = [
  {
    num: '01',
    title: 'Dapatkan',
    desc: 'Peroleh obat di apotek atau fasilitas berizin dan pastikan kemasan tersegel serta memiliki NIE BPOM.',
    actionLabel: 'Cek NIE Kemasan',
    target: 'cek-label',
  },
  {
    num: '02',
    title: 'Gunakan',
    desc: 'Patuhi aturan pakai, dosis per takaran, dan tanda peringatan khusus tanpa berbagi antibiotik resep.',
    actionLabel: 'Latih Kasus Aman',
    target: 'latihan',
  },
  {
    num: '03',
    title: 'Simpan',
    desc: 'Jaga di suhu ruang kering sesuai etiket, pisahkan dari jangkauan anak, dan pantau tanggal kedaluwarsa.',
    actionLabel: 'Panduan Simpan',
    target: 'simpan',
  },
  {
    num: '04',
    title: 'Buang',
    desc: 'Rusak kemasan, campur isi tablet/salep dengan bahan tidak menarik, lalu lepas label sebelum dibuang.',
    actionLabel: 'Panduan Buang',
    target: 'buang',
  },
];

export const SAFETY_CHECKLIST_ITEMS: SafetyChecklistItem[] = [
  { id: 'logo', label: 'Periksa logo golongan obat (hijau, biru, atau merah K) sebelum konsumsi' },
  { id: 'bud', label: 'Catat tanggal buka pertama pada botol sirup atau tetes mata (batas BUD)' },
  { id: 'takaran', label: 'Gunakan sendok takar bawaan obat, bukan sendok makan dapur' },
  { id: 'simpan', label: 'Simpan obat di tempat sejuk dan kering, jauh dari kamar mandi lembap' },
  { id: 'kedaluwarsa', label: 'Pisahkan dan musnahkan obat kedaluwarsa sesuai panduan DAGUSIBU' },
];
