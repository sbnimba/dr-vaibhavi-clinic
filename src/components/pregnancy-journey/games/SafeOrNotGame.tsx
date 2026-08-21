"use client";
import { useState } from 'react';
import { UserProfile } from '@/types/pregnancy-journey';
import { TRAFFIC_LIGHT_ITEMS } from '@/lib/pregnancy-journey-data';
import { addCarePoints } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
    onUpdateProfile: (updated: UserProfile) => void;
}

export default function SafeOrNotGame({ profile, onUpdateProfile }: Props) {
    const lang = profile.language;
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelectedId(id);
        const item = TRAFFIC_LIGHT_ITEMS.find(t => t.id === id);
        if (item) {
            speakText(item.explanation[lang], lang);
            const updated = addCarePoints(25);
            onUpdateProfile(updated);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-emerald-100 my-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">🚦</span>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-gray-900">
                            {lang === 'hi' ? 'सुरक्षा सिग्नल (Safe or Not?)' : lang === 'mr' ? 'सुरक्षा सिग्नल' : 'Safe or Not?'}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {lang === 'hi' ? 'दैनिक आदतों की जांच करें (+25 अंक ⭐)' : lang === 'mr' ? 'रोजच्या सवयी तपासा (+२५ गुण ⭐)' : 'Check daily safety habits (+25 pts ⭐)'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {TRAFFIC_LIGHT_ITEMS.map((item) => {
                    const isSelected = selectedId === item.id;
                    const badgeBg = item.status === 'green' ? 'bg-emerald-600' : item.status === 'yellow' ? 'bg-amber-500' : 'bg-rose-600';
                    const badgeText = item.status === 'green' ? '🟢 Safe' : item.status === 'yellow' ? '🟡 Ask Doctor' : '🔴 Avoid';

                    return (
                        <div key={item.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                            <button
                                onClick={() => handleSelect(item.id)}
                                className="w-full flex items-center justify-between text-left"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{item.icon}</span>
                                    <p className="font-bold text-xs sm:text-sm text-gray-900">{item.title[lang]}</p>
                                </div>
                                <span className={`text-[10px] font-extrabold text-white px-2.5 py-1 rounded-full ${badgeBg}`}>
                                    {badgeText}
                                </span>
                            </button>

                            {isSelected && (
                                <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-700 font-medium animate-fade-in flex items-center gap-2">
                                    <span>👩‍⚕️</span>
                                    <p>{item.explanation[lang]}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
