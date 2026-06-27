// Typography Components - Sacred Light + Premium Dark

export const Heading = ({
  level = 1,
  children,
  className = '',
  gradient = false,
  ...props
}) => {
  const Tag = `h${level}`;

  const styles = {
    1: 'text-display-lg md:text-display-xl font-display',
    2: 'text-display-md md:text-display-lg font-display',
    3: 'text-display-sm md:text-display-md font-display',
    4: 'text-heading-xl md:text-heading-xl font-display',
    5: 'text-heading-lg font-display',
    6: 'text-heading-md font-display',
  };

  const gradientStyle = gradient
    ? 'text-saffron-gradient dark:bg-gradient-to-r dark:from-primary-400 dark:via-purple-400 dark:to-cyan-400 dark:bg-clip-text dark:text-transparent'
    : 'text-ink-900 dark:text-white';

  return (
    <Tag className={`${styles[level]} ${gradientStyle} ${className}`} {...props}>
      {children}
    </Tag>
  );
};

export const Text = ({
  children,
  size = 'base',
  color = 'auto',
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
    auto: 'text-ink-700 dark:text-gray-300',
    ink: 'text-ink-900 dark:text-white',
    muted: 'text-ink-500 dark:text-gray-400',
    primary: 'text-saffron-700 dark:text-primary-400',
    purple: 'text-fuchsia-700 dark:text-purple-400',
    cyan: 'text-teal-700 dark:text-cyan-400',
    // back-compat
    white: 'text-ink-900 dark:text-white',
    gray: 'text-ink-500 dark:text-gray-400',
  };

  return (
    <p className={`${sizes[size]} ${colors[color] || colors.auto} ${className}`} {...props}>
      {children}
    </p>
  );
};

export const GradientText = ({ children, className = '' }) => (
  <span
    className={`text-saffron-gradient dark:bg-gradient-to-r dark:from-primary-400 dark:via-purple-400 dark:to-cyan-400 dark:bg-clip-text dark:text-transparent font-bold ${className}`}
  >
    {children}
  </span>
);

export const Input = ({ className = '', ...props }) => (
  <input
    className={`
      w-full
      bg-white/80
      dark:bg-white/[0.05]
      border
      border-ink-200
      dark:border-white/10
      rounded-xl
      text-ink-900
      dark:text-white
      placeholder:text-ink-400
      dark:placeholder:text-gray-500
      font-body
      px-4
      py-3
      shadow-sm
      focus:outline-none
      focus:ring-2
      focus:ring-saffron-400/40
      dark:focus:ring-primary-500/40
      focus:border-saffron-400
      dark:focus:border-primary-400
      hover:border-ink-300
      dark:hover:border-white/20
      transition-all
      duration-200
      ${className}
    `}
    {...props}
  />
);
