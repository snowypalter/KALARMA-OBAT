import { useState, useEffect } from 'react';
import { TabType, MedicineItem } from './types';
import { SHOW_REVIEWER_TOOLS } from './config/appConfig';
import { getInitialMedicines } from './data/initialMedicines';
import { calculateDaysRemaining } from './utils/medicineUtils';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FooterDisclaimer } from './components/FooterDisclaimer';
import { TentangModal } from './components/TentangModal';
import { PemberitahuanEdukasiModal } from './components/PemberitahuanEdukasiModal';
import { KamusModal } from './components/KamusModal';
import { PanduanSimpanBuangModal } from './components/PanduanSimpanBuangModal';
import { TinjauDosenModal } from './components/TinjauDosenModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { BerandaView } from './views/BerandaView';
import { CekLabelView } from './views/CekLabelView';
import { LemariView } from './views/LemariView';
import { LatihanView } from './views/LatihanView';
import { PustakaView } from './views/PustakaView';
import { LatihanSubTab } from './types/latihan';

const STORAGE_KEY = 'ruang_obat_medicines_v1';
const THEME_STORAGE_KEY = 'ruang_obat_theme_v1';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('beranda');
  const [latihanSubTab, setLatihanSubTab] = useState<LatihanSubTab>('skenario');
  const [lemariFilter, setLemariFilter] = useState<'semua' | 'aman' | 'segera' | 'kedaluwarsa'>('semua');
  const [lemariSearchQuery, setLemariSearchQuery] = useState('');

  // Modals state
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isKamusOpen, setIsKamusOpen] = useState(false);
  const [kamusQuery, setKamusQuery] = useState('');
  const [isTinjauOpen, setIsTinjauOpen] = useState(false);
  const [walkthroughTrigger, setWalkthroughTrigger] = useState(0);
  const [panduanState, setPanduanState] = useState<{ isOpen: boolean; mode: 'simpan' | 'buang' }>({
    isOpen: false,
    mode: 'simpan',
  });

  // Theme state: light | dark | system
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    } catch {
      // ignore
    }
    return 'system';
  });

  // Sync theme with DOM and localStorage
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }
    };

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mediaQuery.matches);

      const listener = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    } else {
      applyTheme(theme === 'dark');
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  // LocalStorage state for medicines
  const [medicines, setMedicines] = useState<MedicineItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // ignore
    }
    return getInitialMedicines();
  });

  // Save to localStorage whenever medicines change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(medicines));
    } catch {
      // storage unavailable or full
    }
  }, [medicines]);

  // Handle adding new medicine
  const handleAddMedicine = (newItem: Omit<MedicineItem, 'id' | 'createdAt'>) => {
    const item: MedicineItem = {
      ...newItem,
      id: `med-${Date.now()}`,
      createdAt: Date.now(),
    };
    setMedicines((prev) => [item, ...prev]);
  };

  // Handle editing existing medicine
  const handleEditMedicine = (id: string, updated: Omit<MedicineItem, 'id' | 'createdAt'>) => {
    setMedicines((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  // Handle deleting medicine
  const handleDeleteMedicine = (id: string) => {
    setMedicines((prev) => prev.filter((item) => item.id !== id));
  };

  // Quick navigation to Lemari with warning filter
  const handleNavigateLemariWithFilter = (filter: 'segera' | 'kedaluwarsa' | 'semua') => {
    setLemariFilter(filter);
    setCurrentTab('lemari');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Quick navigation to Latihan with specific sub-module
  const handleNavigateLatihan = (subTab: LatihanSubTab = 'skenario') => {
    setLatihanSubTab(subTab);
    setCurrentTab('latihan');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Count expiring medicines for bottom nav badge
  const expiringCount = medicines.filter((m) => {
    const days = calculateDaysRemaining(m.expiryDate);
    return days <= 30;
  }).length;

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink selection:bg-secondary selection:text-forest transition-colors duration-150">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTinjau={() => {
          if (SHOW_REVIEWER_TOOLS) setIsTinjauOpen(true);
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenDisclaimer={() => setIsDisclaimerOpen(true)}
        onOpenWalkthrough={() => {
          setCurrentTab('beranda');
          setWalkthroughTrigger((prev) => prev + 1);
        }}
        theme={theme}
        onThemeChange={setTheme}
      />

      {/* Main Content Area — Spacious max-w-6xl canvas */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        {currentTab === 'beranda' && (
          <BerandaView
            onNavigate={(tab) => {
              if (tab === 'lemari') setLemariSearchQuery('');
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateLemariWithFilter={(filter) => {
              setLemariSearchQuery('');
              handleNavigateLemariWithFilter(filter);
            }}
            onNavigateLemariWithSearch={(query) => {
              setLemariFilter('semua');
              setLemariSearchQuery(query);
              setCurrentTab('lemari');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateLatihan={handleNavigateLatihan}
            medicines={medicines}
            onOpenKamus={(query = '') => {
              setKamusQuery(query);
              setIsKamusOpen(true);
            }}
            onOpenPanduan={(mode = 'simpan') =>
              setPanduanState({ isOpen: true, mode })
            }
            onOpenTinjau={SHOW_REVIEWER_TOOLS ? () => setIsTinjauOpen(true) : undefined}
            onOpenAbout={() => setIsAboutOpen(true)}
            externalWalkthroughTrigger={walkthroughTrigger}
          />
        )}

        {currentTab === 'cek-label' && (
          <CekLabelView
            onOpenKamus={() => {
              setKamusQuery('');
              setIsKamusOpen(true);
            }}
          />
        )}

        {currentTab === 'lemari' && (
          <LemariView
            medicines={medicines}
            onAddMedicine={handleAddMedicine}
            onEditMedicine={handleEditMedicine}
            onDeleteMedicine={handleDeleteMedicine}
            initialFilter={lemariFilter}
            initialSearchQuery={lemariSearchQuery}
            onOpenPanduan={(mode = 'simpan') =>
              setPanduanState({ isOpen: true, mode })
            }
          />
        )}

        {currentTab === 'latihan' && (
          <LatihanView
            onNavigate={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            initialSubTab={latihanSubTab}
          />
        )}

        {currentTab === 'pustaka' && <PustakaView />}
      </main>

      {/* Footer Disclaimer */}
      <FooterDisclaimer onOpenAbout={() => setIsAboutOpen(true)} />

      {/* Mobile Bottom Navigation (5 Tabs) */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        expiringCount={expiringCount}
      />

      {/* Modals */}
      <TentangModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <PemberitahuanEdukasiModal
        isOpen={isDisclaimerOpen}
        onClose={() => setIsDisclaimerOpen(false)}
      />

      <KamusModal
        isOpen={isKamusOpen}
        onClose={() => setIsKamusOpen(false)}
        initialQuery={kamusQuery}
      />

      <PanduanSimpanBuangModal
        isOpen={panduanState.isOpen}
        initialTab={panduanState.mode}
        onClose={() => setPanduanState({ isOpen: false, mode: 'simpan' })}
      />

      {SHOW_REVIEWER_TOOLS && (
        <TinjauDosenModal
          isOpen={isTinjauOpen}
          onClose={() => setIsTinjauOpen(false)}
        />
      )}

      {/* Global Gemini Chatbot Widget (Website + .zip Books) */}
      <ChatbotWidget currentTab={currentTab} />
    </div>
  );
}
