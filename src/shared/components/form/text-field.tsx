import { InputHTMLAttributes } from "react";
import { FieldErrors } from "../../models/validation-model";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errors?: FieldErrors;
};

const TextField = (props: TextFieldProps) => {
  const { label, errors = {}, className = '', ...rest } = props;
  const thisFieldErrors = errors[rest.name as string];
  const errorClass = thisFieldErrors?.length > 0 ? 'border-red-500' : '';
  const mergedClassName = `p-2 border rounded-lg w-full ${errorClass} ${className}`;

  return (
    <fieldset className="flex flex-col items-start w-full mb-3" aria-label={`field ${rest.name}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input placeholder="" {...rest} className={mergedClassName} />
      {thisFieldErrors && Object.keys(thisFieldErrors).map((key) => <p key={key} role="alert" className="text-xs text-red-500 text-left">{thisFieldErrors}</p>)}
    </fieldset>
  );
}

export default TextField;