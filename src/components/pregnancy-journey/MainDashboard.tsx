"use client";
import { useState } from 'react';
import { UserProfile, AppLanguage, DietaryPreference } from '@/types/pregnancy-journey';
import { SAMPLE_WEEKLY_STAGES } from '@/lib/pregnancy-journey-data';
import { saveUserProfile } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

import PrePregnancyChecker from './PrePregnancyChecker';
import ConfirmationMoment from './ConfirmationMoment';
import DietarySwitch from './DietarySwitch';
import StoryJourneyMap from './StoryJourneyMap';
import BabyGrowthVisualizer from './BabyGrowthVisualizer';
import BabyBook from './BabyBook';
import BuildThaliGame from './games/BuildThaliGame';
import MythOrFactGame from './games/MythOrFactGame';
import SafeOrNotGame from './games/SafeOrNotGame';
import HospitalBagGame from './games/HospitalBagGame';
import FamilySupportMode from './games/FamilySupportMode';
import NewbornJourney from './NewbornJourney';
import BreastfeedingChapter from './BreastfeedingChapter';
import BirthCelebrationModal from './BirthCelebrationModal';
import EmergencyHelpModal from './EmergencyHelpModal';
import AdminCMS from './AdminCMS';

interface Props {
    initialProfile: UserProfile;
}

export default function MainDashboard({ initialProfile }: Props) {
    const [profile, setProfile] = useState<UserProfile>(initialProfile);
    const [activeTab, setActiveTab] = useState<'today' | 'games' | 'map' | 'book' | 'newborn' | 'breastfeeding' | 'family' | 'cms'>('today');
    const [selectedWeek, setSelectedWeek] = useState<number>(profile.calculatedWeek);
    const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
    const [showBirthModal, setShowBirthModal] = useState<boolean>(false);

    const lang = profile.language;
    const stage = SAMPLE_WEEKLY_STAGES[selectedWeek] || SAMPLE_WEEKLY_STAGES[12] || SAMPLE_WEEKLY_STAGES[4];

    const handleSwitchLang = (newLang: AppLanguage) => {
        const updated = saveUserProfile({ language: newLang });
        setProfile(updated);
        speakText(newLang === 'hi' ? 'भाषा बदलकर हिंदी की गई।' : newLang === 'mr' ? 'भाषा मराठी झाली.' : 'Language changed to English.', newLang);
    };

    const handleToggleDiet = (newDiet: DietaryPreference) => {
        const updated = saveUserProfile({ dietaryPreference: newDiet });
        setProfile(updated);
        speakText(newDiet === 'veg' ? 'शाकाहारी मोड चुना गया।' : 'मांसाहारी मोड चुना गया।', lang);
    };

    // STAGE 1: PRE-PREGNANCY CHECK
    if (profile.journeyState === 'pre_pregnancy') {
        return (
            <PrePregnancyChecker
                profile={profile}
                onAdvanceToConfirmation={(updated) => setProfile(updated)}
            />
        );
    }

    // STAGE 2: PREGNANCY CONFIRMATION MOMENT
    if (profile.journeyState === 'confirmation') {
        return (
            <ConfirmationMoment
                profile={profile}
                onCompleteConfirmation={(updated) => setProfile(updated)}
            />
        );
    }

    // STAGE 3 TO 8: ACTIVE JOURNEY DASHBOARD
    return (
        <div className="min-h-screen bg-rose-50/40 pb-16 font-sans text-gray-900">
            
            {/* Header Controls */}
            <header className="bg-white border-b border-rose-100 sticky top-0 z-40 shadow-xs">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">🌸</span>
                        <div>
                            <h1 className="font-serif font-bold text-lg sm:text-xl text-gray-900 leading-tight">
                                {lang === 'hi' ? 'मेरी गर्भावस्था यात्रा' : lang === 'mr' ? 'माझा गरोदरपणाचा प्रवास' : 'My Pregnancy Journey'}
                            </h1>
                            <p className="text-[10px] sm:text-xs text-gray-500">
                                {lang === 'hi' ? 'डॉ. वैभवी क्लीनिक' : 'Dr. Vaibhavi Clinic'}
                            </p>
                        </div>
                    </div>

                    {/* Global VEG / NON-VEG Switch & Emergency Button */}
                    <div className="flex items-center gap-2">
                        <DietarySwitch diet={profile.dietaryPreference} onToggle={handleToggleDiet} />

                        <button
                            onClick={() => setShowEmergencyModal(true)}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs px-3 sm:px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 animate-pulse shrink-0"
                        >
                            <span>🚨</span>
                            <span>{lang === 'hi' ? 'इमरजेंसी' : 'Need Help?'}</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Container */}
            <main className="max-w-4xl mx-auto px-4 pt-6">
                
                {/* Encouraging Banner & Points Card */}
                <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 rounded-3xl p-6 text-white shadow-xl mb-6 relative overflow-hidden text-left">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div>
                            <span className="text-xs font-extrabold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                                {lang === 'hi' ? `त्रैमासिक ${profile.trimester}` : `Trimester ${profile.trimester}`}
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-2">
                                {lang === 'hi' ? `नमस्ते, ${profile.name} 🌸` : `Good Day, ${profile.name} 🌸`}
                            </h2>
                            <p className="text-xs sm:text-sm text-rose-100 font-medium mt-0.5">
                                ❤️ {lang === 'hi' ? '“हर दिन नया अनुभव है। आज एक स्वस्थ कदम उठाएं।”' : '“Your body is doing something incredible today.”'}
                            </p>
                        </div>

                        {/* Stats Bar */}
                        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                            <div className="text-center px-2">
                                <span className="text-xs text-rose-100 font-bold block uppercase">Points</span>
                                <span className="text-lg font-extrabold text-amber-300">⭐ {profile.carePoints}</span>
                            </div>
                            <div className="h-8 w-px bg-white/20"></div>
                            <div className="text-center px-2">
                                <span className="text-xs text-rose-100 font-bold block uppercase">Badges</span>
                                <span className="text-lg font-extrabold text-yellow-200">🏅 {profile.unlockedBadges.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6 pt-4 border-t border-white/20">
                        <div className="flex items-center justify-between text-[10px] font-bold text-rose-200 uppercase mb-1">
                            <span>Week 1</span>
                            <span className="text-yellow-300 font-extrabold text-xs">● YOU ARE AT WEEK {profile.calculatedWeek}</span>
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

                {/* Main Navigation Tabs */}
                <div className="flex items-center justify-between gap-1 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('today')}
                        className={`flex-1 min-w-[85px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'today' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>🏠</span>
                        <span>{lang === 'hi' ? 'आज' : 'Today'}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('map')}
                        className={`flex-1 min-w-[85px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'map' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>🗺️</span>
                        <span>{lang === 'hi' ? 'कहानी' : 'Roadmap'}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('games')}
                        className={`flex-1 min-w-[85px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'games' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>🎮</span>
                        <span>{lang === 'hi' ? 'गेम्स' : 'Games'}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('book')}
                        className={`flex-1 min-w-[85px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'book' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>📖</span>
                        <span>{lang === 'hi' ? 'किताब' : 'Baby Book'}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('newborn')}
                        className={`flex-1 min-w-[85px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'newborn' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>👶</span>
                        <span>{lang === 'hi' ? 'नवजात' : 'Newborn'}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('breastfeeding')}
                        className={`flex-1 min-w-[85px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${activeTab === 'breastfeeding' ? 'bg-rose-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        <span>🍼</span>
                        <span>{lang === 'hi' ? 'स्तनपान' : 'Feeding'}</span>
                    </button>
                </div>

                {/* TAB 1: TODAY'S CARE & BABY DEVELOPMENT */}
                {activeTab === 'today' && (
                    <div className="space-y-6">
                        <BabyGrowthVisualizer profile={profile} stage={stage} />
                        <BuildThaliGame profile={profile} onUpdateProfile={setProfile} />
                    </div>
                )}

                {/* TAB 2: STORY ROADMAP */}
                {activeTab === 'map' && (
                    <StoryJourneyMap
                        profile={profile}
                        onSelectWeek={(w) => {
                            setSelectedWeek(w);
                            setActiveTab('today');
                        }}
                        onTriggerBirthModal={() => setShowBirthModal(true)}
                    />
                )}

                {/* TAB 3: MINI GAMES & QUIZZES */}
                {activeTab === 'games' && (
                    <div className="space-y-6">
                        <BuildThaliGame profile={profile} onUpdateProfile={setProfile} />
                        <MythOrFactGame profile={profile} onUpdateProfile={setProfile} />
                        <SafeOrNotGame profile={profile} onUpdateProfile={setProfile} />
                        <HospitalBagGame profile={profile} onUpdateProfile={setProfile} />
                    </div>
                )}

                {/* TAB 4: BABY BOOK */}
                {activeTab === 'book' && <BabyBook profile={profile} />}

                {/* TAB 5: NEWBORN CARE */}
                {activeTab === 'newborn' && <NewbornJourney profile={profile} />}

                {/* TAB 6: BREASTFEEDING */}
                {activeTab === 'breastfeeding' && <BreastfeedingChapter profile={profile} onUpdateProfile={setProfile} />}

                {/* TAB 7: FAMILY MODE */}
                {activeTab === 'family' && <FamilySupportMode profile={profile} />}

                {/* TAB 8: ADMIN CMS */}
                {activeTab === 'cms' && <AdminCMS />}

            </main>

            {/* Birth Celebration Modal */}
            <BirthCelebrationModal
                isOpen={showBirthModal}
                onClose={() => setShowBirthModal(false)}
                onStartNewbornChapter={() => {
                    setShowBirthModal(false);
                    setActiveTab('newborn');
                }}
                lang={lang}
            />

            {/* Emergency Help Modal */}
            <EmergencyHelpModal
                isOpen={showEmergencyModal}
                onClose={() => setShowEmergencyModal(false)}
                lang={lang}
            />
        </div>
    );
}
