import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logoutUser } from "../api/auth.api";
import { useAuthStore } from "../auth.store";

export const useLogout = () => {
  const navigate = useNavigate();

  const clearlogout = useAuthStore((state) => state.logout);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      logoutUser({
        refresh_token: refreshToken,
      }),

    onSuccess: () => {
      clearlogout();
      toast.success("Logged out successfully");
      navigate("/login");
    },

    onError: () => {
      clearlogout();
      toast.error("Logout failed");
      navigate("/login");
    },
  });
  return { logout: mutate, isPending };
};
