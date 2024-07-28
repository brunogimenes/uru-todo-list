import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HomePage from './home.page';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('HomePage', () => {
  it('should render Outlet component', () => {
    renderWithRouter(<HomePage />);
    const outlet = screen.getByRole('region');
    expect(outlet).toBeInTheDocument();
  });
});
