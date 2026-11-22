import React, { useState } from 'react';
import { PUSTAKA_ITEMS } from '../data/pustakaData';
import { RujukanText } from '../components/ui';
import { Search, BookmarkCheck, ExternalLink, BookOpen, X } from 'lucide-react';

export const PustakaView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReferences = PUSTAKA_ITEMS.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.penulis.toLowerCase().includes(q) ||
      item.judul.toLowerCase().includes(q) ||
      item.penerbit.toLowerCase().includes(q) ||
      item.kategori.toLowerCase().includes(q) ||
      item.catatan.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12 ro-fade-in">
      {/* Editorial Page Header */}
      <div className="space-y-1.5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          Sumber Ilmiah &amp; Regulasi Resmi
        </p>
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-forest tracking-tight">
          Pustaka Rujukan Farmasi
        </h1>
        <p className="text-ink-muted text-sm sm:text-base max-w-2xl leading-relaxed">
          Daftar buku ajar farmakologi (HKI 2022 &amp; Farmakologi dan Terapi Ed. 4 FKUI) serta pedoman resmi Kemenkes RI, BPOM RI, dan Farmakope Indonesia yang menjadi landasan seluruh materi.
        </p>
      </div>

      {/* Info Banner: 35 Bab Terindeks di Asisten AI */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sand-soft/70 border border-sand flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-forest text-sand flex items-center justify-center shrink-0 mt-0.5">
          <BookOpen className="w-4 h-4" />
        </div>
        <div className="space-y-1 text-xs sm:text-sm">
          <div className="font-bold text-forest">
            35 Berkas Bab Buku Terintegrasi ke Asisten Ruang Obat
          </div>
          <p className="text-ink-muted leading-relaxed">
            Seluruh uraian materi pada aplikasi ini bersumber langsung dari <strong className="text-forest">11 Bab Buku Ajar Farmakologi (HKI, 2022)</strong> dan <strong className="text-forest">24 Berkas Seksi/Bab Farmakologi dan Terapi Edisi 4 (FKUI)</strong>, yang juga dikunci sebagai rujukan utama jawaban chatbot beserta kutipan nama dan bab bukunya.
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-2xl">
        <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari penulis, HKI 2022, FKUI, BPOM, Kemenkes, Dagusibu..."
          aria-label="Cari dokumen pustaka farmasi"
          className="w-full min-h-[46px] pl-10 pr-12 py-2.5 text-sm bg-surface border border-line rounded-xl text-ink placeholder:text-ink-muted/70 focus:outline-none focus:ring-2 focus:ring-focus focus:border-transparent"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            aria-label="Hapus pencarian pustaka"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] rounded-lg text-ink-muted hover:text-ink hover:bg-surface-muted flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Rujukan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReferences.map((ref) => {
          const isUrl = ref.tautanPlaceholder.startsWith('http');
          return (
            <article
              key={ref.id}
              className="p-5 sm:p-6 bg-surface rounded-2xl border border-line hover:border-line-strong transition-colors flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-semibold uppercase tracking-wider text-brand">
                    {ref.kategori}
                  </span>
                  <span className="text-ink-muted font-mono tabular-nums">
                    Tahun {ref.tahun}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h2 className="font-display text-base sm:text-lg font-semibold text-forest leading-snug">
                    <RujukanText
                      text={ref.judul}
                      className="font-semibold text-forest text-base sm:text-lg"
                    />
                  </h2>
                  <div className="text-xs text-ink-muted">
                    <strong className="text-ink">Penulis:</strong> {ref.penulis}
                  </div>
                  <div className="text-xs text-ink-muted">
                    <strong className="text-ink">Penerbit:</strong> {ref.penerbit}
                  </div>
                </div>

                <p className="text-xs text-ink-muted italic bg-surface-warm p-3 rounded-xl border border-line/80 leading-relaxed">
                  {ref.catatan}
                </p>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between gap-2 text-xs text-brand">
                <div className="min-w-0 flex-1 truncate">
                  {isUrl ? (
                    <a
                      href={ref.tautanPlaceholder}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-forest underline underline-offset-2"
                    >
                      <span>{ref.tautanPlaceholder}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    <RujukanText
                      text={ref.tautanPlaceholder}
                      className="text-xs font-medium text-brand"
                    />
                  )}
                </div>
                <BookmarkCheck className="w-4 h-4 shrink-0" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
