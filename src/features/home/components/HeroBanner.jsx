
import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/assets/Banner/gvb.jpg')`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg tracking-wide">
          Welcome to BhakthiVerse
        </h1>

        <p className="mt-4 text-xl md:text-2xl max-w-2xl text-white/90">
          Experience spirituality, devotion, and divine products delivered at your doorstep.
        </p>

        <div className="mt-8 flex gap-6">
          <button className="px-8 py-3 bg-[#6A092F] hover:bg-[#520724] transition rounded-xl text-lg font-semibold">
            Explore Now
          </button>

          <button className="px-8 py-3 border-2 border-white hover:bg-white hover:text-[#520724] transition rounded-xl text-lg font-semibold">
            View Collections
          </button>
        </div>
      </motion.div>
    </section>
  );
}
