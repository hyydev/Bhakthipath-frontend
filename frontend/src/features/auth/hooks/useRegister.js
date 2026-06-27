import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { registerUser } from "../api/auth.api";

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,

    onSuccess: (_, variables) => {
      toast.success("OTP sent to your email");

      navigate("/otp", {
        state: {
          email: variables.email,
        },
      });
    },

    onError: (err) => {
      toast.error(err?.response?.data?.message || "Registration failed");
    },
  });

  return {
    register: mutate,
    isPending,
  };
};
