import React from 'react';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  count?: number;
  icon?: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({
  selected = false,
  count,
  icon,
  children,
  className = '',
  ...props
}) => {
  return (
    <button
      type="button"
      className={`min-h-[44px] px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer select-none active:scale-95 ${
        selected
          ? 'bg-brand text-on-brand shadow-xs'
          : 'bg-surface text-ink hover:bg-surface-muted hover:text-brand border border-line'
      } ${className}`}
      aria-pressed={selected}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {count !== undefined && (
        <span
          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            selected
              ? 'bg-on-brand/20 text-on-brand'
              : 'bg-surface-muted text-ink-muted'
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
};
