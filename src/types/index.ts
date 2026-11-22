export type TabType = 'beranda' | 'cek-label' | 'lemari' | 'latihan' | 'pustaka';

export type PackagingType = 'tablet' | 'sirup' | 'salep';

export interface LabelHotspot {
  id: number;
  number: number;
  title: string;
  shortDescription: string;
  xPercent: number; // for SVG pin positioning
  yPercent: number;
  content: {
    meaning: string;
    tips: string;
    warning: string;
  };
}

export interface PackagingData {
  type: PackagingType;
  title: string;
  subtitle: string;
  hotspots: LabelHotspot[];
}

export type MedicineStatus = 'aman' | 'segera' | 'kedaluwarsa';

export type SediaanType = 
  | 'Tablet' 
  | 'Kapsul' 
  | 'Sirup / Cair' 
  | 'Salep / Krim / Gel' 
  | 'Tetes Mata / Telinga'
  | 'Inhaler / Semprot'
  | 'Lainnya';

export interface MedicineItem {
  id: string;
  name: string;
  sediaan: SediaanType;
  expiryDate: string; // YYYY-MM-DD
  openedDate?: string; // YYYY-MM-DD (optional)
  notes?: string;
  createdAt: number;
}

export interface KamusItem {
  id: string;
  term: string;
  category: string;
  definition: string;
  referenceSource: string;
}

export interface StorageGuideItem {
  sediaan: SediaanType;
  title: string;
  simpanRules: string[];
  buangRules: string[];
  catatanPenting: string;
}
