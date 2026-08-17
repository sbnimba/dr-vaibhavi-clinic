import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Pregnancy Warning Signs You Should Never Ignore",
  description: "Symptoms during pregnancy that need urgent medical attention \u2014 bleeding, severe pain, reduced fetal movement and more, explained by an obstetrician.",
  alternates: { canonical: '/pregnancy-warning-signs' },
  openGraph: {
    type: 'article',
    title: "Pregnancy Warning Signs You Should Never Ignore",
    description: "Symptoms during pregnancy that need urgent medical attention \u2014 bleeding, severe pain, reduced fetal movement and more, explained by an obstetrician.",
    url: '/pregnancy-warning-signs',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pregnancy Warning Signs You Should Never Ignore",
    description: "Symptoms during pregnancy that need urgent medical attention \u2014 bleeding, severe pain, reduced fetal movement and more, explained by an obstetrician.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
