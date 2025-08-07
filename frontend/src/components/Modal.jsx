import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose?.();
    }
    if (open) {
      document.addEventListener('keydown', handleKey);
    }
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-md bg-white p-4 shadow-card">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full p-1 text-neutral hover:bg-border"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
