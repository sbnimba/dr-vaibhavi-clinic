import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "First Trimester Nutrition: What to Eat in Early Pregnancy",
  description: "Practical first-trimester nutrition guidance \u2014 the nutrients that matter most, managing nausea, and foods to avoid in early pregnancy.",
  alternates: { canonical: '/nutrition-first-trimester' },
  openGraph: {
    type: 'article',
    title: "First Trimester Nutrition: What to Eat in Early Pregnancy",
    description: "Practical first-trimester nutrition guidance \u2014 the nutrients that matter most, managing nausea, and foods to avoid in early pregnancy.",
    url: '/nutrition-first-trimester',
  },
  twitter: {
    card: 'summary_large_image',
    title: "First Trimester Nutrition: What to Eat in Early Pregnancy",
    description: "Practical first-trimester nutrition guidance \u2014 the nutrients that matter most, managing nausea, and foods to avoid in early pregnancy.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
