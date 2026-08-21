"use client";
import { UserProfile } from '@/types/pregnancy-journey';
import { NEWBORN_MILESTONES } from '@/lib/pregnancy-journey-data';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
}

export default function NewbornJourney({ profile }: Props) {
    const lang = profile.language;

    const handleListen = (title: string, tips: string[]) => {
        const text = `${title}. ${tips.join(' ')}`;
        speakText(text, lang);
    };

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-emerald-100 text-left my-6">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-emerald-100">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">👶</span>
                    <div>
                        <h2 className="font-serif font-bold text-xl text-gray-900">
                            {lang === 'hi' ? 'पहले 100 दिन: नवजात शिशु देखभाल' : lang === 'mr' ? 'पहिले १०० दिवस: नवजात बाळाची काळजी' : 'The First 100 Days: Newborn Care'}
                        </h2>
                        <p className="text-xs text-gray-500 font-medium">
                            {lang === 'hi' ? 'जन्म के बाद शिशु और मां की देखभाल का गाइड' : lang === 'mr' ? 'जन्मानंतर बाळाची व आईची काळजी' : 'Post-delivery care guide for mother & baby'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {NEWBORN_MILESTONES.map((m) => (
                    <div key={m.id} className="bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{m.icon}</span>
                                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-600 text-white">
                                    {m.dayRange[lang]}
                                </span>
                            </div>
                            <button
                                onClick={() => handleListen(m.title[lang], m.careTips.map(t => t[lang]))}
                                className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-300 hover:bg-emerald-100"
                            >
                                🔊 {lang === 'hi' ? 'सुनें' : 'Listen'}
                            </button>
                        </div>

                        <h3 className="font-serif font-bold text-base text-gray-900 mb-2">
                            {m.title[lang]}
                        </h3>

                        <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
                            {m.careTips.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-emerald-600 font-bold">•</span>
                                    <span>{tip[lang]}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
