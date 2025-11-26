// Badge Component
export const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '' 
}) => {

  const variants = {
    default: 'bg-white/10 text-white border-white/20',
    primary: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    success: 'bg-green-500/20 text-green-300 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-300 border-red-500/30',
    golden: 'bg-primary-500/20 text-amber-200 border-amber-400/40 hover:border-amber-300 hover:shadow-[0_0_8px_rgba(251,191,36,0.45)] transition-all duration-300 '
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span className={`
      ${variants[variant]}
      ${sizes[size]}
      inline-flex items-center rounded-full border font-medium
      ${className}
    `}>
      {children}
    </span>
  );
};