import React, { useState } from 'react';
import { MedicineItem } from '../types';
import { getMedicineStatus } from '../utils/medicineUtils';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  BarChart3,
  PieChart as PieIcon,
  ChevronRight,
  PlusCircle,
  Archive,
} from 'lucide-react';

interface RingkasanStokObatChartProps {
  medicines: MedicineItem[];
  onNavigateLemariWithFilter?: (filter: 'segera' | 'kedaluwarsa' | 'semua') => void;
  onNavigateToLemari: () => void;
}

export const RingkasanStokObatChart: React.FC<RingkasanStokObatChartProps> = ({
  medicines,
  onNavigateLemariWithFilter,
  onNavigateToLemari,
}) => {
  const [chartType, setChartType] = useState<'donut' | 'bar'>('donut');

  let amanCount = 0;
  let segeraCount = 0;
  let kedaluwarsaCount = 0;

  medicines.forEach((med) => {
    const status = getMedicineStatus(med.expiryDate);
    if (status === 'kedaluwarsa') kedaluwarsaCount++;
    else if (status === 'segera') segeraCount++;
    else amanCount++;
  });

  const totalCount = medicines.length;

  const data = [
    {
      name: 'Aman',
      key: 'aman' as const,
      value: amanCount,
      color: '#275E45',
      lightBg: 'bg-status-aman-bg/65 hover:bg-status-aman-bg',
      border: 'border-status-aman-text/20',
      text: 'text-status-aman-text',
      icon: CheckCircle2,
      desc: 'Masa simpan > 30 hari',
    },
    {
      name: 'Segera Kedaluwarsa',
      key: 'segera' as const,
      value: segeraCount,
      color: '#B86E18',
      lightBg: 'bg-status-segera-bg/65 hover:bg-status-segera-bg',
      border: 'border-status-segera-text/20',
      text: 'text-status-segera-text',
      icon: AlertTriangle,
      desc: 'Kritis (<= 30 hari)',
    },
    {
      name: 'Kedaluwarsa',
      key: 'kedaluwarsa' as const,
      value: kedaluwarsaCount,
      color: '#A33838',
      lightBg: 'bg-status-kedaluwarsa-bg/65 hover:bg-status-kedaluwarsa-bg',
      border: 'border-status-kedaluwarsa-text/20',
      text: 'text-status-kedaluwarsa-text',
      icon: AlertOctagon,
      desc: 'Lewat batas aman',
    },
  ];

  const handleCategoryClick = (categoryKey?: string) => {
    if (!categoryKey) return;
    if (onNavigateLemariWithFilter) {
      if (categoryKey === 'segera' || categoryKey === 'kedaluwarsa') {
        onNavigateLemariWithFilter(categoryKey);
      } else {
        onNavigateLemariWithFilter('semua');
      }
    } else {
      onNavigateToLemari();
    }
  };

  if (totalCount === 0) {
    return (
      <div className="h-full p-6 sm:p-7 rounded-2xl bg-surface border border-line flex flex-col items-center justify-center space-y-3.5 text-center">
        <div className="w-12 h-12 rounded-xl bg-surface-muted text-brand flex items-center justify-center">
          <Archive className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-forest">
            Lemari Obat Masih Kosong
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-sm">
            Tambahkan persediaan obat rumah tangga Anda untuk memantau status kedaluwarsa secara visual.
          </p>
        </div>
        <button
          type="button"
          onClick={onNavigateToLemari}
          className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand hover:bg-forest text-on-brand text-xs sm:text-sm font-semibold cursor-pointer transition-colors"
        >
          <PlusCircle className="w-4 h-4 text-sand" />
          <span>Kelola Lemari Obat</span>
        </button>
      </div>
    );
  }

  return (
    <div className="h-full p-6 sm:p-7 rounded-2xl bg-surface border border-line flex flex-col justify-between space-y-5">
      {/* Header & Chart Type Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold uppercase tracking-[0.1em] text-brand">
              Visualisasi Stok
            </span>
            <span className="text-line-strong/60" aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-ink-muted font-medium">
              Total {totalCount} Obat
            </span>
          </div>
          <h2 className="font-display text-lg sm:text-xl font-semibold text-forest">
            Ringkasan Status Masa Simpan
          </h2>
        </div>

        {/* Interactive Chart Type Toggle */}
        <div className="flex items-center gap-1 p-1 bg-surface-muted rounded-xl border border-line self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setChartType('donut')}
            className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              chartType === 'donut'
                ? 'bg-surface text-forest shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
            title="Tampilkan Diagram Lingkaran"
          >
            <PieIcon className="w-3.5 h-3.5" />
            <span>Lingkaran</span>
          </button>
          <button
            type="button"
            onClick={() => setChartType('bar')}
            className={`min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              chartType === 'bar'
                ? 'bg-surface text-forest shadow-xs'
                : 'text-ink-muted hover:text-ink'
            }`}
            title="Tampilkan Diagram Batang"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Batang</span>
          </button>
        </div>
      </div>

      {/* Main Content: Chart + Interactive Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
        {/* Chart Canvas Area */}
        <div className="sm:col-span-5 h-[200px] w-full flex items-center justify-center relative">
          {chartType === 'donut' ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        const pct = Math.round((item.value / totalCount) * 100);
                        return (
                          <div className="p-3 bg-forest text-white text-xs rounded-xl shadow-lg border border-white/10 space-y-1">
                            <div className="font-bold flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              <span>{item.name}</span>
                            </div>
                            <div className="text-[#D2E4DC] tabular-nums">
                              Jumlah: <strong>{item.value} obat</strong> ({pct}%)
                            </div>
                            <div className="text-[11px] text-sand">
                              Ketuk untuk buka lemari
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    onClick={(_, index: number) => handleCategoryClick(data[index]?.key)}
                    cursor="pointer"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#FFFFFF"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="font-display text-2xl font-bold text-forest tabular-nums leading-none">
                  {totalCount}
                </span>
                <span className="text-[11px] uppercase font-semibold text-ink-muted tracking-wider mt-1">
                  Obat
                </span>
              </div>
            </>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={data}
                margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E4DC" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: '#53645E' }}
                  interval={0}
                  tickLine={false}
                  axisLine={{ stroke: '#D4D8CE' }}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: '#53645E' }}
                  tickLine={false}
                  axisLine={{ stroke: '#D4D8CE' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      const pct = Math.round((item.value / totalCount) * 100);
                      return (
                        <div className="p-3 bg-forest text-white text-xs rounded-xl shadow-lg border border-white/10 space-y-1">
                          <div className="font-bold flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span>{item.name}</span>
                          </div>
                          <div className="text-[#D2E4DC] tabular-nums">
                            Jumlah: <strong>{item.value} obat</strong> ({pct}%)
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="value"
                  radius={[8, 8, 0, 0]}
                  onClick={(_, index: number) => handleCategoryClick(data[index]?.key)}
                  cursor="pointer"
                >
                  {data.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* 3 Clickable Metric Rows with Pipeline Proportion Bar */}
        <div className="sm:col-span-7 space-y-2.5">
          {data.map((item) => {
            const Icon = item.icon;
            const pct = Math.round((item.value / totalCount) * 100) || 0;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleCategoryClick(item.key)}
                className={`w-full min-h-[44px] p-3.5 rounded-xl border transition-all text-left space-y-2 group cursor-pointer ${item.lightBg} ${item.border}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-ink text-xs sm:text-sm truncate">
                          {item.name}
                        </span>
                        <span className="text-[11px] font-mono tabular-nums text-ink-muted">
                          · {pct}%
                        </span>
                      </div>
                      <p className="text-[11px] text-ink-muted truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`font-mono text-base sm:text-lg font-bold tabular-nums ${item.text}`}>
                      {item.value}
                    </span>
                    <ChevronRight className="w-4 h-4 text-ink-muted group-hover:translate-x-0.5 group-hover:text-forest transition-all" />
                  </div>
                </div>

                {/* Subtle Proportion Track */}
                <div className="h-1.5 w-full rounded-full bg-surface/80 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${pct}%`, backgroundColor: item.color }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Footer Callout */}
      <div className="pt-3 border-t border-line flex flex-col xs:flex-row xs:items-center justify-between gap-2 text-xs">
        <span className="text-ink-muted">
          {kedaluwarsaCount > 0 ? (
            <span className="text-status-kedaluwarsa-text font-semibold flex items-center gap-1.5">
              <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
              Segera pisahkan {kedaluwarsaCount} obat yang telah kedaluwarsa.
            </span>
          ) : segeraCount > 0 ? (
            <span className="text-status-segera-text font-semibold flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              {segeraCount} obat mendekati kedaluwarsa dalam 30 hari.
            </span>
          ) : (
            <span className="text-status-aman-text font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              Semua persediaan obat saat ini dalam status aman.
            </span>
          )}
        </span>

        <button
          type="button"
          onClick={onNavigateToLemari}
          className="min-h-[44px] px-2 text-brand hover:text-forest font-semibold inline-flex items-center gap-1 cursor-pointer self-end xs:self-auto"
        >
          <span>Buka Semua di Lemari</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
