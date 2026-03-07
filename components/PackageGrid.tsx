
import React, { useState, useRef } from 'react';

const PACKAGES = [
  { id: 'econom', name: 'Econom', price: '950$', desc: 'Hamyonbop va sifatli sayohat imkoniyati.', features: ['3* Mehmonxona', 'Transport', 'Viza ko\'magi', 'Gid'], color: 'from-slate-500 to-slate-700', badge: 'Tejamkor', icon: '🌙' },
  { id: 'standart', name: 'Standart', price: '1000$', desc: 'Sifat va qulaylik uyg\'unligi, eng ommabop.', features: ['4* Mehmonxona', 'Transport', 'Viza', 'Ellikboshi'], color: 'from-blue-500 to-blue-700', badge: 'Ommabop', icon: '⭐', isPopular: true },
  { id: 'standart-plus', name: 'Standart Plus', price: '1100$', desc: 'Qo\'shimcha qulayliklar va markazga yaqin.', features: ['4* Premium', 'Maxsus transport', 'Viza', 'Gid'], color: 'from-indigo-500 to-indigo-700', badge: 'Yaxshilangan', icon: '✨' },
  { id: 'comfort', name: 'Comfort', price: '1200$', desc: 'Maksimal darajadagi eksklyuziv xizmatlar.', features: ['5* Mehmonxona', 'VIP Transport', 'Viza', 'Shaxsiy yordamchi'], color: 'from-orange-500 to-orange-600', badge: 'Qulay', icon: '💎' }
];

const InteractiveLink = ({ href, children, className }: any) => {
  const [isPressed, setIsPressed] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [btnTransform, setBtnTransform] = useState({ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

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
      navigator.vibrate(300);
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
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={{
        transform: `translate(${btnTransform.x}px, ${btnTransform.y}px) scale(${btnTransform.scale}) rotate(${btnTransform.rotate}deg) skewX(${btnTransform.skewX}deg)`,
        transition: isPressed ? 'none' : 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      className={`${className} relative overflow-hidden transition-all duration-300 touch-none whitespace-nowrap min-h-[50px]`}
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
    </a>
  );
};

const PackageGrid: React.FC = () => {
  const jotformLink = "https://form.jotform.com/252562510968058";
  const individualPlanLink = "https://agent.jotform.com/019b9d53800276e59b6c31fa4efb381e5c2f";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
      {PACKAGES.map((pkg, idx) => (
        <div key={pkg.id} className={`scroll-reveal delay-${idx + 1} group relative p-6 md:p-8 rounded-[30px] md:rounded-[45px] bg-white/5 border ${pkg.isPopular ? 'border-orange-500/40 bg-orange-500/5' : 'border-white/10'} backdrop-blur-2xl transition-all duration-700 hover:-translate-y-2 flex flex-col shadow-2xl`}>
          <div className="flex justify-between items-start mb-6">
            <span className={`px-5 py-2 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest ${pkg.isPopular ? 'bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-white/10 text-slate-400'}`}>
              {pkg.badge}
            </span>
            <span className="text-xl md:text-2xl group-hover:scale-125 transition-transform duration-500">{pkg.icon}</span>
          </div>
          <h3 className="text-lg md:text-2xl font-black text-white mb-1">{pkg.name}</h3>
          <div className="flex items-baseline gap-1 mb-4">
            <span className={`text-2xl md:text-3xl font-black ${pkg.isPopular ? 'text-orange-400' : 'text-blue-400'}`}>{pkg.price}</span>
            <span className="text-slate-500 font-bold text-[8px] md:text-[10px] uppercase tracking-widest">dan</span>
          </div>
          <p className="text-slate-400 font-medium text-[10px] md:text-xs leading-relaxed mb-6 flex-grow">{pkg.desc}</p>
          <div className="space-y-2 mb-8">
            {pkg.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-1 h-1 rounded-full ${pkg.isPopular ? 'bg-orange-500' : 'bg-blue-400'}`}></div>
                <span className="text-slate-300 text-[10px] md:text-[11px] font-bold">{feature}</span>
              </div>
            ))}
          </div>
          <InteractiveLink href={jotformLink} className={`w-full py-5 md:py-6 px-8 md:px-12 rounded-xl md:rounded-2xl text-white font-black text-[10px] md:text-[12px] uppercase tracking-widest flex items-center justify-center transition-all ${pkg.isPopular ? 'bg-orange-500 shadow-xl' : 'bg-white/10 border border-white/5'}`}>
            TANLASH
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </InteractiveLink>
        </div>
      ))}
      <div className="scroll-reveal delay-5 lg:col-span-4 mt-8 w-full">
        <div className="group relative p-8 md:p-14 rounded-[30px] md:rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden transition-all duration-1000 shadow-3xl flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-black italic tracking-tight leading-tight text-white">
              Sizga mos <span className="text-blue-400 md:pr-4">maxsus paket</span> kerakmi?
            </h3>
          </div>
          <InteractiveLink href={individualPlanLink} className="w-full lg:w-auto px-10 md:px-20 py-5 md:py-8 bg-white text-blue-600 font-black rounded-2xl md:rounded-[40px] shadow-2xl flex items-center justify-center uppercase tracking-[0.2em] text-[11px] md:text-[14px] border border-blue-100 min-h-[60px] md:min-h-[80px]">
            <span className="text-blue-600 relative z-20 font-black">INDIVIDUAL REJA</span>
            <svg className="w-5 h-5 text-blue-600 relative z-20 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </InteractiveLink>
        </div>
      </div>
    </div>
  );
};

export default PackageGrid;
