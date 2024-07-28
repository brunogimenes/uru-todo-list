import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { FieldErrors } from 'shared/models/validation-model';
import SelectField from './select';

describe('SelectField', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  const errors: FieldErrors = {
    selectField: ['This field is required'],
  };

  it('should render the select field with label', () => {
    render(<SelectField label="Select Field" errors={{}} options={options} name="selectField" />);

    expect(screen.getByText('Select Field')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('should render the select options', () => {
    render(<SelectField label="Select Field" errors={{}} options={options} name="selectField" />);

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option1' } });

    expect(select).toHaveValue('option1');
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('should render error messages when there are errors', () => {
    render(<SelectField label="Select Field" errors={errors} options={options} name="selectField" />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('should merge custom className with default classes', () => {
    render(<SelectField label="Select Field" errors={{}} options={options} name="selectField" className="custom-class" />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('p-2 border rounded-lg w-full custom-class');
  });

  it('should add error class when there is an error', () => {
    render(<SelectField label="Select Field" errors={errors} options={options} name="selectField" />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-500');
  });
});
