import { forwardRef } from 'react';

// Base Card Component - Sacred Light + Premium Dark
export const Card = forwardRef(({
  children,
  className = '',
  variant = 'default',
  hover = true,
  glow = false,
  ...props
}, ref) => {
  const variants = {
    default:
      'bg-white/80 backdrop-blur-md border border-ink-100 shadow-sacred ' +
      'dark:bg-white/5 dark:backdrop-blur-sm dark:border-white/10 dark:shadow-card',
    solid:
      'bg-ivory-50 border border-ink-100 shadow-sacred ' +
      'dark:bg-dark-800/80 dark:border-white/5',
    glass:
      'bg-white/72 backdrop-blur-2xl border border-saffron-200/50 shadow-sacred-md ' +
      'dark:bg-white/[0.03] dark:backdrop-blur-xl dark:border-white/[0.08] dark:shadow-card',
    gradient:
      'bg-gradient-to-br from-saffron-50/90 via-ivory-100/80 to-gold-50/70 backdrop-blur-md border border-saffron-200/60 shadow-sacred ' +
      'dark:from-primary-500/10 dark:via-purple-500/5 dark:to-cyan-500/5 dark:border-primary-500/20',
    elevated:
      'bg-white border border-ink-100 shadow-sacred-lg ' +
      'dark:bg-dark-800/90 dark:border-white/10 dark:shadow-glow-md',
  };

  const hoverEffect = hover
    ? 'hover:shadow-sacred-lg hover:border-saffron-300/60 hover:-translate-y-0.5 dark:hover:shadow-card-hover dark:hover:border-white/20 transition-all duration-300'
    : 'transition-colors duration-300';
  const glowEffect = glow ? 'shadow-sacred-glow dark:shadow-glow-md' : '';

  return (
    <div
      ref={ref}
      className={`
        ${variants[variant]}
        ${hoverEffect}
        ${glowEffect}
        rounded-card-lg p-6
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-heading-md font-display text-ink-900 dark:text-white ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-ink-500 dark:text-gray-400 mt-2 ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-6 pt-4 border-t border-ink-100 dark:border-white/10 ${className}`}>
    {children}
  </div>
);

// Feature Card
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
    primary:
      'bg-saffron-100 text-saffron-700 border-saffron-200 dark:bg-primary-500/20 dark:text-primary-300 dark:border-primary-500/30',
    purple:
      'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30',
    cyan:
      'bg-teal-100 text-teal-700 border-teal-200 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30',
    green:
      'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30',
  };

  return (
    <Card variant="glass" hover glow={false} className={className} {...props}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center
          bg-gradient-to-br from-saffron-100 to-gold-200 border border-saffron-300/60
          dark:from-primary-500/20 dark:to-purple-500/20 dark:border-primary-500/30">
          {icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3 className="text-lg font-display font-semibold text-ink-900 dark:text-white">{title}</h3>
            {badge && (
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeColors[badgeColor]}`}>
                {badge}
              </span>
            )}
          </div>
          <p className="text-sm text-ink-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
};
