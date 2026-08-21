"use client";
import { useState } from 'react';
import { AppLanguage, UserProfile } from '@/types/pregnancy-journey';
import { PRE_PREGNANCY_SYMPTOMS } from '@/lib/pregnancy-journey-data';
import { saveUserProfile, addCarePoints } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
    onAdvanceToConfirmation: (updated: UserProfile) => void;
}

export default function PrePregnancyChecker({ profile, onAdvanceToConfirmation }: Props) {
    const lang = profile.language;
    const [answers, setAnswers] = useState<Record<string, 'yes' | 'no' | 'not_sure'>>({});
    const [showNextStepGame, setShowNextStepGame] = useState(false);
    const [gameAnswered, setGameAnswered] = useState<boolean | null>(null);

    const handleAnswerSymptom = (id: string, val: 'yes' | 'no' | 'not_sure') => {
        setAnswers(prev => ({ ...prev, [id]: val }));
    };

    const hasAnyYes = Object.values(answers).some(v => v === 'yes');

    const handleSpeakIntro = () => {
        const text = lang === 'hi'
            ? 'क्या आप गर्भवती हो सकती हैं? आइए आपके लक्षणों की जांच करें।'
            : lang === 'mr'
                ? 'तुम्ही गरोदर आहात का? चला लक्षणे तपासूया.'
                : 'Could you be pregnant? Let us check your symptoms.';
        speakText(text, lang);
    };

    const handleGameChoice = (choice: 'test' | 'medicine' | 'ignore') => {
        if (choice === 'test') {
            setGameAnswered(true);
            const msg = lang === 'hi'
                ? 'शाबाश! सही कदम। प्रेगनेंसी टेस्ट और डॉक्टर की सलाह ही सबसे सुरक्षित रास्ता है।'
                : lang === 'mr'
                    ? 'उत्तम! अचूक पाऊल. चाचणी आणि डॉक्टरांचा सल्ला हाच योग्य मार्ग आहे.'
                    : 'Great choice! Taking a test and seeking medical advice is the safest first step.';
            speakText(msg, lang);
            const updated = addCarePoints(50, 'first_step');
            setTimeout(() => {
                onAdvanceToConfirmation(saveUserProfile({ ...updated, journeyState: 'confirmation' }));
            }, 1800);
        } else {
            setGameAnswered(false);
            const msg = lang === 'hi'
                ? 'बिना डॉक्टर सलाह दवा न लें और लक्षणों को नजरअंदाज न करें।'
                : lang === 'mr'
                    ? 'औषध घेऊ नका व लक्षणे दुर्लक्षित करू नका.'
                    : 'Do not self-medicate or ignore symptoms.';
            speakText(msg, lang);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-100 via-pink-50 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-rose-100 relative text-left">
                
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-rose-100">
                    <span className="text-xs font-extrabold text-rose-700 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        Stage 1: Pre-Pregnancy Check
                    </span>
                    <button
                        onClick={handleSpeakIntro}
                        className="flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 hover:bg-rose-100 transition"
                    >
                        <span>🔊</span>
                        <span>{lang === 'hi' ? 'सुनें' : lang === 'mr' ? 'ऐका' : 'Listen'}</span>
                    </button>
                </div>

                {/* Main Headline */}
                <div className="text-center mb-6">
                    <span className="text-5xl mb-2 block animate-bounce">🌸</span>
                    <h1 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
                        {lang === 'hi' ? 'क्या आप गर्भवती हो सकती हैं? 🌸' : lang === 'mr' ? 'तुम्ही गरोदर आहात का? 🌸' : 'Could you be pregnant? 🌸'}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                        {lang === 'hi' ? 'क्या आपने इनमें से कोई लक्षण महसूस किया है?' : lang === 'mr' ? 'तुम्हाला खालीलपैकी काही लक्षणे जाणवली आहेत का?' : 'Have you noticed any of these symptoms recently?'}
                    </p>
                </div>

                {/* Symptom Cards */}
                {!showNextStepGame && (
                    <div className="space-y-3 mb-6">
                        {PRE_PREGNANCY_SYMPTOMS.map((sym) => {
                            const currentVal = answers[sym.id];
                            return (
                                <div key={sym.id} className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl shrink-0">{sym.icon}</span>
                                        <p className="font-bold text-xs sm:text-sm text-gray-900">{sym.title[lang]}</p>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                        <button
                                            onClick={() => handleAnswerSymptom(sym.id, 'yes')}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${currentVal === 'yes' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
                                        >
                                            {lang === 'hi' ? 'हाँ (Yes)' : lang === 'mr' ? 'होय' : 'Yes'}
                                        </button>
                                        <button
                                            onClick={() => handleAnswerSymptom(sym.id, 'no')}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${currentVal === 'no' ? 'bg-rose-600 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
                                        >
                                            {lang === 'hi' ? 'नहीं (No)' : lang === 'mr' ? 'नाही' : 'No'}
                                        </button>
                                        <button
                                            onClick={() => handleAnswerSymptom(sym.id, 'not_sure')}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${currentVal === 'not_sure' ? 'bg-amber-500 text-white shadow-sm' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}
                                        >
                                            {lang === 'hi' ? 'पता नहीं' : lang === 'mr' ? 'माहित नाही' : 'Not Sure'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Medical Disclaimer Banner */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 font-medium leading-relaxed mt-4">
                            ⚠️ <strong>{lang === 'hi' ? 'महत्वपूर्ण सूचना:' : lang === 'mr' ? 'महत्त्वाची टीप:' : 'Important Note:'}</strong>{' '}
                            {lang === 'hi'
                                ? 'इन लक्षणों के कई कारण हो सकते हैं। एक प्रेगनेंसी टेस्ट और डॉक्टर की सलाह ही प्रेगनेंसी की सही पुष्टि कर सकती है।'
                                : lang === 'mr'
                                    ? 'या लक्षणांची अनेक कारणे असू शकतात. प्रेग्नन्सी टेस्ट आणि डॉक्टरांचा सल्लाच खात्री करू शकतो.'
                                    : 'These symptoms can have different causes. A pregnancy test and appropriate medical advice can help confirm pregnancy.'}
                        </div>

                        <button
                            onClick={() => setShowNextStepGame(true)}
                            disabled={!hasAnyYes}
                            className={`w-full py-4 rounded-full font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${hasAnyYes ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                            <span>{lang === 'hi' ? 'आगे का कदम चुनें ➔' : lang === 'mr' ? 'पुढील पाऊल निवडा ➔' : 'Choose What To Do Next ➔'}</span>
                        </button>
                    </div>
                )}

                {/* Mini-Game: What Should I Do Next? */}
                {showNextStepGame && (
                    <div className="animate-fade-in text-center">
                        <span className="text-4xl mb-2 block">🧪</span>
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900 mb-2">
                            {lang === 'hi' ? 'अब मुझे आगे क्या करना चाहिए?' : lang === 'mr' ? 'आता पुढे काय करावे?' : 'What Should I Do Next?'}
                        </h3>
                        <p className="text-xs text-gray-600 mb-6">
                            {lang === 'hi' ? 'सही विकल्प चुनें और +50 अंक अर्जित करें!' : lang === 'mr' ? 'योग्य पर्याय निवडा आणि +५० गुण मिळवा!' : 'Choose the appropriate step to earn +50 points!'}
                        </p>

                        <div className="space-y-3 mb-6">
                            <button
                                onClick={() => handleGameChoice('test')}
                                className="w-full p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 hover:bg-emerald-100 font-bold text-xs sm:text-sm text-emerald-950 text-left flex items-center gap-3 transition shadow-sm"
                            >
                                <span className="text-3xl">🧪</span>
                                <div>
                                    <p className="font-extrabold text-sm">{lang === 'hi' ? 'विकल्प A: प्रेगनेंसी टेस्ट करें / डॉक्टर से सलाह लें' : lang === 'mr' ? 'पर्याय A: चाचणी करा व डॉक्टरांचा सल्ला घ्या' : 'Option A: Take a pregnancy test & consult doctor'}</p>
                                    <p className="text-[11px] text-emerald-700">{lang === 'hi' ? 'सही और सुरक्षित तरीका' : lang === 'mr' ? 'योग्य आणि सुरक्षित मार्ग' : 'Safe and recommended choice'}</p>
                                </div>
                            </button>

                            <button
                                onClick={() => handleGameChoice('medicine')}
                                className="w-full p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 hover:bg-rose-100 font-bold text-xs sm:text-sm text-rose-950 text-left flex items-center gap-3 transition"
                            >
                                <span className="text-3xl">💊</span>
                                <div>
                                    <p className="font-extrabold text-sm">{lang === 'hi' ? 'विकल्प B: बिना पूछे कोई दवा खाना शुरू कर दें' : lang === 'mr' ? 'पर्याय B: सल्ल्याशिवाय औषधे सुरू करणे' : 'Option B: Start taking unprescribed medicines'}</p>
                                    <p className="text-[11px] text-rose-700">{lang === 'hi' ? 'खतरनाक हो सकता है' : lang === 'mr' ? 'धोकादायक असू शकते' : 'Can be unsafe'}</p>
                                </div>
                            </button>

                            <button
                                onClick={() => handleGameChoice('ignore')}
                                className="w-full p-4 rounded-2xl bg-gray-50 border-2 border-gray-200 hover:bg-gray-100 font-bold text-xs sm:text-sm text-gray-800 text-left flex items-center gap-3 transition"
                            >
                                <span className="text-3xl">🙈</span>
                                <div>
                                    <p className="font-extrabold text-sm">{lang === 'hi' ? 'विकल्प C: सब कुछ नजरअंदाज कर दें' : lang === 'mr' ? 'पर्याय C: दुर्लक्ष करणे' : 'Option C: Ignore everything'}</p>
                                </div>
                            </button>
                        </div>

                        {gameAnswered === true && (
                            <div className="bg-emerald-100 border border-emerald-300 rounded-2xl p-4 text-center animate-bounce">
                                <span className="text-3xl block mb-1">✨ 🏆</span>
                                <h4 className="font-serif font-bold text-lg text-emerald-950">
                                    {lang === 'hi' ? 'शानदार चुनाव! ⭐' : lang === 'mr' ? 'उत्तम निवड! ⭐' : 'Great Choice! ⭐'}
                                </h4>
                                <p className="text-xs text-emerald-800 font-bold">
                                    {lang === 'hi' ? 'उपलब्धि अनलॉक: पहला कदम उठाया' : lang === 'mr' ? 'यश अनलॉक: पहिले पाऊल उचलले' : 'Achievement Unlocked: First Step Taken'}
                                </p>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
