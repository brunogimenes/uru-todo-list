import React, { SelectHTMLAttributes } from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: Option[];
};

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { label, error, options, className = '', ...rest } = props;
  const errorClass = error ? 'border-red-500' : '';
  const mergedClassName = `p-2 border rounded-lg ${errorClass} ${className}`;

  return (
    <div className="flex flex-col items-start">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select {...rest} className={mergedClassName}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default SelectField;
