
import React, { useState } from 'react';
import { generateItinerary } from '../services/geminiService';
import { TravelPlan } from '../types';

const AIPlanner: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<TravelPlan | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) return;
    
    setLoading(true);
    setPlan(null);
    try {
      const result = await generateItinerary(destination, days, interests);
      setPlan(result);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Kechirasiz, reja tuzishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-[60px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row min-h-[700px]">
        {/* Form Side */}
        <div className="lg:w-1/3 p-10 lg:p-14 bg-gradient-to-br from-blue-700 to-blue-900 text-white relative overflow-hidden">
          {/* Subtle logo-like circle in background */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-8">
            <div className="w-16 h-1 bg-orange-500 rounded-full"></div>
            <h2 className="text-4xl font-black leading-tight italic">AI Sayohat <br/>Rejasi</h2>
            <p className="text-blue-100 text-lg font-medium">
              Sun'iy intellekt yordamida o'zingizga mos sayohat marshrutini 10 soniyada tuzing.
            </p>
            
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-blue-200">Manzil</label>
                <input 
                  type="text" 
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Masalan: Buxoro"
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-blue-200">Davomiyligi (kun)</label>
                <input 
                  type="number" 
                  min="1" 
                  max="14"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value))}
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-black uppercase tracking-widest text-blue-200">Qiziqishlar</label>
                <textarea 
                  rows={3}
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Arxeologiya, restoranlar..."
                  className="w-full px-5 py-4 rounded-2xl bg-white/10 border border-white/20 placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-black text-white bg-orange-500 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-orange-600 hover:shadow-orange-500/40'}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
                    TAYYORLANMOQDA...
                  </>
                ) : (
                  <>
                    REJANI TUZISH
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results Side */}
        <div className="lg:w-2/3 p-10 lg:p-14 overflow-y-auto max-h-[850px] bg-white">
          {plan ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom duration-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-8">
                <div>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tight">{plan.destination}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-black uppercase tracking-tighter">
                      {plan.days} KUNLIK MARSHRUT
                    </span>
                  </div>
                </div>
                <div className="bg-orange-50 px-6 py-3 rounded-2xl border border-orange-100">
                  <p className="text-[10px] text-orange-400 uppercase tracking-[0.2em] font-black">Budjet</p>
                  <p className="text-3xl font-black text-orange-500">{plan.totalEstimatedCost}</p>
                </div>
              </div>

              <div className="space-y-12">
                {plan.itinerary.map((day) => (
                  <div key={day.day} className="relative pl-12">
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-sm z-10 shadow-lg shadow-blue-200">
                      {day.day}
                    </div>
                    <div className="absolute left-[15px] top-8 w-0.5 h-full bg-slate-100"></div>
                    
                    <div className="space-y-4">
                      <h4 className="text-xl font-black text-slate-800 tracking-tight uppercase">Boshlanish</h4>
                      <div className="grid gap-3">
                        {day.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all">
                            <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
                            <p className="text-slate-600 font-bold leading-relaxed">{activity}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-orange-50/50 rounded-2xl p-5 border-l-4 border-orange-500 flex gap-4">
                        <span className="text-2xl">💡</span>
                        <p className="text-sm text-slate-700 font-bold italic leading-relaxed">
                          <span className="text-orange-600 font-black not-italic block uppercase text-[10px] tracking-widest mb-1">Ekspert maslahati</span>
                          {day.tips}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
              <div className="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center relative">
                <svg className="w-16 h-16 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center animate-pulse">
                  <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="max-w-xs space-y-4">
                <h3 className="text-2xl font-black text-slate-800">Tayyormisiz?</h3>
                <p className="text-slate-500 font-bold leading-relaxed">Sayohat joyingizni kiriting va bizning AI sehrini ko'rsatishiga imkon bering.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
