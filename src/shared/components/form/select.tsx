import React, { SelectHTMLAttributes } from 'react';
import { FieldErrors } from 'shared/models/validation-model';

type Option = {
  value: string;
  label: string;
};

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  errors: FieldErrors;
  options: Option[];
};

const SelectField: React.FC<SelectFieldProps> = (props) => {
  const { label, errors, options, className = '', ...rest } = props;
  const error = errors[rest.name as string];
  const errorClass = error ? 'border-red-500' : '';
  const mergedClassName = `p-2 border rounded-lg w-full ${errorClass} ${className}`;


  return (
    <div className="flex flex-col items-start w-full mb-4" >
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select {...rest} className={mergedClassName}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && Object.keys(errors).map((key) => <p key={key} role="alert" className="text-xs text-red-500">{errors[key]}</p>)}
    </div>
  );
}

export default SelectField;
