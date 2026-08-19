import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "High-Risk Pregnancy: Warning Signs, Risk Factors & Care",
  description: "A gynaecologist's guide to high-risk pregnancy \u2014 who is at risk, the warning signs that need urgent attention, and how specialised monitoring keeps mother and baby safe.",
  alternates: { canonical: '/high-risk-pregnancy' },
  openGraph: {
    type: 'article',
    title: "High-Risk Pregnancy: Warning Signs, Risk Factors & Care",
    description: "A gynaecologist's guide to high-risk pregnancy \u2014 who is at risk, the warning signs that need urgent attention, and how specialised monitoring keeps mother and baby safe.",
    url: '/high-risk-pregnancy',
  },
  twitter: {
    card: 'summary_large_image',
    title: "High-Risk Pregnancy: Warning Signs, Risk Factors & Care",
    description: "A gynaecologist's guide to high-risk pregnancy \u2014 who is at risk, the warning signs that need urgent attention, and how specialised monitoring keeps mother and baby safe.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
