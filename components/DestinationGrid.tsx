
import React, { useState, useRef } from 'react';
import { Destination } from '../types';

const DESTINATIONS: Destination[] = [
  {
    id: 'tashkent',
    name: 'Toshkent',
    country: 'O\'zbekiston',
    description: 'Zamonaviy megapolis va qadimiy tarix uyg\'unligi. Poytaxtning betakror muhiti.',
    image: '/images/tashkent.png',
    rating: 4.8,
    price: '$50-100/kun',
    category: 'city',
    recommendedDuration: '2-3 kun',
    attractions: ['Chorsu bozori', 'Hazrati Imom', 'Magic City', 'Toshkent City']
  },
  {
    id: 'samarkand',
    name: 'Samarqand',
    country: 'O\'zbekiston',
    description: 'Buyuk Ipak yo\'lining yuragi, moviy gumbazlar va Amir Temur saltanati poytaxti.',
    image: '/images/samarkand.png',
    rating: 4.9,
    price: '$40-80/kun',
    category: 'culture',
    recommendedDuration: '2-3 kun',
    attractions: ['Registon', 'Go\'ri Amir', 'Shohi Zinda', 'Bibixonim']
  },
  {
    id: 'bukhara',
    name: 'Buxoro',
    country: 'O\'zbekiston',
    description: 'Ochiq osmon ostidagi muzey. Qadimiy islom madaniyati va ilm-fan markazi.',
    image: '/images/bukhara.png',
    rating: 4.9,
    price: '$40-80/kun',
    category: 'culture',
    recommendedDuration: '2-3 kun',
    attractions: ['Poi Kalon', 'Ark Qal\'asi', 'Labi Hovuz', 'Ismoil Somoniy']
  },
  {
    id: 'khiva',
    name: 'Xiva',
    country: 'O\'zbekiston',
    description: 'Ming yillik tarixga ega ertaknamo shahar. Ichan Qala mo\'jizalari.',
    image: '/images/samarkand.png', // Fallback to samarkand image due to AI limit for the 7th generated image
    rating: 4.8,
    price: '$30-70/kun',
    category: 'culture',
    recommendedDuration: '1-2 kun',
    attractions: ['Ichan Qala', 'Kalta Minor', 'Juma Masjidi', 'Tosh Hovli']
  }
];

const categoryLabels: Record<string, { label: string; color: string }> = {
  culture: { label: 'Tarixiy', color: 'bg-amber-100 text-amber-700' },
  beach: { label: 'Plyaj', color: 'bg-cyan-100 text-cyan-700' },
  city: { label: 'Shahar', color: 'bg-blue-100 text-blue-700' },
  adventure: { label: 'Sarguzasht', color: 'bg-orange-100 text-orange-700' },
};

const InteractiveButton = ({ children, className }: any) => {
  const [isPressed, setIsPressed] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [btnTransform, setBtnTransform] = useState({ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const updateInteraction = (e: React.PointerEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / 8;
    const deltaY = (y - centerY) / 8;

    setGlowPos({ x, y });
    setBtnTransform({
      x: deltaX,
      y: deltaY,
      scale: 1.05,
      rotate: deltaX * 0.3,
      skewX: deltaX * 0.1
    });
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPressed(true);
    updateInteraction(e);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    setBtnTransform({ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPressed) updateInteraction(e);
  };

  return (
    <button
      ref={ref}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={{
        transform: `translate(${btnTransform.x}px, ${btnTransform.y}px) scale(${btnTransform.scale}) rotate(${btnTransform.rotate}deg) skewX(${btnTransform.skewX}deg)`,
        transition: isPressed ? 'none' : 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      className={`${className} relative overflow-hidden transition-all duration-300 touch-none whitespace-nowrap`}
    >
      <div
        className={`absolute pointer-events-none transition-opacity duration-300 ${isPressed ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: glowPos.x,
          top: glowPos.y,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'overlay',
          filter: 'blur(8px)',
          zIndex: 15
        }}
      ></div>
      <div className="relative z-20 select-none font-black flex items-center justify-center gap-2 w-full h-full">
        {children}
      </div>
    </button>
  );
};

const DestinationGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-0">
      {DESTINATIONS.map((dest, idx) => (
        <div
          key={dest.id}
          className={`scroll-reveal delay-${idx + 1} group relative bg-white/5 backdrop-blur-xl rounded-[30px] overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 shadow-xl flex flex-col`}
        >
          {/* Image Container */}
          <div className="relative h-64 overflow-hidden">
            <img
              src={dest.image}
              alt={dest.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg z-10 ${categoryLabels[dest.category].color}`}>
              {categoryLabels[dest.category].label}
            </div>

            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-2 py-1 rounded-lg flex items-center gap-1 shadow-xl z-10">
              <span className="text-orange-400 text-xs">★</span>
              <span className="font-black text-xs text-white">{dest.rating}</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl font-black text-white mb-1">{dest.name}</h3>
              <div className="flex items-center gap-1 text-slate-300 text-xs font-bold uppercase tracking-wider">
                <svg className="w-3 h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {dest.country}
              </div>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
              <div className="text-xs text-slate-400 font-medium">
                <span className="block text-[9px] uppercase tracking-widest opacity-70 mb-0.5">Davomiyligi</span>
                <span className="text-white font-bold">{dest.recommendedDuration}</span>
              </div>
              <div className="text-right text-xs text-slate-400 font-medium">
                <span className="block text-[9px] uppercase tracking-widest opacity-70 mb-0.5">Xarajat</span>
                <span className="text-blue-400 font-bold">{dest.price}</span>
              </div>
            </div>

            <p className="text-slate-400 font-medium text-xs leading-relaxed mb-4 line-clamp-2">
              {dest.description}
            </p>

            <div className="mb-6 flex-grow">
              <span className="block text-[9px] uppercase tracking-widest text-slate-500 mb-2 font-bold">Diqqatga sazovor joylar:</span>
              <div className="flex flex-wrap gap-1.5">
                {dest.attractions?.map((attr, i) => (
                  <span key={i} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-slate-300 font-medium">
                    {attr}
                  </span>
                ))}
              </div>
            </div>

            <InteractiveButton className="w-full py-3 rounded-xl bg-white/10 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 group/btn hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 shadow-lg mt-auto">
              Batafsil
              <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </InteractiveButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DestinationGrid;
