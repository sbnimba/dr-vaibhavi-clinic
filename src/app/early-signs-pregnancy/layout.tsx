import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Early Signs of Pregnancy: What's Normal and What Isn't",
  description: "The earliest symptoms of pregnancy explained by an obstetrician \u2014 which signs are completely normal, which need a doctor, and when to take a test.",
  alternates: { canonical: '/early-signs-pregnancy' },
  openGraph: {
    type: 'article',
    title: "Early Signs of Pregnancy: What's Normal and What Isn't",
    description: "The earliest symptoms of pregnancy explained by an obstetrician \u2014 which signs are completely normal, which need a doctor, and when to take a test.",
    url: '/early-signs-pregnancy',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Early Signs of Pregnancy: What's Normal and What Isn't",
    description: "The earliest symptoms of pregnancy explained by an obstetrician \u2014 which signs are completely normal, which need a doctor, and when to take a test.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
