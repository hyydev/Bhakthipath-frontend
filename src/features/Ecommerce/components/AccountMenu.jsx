import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../auth/store";
import { logoutUser } from "../../../services/authApi";

export default function AccountMenu() {
  const navigate = useNavigate();
  const { logout, refreshToken } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logoutUser(refreshToken);
    } catch (e) {
      // ignore error, proceed to logout anyway
    }
    logout(); // Clear frontend auth state
    navigate("/login");
  };

  return (
    <div
      className="
        w-56 bg-white dark:bg-[#0f172a]
        rounded-2xl shadow-xl border border-gray-200 dark:border-amber-200
        overflow-hidden
      "
    >
      <div className="flex flex-col py-2">
        <Link
          to="/profile"
          className="px-4 py-3 text-sm text-gray-800 dark:text-amber-200
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
        >
          👤 Profile
        </Link>

        <Link
          to="/orders"
          className="px-4 py-3 text-sm text-gray-800 dark:text-amber-200
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
        >
          📦 My Orders
        </Link>

        <Link
          to="/wishlist"
          className="px-4 py-3 text-sm text-gray-800 dark:text-amber-200
                     hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
        >
          ❤️ Wishlist
        </Link>

        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

        <button
          onClick={handleLogout}
          className="px-4 py-3 text-sm text-red-600
                     hover:bg-red-50 dark:hover:bg-gray-800 transition flex items-center gap-2 text-left"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
