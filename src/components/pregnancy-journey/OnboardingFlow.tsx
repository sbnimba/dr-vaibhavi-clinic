"use client";
import { useState } from 'react';
import { AppLanguage, UserProfile } from '@/types/pregnancy-journey';
import { saveUserProfile } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

interface Props {
    onComplete: (profile: UserProfile) => void;
}

export default function OnboardingFlow({ onComplete }: Props) {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [lang, setLang] = useState<AppLanguage>('hi');
    const [name, setName] = useState('मीना');
    const [lmpDate, setLmpDate] = useState('2026-04-01');
    const [isFirst, setIsFirst] = useState(true);

    const handleSpeakWelcome = () => {
        const text = lang === 'hi'
            ? 'आपकी गर्भावस्था यात्रा में आपका स्वागत है। भाषा चुनें।'
            : lang === 'mr'
                ? 'तुमच्या गरोदरपणाच्या प्रवासात आपले स्वागत आहे. भाषा निवडा.'
                : 'Welcome to your pregnancy journey. Select your language.';
        speakText(text, lang);
    };

    const handleFinish = () => {
        const updated = saveUserProfile({
            name: name.trim() || (lang === 'hi' ? 'मीना' : 'Meena'),
            lmpDate,
            isFirstPregnancy: isFirst,
            language: lang
        });
        onComplete(updated);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-rose-100 relative">
                
                {/* Step Progress Bar */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-extrabold text-rose-700 tracking-wider uppercase bg-rose-100 px-3 py-1 rounded-full">
                        Step {step} of 3
                    </span>
                    <button
                        onClick={handleSpeakWelcome}
                        className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 hover:bg-rose-100 transition"
                        title="Listen"
                    >
                        <span>🔊</span>
                        <span>{lang === 'hi' ? 'सुनें' : lang === 'mr' ? 'ऐका' : 'Listen'}</span>
                    </button>
                </div>

                {/* STEP 1: LANGUAGE SELECTION */}
                {step === 1 && (
                    <div className="animate-fade-in text-center">
                        <span className="text-5xl mb-3 block animate-bounce">🌸</span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
                            {lang === 'hi' ? 'अपनी पसंदीदा भाषा चुनें' : lang === 'mr' ? 'तुमची आवडती भाषा निवडा' : 'Select Your Preferred Language'}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 mb-6">
                            {lang === 'hi' ? 'आप कभी भी भाषा बदल सकती हैं।' : lang === 'mr' ? 'तुम्ही कधीही भाषा बदलू शकता.' : 'You can change language anytime.'}
                        </p>

                        <div className="grid grid-cols-1 gap-3 mb-8">
                            <button
                                onClick={() => { setLang('hi'); speakText('हिंदी चुनी गई। आगे बढ़ें।', 'hi'); }}
                                className={`p-4 rounded-2xl border-2 text-left font-bold text-lg flex items-center justify-between transition-all ${lang === 'hi' ? 'bg-rose-50 border-rose-600 text-rose-900 ring-2 ring-rose-300' : 'bg-white border-gray-200 text-gray-800 hover:border-rose-300'}`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-2xl">🇮🇳</span>
                                    <span>हिंदी (Hindi)</span>
                                </span>
                                {lang === 'hi' && <span className="text-rose-600 text-xl">✓</span>}
                            </button>

                            <button
                                onClick={() => { setLang('mr'); speakText('मराठी निवडली. पुढे चला.', 'mr'); }}
                                className={`p-4 rounded-2xl border-2 text-left font-bold text-lg flex items-center justify-between transition-all ${lang === 'mr' ? 'bg-rose-50 border-rose-600 text-rose-900 ring-2 ring-rose-300' : 'bg-white border-gray-200 text-gray-800 hover:border-rose-300'}`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-2xl">🚩</span>
                                    <span>मराठी (Marathi)</span>
                                </span>
                                {lang === 'mr' && <span className="text-rose-600 text-xl">✓</span>}
                            </button>

                            <button
                                onClick={() => { setLang('en'); speakText('English selected. Continue.', 'en'); }}
                                className={`p-4 rounded-2xl border-2 text-left font-bold text-lg flex items-center justify-between transition-all ${lang === 'en' ? 'bg-rose-50 border-rose-600 text-rose-900 ring-2 ring-rose-300' : 'bg-white border-gray-200 text-gray-800 hover:border-rose-300'}`}
                            >
                                <span className="flex items-center gap-3">
                                    <span className="text-2xl">🌐</span>
                                    <span>English</span>
                                </span>
                                {lang === 'en' && <span className="text-rose-600 text-xl">✓</span>}
                            </button>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-full text-base shadow-lg hover:shadow-xl transition-all"
                        >
                            {lang === 'hi' ? 'आगे बढ़ें ➔' : lang === 'mr' ? 'पुढे चला ➔' : 'Continue ➔'}
                        </button>
                    </div>
                )}

                {/* STEP 2: PREGNANCY DATE */}
                {step === 2 && (
                    <div className="animate-fade-in text-center">
                        <span className="text-5xl mb-3 block animate-bounce">📅</span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
                            {lang === 'hi' ? 'अंतिम माहवारी (LMP) की तारीख' : lang === 'mr' ? 'शेवटच्या पाळीची तारीख (LMP)' : 'Last Menstrual Period (LMP)'}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 mb-6">
                            {lang === 'hi' ? 'इससे आपकी गर्भावस्था का हफ्ता और डिलीवरी तारीख तय होगी।' : lang === 'mr' ? 'यावरून तुमच्या गरोदरपणाचा आठवडा व तारीख ठरवली जाईल.' : 'This calculates your current week and expected due date.'}
                        </p>

                        <div className="mb-6 text-left">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                {lang === 'hi' ? 'तारीख चुनें (Select Date):' : lang === 'mr' ? 'तारीख निवडा:' : 'Select Date:'}
                            </label>
                            <input
                                type="date"
                                value={lmpDate}
                                onChange={(e) => setLmpDate(e.target.value)}
                                className="w-full p-4 rounded-2xl border-2 border-rose-300 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-rose-50/30"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setStep(1)}
                                className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-full text-sm"
                            >
                                ◄ {lang === 'hi' ? 'पीछे' : lang === 'mr' ? 'मागे' : 'Back'}
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="w-2/3 bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-full text-base shadow-lg hover:shadow-xl transition-all"
                            >
                                {lang === 'hi' ? 'आगे बढ़ें ➔' : lang === 'mr' ? 'पुढे चला ➔' : 'Continue ➔'}
                            </button>
                        </div>
                    </div>
                )}

                {/* STEP 3: FIRST PREGNANCY & NAME */}
                {step === 3 && (
                    <div className="animate-fade-in text-center">
                        <span className="text-5xl mb-3 block animate-bounce">🤰</span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-2">
                            {lang === 'hi' ? 'क्या यह आपकी पहली गर्भावस्था है?' : lang === 'mr' ? 'ही तुमची पहिली गरोदरपण आहे का?' : 'Is this your first pregnancy?'}
                        </h2>
                        <p className="text-xs sm:text-sm text-gray-600 mb-6">
                            {lang === 'hi' ? 'आपकी जरूरत के हिसाब से सही गाइड दी जाएगी।' : lang === 'mr' ? 'तुमच्या गरजेनुसार योग्य मार्गदर्शन दिले जाईल.' : 'We will customize your daily tips accordingly.'}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button
                                onClick={() => setIsFirst(true)}
                                className={`p-4 rounded-2xl border-2 font-bold text-lg transition-all ${isFirst ? 'bg-rose-50 border-rose-600 text-rose-900 ring-2 ring-rose-300' : 'bg-white border-gray-200 text-gray-700'}`}
                            >
                                <span>👍 {lang === 'hi' ? 'हाँ, पहली बार' : lang === 'mr' ? 'हो, पहिल्यांदाच' : 'Yes, First Time'}</span>
                            </button>
                            <button
                                onClick={() => setIsFirst(false)}
                                className={`p-4 rounded-2xl border-2 font-bold text-lg transition-all ${!isFirst ? 'bg-rose-50 border-rose-600 text-rose-900 ring-2 ring-rose-300' : 'bg-white border-gray-200 text-gray-700'}`}
                            >
                                <span>👶 {lang === 'hi' ? 'पहले भी हुई है' : lang === 'mr' ? 'याआधी झाली आहे' : 'Previous Pregnancy'}</span>
                            </button>
                        </div>

                        <div className="mb-6 text-left">
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                {lang === 'hi' ? 'आपका नाम (Optional):' : lang === 'mr' ? 'तुमचे नाव:' : 'Your Name:'}
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={lang === 'hi' ? 'उदा. मीना' : lang === 'mr' ? 'उदा. मीना' : 'e.g. Meena'}
                                className="w-full p-4 rounded-2xl border-2 border-rose-300 text-lg font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-rose-50/30"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setStep(2)}
                                className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-full text-sm"
                            >
                                ◄ {lang === 'hi' ? 'पीछे' : lang === 'mr' ? 'मागे' : 'Back'}
                            </button>
                            <button
                                onClick={handleFinish}
                                className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-full text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                            >
                                <span>🎉</span>
                                <span>{lang === 'hi' ? 'यात्रा शुरू करें!' : lang === 'mr' ? 'प्रवास सुरू करा!' : 'Start Journey!'}</span>
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
