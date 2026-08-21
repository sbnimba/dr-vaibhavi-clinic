export type AppLanguage = 'en' | 'hi' | 'mr';

export interface UserProfile {
    name: string;
    lmpDate: string; // YYYY-MM-DD
    expectedDueDate: string; // YYYY-MM-DD
    calculatedWeek: number; // 1 - 40+
    trimester: 1 | 2 | 3;
    isFirstPregnancy: boolean;
    language: AppLanguage;
    location?: string;
    carePoints: number;
    streakDays: number;
    unlockedBadges: string[];
    completedGameIds: string[];
    completedWeekLessons: number[];
}

export interface MultilingualText {
    en: string;
    hi: string;
    mr: string;
}

export interface WeeklyStageContent {
    week: number;
    trimester: 1 | 2 | 3;
    fruitIcon: string;
    fruitName: MultilingualText;
    babyDevelopment: MultilingualText;
    motherBodyChanges: MultilingualText;
    recommendedFoods: Array<{
        name: MultilingualText;
        icon: string;
        why: MultilingualText;
        isAffordable: boolean;
    }>;
    precautions: MultilingualText[];
    doctorVisitsAndTests: MultilingualText[];
    vaccinations: MultilingualText[];
    warningSigns: MultilingualText[];
}

export interface FoodThaliItem {
    id: string;
    name: MultilingualText;
    icon: string;
    category: 'protein' | 'carbs' | 'vitamins' | 'calcium' | 'avoid';
    isHealthy: boolean;
    reason: MultilingualText;
    costTier: 'low' | 'medium';
}

export interface MythFactItem {
    id: string;
    statement: MultilingualText;
    isMyth: boolean;
    explanation: MultilingualText;
}

export interface TrafficLightItem {
    id: string;
    title: MultilingualText;
    icon: string;
    status: 'green' | 'yellow' | 'red';
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

export interface AdminCMSItem {
    id: string;
    week: number;
    status: 'draft' | 'under_review' | 'approved';
    lastReviewedBy?: string;
    lastReviewedAt?: string;
    content: WeeklyStageContent;
}
