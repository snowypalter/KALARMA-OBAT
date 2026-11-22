import React, { useState, useEffect } from 'react';
import { MedicineItem, MedicineStatus, SediaanType } from '../types';
import {
  getMedicineStatus,
  calculateDaysRemaining,
  formatIndonesianDate,
  getStatusMeta,
} from '../utils/medicineUtils';
import { ConfirmDialog, ModalShell, StatusBadge } from '../components/ui';
import {
  SmartExpiryNotification,
  getSmartDisposalAdvice,
} from '../components/SmartExpiryNotification';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Calendar,
  Sparkles,
  Trash,
  ShieldCheck,
  X,
  Pill,
  BookOpen,
  RotateCcw,
} from 'lucide-react';

interface LemariViewProps {
  medicines: MedicineItem[];
  onAddMedicine: (item: Omit<MedicineItem, 'id' | 'createdAt'>) => void;
  onEditMedicine: (id: string, item: Omit<MedicineItem, 'id' | 'createdAt'>) => void;
  onDeleteMedicine: (id: string) => void;
  onOpenPanduan: (mode?: 'simpan' | 'buang') => void;
  initialFilter?: 'semua' | 'aman' | 'segera' | 'kedaluwarsa';
  initialSearchQuery?: string;
}

const SEDIAAN_OPTIONS: SediaanType[] = [
  'Tablet',
  'Kapsul',
  'Sirup / Cair',
  'Salep / Krim / Gel',
  'Tetes Mata / Telinga',
  'Inhaler / Semprot',
  'Lainnya',
];

export const LemariView: React.FC<LemariViewProps> = ({
  medicines,
  onAddMedicine,
  onEditMedicine,
  onDeleteMedicine,
  onOpenPanduan,
  initialFilter = 'semua',
  initialSearchQuery = '',
}) => {
  const [filter, setFilter] = useState<'semua' | 'aman' | 'segera' | 'kedaluwarsa'>(
    initialFilter
  );
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  useEffect(() => {
    setFilter(initialFilter);
  }, [initialFilter]);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<MedicineItem | null>(null);
  const [medicineToDelete, setMedicineToDelete] = useState<MedicineItem | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formSediaan, setFormSediaan] = useState<SediaanType>('Tablet');
  const [formExpiryDate, setFormExpiryDate] = useState('');
  const [formOpenedDate, setFormOpenedDate] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formError, setFormError] = useState('');

  const openAddModal = () => {
    setEditingMedicine(null);
    setFormName('');
    setFormSediaan('Tablet');
    const d = new Date();
    d.setMonth(d.getMonth() + 6);
    setFormExpiryDate(d.toISOString().split('T')[0]);
    setFormOpenedDate('');
    setFormNotes('');
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditModal = (item: MedicineItem) => {
    setEditingMedicine(item);
    setFormName(item.name);
    setFormSediaan(item.sediaan);
    setFormExpiryDate(item.expiryDate);
    setFormOpenedDate(item.openedDate || '');
    setFormNotes(item.notes || '');
    setFormError('');
    setIsFormOpen(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Nama obat wajib diisi.');
      return;
    }
    if (!formExpiryDate) {
      setFormError('Tanggal kedaluwarsa wajib dipilih.');
      return;
    }

    if (editingMedicine) {
      onEditMedicine(editingMedicine.id, {
        name: formName.trim(),
        sediaan: formSediaan,
        expiryDate: formExpiryDate,
        openedDate: formOpenedDate || undefined,
        notes: formNotes.trim() || undefined,
      });
    } else {
      onAddMedicine({
        name: formName.trim(),
        sediaan: formSediaan,
        expiryDate: formExpiryDate,
        openedDate: formOpenedDate || undefined,
        notes: formNotes.trim() || undefined,
      });
    }

    setIsFormOpen(false);
  };

  const expiredMedicines = medicines.filter(
    (m) => getMedicineStatus(m.expiryDate) === 'kedaluwarsa'
  );

  const counts = {
    semua: medicines.length,
    aman: medicines.filter((m) => getMedicineStatus(m.expiryDate) === 'aman').length,
    segera: medicines.filter((m) => getMedicineStatus(m.expiryDate) === 'segera').length,
    kedaluwarsa: expiredMedicines.length,
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredMedicines = medicines.filter((m) => {
    const status = getMedicineStatus(m.expiryDate);
    const matchesFilter = filter === 'semua' || status === filter;
    const matchesSearch =
      !normalizedQuery ||
      m.name.toLowerCase().includes(normalizedQuery) ||
      m.sediaan.toLowerCase().includes(normalizedQuery) ||
      (m.notes && m.notes.toLowerCase().includes(normalizedQuery));

    return matchesFilter && matchesSearch;
  });

  const renderHighlightedName = (text: string, query: string) => {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      part.toLowerCase() === query ? (
        <mark key={idx} className="bg-secondary text-forest rounded px-1">
          {part}
        </mark>
      ) : (
        <React.Fragment key={idx}>{part}</React.Fragment>
      )
    );
  };

  return (
    <div className="space-y-6 pb-12 ro-fade-in">
      {/* Editorial Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Inventaris Pribadi &amp; Keamanan Rumah Tangga
          </p>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-forest tracking-tight">
            Lemari Obat Saya
          </h1>
          <p className="text-ink-muted text-sm sm:text-base max-w-2xl">
            Pantau masa simpan dan tanggal kedaluwarsa persediaan obat di rumah secara mandiri.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => onOpenPanduan('simpan')}
            className="min-h-[44px] px-4 py-2 rounded-xl border border-line bg-surface hover:bg-surface-muted text-forest text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-brand" />
            <span>Panduan Simpan &amp; Buang</span>
          </button>

          <button
            type="button"
            onClick={openAddModal}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-brand hover:bg-forest text-on-brand font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-sand" />
            <span>Tambah Obat</span>
          </button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="p-3.5 bg-status-aman-bg/65 border border-status-aman-text/20 rounded-2xl flex items-center justify-between gap-3 text-xs text-status-aman-text">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="font-medium">
            Data lemari obat tersimpan 100% lokal di peramban perangkatmu (tidak dikirim ke server luar).
          </span>
        </div>
        <span className="font-mono text-[11px] font-semibold hidden sm:inline shrink-0">
          On-Device
        </span>
      </div>

      {/* Smart Notification for Expired Medicines */}
      <SmartExpiryNotification
        expiredMedicines={expiredMedicines}
        currentFilter={filter}
        onFilterExpired={() => setFilter('kedaluwarsa')}
        onOpenDisposalGuide={() => onOpenPanduan('buang')}
        onRequestDelete={(med) => setMedicineToDelete(med)}
      />

      {/* Search & Filter Toolbar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama obat, bentuk sediaan, atau catatan (misal: Parasetamol)..."
            aria-label="Cari nama obat di lemari"
            className="w-full min-h-[46px] pl-10 pr-10 py-2.5 text-sm bg-surface border border-line rounded-xl text-ink placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus kata kunci pencarian"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] rounded-lg text-ink-muted hover:text-ink hover:bg-surface-muted flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Interactive Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => setFilter('semua')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-2 shrink-0 border ${
              filter === 'semua'
                ? 'bg-forest text-white border-forest'
                : 'bg-surface border-line text-ink hover:bg-surface-muted'
            }`}
          >
            <span>Semua</span>
            <span
              className={`font-mono tabular-nums text-[11px] ${
                filter === 'semua' ? 'text-sand' : 'text-ink-muted'
              }`}
            >
              {counts.semua}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('aman')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-2 shrink-0 border ${
              filter === 'aman'
                ? 'bg-status-aman-text text-white border-status-aman-text'
                : 'bg-surface border-line text-status-aman-text hover:bg-status-aman-bg/50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Aman</span>
            <span className="font-mono tabular-nums text-[11px] opacity-85">
              {counts.aman}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('segera')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-2 shrink-0 border ${
              filter === 'segera'
                ? 'bg-status-segera-text text-white border-status-segera-text'
                : 'bg-surface border-line text-status-segera-text hover:bg-status-segera-bg/50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Segera (≤30 Hari)</span>
            <span className="font-mono tabular-nums text-[11px] opacity-85">
              {counts.segera}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('kedaluwarsa')}
            className={`min-h-[44px] px-3.5 py-1.5 rounded-xl font-semibold transition-colors cursor-pointer flex items-center gap-2 shrink-0 border ${
              filter === 'kedaluwarsa'
                ? 'bg-status-kedaluwarsa-text text-white border-status-kedaluwarsa-text'
                : 'bg-surface border-line text-status-kedaluwarsa-text hover:bg-status-kedaluwarsa-bg/50'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>Kedaluwarsa</span>
            <span className="font-mono tabular-nums text-[11px] opacity-85">
              {counts.kedaluwarsa}
            </span>
          </button>
        </div>

        {/* Active Search Feedback Bar */}
        {normalizedQuery && (
          <div className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-secondary/45 border border-line text-xs text-forest">
            <span>
              Ditemukan <strong className="font-mono tabular-nums">{filteredMedicines.length}</strong> obat untuk kata kunci{' '}
              <strong className="font-semibold">&ldquo;{searchQuery.trim()}&rdquo;</strong>
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-brand hover:text-forest font-bold inline-flex items-center gap-1 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Hapus</span>
            </button>
          </div>
        )}
      </div>

      {/* Medicine Cards Grid (2-column on desktop) */}
      {filteredMedicines.length === 0 ? (
        <div className="p-8 sm:p-12 text-center bg-surface rounded-3xl border border-line space-y-3.5">
          <div className="w-12 h-12 rounded-2xl bg-surface-muted text-brand flex items-center justify-center mx-auto">
            <Pill className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="font-display text-lg font-semibold text-forest">
              {medicines.length === 0 ? 'Lemari obatmu masih kosong' : 'Tidak ada obat yang cocok'}
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted max-w-sm mx-auto leading-relaxed">
              {medicines.length === 0
                ? 'Catat persediaan obat di rumah untuk memastikan tanggal kedaluwarsa terpantau dengan aman.'
                : 'Coba ubah kata kunci pencarian atau tampilkan semua status obat.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            {medicines.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setFilter('semua');
                }}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-muted hover:bg-secondary/60 text-forest text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Pencarian &amp; Filter</span>
              </button>
            )}
            <button
              type="button"
              onClick={openAddModal}
              className="min-h-[44px] px-5 py-2 rounded-xl bg-brand hover:bg-forest text-on-brand text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-sand" />
              <span>Tambah Obat Sekarang</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMedicines.map((item) => {
            const daysRemaining = calculateDaysRemaining(item.expiryDate);
            const status: MedicineStatus = getMedicineStatus(item.expiryDate);
            const meta = getStatusMeta(status, daysRemaining);

            return (
              <article
                key={item.id}
                className={`p-5 bg-surface rounded-2xl border overflow-hidden transition-all shadow-2xs flex flex-col justify-between space-y-3.5 ${meta.cardBorder}`}
              >
                <div className="space-y-3">
                  {/* Top row: Name, StatusBadge, Actions */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-bold text-forest text-base sm:text-lg leading-snug">
                          {renderHighlightedName(item.name, normalizedQuery)}
                        </h2>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={status} label={meta.label} size="sm" />
                        <span className="text-xs text-ink-muted">
                          · {item.sediaan}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="min-h-[44px] min-w-[44px] text-ink-muted hover:text-forest hover:bg-surface-muted rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                        aria-label={`Edit ${item.name}`}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMedicineToDelete(item)}
                        className="min-h-[44px] min-w-[44px] text-ink-muted hover:text-status-kedaluwarsa-text hover:bg-status-kedaluwarsa-bg/60 rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                        aria-label={`Hapus ${item.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-1.5 text-xs pt-2.5 border-t border-line/70">
                    <div className="flex items-center gap-2 text-ink-muted">
                      <Calendar className="w-4 h-4 text-brand shrink-0" />
                      <span>
                        Kedaluwarsa:{' '}
                        <strong className="text-ink font-mono">
                          {formatIndonesianDate(item.expiryDate)}
                        </strong>{' '}
                        ({meta.detailText})
                      </span>
                    </div>

                    {item.openedDate && (
                      <div className="flex items-center gap-2 text-ink-muted">
                        <Sparkles className="w-4 h-4 text-status-segera-text shrink-0" />
                        <span>
                          Pertama Dibuka:{' '}
                          <strong className="text-ink font-mono">
                            {formatIndonesianDate(item.openedDate)}
                          </strong>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  {item.notes && (
                    <p className="text-xs text-ink-muted italic bg-surface-warm p-2.5 rounded-xl border border-line/80">
                      &ldquo;{item.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Conditional Smart Disposal / Inspection Next-Step */}
                {(status === 'kedaluwarsa' || status === 'segera') && (
                  <div
                    className={`pt-3 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs ${
                      status === 'kedaluwarsa'
                        ? 'bg-status-kedaluwarsa-bg/35 -mx-5 -mb-5 px-5 py-3.5 rounded-b-2xl border-status-kedaluwarsa-text/20'
                        : ''
                    }`}
                  >
                    <p className="text-ink-muted leading-relaxed">
                      {status === 'kedaluwarsa' ? (
                        <>
                          <strong className="text-status-kedaluwarsa-text font-semibold">
                            Saran langkah:{' '}
                          </strong>
                          {getSmartDisposalAdvice(item).ringkasanSingkat}
                        </>
                      ) : (
                        'Cek ulang kondisi fisik, warna, bau, dan persiapkan pengganti jika diperlukan.'
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() => onOpenPanduan(status === 'kedaluwarsa' ? 'buang' : 'simpan')}
                      className={`min-h-[44px] px-3 py-1.5 rounded-xl font-semibold inline-flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-center transition-colors ${
                        status === 'kedaluwarsa'
                          ? 'bg-surface border border-status-kedaluwarsa-text/25 text-status-kedaluwarsa-text hover:bg-status-kedaluwarsa-bg'
                          : 'text-status-segera-text hover:bg-status-segera-bg/60 underline underline-offset-4'
                      }`}
                    >
                      <Trash className="w-3.5 h-3.5" />
                      <span>{status === 'kedaluwarsa' ? 'Panduan Buang' : 'Panduan Simpan'}</span>
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* Confirm Delete Dialog (Internal accessible dialog, never window.confirm) */}
      <ConfirmDialog
        isOpen={Boolean(medicineToDelete)}
        onClose={() => setMedicineToDelete(null)}
        onConfirm={() => {
          if (medicineToDelete) {
            onDeleteMedicine(medicineToDelete.id);
            setMedicineToDelete(null);
          }
        }}
        title="Hapus Obat dari Lemari"
        message={`Apakah Anda yakin ingin menghapus "${medicineToDelete?.name ?? ''}" dari daftar persediaan obat di perangkat ini?`}
        confirmText="Hapus Obat"
        cancelText="Batal"
        variant="danger"
      />

      {/* Form Modal: Tambah / Edit Obat */}
      <ModalShell
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingMedicine ? 'Edit Catatan Obat' : 'Tambah Obat ke Lemari'}
        subtitle="Data hanya disimpan di memori perangkat Anda"
        maxWidth="md"
        headerIcon={<Pill className="w-5 h-5" />}
      >
        <form onSubmit={handleSaveForm} className="space-y-4 text-sm">
          {formError && (
            <div className="p-3 rounded-xl bg-status-kedaluwarsa-bg border border-status-kedaluwarsa-text/25 text-status-kedaluwarsa-text text-xs font-medium">
              {formError}
            </div>
          )}

          {/* Nama Obat */}
          <div className="space-y-1.5">
            <label
              htmlFor="form-name"
              className="block text-xs font-bold text-forest uppercase tracking-wider"
            >
              Nama Obat <span className="text-status-kedaluwarsa-text">*</span>
            </label>
            <input
              id="form-name"
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="Misal: Parasetamol 500 mg, Sirup Batuk..."
              className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-surface border border-line rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-focus"
            />
          </div>

          {/* Bentuk Sediaan */}
          <div className="space-y-1.5">
            <label
              htmlFor="form-sediaan"
              className="block text-xs font-bold text-forest uppercase tracking-wider"
            >
              Bentuk Sediaan
            </label>
            <select
              id="form-sediaan"
              value={formSediaan}
              onChange={(e) => setFormSediaan(e.target.value as SediaanType)}
              className="w-full min-h-[44px] px-3 py-2 text-sm bg-surface border border-line rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-focus"
            >
              {SEDIAAN_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal Kedaluwarsa */}
          <div className="space-y-1.5">
            <label
              htmlFor="form-expiry"
              className="block text-xs font-bold text-forest uppercase tracking-wider"
            >
              Tanggal Kedaluwarsa (Exp. Date){' '}
              <span className="text-status-kedaluwarsa-text">*</span>
            </label>
            <input
              id="form-expiry"
              type="date"
              required
              value={formExpiryDate}
              onChange={(e) => setFormExpiryDate(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-sm bg-surface border border-line rounded-xl text-ink font-mono focus:outline-none focus:ring-2 focus:ring-focus"
            />
            <span className="text-[11px] text-ink-muted block">
              Lihat tanggal yang tercetak di kemasan strip, botol, atau lipatan tube.
            </span>
          </div>

          {/* Tanggal Dibuka (Opsional) */}
          <div className="space-y-1.5">
            <label
              htmlFor="form-opened"
              className="block text-xs font-bold text-forest uppercase tracking-wider"
            >
              Tanggal Pertama Dibuka{' '}
              <span className="text-ink-muted font-normal normal-case">(Opsional)</span>
            </label>
            <input
              id="form-opened"
              type="date"
              value={formOpenedDate}
              onChange={(e) => setFormOpenedDate(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 text-sm bg-surface border border-line rounded-xl text-ink font-mono focus:outline-none focus:ring-2 focus:ring-focus"
            />
            <span className="text-[11px] text-ink-muted block">
              Disarankan untuk sirup atau tetes mata guna memantau Beyond Use Date (BUD).
            </span>
          </div>

          {/* Catatan Penyimpanan */}
          <div className="space-y-1.5">
            <label
              htmlFor="form-notes"
              className="block text-xs font-bold text-forest uppercase tracking-wider"
            >
              Catatan Tambahan{' '}
              <span className="text-ink-muted font-normal normal-case">(Opsional)</span>
            </label>
            <textarea
              id="form-notes"
              rows={2}
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              placeholder="Misal: Simpan di kotak P3K ruang tamu, jauhkan dari anak..."
              className="w-full p-3 text-sm bg-surface border border-line rounded-xl text-ink focus:outline-none focus:ring-2 focus:ring-focus"
            />
          </div>

          {/* Buttons */}
          <div className="pt-3 border-t border-line flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="min-h-[44px] px-4 py-2 text-ink-muted hover:bg-surface-muted font-semibold rounded-xl text-xs sm:text-sm cursor-pointer transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2 bg-brand hover:bg-forest text-on-brand font-semibold rounded-xl text-xs sm:text-sm cursor-pointer transition-colors"
            >
              {editingMedicine ? 'Simpan Perubahan' : 'Tambahkan ke Lemari'}
            </button>
          </div>
        </form>
      </ModalShell>
    </div>
  );
};
