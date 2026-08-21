"use client";
import { UserProfile } from '@/types/pregnancy-journey';
import { BADGES } from '@/lib/pregnancy-journey-data';

interface Props {
    profile: UserProfile;
}

export default function BabyBook({ profile }: Props) {
    const lang = profile.language;

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-rose-100 text-left my-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-rose-100">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">📖</span>
                    <div>
                        <h2 className="font-serif font-bold text-xl text-gray-900">
                            {lang === 'hi' ? 'हमारी यात्रा किताब (Our Journey Book)' : lang === 'mr' ? 'आपली प्रवास पुस्तिका' : 'Our Journey Memory Book'}
                        </h2>
                        <p className="text-xs text-gray-500 font-medium">
                            {lang === 'hi' ? 'आपकी गर्भावस्था की सभी खूबसूरत यादें और पड़ाव' : lang === 'mr' ? 'तुमच्या गरोदरपणाच्या सर्व सुंदर आठवणी' : 'Your completed milestones & memories'}
                        </p>
                    </div>
                </div>
                <span className="text-xs font-extrabold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full">
                    {profile.babyBookMemories.length} {lang === 'hi' ? 'यादें' : lang === 'mr' ? 'आठवणी' : 'Pages'}
                </span>
            </div>

            {/* Book Pages List */}
            <div className="space-y-4 mb-8">
                {profile.babyBookMemories.map((mem) => (
                    <div key={mem.id} className="bg-rose-50/60 rounded-2xl p-4 border border-rose-200 shadow-sm flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-xs shrink-0">
                            {mem.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-600 text-white">
                                    Week {mem.week}
                                </span>
                                <span className="text-[10px] text-gray-400 font-bold">{mem.dateUnlocked}</span>
                            </div>
                            <h4 className="font-serif font-bold text-sm text-gray-900">
                                {mem.title[lang]}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
                                {mem.description[lang]}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Badges Collection */}
            <div className="pt-4 border-t border-gray-100">
                <h3 className="font-serif font-bold text-base text-gray-900 mb-3 flex items-center gap-2">
                    <span>🏆</span>
                    {lang === 'hi' ? 'हसिल किए गए मेडल' : lang === 'mr' ? 'मिळालेले मेडल' : 'Unlocked Badges'}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BADGES.map((b) => {
                        const isUnlocked = profile.unlockedBadges.includes(b.id);
                        return (
                            <div
                                key={b.id}
                                className={`p-3 rounded-2xl border transition text-left flex items-center gap-3 ${isUnlocked ? 'bg-amber-50 border-amber-300 shadow-xs' : 'bg-gray-50 border-gray-200 opacity-40'}`}
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
    );
}
