import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import EmptyState from './empty-state';

describe('EmptyState', () => {
  it('should render the empty state with message', () => {
    const message = 'No data found';
    render(<EmptyState message={message} />);

    expect(screen.getByText('👀')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
