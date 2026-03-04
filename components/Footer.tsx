
import React from 'react';

const Footer: React.FC = () => {
  const aboutLink = "https://sites.google.com/view/ditraveluz/di-travel-haqida?authuser=0";
  const destinationsLink = "https://sites.google.com/view/ditraveluz/shaharlar?authuser=0";
  const aiAgentLink = "https://agent.jotform.com/019b9d53800276e59b6c31fa4efb381e5c2f";
  
  // Yangi yordam linklari
  const faqLink = "https://sites.google.com/view/ditraveluz/kop-beriladigan-savollar?authuser=0";
  const contactCenterLink = "https://t.me/ditraveluzsayt/6";
  const paymentTermsLink = "https://t.me/ditraveluzsayt/7";

  const socialLinks = {
    telegram: "https://t.me/ditraveluz",
    facebook: "https://www.facebook.com/ditravelsayohat",
    instagram: "https://www.instagram.com/ditravel.uz",
    youtube: "https://www.youtube.com/@Ditraveluz",
    form: "https://form.jotform.com/252562510968058"
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          <div className="space-y-10">
            <div className="flex items-center">
              {/* pr-4 qo'shildi - italic matn oxiridagi 'l' harfi kesilib qolmasligi uchun */}
              <h2 className="text-4xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-orange-400 select-none pr-4">
                Di Travel
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-slate-400 font-medium">
              Sayohat qilish — bu o'zini kashf etish demakdir. Di Travel bilan dunyoni yangicha nigohda ko'ring.
            </p>
            <div className="flex gap-4">
              <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.35-.49.96-.75 3.78-1.65 6.31-2.74 7.58-3.27 3.61-1.51 4.35-1.77 4.84-1.78.11 0 .35.03.5.16.12.1.16.23.18.33.02.08.02.24.01.29z"/></svg>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all transform hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all transform hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-black text-lg mb-8 uppercase tracking-widest">Kompaniya</h4>
            <ul className="space-y-4 font-semibold">
              <li><a href={aboutLink} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Biz haqimizda</a></li>
              <li><a href={destinationsLink} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Mashhur manzillar</a></li>
              <li><a href={aiAgentLink} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">AI Sayohat rejasi</a></li>
              <li><a href={socialLinks.form} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Ariza qoldirish</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-lg mb-8 uppercase tracking-widest">Yordam</h4>
            <ul className="space-y-4 font-semibold">
              <li><a href={faqLink} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Tez-tez beriladigan savollar</a></li>
              <li><a href={contactCenterLink} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Bog'lanish markazi</a></li>
              <li><a href={paymentTermsLink} target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">To'lov shartlari</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-slate-900 flex justify-center items-center text-sm font-bold">
          {/* Bu yerdagi matnga ham pr-1 qo'shildi */}
          <p className="tracking-[0.1em] uppercase text-slate-500 pr-1">Di Travel</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
