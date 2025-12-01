import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { verifyOTP } from "../api";

import OtpInput from "../components/OtpInput";
import MotionButton from "../../../components/MotionButton";

import { Button, Badge, Card, Text } from "../../../components/ui/";

export default function OtpPage() {
  const [otp_code, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp_code.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }
    try {
      await verifyOTP({ otp_code });
      toast.success("OTP Verified Successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Invalid OTP!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* OUTER GLASS CARD */}
      <Card
        variant="glass"
        className="w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        {/* Golden Badge */}
        <div className="flex justify-center mb-6">
          <Badge variant="golden" size="lg" className="mb-6 animate-fade-in">
            ✨ OTP Verification
          </Badge>
        </div>

        <h1
          className="text-4xl  font-extrabold text-center mb-2  bg-gradient-to-r 
            from-blue-600 
            to-indigo-600 
            dark:from-amber-300 
            dark:via-amber-400 
            dark:to-amber-600 
            bg-clip-text 
            text-transparent
            font-body"
        >
          Verify OTP
        </h1>

        <Text className="mt-2 text-lg text-center mb-6">
          We have sent a 6-digit OTP to your email/mobile.
        </Text>

        {/* OTP INPUT BOXES */}
        <OtpInput value={otp_code} setValue={setOtp} />

        <Button
          variant="gradient"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-600 text-white py-3 rounded-xl mt-10 text-sm font-semibold shadow-lg hover:scale-[1.02] transition"
        >
          Verify OTP
        </Button>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Didn’t receive OTP?{" "}
          <span className="text-amber-600 dark:text-amber-300 cursor-pointer font-medium hover:underline">
            Resend
          </span>
        </p>
      </Card>
    </div>
  );
}
