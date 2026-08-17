import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Essential Prenatal Tests: A Trimester-by-Trimester Guide",
  description: "Which prenatal tests and scans matter in each trimester, what each one screens for, and why early detection makes pregnancy safer for mother and baby.",
  alternates: { canonical: '/essential-prenatal-tests' },
  openGraph: {
    type: 'article',
    title: "Essential Prenatal Tests: A Trimester-by-Trimester Guide",
    description: "Which prenatal tests and scans matter in each trimester, what each one screens for, and why early detection makes pregnancy safer for mother and baby.",
    url: '/essential-prenatal-tests',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Essential Prenatal Tests: A Trimester-by-Trimester Guide",
    description: "Which prenatal tests and scans matter in each trimester, what each one screens for, and why early detection makes pregnancy safer for mother and baby.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
