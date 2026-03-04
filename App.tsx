import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import PackageGrid from './components/PackageGrid';
import DestinationGrid from './components/DestinationGrid';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import AIChatModal from './components/AIChatModal';
import ScrollProgressBar from './components/ScrollProgressBar';
import ParallaxGallery from './components/ParallaxGallery';
import Testimonials from './components/Testimonials';
import PageTransitionLoader from './components/PageTransitionLoader';

const InteractiveButton = ({ onClick, children, className }: any) => {
  const [isPressed, setIsPressed] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [btnTransform, setBtnTransform] = useState({ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 });
  const ref = useRef<HTMLButtonElement>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsPressed(true);
    updateInteraction(e);
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

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
      scale: 1.12,
      rotate: deltaX * 0.6,
      skewX: deltaX * 0.3
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isPressed) {
      updateInteraction(e);
    }
  };

  const handlePointerUp = () => {
    setIsPressed(false);
    setBtnTransform({ x: 0, y: 0, scale: 1, rotate: 0, skewX: 0 });
  };

  return (
    <button
      ref={ref}
      onClick={onClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerMove={handlePointerMove}
      style={{
        transform: `translate(${btnTransform.x}px, ${btnTransform.y}px) scale(${btnTransform.scale}) rotate(${btnTransform.rotate}deg) skewX(${btnTransform.skewX}deg)`,
        transition: isPressed ? 'none' : 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      className={`${className} relative overflow-hidden transition-all duration-300 touch-none select-none whitespace-nowrap`}
    >
      <div
        className={`absolute pointer-events-none transition-opacity duration-300 ${isPressed ? 'opacity-100' : 'opacity-0'}`}
        style={{
          left: glowPos.x,
          top: glowPos.y,
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'overlay',
          filter: 'blur(15px)',
          zIndex: 15
        }}
      ></div>
      <div className="relative z-20 text-white font-black flex items-center justify-center gap-3">
        {children}
      </div>
    </button>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFloatingAI, setShowFloatingAI] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const jotformBotId = "019b9d53800276e59b6c31fa4efb381e5c2f";

  const handleOpenAIChat = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAIModalOpen(true);
    }, 2000); // 2 second mock loading transition
  };
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4500);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.1 });

    if (!isLoading) {
      document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
      const aiTimer = setTimeout(() => setShowFloatingAI(true), 3000);
      return () => { clearTimeout(aiTimer); observer.disconnect(); };
    }
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [isLoading]);

  return (
    <>
      <ScrollProgressBar />
      {isTransitioning && <PageTransitionLoader isVisible={isTransitioning} />}
      <CustomCursor />
      {isLoading && <LoadingScreen />}

      <div className={`min-h-screen flex flex-col bg-[#0f172a] text-white overflow-x-hidden relative transition-all duration-[2000ms] ${isLoading ? 'opacity-0 filter blur-[40px]' : 'opacity-100'}`}>
        <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
          <div className="absolute top-[-10%] left-[-5%] w-[1000px] h-[1000px] bg-blue-600/15 rounded-full blur-[200px] animate-blob"></div>
          <div className="absolute bottom-[-5%] right-[-5%] w-[1000px] h-[1000px] bg-orange-600/10 rounded-full blur-[200px] animate-blob animation-delay-4000"></div>
        </div>

        {!isLoading && (
          <>
            <Header />
            <main className="flex-grow pt-20 md:pt-28">
              <Hero />

              <section id="services" className="py-16 md:py-24 relative px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12 space-y-4 md:space-y-6 scroll-reveal">
                    <div className="inline-block px-5 py-2 bg-blue-500/10 text-blue-400 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] border border-blue-500/20">Bizning Xizmatlar</div>
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none">Bizning <span className="text-blue-500 pr-10">xizmatlarimiz</span></h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[
                      { id: "umra", title: "Umra Safarlari", desc: "Iqtisod va VIP paketlar.", icon: "🕋", color: "emerald" },
                      { id: "visa", title: "Viza Xizmatlari", desc: "Tezkor viza xizmati.", icon: "🛂", color: "blue" },
                      { id: "tickets", title: "Aviachiptalar", desc: "Hamyonbop narxlar.", icon: "✈️", color: "orange" },
                      { id: "tours", title: "Individual Turlar", desc: "Maxsus paketlar.", icon: "🗺️", color: "indigo" }
                    ].map((service, idx) => (
                      <div key={service.id} className={`scroll-reveal delay-${idx + 1} p-8 md:p-10 rounded-[35px] md:rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-xl hover:bg-white/10 hover:-translate-y-4 hover:shadow-[0_40px_80px_-15px_rgba(59,130,246,0.3)] transition-all duration-500 text-center group cursor-default`}>
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center text-3xl md:text-4xl mb-6 mx-auto group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-500 shadow-inner">
                          {service.icon}
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                        <p className="text-slate-400 font-medium text-xs md:text-sm leading-relaxed">{service.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="destinations" className="py-16 md:py-24 relative px-4 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12 space-y-4 md:space-y-6 scroll-reveal">
                    <div className="inline-block px-5 py-2 bg-orange-500/10 text-orange-400 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] border border-orange-500/20">Mashhur Yo'nalishlar</div>
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none">O'zbekiston <span className="text-orange-500 pr-10">Bo'ylab</span></h2>
                  </div>
                  <DestinationGrid />
                </div>
              </section>

              {/* NEW PARALLAX GALLERY SECTION */}
              <section id="gallery" className="py-16 md:py-32 relative px-4 overflow-hidden border-t border-white/5 bg-black/20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-16 md:mb-24 space-y-4 scroll-reveal">
                    <div className="inline-block px-5 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] border border-indigo-500/20">3D Galereya</div>
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none">Dunyo <span className="text-indigo-500 pr-10">Mo'jizalari</span></h2>
                  </div>
                  <ParallaxGallery />
                </div>
              </section>

              <section id="packages" className="py-16 md:py-24 border-y border-white/5 relative px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center mb-12 md:mb-16 space-y-6 scroll-reveal">
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter italic leading-none">Sayohat <span className="text-blue-500 pr-14">Paketlari</span></h2>
                  </div>
                  <PackageGrid />
                </div>
              </section>

              <section id="ai-plan" className="py-16 md:py-24 overflow-hidden px-4">
                <div className="max-w-7xl mx-auto">
                  <div className="scroll-reveal bg-white/5 backdrop-blur-[80px] rounded-[40px] md:rounded-[80px] p-8 md:p-20 border border-white/10 shadow-3xl flex flex-col lg:flex-row items-center gap-12 md:gap-16">
                    <div className="lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
                      <h2 className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-tight pb-4 md:pb-8 overflow-visible">
                        Sayohat rejasini <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-400 italic pr-12 md:pr-32 animate-gradient-x inline-block py-2 md:py-4">
                          AI bilan tuzing&nbsp;
                        </span>
                      </h2>
                      <InteractiveButton onClick={handleOpenAIChat} className="px-10 md:px-24 py-5 md:py-8 bg-orange-500 text-white font-black rounded-2xl md:rounded-[40px] shadow-2xl transition-all flex items-center justify-center group mx-auto lg:mx-0 w-fit text-base md:text-xl border border-white/10">
                        AI REJANI BOSHLASH
                        <svg className="w-5 h-5 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </InteractiveButton>
                    </div>
                    <div className="lg:w-1/2 relative w-full h-[350px] md:h-[500px] bg-black/40 rounded-[30px] md:rounded-[40px] border border-white/10 overflow-hidden shadow-inner flex items-center justify-center cursor-pointer group" onClick={handleOpenAIChat}>
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="relative z-10 w-20 h-20 md:w-28 md:h-28 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/30 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-10 h-10 md:w-14 md:h-14 text-blue-400 ml-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* NEW TESTIMONIALS SECTION */}
              <section id="testimonials" className="py-16 md:py-32 border-t border-white/5 relative px-4 overflow-hidden bg-gradient-to-b from-transparent to-black/40">
                <div className="absolute right-[-10%] bottom-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                  <div className="text-center mb-16 md:mb-20 space-y-4 scroll-reveal">
                    <div className="inline-block px-5 py-2 bg-blue-500/10 text-blue-400 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] border border-blue-500/20">Mijozlar Fikri</div>
                    <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none italic">Bizga <span className="text-blue-500 pr-10">Ishonishadi</span></h2>
                  </div>
                  <Testimonials />
                </div>
              </section>

            </main>
            <Footer />

            {/* LIQUID GLASS AI BUTTON - Optimized for frosted glass look (Xira effekt) */}
            {showFloatingAI && (
              <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9000] pointer-events-auto animate-dust-in">
                <button
                  onClick={handleOpenAIChat}
                  onPointerDown={() => {
                    if (typeof navigator !== 'undefined' && navigator.vibrate) {
                      navigator.vibrate(50);
                    }
                  }}
                  className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-2xl md:rounded-[28px] border border-white/50 bg-white/20 backdrop-blur-[100px] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] group transition-all duration-700 hover:scale-105 hover:bg-white/30 active:scale-95 overflow-hidden"
                >
                  {/* Subtle Internal Liquid Effect */}
                  <div className="absolute inset-0 pointer-events-none opacity-60">
                    <div className="absolute -top-10 -left-10 w-24 h-24 md:w-32 md:h-32 bg-blue-500/30 rounded-full blur-[25px] animate-liquid-subtle"></div>
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 md:w-32 md:h-32 bg-orange-500/25 rounded-full blur-[25px] animate-liquid-subtle-reverse"></div>
                  </div>

                  {/* Glass Shine */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>

                  {/* AI Icon Box - Slightly smaller */}
                  <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 via-indigo-600 to-indigo-700 rounded-lg md:rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-[10deg] transition-all duration-700 border border-white/20">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>

                  {/* Text Container - Slightly smaller text */}
                  <div className="relative z-10 flex flex-col items-start pr-2 md:pr-3 pl-0.5">
                    <span className="text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em] text-blue-100/90 mb-0.5 select-none">CHAT AGENT</span>
                    <span className="text-[10px] md:text-sm font-black text-white whitespace-nowrap tracking-tight select-none">AI BILAN SUHBAT</span>
                  </div>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AIChatModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        botId={jotformBotId}
      />

      <style>{`
        @keyframes liquid-subtle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.2); }
        }
        @keyframes liquid-subtle-reverse {
          0%, 100% { transform: translate(0, 0) scale(1.2); }
          50% { transform: translate(-20px, 20px) scale(1); }
        }
        .animate-liquid-subtle { animation: liquid-subtle 8s infinite ease-in-out; }
        .animate-liquid-subtle-reverse { animation: liquid-subtle-reverse 9s infinite ease-in-out; }

        @keyframes dust-in { 
          0% { opacity: 0; transform: scale(0.8) translateY(20px); filter: blur(20px); } 
          100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } 
        }
        .animate-dust-in { animation: dust-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @keyframes message-in { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-message-in { animation: message-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </>
  );
};

export default App;
