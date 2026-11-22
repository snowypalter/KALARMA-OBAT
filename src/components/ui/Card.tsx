import React from 'react';

export type CardVariant = 'flat' | 'elevated' | 'outlined';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'flat',
  padding = 'md',
  interactive = false,
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all';

  const variantStyles: Record<CardVariant, string> = {
    flat: 'bg-surface border border-line',
    elevated: 'bg-elevated border border-line/70 shadow-xs hover:shadow-sm',
    outlined: 'bg-surface/70 border border-line-strong/40',
  };

  const paddingStyles: Record<CardPadding, string> = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-4 sm:p-5',
    lg: 'p-6 sm:p-8',
  };

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:border-line-strong hover:-translate-y-0.5 active:translate-y-0'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
