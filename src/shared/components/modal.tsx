import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, className, children }) => {

  const modalClasses = `bg-blue-50 p-4 rounded-lg shadow-lg relative ${className}`;

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div role="dialog" className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900 bg-opacity-50 transition-all">
      <div ref={modalRef} className={modalClasses}>
        <button className="absolute top-0 right-0 mt-4 mr-4" onClick={onClose}>
          &times;
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
