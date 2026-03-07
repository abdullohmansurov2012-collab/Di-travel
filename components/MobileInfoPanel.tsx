import React from 'react';
import CurrencyWidget from './CurrencyWidget';
import AnalogClock from './AnalogClock';
import DataChart from './DataChart';

const MobileInfoPanel: React.FC = () => {
    const currencyData = [
        { label: '01.03', value: 12810 },
        { label: '02.03', value: 12825 },
        { label: '03.03', value: 12845 },
        { label: '04.03', value: 12830 },
        { label: '05.03', value: 12855 },
        { label: '06.03', value: 12870 },
        { label: 'BUGUN', value: 12892 }
    ];

    const weatherData = [
        { label: '06:00', value: 12 },
        { label: '09:00', value: 16 },
        { label: '12:00', value: 22 },
        { label: '15:00', value: 25 },
        { label: '18:00', value: 21 },
        { label: '21:00', value: 15 },
        { label: 'HOZIR', value: 14 }
    ];

    return (
        <div className="lg:hidden w-full px-4 mb-8 -mt-4 relative z-40 animate-fade-in-up">
            <div className="bg-[#0f172a]/95 backdrop-blur-2xl border border-white/5 rounded-[40px] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.7)] flex flex-col items-center gap-10">
                <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-8">
                    <div className="flex items-center gap-5 w-full sm:w-auto justify-between sm:justify-start bg-white/5 p-4 rounded-3xl border border-white/10 shadow-lg">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">Toshkent</span>
                            <span className="text-white text-xs font-bold opacity-60 uppercase tracking-widest hidden sm:block">Mahalliy Vaqt</span>
                        </div>
                        <AnalogClock size={60} />
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                        <CurrencyWidget />
                    </div>
                </div>

                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                {/* Analytics Section */}
                <div className="w-full flex flex-col gap-12">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-black text-blue-400/80 uppercase tracking-[0.4em] mb-2">Bozor Dinamikasi</span>
                        <DataChart
                            title="USD/UZS: Oxirgi 7 kun"
                            data={currencyData}
                            color="#3b82f6"
                            unit=" so'm"
                        />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-black text-orange-400/80 uppercase tracking-[0.4em] mb-2">Ob-havo Trendi</span>
                        <DataChart
                            title="Bugungi harorat balansi"
                            data={weatherData}
                            color="#f97316"
                            unit="°C"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileInfoPanel;
