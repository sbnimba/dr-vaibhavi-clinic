export type AppLanguage = 'en' | 'hi' | 'mr';
export type DietaryPreference = 'veg' | 'non_veg';
export type JourneyState = 'pre_pregnancy' | 'confirmation' | 'active_journey' | 'birth_celebration' | 'newborn_care' | 'breastfeeding';

export interface MultilingualText {
    en: string;
    hi: string;
    mr: string;
}

export interface UserProfile {
    name: string;
    journeyState: JourneyState;
    lmpDate: string; // YYYY-MM-DD
    expectedDueDate: string; // YYYY-MM-DD
    calculatedWeek: number; // 1 - 40+
    trimester: 1 | 2 | 3;
    isFirstPregnancy: boolean;
    language: AppLanguage;
    dietaryPreference: DietaryPreference;
    carePoints: number;
    streakDays: number;
    unlockedBadges: string[];
    completedGameIds: string[];
    completedWeekLessons: number[];
    babyBookMemories: BabyBookMemory[];
    defeatedMyths: string[];
    hasConfirmedPregnancy: boolean;
}

export interface BabyBookMemory {
    id: string;
    week: number;
    title: MultilingualText;
    icon: string;
    dateUnlocked: string;
    description: MultilingualText;
}

export interface PrePregnancySymptom {
    id: string;
    title: MultilingualText;
    icon: string;
    isSelected: boolean;
}

export interface WeeklyStageContent {
    week: number;
    trimester: 1 | 2 | 3;
    fruitIcon: string;
    fruitName: MultilingualText;
    babyDevelopment: MultilingualText;
    motherBodyChanges: MultilingualText;
    interactiveQuiz: {
        question: MultilingualText;
        options: Array<{ id: string; label: MultilingualText; isCorrect: boolean }>;
        explanation: MultilingualText;
    };
    recommendedFoodsVeg: Array<{
        name: MultilingualText;
        icon: string;
        why: MultilingualText;
    }>;
    recommendedFoodsNonVeg: Array<{
        name: MultilingualText;
        icon: string;
        why: MultilingualText;
    }>;
    precautions: MultilingualText[];
    doctorVisitsAndTests: MultilingualText[];
    warningSigns: MultilingualText[];
}

export interface FoodThaliItem {
    id: string;
    name: MultilingualText;
    icon: string;
    category: 'protein' | 'carbs' | 'vitamins' | 'calcium' | 'avoid';
    isHealthy: boolean;
    isVegetarian: boolean;
    reason: MultilingualText;
}

export interface TrafficLightItem {
    id: string;
    icon: string;
    title: MultilingualText;
    status: 'green' | 'yellow' | 'red';
    explanation: MultilingualText;
}

export interface MythFactItem {
    id: string;
    statement: MultilingualText;
    isMyth: boolean;
    explanation: MultilingualText;
}

export interface HospitalBagItem {
    id: string;
    name: MultilingualText;
    icon: string;
    category: 'mother' | 'baby' | 'documents';
    isEssential: boolean;
}

export interface Badge {
    id: string;
    title: MultilingualText;
    icon: string;
    description: MultilingualText;
}

export interface NewbornCareMilestone {
    id: string;
    dayRange: MultilingualText;
    title: MultilingualText;
    icon: string;
    careTips: MultilingualText[];
}

export interface BreastfeedingSupportItem {
    id: string;
    situation: MultilingualText;
    icon: string;
    recommendedAction: MultilingualText;
    type: 'observe' | 'doctor' | 'urgent';
}
