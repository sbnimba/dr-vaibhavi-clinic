"use client";
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types/pregnancy-journey';
import { getUserProfile, saveUserProfile } from '@/lib/pregnancy-store';
import OnboardingFlow from '@/components/pregnancy-journey/OnboardingFlow';
import MainDashboard from '@/components/pregnancy-journey/MainDashboard';

export default function JourneyPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const stored = getUserProfile();
        setProfile(stored);
        // Show onboarding only if user has never set their LMP
        // Otherwise go straight to the journey map
        if (!stored.hasConfirmedPregnancy && stored.journeyState === 'pre_pregnancy') {
            // Auto-advance to active_journey for returning users who already have a profile
            // This means the journey map shows FIRST, not the pre-pregnancy checker
            const updated = saveUserProfile({ journeyState: 'active_journey', hasConfirmedPregnancy: true });
            setProfile(updated);
        }
    }, []);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-rose-50">
                <div className="text-center p-6">
                    <span className="text-5xl animate-bounce block mb-3">🌸</span>
                    <p className="text-xs font-bold text-gray-500 animate-pulse">Loading your journey...</p>
                </div>
            </div>
        );
    }

    return <MainDashboard initialProfile={profile} />;
}
