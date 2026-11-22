import React from 'react';
import { PackagingType, LabelHotspot } from '../types';

interface PackagingSvgProps {
  type: PackagingType;
  hotspots: LabelHotspot[];
  activeHotspotId: number | null;
  onSelectHotspot: (id: number) => void;
}

export const PackagingSvg: React.FC<PackagingSvgProps> = ({
  type,
  hotspots,
  activeHotspotId,
  onSelectHotspot,
}) => {
  return (
    <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-surface-warm to-surface-muted rounded-3xl p-4 sm:p-6 flex items-center justify-center border border-line shadow-xs overflow-hidden select-none">
      {/* Subtle warm editorial grid texture */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#5E7E74 0.75px, transparent 0.75px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Packaging Illustrations */}
      {type === 'tablet' && (
        <svg
          viewBox="0 0 380 270"
          className="w-full h-full max-h-[320px] drop-shadow-sm relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Blister Foil */}
          <rect
            x="25"
            y="20"
            width="330"
            height="230"
            rx="16"
            fill="#EBE9E1"
            stroke="#8B9A93"
            strokeWidth="2.2"
          />
          <rect
            x="31"
            y="26"
            width="318"
            height="218"
            rx="12"
            fill="#FBF9F5"
            stroke="#D5D8CE"
            strokeWidth="1"
          />

          {/* Grid of blister cavities */}
          <g opacity="0.85">
            {[0, 1, 2, 3].map((col) =>
              [0, 1].map((row) => (
                <g
                  key={`blister-${col}-${row}`}
                  transform={`translate(${55 + col * 75}, ${42 + row * 80})`}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="23"
                    fill="#E5E4DC"
                    stroke="#A6B1AB"
                    strokeWidth="1.4"
                  />
                  <circle cx="24" cy="24" r="19" fill="#FFFFFF" />
                  <line
                    x1="24"
                    y1="9"
                    x2="24"
                    y2="39"
                    stroke="#E5E4DC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <ellipse cx="20" cy="19" rx="8" ry="4" fill="#FFFFFF" fillOpacity="0.85" />
                </g>
              ))
            )}
          </g>

          {/* Warm Paper/Foil Label Overlay */}
          <rect
            x="36"
            y="31"
            width="308"
            height="208"
            rx="10"
            fill="#FFFFFF"
            fillOpacity="0.84"
          />

          {/* Hotspot 1: Logo Golongan Obat */}
          <circle cx="70" cy="54" r="15" fill="#275E45" stroke="#1A4230" strokeWidth="2" />
          <text x="70" y="57" fontSize="8" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
            BEBAS
          </text>

          {/* Hotspot 2: Nama Obat */}
          <text
            x="190"
            y="68"
            fontSize="15.5"
            fontWeight="800"
            fill="#243C36"
            textAnchor="middle"
            letterSpacing="0.4"
          >
            PARASETAMOL 500 mg
          </text>
          <text x="190" y="84" fontSize="10" fontWeight="600" fill="#53645E" textAnchor="middle">
            Kaplet / Tablet Analgesik-Antipiretik
          </text>

          {/* Divider */}
          <line
            x1="60"
            y1="96"
            x2="320"
            y2="96"
            stroke="#DCEAE5"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />

          {/* Hotspot 3: Indikasi */}
          <text x="190" y="118" fontSize="9.5" fontWeight="600" fill="#22312C" textAnchor="middle">
            Indikasi: Meringankan sakit kepala, sakit gigi &amp; demam
          </text>

          {/* Hotspot 4: Aturan Pakai */}
          <text x="190" y="152" fontSize="9" fontWeight="600" fill="#3B4D47" textAnchor="middle">
            Dewasa: 1 kaplet 3-4 kali sehari setelah makan
          </text>
          <text x="190" y="167" fontSize="8" fill="#53645E" textAnchor="middle">
            Bila gejala berlanjut segera hubungi dokter
          </text>

          {/* Hotspot 6: NIE BPOM */}
          <rect
            x="48"
            y="200"
            width="135"
            height="24"
            rx="5"
            fill="#EFEEE8"
            stroke="#C9CEC5"
            strokeWidth="1"
          />
          <text x="115" y="215" fontSize="8.5" fontWeight="700" fill="#243C36" textAnchor="middle">
            No. Reg: DBL 2112345604 A1
          </text>

          {/* Hotspot 5: Exp Date & No. Bets */}
          <rect
            x="195"
            y="200"
            width="145"
            height="24"
            rx="5"
            fill="#F6E0DD"
            stroke="#DFABA5"
            strokeWidth="1"
          />
          <text x="267" y="211" fontSize="8" fontWeight="700" fill="#8C2D2D" textAnchor="middle">
            EXP: 10/2028 · BETS: B84092
          </text>
          <text x="267" y="220" fontSize="7" fill="#8C2D2D" textAnchor="middle">
            Jangan digunakan bila segel rusak
          </text>
        </svg>
      )}

      {type === 'sirup' && (
        <svg
          viewBox="0 0 380 270"
          className="w-full h-full max-h-[320px] drop-shadow-sm relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cap */}
          <rect
            x="160"
            y="12"
            width="60"
            height="26"
            rx="5"
            fill="#FBF9F5"
            stroke="#53645E"
            strokeWidth="2"
          />
          <line x1="168" y1="18" x2="168" y2="32" stroke="#C9CEC5" strokeWidth="1.5" />
          <line x1="178" y1="18" x2="178" y2="32" stroke="#C9CEC5" strokeWidth="1.5" />
          <line x1="190" y1="18" x2="190" y2="32" stroke="#C9CEC5" strokeWidth="1.5" />
          <line x1="202" y1="18" x2="202" y2="32" stroke="#C9CEC5" strokeWidth="1.5" />
          <line x1="212" y1="18" x2="212" y2="32" stroke="#C9CEC5" strokeWidth="1.5" />

          {/* Neck */}
          <rect
            x="168"
            y="38"
            width="44"
            height="18"
            fill="#D8B99A"
            fillOpacity="0.65"
            stroke="#53645E"
            strokeWidth="1.5"
          />

          {/* Amber Glass Bottle Body */}
          <rect
            x="110"
            y="56"
            width="160"
            height="195"
            rx="18"
            fill="#A66D38"
            fillOpacity="0.22"
            stroke="#53645E"
            strokeWidth="2.2"
          />
          <rect
            x="115"
            y="60"
            width="150"
            height="187"
            rx="14"
            fill="#D8B99A"
            fillOpacity="0.35"
            stroke="#B86E18"
            strokeWidth="0.6"
          />

          {/* Label Container */}
          <rect
            x="122"
            y="68"
            width="136"
            height="170"
            rx="9"
            fill="#FBF9F5"
            stroke="#D5D8CE"
            strokeWidth="1"
          />

          {/* Hotspot 1: Logo Golongan Obat (Bebas Terbatas Biru) */}
          <circle cx="145" cy="88" r="11" fill="#2563EB" stroke="#1E40AF" strokeWidth="1.5" />
          <circle cx="145" cy="88" r="9" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1" />

          {/* Hotspot 2: Nama & Komposisi per 5 mL */}
          <text x="194" y="90" fontSize="10.5" fontWeight="800" fill="#243C36" textAnchor="middle">
            SIRUP BATUK &amp; FLU
          </text>
          <text x="190" y="103" fontSize="8" fontWeight="600" fill="#53645E" textAnchor="middle">
            Tiap 5 mL mengandung 120 mg
          </text>

          {/* Hotspot 3: Indikasi & Usia */}
          <rect
            x="130"
            y="118"
            width="120"
            height="22"
            rx="4"
            fill="#DCEAE5"
            stroke="#9BB8AE"
            strokeWidth="0.75"
          />
          <text x="190" y="128" fontSize="8" fontWeight="700" fill="#243C36" textAnchor="middle">
            Meringankan batuk &amp; pilek
          </text>
          <text x="190" y="137" fontSize="7" fill="#44665B" textAnchor="middle">
            Gunakan sendok takar obat
          </text>

          {/* Hotspot 4: Kocok Dahulu */}
          <rect
            x="130"
            y="148"
            width="120"
            height="20"
            rx="4"
            fill="#F7EAD2"
            stroke="#DFBF88"
            strokeWidth="0.75"
          />
          <text x="190" y="161" fontSize="8.5" fontWeight="800" fill="#7C4B0C" textAnchor="middle">
            ! KOCOK DAHULU !
          </text>

          {/* Hotspot 5: BUD & Expiry */}
          <rect
            x="130"
            y="174"
            width="120"
            height="30"
            rx="4"
            fill="#F6E0DD"
            stroke="#DFABA5"
            strokeWidth="0.75"
          />
          <text x="190" y="185" fontSize="7.5" fontWeight="700" fill="#8C2D2D" textAnchor="middle">
            EXP: 07/2027 · BUD: 14-28 hari
          </text>
          <text x="190" y="196" fontSize="7" fill="#8C2D2D" textAnchor="middle">
            Tulis tanggal saat pertama dibuka
          </text>

          {/* Hotspot 6: NIE BPOM */}
          <text x="190" y="222" fontSize="7" fontWeight="600" fill="#53645E" textAnchor="middle">
            No. Reg: DTL 1912345637 A1
          </text>

          {/* Measuring cup accessory beside bottle */}
          <path
            d="M 290 160 L 330 160 L 325 240 L 295 240 Z"
            fill="#FFFFFF"
            fillOpacity="0.85"
            stroke="#8B9A93"
            strokeWidth="1.5"
          />
          <line x1="298" y1="180" x2="315" y2="180" stroke="#44665B" strokeWidth="1.5" />
          <text x="325" y="183" fontSize="8" fill="#243C36" fontWeight="bold">
            5 mL
          </text>
          <line x1="297" y1="205" x2="312" y2="205" stroke="#53645E" strokeWidth="1" />
          <text x="323" y="208" fontSize="7" fill="#53645E">
            2.5 mL
          </text>
        </svg>
      )}

      {type === 'salep' && (
        <svg
          viewBox="0 0 380 270"
          className="w-full h-full max-h-[320px] drop-shadow-sm relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cap on left */}
          <path
            d="M 50 100 L 70 100 L 70 150 L 50 150 Z"
            fill="#FBF9F5"
            stroke="#53645E"
            strokeWidth="2"
          />
          <line x1="56" y1="105" x2="56" y2="145" stroke="#C9CEC5" strokeWidth="1.5" />
          <line x1="64" y1="105" x2="64" y2="145" stroke="#C9CEC5" strokeWidth="1.5" />

          {/* Neck nozzle */}
          <rect
            x="70"
            y="112"
            width="16"
            height="26"
            fill="#D8B99A"
            fillOpacity="0.7"
            stroke="#53645E"
            strokeWidth="1.5"
          />

          {/* Tube Aluminum Body */}
          <path
            d="M 86 100 L 310 88 L 340 86 L 340 164 L 310 162 L 86 150 Z"
            fill="#FBF9F5"
            stroke="#53645E"
            strokeWidth="2.2"
          />

          {/* Shading/Sheen */}
          <path
            d="M 86 102 L 310 92 L 340 90 L 340 105 L 310 107 L 86 112 Z"
            fill="#FFFFFF"
            fillOpacity="0.9"
          />

          {/* Crimped Edge on Right */}
          <rect
            x="325"
            y="84"
            width="22"
            height="82"
            rx="3"
            fill="#EFEEE8"
            stroke="#53645E"
            strokeWidth="1.5"
          />
          <line
            x1="332"
            y1="88"
            x2="332"
            y2="162"
            stroke="#8B9A93"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <text
            x="336"
            y="128"
            fontSize="7"
            fontWeight="bold"
            fill="#8C2D2D"
            transform="rotate(90 336 128)"
            textAnchor="middle"
          >
            EXP 09/27 B89
          </text>

          {/* Hotspot 1: Obat Luar Peringatan */}
          <rect x="94" y="116" width="68" height="18" rx="3" fill="#1E40AF" />
          <text x="128" y="128" fontSize="6.5" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
            OBAT LUAR
          </text>

          {/* Hotspot 2: Nama & Persentase */}
          <text x="210" y="116" fontSize="13" fontWeight="800" fill="#243C36" textAnchor="middle">
            HIDROKORTISON 1%
          </text>
          <text x="210" y="127" fontSize="7.5" fontWeight="600" fill="#53645E" textAnchor="middle">
            Krim Kulit Anti-inflamasi 5 gram
          </text>

          {/* Hotspot 3: Indikasi */}
          <text x="210" y="139" fontSize="7" fontWeight="600" fill="#22312C" textAnchor="middle">
            Indikasi: Meredakan kemerahan &amp; gatal alergi kulit
          </text>

          {/* Hotspot 4: Cara Pengolesan */}
          <text x="210" y="149" fontSize="6.5" fill="#53645E" textAnchor="middle">
            Oleskan tipis 2-3 kali sehari pada area yang bersih
          </text>

          {/* Hotspot 6: Logo & NIE */}
          <circle cx="106" cy="178" r="10" fill="#A33838" stroke="#7A2222" strokeWidth="1.5" />
          <text x="106" y="182" fontSize="9" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
            K
          </text>
          <text x="180" y="181" fontSize="8" fontWeight="600" fill="#243C36">
            No. Reg: DKL 1812345629 A1
          </text>
        </svg>
      )}

      {/* Interactive Hotspot Tap Pins (clean ring focus, no animate-ping) */}
      {hotspots.map((hs) => {
        const isActive = activeHotspotId === hs.id;
        return (
          <button
            key={hs.id}
            type="button"
            onClick={() => onSelectHotspot(hs.id)}
            aria-label={`Titik ${hs.number}: ${hs.title}`}
            aria-pressed={isActive}
            style={{
              left: `${hs.xPercent}%`,
              top: `${hs.yPercent}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute z-20 group min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 rounded-full cursor-pointer transition-transform duration-150 active:scale-95"
          >
            <span
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold shadow-sm transition-all duration-150 ${
                isActive
                  ? 'bg-forest text-sand ring-4 ring-sand/75 scale-110'
                  : 'bg-surface text-forest border-2 border-forest hover:bg-secondary hover:scale-105'
              }`}
            >
              {hs.number}
            </span>
          </button>
        );
      })}
    </div>
  );
};
