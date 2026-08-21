"use client";
import { useState, useEffect } from 'react';
import { UserProfile, AppLanguage, DietaryPreference } from '@/types/pregnancy-journey';
import { saveUserProfile, calculatePregnancyDetails } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
    onCompleteConfirmation: (updated: UserProfile) => void;
}

export default function ConfirmationMoment({ profile, onCompleteConfirmation }: Props) {
    const [phase, setPhase] = useState<'reveal' | 'onboarding'>('reveal');
    const [lang, setLang] = useState<AppLanguage>(profile.language || 'hi');
    const [diet, setDiet] = useState<DietaryPreference>(profile.dietaryPreference || 'veg');
    const [name, setName] = useState(profile.name || 'मीना');
    const [lmpDate, setLmpDate] = useState(profile.lmpDate || '2026-04-01');
    const [isFirst, setIsFirst] = useState(true);

    useEffect(() => {
        if (phase === 'reveal') {
            const text = lang === 'hi'
                ? 'बधाई हो! एक नया और खूबसूरत सफर शुरू हो चुका है। आपके अंदर एक नन्ही जान पल रही है।'
                : lang === 'mr'
                    ? 'अभिनंदन! एक सुंदर प्रवास सुरू झाला आहे.'
                    : 'Congratulations! A beautiful new journey has begun.';
            speakText(text, lang);
        }
    }, [phase, lang]);

    const handleFinishOnboarding = () => {
        const details = calculatePregnancyDetails(lmpDate);
        const updated = saveUserProfile({
            name: name.trim() || 'मीना',
            lmpDate,
            expectedDueDate: details.dueDate,
            calculatedWeek: details.week,
            trimester: details.trimester,
            isFirstPregnancy: isFirst,
            language: lang,
            dietaryPreference: diet,
            hasConfirmedPregnancy: true,
            journeyState: 'active_journey'
        });
        onCompleteConfirmation(updated);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
            
            {/* Ambient Heartbeat & Glowing Light Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/40 via-purple-950/50 to-slate-950 pointer-events-none"></div>
            <div className="absolute w-96 h-96 rounded-full bg-rose-500/20 blur-3xl animate-pulse pointer-events-none"></div>

            {/* PHASE 1: EMOTIONAL REVEAL */}
            {phase === 'reveal' && (
                <div className="max-w-md w-full text-center relative z-10 p-6 animate-fade-in">
                    
                    {/* Pulsing Heartbeat Visual */}
                    <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-500 to-pink-400 p-1 shadow-[0_0_50px_rgba(244,63,94,0.6)] flex items-center justify-center animate-bounce">
                        <div className="w-24 h-24 rounded-full bg-slate-950 flex items-center justify-center text-4xl">
                            ❤️
                        </div>
                    </div>

                    <span className="inline-block bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest">
                        Pregnancy Confirmed ✨
                    </span>

                    <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-3 leading-tight">
                        🎉 {lang === 'hi' ? 'बधाई हो!' : lang === 'mr' ? 'अभिनंदन!' : 'Congratulations!'}
                    </h1>

                    <h2 className="text-lg sm:text-xl font-serif font-medium text-rose-200 mb-6 leading-relaxed">
                        {lang === 'hi'
                            ? '“एक नया और खूबसूरत सफर शुरू हो चुका है। आपके अंदर एक नन्ही सी जान पल रही है।” ❤️'
                            : lang === 'mr'
                                ? '“एक नवीन आणि सुंदर प्रवास सुरू झाला आहे.” ❤️'
                                : '“A beautiful new journey has begun. There is a tiny life growing inside you.” ❤️'}
                    </h2>

                    <button
                        onClick={() => setPhase('onboarding')}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 rounded-full text-base shadow-xl transition-all scale-105"
                    >
                        {lang === 'hi' ? 'अपनी यात्रा शुरू करें ➔' : lang === 'mr' ? 'प्रवास सुरू करा ➔' : 'Personalize Your Journey ➔'}
                    </button>
                </div>
            )}

            {/* PHASE 2: ONBOARDING & DIETARY SELECTION */}
            {phase === 'onboarding' && (
                <div className="max-w-lg w-full bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-rose-200 relative z-10 text-left animate-fade-in">
                    
                    <div className="text-center mb-6">
                        <span className="text-4xl mb-1 block">🌸</span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                            {lang === 'hi' ? 'अपनी यात्रा को कस्टमाइज करें' : lang === 'mr' ? 'तुमचा प्रवास कस्टमाइज करा' : 'Customize Your Journey'}
                        </h2>
                    </div>

                    {/* Language Switch */}
                    <div className="mb-5">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                            {lang === 'hi' ? 'भाषा (Language):' : 'Language:'}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <button onClick={() => setLang('hi')} className={`py-2.5 rounded-xl font-bold text-xs ${lang === 'hi' ? 'bg-rose-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700'}`}>🇮🇳 हिंदी</button>
                            <button onClick={() => setLang('mr')} className={`py-2.5 rounded-xl font-bold text-xs ${lang === 'mr' ? 'bg-rose-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700'}`}>🚩 मराठी</button>
                            <button onClick={() => setLang('en')} className={`py-2.5 rounded-xl font-bold text-xs ${lang === 'en' ? 'bg-rose-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700'}`}>🌐 English</button>
                        </div>
                    </div>

                    {/* LMP Date */}
                    <div className="mb-5">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                            {lang === 'hi' ? 'अंतिम माहवारी तारीख (LMP Date):' : 'LMP Date:'}
                        </label>
                        <input
                            type="date"
                            value={lmpDate}
                            onChange={(e) => setLmpDate(e.target.value)}
                            className="w-full p-3.5 rounded-2xl border-2 border-rose-300 text-base font-bold text-gray-900 bg-rose-50/40"
                        />
                    </div>

                    {/* VEG / NON-VEG DIETARY PREFERENCE */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                            {lang === 'hi' ? 'आप किस तरह का खाना खाती हैं?' : lang === 'mr' ? 'तुमचा आहार कोणता आहे?' : 'What kind of food do you eat?'}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setDiet('veg')}
                                className={`p-4 rounded-2xl border-2 font-bold text-sm text-left flex items-center gap-3 transition ${diet === 'veg' ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                            >
                                <span className="text-3xl">🥗</span>
                                <div>
                                    <p className="font-extrabold">{lang === 'hi' ? 'शाकाहारी (Veg)' : lang === 'mr' ? 'शाकाहारी (Veg)' : 'Vegetarian'}</p>
                                    <p className="text-[10px] text-emerald-700">दाल, पनीर, दूध, हरी सब्ज़ी</p>
                                </div>
                            </button>

                            <button
                                onClick={() => setDiet('non_veg')}
                                className={`p-4 rounded-2xl border-2 font-bold text-sm text-left flex items-center gap-3 transition ${diet === 'non_veg' ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-200' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                            >
                                <span className="text-3xl">🍗</span>
                                <div>
                                    <p className="font-extrabold">{lang === 'hi' ? 'मांसाहारी (Non-Veg)' : lang === 'mr' ? 'मांसाहारी (Non-Veg)' : 'Non-Vegetarian'}</p>
                                    <p className="text-[10px] text-amber-700">अंडा, चिकन, मछली + शाकाहारी</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleFinishOnboarding}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-full text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                        <span>🎉</span>
                        <span>{lang === 'hi' ? 'यात्रा नक्शा खोलें!' : lang === 'mr' ? 'प्रवास नकाशा उघडा!' : 'Unlock Journey Map!'}</span>
                    </button>

                </div>
            )}

        </div>
    );
}
