type Button = React.HTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'outline' | 'link';
};

const defaultButtonClassName = 'px-4 py-2 rounded-lg';

const Button = (props: Button) => {
  const { variant = 'solid', className = '', ...rest } = props;
  const bgColor = variant === 'solid' ? 'bg-blue-500 text-white' : 'bg-transparent text-blue-500';
  const border = variant === 'outline' ? 'border border-blue-500' : '';
  const mergedClassName = `${defaultButtonClassName} ${bgColor} ${border} ${className}`;
  return <button {...rest} className={mergedClassName} />;
};

export default Button;