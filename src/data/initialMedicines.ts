import { MedicineItem } from '../types';

export const getInitialMedicines = (): MedicineItem[] => {
  const now = new Date();
  
  // 1 year from now (Aman)
  const safeDate = new Date(now);
  safeDate.setFullYear(now.getFullYear() + 1);
  const safeDateStr = safeDate.toISOString().split('T')[0];

  // 18 days from now (Segera kedaluwarsa <= 30 hari)
  const soonDate = new Date(now);
  soonDate.setDate(now.getDate() + 18);
  const soonDateStr = soonDate.toISOString().split('T')[0];

  // 10 days ago (opened 10 days ago)
  const openedDate = new Date(now);
  openedDate.setDate(now.getDate() - 10);
  const openedDateStr = openedDate.toISOString().split('T')[0];

  // 45 days ago (Kedaluwarsa)
  const expiredDate = new Date(now);
  expiredDate.setDate(now.getDate() - 45);
  const expiredDateStr = expiredDate.toISOString().split('T')[0];

  return [
    {
      id: 'med-1',
      name: 'Parasetamol 500 mg',
      sediaan: 'Tablet',
      expiryDate: safeDateStr,
      notes: 'Disimpan di kotak P3K suhu ruang kering',
      createdAt: Date.now() - 3600000 * 24 * 5
    },
    {
      id: 'med-2',
      name: 'Sirup Batuk & Flu',
      sediaan: 'Sirup / Cair',
      expiryDate: soonDateStr,
      openedDate: openedDateStr,
      notes: 'Botol sudah dibuka, sendok takar bawaan ada di dalam dus',
      createdAt: Date.now() - 3600000 * 24 * 10
    },
    {
      id: 'med-3',
      name: 'Salep Kulit Antijamur',
      sediaan: 'Salep / Krim / Gel',
      expiryDate: expiredDateStr,
      notes: 'Tutup ulir agak kotor, sisa sedikit di dasar tube',
      createdAt: Date.now() - 3600000 * 24 * 60
    }
  ];
};
