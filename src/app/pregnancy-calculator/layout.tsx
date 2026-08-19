import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator",
  description: "Calculate your estimated due date, current pregnancy week and trimester from your last menstrual period, with a month-by-month development timeline.",
  alternates: { canonical: '/pregnancy-calculator' },
  openGraph: {
    type: 'website',
    title: "Pregnancy Due Date Calculator",
    description: "Calculate your estimated due date, current pregnancy week and trimester from your last menstrual period, with a month-by-month development timeline.",
    url: '/pregnancy-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pregnancy Due Date Calculator",
    description: "Calculate your estimated due date, current pregnancy week and trimester from your last menstrual period, with a month-by-month development timeline.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
