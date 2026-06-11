import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { loginUser } from "../api/auth.api";
import { useAuthStore } from "../auth.store";

export const useLogin = () => {
  const navigate = useNavigate();
  
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: (res) => {
      const data = res.data.data;

      setAuth({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isVerified: data.is_verified
      });

      toast.success("Login Successfully");

      navigate("/");
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });

  return {
    login:mutate,
    isPending
  };
};
