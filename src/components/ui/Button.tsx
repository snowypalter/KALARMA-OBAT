import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 min-h-[44px]';

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      'bg-brand hover:bg-forest text-on-brand shadow-xs focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
    secondary:
      'bg-secondary text-brand hover:bg-line/70 border border-line focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2',
    ghost:
      'bg-transparent text-ink hover:bg-surface-muted hover:text-brand focus-visible:ring-2 focus-visible:ring-focus',
    danger:
      'bg-status-kedaluwarsa-bg text-status-kedaluwarsa-text hover:bg-status-kedaluwarsa-bg/70 border border-status-kedaluwarsa-text/25 focus-visible:ring-2 focus-visible:ring-status-kedaluwarsa-text',
  };

  const sizeStyles: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-2 min-h-[44px] gap-1.5',
    md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2',
    lg: 'text-base px-5 py-3 min-h-[48px] gap-2.5',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
