
import React, { useEffect } from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#0b0f1a] flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-orange-600/5 rounded-full blur-[100px] animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center justify-center px-6">
        <div className="welcome-container flex flex-col items-center">
          <div className="overflow-hidden mb-4">
            <h1 className="text-6xl md:text-[10rem] font-black italic tracking-tighter shimmer-text animate-text-reveal">
              Xush kelibsiz
            </h1>
          </div>
          <div className="h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-line-expand shadow-[0_0_30px_rgba(249,115,22,0.8)]"></div>
        </div>
      </div>

      <style>{`
        .shimmer-text {
          background: linear-gradient(90deg, #fff 0%, #3b82f6 50%, #fff 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2s linear infinite;
        }

        @keyframes shimmer {
          to { background-position: 200% center; }
        }

        @keyframes text-reveal {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-text-reveal { animation: text-reveal 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }

        @keyframes line-expand {
          0% { width: 0; opacity: 0; }
          100% { width: 400px; opacity: 1; }
        }
        .animate-line-expand { animation: line-expand 1.5s ease-out forwards; }

        .welcome-container {
          animation: fade-out-zoom 1s 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        @keyframes fade-out-zoom {
          to { opacity: 0; transform: scale(1.1) translateY(-30px); filter: blur(30px); }
        }

        div.fixed {
          animation: exit-anim 4.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes exit-anim {
          0%, 85% { opacity: 1; visibility: visible; }
          100% { opacity: 0; filter: blur(50px); visibility: hidden; }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
