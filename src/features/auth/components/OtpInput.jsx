import { useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../../context/ThemeContext";

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function OtpInput({ value, setValue }) {
  const inputs = useRef([]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "");
    const newOtp = value.split("");
    newOtp[index] = val;
    setValue(newOtp.join(""));
    if (val && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      transition={{ staggerChildren: 0.1 }}
      className="flex gap-2 sm:gap-3 justify-center mt-8"
    >
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <motion.input
            variants={item}
            key={i}
            ref={(el) => (inputs.current[i] = el)}
            type="text"
            maxLength={1}
            inputMode="numeric"
            value={value[i] || ""}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleBackspace(e, i)}
            data-testid={`otp-input-${i}`}
            className={`
              w-11 h-14 sm:w-12 sm:h-14 text-center text-xl font-display font-bold rounded-xl outline-none transition-all duration-200
              ${isDark
                ? "bg-white/[0.06] border-2 border-white/15 text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/30"
                : "bg-white border-2 border-ink-200 text-ink-900 focus:border-saffron-500 focus:ring-2 focus:ring-saffron-400/30 shadow-sm"
              }
            `}
          />
        ))}
    </motion.div>
  );
}
