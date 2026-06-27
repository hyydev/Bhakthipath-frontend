import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import SignUpImageCarousal from "../components/SignUpImageCarousal";
import { Heading, Text, Badge } from "../../../components/ui/";
import { useTheme } from "../../../context/ThemeContext";
import ThemeToggle from "../../../components/ThemeToggle";
import { Sparkles } from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="fixed top-5 right-5 z-50">
        <ThemeToggle />
      </div>

      <div
        data-testid="signup-card"
        className={`
          w-full max-w-6xl rounded-[36px] overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-fade-in
          ${isDark
            ? "bg-white/[0.04] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            : "bg-white/85 border border-saffron-200/60 shadow-sacred-lg backdrop-blur-2xl"
          }
        `}
      >
        <div className="relative px-8 sm:px-12 py-10 flex flex-col">
          <Badge variant="golden" size="sm" className="self-start mb-5">
            <Sparkles size={12} className="mr-1.5" />
            Join BhakthiVerse
          </Badge>

          <Heading level={3} className="mb-3 animate-slide-up">
            <span className={isDark
              ? "bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent"
              : "text-saffron-gradient"
            }>
              Hare Krishna
            </span>
          </Heading>

          <Text className="mb-8 text-ink-600 dark:text-gray-300">
            Welcome to BhakthiVerse — embark on a spiritual journey with us.
          </Text>

          <button
            type="button"
            data-testid="signup-google-button"
            className={`
              w-full py-2.5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300
              ${isDark
                ? "border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white"
                : "border border-ink-200 bg-white hover:bg-saffron-50 text-ink-800 shadow-sm hover:shadow-sacred"
              }
            `}
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-medium">Sign up with Google</span>
          </button>

          <div className="flex items-center gap-3 my-6 animate-fade-in">
            <div className={`h-px flex-1 ${isDark ? "bg-white/15" : "bg-ink-200"}`} />
            <span className={`text-xs uppercase tracking-wider ${isDark ? "text-gray-400" : "text-ink-400"}`}>or</span>
            <div className={`h-px flex-1 ${isDark ? "bg-white/15" : "bg-ink-200"}`} />
          </div>

          <SignUpForm />

          <Text className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <span
              data-testid="goto-login-link"
              className={`cursor-pointer font-semibold ${isDark ? "text-amber-300 hover:text-amber-200" : "text-saffron-700 hover:text-saffron-800"}`}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Text>
        </div>

        <div className="hidden md:block relative overflow-hidden">
          <SignUpImageCarousal />
        </div>
      </div>
    </div>
  );
}
