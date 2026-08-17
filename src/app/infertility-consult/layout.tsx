import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Infertility: When to Seek Help and What Happens Next",
  description: "When a couple should seek an infertility evaluation, what the workup involves for both partners, and the treatment paths available.",
  alternates: { canonical: '/infertility-consult' },
  openGraph: {
    type: 'article',
    title: "Infertility: When to Seek Help and What Happens Next",
    description: "When a couple should seek an infertility evaluation, what the workup involves for both partners, and the treatment paths available.",
    url: '/infertility-consult',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Infertility: When to Seek Help and What Happens Next",
    description: "When a couple should seek an infertility evaluation, what the workup involves for both partners, and the treatment paths available.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
