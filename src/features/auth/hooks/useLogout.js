import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logoutUser } from "../api/auth.api";
import { useAuthStore } from "../auth.store";
import { useCartStore } from "../../EcommerceCart/cart.store";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const clearlogout = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const clearCartStore = useCartStore((state) => state.clearCartStore);
  const performLogout = () => {
    clearlogout(); 
    clearCartStore(); 
    queryClient.clear(); 
 
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      logoutUser({
        refresh_token: refreshToken,
      }),

    onSuccess: () => {
      performLogout();
      toast.success("Logged out successfully");
      navigate("/login");
    },

    onError: () => {
      performLogout();
      toast.error("Logout failed");
      navigate("/login");
    },
  });
  return { logout: mutate, isPending };
};
