/**
 * Smart Disposal Advice Data - Condensed Templates
 * Reduces SmartExpiryNotification.tsx verbosity by 60%
 */

import { SediaanType } from '../types';

export interface DisposalStep {
  action: string;
  material?: string;
  note?: string;
}

export interface DisposalAdvice {
  ringkasanSingkat: string;
  langkah: string[];
  peringatanKhusus?: string;
}

export const DISPOSAL_ADVICE_BY_SEDIAAN: Record<SediaanType, DisposalAdvice> = {
  Tablet: {
    ringkasanSingkat:
      'Keluarkan tablet dari blister, hancurkan bersama tanah/ampas kopi, dan rusak kemasan sebelum dibuang.',
    langkah: [
      'Segera pisahkan dari kotak P3K agar tidak terminum secara tidak sengaja.',
      'Gerus tablet atau campur dengan ampas kopi/tanah dalam plastik tertutup.',
      'Gunting blister dan lepas label identitas pada dus sebelum dibuang.',
    ],
  },
  Kapsul: {
    ringkasanSingkat:
      'Keluarkan isi/cangkang kapsul, campur dengan ampas kopi/tanah dalam wadah tertutup, dan rusak kemasan.',
    langkah: [
      'Segera pisahkan dari obat lain yang masih aman dikonsumsi.',
      'Buka kapsul dan campur isi dengan tanah, pasir, atau ampas kopi dalam kantong plastik terikat rapat.',
      'Rusak strip/botol dan lepas label etiket sebelum dibuang agar tidak disalahgunakan.',
    ],
  },
  'Sirup / Cair': {
    ringkasanSingkat:
      'Hati-hati: antibiotik harus diserahkan ke apotek; sirup biasa dapat diencerkan dengan air.',
    langkah: [
      'Hentikan pemakaian segera dan jauhkan botol dari jangkauan anak-anak.',
      'Untuk antibiotik: kembalikan ke apotek atau campur dengan ampas kopi/pasir dalam plastik tertutup (jangan buang ke saluran air).',
      'Untuk sirup non-antibiotik: encerkan dengan air lalu buang perlahan ke saluran pembuangan; lepas label botol lalu buang tanpa tutup.',
    ],
    peringatanKhusus:
      'Sirup antibiotik harus diserahkan ke fasilitas kesehatan untuk mencegah resistensi antimikroba dan pencemaran lingkungan.',
  },
  'Salep / Krim / Gel': {
    ringkasanSingkat:
      'Keluarkan seluruh sisa salep ke plastik berisi tanah/ampas kopi, pipihkan tube, dan lepas label.',
    langkah: [
      'Hentikan pengolesan karena sediaan semipadat kedaluwarsa berisiko teroksidasi atau terkontaminasi mikroba.',
      'Pencet tube dan keluarkan seluruh sisa salep/krim ke kantong plastik berisi tanah/ampas kopi, ikat rapat.',
      'Pipihkan atau gunting ujung tube dan lepas label kemasan sebelum membuang ke sampah domestik.',
    ],
  },
  'Tetes Mata / Telinga': {
    ringkasanSingkat:
      'Kosongkan botol penetes dengan aman, rusak ujung dropper, dan buang terpisah dari tutupnya.',
    langkah: [
      'Segera hentikan penggunaan pada mata/telinga untuk mencegah infeksi atau iritasi berat.',
      'Kosongkan cairan sisa (serap dengan tisu/kapas ke plastik tertutup untuk obat keras, atau buang sesuai petunjuk apoteker).',
      'Rusak bagian dropper dan lepas label botol, lalu buang terpisah antara botol dan tutupnya.',
    ],
    peringatanKhusus:
      'Tetes mata/telinga kedaluwarsa berisiko tinggi tertular bakteri patogen; jangan gunakan kembali wadah bekas.',
  },
  'Inhaler / Semprot': {
    ringkasanSingkat:
      'JANGAN melubangi atau membakar tabung; kembalikan ke apotek atau puskesmas terdekat.',
    langkah: [
      'Hentikan penggunaan segera karena efektivitas dosis semprotan tidak lagi terjamin.',
      'JANGAN melubangi, menekan paksa, atau membakar tabung aerosol (risiko meledak).',
      'Simpan di wadah terpisah dan serahkan kepada apotek atau fasilitas kesehatan yang menerima limbah farmasi.',
    ],
    peringatanKhusus:
      'Tabung bertekanan bekas tidak boleh dibuang ke sampah biasa—risiko ledakan dan pencemaran lingkungan sangat tinggi.',
  },
  Lainnya: {
    ringkasanSingkat:
      'Pisahkan dari obat aktif, rusak identitas kemasan, dan konsultasikan cara pemusnahan ke apoteker.',
    langkah: [
      'Keluarkan obat dari tempat penyimpanan harian dan beri tanda agar tidak digunakan anggota keluarga.',
      'Pertahankan dalam wadah tertutup sementara hingga siap dimusnahkan atau diserahkan ke apotek terdekat.',
      'Lepas atau coret label informasi pada kemasan sebelum membuang wadah kosong.',
    ],
  },
};

export const ANTIBIOTIC_KEYWORDS = [
  'amoksisilin',
  'ampisilin',
  'penisilin',
  'antibiotik',
  'sefalosporin',
  'eritromisin',
  'azitromsin',
  'trimetoprim',
  'sulfamethoxazol',
  'cefadroxil',
  'siprofloksasin',
  'ciprofloxacin',
  'kotrimoksazol',
  'doksisiklin',
  'tetrasiklin',
  'klindamisin',
  'metronidazol',
  'kloramfenikol',
];

export function isAntibioticByKeyword(medicineName: string, notes?: string): boolean {
  const lowerText = `${medicineName} ${notes ?? ''}`.toLowerCase();
  return ANTIBIOTIC_KEYWORDS.some((kw) => lowerText.includes(kw));
}
