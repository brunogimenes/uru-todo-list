import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from './modal';

describe('Modal', () => {
  const onClose = vi.fn();
  const children = <div>Modal Content</div>;

  beforeEach(() => {
    onClose.mockClear();
  });

  it('should render the modal when isOpen is true', () => {
    render(<Modal isOpen={true} onClose={onClose}>{children}</Modal>);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should not render the modal when isOpen is false', () => {
    render(<Modal isOpen={false} onClose={onClose}>{children}</Modal>);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should call onClose when clicking outside the modal', () => {
    render(<Modal isOpen={true} onClose={onClose}>{children}</Modal>);

    fireEvent.mouseDown(document);
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onClose when clicking the close button', () => {
    render(<Modal isOpen={true} onClose={onClose}>{children}</Modal>);

    fireEvent.click(screen.getByText('×'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should apply custom className to the modal', () => {
    render(<Modal isOpen={true} onClose={onClose} className="custom-class">{children}</Modal>);

    const modal = screen.getByRole('dialog').firstChild;
    expect(modal).toHaveClass('custom-class');
  });
});
