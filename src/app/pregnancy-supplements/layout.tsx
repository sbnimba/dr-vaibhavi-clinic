import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pregnancy Supplements: Folic Acid, Iron, Calcium & Vitamin D",
  description: "Which supplements are genuinely needed during pregnancy, correct dosages by trimester, and why self-prescribing can do harm.",
  alternates: { canonical: '/pregnancy-supplements' },
  openGraph: {
    type: 'article',
    title: "Pregnancy Supplements: Folic Acid, Iron, Calcium & Vitamin D",
    description: "Which supplements are genuinely needed during pregnancy, correct dosages by trimester, and why self-prescribing can do harm.",
    url: '/pregnancy-supplements',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pregnancy Supplements: Folic Acid, Iron, Calcium & Vitamin D",
    description: "Which supplements are genuinely needed during pregnancy, correct dosages by trimester, and why self-prescribing can do harm.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
