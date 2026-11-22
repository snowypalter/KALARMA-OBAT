import React from 'react';
import { MedicineStatus } from '../../types';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

export interface StatusBadgeProps {
  status: MedicineStatus;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  size = 'md',
  className = '',
}) => {
  const configs = {
    aman: {
      defaultLabel: 'Aman',
      icon: CheckCircle2,
      styles: 'bg-status-aman-bg text-status-aman-text border-status-aman-text/25',
    },
    segera: {
      defaultLabel: 'Segera Kedaluwarsa',
      icon: AlertTriangle,
      styles: 'bg-status-segera-bg text-status-segera-text border-status-segera-text/25',
    },
    kedaluwarsa: {
      defaultLabel: 'Kedaluwarsa',
      icon: AlertOctagon,
      styles: 'bg-status-kedaluwarsa-bg text-status-kedaluwarsa-text border-status-kedaluwarsa-text/25',
    },
  };

  const current = configs[status] || configs.aman;
  const Icon = current.icon;
  const displayLabel = label || current.defaultLabel;

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <span
      className={`inline-flex items-center font-bold rounded-lg border ${current.styles} ${sizeStyles[size]} ${className}`}
      role="status"
    >
      <Icon className={`${iconSizes[size]} shrink-0`} aria-hidden="true" />
      <span>{displayLabel}</span>
    </span>
  );
};
