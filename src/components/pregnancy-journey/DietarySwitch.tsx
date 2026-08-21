"use client";
import { DietaryPreference } from '@/types/pregnancy-journey';

interface Props {
    diet: DietaryPreference;
    onToggle: (newDiet: DietaryPreference) => void;
}

export default function DietarySwitch({ diet, onToggle }: Props) {
    return (
        <div className="flex items-center bg-white rounded-full p-1 border border-gray-200 shadow-sm">
            <button
                onClick={() => onToggle('veg')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${diet === 'veg' ? 'bg-emerald-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
            >
                <span>🌱</span>
                <span>VEG</span>
            </button>
            <button
                onClick={() => onToggle('non_veg')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 ${diet === 'non_veg' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
            >
                <span>🍗</span>
                <span>NON-VEG</span>
            </button>
        </div>
    );
}
