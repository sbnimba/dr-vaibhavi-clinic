import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "PCOS Myths vs Facts: What the Evidence Actually Says",
  description: "Common PCOS myths corrected by a gynaecologist \u2014 fertility, weight, diet and treatment, separating internet misinformation from clinical evidence.",
  alternates: { canonical: '/pcos-myths-facts' },
  openGraph: {
    type: 'article',
    title: "PCOS Myths vs Facts: What the Evidence Actually Says",
    description: "Common PCOS myths corrected by a gynaecologist \u2014 fertility, weight, diet and treatment, separating internet misinformation from clinical evidence.",
    url: '/pcos-myths-facts',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PCOS Myths vs Facts: What the Evidence Actually Says",
    description: "Common PCOS myths corrected by a gynaecologist \u2014 fertility, weight, diet and treatment, separating internet misinformation from clinical evidence.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
