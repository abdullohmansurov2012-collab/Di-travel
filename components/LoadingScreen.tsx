import React, { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Physical "Welcome" vibration
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }

    // Exit animation trigger
    const exitTimer = setTimeout(() => setIsExiting(true), 3500); // Increased duration for better effect
    return () => clearTimeout(exitTimer);
  }, []);

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-[#060a16] z-[9999] transition-all duration-1500 ease-in-out ${isExiting ? 'opacity-0 scale-110 blur-[100px]' : 'opacity-100 scale-100 blur-0'}`}>
      {/* Background Decorative Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[1200px] h-[1200px] bg-blue-600/20 rounded-full blur-[180px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-orange-600/15 rounded-full blur-[180px] animate-pulse animation-delay-2000"></div>

      <div className="welcome-container flex flex-col items-center relative z-10 px-6">
        <div className="overflow-visible mb-6 md:mb-12 relative">
          {/* Fantasy Glow Layer */}
          <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-blue-500/30 via-fuchsia-500/30 to-orange-500/30 animate-pulse"></div>

          <h1 className="text-6xl md:text-[12rem] font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-400 to-orange-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] select-none relative z-10">
            Xush kelibsiz
          </h1>
        </div>

        {/* Multi-layered Loading Bar */}
        <div className="w-[90vw] md:w-[65vw] max-w-[900px] h-3 bg-white/5 rounded-full overflow-hidden relative border border-white/10 backdrop-blur-xl shadow-2xl">
          {/* Animated Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-fuchsia-500 via-orange-500 to-blue-500 bg-[length:200%_100%] animate-loading-slide opacity-70"></div>

          {/* Progress Progress Layer */}
          <div className="absolute inset-y-0 left-0 bg-white/40 animate-loading-progress rounded-full blur-[2px] shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>

          {/* Shine Effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 pointer-events-none"></div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="text-white/60 text-[10px] md:text-xs font-black uppercase tracking-[0.8em] animate-pulse drop-shadow-lg">
            Di Travel — Dunyo sizni kutmoqda
          </div>
          <div className="w-1.5 h-12 bg-gradient-to-b from-blue-500 to-orange-500 rounded-full animate-bounce shadow-[0_0_15px_rgba(249,115,22,0.5)]"></div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes loading-slide {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-loading-slide {
          animation: loading-slide 3s linear infinite;
        }
        @keyframes loading-progress {
          0% { width: 1%; }
          100% { width: 100%; }
        }
        .animate-loading-progress {
          animation: loading-progress 3.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
