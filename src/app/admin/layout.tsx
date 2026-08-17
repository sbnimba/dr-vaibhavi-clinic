import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Staff Portal",
  description: "Secure staff login for Dr. Vaibhavi Clinic.",
  // Staff/patient screens carry no search value and must stay out of the index.
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
