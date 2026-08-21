"use client";
import { useState } from 'react';
import { UserProfile } from '@/types/pregnancy-journey';
import { BREASTFEEDING_ITEMS } from '@/lib/pregnancy-journey-data';
import { addCarePoints } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
    onUpdateProfile: (updated: UserProfile) => void;
}

export default function BreastfeedingChapter({ profile, onUpdateProfile }: Props) {
    const lang = profile.language;
    const [completedIds, setCompletedIds] = useState<string[]>([]);

    const handleAction = (id: string) => {
        const item = BREASTFEEDING_ITEMS.find(b => b.id === id);
        if (!item) return;

        if (!completedIds.includes(id)) {
            setCompletedIds([...completedIds, id]);
            const updated = addCarePoints(50, 'nourishment_hero');
            onUpdateProfile(updated);
        }

        speakText(item.recommendedAction[lang], lang);
    };

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-teal-100 text-left my-6">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-teal-100">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">🍼</span>
                    <div>
                        <h2 className="font-serif font-bold text-xl text-gray-900">
                            {lang === 'hi' ? 'अमृत पोषण: स्तनपान गाइड (The First Nourishment)' : lang === 'mr' ? 'पहिले अमृत पोषण' : 'The First Nourishment'}
                        </h2>
                        <p className="text-xs text-gray-500 font-medium">
                            {lang === 'hi' ? 'शिशु का पहला दूध और सही स्तनपान की जानकारी' : lang === 'mr' ? 'बाळाचे पहिले दूध व स्तनपानाची माहिती' : 'Early newborn feeding & professional support guidance'}
                        </p>
                    </div>
                </div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                    {completedIds.length} / {BREASTFEEDING_ITEMS.length} {lang === 'hi' ? 'पूर्ण' : 'Done'}
                </span>
            </div>

            <div className="space-y-4">
                {BREASTFEEDING_ITEMS.map((item) => {
                    const isDone = completedIds.includes(item.id);
                    return (
                        <div key={item.id} className="bg-teal-50/60 rounded-2xl p-5 border border-teal-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">{item.icon}</span>
                                <h3 className="font-serif font-bold text-sm sm:text-base text-gray-900 leading-snug">
                                    {item.situation[lang]}
                                </h3>
                            </div>

                            <p className="text-xs text-teal-900 font-medium leading-relaxed mb-4 pl-1">
                                💡 <strong>{lang === 'hi' ? 'सलाह:' : 'Guidance:'}</strong> {item.recommendedAction[lang]}
                            </p>

                            <button
                                onClick={() => handleAction(item.id)}
                                className={`w-full py-3 rounded-full text-xs font-bold transition flex items-center justify-center gap-2 ${isDone ? 'bg-teal-600 text-white shadow-xs' : 'bg-white border-2 border-teal-400 text-teal-900 hover:bg-teal-100'}`}
                            >
                                <span>{isDone ? '✓ Completed (+50 pts ⭐)' : '🔊 Read Aloud & Understand'}</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
