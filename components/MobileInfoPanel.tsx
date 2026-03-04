import React from 'react';
import CurrencyWidget from './CurrencyWidget';
import AnalogClock from './AnalogClock';

const MobileInfoPanel: React.FC = () => {
    return (
        <div className="lg:hidden w-full px-4 mb-8 -mt-4 relative z-40 animate-fade-in-up">
            <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block sm:hidden">Vaqt:</span>
                    <AnalogClock />
                </div>
                <div className="h-[1px] w-full bg-white/10 sm:hidden"></div>
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block sm:hidden">Ma'lumotlar:</span>
                    <CurrencyWidget />
                </div>
            </div>
        </div>
    );
};

export default MobileInfoPanel;
