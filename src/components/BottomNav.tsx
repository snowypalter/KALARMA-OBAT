import React from 'react';
import { TabType } from '../types';
import { Home, ScanSearch, Archive, Dumbbell, BookOpen } from 'lucide-react';

interface BottomNavProps {
  currentTab: TabType;
  onNavigate: (tab: TabType) => void;
  expiringCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
  expiringCount,
}) => {
  const tabs = [
    { id: 'beranda' as TabType, label: 'Beranda', icon: Home },
    { id: 'cek-label' as TabType, label: 'Cek Label', icon: ScanSearch },
    {
      id: 'lemari' as TabType,
      label: 'Lemari',
      icon: Archive,
      badge: expiringCount > 0 ? expiringCount : undefined,
    },
    { id: 'latihan' as TabType, label: 'Latihan', icon: Dumbbell },
    { id: 'pustaka' as TabType, label: 'Pustaka', icon: BookOpen },
  ];

  return (
    <nav
      aria-label="Navigasi Utama"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-line shadow-sm pb-safe"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.id)}
              className={`relative min-h-[44px] flex flex-col items-center justify-center py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-xl cursor-pointer ${
                isActive
                  ? 'text-forest font-semibold'
                  : 'text-ink-muted hover:text-ink font-medium'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'scale-105 text-brand stroke-[2.3]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-status-segera-text text-white text-[10px] font-bold tabular-nums flex items-center justify-center leading-none">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] tracking-tight mt-1 truncate max-w-full ${
                  isActive ? 'text-forest font-semibold' : 'text-ink-muted'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  className="absolute top-0 w-7 h-0.5 bg-brand rounded-full"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
