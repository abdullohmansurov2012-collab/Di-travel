
import React, { useEffect, useState, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  
  const blueCursorRef = useRef<HTMLDivElement>(null);
  const orangeCursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setVisible(true);
      const { clientX: x, clientY: y } = e;

      if (blueCursorRef.current && orangeCursorRef.current) {
        // Markazlashtirish: aylananing yarmi qadar surish (transform-translate orqali)
        blueCursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
        orangeCursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const onMouseDown = () => {
      setClicked(false);
      // Qisqa vaqt ichida animatsiyani qayta ishlatish uchun trick
      setTimeout(() => setClicked(true), 10);
    };
    const onMouseUp = () => setClicked(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Ko'k aylana */}
      <div 
        ref={blueCursorRef}
        className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9997]"
      >
        <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full transition-opacity duration-300
          ${clicked ? 'animate-click-burst-blue' : 'bg-blue-400/20 blur-[6px]'}`}>
        </div>
      </div>

      {/* Olovrang aylana */}
      <div 
        ref={orangeCursorRef}
        className="fixed top-0 left-0 w-0 h-0 pointer-events-none z-[9996]"
      >
        <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full transition-opacity duration-500
          ${clicked ? 'animate-click-burst-orange' : 'bg-orange-400/15 blur-[10px]'}`}>
        </div>
      </div>

      <style>{`
        @keyframes click-burst-blue {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(4); opacity: 0; filter: blur(15px); }
        }

        @keyframes click-burst-orange {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(6); opacity: 0; filter: blur(25px); }
        }

        .animate-click-burst-blue {
          animation: click-burst-blue 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          background: rgba(96, 165, 250, 0.4);
        }

        .animate-click-burst-orange {
          animation: click-burst-orange 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
          background: rgba(251, 146, 60, 0.3);
        }

        /* Standart kursor ko'rinishi saqlanadi, effektlar kursor ostida bo'ladi */
        body, a, button {
          cursor: auto !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
