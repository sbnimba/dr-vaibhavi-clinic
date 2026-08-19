import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Baby Growth Month by Month: Development Through Pregnancy",
  description: "How your baby develops from month one to birth \u2014 key milestones, movement, and what to expect at each stage of pregnancy.",
  alternates: { canonical: '/baby-growth-pregnancy' },
  openGraph: {
    type: 'article',
    title: "Baby Growth Month by Month: Development Through Pregnancy",
    description: "How your baby develops from month one to birth \u2014 key milestones, movement, and what to expect at each stage of pregnancy.",
    url: '/baby-growth-pregnancy',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Baby Growth Month by Month: Development Through Pregnancy",
    description: "How your baby develops from month one to birth \u2014 key milestones, movement, and what to expect at each stage of pregnancy.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
