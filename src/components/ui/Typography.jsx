// Typography Components

export const Heading = ({ 
  level = 1, 
  children, 
  className = '',
  gradient = false,
  ...props 
}) => {
  const Tag = `h${level}`;
  
  const styles = {
    1: 'text-display-lg font-display',
    2: 'text-display-md font-display',
    3: 'text-display-sm font-display',
    4: 'text-heading-xl',
    5: 'text-heading-lg',
    6: 'text-heading-md',
  };
 

  const gradientStyle = gradient 
    ? 'bg-gradient-to-r from-primary-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent'
    : 'text-white dark:text-white light:text-dark-900';

  return (
    <Tag className={`${styles[level]} ${gradientStyle} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const Text = ({ 
  children, 
  size = 'base',
  color = 'gray',
  className = '',
  ...props 
}) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const colors = {
    white: 'text-white dark:text-white light:text-dark-900',
    gray: 'text-gray-400 dark:text-gray-400 light:text-gray-600',
    primary: 'text-primary-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
  };

  return (
    <p className={`${sizes[size]} ${colors[color]} ${className}`} {...props}>
      {children}
    </p>
  );
};

export const GradientText = ({ children, className = '' }) => (
  <span className={`bg-gradient-to-r from-primary-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold ${className}`}>
    {children}
  </span>
);