import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Package, User, Heart } from "lucide-react";
import { useAuthStore } from "../../auth/auth.store";
import { useLogout } from "../../auth/hooks/useLogout";

export default function AccountMenu() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { logout, isPending } = useLogout();

  return (
    <div
      className="
        w-56 bg-white dark:bg-[#0f172a]
        rounded-xl shadow-xl border border-gray-200 dark:border-amber-200
        overflow-hidden
      "
    >
      <div className="flex flex-col py-2">
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="px-4 py-3 text-sm text-gray-800 dark:text-amber-200
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
            >
              <User size={16} /> Profile
            </Link>

            <Link
              to="/profile"
              className="px-4 py-3 text-sm text-gray-800 dark:text-amber-200
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Package size={16} /> My Orders
            </Link>

            <Link
              to="/profile"
              className="px-4 py-3 text-sm text-gray-800 dark:text-amber-200
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
            >
              <Heart size={16} /> Wishlist
            </Link>

            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

            <button
              type="button"
              onClick={() => logout()}
              disabled={isPending}
              className="px-4 py-3 text-sm text-red-600
                         hover:bg-red-50 dark:hover:bg-gray-800 transition flex items-center gap-2 text-left disabled:opacity-60"
            >
              <LogOut size={16} /> {isPending ? "Logging out..." : "Logout"}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="px-4 py-3 text-sm text-gray-800 dark:text-amber-200
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2 text-left"
            >
              <LogIn size={16} /> Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="px-4 py-3 text-sm text-gray-800 dark:text-amber-200
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2 text-left"
            >
              <User size={16} /> Create Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
