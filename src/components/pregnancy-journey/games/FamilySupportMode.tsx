"use client";
import { useState } from 'react';
import { UserProfile } from '@/types/pregnancy-journey';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
}

export default function FamilySupportMode({ profile }: Props) {
    const lang = profile.language;
    const [selectedAction, setSelectedAction] = useState<number | null>(null);

    const ACTIONS = [
        {
            icon: '🥛',
            title: { en: 'Offer Milk & Calcium Snack', hi: 'दूध और ताजा नाश्ता दें', mr: 'दूध आणि ताजा नाश्ता द्या' },
            desc: { en: 'Help her stay hydrated and nourished without asking.', hi: 'बिना मांगे उन्हें समय पर दूध और नाश्ता दें।', mr: 'न मागता त्यांना वेळेवर दूध आणि नाश्ता द्या.' }
        },
        {
            icon: '🛍️',
            title: { en: 'Carry Heavy Buckets & Groceries', hi: 'भारी सामान और पानी की बाल्टी उठाएं', mr: 'जड सामान व पाण्याची बादली उचला' },
            desc: { en: 'Never let a pregnant woman lift heavy objects.', hi: 'गर्भवती महिला को कभी भारी बाल्टी न उठाने दें।', mr: 'गरोदर स्त्रीला कधीही जड बादली उचलू देऊ नका.' }
        },
        {
            icon: '💊',
            title: { en: 'Remind Iron & Calcium Pills', hi: 'समय पर दवाइयां याद दिलाएं', mr: 'वेळेवर औषधांची आठवण करून द्या' },
            desc: { en: 'Keep her iron-folic acid and calcium pills ready after meals.', hi: 'खाने के बाद उनकी गोलियां पास लाकर दें।', mr: 'जेवणानंतर त्यांच्या गोळ्या जवळ आणून द्या.' }
        }
    ];

    const handleSelect = (idx: number) => {
        setSelectedAction(idx);
        speakText(ACTIONS[idx].desc[lang], lang);
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-indigo-100 my-6">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-indigo-200/60">
                <span className="text-3xl">👨‍👩‍👧</span>
                <div>
                    <h3 className="font-serif font-bold text-lg text-indigo-950">
                        {lang === 'hi' ? 'परिवार सहायता मोड (Family Support Mode)' : lang === 'mr' ? 'कुटुंब मदत मोड' : 'Family Support Mode'}
                    </h3>
                    <p className="text-xs text-indigo-700 font-medium">
                        {lang === 'hi' ? 'पति और परिवार के सदस्य आज कैसे मदद कर सकते हैं?' : lang === 'mr' ? 'पती आणि कुटुंबीय आज कशी मदत करू शकतात?' : 'How husbands & family members can help today:'}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {ACTIONS.map((act, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${selectedAction === idx ? 'bg-white border-indigo-500 shadow-md ring-2 ring-indigo-200' : 'bg-white/80 border-indigo-100 hover:bg-white'}`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{act.icon}</span>
                            <div>
                                <p className="font-bold text-xs sm:text-sm text-gray-900">{act.title[lang]}</p>
                                <p className="text-[11px] text-gray-600 mt-0.5">{act.desc[lang]}</p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
