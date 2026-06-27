import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import OtpInput from "../components/OtpInput";
import { useVerifyOtp } from "../hooks/useVerifyOtp";
import { useTheme } from "../../../context/ThemeContext";

import { Button, Badge, Card, Text, Heading } from "../../../components/ui/";
import ThemeToggle from "../../../components/ThemeToggle";
import { Sparkles } from "lucide-react";

export default function OtpPage() {
  const [otp_code, setOtp] = useState("");
  const { verifyOtp, isPending } = useVerifyOtp();
  const location = useLocation();
  const email = location.state?.email;
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyOtp({ otp_code, email });
  };

  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <Card variant="glass" hover={false} className="w-full max-w-md p-8 md:p-10">
        <div className="flex justify-center mb-6">
          <Badge variant="golden" size="md" className="animate-fade-in">
            <Sparkles size={12} className="mr-1.5" />
            OTP Verification
          </Badge>
        </div>

        <Heading level={3} className="text-center mb-2">
          <span className={isDark
            ? "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent"
            : "text-saffron-gradient"
          }>
            Verify OTP
          </span>
        </Heading>

        <Text className="text-center mb-2 text-ink-600 dark:text-gray-300">
          We've sent a 6-digit OTP to
        </Text>
        <Text className="text-center mb-6 font-semibold text-ink-900 dark:text-white">
          {email}
        </Text>

        <OtpInput value={otp_code} setValue={setOtp} />

        <Button
          variant="gradient"
          size="md"
          disabled={isPending || otp_code.length !== 6}
          onClick={handleSubmit}
          data-testid="otp-verify-button"
          className="w-full mt-10"
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </Button>

        <Text className="mt-6 text-center text-sm">
          Didn't receive OTP?{" "}
          <span
            data-testid="otp-resend-link"
            className={`cursor-pointer font-semibold hover:underline ${isDark ? "text-amber-300" : "text-saffron-700"}`}
          >
            Resend
          </span>
        </Text>
      </Card>
    </div>
  );
}
