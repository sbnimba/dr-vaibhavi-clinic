"use client";
import { useState } from 'react';
import { UserProfile } from '@/types/pregnancy-journey';
import { HOSPITAL_BAG_ITEMS } from '@/lib/pregnancy-journey-data';
import { addCarePoints } from '@/lib/pregnancy-store';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
    onUpdateProfile: (updated: UserProfile) => void;
}

export default function HospitalBagGame({ profile, onUpdateProfile }: Props) {
    const lang = profile.language;
    const [packedIds, setPackedIds] = useState<string[]>([]);

    const toggleItem = (id: string) => {
        let nextPacked: string[];
        if (packedIds.includes(id)) {
            nextPacked = packedIds.filter(i => i !== id);
        } else {
            nextPacked = [...packedIds, id];
            const item = HOSPITAL_BAG_ITEMS.find(h => h.id === id);
            if (item) {
                const msg = lang === 'hi'
                    ? (item.isEssential ? `✅ ${item.name.hi} बैकपैक में रखा गया!` : `⚠️ ${item.name.hi} जरूरी नहीं है।`)
                    : (item.isEssential ? `✅ Packed ${item.name.en}!` : `⚠️ ${item.name.en} is optional.`);
                speakText(msg, lang);
            }
        }
        setPackedIds(nextPacked);

        const essentialPacked = nextPacked.filter(i => HOSPITAL_BAG_ITEMS.find(h => h.id === i)?.isEssential).length;
        if (essentialPacked >= 4) {
            const updated = addCarePoints(100, 'hospital_bag');
            onUpdateProfile(updated);
        }
    };

    return (
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-blue-100 my-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">🎒</span>
                    <div>
                        <h3 className="font-serif font-bold text-lg text-gray-900">
                            {lang === 'hi' ? 'अस्पताल डिलीवरी बैग पैक करें' : lang === 'mr' ? 'हॉस्पिटल डिलिव्हरी बॅग पॅक करा' : 'Pack Hospital Delivery Bag'}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {lang === 'hi' ? 'जरूरी सामान चुनें (+100 अंक ⭐)' : lang === 'mr' ? 'आवश्यक वस्तू निवडा (+१०० गुण ⭐)' : 'Pack essential items (+100 pts ⭐)'}
                        </p>
                    </div>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                    {packedIds.length} / 5 {lang === 'hi' ? 'पैक्ड' : lang === 'mr' ? 'पॅक' : 'Packed'}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {HOSPITAL_BAG_ITEMS.map((item) => {
                    const isPacked = packedIds.includes(item.id);
                    return (
                        <button
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            className={`p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${isPacked
                                    ? item.isEssential
                                        ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200 shadow-md'
                                        : 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
                                    : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                <span className="text-xs font-bold text-gray-900">{item.name[lang]}</span>
                            </div>
                            {isPacked && (
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${item.isEssential ? 'bg-blue-600 text-white' : 'bg-amber-600 text-white'}`}>
                                    {item.isEssential ? '✓ Essential' : 'Optional'}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
