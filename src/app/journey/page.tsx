"use client";
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types/pregnancy-journey';
import { getUserProfile } from '@/lib/pregnancy-store';
import OnboardingFlow from '@/components/pregnancy-journey/OnboardingFlow';
import MainDashboard from '@/components/pregnancy-journey/MainDashboard';

export default function JourneyPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(false);

    useEffect(() => {
        const stored = getUserProfile();
        setProfile(stored);
        // Check if user has initialized their profile
        if (stored && stored.lmpDate) {
            setIsOnboardingCompleted(true);
        }
    }, []);

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-rose-50">
                <div className="text-center p-6">
                    <span className="text-4xl animate-bounce block mb-2">🌸</span>
                    <p className="text-xs font-bold text-gray-500">Loading Journey...</p>
                </div>
            </div>
        );
    }

    if (!isOnboardingCompleted) {
        return (
            <OnboardingFlow
                onComplete={(updated) => {
                    setProfile(updated);
                    setIsOnboardingCompleted(true);
                }}
            />
        );
    }

    return <MainDashboard initialProfile={profile} />;
}
