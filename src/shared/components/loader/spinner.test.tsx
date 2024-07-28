import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Spinner from './spinner';

describe('Spinner', () => {
  it('should render the spinner with the loader class', () => {
    render(<Spinner />);

    const spinner = screen.getByLabelText('loader');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('loader');
  });
});
