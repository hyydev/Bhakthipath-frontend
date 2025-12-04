import { ShoppingCart, User, Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import AccountMenu from "../features/Ecommerce/components/AccountMenu";
import { useState } from "react";

export default function Header() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [menuOpen, setMenuOpen] = useState(false); // FIXED

  return (
    <header
      className={`
        w-full sticky top-0 z-50 backdrop-blur-xl transition-all duration-500
        ${
          isDark
            ? "bg-white/[0.04] text-white border-white/[0.08] shadow-sm"
            : "bg-white/70 text-[#3A0519] border-black/[0.06] shadow-sm"
        }
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
        {/* LOGO */}
        <div className="text-2xl font-extrabold tracking-tight flex items-center gap-2 drop-shadow-sm">
          <span className={isDark ? "text-[#93C5FD]" : "text-[#6A092F]"}>
            Bhakthi
          </span>
          <span className={isDark ? "text-[#8B5CF6]" : "text-[#520724]"}>
            Verse
          </span>
        </div>

        {/* SEARCH */}
        <div className="flex-1 mx-6 max-w-lg">
          <input
            type="text"
            placeholder="Search for products, books, more…"
            className={`
              w-full border px-4 py-2 rounded-xl outline-none shadow-sm transition-all duration-300
              ${
                isDark
                  ? "bg-[#1a2332]/80 border-[#3B82F6]/50 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-[#3B82F6] focus:shadow-[0_0_18px_rgba(50,130,255,0.35)]"
                  : "bg-white/90 border-[#6A092F]/50 text-[#3A0519] placeholder:text-gray-400 focus:ring-2 focus:ring-[#6A092F] focus:shadow-[0_0_18px_rgba(255,180,140,0.45)]"
              }
            `}
          />
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-8 text-lg font-medium">
          {/* USER ACCOUNT DROPDOWN FIX */}
          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              className={`
                flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300
                ${
                  isDark
                    ? "hover:shadow-[0_0_18px_rgba(255,190,140,0.35)] hover:bg-white/[0.07]"
                    : "hover:shadow-[0_0_18px_rgba(255,170,120,0.45)] hover:bg-[rgba(255,248,245,0.8)]"
                }
              `}
            >
              <User size={25} color={isDark ? "#93C5FD" : "#6A092F"} />
              <span className={isDark ? "text-amber-200 " : "text-[#3A0519]"}>
                My Account
              </span>
            </button>

            {/* DROPDOWN */}
            <div
              className={`
                absolute right-0 mt-3 z-50 transition-all duration-200
                ${
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }
              `}
            >
              <AccountMenu />
            </div>
          </div>

          {/* WISHLIST */}
          <div className="flex items-center gap-2">
            <button
              className={`
                p-2 rounded-xl transition-all duration-300
                ${
                  isDark
                    ? "hover:shadow-[0_0_18px_rgba(255,190,140,0.35)] hover:bg-white/[0.07]"
                    : "hover:shadow-[0_0_18px_rgba(255,170,120,0.45)] hover:bg-[rgba(255,248,245,0.8)]"
                }
              `}
            >
              <Heart size={28} color={isDark ? "#93C5FD" : "#6A092F"} />
            </button>
            
          </div>

          {/* CART */}
          <button
            className={`
              p-2 rounded-xl transition-all duration-300
              ${
                isDark
                  ? "hover:shadow-[0_0_18px_rgba(255,190,140,0.35)] hover:bg-white/[0.07]"
                  : "hover:shadow-[0_0_18px_rgba(255,170,120,0.45)] hover:bg-[rgba(255,248,245,0.8)]"
              }
            `}
          >
            <ShoppingCart size={28} color={isDark ? "#93C5FD" : "#6A092F"} />
          </button>

          {/* THEME TOGGLE */}
          <div className="fixed top-6 right-6 z-50">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
