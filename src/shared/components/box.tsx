type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  elevation?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: string
};

const defaultBoxClassName = 'p-4 rounded-lg';

const Box = (props: BoxProps) => {

  const { elevation = 'xl', color = 'bg-blue-50', className = '' } = props;
  const shadowClass = `shadow-${elevation}`;
  const mergedClassName = `${defaultBoxClassName} ${shadowClass} ${color} ${className}`;
  return <div {...props} className={mergedClassName} />;
};

export default Box;