import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Dr. Vaibhavi Clinic collects, stores and protects your personal and medical information.",
  alternates: { canonical: '/privacy-policy' },
  openGraph: {
    type: 'website',
    title: "Privacy Policy",
    description: "How Dr. Vaibhavi Clinic collects, stores and protects your personal and medical information.",
    url: '/privacy-policy',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Privacy Policy",
    description: "How Dr. Vaibhavi Clinic collects, stores and protects your personal and medical information.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
