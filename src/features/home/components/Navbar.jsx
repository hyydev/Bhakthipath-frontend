import { useTheme } from '../../../context/ThemeContext';
import { Button } from '../../../components/ui';

const navLinks = [
  "Puja Items",
  "Books",
  "Clothing",
  "Accessories",
  "More"
];

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav
      className={`
        w-full sticky top-[64px] z-40
        backdrop-blur-xl border-b transition-all duration-500 

        ${isDark 
          ? 'bg-white/[0.04] text-white border-white/[0.08] shadow-sm'
          : 'bg-white/70 text-[#3A0519] border-black/[0.06] shadow-sm'
        }
  `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Nav Links */}
        <div className="flex gap-6 md:gap-20">
          {navLinks.map(link => (
            <Button
              key={link}
              variant="ghost"
              size="lg"
              className={`
                font-body font-bold text-md md:text-xl px-4 py-2 rounded-xl 
                transition-all duration-200

                ${isDark 
                  ? 'hover:bg-white/[0.06] text-white'
                  : 'hover:bg-[rgba(255,248,245,0.6)] text-[#3A0519]'
                }
              `}
            >
              {link}
            </Button>
          ))}
        </div>

      </div>
    </nav>
  );
}
