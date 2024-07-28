import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FixedSpinner from './fixed-spinner';


describe('FixedSpinner', () => {
  it('should render Spinner when show is true', () => {
    render(<FixedSpinner show={true} />);

    expect(screen.getByLabelText('loader')).toBeInTheDocument();
    expect(screen.getByLabelText('loader').parentElement).toHaveClass('fixed left-0 top-0 w-full h-full bg-gray-300 bg-opacity-50 z-50 flex items-center justify-center');
  });

  it('should not render Spinner when show is false', () => {
    render(<FixedSpinner show={false} />);

    expect(screen.queryByTestId('spinner')).toBeNull();
  });
});
