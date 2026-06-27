import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSmoothScroll } from '../app/SmoothScrollProvider';

export default function BackgroundWrapper({ children }) {
  const { theme } = useTheme();
  const { lenis } = useSmoothScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const scrollYRef = useRef(0);
  const rafRef = useRef(null);
  const isRafScheduledRef = useRef(false);

  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const blob4Ref = useRef(null);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll parallax
  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      isRafScheduledRef.current = false;
      const y = scrollYRef.current;
      if (blob1Ref.current?.parentElement) blob1Ref.current.parentElement.style.transform = `translateY(${y * 0.1}px)`;
      if (blob3Ref.current?.parentElement) blob3Ref.current.parentElement.style.transform = `translateY(${y * 0.3}px)`;
      if (blob4Ref.current?.parentElement) blob4Ref.current.parentElement.style.transform = `translateY(${y * 0.5}px)`;
    };

    const schedule = () => {
      if (isRafScheduledRef.current) return;
      isRafScheduledRef.current = true;
      rafRef.current = window.requestAnimationFrame(update);
    };

    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
    if (isSmallScreen) return;

    if (lenis) {
      const onScroll = ({ scroll }) => {
        scrollYRef.current = scroll;
        schedule();
      };
      lenis.on('scroll', onScroll);
      return () => {
        lenis.off('scroll', onScroll);
        if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      };
    }

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      schedule();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [lenis]);

  // Mouse-tracking transforms on blobs
  useEffect(() => {
    const applyTransform = (ref, multiplier) => {
      if (ref.current) {
        const offsetX = mousePosition.x * 30 * multiplier;
        const offsetY = mousePosition.y * 30 * multiplier;
        ref.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }
    };
    applyTransform(blob1Ref, 0.5);
    applyTransform(blob2Ref, 0.3);
    applyTransform(blob3Ref, 0.4);
    applyTransform(blob4Ref, 0.6);
  }, [mousePosition]);

  const isDark = theme === 'dark';

  // ---- Light: Sacred Ivory + Saffron / Dark: Deep Navy ----
  const bgGradient = isDark
    ? 'bg-gradient-to-b from-[#0A1628] via-[#0f1a2e] to-[#1a2332]'
    : 'bg-gradient-to-b from-[#FFFCF5] via-[#FBF7EE] to-[#F5EEDD]';

  const gridColor = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(180, 83, 9, 0.06)';
  const gridSpacing = 40;

  const blob1Color = isDark ? '#3B82F6' : '#FBBF24'; // gold
  const blob2Color = isDark ? '#8B5CF6' : '#FB923C'; // saffron orange
  const blob3Color = isDark ? '#06B6D4' : '#F472B6'; // soft rose (subtle warmth)
  const blob4ColorFrom = isDark ? '#3B82F6' : '#FCD34D'; // light gold
  const blob4ColorTo = isDark ? '#8B5CF6' : '#FB923C';   // saffron

  const radialGlowCenter = isDark
    ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_50%)]'
    : 'bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.18)_0%,transparent_55%)]';

  const radialGlowTop = isDark
    ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_40%)]'
    : 'bg-[radial-gradient(circle_at_50%_0%,rgba(251,146,60,0.20)_0%,transparent_45%)]';

  const vignetteColor = isDark
    ? 'rgba(10,22,40,0.4)'
    : 'rgba(251, 247, 238, 0.55)';

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-500 ${bgGradient}`}>
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-60 pointer-events-none z-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width={gridSpacing} height={gridSpacing} patternUnits="userSpaceOnUse">
              <path
                d={`M ${gridSpacing} 0 L 0 0 0 ${gridSpacing}`}
                fill="none"
                stroke={gridColor}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Mandala accent - light theme only, subtle */}
      {!isDark && (
        <div
          aria-hidden
          className="absolute top-[8%] right-[6%] w-[320px] h-[320px] opacity-[0.06] pointer-events-none animate-mandala"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23B45309' stroke-width='1.2'%3E%3Ccircle cx='100' cy='100' r='95'/%3E%3Ccircle cx='100' cy='100' r='78'/%3E%3Ccircle cx='100' cy='100' r='62'/%3E%3Ccircle cx='100' cy='100' r='42'/%3E%3Ccircle cx='100' cy='100' r='22'/%3E%3Cg transform='translate(100 100)'%3E%3Cg%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(30)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(60)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(90)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(120)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(150)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(180)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(210)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(240)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(270)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(300)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3Cg transform='rotate(330)'%3E%3Cpath d='M0 -95 L8 -78 L0 -85 L-8 -78 Z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
      {!isDark && (
        <div
          aria-hidden
          className="absolute bottom-[6%] left-[4%] w-[260px] h-[260px] opacity-[0.05] pointer-events-none animate-mandala"
          style={{
            animationDirection: 'reverse',
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cg fill='none' stroke='%23D97706' stroke-width='1'%3E%3Ccircle cx='100' cy='100' r='90'/%3E%3Ccircle cx='100' cy='100' r='70'/%3E%3Ccircle cx='100' cy='100' r='50'/%3E%3Ccircle cx='100' cy='100' r='30'/%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}

      {/* Parallax Background Blobs - Far Layer */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{ transform: `translateY(0px)`, transition: 'transform 0.1s ease-out' }}>
        <div
          ref={blob1Ref}
          className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] animate-float-slow"
          style={{
            backgroundColor: blob1Color,
            opacity: isDark ? 0.2 : 0.28,
            transition: 'background-color 0.5s, opacity 0.5s, transform 0.3s ease-out',
          }}
        />
        <div
          ref={blob2Ref}
          className="absolute top-[5%] right-[-8%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-medium"
          style={{
            backgroundColor: blob2Color,
            opacity: isDark ? 0.25 : 0.22,
            transition: 'background-color 0.5s, opacity 0.5s, transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Parallax Middle Layer */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{ transform: `translateY(0px)`, transition: 'transform 0.1s ease-out' }}>
        <div
          ref={blob3Ref}
          className="absolute bottom-[10%] left-[5%] w-[550px] h-[550px] rounded-full blur-[140px] animate-float-fast"
          style={{
            backgroundColor: blob3Color,
            opacity: isDark ? 0.2 : 0.14,
            transition: 'background-color 0.5s, opacity 0.5s, transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Parallax Near Layer */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500" style={{ transform: `translateY(0px)`, transition: 'transform 0.1s ease-out' }}>
        <div
          ref={blob4Ref}
          className="absolute bottom-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full blur-[150px] animate-float-slow-reverse"
          style={{
            background: `linear-gradient(to bottom right, ${blob4ColorFrom}, ${blob4ColorTo})`,
            opacity: isDark ? 0.15 : 0.20,
            transition: 'background 0.5s, opacity 0.5s, transform 0.3s ease-out',
          }}
        />
      </div>

      {/* Radial Glow Effect - Center */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${radialGlowCenter}`} />

      {/* Radial Glow Effect - Top */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${radialGlowTop}`} />

      {/* Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle Vignette */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, ${vignetteColor} 100%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
