import React, { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';

export interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  headerIcon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

export const ModalShell: React.FC<ModalShellProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  headerIcon,
  children,
  footer,
  maxWidth = 'lg',
  className = '',
}) => {
  const titleId = useId();
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Focus trap, scroll reset & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Reset scroll to top immediately on open
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    // Save previous active element
    previousFocusRef.current = document.activeElement as HTMLElement | null;

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus modal container without scrolling
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.focus({ preventScroll: true });
      }
    }, 50);

    // Keydown handler for Escape & Tab focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);

        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      // Restore focus
      if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-forest/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`w-full bg-surface text-ink rounded-t-3xl sm:rounded-2xl border-t sm:border border-line shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden focus:outline-none ro-sheet-in sm:ro-fade-in ${maxWidthStyles[maxWidth]} ${className}`}
      >
        {/* Mobile Drag Handle Bar */}
        <div className="w-10 h-1.5 bg-line-strong/30 rounded-full mx-auto my-2.5 sm:hidden shrink-0" aria-hidden="true" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-line bg-surface shrink-0 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {headerIcon && (
              <div className="w-9 h-9 rounded-xl bg-secondary text-brand flex items-center justify-center shrink-0">
                {headerIcon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h2 id={titleId} className="font-display text-base sm:text-lg font-semibold text-forest leading-tight truncate">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-ink-muted truncate mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full text-ink-muted hover:text-ink hover:bg-surface-muted border border-transparent hover:border-line flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus shrink-0"
            aria-label="Tutup dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div ref={contentRef} className="p-5 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
          {children}
        </div>

        {/* Optional Footer with guaranteed safe bottom spacing */}
        {footer && (
          <div
            className="px-5 sm:px-6 pt-3.5 bg-surface-muted/60 border-t border-line shrink-0"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 1rem))' }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
