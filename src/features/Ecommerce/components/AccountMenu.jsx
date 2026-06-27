import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Package, User, Heart } from "lucide-react";
import { useAuthStore } from "../../auth/auth.store";
import { useLogout } from "../../auth/hooks/useLogout";
import { useTheme } from "../../../context/ThemeContext";

export default function AccountMenu() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { logout, isPending } = useLogout();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    logout();
  };

  const itemBase = isDark
    ? "px-4 py-2.5 text-sm text-gray-200 hover:bg-white/[0.06] hover:text-white transition flex items-center gap-3"
    : "px-4 py-2.5 text-sm text-ink-700 hover:bg-saffron-50 hover:text-saffron-800 transition flex items-center gap-3";

  return (
    <div
      data-testid="account-menu"
      className={`
        w-60 rounded-2xl overflow-hidden
        ${isDark
          ? "bg-[#0f1a2e]/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          : "bg-white/95 border border-saffron-200/60 shadow-sacred-lg backdrop-blur-xl"
        }
      `}
    >
      {/* Header strip */}
      <div className={`px-4 py-3 border-b
        ${isDark
          ? "border-white/10 bg-gradient-to-r from-primary-500/15 via-purple-500/10 to-transparent"
          : "border-saffron-200/60 bg-gradient-to-r from-saffron-100 via-gold-50 to-transparent"
        }`}>
        <p className={`text-[10px] uppercase tracking-[0.18em] font-semibold
          ${isDark ? "text-amber-200" : "text-saffron-700"}`}>
          {isAuthenticated ? "Welcome back" : "Account"}
        </p>
        <p className={`text-sm font-display font-semibold mt-0.5
          ${isDark ? "text-white" : "text-ink-900"}`}>
          {isAuthenticated ? "My Profile" : "Sign in or join us"}
        </p>
      </div>

      <div className="flex flex-col py-2">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className={itemBase} data-testid="menu-profile-link">
              <User size={16} /> Profile
            </Link>
            <Link to="/profile" className={itemBase} data-testid="menu-orders-link">
              <Package size={16} /> My Orders
            </Link>
            <Link to="/profile" className={itemBase} data-testid="menu-wishlist-link">
              <Heart size={16} /> Wishlist
            </Link>

            <div className={`my-1 mx-2 border-t ${isDark ? "border-white/10" : "border-ink-100"}`} />

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              data-testid="menu-logout-button"
              className={`px-4 py-2.5 text-sm transition flex items-center gap-3 text-left disabled:opacity-60
                ${isDark
                  ? "text-red-300 hover:bg-red-500/10 hover:text-red-200"
                  : "text-red-600 hover:bg-red-50 hover:text-red-700"
                }`}
            >
              <LogOut size={16} />
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => navigate("/login")}
              data-testid="menu-login-button"
              className={`${itemBase} text-left`}
            >
              <LogIn size={16} /> Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              data-testid="menu-signup-button"
              className={`${itemBase} text-left`}
            >
              <User size={16} /> Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
