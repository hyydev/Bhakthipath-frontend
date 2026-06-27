import { ShoppingCart, User, Heart, Search, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import AccountMenu from "../features/Ecommerce/components/AccountMenu";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "../features/EcommerceCart/cart.store";

export default function Header() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const itemCount = useCartStore((s) => s.itemCount);

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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
      data-testid="main-header"
      className={`
        w-full sticky top-0 z-50 transition-all duration-500
        ${isDark
          ? "bg-[#0A1628]/70 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.35)]"
          : "bg-ivory-50/80 backdrop-blur-2xl border-b border-saffron-200/40 shadow-[0_4px_30px_rgba(180,83,9,0.06)]"
        }
      `}
    >
      {/* Top gold/blue accent line */}
      <div className={`h-[2px] w-full ${isDark
        ? "bg-gradient-to-r from-transparent via-primary-500/60 to-transparent"
        : "bg-gradient-to-r from-transparent via-saffron-400/80 to-transparent"
      }`} />

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 py-3 px-4 sm:px-6 lg:py-4">
        {/* LOGO */}
        <button
          type="button"
          onClick={() => navigate("/ecommerce")}
          data-testid="logo-button"
          className="flex items-center gap-2 shrink-0 group"
        >
          {/* Lotus / Om mark */}
          <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105
            ${isDark
              ? "bg-gradient-to-br from-primary-500/30 to-purple-500/30 border border-primary-400/40 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
              : "bg-gradient-to-br from-saffron-100 to-gold-200 border border-saffron-300/70 shadow-sacred"
            }`}>
            <svg viewBox="0 0 24 24" className={`w-6 h-6 ${isDark ? "text-primary-300" : "text-saffron-700"}`} fill="currentColor">
              <path d="M12 2C9 5 8 8 8 10c0 1 0 2 1 3-2 0-4-1-5-3 0 3 2 6 5 7-2 1-4 1-6 0 2 2 5 3 7 3v2h2v-2c2 0 5-1 7-3-2 1-4 1-6 0 3-1 5-4 5-7-1 2-3 3-5 3 1-1 1-2 1-3 0-2-1-5-4-8z" />
            </svg>
          </div>

          <div className="flex items-baseline gap-1">
            <span className={`text-xl sm:text-2xl font-display font-extrabold tracking-tight ${
              isDark ? "text-white" : "text-ink-900"
            }`}>
              Bhakthi
            </span>
            <span className={`text-xl sm:text-2xl font-display font-extrabold tracking-tight ${
              isDark
                ? "bg-gradient-to-r from-primary-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent"
                : "text-saffron-gradient"
            }`}>
              Verse
            </span>
          </div>
        </button>

        {/* SEARCH - Desktop */}
        <div className="hidden md:flex flex-1 mx-2 lg:mx-6 max-w-lg">
          <div className={`relative w-full group`}>
            <Search size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDark ? "text-gray-400 group-focus-within:text-primary-300" : "text-ink-400 group-focus-within:text-saffron-600"
            } transition-colors`} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search for products, books, sacred items…"
              data-testid="header-search-input"
              className={`
                w-full pl-11 pr-4 py-2.5 rounded-full text-sm outline-none transition-all duration-300
                ${isDark
                  ? "bg-white/[0.06] border border-white/10 text-white placeholder:text-gray-500 focus:bg-white/[0.10] focus:border-primary-400/60 focus:shadow-[0_0_24px_rgba(59,130,246,0.18)]"
                  : "bg-white/80 border border-ink-200 text-ink-900 placeholder:text-ink-400 focus:bg-white focus:border-saffron-400 focus:shadow-[0_0_24px_rgba(245,158,11,0.18)]"
                }
              `}
            />
          </div>
        </div>

        {/* ICONS */}
        <div className="flex items-center justify-end gap-1 sm:gap-1.5 lg:gap-2 shrink-0">
          {/* Mobile search button */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen(o => !o)}
            data-testid="mobile-search-toggle"
            className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
              isDark
                ? "hover:bg-white/[0.08] text-gray-200"
                : "hover:bg-saffron-100/80 text-ink-700"
            }`}
            aria-label="Search"
          >
            {mobileSearchOpen ? <X size={20} /> : <Search size={20} />}
          </button>

          {/* USER ACCOUNT */}
          <div
            className="relative"
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => navigate("/profile")}
              data-testid="account-button"
              className={`
                flex items-center gap-2 p-2 lg:px-3 lg:py-2 rounded-xl transition-all duration-300
                ${isDark
                  ? "hover:bg-white/[0.08] text-gray-200"
                  : "hover:bg-saffron-100/80 text-ink-700"
                }
              `}
              aria-label="My Account"
            >
              <User size={20} />
              <span className="hidden lg:inline text-sm font-medium">My Account</span>
            </button>

            <div
              className={`
                absolute right-0 mt-3 z-50 transition-all duration-200
                ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
              `}
            >
              <AccountMenu />
            </div>
          </div>

          {/* WISHLIST */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            data-testid="wishlist-button"
            className={`p-2 rounded-xl transition-all duration-300 ${
              isDark
                ? "hover:bg-white/[0.08] text-gray-200 hover:text-pink-300"
                : "hover:bg-saffron-100/80 text-ink-700 hover:text-rose-600"
            }`}
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </button>

          {/* CART */}
          <button
            type="button"
            onClick={() => navigate("/cart")}
            data-testid="cart-button"
            className={`relative p-2 rounded-xl transition-all duration-300 ${
              isDark
                ? "hover:bg-white/[0.08] text-gray-200"
                : "hover:bg-saffron-100/80 text-ink-700"
            }`}
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span
                data-testid="cart-count-badge"
                className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold flex items-center justify-center
                  ${isDark
                    ? "bg-gradient-to-br from-primary-500 to-purple-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                    : "bg-gradient-to-br from-saffron-500 to-saffron-700 text-white shadow-[0_2px_8px_rgba(217,119,6,0.5)]"
                  }`}
              >
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className={`hidden sm:block w-px h-7 mx-1 ${isDark ? "bg-white/10" : "bg-ink-200"}`} />

          {/* THEME TOGGLE */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile search input */}
      {mobileSearchOpen && (
        <div className="md:hidden px-4 pb-3 -mt-1">
          <div className="relative">
            <Search size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${
              isDark ? "text-gray-400" : "text-ink-400"
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search…"
              data-testid="mobile-search-input"
              autoFocus
              className={`
                w-full pl-11 pr-4 py-2.5 rounded-full text-sm outline-none transition-all duration-300
                ${isDark
                  ? "bg-white/[0.06] border border-white/10 text-white placeholder:text-gray-500 focus:border-primary-400/60"
                  : "bg-white/90 border border-ink-200 text-ink-900 placeholder:text-ink-400 focus:border-saffron-400"
                }
              `}
            />
          </div>
        </div>
      )}
    </header>
  );
}
