import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FieldErrors } from 'shared/models/validation-model';
import TextField from './text-field';

describe('TextField', () => {
  const errors: FieldErrors = {
    textField: ['This field is required'],
  };

  it('should render the text field with label', () => {
    render(<TextField label="Text Field" errors={{}} name="textField" />);

    expect(screen.getByText('Text Field')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should display error messages when there are errors', () => {
    render(<TextField label="Text Field" errors={errors} name="textField" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should merge custom className with default classes', () => {
    render(<TextField label="Text Field" errors={{}} name="textField" className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('p-2 border rounded-lg w-full custom-class');
  });

  it('should add error class when there is an error', () => {
    render(<TextField label="Text Field" errors={errors} name="textField" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-500');
  });

  it('should pass other props to the input element', () => {
    const handleChange = vi.fn();
    render(<TextField label="Text Field" errors={{}} name="textField" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New value' } });

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('New value');
  });
});
