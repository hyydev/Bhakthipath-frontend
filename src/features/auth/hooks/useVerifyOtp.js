import { useMutation } from "@tanstack/react-query";
import {  useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { verifyOTP } from "../api/auth.api";

export const useVerifyOtp = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOTP,

    onSuccess: (_, variables) => {
      toast.success("Email verified successfully");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Invalid Otp");
    },
  });

  return { verifyOtp: mutate, isPending };
};
