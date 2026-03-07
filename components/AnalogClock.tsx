import React, { useEffect, useState } from 'react';

const AnalogClock: React.FC<{ size?: number }> = ({ size = 40 }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secDegrees = (seconds / 60) * 360;
    const minDegrees = ((minutes + seconds / 60) / 60) * 360;
    const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

    return (
        <div
            className="relative flex items-center justify-center rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.3)] overflow-hidden"
            style={{ width: size, height: size }}
        >
            {/* Clock Face Marks */}
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-0.5 h-1.5 bg-white/40"
                    style={{
                        transform: `rotate(${i * 30}deg) translateY(-${size * 0.42}px)`,
                    }}
                />
            ))}

            {/* Hour Hand */}
            <div
                className="absolute bg-orange-500 rounded-full origin-bottom z-10"
                style={{
                    width: size * 0.08,
                    height: size * 0.25,
                    bottom: '50%',
                    transform: `rotate(${hourDegrees}deg)`,
                    transition: 'transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
                }}
            />

            {/* Minute Hand */}
            <div
                className="absolute bg-blue-400 rounded-full origin-bottom z-20"
                style={{
                    width: size * 0.06,
                    height: size * 0.35,
                    bottom: '50%',
                    transform: `rotate(${minDegrees}deg)`,
                    transition: 'transform 0.5s cubic-bezier(0.4, 2.08, 0.55, 0.44)',
                }}
            />

            {/* Second Hand */}
            <div
                className="absolute bg-white/80 rounded-full origin-bottom z-30"
                style={{
                    width: size * 0.03,
                    height: size * 0.42,
                    bottom: '50%',
                    transform: `rotate(${secDegrees}deg)`,
                    transition: 'transform 0.1s linear',
                }}
            />

            {/* Center Pin */}
            <div className="absolute w-2 h-2 bg-white rounded-full border border-orange-500 z-40 shadow-sm" />
        </div>
    );
};

export default AnalogClock;
