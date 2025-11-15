import { useState, useEffect } from "react";
import img1 from "../../../assets/Auth/harekrishna.jpeg";
import img2 from "../../../assets/Auth/lotusfeet.jpeg";
import img3 from "../../../assets/Auth/madhav.jpeg";


export default function SignUpImageCarousal() {
  const slides = [
   img1,
   img2,
   img3,
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 5 sec
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goNext = () => setIndex((index + 1) % slides.length);
  const goPrev = () => setIndex((index - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-full overflow-hidden min-h-[400px] ">

      {/* Slides */}
      {slides.map((img, i) => (
        <img
          key={i}
          src={img}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-in-out 
          ${i === index ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70 pointer-events-none"></div>

      {/* TEXT */}
      <div className="absolute bottom-16 left-10 text-white z-20">
        <p className="text-lg font-medium mb-2">Largest Space Community</p>
        <h2 className="text-3xl font-bold leading-snug max-w-sm">
          Go anywhere you want in a Galaxy full of wonders!
        </h2>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition 
              ${index === i ? "bg-white" : "bg-white/50"}`}
          ></div>
        ))}
      </div>

      {/* Arrow Buttons */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 
        backdrop-blur-sm px-3 py-2 rounded-full z-20"
      >
        ❮
      </button>

      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/20 hover:bg-white/40 
        backdrop-blur-sm px-3 py-2 rounded-full z-20"
      >
        ❯
      </button>

    </div>
  );
}
