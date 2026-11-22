import React from 'react';
import { ModalShell } from './ModalShell';
import { Button } from './Button';
import { AlertCircle, AlertTriangle } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Konfirmasi Tindakan',
  message,
  confirmText = 'Hapus',
  cancelText = 'Batal',
  variant = 'danger',
  isLoading = false,
}) => {
  const Icon = variant === 'danger' ? AlertTriangle : AlertCircle;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      maxWidth="sm"
      headerIcon={<Icon className={`w-5 h-5 ${variant === 'danger' ? 'text-status-kedaluwarsa-text' : 'text-brand'}`} />}
      footer={
        <div className="flex items-center justify-end gap-2.5">
          <Button
            variant="ghost"
            size="md"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'danger' ? 'danger' : 'primary'}
            size="md"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            disabled={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <p className="text-sm text-ink-muted leading-relaxed">
        {message}
      </p>
    </ModalShell>
  );
};
