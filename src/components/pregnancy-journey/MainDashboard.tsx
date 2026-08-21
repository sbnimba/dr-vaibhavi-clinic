"use client";
import { useState, useEffect } from 'react';
import { UserProfile, AppLanguage, DietaryPreference } from '@/types/pregnancy-journey';
import { SAMPLE_WEEKLY_STAGES, BADGES } from '@/lib/pregnancy-journey-data';
import { saveUserProfile, addCarePoints } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

import DietarySwitch from './DietarySwitch';
import EmergencyHelpModal from './EmergencyHelpModal';
import BirthCelebrationModal from './BirthCelebrationModal';
import BuildThaliGame from './games/BuildThaliGame';
import MythOrFactGame from './games/MythOrFactGame';
import SafeOrNotGame from './games/SafeOrNotGame';
import HospitalBagGame from './games/HospitalBagGame';
import NewbornJourney from './NewbornJourney';
import BreastfeedingChapter from './BreastfeedingChapter';

interface Props {
    initialProfile: UserProfile;
}

/* ───────── WEEK NODE DATA ───────── */
const ALL_WEEKS: { week: number; emoji: string; label: { en: string; hi: string; mr: string }; color: string }[] = [
    { week: 4,  emoji: '🌾', label: { en: 'Tiny Seed', hi: 'नन्हा बीज', mr: 'चिमुकले बीज' }, color: 'from-emerald-400 to-teal-500' },
    { week: 6,  emoji: '🫘', label: { en: 'Heartbeat!', hi: 'पहली धड़कन!', mr: 'पहिले ठोके!' }, color: 'from-rose-400 to-pink-500' },
    { week: 12, emoji: '🍋', label: { en: 'First Trimester Done!', hi: 'पहली तिमाही पूरी!', mr: 'पहिले त्रैमासिक पूर्ण!' }, color: 'from-amber-400 to-yellow-500' },
    { week: 24, emoji: '🌽', label: { en: 'Baby Hears You!', hi: 'बच्चा सुनता है!', mr: 'बाळ ऐकते!' }, color: 'from-purple-400 to-indigo-500' },
    { week: 36, emoji: '🎃', label: { en: 'Almost Ready!', hi: 'तैयारी पूरी!', mr: 'तयारी पूर्ण!' }, color: 'from-orange-400 to-red-500' },
];

export default function MainDashboard({ initialProfile }: Props) {
    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
    const [weekView, setWeekView] = useState<'discover' | 'quiz' | 'food' | 'care' | 'complete'>('discover');
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);
    const [showBirth, setShowBirth] = useState(false);
    const [showGames, setShowGames] = useState(false);
    const [showPostBirth, setShowPostBirth] = useState<'newborn' | 'feeding' | null>(null);
    const [celebrateWeek, setCelebrateWeek] = useState(false);

    const lang = profile.language;
    const currentWeek = profile.calculatedWeek;

    const handleSwitchLang = (newLang: AppLanguage) => {
        const updated = saveUserProfile({ language: newLang });
        setProfile(updated);
    };

    const handleToggleDiet = (d: DietaryPreference) => {
        const updated = saveUserProfile({ dietaryPreference: d });
        setProfile(updated);
    };

    const openWeek = (w: number) => {
        setSelectedWeek(w);
        setWeekView('discover');
        setQuizAnswered(false);
    };

    const completeWeekSection = () => {
        if (weekView === 'discover') setWeekView('quiz');
        else if (weekView === 'quiz') setWeekView('food');
        else if (weekView === 'food') setWeekView('care');
        else if (weekView === 'care') {
            setWeekView('complete');
            setCelebrateWeek(true);
            const updated = addCarePoints(100);
            setProfile(updated);
            setTimeout(() => setCelebrateWeek(false), 2500);
        }
    };

    const stage = selectedWeek ? (SAMPLE_WEEKLY_STAGES[selectedWeek] || SAMPLE_WEEKLY_STAGES[12]) : null;

    /* ═══════════════════════════════════════════════
       SCREEN: POST-BIRTH CHAPTERS
    ═══════════════════════════════════════════════ */
    if (showPostBirth === 'newborn') {
        return (
            <div className="min-h-screen bg-emerald-50/40 pb-16">
                <header className="bg-white border-b sticky top-0 z-40 shadow-xs">
                    <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                        <button onClick={() => setShowPostBirth(null)} className="text-xs font-bold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">◄ {lang === 'hi' ? 'वापस' : 'Back'}</button>
                        <h1 className="font-serif font-bold text-base text-gray-900">👶 {lang === 'hi' ? 'नवजात शिशु देखभाल' : 'Newborn Care'}</h1>
                        <div></div>
                    </div>
                </header>
                <main className="max-w-4xl mx-auto px-4 pt-6">
                    <NewbornJourney profile={profile} />
                </main>
            </div>
        );
    }
    if (showPostBirth === 'feeding') {
        return (
            <div className="min-h-screen bg-teal-50/40 pb-16">
                <header className="bg-white border-b sticky top-0 z-40 shadow-xs">
                    <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                        <button onClick={() => setShowPostBirth(null)} className="text-xs font-bold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">◄ {lang === 'hi' ? 'वापस' : 'Back'}</button>
                        <h1 className="font-serif font-bold text-base text-gray-900">🍼 {lang === 'hi' ? 'अमृत पोषण' : 'First Nourishment'}</h1>
                        <div></div>
                    </div>
                </header>
                <main className="max-w-4xl mx-auto px-4 pt-6">
                    <BreastfeedingChapter profile={profile} onUpdateProfile={setProfile} />
                </main>
            </div>
        );
    }

    /* ═══════════════════════════════════════════════
       SCREEN: MINI-GAMES HUB
    ═══════════════════════════════════════════════ */
    if (showGames) {
        return (
            <div className="min-h-screen bg-purple-50/40 pb-16">
                <header className="bg-white border-b sticky top-0 z-40 shadow-xs">
                    <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                        <button onClick={() => setShowGames(false)} className="text-xs font-bold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">◄ {lang === 'hi' ? 'यात्रा नक्शा' : 'Journey Map'}</button>
                        <h1 className="font-serif font-bold text-base text-gray-900">🎮 {lang === 'hi' ? 'खेल और चुनौतियां' : 'Games & Challenges'}</h1>
                        <DietarySwitch diet={profile.dietaryPreference} onToggle={handleToggleDiet} />
                    </div>
                </header>
                <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
                    <BuildThaliGame profile={profile} onUpdateProfile={setProfile} />
                    <MythOrFactGame profile={profile} onUpdateProfile={setProfile} />
                    <SafeOrNotGame profile={profile} onUpdateProfile={setProfile} />
                    <HospitalBagGame profile={profile} onUpdateProfile={setProfile} />
                </main>
            </div>
        );
    }

    /* ═══════════════════════════════════════════════
       SCREEN: IMMERSIVE WEEK EXPERIENCE
    ═══════════════════════════════════════════════ */
    if (selectedWeek && stage) {
        const weekData = ALL_WEEKS.find(w => w.week === selectedWeek);
        const gradientBg = weekData?.color || 'from-rose-400 to-pink-500';

        return (
            <div className="min-h-screen bg-gray-50 pb-16">
                {/* Week Header */}
                <div className={`bg-gradient-to-br ${gradientBg} text-white px-4 py-8 sm:py-12 relative overflow-hidden`}>
                    <button
                        onClick={() => setSelectedWeek(null)}
                        className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white font-bold text-xs px-4 py-2 rounded-full border border-white/30"
                    >
                        ◄ {lang === 'hi' ? 'यात्रा नक्शा' : 'Journey Map'}
                    </button>

                    <div className="text-center pt-8">
                        <span className="text-6xl sm:text-7xl block mb-3 animate-bounce">{stage.fruitIcon}</span>
                        <span className="text-xs font-extrabold bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full uppercase tracking-widest">
                            {lang === 'hi' ? `हफ्ता ${stage.week} अनलॉक` : `Week ${stage.week} Unlocked`} 🔓
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-serif font-bold mt-3 leading-tight">
                            {stage.fruitName[lang]}
                        </h1>
                        <p className="text-sm text-white/80 mt-1">
                            {lang === 'hi' ? `त्रैमासिक ${stage.trimester}` : `Trimester ${stage.trimester}`}
                        </p>
                    </div>

                    {/* Section Progress Dots */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {['discover', 'quiz', 'food', 'care', 'complete'].map((s, i) => (
                            <div key={s} className={`w-3 h-3 rounded-full transition-all ${weekView === s ? 'bg-white scale-125 shadow-lg' : i < ['discover', 'quiz', 'food', 'care', 'complete'].indexOf(weekView) ? 'bg-white/80' : 'bg-white/30'}`}></div>
                        ))}
                    </div>
                </div>

                {/* Section Content */}
                <main className="max-w-2xl mx-auto px-4 pt-6">
                    
                    {/* ── DISCOVER: Baby Development & Mother Changes ── */}
                    {weekView === 'discover' && (
                        <div className="space-y-4 animate-fade-in">
                            {/* Baby Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">👶</span>
                                    <h3 className="font-serif font-bold text-lg text-gray-900">
                                        {lang === 'hi' ? 'आपके बच्चे में इस हफ्ते' : 'Your Baby This Week'}
                                    </h3>
                                    <button onClick={() => speakText(stage.babyDevelopment[lang], lang)} className="ml-auto text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">🔊</button>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed font-medium">{stage.babyDevelopment[lang]}</p>
                                
                                {/* Size comparison badge */}
                                <div className="mt-4 bg-amber-50 rounded-2xl p-3 flex items-center gap-3 border border-amber-200">
                                    <span className="text-4xl">{stage.fruitIcon}</span>
                                    <div>
                                        <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">{lang === 'hi' ? 'बच्चे का आकार' : 'Baby Size'}</p>
                                        <p className="font-bold text-sm text-gray-900">{stage.fruitName[lang]}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Mother Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-2xl">🤰</span>
                                    <h3 className="font-serif font-bold text-lg text-gray-900">
                                        {lang === 'hi' ? 'आपके शरीर में बदलाव' : "What About You? ❤️"}
                                    </h3>
                                    <button onClick={() => speakText(stage.motherBodyChanges[lang], lang)} className="ml-auto text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">🔊</button>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed font-medium">{stage.motherBodyChanges[lang]}</p>
                                <p className="text-xs text-rose-600 mt-3 font-bold italic">
                                    {lang === 'hi' ? '"आपका शरीर कुछ अद्भुत कर रहा है।" ❤️' : '"Your body is doing something incredible." ❤️'}
                                </p>
                            </div>

                            {/* Warning Signs */}
                            {stage.warningSigns.length > 0 && (
                                <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200">
                                    <p className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                                        <span>⚠️</span>
                                        {lang === 'hi' ? 'डॉक्टर से तुरंत मिलें अगर:' : 'See doctor immediately if:'}
                                    </p>
                                    <p className="text-xs text-rose-700 mt-1 font-medium">{stage.warningSigns[0][lang]}</p>
                                </div>
                            )}

                            <button onClick={completeWeekSection} className={`w-full bg-gradient-to-r ${gradientBg} text-white font-bold py-4 rounded-full text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}>
                                <span>{lang === 'hi' ? 'आगे बढ़ें: क्विज़ खेलें ➔' : 'Next: Play Quiz ➔'}</span>
                            </button>
                        </div>
                    )}

                    {/* ── QUIZ: Interactive Question ── */}
                    {weekView === 'quiz' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 text-center">
                                <span className="text-5xl block mb-4">🧠</span>
                                <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">
                                    {lang === 'hi' ? 'क्विज़ टाइम!' : 'Quiz Time!'}
                                </h3>
                                <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200 mb-6">
                                    <p className="text-sm sm:text-base font-bold text-purple-950 leading-snug">
                                        "{stage.interactiveQuiz.question[lang]}"
                                    </p>
                                </div>

                                {!quizAnswered ? (
                                    <div className="space-y-3">
                                        {stage.interactiveQuiz.options.map((opt) => (
                                            <button
                                                key={opt.id}
                                                onClick={() => {
                                                    setQuizAnswered(true);
                                                    if (opt.isCorrect) {
                                                        const u = addCarePoints(30);
                                                        setProfile(u);
                                                    }
                                                    speakText(stage.interactiveQuiz.explanation[lang], lang);
                                                }}
                                                className="w-full p-4 rounded-2xl border-2 border-purple-200 bg-purple-50/50 hover:bg-purple-100 hover:border-purple-400 font-bold text-sm text-left flex items-center gap-3 transition-all"
                                            >
                                                <span className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-xs font-extrabold text-purple-800 shrink-0">{opt.id === stage.interactiveQuiz.options[0].id ? 'A' : 'B'}</span>
                                                <span>{opt.label[lang]}</span>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-left animate-fade-in">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-2xl">✨</span>
                                            <h4 className="font-bold text-sm text-emerald-900">{lang === 'hi' ? 'जवाब:' : 'Answer:'}</h4>
                                        </div>
                                        <p className="text-xs text-emerald-800 font-medium leading-relaxed">{stage.interactiveQuiz.explanation[lang]}</p>
                                        <p className="text-xs text-emerald-600 font-bold mt-2">+30 ⭐ {lang === 'hi' ? 'अंक अर्जित किए!' : 'Points Earned!'}</p>
                                    </div>
                                )}
                            </div>

                            {quizAnswered && (
                                <button onClick={completeWeekSection} className={`w-full bg-gradient-to-r ${gradientBg} text-white font-bold py-4 rounded-full text-sm shadow-lg transition-all flex items-center justify-center gap-2`}>
                                    <span>{lang === 'hi' ? 'आगे: खाने की सलाह ➔' : 'Next: Food Tips ➔'}</span>
                                </button>
                            )}
                        </div>
                    )}

                    {/* ── FOOD: Nutrition Recommendations ── */}
                    {weekView === 'food' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🍛</span>
                                        <h3 className="font-serif font-bold text-lg text-gray-900">
                                            {lang === 'hi' ? 'इस हफ्ते क्या खाएं?' : "This Week's Nutrition"}
                                        </h3>
                                    </div>
                                    <DietarySwitch diet={profile.dietaryPreference} onToggle={handleToggleDiet} />
                                </div>

                                <p className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full inline-block mb-4">
                                    {profile.dietaryPreference === 'veg' ? '🌱 शाकाहारी मोड (Veg)' : '🍗 मांसाहारी मोड (Non-Veg)'}
                                </p>

                                {/* Veg foods always shown */}
                                <div className="space-y-2 mb-4">
                                    {stage.recommendedFoodsVeg.map((f, i) => (
                                        <div key={i} className="flex items-center gap-3 bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-100">
                                            <span className="text-3xl shrink-0">{f.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-bold text-xs text-gray-900">{f.name[lang]}</p>
                                                <p className="text-[11px] text-emerald-700 mt-0.5">{f.why[lang]}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Non-veg foods if applicable */}
                                {profile.dietaryPreference === 'non_veg' && stage.recommendedFoodsNonVeg.length > 0 && (
                                    <div className="space-y-2 mb-4 pt-3 border-t border-gray-100">
                                        <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">🍗 {lang === 'hi' ? 'मांसाहारी विकल्प:' : 'Non-Veg Options:'}</p>
                                        {stage.recommendedFoodsNonVeg.map((f, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-amber-50/60 rounded-2xl p-3.5 border border-amber-100">
                                                <span className="text-3xl shrink-0">{f.icon}</span>
                                                <div className="flex-1">
                                                    <p className="font-bold text-xs text-gray-900">{f.name[lang]}</p>
                                                    <p className="text-[11px] text-amber-700 mt-0.5">{f.why[lang]}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Doctor Visits */}
                                {stage.doctorVisitsAndTests.length > 0 && (
                                    <div className="bg-blue-50 rounded-2xl p-3.5 border border-blue-200 mt-4">
                                        <p className="text-xs font-bold text-blue-800 flex items-center gap-1.5">🩺 {lang === 'hi' ? 'डॉक्टर जांच:' : 'Doctor Visit:'}</p>
                                        <p className="text-xs text-blue-700 mt-1 font-medium">{stage.doctorVisitsAndTests[0][lang]}</p>
                                    </div>
                                )}
                            </div>

                            <button onClick={completeWeekSection} className={`w-full bg-gradient-to-r ${gradientBg} text-white font-bold py-4 rounded-full text-sm shadow-lg transition-all flex items-center justify-center gap-2`}>
                                <span>{lang === 'hi' ? 'आगे: सावधानियां ➔' : 'Next: Precautions ➔'}</span>
                            </button>
                        </div>
                    )}

                    {/* ── CARE: Precautions & Self-Care ── */}
                    {weekView === 'care' && (
                        <div className="space-y-4 animate-fade-in">
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-2xl">🛡️</span>
                                    <h3 className="font-serif font-bold text-lg text-gray-900">
                                        {lang === 'hi' ? 'इस हफ्ते की सावधानियां' : 'Precautions & Self-Care'}
                                    </h3>
                                </div>

                                <div className="space-y-3">
                                    {stage.precautions.map((p, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-amber-50/60 rounded-2xl p-4 border border-amber-100">
                                            <span className="text-lg shrink-0 mt-0.5">⚡</span>
                                            <p className="text-xs text-gray-800 font-medium leading-relaxed">{p[lang]}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Emotional support message */}
                                <div className="bg-rose-50 rounded-2xl p-5 mt-5 border border-rose-200 text-center">
                                    <span className="text-3xl block mb-2">💕</span>
                                    <p className="text-sm font-serif font-bold text-rose-900">
                                        {lang === 'hi' ? '"आप एक अद्भुत माँ बनने की यात्रा पर हैं।"' : '"You are on a beautiful journey to becoming an amazing mother."'}
                                    </p>
                                    <p className="text-xs text-rose-700 mt-1 font-medium">
                                        {lang === 'hi' ? 'अपना ख्याल रखें। आपका शरीर कुछ अनमोल कर रहा है।' : 'Take care of yourself. Your body is doing something precious.'}
                                    </p>
                                </div>
                            </div>

                            <button onClick={completeWeekSection} className={`w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 rounded-full text-sm shadow-lg transition-all flex items-center justify-center gap-2`}>
                                <span>🎉 {lang === 'hi' ? 'हफ्ता पूरा करें!' : 'Complete This Week!'}</span>
                            </button>
                        </div>
                    )}

                    {/* ── COMPLETE: Week Celebration ── */}
                    {weekView === 'complete' && (
                        <div className="text-center py-8 animate-fade-in">
                            <div className={`w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-tr ${gradientBg} flex items-center justify-center text-5xl shadow-xl ${celebrateWeek ? 'animate-bounce' : ''}`}>
                                🎉
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                                {lang === 'hi' ? `हफ्ता ${stage.week} पूरा!` : `Week ${stage.week} Complete!`}
                            </h2>
                            <p className="text-sm text-gray-600 font-medium mb-4">
                                {lang === 'hi' ? 'शाबाश! आप आगे बढ़ रही हैं।' : 'Well done! You are making progress.'}
                            </p>
                            <div className="inline-flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-full px-6 py-3 mb-6">
                                <span className="text-sm font-extrabold text-amber-800">+100 ⭐</span>
                                <span className="text-sm font-extrabold text-amber-800">🏆 {lang === 'hi' ? 'उपलब्धि अनलॉक' : 'Achievement Unlocked'}</span>
                            </div>
                            <br/>
                            <button
                                onClick={() => setSelectedWeek(null)}
                                className="bg-gray-900 text-white font-bold px-8 py-4 rounded-full text-sm shadow-lg hover:bg-gray-800 transition mt-2"
                            >
                                ◄ {lang === 'hi' ? 'यात्रा नक्शे पर लौटें' : 'Back to Journey Map'}
                            </button>
                        </div>
                    )}
                </main>
            </div>
        );
    }

    /* ═══════════════════════════════════════════════
       MAIN SCREEN: JOURNEY MAP (THE LANDING PAGE)
    ═══════════════════════════════════════════════ */
    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-purple-50/30 pb-20">
            
            {/* Header */}
            <header className="bg-white/90 backdrop-blur-md border-b border-rose-100 sticky top-0 z-40 shadow-xs">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🌸</span>
                        <div>
                            <h1 className="font-serif font-bold text-base sm:text-lg text-gray-900 leading-tight">
                                {lang === 'hi' ? 'मेरी गर्भावस्था यात्रा' : lang === 'mr' ? 'माझा प्रवास' : 'My Pregnancy Journey'}
                            </h1>
                            <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium">Dr. Vaibhavi Clinic</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Language Pills */}
                        <div className="hidden sm:flex items-center bg-gray-100 rounded-full p-0.5">
                            <button onClick={() => handleSwitchLang('hi')} className={`px-2 py-1 rounded-full text-[10px] font-bold ${lang === 'hi' ? 'bg-rose-600 text-white' : 'text-gray-600'}`}>HI</button>
                            <button onClick={() => handleSwitchLang('mr')} className={`px-2 py-1 rounded-full text-[10px] font-bold ${lang === 'mr' ? 'bg-rose-600 text-white' : 'text-gray-600'}`}>MR</button>
                            <button onClick={() => handleSwitchLang('en')} className={`px-2 py-1 rounded-full text-[10px] font-bold ${lang === 'en' ? 'bg-rose-600 text-white' : 'text-gray-600'}`}>EN</button>
                        </div>
                        <button onClick={() => setShowEmergency(true)} className="bg-rose-600 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-full shadow-sm animate-pulse">🚨 {lang === 'hi' ? 'मदद' : 'Help'}</button>
                    </div>
                </div>
            </header>

            <main className="max-w-2xl mx-auto px-4 pt-6">
                
                {/* ── Greeting & Progress Hero ── */}
                <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-700 rounded-3xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold">
                            {lang === 'hi' ? `नमस्ते, ${profile.name} 🌸` : `Hello, ${profile.name} 🌸`}
                        </h2>
                        <p className="text-xs sm:text-sm text-rose-100 mt-1 font-medium">
                            {lang === 'hi'
                                ? `आप गर्भावस्था के ${currentWeek}वें हफ्ते में हैं। एक अद्भुत यात्रा!`
                                : `You are in Week ${currentWeek}. What a beautiful journey!`}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mt-4 bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                            <div className="text-center flex-1">
                                <p className="text-lg font-extrabold text-amber-300">⭐ {profile.carePoints}</p>
                                <p className="text-[9px] text-rose-200 font-bold uppercase">Points</p>
                            </div>
                            <div className="h-8 w-px bg-white/20"></div>
                            <div className="text-center flex-1">
                                <p className="text-lg font-extrabold text-yellow-200">🏅 {profile.unlockedBadges.length}</p>
                                <p className="text-[9px] text-rose-200 font-bold uppercase">Badges</p>
                            </div>
                            <div className="h-8 w-px bg-white/20"></div>
                            <div className="text-center flex-1">
                                <p className="text-lg font-extrabold text-emerald-300">🎯 {Math.min(100, Math.round((currentWeek / 40) * 100))}%</p>
                                <p className="text-[9px] text-rose-200 font-bold uppercase">Complete</p>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                            <div className="flex justify-between text-[9px] text-rose-200 font-bold mb-1">
                                <span>Week 1</span>
                                <span className="text-yellow-300">● Week {currentWeek}</span>
                                <span>Week 40</span>
                            </div>
                            <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full transition-all duration-700" style={{ width: `${Math.min(100, (currentWeek / 40) * 100)}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── JOURNEY MAP: Week Nodes ── */}
                <div className="mb-8">
                    <h3 className="font-serif font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                        <span>🗺️</span>
                        {lang === 'hi' ? 'आपकी यात्रा — हफ्ते पर टैप करें' : 'Your Journey — Tap a Week'}
                    </h3>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-emerald-300 via-rose-300 to-purple-300 rounded-full"></div>

                        <div className="space-y-4">
                            {ALL_WEEKS.map((wk, idx) => {
                                const isUnlocked = currentWeek >= wk.week - 3;
                                const isCurrent = Math.abs(currentWeek - wk.week) <= 3;
                                const isCompleted = currentWeek > wk.week + 3;

                                return (
                                    <button
                                        key={wk.week}
                                        onClick={() => isUnlocked && openWeek(wk.week)}
                                        disabled={!isUnlocked}
                                        className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all relative z-10 ${
                                            isCurrent
                                                ? 'bg-white border-rose-400 shadow-lg ring-2 ring-rose-200 scale-[1.02]'
                                                : isCompleted
                                                    ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                                                    : isUnlocked
                                                        ? 'bg-white border-gray-200 shadow-sm hover:border-rose-300 hover:shadow-md'
                                                        : 'bg-gray-100/60 border-gray-200 opacity-50 cursor-not-allowed'
                                        }`}
                                    >
                                        {/* Node Circle */}
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${wk.color} flex items-center justify-center text-2xl shadow-md shrink-0 ${isCurrent ? 'animate-pulse' : ''}`}>
                                            {isUnlocked ? wk.emoji : '🔒'}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${isCurrent ? 'bg-rose-600 text-white' : isCompleted ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                                    {isCurrent ? `● WEEK ${wk.week}` : isCompleted ? `✓ WEEK ${wk.week}` : `WEEK ${wk.week}`}
                                                </span>
                                                {isCurrent && <span className="text-[10px] font-bold text-rose-600 animate-pulse">{lang === 'hi' ? 'आप यहाँ हैं!' : 'YOU ARE HERE!'}</span>}
                                            </div>
                                            <h4 className="font-serif font-bold text-sm text-gray-900 truncate">{wk.label[lang]}</h4>
                                        </div>

                                        <span className="text-gray-400 text-lg shrink-0">
                                            {isUnlocked ? '›' : '🔒'}
                                        </span>
                                    </button>
                                );
                            })}

                            {/* Birth Node */}
                            <button
                                onClick={() => setShowBirth(true)}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-purple-300 bg-gradient-to-r from-purple-50 to-rose-50 text-left shadow-sm hover:shadow-md transition-all relative z-10"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500 to-rose-500 flex items-center justify-center text-2xl shadow-md shrink-0">🏥</div>
                                <div className="flex-1">
                                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-600 text-white">THE BIG DAY</span>
                                    <h4 className="font-serif font-bold text-sm text-gray-900 mt-0.5">{lang === 'hi' ? 'जन्म का दिन 🎉' : 'Birth Celebration 🎉'}</h4>
                                </div>
                                <span className="text-purple-400 text-lg">›</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── ACTION CARDS: Games & Post-Birth ── */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                    <button onClick={() => setShowGames(true)} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition text-left">
                        <span className="text-3xl block mb-2">🎮</span>
                        <h4 className="font-bold text-xs text-gray-900">{lang === 'hi' ? 'खेल और चुनौतियां' : 'Games & Challenges'}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">Thali, Myths, Safety</p>
                    </button>
                    <button onClick={() => setShowPostBirth('newborn')} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition text-left">
                        <span className="text-3xl block mb-2">👶</span>
                        <h4 className="font-bold text-xs text-gray-900">{lang === 'hi' ? 'नवजात शिशु' : 'Newborn Care'}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">First 100 Days</p>
                    </button>
                    <button onClick={() => setShowPostBirth('feeding')} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition text-left">
                        <span className="text-3xl block mb-2">🍼</span>
                        <h4 className="font-bold text-xs text-gray-900">{lang === 'hi' ? 'अमृत पोषण' : 'First Nourishment'}</h4>
                        <p className="text-[10px] text-gray-500 mt-0.5">Breastfeeding Guide</p>
                    </button>
                    <button onClick={() => setShowEmergency(true)} className="bg-rose-50 rounded-2xl p-4 border border-rose-200 shadow-sm hover:shadow-md transition text-left">
                        <span className="text-3xl block mb-2">🚨</span>
                        <h4 className="font-bold text-xs text-rose-900">{lang === 'hi' ? 'इमरजेंसी मदद' : 'Emergency Help'}</h4>
                        <p className="text-[10px] text-rose-600 mt-0.5">Warning Signs</p>
                    </button>
                </div>

                {/* ── Badges ── */}
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-8">
                    <h3 className="font-serif font-bold text-sm text-gray-900 mb-3 flex items-center gap-2">🏅 {lang === 'hi' ? 'आपके मेडल' : 'Your Badges'}</h3>
                    <div className="flex items-center gap-3 overflow-x-auto pb-1">
                        {BADGES.map((b) => {
                            const unlocked = profile.unlockedBadges.includes(b.id);
                            return (
                                <div key={b.id} className={`shrink-0 w-16 text-center ${unlocked ? '' : 'opacity-30'}`}>
                                    <span className="text-2xl block">{b.icon}</span>
                                    <p className="text-[9px] font-bold text-gray-700 mt-1 leading-tight">{b.title[lang]}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </main>

            {/* Modals */}
            <EmergencyHelpModal isOpen={showEmergency} onClose={() => setShowEmergency(false)} lang={lang} />
            <BirthCelebrationModal isOpen={showBirth} onClose={() => setShowBirth(false)} onStartNewbornChapter={() => { setShowBirth(false); setShowPostBirth('newborn'); }} lang={lang} />
        </div>
    );
}
