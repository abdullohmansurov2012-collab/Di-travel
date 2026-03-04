import React, { useState, useEffect } from 'react';

const ScrollProgressBar: React.FC = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${(totalScroll / windowHeight) * 100}%`;
            setScrollProgress(Number((totalScroll / windowHeight) * 100));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[3px] md:h-[4px] z-[100000] bg-transparent pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-orange-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)] transition-all duration-150 ease-out"
                style={{ width: `${scrollProgress}%` }}
            >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,1)]"></div>
            </div>
        </div>
    );
};

export default ScrollProgressBar;
