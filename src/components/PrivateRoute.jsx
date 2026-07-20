import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/auth.store";

export const PrivateRoute = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s._hasHydrated);
  if (!hasHydrated) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
 
};
