import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const SmoothScrollContext = createContext(null);

const DEFAULT_OFFSET = -128;


export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
      anchors: {
        offset: DEFAULT_OFFSET,
      },
      allowNestedScroll: true,
    });

    lenisRef.current = instance;
    setLenis(instance);

    const handleMotionChange = (event) => {
      if (event.matches) {
        instance.destroy();
        lenisRef.current = null;
        setLenis(null);
      }
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback((target, options = {}) => {
    const instance = lenisRef.current;
    const { offset = DEFAULT_OFFSET, ...rest } = options;

    if (instance) {
      instance.scrollTo(target, { offset, ...rest });
      return;
    }

    if (typeof target === "number") {
      window.scrollTo({ top: Math.max(target + offset, 0), behavior: "smooth" });
      return;
    }

    const element =
      typeof target === "string" ? document.querySelector(target) : target;

    if (element) {
      const top =
        element.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext);

  if (!context) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }

  return context;
}
