import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Normal Delivery vs C-Section: An Honest Comparison",
  description: "A balanced comparison of vaginal delivery and caesarean section \u2014 recovery, risks, when a C-section is medically necessary, and how to prepare for labour.",
  alternates: { canonical: '/normal-delivery-vs-csection' },
  openGraph: {
    type: 'article',
    title: "Normal Delivery vs C-Section: An Honest Comparison",
    description: "A balanced comparison of vaginal delivery and caesarean section \u2014 recovery, risks, when a C-section is medically necessary, and how to prepare for labour.",
    url: '/normal-delivery-vs-csection',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Normal Delivery vs C-Section: An Honest Comparison",
    description: "A balanced comparison of vaginal delivery and caesarean section \u2014 recovery, risks, when a C-section is medically necessary, and how to prepare for labour.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
