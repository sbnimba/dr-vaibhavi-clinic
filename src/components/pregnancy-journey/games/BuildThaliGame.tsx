"use client";
import { useState } from 'react';
import { UserProfile } from '@/types/pregnancy-journey';
import { THALI_FOODS } from '@/lib/pregnancy-journey-data';
import { addCarePoints } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
    onUpdateProfile: (updated: UserProfile) => void;
}

export default function BuildThaliGame({ profile, onUpdateProfile }: Props) {
    const lang = profile.language;
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [feedback, setFeedback] = useState<{ msg: string; success: boolean } | null>(null);

    const toggleItem = (id: string) => {
        const item = THALI_FOODS.find(f => f.id === id);
        if (!item) return;

        let nextSelected: string[];
        if (selectedIds.includes(id)) {
            nextSelected = selectedIds.filter(i => i !== id);
        } else {
            nextSelected = [...selectedIds, id];
            if (item.isHealthy) {
                const msg = lang === 'hi' ? `✅ बेहतरीन! ${item.reason.hi}` : lang === 'mr' ? `✅ उत्तम! ${item.reason.mr}` : `✅ Great! ${item.reason.en}`;
                setFeedback({ msg, success: true });
                speakText(msg, lang);
            } else {
                const msg = lang === 'hi' ? `⚠️ सावधानी रखें! ${item.reason.hi}` : lang === 'mr' ? `⚠️ काळजी घ्या! ${item.reason.mr}` : `⚠️ Precaution! ${item.reason.en}`;
                setFeedback({ msg, success: false });
                speakText(msg, lang);
            }
        }
        setSelectedIds(nextSelected);

        // Check if healthy items picked
        const healthyCount = nextSelected.filter(i => THALI_FOODS.find(f => f.id === i)?.isHealthy).length;
        if (healthyCount >= 3) {
            const updated = addCarePoints(50, 'nutrition_explorer');
            onUpdateProfile(updated);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-rose-100 my-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">🍛</span>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-gray-900">
                            {lang === 'hi' ? 'आज की स्वस्थ थाली (Build Your Thali)' : lang === 'mr' ? 'आजची निरोगी थाळी' : "Today's Healthy Thali"}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {lang === 'hi' ? 'किफायती और पौष्टिक भोजन चुनें (+50 अंक ⭐)' : lang === 'mr' ? 'पोषक आणि सोपे अन्न निवडा (+५० गुण ⭐)' : 'Pick affordable Indian foods (+50 pts ⭐)'}
                        </p>
                    </div>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                    {selectedIds.length} {lang === 'hi' ? 'चुने गए' : lang === 'mr' ? 'निवडले' : 'Picked'}
                </span>
            </div>

            {feedback && (
                <div className={`mb-4 p-3 rounded-2xl text-xs font-bold flex items-center gap-2 ${feedback.success ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-rose-50 text-rose-900 border border-rose-200'}`}>
                    <span>{feedback.success ? '👩‍⚕️' : '⚠️'}</span>
                    <p className="flex-1">{feedback.msg}</p>
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {THALI_FOODS.map((food) => {
                    const isSelected = selectedIds.includes(food.id);
                    return (
                        <button
                            key={food.id}
                            onClick={() => toggleItem(food.id)}
                            className={`p-3.5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between ${isSelected
                                    ? food.isHealthy
                                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-200 shadow-md'
                                        : 'bg-rose-50 border-rose-500 ring-2 ring-rose-200 shadow-md'
                                    : 'bg-gray-50/50 border-gray-200 hover:border-rose-300 hover:bg-white'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-3xl">{food.icon}</span>
                                {isSelected && (
                                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${food.isHealthy ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                                        {food.isHealthy ? '✓ Safe' : '✕ Avoid'}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs font-bold text-gray-900 leading-tight">{food.name[lang]}</p>
                            {food.costTier === 'low' && (
                                <span className="text-[9px] font-bold text-amber-700 mt-1 block">
                                    {lang === 'hi' ? '• किफायती देसी भोजन' : lang === 'mr' ? '• परवडणारे अन्न' : '• Affordable Indian'}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
