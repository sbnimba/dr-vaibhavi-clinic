import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Complete Pregnancy Diet Guide",
  description: "A full trimester-by-trimester pregnancy diet plan covering nutrients, meal ideas, and foods to avoid.",
  alternates: { canonical: '/pregnancy-diet-guide' },
  openGraph: {
    type: 'article',
    title: "Complete Pregnancy Diet Guide",
    description: "A full trimester-by-trimester pregnancy diet plan covering nutrients, meal ideas, and foods to avoid.",
    url: '/pregnancy-diet-guide',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Complete Pregnancy Diet Guide",
    description: "A full trimester-by-trimester pregnancy diet plan covering nutrients, meal ideas, and foods to avoid.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
