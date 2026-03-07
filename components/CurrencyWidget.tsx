import React, { useEffect, useState } from 'react';

const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 40;
  const height = 15;
  const points = data.map((val, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - ((val - min) / range) * height
  }));

  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;

  return (
    <svg width={width} height={height} className="overflow-visible ml-1">
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-pulse"
      />
    </svg>
  );
};

const CurrencyWidget: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<{ temp: number; icon: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [rateHistory, setRateHistory] = useState<number[]>([12845, 12848, 12852, 12850, 12851, 12853]);
  const [tempHistory, setTempHistory] = useState<number[]>([22, 23, 25, 24, 26, 25]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const currData = await currResponse.json();
        if (currData && currData.rates && currData.rates.UZS) {
          const newRate = currData.rates.UZS;
          setExchangeRate(newRate);
          setRateHistory(prev => [...prev.slice(1), newRate]);
        } else {
          setExchangeRate(12850.50);
        }

        const weatherResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.2646&longitude=69.2163&current_weather=true');
        const weatherInfo = await weatherResponse.json();
        if (weatherInfo && weatherInfo.current_weather) {
          const code = weatherInfo.current_weather.weathercode;
          const temp = Math.round(weatherInfo.current_weather.temperature);
          let icon = '☀️';
          if (code >= 1 && code <= 3) icon = '⛅';
          if (code >= 45 && code <= 48) icon = '🌫️';
          if (code >= 51 && code <= 67) icon = '🌧️';
          if (code >= 71 && code <= 82) icon = '❄️';
          if (code >= 95) icon = '⛈️';

          setWeatherData({ temp, icon });
          setTempHistory(prev => [...prev.slice(1), temp]);
        }
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error);
        setExchangeRate(12850.50);
        setWeatherData({ temp: 25, icon: '☀️' });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-[12px] sm:rounded-full px-2 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3">
      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-base sm:text-xl lg:text-2xl drop-shadow-md">{weatherData ? weatherData.icon : '☀️'}</span>
        <div className="flex flex-col">
          <span className="hidden sm:block text-[8px] lg:text-xs text-slate-400 font-medium leading-none mb-0.5">Toshkent</span>
          <div className="flex items-center">
            <span className="text-xs sm:text-sm lg:text-base text-white font-bold leading-none">
              {loading ? '...' : (weatherData ? `+${weatherData.temp}°C` : '+25°C')}
            </span>
            {!loading && <Sparkline data={tempHistory} color="#fca311" />}
          </div>
        </div>
      </div>

      <div className="w-[1px] h-6 sm:h-8 lg:h-10 bg-white/20 mx-1 sm:mx-2"></div>

      <div className="flex items-center gap-1 sm:gap-2">
        <span className="text-green-400 text-sm sm:text-lg lg:text-xl font-black leading-none drop-shadow-md">$</span>
        <div className="flex flex-col">
          <span className="hidden sm:block text-[8px] lg:text-xs text-slate-400 font-medium leading-none mb-0.5">USD</span>
          <div className="flex items-center">
            <span className="text-xs sm:text-sm lg:text-base text-white font-bold leading-none">
              {loading ? '...' : (exchangeRate ? exchangeRate.toLocaleString('uz-UZ') : '12 850')}
            </span>
            {!loading && <Sparkline data={rateHistory} color="#4ade80" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyWidget;
