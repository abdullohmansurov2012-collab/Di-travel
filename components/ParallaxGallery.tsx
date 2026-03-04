import React, { useRef, useState } from 'react';

const images = [
    { id: 1, src: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800&auto=format&fit=crop", title: "Taj Mahal", desc: "Hindiston" },
    { id: 2, src: "/images/milan.png", title: "Milan", desc: "Italiya" },
    { id: 3, src: "/images/cappadocia.png", title: "Kapadokya", desc: "Turkiya" },
    { id: 4, src: "/images/moscow.png", title: "Moskva", desc: "Rossiya" },
];

const ParallaxCard = ({ image }: { image: typeof images[0] }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg
        const rotateY = ((x - centerX) / centerX) * 15;

        setTransform({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setTransform({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden cursor-crosshair group perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
        >
            <div
                className="w-full h-full transition-transform duration-200 ease-out preserve-3d"
                style={{
                    transform: `rotateX(${transform.x}deg) rotateY(${transform.y}deg) scale3d(1.05, 1.05, 1.05)`
                }}
            >
                <img
                    src={image.src}
                    alt={image.title}
                    className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-6 md:p-8 translate-z-50 transform-style-3d text-white flex flex-col justify-end h-full w-full">
                    <p className="text-orange-400 text-xs md:text-sm font-bold uppercase tracking-widest mb-1 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">{image.desc}</p>
                    <h3 className="text-2xl md:text-4xl font-black translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">{image.title}</h3>
                </div>
            </div>
        </div>
    );
};

const ParallaxGallery: React.FC = () => {
    return (
        <div className="w-full relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 auto-rows-fr">
                {images.map((img, idx) => (
                    <div key={img.id} className="scroll-reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                        <ParallaxCard image={img} />
                    </div>
                ))}
            </div>

            <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .translate-z-50 { transform: translateZ(50px); }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
        </div>
    );
};

export default ParallaxGallery;
