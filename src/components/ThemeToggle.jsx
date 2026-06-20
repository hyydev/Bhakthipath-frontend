import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '', iconClassName = '' }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl
        flex items-center justify-center
        transition-all duration-300
        hover:scale-110 active:scale-95
        ${theme === 'dark' 
          ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-yellow-300' 
          : 'bg-dark-900/10 hover:bg-dark-900/20 border border-dark-900/20 text-dark-900'
        }
        ${className}
      `}
      aria-label="Toggle theme"
    >
      <div className={`relative w-5 h-5 sm:w-6 sm:h-6 ${iconClassName}`}>
        {/* Sun Icon - visible in dark mode */}
        <Sun 
          className={`
            absolute inset-0 w-full h-full transition-all duration-300
            ${theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 rotate-90 scale-0'
            }
          `}
        />
        
        {/* Moon Icon - visible in light mode */}
        <Moon 
          className={`
            absolute inset-0 w-full h-full transition-all duration-300
            ${theme === 'light' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />
      </div>
    </button>
  );
}
