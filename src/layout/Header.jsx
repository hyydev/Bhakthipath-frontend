import { ShoppingCart, User } from "lucide-react";
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <header className={`
      w-full sticky top-0 z-50
      ${isDark ? 'bg-[#0A1628]/80 text-white' : 'bg-white/80 text-[#3A0519]'}
      backdrop-blur-md shadow transition-colors duration-500
    `}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <span className={isDark ? "text-[#93C5FD]" : "text-[#6A092F]"}>Bhakthi</span>
          <span className={isDark ? "text-[#8B5CF6]" : "text-[#520724]"}>Verse</span>
        </div>
        {/* Search */}
        <div className="flex-1 mx-6 max-w-lg">
          <input
            type="text"
            placeholder="Search for products, books, more…"
            className={`
              w-full border px-4 py-2 rounded-xl outline-none
              ${isDark
                ? 'bg-[#1a2332] border-[#3B82F6] text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#3B82F6]'
                : 'bg-white border-[#6A092F] text-[#3A0519] placeholder:text-gray-400 focus:ring-2 focus:ring-[#6A092F]'
              }
              transition-colors duration-500
            `}
          />
        </div>
        {/* Icons */}
        <div className="flex items-center gap-6 text-lg font-medium">
          <button>
            <ShoppingCart color={isDark ? "#93C5FD" : "#6A092F"} />
          </button>
          <button>
            <User color={isDark ? "#93C5FD" : "#6A092F"} />
          </button>
        </div>
      </div>
    </header>
  );
}