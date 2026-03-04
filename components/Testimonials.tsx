import React, { useState, useEffect } from 'react';

const testimonials = [
    {
        id: 1,
        name: "Alisher Usm.",
        role: "Umra Ziyoratchisi",
        text: "Di Travel orqali Umra safariga borib keldik. Xizmat ko'rsatish a'lo darajada. Mehmonxonalar juda yaqin, gidlarimiz juda bilimli. Barcha xodimlarga raxmat!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?img=11"
    },
    {
        id: 2,
        name: "Malika R.",
        role: "Sayohatchi",
        text: "Yevropa bo'ylab sayohatimizni shu kompaniyaga ishonib topshirdik. Vizadan tortib, mehmonxonalargacha - hammasi muammosiz hal bo'ldi. AI yordamchi juda zo'r ishlaydi!",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?img=47"
    },
    {
        id: 3,
        name: "Jamshid K.",
        role: "Tadbirkor",
        text: "Dubayga oilaviy tur xarid qildik. Narxlar juda hamyonbop va sifat evaziga arziydi. Ayniqsa saytning interfeysi va tezligi yoqdi.",
        rating: 4,
        avatar: "https://i.pravatar.cc/150?img=33"
    }
];

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden px-4 md:px-0 scroll-reveal">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {testimonials.map((t) => (
                    <div key={t.id} className="w-full shrink-0 flex justify-center px-4">
                        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[40px] shadow-2xl relative w-full group hover:bg-white/10 transition-colors">
                            <div className="absolute top-8 right-8 text-blue-500/20 text-6xl md:text-8xl font-serif">"</div>

                            <div className="flex items-center gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className={`w-5 h-5 ${i < t.rating ? 'text-orange-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-slate-300 text-base md:text-lg mb-8 italic relative z-10 leading-relaxed md:leading-loose">
                                {t.text}
                            </p>

                            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-orange-500/50 object-cover" />
                                <div>
                                    <h4 className="text-white font-black">{t.name}</h4>
                                    <p className="text-blue-400 text-xs md:text-sm">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8 md:mt-12">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleDotClick(idx)}
                        className={`w-10 h-1.5 rounded-full transition-all duration-300 ${currentIndex === idx ? 'bg-orange-500 w-16' : 'bg-white/20 hover:bg-white/40'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
