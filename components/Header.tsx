import React, { useState, useEffect, useRef } from 'react';
import CurrencyWidget from './CurrencyWidget';
import AnalogClock from './AnalogClock';

const Header: React.FC = () => {
  const jotformLink = "https://form.jotform.com/252562510968058";
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Interactive State
  const [isPressed, setIsPressed] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [btnTransform, setBtnTransform] = useState({ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updateInteraction = (e: React.PointerEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / 5;
    const deltaY = (y - centerY) / 5;

    setGlowPos({ x, y });
    setBtnTransform({
      x: deltaX,
      y: deltaY,
      scale: 1.15,
      rotate: deltaX * 0.3,
      skewX: deltaX * 0.1
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPressed(true);
    updateInteraction(e);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(300);
    }
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    setBtnTransform({ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPressed) updateInteraction(e);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[9999] px-2 md:px-4 lg:px-12 pt-2 md:pt-4 lg:pt-6 pointer-events-none">
      <div
        ref={headerRef}
        className={`w-full max-w-[95%] lg:max-w-7xl mx-auto relative group pointer-events-auto transition-all duration-700 ${scrolled ? 'scale-95 translate-y-[-5px]' : 'scale-100'}`}
      >
        <div className={`absolute inset-0 transition-all duration-700 rounded-[25px] md:rounded-[40px] lg:rounded-[55px] border border-white/20 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden ${scrolled ? 'bg-white/20 backdrop-blur-[40px]' : 'bg-white/10 backdrop-blur-[30px]'}`}>
          <div className="absolute -top-32 -left-32 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[80px] animate-liquid-subtle"></div>
          <div className="absolute -bottom-32 -right-32 w-[300px] h-[300px] bg-orange-500/15 rounded-full blur-[80px] animate-liquid-subtle-reverse"></div>
        </div>

        <div className="relative flex justify-between items-center h-12 sm:h-14 md:h-16 lg:h-20 px-1 sm:px-3 md:px-6 lg:px-12 w-full">
          <div className="flex items-center flex-shrink-0 gap-2 sm:gap-4 lg:gap-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tighter flex items-center gap-2 sm:gap-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-400 to-orange-400 italic select-none animate-gradient-x whitespace-nowrap drop-shadow-sm">
                Di Travel
              </span>
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-orange-500 shadow-[0_0_15px_5px_rgba(249,115,22,0.6)] animate-pulse hidden sm:block"></span>
            </h1>
            <div className="flex lg:hidden scale-90 sm:scale-100">
              <AnalogClock size={32} />
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 flex-shrink-0 overflow-hidden">
            <CurrencyWidget />
          </div>

          <div className="flex items-center flex-shrink-0">
            <a
              ref={btnRef}
              href={jotformLink}
              target="_blank"
              rel="noopener noreferrer"
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onPointerMove={handlePointerMove}
              style={{
                transform: `translate(${btnTransform.x}px, ${btnTransform.y}px) scale(${btnTransform.scale}) rotate(${btnTransform.rotate}deg) skewX(${btnTransform.skewX}deg)`,
                transition: isPressed ? 'none' : 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              className="relative overflow-hidden px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-3.5 rounded-[15px] sm:rounded-2xl lg:rounded-xl font-black uppercase tracking-[0.05em] sm:tracking-[0.1em] lg:tracking-[0.15em] transition-all duration-300 flex items-center justify-center bg-orange-500 text-white shadow-2xl group/btn cursor-pointer touch-none whitespace-nowrap flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600"></div>

              <div
                className={`absolute pointer-events-none transition-opacity duration-300 ${isPressed ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  left: glowPos.x,
                  top: glowPos.y,
                  width: '220px',
                  height: '220px',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 75%)',
                  transform: 'translate(-50%, -50%)',
                  mixBlendMode: 'overlay',
                  filter: 'blur(10px)',
                  zIndex: 15
                }}
              ></div>

              <span className="relative z-20 whitespace-nowrap select-none text-white font-black text-[10px] sm:text-xs lg:text-sm">Ariza qoldirish</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes liquid-subtle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.15); }
        }
        @keyframes liquid-subtle-reverse {
          0%, 100% { transform: translate(0, 0) scale(1.15); }
          50% { transform: translate(-30px, 30px) scale(1); }
        }
        .animate-liquid-subtle { animation: liquid-subtle 10s infinite ease-in-out; }
        .animate-liquid-subtle-reverse { animation: liquid-subtle-reverse 12s infinite ease-in-out; }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
