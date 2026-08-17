import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms of use for the Dr. Vaibhavi Clinic website and online appointment booking.",
  alternates: { canonical: '/terms-conditions' },
  openGraph: {
    type: 'website',
    title: "Terms & Conditions",
    description: "Terms of use for the Dr. Vaibhavi Clinic website and online appointment booking.",
    url: '/terms-conditions',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Terms & Conditions",
    description: "Terms of use for the Dr. Vaibhavi Clinic website and online appointment booking.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
