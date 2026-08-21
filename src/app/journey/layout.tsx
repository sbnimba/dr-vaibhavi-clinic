import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Pregnancy Journey | मेरी गर्भावस्था यात्रा | Dr. Vaibhavi',
    description: 'A mobile-first gamified pregnancy education app for Indian mothers. Learn trimester milestones, healthy thali nutrition, and precautions in Hindi, Marathi, and English.',
};

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-rose-50/40 min-h-screen">
            {children}
        </div>
    );
}
