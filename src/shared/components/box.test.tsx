import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Box from './box';


describe('Box', () => {
  it('should render with default classes', () => {
    render(<Box>Default Box</Box>);

    const box = screen.getByText('Default Box');
    expect(box).toBeInTheDocument();
    expect(box).toHaveClass('p-4 rounded-lg shadow-xl bg-blue-50');
  });

  it('should apply elevation class based on the elevation prop', () => {
    render(<Box elevation="md">Medium Elevation Box</Box>);

    const box = screen.getByText('Medium Elevation Box');
    expect(box).toHaveClass('shadow-md');
  });

  it('should apply color class based on the color prop', () => {
    render(<Box color="bg-red-50">Red Box</Box>);

    const box = screen.getByText('Red Box');
    expect(box).toHaveClass('bg-red-50');
  });

  it('should merge custom className with default classes', () => {
    render(<Box className="custom-class">Custom Class Box</Box>);

    const box = screen.getByText('Custom Class Box');
    expect(box).toHaveClass('p-4 rounded-lg shadow-xl bg-blue-50 custom-class');
  });

  it('should pass other props to the div element', () => {
    render(<Box id="test-box">Box with ID</Box>);

    const box = screen.getByText('Box with ID');
    expect(box).toHaveAttribute('id', 'test-box');
  });
});
