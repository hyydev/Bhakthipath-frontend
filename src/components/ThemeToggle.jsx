import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '', iconClassName = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-testid="theme-toggle"
      aria-label="Toggle theme"
      className={`
        relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden
        flex items-center justify-center
        transition-all duration-300
        hover:scale-105 active:scale-95
        ${isDark
          ? 'bg-gradient-to-br from-primary-500/20 to-purple-500/20 hover:from-primary-500/30 hover:to-purple-500/30 border border-primary-400/30 text-amber-200 shadow-[0_0_18px_rgba(59,130,246,0.18)]'
          : 'bg-gradient-to-br from-ivory-50 to-saffron-100 hover:from-saffron-50 hover:to-gold-100 border border-saffron-300/60 text-ink-800 shadow-sacred'
        }
        ${className}
      `}
    >
      <div className={`relative w-5 h-5 ${iconClassName}`}>
        <Sun
          className={`
            absolute inset-0 w-full h-full transition-all duration-500
            ${isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
            }
          `}
        />
        <Moon
          className={`
            absolute inset-0 w-full h-full transition-all duration-500
            ${!isDark
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />
      </div>
    </button>
  );
}
