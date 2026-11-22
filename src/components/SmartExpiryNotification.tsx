import React, { useState, useEffect, useMemo } from 'react';
import { MedicineItem, SediaanType } from '../types';
import { calculateDaysRemaining, formatIndonesianDate } from '../utils/medicineUtils';
import {
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Trash2,
  Filter,
  ShieldAlert,
  CheckCircle2,
  X,
} from 'lucide-react';

interface SmartExpiryNotificationProps {
  expiredMedicines: MedicineItem[];
  currentFilter: 'semua' | 'aman' | 'segera' | 'kedaluwarsa';
  onFilterExpired: () => void;
  onOpenDisposalGuide: () => void;
  onRequestDelete: (medicine: MedicineItem) => void;
}

interface DisposalAdvice {
  ringkasanSingkat: string;
  langkah: [string, string, string];
  peringatanKhusus?: string;
}

const ANTIBIOTIC_KEYWORDS = [
  'antibiotik',
  'amoksisilin',
  'amoxicillin',
  'ampisilin',
  'azitromisin',
  'azithromycin',
  'sefiksim',
  'cefixime',
  'sefadroksil',
  'cefadroxil',
  'siprofloksasin',
  'ciprofloxacin',
  'kotrimoksazol',
  'doksisiklin',
  'tetrasiklin',
  'eritromisin',
  'kloramfenikol',
  'metronidazol',
  'klindamisin',
];

export function getSmartDisposalAdvice(medicine: MedicineItem): DisposalAdvice {
  const lowerName = `${medicine.name} ${medicine.notes ?? ''}`.toLowerCase();
  const isAntibiotic = ANTIBIOTIC_KEYWORDS.some((kw) => lowerName.includes(kw));

  const sediaanMap: Record<SediaanType, DisposalAdvice> = {
    Tablet: {
      ringkasanSingkat:
        'Keluarkan tablet dari blister, hancurkan bersama tanah/ampas kopi, dan rusak kemasan sebelum dibuang.',
      langkah: [
        'Segera pisahkan dari kotak P3K agar tidak terminum secara tidak sengaja.',
        'Keluarkan seluruh tablet dari strip/blister, gerus atau campur dengan bahan tidak menarik seperti ampas kopi atau tanah dalam plastik tertutup.',
        'Gunting blister serta lepas atau coret label identitas pada dus sebelum dibuang ke tempat sampah domestik.',
      ],
    },
    Kapsul: {
      ringkasanSingkat:
        'Keluarkan isi/cangkang kapsul, campur dengan ampas kopi/tanah dalam wadah tertutup, dan rusak kemasan.',
      langkah: [
        'Segera pisahkan dari obat lain yang masih aman dikonsumsi.',
        'Buka atau keluarkan kapsul dari kemasan aslinya, lalu campur dengan tanah, pasir, atau ampas kopi dalam kantong plastik terikat rapat.',
        'Rusak strip/botol dan lepaskan label etiket sebelum dibuang agar tidak disalahgunakan.',
      ],
    },
    'Sirup / Cair': {
      ringkasanSingkat:
        'Periksa jenis cairan terlebih dahulu: sirup biasa dapat diencerkan, sedangkan antibiotik/obat khusus harus diserahkan ke apotek atau dicampur bahan penyerap.',
      langkah: [
        'Hentikan pemakaian segera dan jauhkan botol dari jangkauan anak-anak.',
        isAntibiotic
          ? 'Karena terdeteksi sebagai antibiotik, JANGAN tuang ke wastafel/saluran air untuk mencegah pencemaran dan resistensi antimikroba. Campurkan cairan dengan ampas kopi/pasir di plastik tertutup atau kembalikan ke apotek/puskesmas.'
          : 'Untuk sirup non-antibiotik (obat bebas biasa), encerkan dengan air lalu buang perlahan ke saluran pembuangan; atau serap dengan tisu/ampas kopi dalam plastik tertutup.',
        'Lepas dan rusak label pada botol, bilas singkat wadah kosong, lalu buang botol tanpa tutup dalam keadaan rusak/penyok.',
      ],
    },
    'Salep / Krim / Gel': {
      ringkasanSingkat:
        'Keluarkan seluruh sisa salep ke plastik berisi tanah/ampas kopi, lalu pipihkan tube dan lepas label.',
      langkah: [
        'Hentikan pengolesan pada kulit karena sediaan semipadat kedaluwarsa berisiko teroksidasi atau terkontaminasi mikroba.',
        'Pencet dan keluarkan seluruh sisa salep/krim dari dalam tube ke kantong plastik berisi tanah atau ampas kopi, lalu ikat rapat.',
        'Pipihkan atau gunting ujung tube dan lepaskan label kemasan sebelum membuangnya ke sampah domestik.',
      ],
    },
    'Tetes Mata / Telinga': {
      ringkasanSingkat:
        'Kosongkan botol penetes dengan aman, rusak ujung penetes (dropper), dan buang terpisah dari tutupnya.',
      langkah: [
        'Segera hentikan penggunaan pada mata atau telinga untuk mencegah infeksi atau iritasi berat.',
        'Kosongkan cairan sisa (serap dengan tisu/kapas ke plastik tertutup untuk obat keras/antibiotik, atau buang sesuai petunjuk apoteker).',
        'Rusak bagian penetes (dropper) dan lepas label botol, lalu buang terpisah antara botol dan tutupnya.',
      ],
    },
    'Inhaler / Semprot': {
      ringkasanSingkat:
        'Jangan melubangi atau membakar tabung bertekanan; kembalikan ke apotek atau puskesmas terdekat.',
      langkah: [
        'Hentikan penggunaan segera karena efektivitas dosis semprotan tidak lagi terjamin.',
        'JANGAN melubangi, menekan paksa, atau membakar tabung aerosol/inhaler karena berisiko meledak.',
        'Simpan di wadah terpisah dan serahkan kepada apotek atau fasilitas kesehatan yang menerima pengembalian limbah farmasi.',
      ],
    },
    Lainnya: {
      ringkasanSingkat:
        'Pisahkan dari obat aktif, rusak identitas kemasan, dan konsultasikan cara pemusnahan ke apoteker.',
      langkah: [
        'Keluarkan obat dari tempat penyimpanan harian dan beri tanda agar tidak digunakan anggota keluarga.',
        'Pertahankan dalam wadah tertutup sementara hingga siap dimusnahkan atau diserahkan ke apotek terdekat.',
        'Lepas atau coret label informasi pada kemasan sekunder sebelum membuang wadah kosong.',
      ],
    },
  };

  const base = sediaanMap[medicine.sediaan] || sediaanMap.Lainnya;

  return {
    ...base,
    peringatanKhusus: isAntibiotic
      ? 'Terdeteksi obat golongan antibiotik: hindari membuang ke saluran air/kloset atau membuang utuh ke tempat sampah terbuka.'
      : undefined,
  };
}

export const SmartExpiryNotification: React.FC<SmartExpiryNotificationProps> = ({
  expiredMedicines,
  currentFilter,
  onFilterExpired,
  onOpenDisposalGuide,
  onRequestDelete,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const expiredSignature = useMemo(
    () =>
      expiredMedicines
        .map((m) => m.id)
        .sort()
        .join('|'),
    [expiredMedicines]
  );

  // Munculkan kembali otomatis jika daftar obat kedaluwarsa bertambah/berubah
  useEffect(() => {
    if (expiredMedicines.length > 0) {
      setIsDismissed(false);
      setSelectedId((prev) =>
        expiredMedicines.some((m) => m.id === prev) ? prev : expiredMedicines[0].id
      );
    }
  }, [expiredSignature, expiredMedicines]);

  if (expiredMedicines.length === 0 || isDismissed) {
    return null;
  }

  const activeMedicine =
    expiredMedicines.find((m) => m.id === selectedId) || expiredMedicines[0];
  const advice = getSmartDisposalAdvice(activeMedicine);
  const daysOverdue = Math.abs(calculateDaysRemaining(activeMedicine.expiryDate));

  return (
    <section
      aria-label="Notifikasi Cerdas Obat Kedaluwarsa"
      className="ro-fade-in rounded-2xl bg-surface border border-status-kedaluwarsa-text/30 shadow-xs overflow-hidden"
    >
      {/* Header Strip */}
      <div className="px-4 sm:px-6 py-4 bg-status-kedaluwarsa-bg/65 border-b border-status-kedaluwarsa-text/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-status-kedaluwarsa-text text-white flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-status-kedaluwarsa-text">
                Saran Pemusnahan Obat
              </span>
              <span className="text-status-kedaluwarsa-text/50" aria-hidden="true">
                ·
              </span>
              <span className="font-mono font-semibold tabular-nums text-ink">
                {expiredMedicines.length} Obat Kedaluwarsa
              </span>
            </div>
            <h2 className="font-display text-base sm:text-lg font-semibold text-forest leading-snug">
              Langkah Aman Selanjutnya Sesuai Regulasi DAGUSIBU
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="min-h-[44px] px-3 py-1.5 rounded-xl bg-surface/90 hover:bg-surface border border-status-kedaluwarsa-text/20 text-forest text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Ringkas' : 'Lihat Langkah'}</span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="min-h-[44px] min-w-[44px] rounded-xl text-ink-muted hover:text-forest hover:bg-surface/80 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Sembunyikan notifikasi untuk sesi ini"
            title="Sembunyikan sementara"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Smart Advice Body */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-4">
          {/* Selector Obat Kedaluwarsa (jika lebih dari 1 atau tampilkan konteks obat) */}
          {expiredMedicines.length > 1 ? (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-ink-muted block">
                Pilih obat kedaluwarsa untuk melihat panduan pembuangan spesifik sediaannya:
              </span>
              <div className="flex flex-wrap gap-2">
                {expiredMedicines.map((med) => {
                  const active = med.id === activeMedicine.id;
                  return (
                    <button
                      key={med.id}
                      type="button"
                      onClick={() => setSelectedId(med.id)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer text-left ${
                        active
                          ? 'bg-forest text-on-brand border-forest'
                          : 'bg-surface-warm border-line text-ink hover:border-line-strong'
                      }`}
                    >
                      <span>{med.name}</span>
                      <span
                        className={`ml-1.5 font-normal ${
                          active ? 'text-[#D2E4DC]/90' : 'text-ink-muted'
                        }`}
                      >
                        · {med.sediaan}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted pb-3 border-b border-line">
              <span>
                Obat terdeteksi:{' '}
                <strong className="text-forest font-semibold">{activeMedicine.name}</strong>{' '}
                · {activeMedicine.sediaan}
              </span>
              <span className="font-mono tabular-nums text-status-kedaluwarsa-text font-semibold">
                Kedaluwarsa {daysOverdue} hari lalu ({formatIndonesianDate(activeMedicine.expiryDate)})
              </span>
            </div>
          )}

          {/* Special Antibiotic / Hazard Alert */}
          {advice.peringatanKhusus && (
            <div className="p-3.5 rounded-xl bg-status-segera-bg/75 border border-status-segera-text/25 flex items-start gap-2.5 text-xs text-status-segera-text">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="font-semibold leading-relaxed">
                {advice.peringatanKhusus}
              </span>
            </div>
          )}

          {/* 3-Step Tailored Disposal Plan */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-forest uppercase tracking-wider">
                Rekomendasi Langkah untuk Sediaan {activeMedicine.sediaan}
              </span>
              {expiredMedicines.length > 1 && (
                <span className="font-mono tabular-nums text-status-kedaluwarsa-text font-semibold">
                  Lewat {daysOverdue} hari
                </span>
              )}
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {advice.langkah.map((stepText, idx) => (
                <li
                  key={idx}
                  className="p-3.5 rounded-xl bg-surface-warm border border-line flex items-start gap-3 text-xs sm:text-sm text-ink"
                >
                  <span className="w-6 h-6 rounded-full bg-status-kedaluwarsa-bg text-status-kedaluwarsa-text font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed text-ink-muted">
                    {stepText}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Action Bar */}
          <div className="pt-3 border-t border-line flex flex-wrap items-center justify-between gap-2.5">
            <p className="text-xs text-ink-muted flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
              <span>Rujukan prinsip pemusnahan obat rumah tangga Kemenkes RI &amp; BPOM.</span>
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {currentFilter !== 'kedaluwarsa' && (
                <button
                  type="button"
                  onClick={onFilterExpired}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-surface border border-line hover:border-line-strong text-forest text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5 text-brand" />
                  <span>Saring Kedaluwarsa</span>
                </button>
              )}

              <button
                type="button"
                onClick={onOpenDisposalGuide}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-secondary/75 hover:bg-secondary text-forest text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-brand" />
                <span>Panduan Dagusibu</span>
              </button>

              <button
                type="button"
                onClick={() => onRequestDelete(activeMedicine)}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-status-kedaluwarsa-text hover:bg-forest text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Sudah Dibuang · Hapus</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
