import React, { useEffect, useState } from 'react';

const AnalogClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const hoursDegree = (hours % 12) * 30 + minutes * 0.5;
    const minutesDegree = minutes * 6;
    const secondsDegree = seconds * 6;

    return (
        <div className="flex items-center gap-1.5 sm:gap-3 bg-white/5 border border-white/10 backdrop-blur-xl px-2 sm:px-4 py-1 sm:py-2 rounded-[10px] sm:rounded-2xl shadow-lg hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group">
            {/* The Clock Face */}
            <div className="relative w-7 h-7 sm:w-10 sm:h-10 rounded-full border-[1.5px] sm:border-2 border-white/20 bg-black/20 shadow-inner overflow-hidden flex items-center justify-center">
                {/* Center dot */}
                <div className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full z-10 shadow-[0_0_5px_#60a5fa]"></div>

                {/* Hour Hand */}
                <div
                    className="absolute w-[1.5px] sm:w-0.5 h-2 sm:h-3 bg-white rounded-full origin-bottom bottom-1/2 transition-transform duration-200"
                    style={{ transform: `rotate(${hoursDegree}deg)` }}
                ></div>

                {/* Minute Hand */}
                <div
                    className="absolute w-[1.5px] sm:w-0.5 h-2.5 sm:h-4 bg-slate-300 rounded-full origin-bottom bottom-1/2 transition-transform duration-200"
                    style={{ transform: `rotate(${minutesDegree}deg)` }}
                ></div>

                {/* Second Hand */}
                <div
                    className="absolute w-[1px] h-3 sm:h-4 bg-orange-500 origin-bottom bottom-1/2 transition-transform duration-[50ms]"
                    style={{ transform: `rotate(${secondsDegree}deg)` }}
                ></div>
            </div>

            {/* Digital Time & Text */}
            <div className="flex flex-col">
                <span className="hidden sm:block text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
                    Mahalliy Vaqt
                </span>
                <span className="text-[10px] sm:text-sm font-black text-white leading-none tracking-tight">
                    {time.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
                </span>
            </div>
        </div>
    );
};

export default AnalogClock;
