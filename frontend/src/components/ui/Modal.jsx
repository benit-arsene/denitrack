import { useEffect, useCallback } from 'react';
import './modal.css';

export default function Modal({
  isOpen = false,
  onClose,
  title,
  children,
  footer,
  closeLabel = 'Close',
}) {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape' && typeof onClose === 'function') {
        onClose();
      }
    },
    [onClose]
  );

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget && typeof onClose === 'function') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('dt-modal-scroll-lock');
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.classList.remove('dt-modal-scroll-lock');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="dt-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dt-modal-title"
      onClick={handleBackdropClick}
    >
      <div className="dt-modal">
        <header className="dt-modal-header">
          <h2 id="dt-modal-title" className="dt-modal-title">
            {title}
          </h2>
          <button
            className="dt-modal-close"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </header>
        <div className="dt-modal-body dt-modal-scroll">
          {children}
        </div>
        {footer && (
          <footer className="dt-modal-footer">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

Modal.displayName = 'Modal';
