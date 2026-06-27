// Badge Component
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = ''
}) => {
  const variants = {
    default:
      'bg-ivory-100 text-ink-700 border-ink-200 dark:bg-white/10 dark:text-white dark:border-white/20',
    primary:
      'bg-saffron-100 text-saffron-700 border-saffron-300 dark:bg-primary-500/20 dark:text-primary-300 dark:border-primary-500/30',
    purple:
      'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30',
    cyan:
      'bg-teal-100 text-teal-700 border-teal-200 dark:bg-cyan-500/20 dark:text-cyan-300 dark:border-cyan-500/30',
    success:
      'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30',
    warning:
      'bg-amber-100 text-amber-700 border-amber-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30',
    danger:
      'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30',
    golden:
      // Premium "sacred" gold badge for landing/auth hero
      'bg-gradient-to-r from-gold-100 via-saffron-100 to-gold-100 text-saffron-800 border-saffron-300 shadow-sacred hover:shadow-sacred-md transition-all duration-300 ' +
      'dark:from-amber-500/20 dark:via-amber-400/15 dark:to-amber-500/20 dark:text-amber-200 dark:border-amber-400/40 dark:hover:border-amber-300 dark:hover:shadow-[0_0_8px_rgba(251,191,36,0.45)]',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`
      ${variants[variant]}
      ${sizes[size]}
      inline-flex items-center rounded-full border font-medium tracking-wide
      ${className}
    `}>
      {children}
    </span>
  );
};
