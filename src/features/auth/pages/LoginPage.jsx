import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../auth.store";
import { useTheme } from "../../../context/ThemeContext";

import SignUpImageCarousal from "../components/SignUpImageCarousal";
import { Heading, Button, Input, Text, Badge } from "../../../components/ui/";
import ThemeToggle from "../../../components/ThemeToggle";
import { Sparkles } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isPending } = useLogin();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [formData, setFormData] = useState({
    email_or_mobile_number: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* floating theme toggle */}
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <div
        data-testid="login-card"
        className={`
          w-full max-w-6xl rounded-[36px] overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-fade-in
          ${isDark
            ? "bg-white/[0.04] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            : "bg-white/85 border border-saffron-200/60 shadow-sacred-lg backdrop-blur-2xl"
          }
        `}
      >
        {/* LEFT - form */}
        <div className="relative px-8 sm:px-12 py-10 flex flex-col">
          <Badge variant="golden" size="sm" className="self-start mb-5">
            <Sparkles size={12} className="mr-1.5" />
            Welcome
          </Badge>

          <Heading level={3} className="mb-3 animate-slide-up">
            <span className={isDark
              ? "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent"
              : "text-saffron-gradient"
            }>
              Welcome Back
            </span>
          </Heading>

          <Text className="mb-8 text-ink-600 dark:text-gray-300">
            Sign in to continue your spiritual journey.
          </Text>

          <button
            type="button"
            data-testid="login-google-button"
            className={`
              w-full py-2.5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300
              ${isDark
                ? "border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white"
                : "border border-ink-200 bg-white hover:bg-saffron-50 text-ink-800 shadow-sm hover:shadow-sacred"
              }
            `}
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-medium">Log in with Google</span>
          </button>

          <div className="flex items-center gap-3 my-6 animate-fade-in">
            <div className={`h-px flex-1 ${isDark ? "bg-white/15" : "bg-ink-200"}`} />
            <span className={`text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-ink-400"}`}>or</span>
            <div className={`h-px flex-1 ${isDark ? "bg-white/15" : "bg-ink-200"}`} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
            <Input
              type="text"
              name="email_or_mobile_number"
              placeholder="Email or Mobile Number"
              data-testid="login-identifier-input"
              value={formData.email_or_mobile_number}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              data-testid="login-password-input"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="gradient"
              size="md"
              disabled={isPending}
              data-testid="login-submit-button"
              className="w-full"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>

          <Text className="mt-6 text-center text-sm">
            New here?{" "}
            <span
              data-testid="goto-signup-link"
              className={`cursor-pointer font-semibold ${isDark ? "text-amber-300 hover:text-amber-200" : "text-saffron-700 hover:text-saffron-800"}`}
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </Text>
        </div>

        {/* RIGHT - carousel */}
        <div className="hidden md:block relative overflow-hidden">
          <SignUpImageCarousal />
        </div>
      </div>
    </div>
  );
}
