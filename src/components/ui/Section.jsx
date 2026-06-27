// Section Component - For consistent page sections
export const Section = ({
  children,
  className = '',
  containerSize = 'default',
  spacing = 'default',
  ...props
}) => {
  const containerSizes = {
    sm: 'max-w-4xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full',
  };

  const spacings = {
    sm: 'py-12',
    default: 'py-20',
    lg: 'py-28 md:py-32',
  };

  return (
    <section className={`${spacings[spacing]} ${className}`} {...props}>
      <div className={`${containerSizes[containerSize]} mx-auto px-6`}>
        {children}
      </div>
    </section>
  );
};

// Section Header
export const SectionHeader = ({
  title,
  subtitle,
  description,
  align = 'center',
  className = ''
}) => {
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-16 ${alignments[align]} ${className}`}>
      {subtitle && (
        <p className="text-saffron-700 dark:text-primary-400 font-semibold mb-3 uppercase tracking-[0.18em] text-xs">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="text-display-sm md:text-display-md font-display text-ink-900 dark:text-white mb-4">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-lg text-ink-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
