import { ShoppingCart, User, Heart } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import AccountMenu from "../features/Ecommerce/components/AccountMenu";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useCartStore } from "../features/EcommerceCart/cart.store";

import { useDebounce } from "../lib/utils";

export default function Header() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const itemCount = useCartStore((s) => s.itemCount);

  const [menuOpen, setMenuOpen] = useState(false); // FIXED

  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      navigate(`/ecommerce?search=${encodeURIComponent(value.trim())}`);
    } else if (location.pathname === "/ecommerce") {
      navigate("/ecommerce");
    }
  };

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
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 py-3 px-3 sm:px-4 lg:py-4">
        {/* LOGO */}
        <div className="text-lg sm:text-2xl font-extrabold tracking-tight flex items-center gap-2 drop-shadow-sm shrink-0">
          <button
            type="button"
            onClick={() => navigate("/ecommerce")}
            className="flex items-center gap-1 sm:gap-2"
          >
            <span className={isDark ? "text-[#93C5FD]" : "text-[#6A092F]"}>
              Bhakthi
            </span>
            <span className={isDark ? "text-[#8B5CF6]" : "text-[#520724]"}>
              Verse
            </span>
          </button>
        </div>

        {/* SEARCH */}
        <div className="hidden md:block flex-1 mx-2 lg:mx-6 max-w-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
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
        <div className="flex items-center justify-end gap-1.5 sm:gap-2 lg:gap-5 text-lg font-medium shrink-0">
          {/* USER ACCOUNT DROPDOWN FIX */}
          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className={`
                flex items-center gap-2 p-2 lg:px-3 lg:py-2 rounded-xl transition-all duration-300
                ${
                  isDark
                    ? "hover:shadow-[0_0_18px_rgba(255,190,140,0.35)] hover:bg-white/[0.07]"
                    : "hover:shadow-[0_0_18px_rgba(255,170,120,0.45)] hover:bg-[rgba(255,248,245,0.8)]"
                }
              `}
              aria-label="My Account"
            >
              <User size={24} color={isDark ? "#93C5FD" : "#6A092F"} />
              <span
                className={`hidden lg:inline ${
                  isDark ? "text-amber-200 " : "text-[#3A0519]"
                }`}
              >
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
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className={`
                p-2 rounded-xl transition-all duration-300
                ${
                  isDark
                    ? "hover:shadow-[0_0_18px_rgba(255,190,140,0.35)] hover:bg-white/[0.07]"
                    : "hover:shadow-[0_0_18px_rgba(255,170,120,0.45)] hover:bg-[rgba(255,248,245,0.8)]"
                }
              `}
              aria-label="Wishlist"
            >
              <Heart size={24} color={isDark ? "#93C5FD" : "#6A092F"} />
            </button>
          </div>

          {/* CART */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative p-2 rounded-xl transition-all duration-300 ..."
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={24} color={isDark ? "#93C5FD" : "#6A092F"} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          {/* THEME TOGGLE */}
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
