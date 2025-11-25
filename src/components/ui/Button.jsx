import { forwardRef } from 'react';

// Button Component - Preparation Street Style
export const Button = forwardRef(({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-primary-600 hover:bg-primary-500 text-white shadow-glow-sm hover:shadow-glow-md border border-primary-500/50',
    secondary: 'bg-white/10 dark:bg-white/10 light:bg-dark-900/10 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-dark-900/20 text-white dark:text-white light:text-dark-900 border border-white/20 dark:border-white/20 light:border-dark-900/20 hover:border-white/30 dark:hover:border-white/30 light:hover:border-dark-900/30',
    outline: 'bg-transparent hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-dark-900/5 text-white dark:text-white light:text-dark-900 border-2 border-white/30 dark:border-white/30 light:border-dark-900/30 hover:border-white/50 dark:hover:border-white/50 light:hover:border-dark-900/50',
    ghost: 'bg-transparent hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-dark-900/5 text-white dark:text-white light:text-dark-900',
    gradient: 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 text-white shadow-glow-md',
  };

  const sizes = {
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
        hover:scale-105 active:scale-95
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
        rounded-xl bg-white/5 dark:bg-white/5 light:bg-dark-900/5 
        hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-dark-900/10
        border border-white/10 dark:border-white/10 light:border-dark-900/10 
        hover:border-white/20 dark:hover:border-white/20 light:hover:border-dark-900/20
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
});

IconButton.displayName = 'IconButton';