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
    lg: 'py-32',
  };

  return (
    <section className={`${spacings[spacing]} ${className} `} {...props} >
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
        <p className="text-primary-400 font-semibold mb-3 uppercase tracking-wider text-sm">
          {subtitle}
        </p>
      )}
      {title && (
        <h2 className="text-display-md font-display text-white mb-4">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};