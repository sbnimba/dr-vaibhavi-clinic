"use client";
import { useEffect } from 'react';
import { AppLanguage } from '@/types/pregnancy-journey';
import { speakText } from '@/lib/audio-player';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onStartNewbornChapter: () => void;
    lang: AppLanguage;
}

export default function BirthCelebrationModal({ isOpen, onClose, onStartNewbornChapter, lang }: Props) {
    useEffect(() => {
        if (isOpen) {
            const text = lang === 'hi'
                ? 'बधाई हो! आपके नन्हे मेहमान का आगमन हो चुका है। आप एक अद्भुत मां हैं।'
                : lang === 'mr'
                    ? 'अभिनंदन! बाळाचे आगमन झाले आहे.'
                    : 'Congratulations Mama! Your little one has arrived.';
            speakText(text, lang);
        }
    }, [isOpen, lang]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center relative z-10 p-6 animate-scale-up text-white">
                
                {/* Glowing Baby Icon */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-500 p-1 shadow-[0_0_60px_rgba(244,63,94,0.8)] flex items-center justify-center animate-bounce">
                    <div className="w-28 h-28 rounded-full bg-slate-950 flex items-center justify-center text-5xl">
                        👶❤️
                    </div>
                </div>

                <span className="inline-block bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest">
                    🏆 Pregnancy Journey Complete!
                </span>

                <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-2 leading-tight">
                    👶❤️ {lang === 'hi' ? 'हेलो, नन्हें मेहमान!' : lang === 'mr' ? 'नमस्कार, बाळ!' : 'HELLO, LITTLE ONE!'}
                </h1>

                <h2 className="text-xl font-serif font-bold text-rose-300 mb-6">
                    {lang === 'hi' ? '“बधाई हो, माँ! आपने यह ऐतिहासिक सफर पूरा किया।”' : lang === 'mr' ? '“अभिनंदन, आई!”' : '“Congratulations, Mama.”'}
                </h2>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 mb-6">
                    <p className="text-xs text-rose-100 font-medium leading-relaxed">
                        {lang === 'hi'
                            ? 'लेकिन यह अंत नहीं है... अब एक नया और सुंदर अध्याय शुरू हो रहा है:'
                            : lang === 'mr'
                                ? 'आणि आता एक नवीन सुंदर अध्याय सुरू होत आहे:'
                                : 'A beautiful new chapter is just beginning:'}
                    </p>
                    <p className="text-sm font-extrabold text-amber-300 mt-1">
                        🔓 {lang === 'hi' ? 'पहले 100 दिन और अमृत पोषण (Breastfeeding)' : lang === 'mr' ? 'पहिले १०० दिवस आणि स्तनपान' : 'The First 100 Days & First Nourishment'}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="w-1/3 bg-white/20 hover:bg-white/30 text-white font-bold py-3.5 rounded-full text-xs"
                    >
                        {lang === 'hi' ? 'बंद करें' : 'Close'}
                    </button>
                    <button
                        onClick={onStartNewbornChapter}
                        className="w-2/3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3.5 rounded-full text-xs sm:text-sm shadow-xl transition-all"
                    >
                        {lang === 'hi' ? 'नया अध्याय शुरू करें ➔' : lang === 'mr' ? 'नवीन अध्याय सुरू करा ➔' : 'Start Newborn Chapter ➔'}
                    </button>
                </div>

            </div>
        </div>
    );
}
