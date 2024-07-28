import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './button';


describe('Button', () => {
  it('should render with default solid variant', () => {
    render(<Button>Solid Button</Button>);

    const button = screen.getByText('Solid Button');
    expect(button).toHaveClass('px-4 py-2 rounded-lg bg-blue-500 text-white');
  });

  it('should render with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>);

    const button = screen.getByText('Outline Button');
    expect(button).toHaveClass('px-4 py-2 rounded-lg bg-transparent text-blue-500 border border-blue-500');
  });

  it('should render with link variant', () => {
    render(<Button variant="link">Link Button</Button>);

    const button = screen.getByText('Link Button');
    expect(button).toHaveClass('px-4 py-2 rounded-lg bg-transparent text-blue-500');
  });

  it('should merge custom className with default classes', () => {
    render(<Button className="custom-class">Custom Class Button</Button>);

    const button = screen.getByText('Custom Class Button');
    expect(button).toHaveClass('px-4 py-2 rounded-lg bg-blue-500 text-white custom-class');
  });

  it('should pass other props to the button element', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByText('Clickable Button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalled();
  });
});
