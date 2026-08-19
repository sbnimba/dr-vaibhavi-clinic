import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Patient Portal",
  description: "Look up and manage your appointment with Dr. Vaibhavi using your reference ID.",
  // Staff/patient screens carry no search value and must stay out of the index.
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
