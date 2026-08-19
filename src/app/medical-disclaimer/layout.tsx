import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Medical Disclaimer",
  description: "Information on this site is educational and does not replace an in-person consultation or emergency medical care.",
  alternates: { canonical: '/medical-disclaimer' },
  openGraph: {
    type: 'website',
    title: "Medical Disclaimer",
    description: "Information on this site is educational and does not replace an in-person consultation or emergency medical care.",
    url: '/medical-disclaimer',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Medical Disclaimer",
    description: "Information on this site is educational and does not replace an in-person consultation or emergency medical care.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
