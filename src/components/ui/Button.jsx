import { forwardRef } from 'react';

// Button Component - Sacred Light + Premium Dark
export const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}, ref) => {
  const variants = {
    primary:
      // Light: saffron gradient. Dark: blue.
      'bg-gradient-to-b from-saffron-500 to-saffron-700 hover:from-saffron-400 hover:to-saffron-600 text-white shadow-sacred hover:shadow-sacred-md border border-saffron-700/40 ' +
      'dark:from-primary-500 dark:to-primary-700 dark:hover:from-primary-400 dark:hover:to-primary-600 dark:text-white dark:shadow-glow-sm dark:hover:shadow-glow-md dark:border-primary-500/50',
    secondary:
      'bg-white/70 hover:bg-white text-ink-800 border border-ink-200 hover:border-saffron-300 shadow-sm hover:shadow-sacred ' +
      'dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20 dark:hover:border-white/30',
    outline:
      'bg-transparent hover:bg-saffron-50 text-ink-800 border-2 border-ink-300 hover:border-saffron-500 hover:text-saffron-700 ' +
      'dark:hover:bg-white/5 dark:text-white dark:border-white/30 dark:hover:border-white/50 dark:hover:text-white',
    ghost:
      'bg-transparent hover:bg-ivory-200/60 text-ink-700 ' +
      'dark:hover:bg-white/5 dark:text-white',
    gradient:
      // Light: deep saffron→gold shimmer. Dark: blue→purple
      'bg-gradient-to-r from-saffron-600 via-gold-500 to-saffron-700 hover:from-saffron-500 hover:via-gold-400 hover:to-saffron-600 text-white shadow-sacred-md hover:shadow-sacred-lg border border-saffron-600/30 ' +
      'dark:from-primary-600 dark:via-purple-600 dark:to-primary-700 dark:hover:from-primary-500 dark:hover:via-purple-500 dark:hover:to-primary-600 dark:border-primary-500/30 dark:shadow-glow-md',
    danger:
      'bg-red-600 hover:bg-red-500 text-white border border-red-700/40 shadow-sm hover:shadow-md',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs rounded-lg',
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        font-semibold transition-all duration-300
        hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
        inline-flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// Icon Button
export const IconButton = forwardRef(({
  children,
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <button
      ref={ref}
      className={`
        ${sizes[size]}
        rounded-xl bg-white/70 hover:bg-white border border-ink-200 hover:border-saffron-400 text-ink-700 hover:text-saffron-700 shadow-sm hover:shadow-sacred
        dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 dark:text-white dark:hover:text-white
        flex items-center justify-center
        transition-all duration-300
        hover:scale-105 active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

IconButton.displayName = 'IconButton';
