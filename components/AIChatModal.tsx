import React, { useEffect } from 'react';

interface AIChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    botId: string;
}

const AIChatModal: React.FC<AIChatModalProps> = ({ isOpen, onClose, botId }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl h-[85vh] md:h-[90vh] bg-[#0f172a] rounded-2xl md:rounded-[32px] border border-white/20 shadow-[0_0_80px_rgba(59,130,246,0.3)] overflow-hidden flex flex-col animate-scale-up">

                {/* Header Options */}
                <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm md:text-base">Di Travel AI Yordamchi</h3>
                            <p className="text-slate-400 text-xs">Sayohat rejangizni hoziroq tuzing</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-colors text-white"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Jotform Iframe */}
                <div className="flex-grow w-full bg-white relative">
                    <iframe
                        src={`https://agent.jotform.com/${botId}?isIframe=true`}
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        allow="microphone; camera"
                        title="Di Travel AI Agent"
                    ></iframe>
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-up { animation: scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
        </div>
    );
};

export default AIChatModal;
