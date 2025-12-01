import { useRef } from "react";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export default function OtpInput({ value, setValue }) {
  const inputs = useRef([]);

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
      className="flex gap-3 justify-center mt-8"
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
            value={value[i] || ""}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleBackspace(e, i)}
            className="w-12 h-14 border-2 border-purple text-center text-xl font-bold rounded-xl focus:ring-2 focus:ring-purple outline-none"
          />
        ))}
    </motion.div>
  );
}
