import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "PCOS Risk Self-Assessment Quiz",
  description: "A short, private self-assessment to help you understand whether your symptoms suggest PCOS and whether it is worth seeing a gynaecologist.",
  alternates: { canonical: '/pcos-quiz' },
  openGraph: {
    type: 'website',
    title: "PCOS Risk Self-Assessment Quiz",
    description: "A short, private self-assessment to help you understand whether your symptoms suggest PCOS and whether it is worth seeing a gynaecologist.",
    url: '/pcos-quiz',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PCOS Risk Self-Assessment Quiz",
    description: "A short, private self-assessment to help you understand whether your symptoms suggest PCOS and whether it is worth seeing a gynaecologist.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
