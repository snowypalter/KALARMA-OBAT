import { MedicineStatus } from '../types';

export const calculateDaysRemaining = (expiryDateStr: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [year, month, day] = expiryDateStr.split('-').map(Number);
  const expiry = new Date(year, month - 1, day);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getMedicineStatus = (expiryDateStr: string): MedicineStatus => {
  const days = calculateDaysRemaining(expiryDateStr);
  if (days < 0) return 'kedaluwarsa';
  if (days <= 30) return 'segera';
  return 'aman';
};

export const formatIndonesianDate = (dateStr: string): string => {
  if (!dateStr) return '-';
  try {
    const [year, month, day] = dateStr.split('-');
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
    const monthName = months[parseInt(month, 10) - 1] || month;
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  } catch {
    return dateStr;
  }
};

export const getStatusMeta = (status: MedicineStatus, daysRemaining: number) => {
  switch (status) {
    case 'kedaluwarsa':
      return {
        label: 'Kedaluwarsa',
        badgeBg:
          'bg-status-kedaluwarsa-bg text-status-kedaluwarsa-text border-status-kedaluwarsa-text/25',
        detailText:
          daysRemaining === -1
            ? 'Kedaluwarsa 1 hari lalu'
            : `Kedaluwarsa ${Math.abs(daysRemaining)} hari lalu`,
        cardBorder: 'border-status-kedaluwarsa-text/25 hover:border-status-kedaluwarsa-text/45',
        iconName: 'AlertOctagon' as const,
      };
    case 'segera':
      return {
        label: 'Segera Kedaluwarsa',
        badgeBg:
          'bg-status-segera-bg text-status-segera-text border-status-segera-text/25',
        detailText:
          daysRemaining === 0
            ? 'Kedaluwarsa hari ini!'
            : `Tersisa ${daysRemaining} hari lagi`,
        cardBorder: 'border-status-segera-text/30 hover:border-status-segera-text/50',
        iconName: 'AlertTriangle' as const,
      };
    case 'aman':
    default:
      return {
        label: 'Aman',
        badgeBg: 'bg-status-aman-bg text-status-aman-text border-status-aman-text/25',
        detailText:
          daysRemaining > 365
            ? `Masa simpan > 1 tahun (${Math.floor(daysRemaining / 30)} bulan)`
            : `Tersisa ${daysRemaining} hari`,
        cardBorder: 'border-line hover:border-line-strong',
        iconName: 'CheckCircle2' as const,
      };
  }
};
