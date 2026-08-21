"use client";
import { UserProfile } from '@/types/pregnancy-journey';

interface Props {
    profile: UserProfile;
    onSelectWeek: (week: number) => void;
}

export default function JourneyMap({ profile, onSelectWeek }: Props) {
    const lang = profile.language;
    const currentWeek = profile.calculatedWeek;

    const CHAPTERS = [
        {
            level: 1,
            range: 'Weeks 1–4',
            title: { en: 'Level 1: The Journey Begins', hi: 'स्तर १: यात्रा की शुरुआत', mr: 'पातळी १: प्रवासाची सुरुवात' },
            desc: { en: 'Conception, early signs, first doctor confirmation.', hi: 'गर्भाधान, शुरुआती लक्षण और डॉक्टर की पुष्टि।', mr: 'गरोदरपणाचे सुरुवातीचे लक्षण व डॉक्टरांची खात्री.' },
            icon: '🌱',
            color: 'from-emerald-500 to-teal-600',
            bg: 'bg-emerald-50 border-emerald-200',
            weeks: [1, 2, 3, 4]
        },
        {
            level: 2,
            range: 'Weeks 5–12',
            title: { en: 'Level 2: Baby is Growing', hi: 'स्तर २: शिशु का विकास', mr: 'पातळी २: बाळाची वाढ' },
            desc: { en: 'Heartbeat, essential tests, healthy thali nutrition.', hi: 'धड़कन, आवश्यक टेस्ट और पौष्टिक आहार।', mr: 'ठोके, आवश्यक टेस्ट आणि पोषक आहार.' },
            icon: '❤️',
            color: 'from-rose-500 to-pink-600',
            bg: 'bg-rose-50 border-rose-200',
            weeks: [6, 8, 10, 12]
        },
        {
            level: 3,
            range: 'Weeks 13–27',
            title: { en: 'Level 3: Feeling the Journey', hi: 'स्तर ३: हलचल और ऊर्जा', mr: 'पातळी ३: हालचाल आणि ऊर्जा' },
            desc: { en: 'Baby kicks, energy boost, daily healthy routine.', hi: 'बच्चे की लात/हलचल, हीमोग्लोबिन और दिनचर्या।', mr: 'बाळाची हालचाल, हिमोग्लोबिन आणि दिनचर्या.' },
            icon: '🌸',
            color: 'from-purple-500 to-indigo-600',
            bg: 'bg-purple-50 border-purple-200',
            weeks: [16, 20, 24, 27]
        },
        {
            level: 4,
            range: 'Weeks 28–40+',
            title: { en: 'Level 4: Getting Ready for Delivery', hi: 'स्तर ४: डिलीवरी की तैयारी', mr: 'पातळी ४: डिलिव्हरीची तयारी' },
            desc: { en: 'Hospital bag packing, birth plan, delivery signs.', hi: 'अस्पताल बैग, प्रसव संकेत और तैयारी।', mr: 'हॉस्पिटल बॅग, डिलिव्हरीची लक्षणे व तयारी.' },
            icon: '👶',
            color: 'from-amber-500 to-orange-600',
            bg: 'bg-amber-50 border-amber-200',
            weeks: [30, 34, 36, 40]
        }
    ];

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 text-left my-8">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-100">
                <div>
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        🧭 Duolingo-Style Journey Map
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">
                        {lang === 'hi' ? 'आपकी गर्भावस्था रोडमैप' : lang === 'mr' ? 'तुमचा गरोदरपणाचा रोडमॅप' : 'Your Pregnancy Roadmap'}
                    </h2>
                </div>
                <span className="text-xs font-extrabold text-white bg-rose-600 px-3.5 py-1.5 rounded-full shadow-sm">
                    {lang === 'hi' ? `हफ्ता ${currentWeek}` : lang === 'mr' ? `आठवडा ${currentWeek}` : `Week ${currentWeek}`}
                </span>
            </div>

            {/* Chapters Grid */}
            <div className="space-y-6">
                {CHAPTERS.map((chap) => {
                    const isCurrentChapter = (chap.level === 1 && currentWeek <= 4) ||
                        (chap.level === 2 && currentWeek >= 5 && currentWeek <= 12) ||
                        (chap.level === 3 && currentWeek >= 13 && currentWeek <= 27) ||
                        (chap.level === 4 && currentWeek >= 28);

                    return (
                        <div
                            key={chap.level}
                            className={`rounded-2xl p-5 border-2 transition-all relative overflow-hidden ${isCurrentChapter ? chap.bg + ' ring-2 ring-rose-300 shadow-md' : 'bg-gray-50 border-gray-200'}`}
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${chap.color} text-white flex items-center justify-center text-2xl shadow-md shrink-0`}>
                                        {chap.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-gray-700 shadow-xs border">
                                                {chap.range}
                                            </span>
                                            {isCurrentChapter && (
                                                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                                                    YOU ARE HERE
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-serif font-bold text-base text-gray-900 mt-0.5">
                                            {chap.title[lang]}
                                        </h3>
                                        <p className="text-xs text-gray-600">{chap.desc[lang]}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Node Path Buttons */}
                            <div className="flex items-center gap-3 overflow-x-auto pt-2 pb-1">
                                {chap.weeks.map((w) => {
                                    const isSelected = w === currentWeek || (currentWeek > w && w === chap.weeks[chap.weeks.length - 1]);
                                    return (
                                        <button
                                            key={w}
                                            onClick={() => onSelectWeek(w)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${isSelected ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'}`}
                                        >
                                            <span>W{w}</span>
                                            {w <= currentWeek ? <span>✓</span> : <span>🔒</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
