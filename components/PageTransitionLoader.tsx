import React from 'react';

interface PageTransitionLoaderProps {
    isVisible: boolean;
}

const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-[#0f172a] animate-curtain-down">

            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[80px] animate-pulse delay-700"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Animated Icon */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8">
                    <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-t-orange-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl animate-bounce-subtle">
                        ✈️
                    </div>
                </div>

                {/* Loading Text */}
                <h2 className="text-2xl md:text-4xl font-black text-white tracking-tighter italic mb-4">
                    Kuting...
                </h2>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce delay-150"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce delay-300"></div>
                </div>
            </div>

            <style>{`
        @keyframes curtain-down {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        .animate-curtain-down {
          animation: curtain-down 2.5s cubic-bezier(0.77, 0, 0.175, 1) forwards;
        }
        @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 1.5s linear infinite;
        }
        @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
            animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default PageTransitionLoader;
