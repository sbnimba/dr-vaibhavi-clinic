"use client";
import { useState } from 'react';
import { UserProfile, AppLanguage } from '@/types/pregnancy-journey';
import { SAMPLE_WEEKLY_STAGES, BADGES } from '@/lib/pregnancy-journey-data';
import { saveUserProfile } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

import BabyGrowthVisualizer from './BabyGrowthVisualizer';
import JourneyMap from './JourneyMap';
import BuildThaliGame from './games/BuildThaliGame';
import MythOrFactGame from './games/MythOrFactGame';
import SafeOrNotGame from './games/SafeOrNotGame';
import HospitalBagGame from './games/HospitalBagGame';
import FamilySupportMode from './games/FamilySupportMode';
import EmergencyHelpModal from './EmergencyHelpModal';
import AdminCMS from './AdminCMS';

interface Props {
    initialProfile: UserProfile;
}

export default function MainDashboard({ initialProfile }: Props) {
    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const [activeTab, setActiveTab] = useState<'today' | 'games' | 'map' | 'family' | 'cms'>('today');
    const [selectedWeek, setSelectedWeek] = useState<number>(profile.calculatedWeek);
    const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);

    const lang = profile.language;
    const stage = SAMPLE_WEEKLY_STAGES[selectedWeek] || SAMPLE_WEEKLY_STAGES[12] || SAMPLE_WEEKLY_STAGES[4];

    const handleSwitchLang = (newLang: AppLanguage) => {
        const updated = saveUserProfile({ language: newLang });
        setProfile(updated);
        speakText(newLang === 'hi' ? 'भाषा बदलकर हिंदी की गई।' : newLang === 'mr' ? 'भाषा मराठी झाली.' : 'Language changed to English.', newLang);
    };

    return (
        <div className="min-h-screen bg-rose-50/40 pb-16 font-sans text-gray-900">
            
            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-rose-100 sticky top-0 z-40 shadow-xs">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🌸</span>
                        <div>
                            <h1 className="font-serif font-bold text-lg sm:text-xl text-gray-900 leading-tight">
                                {lang === 'hi' ? 'मेरी गर्भावस्था यात्रा' : lang === 'mr' ? 'माझा गरोदरपणाचा प्रवास' : 'My Pregnancy Journey'}
                            </h1>
                            <p className="text-[10px] sm:text-xs text-gray-500">
                                {lang === 'hi' ? 'डॉ. वैभवी क्लीनिक' : lang === 'mr' ? 'डॉ. वैभवी क्लिनिक' : 'Dr. Vaibhavi Clinic'}
                            </p>
                        </div>
                    </div>

                    {/* Language & Emergency Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowEmergencyModal(true)}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-3 sm:px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 animate-pulse"
                        >
                            <span>🚨</span>
                            <span>{lang === 'hi' ? 'इमरजेंसी मदद' : lang === 'mr' ? 'इमर्जन्सी मदत' : 'Need Help?'}</span>
                        </button>

                        <div className="hidden sm:flex items-center bg-gray-100 rounded-full p-1 border">
                            <button onClick={() => handleSwitchLang('hi')} className={`px-2.5 py-1 rounded-full text-xs font-bold ${lang === 'hi' ? 'bg-rose-600 text-white' : 'text-gray-600'}`}>🇮🇳 HI</button>
                            <button onClick={() => handleSwitchLang('mr')} className={`px-2.5 py-1 rounded-full text-xs font-bold ${lang === 'mr' ? 'bg-rose-600 text-white' : 'text-gray-600'}`}>🚩 MR</button>
                            <button onClick={() => handleSwitchLang('en')} className={`px-2.5 py-1 rounded-full text-xs font-bold ${lang === 'en' ? 'bg-rose-600 text-white' : 'text-gray-600'}`}>EN</button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-4xl mx-auto px-4 pt-6">
                
                {/* Greeting & Gamification Bar */}
                <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div>
                            <span className="text-xs font-extrabold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                                {lang === 'hi' ? `त्रैमासिक ${profile.trimester}` : lang === 'mr' ? `त्रैमासिक ${profile.trimester}` : `Trimester ${profile.trimester}`}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-2">
                                {lang === 'hi' ? `नमस्ते, ${profile.name} 🌸` : lang === 'mr' ? `नमस्कार, ${profile.name} 🌸` : `Good Day, ${profile.name} 🌸`}
                            </h2>
                            <p className="text-xs sm:text-sm text-rose-100 font-medium">
                                {lang === 'hi'
                                    ? `आप गर्भावस्था के ${profile.calculatedWeek}वें हफ्ते में हैं।`
                                    : lang === 'mr'
                                        ? `तुम्ही गरोदरपणाच्या ${profile.calculatedWeek}व्या आठवड्यात आहात.`
                                        : `You are approximately ${profile.calculatedWeek} weeks pregnant.`}
                            </p>
                        </div>

                        {/* Stats Pills */}
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                            <div className="text-center px-2">
                                <span className="text-xs text-rose-100 font-bold block uppercase">Points</span>
                                <span className="text-lg font-extrabold text-amber-300">⭐ {profile.carePoints}</span>
                            </div>
                            <div className="h-8 w-px bg-white/20"></div>
                            <div className="text-center px-2">
                                <span className="text-xs text-rose-100 font-bold block uppercase">Streak</span>
                                <span className="text-lg font-extrabold text-orange-300">🔥 {profile.streakDays}d</span>
                            </div>
                            <div className="h-8 w-px bg-white/20"></div>
                            <div className="text-center px-2">
                                <span className="text-xs text-rose-100 font-bold block uppercase">Badges</span>
                                <span className="text-lg font-extrabold text-yellow-200">🏅 {profile.unlockedBadges.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Path Indicator */}
                    <div className="mt-6 pt-4 border-t border-white/20">
                        <div className="flex items-center justify-between text-[10px] font-bold text-rose-200 uppercase mb-1.5">
                            <span>Week 1</span>
                            <span className="text-yellow-300 font-extrabold text-xs">🟣 YOU ARE AT WEEK {profile.calculatedWeek}</span>
                            <span>Week 40</span>
                        </div>
                        <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden p-0.5 border border-white/20">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full transition-all duration-500 shadow-sm"
                                style={{ width: `${Math.min(100, (profile.calculatedWeek / 40) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Sub-Navigation Tabs */}
                <div className="flex items-center justify-between gap-1 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('today')}
                        className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'today' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>🏠</span>
                        <span>{lang === 'hi' ? 'आज की गाइड' : lang === 'mr' ? 'आजचे मार्गदर्शक' : "Today's Care"}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('games')}
                        className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'games' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>🎮</span>
                        <span>{lang === 'hi' ? 'मिनी गेम्स' : lang === 'mr' ? 'मिनी गेम्स' : 'Mini-Games'}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('map')}
                        className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'map' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>🗺️</span>
                        <span>{lang === 'hi' ? 'रोडमॅप' : lang === 'mr' ? 'रोडमॅप' : 'Journey Map'}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('family')}
                        className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'family' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>👨‍👩‍👧</span>
                        <span>{lang === 'hi' ? 'परिवार मोड' : lang === 'mr' ? 'कुटुंब मोड' : 'Family Mode'}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('cms')}
                        className={`flex-1 min-w-[90px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'cms' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        <span>👨‍⚕️</span>
                        <span>CMS</span>
                    </button>
                </div>

                {/* TAB 1: TODAY'S CARE */}
                {activeTab === 'today' && (
                    <div className="space-y-6">
                        <BabyGrowthVisualizer profile={profile} stage={stage} />

                        {/* Unlocked Badges Showcase */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-100 text-left">
                            <h3 className="font-serif font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
                                <span>🏅</span>
                                {lang === 'hi' ? 'आपके मेडल और उपलब्धियां' : lang === 'mr' ? 'तुमचे मेडल व यश' : 'Your Unlocked Badges'}
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {BADGES.map((b) => {
                                    const isUnlocked = profile.unlockedBadges.includes(b.id);
                                    return (
                                        <div
                                            key={b.id}
                                            className={`p-3 rounded-2xl border transition text-left flex items-center gap-3 ${isUnlocked ? 'bg-amber-50/80 border-amber-300' : 'bg-gray-50 border-gray-200 opacity-50'}`}
                                        >
                                            <span className="text-2xl shrink-0">{b.icon}</span>
                                            <div>
                                                <p className="font-bold text-xs text-gray-900">{b.title[lang]}</p>
                                                <p className="text-[10px] text-gray-500">{isUnlocked ? '✓ Unlocked' : '🔒 Locked'}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: MINI GAMES */}
                {activeTab === 'games' && (
                    <div className="space-y-6">
                        <BuildThaliGame profile={profile} onUpdateProfile={setProfile} />
                        <MythOrFactGame profile={profile} onUpdateProfile={setProfile} />
                        <SafeOrNotGame profile={profile} onUpdateProfile={setProfile} />
                        <HospitalBagGame profile={profile} onUpdateProfile={setProfile} />
                    </div>
                )}

                {/* TAB 3: JOURNEY MAP */}
                {activeTab === 'map' && (
                    <JourneyMap
                        profile={profile}
                        onSelectWeek={(w) => {
                            setSelectedWeek(w);
                            setActiveTab('today');
                        }}
                    />
                )}

                {/* TAB 4: FAMILY MODE */}
                {activeTab === 'family' && <FamilySupportMode profile={profile} />}

                {/* TAB 5: ADMIN CMS */}
                {activeTab === 'cms' && <AdminCMS />}

            </main>

            {/* Emergency Modal */}
            <EmergencyHelpModal
                isOpen={showEmergencyModal}
                onClose={() => setShowEmergencyModal(false)}
                lang={lang}
            />
        </div>
    );
}
