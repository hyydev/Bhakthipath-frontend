import { motion } from "framer-motion";

export default function MotionButton({ children, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}
