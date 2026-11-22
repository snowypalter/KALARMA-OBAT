import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = '',
}) => {
  return (
    <div
      className={`p-8 sm:p-12 text-center bg-surface rounded-2xl border border-line space-y-4 max-w-md mx-auto ${className}`}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-surface-muted text-brand flex items-center justify-center mx-auto shadow-2xs">
          {icon}
        </div>
      )}
      <div className="space-y-1.5">
        <h3 className="text-base sm:text-lg font-bold text-ink">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
          {description}
        </p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
