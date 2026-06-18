import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  amount = 0.15,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: "0px 0px -60px 0px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
