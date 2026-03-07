
import React, { useState, useRef } from 'react';

const Hero: React.FC = () => {
  const jotformLink = "https://form.jotform.com/252562510968058";
  const siteLink = "https://www.ditravel.uz";
  const aiAgentLink = "https://agent.jotform.com/019b9d53800276e59b6c31fa4efb381e5c2f";
  const makkahImg = "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&q=80&w=1200";

  const GlowButton = ({ href, children, variant = 'primary', size = 'normal' }: any) => {
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
      const deltaX = (x - centerX) / 10;
      const deltaY = (y - centerY) / 10;

      setGlowPos({ x, y });
      setBtnTransform({
        x: deltaX,
        y: deltaY,
        scale: size === 'small' ? 1.05 : 1.1,
        rotate: deltaX * 0.4,
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

    const isPrimary = variant === 'primary';
    const isSmall = size === 'small';

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
          transition: isPressed ? 'none' : 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className={`rounded-full font-black transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group shadow-xl touch-none select-none whitespace-nowrap ${isSmall
            ? 'px-6 py-3 text-[10px] md:px-8 md:py-4 md:text-xs bg-orange-500/80 backdrop-blur-2xl border border-white/20'
            : 'px-8 py-5 md:px-12 md:py-7 lg:px-14 lg:py-8 text-base md:text-lg lg:text-xl'
          } ${isPrimary && !isSmall ? 'bg-orange-500 text-white shadow-orange-500/20 shadow-2xl' : ''
          } ${!isPrimary && !isSmall ? 'bg-white/5 border border-white/10 text-white backdrop-blur-3xl' : ''
          }`}
      >
        <div
          className={`absolute pointer-events-none transition-opacity duration-300 ${isPressed ? 'opacity-100' : 'opacity-0'}`}
          style={{
            left: glowPos.x,
            top: glowPos.y,
            width: isSmall ? '150px' : '400px',
            height: isSmall ? '150px' : '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 75%)',
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'overlay',
            filter: 'blur(10px)',
            zIndex: 15
          }}
        ></div>
        <div className="relative z-20 text-white font-black flex items-center gap-2">
          {children}
        </div>
      </a>
    );
  };

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 lg:pt-40 overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col lg:flex-row items-center gap-12 md:gap-20 lg:gap-32">
        <div className="lg:w-1/2 text-center lg:text-left space-y-8 md:space-y-12 reveal lg:pr-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 text-emerald-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-xl mx-auto lg:mx-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Umra Safariga Marhamat
          </div>

          <div className="space-y-6 md:space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter">
              Muqaddas Safar <br />
              <span className="whitespace-nowrap inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-orange-400 italic tracking-tighter pr-8 md:pr-16 py-2 drop-shadow-2xl animate-gradient-x">
                Di&nbsp;Travel
              </span>
            </h1>
            <p className="text-lg md:text-2xl lg:text-3xl text-slate-400 font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0 opacity-90">
              Sizning muqaddas ziyoratingizni eng yuqori darajada, xavfsiz va qulay tashkil etamiz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 md:gap-8 justify-center lg:justify-start pt-4">
            <GlowButton href={jotformLink} variant="primary">
              HOZIR BAND QILISH
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </GlowButton>
            <GlowButton href={siteLink} variant="secondary">
              SAYTIMIZGA O'TISH
            </GlowButton>
          </div>
        </div>

        <div className="lg:w-1/2 relative w-full px-4 md:px-0">
          <div className="relative z-10 w-full aspect-[4/5] rounded-[50px] md:rounded-[80px] lg:rounded-[100px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border-[8px] md:border-[15px] border-white/10 group">
            <img
              src={makkahImg}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[15s] ease-out brightness-90"
              alt="Makkah Kaaba"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 z-30">
              <GlowButton href={aiAgentLink} size="small">
                AI REJA
              </GlowButton>
            </div>
          </div>

          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/10 rounded-full blur-[100px]"></div>
        </div>
      </div>
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
