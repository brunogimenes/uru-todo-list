import { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const TextField = (props: TextFieldProps) => {
  const { label, error, className = '', ...rest } = props;
  const errorClass = error ? 'border-red-500' : '';
  const mergedClassName = `p-2 border rounded-lg ${errorClass} ${className}`;

  return (
    <div className="flex flex-col items-start">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input placeholder="" {...rest} className={mergedClassName} />
      {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default TextField;