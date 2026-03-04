import React, { useEffect, useState } from 'react';

const CurrencyWidget: React.FC = () => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<{ temp: number; icon: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We'll use a free, public API for basic currency conversion
    // Using a reliable public endpoint for USD to UZS (fallback to a static rate if it fails)
    const fetchData = async () => {
      try {
        // Fetch Currency (Current API is reliable, Google Finance has no public API)
        const currResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const currData = await currResponse.json();
        if (currData && currData.rates && currData.rates.UZS) {
          setExchangeRate(currData.rates.UZS);
        } else {
          setExchangeRate(12850.50);
        }

        // Fetch Weather for Tashkent using Open-Meteo (Real-time and very accurate)
        const weatherResponse = await fetch('https://api.open-meteo.com/v1/forecast?latitude=41.2646&longitude=69.2163&current_weather=true');
        const weatherInfo = await weatherResponse.json();
        if (weatherInfo && weatherInfo.current_weather) {
          const code = weatherInfo.current_weather.weathercode;
          let icon = '☀️'; // default clear
          if (code >= 1 && code <= 3) icon = '⛅'; // partly cloudy
          if (code >= 45 && code <= 48) icon = '🌫️'; // fog
          if (code >= 51 && code <= 67) icon = '🌧️'; // rain
          if (code >= 71 && code <= 82) icon = '❄️'; // snow
          if (code >= 95) icon = '⛈️'; // thunderstorm

          setWeatherData({
            temp: Math.round(weatherInfo.current_weather.temperature),
            icon: icon
          });
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
    // Refresh every hour
    const interval = setInterval(fetchData, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1 sm:gap-2 lg:gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-[8px] sm:rounded-full px-1.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2">
      <div className="flex items-center gap-0.5 sm:gap-1.5 lg:gap-2">
        <span className="text-sm sm:text-lg lg:text-xl drop-shadow-md">{weatherData ? weatherData.icon : '☀️'}</span>
        <div className="flex flex-col">
          <span className="hidden sm:block text-[8px] lg:text-xs text-slate-400 font-medium leading-none mb-0.5">Toshkent</span>
          <span className="text-[9px] sm:text-xs lg:text-sm text-white font-bold leading-none">
            {loading ? '...' : (weatherData ? `+${weatherData.temp}°C` : '+25°C')}
          </span>
        </div>
      </div>

      <div className="w-[1px] h-4 sm:h-5 lg:h-6 bg-white/20 mx-0.5 sm:mx-0"></div>

      <div className="flex items-center gap-0.5 sm:gap-1.5 lg:gap-2">
        <span className="text-green-400 text-xs sm:text-sm lg:text-base font-black leading-none drop-shadow-md">$</span>
        <div className="flex flex-col">
          <span className="hidden sm:block text-[8px] lg:text-xs text-slate-400 font-medium leading-none mb-0.5">USD</span>
          <span className="text-[9px] sm:text-xs lg:text-sm text-white font-bold leading-none">
            {loading ? '...' : (exchangeRate ? exchangeRate.toLocaleString('uz-UZ') : '12 850')} <span className="hidden lg:inline">so'm</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyWidget;
