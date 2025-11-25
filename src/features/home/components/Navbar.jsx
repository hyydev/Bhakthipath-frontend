import { useTheme } from '../../../context/ThemeContext';

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
    <nav className={`
      w-full sticky top-[64px] z-40
      ${isDark ? 'bg-[#0A1628]/70 text-white' : 'bg-white/70 text-[#3A0519]'}
      backdrop-blur-md shadow transition-colors duration-500
    `}>
      <div className="max-w-7xl mx-auto flex items-center gap-8 px-4 py-2">
        {navLinks.map(link => (
          <span
            key={link}
            className={`
              font-medium cursor-pointer px-3 py-1 rounded-lg transition
              ${isDark ? 'hover:bg-[#1a2332]' : 'hover:bg-gray-100'}
            `}
          >
            {link}
          </span>
        ))}
      </div>
    </nav>
  );
}