import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { loginUser } from "../api/auth.api";
import { useAuthStore } from "../auth.store";
import { decodeJWT } from '../../../lib/utils'

export const useLogin = () => {
  const navigate = useNavigate();
  
  const setAuth = useAuthStore((state) => state.setAuth);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: (res) => {
      const data = res.data.data;
      const decoded = decodeJWT(data.access_token)

      setAuth({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        isVerified: data.is_verified,
        userId: decoded?.user_id,
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
