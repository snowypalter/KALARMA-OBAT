/**
 * Export Utilities for Medicine Cabinet Data
 * Supports CSV, JSON formats for backup and doctor consultation
 */

import { MedicineItem, MedicineStatus } from '../types';
import { getMedicineStatus, formatIndonesianDate } from './medicineUtils';

export interface ExportOptions {
  format: 'csv' | 'json';
  includeNotes: boolean;
  timestamp: boolean;
}

/**
 * Convert medicines array to CSV string
 */
export function exportToCSV(medicines: MedicineItem[], options?: Partial<ExportOptions>): string {
  const opts: ExportOptions = {
    format: 'csv',
    includeNotes: true,
    timestamp: true,
    ...options,
  };

  if (medicines.length === 0) {
    return 'Nama Obat,Bentuk Sediaan,Tanggal Kedaluwarsa,Status,Tanggal Dibuka,Catatan\n';
  }

  // Header row
  const headers = [
    'Nama Obat',
    'Bentuk Sediaan',
    'Tanggal Kedaluwarsa',
    'Status',
    'Tanggal Dibuka',
  ];
  if (opts.includeNotes) headers.push('Catatan');
  if (opts.timestamp) headers.push('Tanggal Dicatat');

  const rows = medicines.map((m) => {
    const status = getMedicineStatus(m.expiryDate);
    const statusLabel = getStatusLabelIndonesian(status);
    const expiryFormatted = formatIndonesianDate(m.expiryDate);
    const openedFormatted = m.openedDate ? formatIndonesianDate(m.openedDate) : '-';
    const createdFormatted = formatIndonesianDate(new Date(m.createdAt).toISOString().split('T')[0]);

    const row = [
      escapeCSV(m.name),
      escapeCSV(m.sediaan),
      expiryFormatted,
      statusLabel,
      openedFormatted,
    ];

    if (opts.includeNotes) {
      row.push(m.notes ? escapeCSV(m.notes) : '-');
    }

    if (opts.timestamp) {
      row.push(createdFormatted);
    }

    return row.join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Convert medicines array to JSON object
 */
export function exportToJSON(
  medicines: MedicineItem[],
  options?: Partial<ExportOptions>
): string {
  const opts: ExportOptions = {
    format: 'json',
    includeNotes: true,
    timestamp: true,
    ...options,
  };

  const enrichedMedicines = medicines.map((m) => ({
    name: m.name,
    sediaan: m.sediaan,
    expiryDate: m.expiryDate,
    status: getMedicineStatus(m.expiryDate),
    statusIndonesian: getStatusLabelIndonesian(getMedicineStatus(m.expiryDate)),
    openedDate: m.openedDate || null,
    notes: opts.includeNotes ? (m.notes || null) : undefined,
    createdAt: opts.timestamp ? m.createdAt : undefined,
    id: m.id,
  }));

  return JSON.stringify(
    {
      exportDate: new Date().toISOString(),
      appVersion: '1.0.0',
      medicineCount: medicines.length,
      medicines: enrichedMedicines,
    },
    null,
    2
  );
}

/**
 * Trigger download of exported data
 */
export function downloadExport(
  content: string,
  format: 'csv' | 'json',
  filename?: string
): void {
  const timestamp = new Date().toISOString().split('T')[0];
  const defaultFilename =
    format === 'csv'
      ? `lemari_obat_${timestamp}.csv`
      : `lemari_obat_${timestamp}.json`;

  const blob = new Blob([content], {
    type: format === 'csv' ? 'text/csv;charset=utf-8;' : 'application/json;charset=utf-8;',
  });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename || defaultFilename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/**
 * Export entire cabinet with both formats
 */
export function exportMedicineCabinet(
  medicines: MedicineItem[],
  format: 'csv' | 'json' = 'csv'
): void {
  const content =
    format === 'csv'
      ? exportToCSV(medicines, { includeNotes: true, timestamp: true })
      : exportToJSON(medicines, { includeNotes: true, timestamp: true });

  downloadExport(content, format);
}

// ===== Helpers =====

/**
 * Escape special characters in CSV fields
 */
function escapeCSV(value: string): string {
  if (!value) return '';
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Get Indonesian label for medicine status
 */
function getStatusLabelIndonesian(status: MedicineStatus): string {
  const labels: Record<MedicineStatus, string> = {
    aman: 'Aman (> 30 hari)',
    segera: 'Segera Kedaluwarsa (≤ 30 hari)',
    kedaluwarsa: 'Kedaluwarsa',
  };
  return labels[status];
}
