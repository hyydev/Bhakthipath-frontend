import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export default function BackgroundWrapper({ children }) {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const blob4Ref = useRef(null);

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll tracking for parallax
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply mouse tracking to blobs
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

  // Theme-specific styles
  const isDark = theme === 'dark';
  
  const bgGradient = isDark
    ? 'bg-gradient-to-b from-[#0A1628] via-[#0f1a2e] to-[#1a2332]'
    : 'bg-gradient-to-b from-[#F7FAFF] via-[#FFFFFF] to-[#F0F4F9]';

  const gridColor = 'rgba(255,255,255,0.28)'; // Pure white, high opacity for sharpness
  const gridSpacing = 36; // Dense grid, try 32, 36, or 40

  const blob1Color = isDark ? '#3B82F6' : '#93C5FD';
  const blob2Color = isDark ? '#8B5CF6' : '#C4B5FD';
  const blob3Color = isDark ? '#06B6D4' : '#67E8F9';
  const blob4ColorFrom = isDark ? '#3B82F6' : '#93C5FD';
  const blob4ColorTo = isDark ? '#8B5CF6' : '#C4B5FD';

  const radialGlowCenter = isDark
    ? 'bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08)_0%,transparent_50%)]'
    : 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15)_0%,transparent_50%)]';

  const radialGlowTop = isDark
    ? 'bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.15)_0%,transparent_40%)]'
    : 'bg-[radial-gradient(circle_at_50%_0%,rgba(147,197,253,0.25)_0%,transparent_40%)]';

  const vignetteColor = isDark
    ? 'rgba(10,22,40,0.4)'
    : 'rgba(247,250,255,0.6)';

  return (
    <div className={`relative min-h-screen w-full overflow-hidden transition-colors duration-500 ${bgGradient}`}>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-10">
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

      {/* Parallax Background Blobs - Far Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div
          ref={blob1Ref}
          className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] animate-float-slow"
          style={{ 
            backgroundColor: blob1Color,
            opacity: isDark ? 0.2 : 0.3,
            transition: 'background-color 0.5s, opacity 0.5s, transform 0.3s ease-out'
          }}
        />
        
        <div
          ref={blob2Ref}
          className="absolute top-[5%] right-[-8%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-medium"
          style={{ 
            backgroundColor: blob2Color,
            opacity: isDark ? 0.25 : 0.35,
            transition: 'background-color 0.5s, opacity 0.5s, transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Parallax Middle Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div
          ref={blob3Ref}
          className="absolute bottom-[10%] left-[5%] w-[550px] h-[550px] rounded-full blur-[140px] animate-float-fast"
          style={{ 
            backgroundColor: blob3Color,
            opacity: isDark ? 0.2 : 0.3,
            transition: 'background-color 0.5s, opacity 0.5s, transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Parallax Near Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div
          ref={blob4Ref}
          className="absolute bottom-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full blur-[150px] animate-float-slow-reverse"
          style={{ 
            background: `linear-gradient(to bottom right, ${blob4ColorFrom}, ${blob4ColorTo})`,
            opacity: isDark ? 0.15 : 0.25,
            transition: 'background 0.5s, opacity 0.5s, transform 0.3s ease-out'
          }}
        />
      </div>

      {/* Radial Glow Effect - Center */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${radialGlowCenter}`} />

      {/* Radial Glow Effect - Top */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${radialGlowTop}`} />

      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.008] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')",
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Subtle Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, transparent 0%, ${vignetteColor} 100%)`
        }}
      />

      {/* Content Container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}