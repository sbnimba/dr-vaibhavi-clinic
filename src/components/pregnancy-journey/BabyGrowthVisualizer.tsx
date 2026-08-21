"use client";
import { UserProfile, WeeklyStageContent } from '@/types/pregnancy-journey';
import { speakText } from '@/lib/audio-player';

interface Props {
    profile: UserProfile;
    stage: WeeklyStageContent;
}

export default function BabyGrowthVisualizer({ profile, stage }: Props) {
    const lang = profile.language;

    const handleListen = () => {
        const fruit = stage.fruitName[lang];
        const dev = stage.babyDevelopment[lang];
        const text = lang === 'hi'
            ? `हफ्ता ${stage.week}। आपका शिशु अभी ${fruit} जितना है। ${dev}`
            : lang === 'mr'
                ? `आठवडा ${stage.week}. तुमचे बाळ आता ${fruit} एवढे आहे. ${dev}`
                : `Week ${stage.week}. Your baby is the size of a ${fruit}. ${dev}`;
        speakText(text, lang);
    };

    return (
        <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 rounded-3xl p-6 sm:p-8 border-4 border-white shadow-xl relative overflow-hidden my-6">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-200/60">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full">
                        {lang === 'hi' ? 'शिशु का विकास' : lang === 'mr' ? 'बाळाचा विकास' : "Baby's Development"}
                    </span>
                    <span className="text-xs font-bold text-gray-600">
                        {lang === 'hi' ? `हफ्ता ${stage.week}` : lang === 'mr' ? `आठवडा ${stage.week}` : `Week ${stage.week}`}
                    </span>
                </div>
                <button
                    onClick={handleListen}
                    className="flex items-center gap-1 text-xs font-bold text-amber-900 bg-white px-3 py-1.5 rounded-full border border-amber-300 shadow-sm hover:bg-amber-100 transition"
                >
                    <span>🔊</span>
                    <span>{lang === 'hi' ? 'सुनें' : lang === 'mr' ? 'ऐका' : 'Listen'}</span>
                </button>
            </div>

            {/* Visual Fruit Comparison Card */}
            <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/80 backdrop-blur-md rounded-2xl p-5 mb-6 border border-amber-100 shadow-sm">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-5xl shadow-inner shrink-0 animate-pulse">
                    {stage.fruitIcon}
                </div>
                <div className="text-center sm:text-left">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                        {lang === 'hi' ? 'शिशु का आकार (Size Comparison)' : lang === 'mr' ? 'बाळाचा आकार' : 'Baby Size This Week'}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                        {stage.fruitName[lang]}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                        {lang === 'hi' ? 'आपका नन्हा मेहमान हर हफ्ते बड़ा और मजबूत हो रहा है!' : lang === 'mr' ? 'तुमचे बाळ प्रत्येक आठवड्यात मोठे आणि मजबूत होत आहे!' : 'Your baby is growing bigger and stronger every week!'}
                    </p>
                </div>
            </div>

            {/* Two Column Grid: Baby & Mother */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">👶</span>
                        <h4 className="font-bold text-sm text-gray-900">
                            {lang === 'hi' ? 'बच्चे में बदलाव' : lang === 'mr' ? 'बाळातील बदल' : "Baby's Milestones"}
                        </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                        {stage.babyDevelopment[lang]}
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-100">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">🤰</span>
                        <h4 className="font-bold text-sm text-gray-900">
                            {lang === 'hi' ? 'मां के शरीर में बदलाव' : lang === 'mr' ? 'आईच्या शरीरातील बदल' : "Mother's Body Changes"}
                        </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                        {stage.motherBodyChanges[lang]}
                    </p>
                </div>
            </div>

        </div>
    );
}
