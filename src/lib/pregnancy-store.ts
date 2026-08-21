import { UserProfile, AppLanguage } from '@/types/pregnancy-journey';

const STORAGE_KEY = 'dr_vaibhavi_pregnancy_profile_v1';

export const DEFAULT_USER_PROFILE: UserProfile = {
    name: 'मीना',
    lmpDate: '2026-04-01',
    expectedDueDate: '2027-01-06',
    calculatedWeek: 20,
    trimester: 2,
    isFirstPregnancy: true,
    language: 'hi',
    carePoints: 350,
    streakDays: 4,
    unlockedBadges: ['nutrition_explorer', 'hydration_hero'],
    completedGameIds: [],
    completedWeekLessons: [4, 12]
};

export function calculatePregnancyDetails(lmpDateString: string): { week: number; trimester: 1 | 2 | 3; dueDate: string } {
    try {
        const lmp = new Date(lmpDateString);
        if (isNaN(lmp.getTime())) {
            throw new Error('Invalid LMP date');
        }

        const now = new Date();
        const diffMs = Math.max(0, now.getTime() - lmp.getTime());
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const week = Math.min(42, Math.max(1, Math.floor(diffDays / 7) + 1));

        let trimester: 1 | 2 | 3 = 1;
        if (week >= 13 && week <= 27) trimester = 2;
        if (week >= 28) trimester = 3;

        // Due date = LMP + 280 days (40 weeks)
        const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
        const dueDate = due.toISOString().split('T')[0];

        return { week, trimester, dueDate };
    } catch {
        return { week: 20, trimester: 2, dueDate: '2027-01-06' };
    }
}

export function getUserProfile(): UserProfile {
    if (typeof window === 'undefined') return DEFAULT_USER_PROFILE;
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return DEFAULT_USER_PROFILE;
        return JSON.parse(stored);
    } catch {
        return DEFAULT_USER_PROFILE;
    }
}

export function saveUserProfile(profile: Partial<UserProfile>): UserProfile {
    const current = getUserProfile();
    const updated: UserProfile = { ...current, ...profile };

    if (profile.lmpDate) {
        const details = calculatePregnancyDetails(profile.lmpDate);
        updated.calculatedWeek = details.week;
        updated.trimester = details.trimester;
        updated.expectedDueDate = details.dueDate;
    }

    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
            console.error('Failed to save user profile:', e);
        }
    }
    return updated;
}

export function addCarePoints(points: number, badgeId?: string): UserProfile {
    const profile = getUserProfile();
    profile.carePoints += points;

    if (badgeId && !profile.unlockedBadges.includes(badgeId)) {
        profile.unlockedBadges.push(badgeId);
    }

    return saveUserProfile(profile);
}
