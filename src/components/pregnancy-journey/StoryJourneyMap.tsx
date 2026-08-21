"use client";
import { UserProfile } from '@/types/pregnancy-journey';

interface Props {
    profile: UserProfile;
    onSelectWeek: (week: number) => void;
    onTriggerBirthModal: () => void;
}

export default function StoryJourneyMap({ profile, onSelectWeek, onTriggerBirthModal }: Props) {
    const lang = profile.language;
    const currentWeek = profile.calculatedWeek;

    const STORY_STAGES = [
        {
            stage: 1,
            title: { en: 'A Tiny Beginning', hi: 'नन्ही शुरुआत (हफ्ता 1-4)', mr: 'चिमुकली सुरुवात' },
            icon: '🌱',
            weeks: [1, 2, 3, 4],
            unlocked: true,
            bg: 'from-emerald-500 to-teal-600'
        },
        {
            stage: 2,
            title: { en: 'Growing Together', hi: 'साथ-साथ विकास (हफ्ता 5-12)', mr: 'एकत्रित वाढ' },
            icon: '❤️',
            weeks: [6, 8, 10, 12],
            unlocked: currentWeek >= 5 || profile.hasConfirmedPregnancy,
            bg: 'from-rose-500 to-pink-600'
        },
        {
            stage: 3,
            title: { en: 'Feeling Baby', hi: 'शिशु की पहली हलचल (हफ्ता 13-27)', mr: 'बाळाची हालचाल' },
            icon: '🌸',
            weeks: [16, 20, 24, 27],
            unlocked: currentWeek >= 13,
            bg: 'from-purple-500 to-indigo-600'
        },
        {
            stage: 4,
            title: { en: 'Almost Ready', hi: 'अंतिम तैयारी (हफ्ता 28-36)', mr: 'अंतिम तयारी' },
            icon: '👶',
            weeks: [28, 32, 34, 36],
            unlocked: currentWeek >= 28,
            bg: 'from-amber-500 to-orange-600'
        },
        {
            stage: 5,
            title: { en: 'Ready for Birth & Hospital Bag', hi: 'अस्पताल और प्रसव बैग (हफ्ता 37-40)', mr: 'हॉस्पिटल व डिलिव्हरी बॅग' },
            icon: '🎒',
            weeks: [37, 38, 39, 40],
            unlocked: currentWeek >= 36,
            bg: 'from-red-500 to-rose-600'
        }
    ];

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 text-left my-6">
            
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <div>
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        🗺️ Story Roadmap
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">
                        {lang === 'hi' ? 'आपकी गर्भावस्था की कहानी' : lang === 'mr' ? 'तुमच्या प्रवासाची गोष्ट' : 'Your Story Roadmap'}
                    </h2>
                </div>
                <div className="text-right">
                    <span className="text-xs font-extrabold text-white bg-rose-600 px-3 py-1 rounded-full shadow-xs">
                        Week {currentWeek} of 40
                    </span>
                    <p className="text-[10px] text-gray-500 font-bold mt-1">
                        ⭐ {profile.carePoints} Points • 🏅 {profile.unlockedBadges.length} Badges
                    </p>
                </div>
            </div>

            {/* Visual Path */}
            <div className="space-y-6">
                {STORY_STAGES.map((stg) => {
                    const isCurrent = currentWeek >= stg.weeks[0] && currentWeek <= stg.weeks[stg.weeks.length - 1];

                    return (
                        <div
                            key={stg.stage}
                            className={`rounded-2xl p-5 border-2 transition-all relative overflow-hidden ${isCurrent ? 'bg-rose-50/70 border-rose-400 ring-2 ring-rose-200 shadow-md' : stg.unlocked ? 'bg-gray-50 border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${stg.bg} text-white flex items-center justify-center text-2xl shadow-sm shrink-0`}>
                                        {stg.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-serif font-bold text-base text-gray-900">
                                            {stg.title[lang]}
                                        </h3>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {stg.unlocked ? (isCurrent ? '● YOU ARE HERE' : '🔓 Unlocked') : '🔒 Locked'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Node Buttons */}
                            <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1">
                                {stg.weeks.map((w) => {
                                    const isSelected = w === currentWeek;
                                    return (
                                        <button
                                            key={w}
                                            disabled={!stg.unlocked}
                                            onClick={() => onSelectWeek(w)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${isSelected ? 'bg-gray-900 text-white shadow-md' : stg.unlocked ? 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                        >
                                            <span>Week {w}</span>
                                            {w <= currentWeek ? <span>✓</span> : <span>🔒</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {/* Final Birth Stage Node */}
                <div className="bg-gradient-to-r from-purple-900 to-slate-900 rounded-2xl p-6 text-white text-center shadow-xl">
                    <span className="text-4xl block mb-2 animate-bounce">🏥</span>
                    <h3 className="font-serif font-bold text-xl mb-1">
                        {lang === 'hi' ? 'द बिग डे: शिशु का जन्म' : 'The Big Day: Birth Celebration'}
                    </h3>
                    <p className="text-xs text-purple-200 mb-4">
                        {lang === 'hi' ? 'जब भी आपका शुभ अवसर आये, जश्न का बटन दबाएं!' : 'Tap to celebrate the arrival of your little one!'}
                    </p>
                    <button
                        onClick={onTriggerBirthModal}
                        className="bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-400 text-gray-950 font-extrabold px-6 py-3 rounded-full text-xs sm:text-sm shadow-lg transition"
                    >
                        🎉 {lang === 'hi' ? 'जन्म का उत्सव मनाएं!' : 'Celebrate Birth Milestone!'}
                    </button>
                </div>

            </div>
        </div>
    );
}
