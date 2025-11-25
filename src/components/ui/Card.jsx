import { forwardRef } from 'react';

// Base Card Component - Preparation Street Style
export const Card = forwardRef(({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  glow = false,
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-white/5 dark:bg-white/5 light:bg-dark-900/5 backdrop-blur-sm border border-white/10 dark:border-white/10 light:border-dark-900/10',
    solid: 'bg-dark-800/80 dark:bg-dark-800/80 light:bg-white/80 backdrop-blur-md border border-white/5 dark:border-white/5 light:border-dark-900/10',
    glass: 'bg-white/[0.02] dark:bg-white/[0.02] light:bg-white/60 backdrop-blur-xl border border-white/[0.08] dark:border-white/[0.08] light:border-dark-900/10',
    gradient: 'bg-gradient-to-br from-primary-500/10 to-purple-500/10 border border-primary-500/20',
  };

  const hoverEffect = hover ? 'hover:shadow-card-hover hover:border-white/20 dark:hover:border-white/20 light:hover:border-dark-900/30 hover:-translate-y-1 transition-all duration-300' : '';
  const glowEffect = glow ? 'shadow-glow-md' : '';

  return (
    <div
      ref={ref}
      className={`
        ${variants[variant]}
        ${hoverEffect}
        ${glowEffect}
        rounded-card-lg p-6 shadow-card
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

// Card Header
export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>
    {children}
  </div>
);

// Card Title
export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-heading-md font-display text-white dark:text-white light:text-dark-900 ${className}`}>
    {children}
  </h3>
);

// Card Description
export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 mt-2 ${className}`}>
    {children}
  </p>
);

// Card Content
export const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>
    {children}
  </div>
);

// Card Footer
export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-6 pt-4 border-t border-white/10 dark:border-white/10 light:border-dark-900/10 ${className}`}>
    {children}
  </div>
);

// Feature Card - Like Preparation Street's feature cards
export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  badge,
  badgeColor = 'primary',
  className = '',
  ...props 
}) => {
  const badgeColors = {
    primary: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    green: 'bg-green-500/20 text-green-300 border-green-500/30',
  };

  return (
    <Card variant="glass" hover glow className={className} {...props}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center border border-primary-500/30">
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-white dark:text-white light:text-dark-900">{title}</h3>
            {badge && (
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeColors[badgeColor]}`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-400 dark:text-gray-400 light:text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};