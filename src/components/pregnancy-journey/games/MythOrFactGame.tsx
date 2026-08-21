"use client";
import { useState } from 'react';
import { UserProfile } from '@/types/pregnancy-journey';
import { MYTH_FACTS } from '@/lib/pregnancy-journey-data';
import { addCarePoints } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
    onUpdateProfile: (updated: UserProfile) => void;
}

export default function MythOrFactGame({ profile, onUpdateProfile }: Props) {
    const lang = profile.language;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answered, setAnswered] = useState<boolean | null>(null);

    const currentItem = MYTH_FACTS[currentIndex];

    const handleAnswer = (userSaysMyth: boolean) => {
        const isCorrect = userSaysMyth === currentItem.isMyth;
        setAnswered(isCorrect);

        const explanation = currentItem.explanation[lang];
        speakText(explanation, lang);

        if (isCorrect) {
            const updated = addCarePoints(30, 'myth_buster');
            onUpdateProfile(updated);
        }
    };

    const handleNext = () => {
        setAnswered(null);
        setCurrentIndex((currentIndex + 1) % MYTH_FACTS.length);
    };

    return (
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-purple-100 my-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">🤔</span>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-gray-900">
                            {lang === 'hi' ? 'भ्रम या सच? (Myth or Fact Quiz)' : lang === 'mr' ? 'गैरसमज की सत्य?' : 'Myth or Fact Quiz'}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {lang === 'hi' ? 'गलतफहमियां दूर करें (+30 अंक ⭐)' : lang === 'mr' ? 'गैरसमज दूर करा (+३० गुण ⭐)' : 'Clear pregnancy myths (+30 pts ⭐)'}
                        </p>
                    </div>
                </div>
                <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {MYTH_FACTS.length}
                </span>
            </div>

            <div className="bg-purple-50/60 rounded-2xl p-5 mb-5 border border-purple-100 text-center">
                <p className="text-base sm:text-lg font-serif font-bold text-purple-950 leading-snug">
                    "{currentItem.statement[lang]}"
                </p>
            </div>

            {answered === null ? (
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => handleAnswer(true)}
                        className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 hover:bg-amber-100 font-bold text-amber-900 shadow-sm transition text-center"
                    >
                        <span className="text-2xl block mb-1">❌</span>
                        <span>{lang === 'hi' ? 'यह भ्रम है (Myth)' : lang === 'mr' ? 'हा गैरसमज आहे' : 'This is a Myth'}</span>
                    </button>

                    <button
                        onClick={() => handleAnswer(false)}
                        className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 hover:bg-emerald-100 font-bold text-emerald-900 shadow-sm transition text-center"
                    >
                        <span className="text-2xl block mb-1">✅</span>
                        <span>{lang === 'hi' ? 'यह सच है (Fact)' : lang === 'mr' ? 'हे सत्य आहे' : 'This is a Fact'}</span>
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-4 border-2 border-purple-200 text-left animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{answered ? '🎉' : '❤️'}</span>
                        <h4 className="font-bold text-sm text-gray-900">
                            {answered
                                ? (lang === 'hi' ? 'शाबाश! सही जवाब' : lang === 'mr' ? 'उत्तम! अचूक उत्तर' : 'Well Done! Correct')
                                : (lang === 'hi' ? 'कोई बात नहीं, नया सीखें' : lang === 'mr' ? 'काही हरकत नाही, नवीन शिका' : "That's okay! Learn something new")}
                        </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 font-medium mb-4 leading-relaxed">
                        {currentItem.explanation[lang]}
                    </p>
                    <button
                        onClick={handleNext}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-full text-xs sm:text-sm shadow-md transition"
                    >
                        {lang === 'hi' ? 'अगला सवाल ➔' : lang === 'mr' ? 'पुढील प्रश्न ➔' : 'Next Question ➔'}
                    </button>
                </div>
            )}
        </div>
    );
}
