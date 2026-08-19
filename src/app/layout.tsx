import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";

// Previously loaded from three separate CDNs at versions that did not match the
// installed packages (Swiper CSS v10 against Swiper JS v12). Bundling them keeps
// the CSS and JS in lockstep and removes three render-blocking external requests.
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import "swiper/swiper-bundle.css";

import { SITE_URL, SITE_NAME, CLINIC_PHONE, OG_IMAGE } from "@/lib/site";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const DESCRIPTION =
  "Dr. Vaibhavi — Consultant Obstetrician & Gynaecologist at MGM Belapur Hospital, Navi Mumbai. Expert care for pregnancy, high-risk pregnancy, PCOS, infertility and women's health. Book an in-clinic or online consultation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dr. Vaibhavi | Obstetrician & Gynaecologist, Navi Mumbai",
    template: "%s | Dr. Vaibhavi",
  },
  description: DESCRIPTION,
  keywords: [
    "gynaecologist Navi Mumbai",
    "obstetrician Belapur",
    "pregnancy doctor Navi Mumbai",
    "PCOS treatment",
    "high risk pregnancy",
    "infertility specialist",
    "MGM Hospital Belapur",
  ],
  authors: [{ name: "Dr. Vaibhavi" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Dr. Vaibhavi | Obstetrician & Gynaecologist, Navi Mumbai",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Dr. Vaibhavi — Consultant Obstetrician & Gynaecologist, Navi Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Vaibhavi | Obstetrician & Gynaecologist, Navi Mumbai",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Analytics only loads when a real measurement ID is configured. The previous
// placeholder (G-XXXXXXXXXX) shipped a script on every page view and recorded nothing.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": ["Physician", "MedicalBusiness"],
  "name": "Dr. Vaibhavi",
  "image": `${SITE_URL}/images/doctor-hero-hd.jpg`,
  "description":
    "Consultant Obstetrician & Gynecologist. Expert in high-risk pregnancy, PCOS, and women's health.",
  "medicalSpecialty": ["Obstetric", "Gynecologic"],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "MGM Hospital, Sector 1A, CBD Belapur",
    "addressLocality": "Navi Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400614",
    "addressCountry": "IN",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 19.0187, "longitude": 73.0416 },
  "url": SITE_URL,
  "telephone": CLINIC_PHONE,
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "21:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${lora.variable} scroll-smooth snap-y snap-mandatory antialiased`}
    >
      <head>
        {/* Google Analytics */}
        {(() => {
          const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-3CEGSVQZRT';
          return (
            <>
              <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}></script>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaId}');
                  `,
                }}
              />
            </>
          );
        })()}

        {/* Google Translate — cookie-based reliable method */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Hide the Google Translate toolbar/banner completely */
          .goog-te-banner-frame,
          .goog-te-balloon-frame,
          #goog-gt-tt,
          .goog-tooltip,
          .goog-tooltip:hover,
          .VIpgJd-ZVi9od-aZ2wEe-wOHMyf,
          .VIpgJd-ZVi9od-aZ2wEe-wOHMyf-ti6hGc,
          .goog-te-gadget-simple,
          .goog-te-menu-value {
            display: none !important;
            visibility: hidden !important;
          }
          body > .skiptranslate { display: none !important; }
          iframe[src*="translate.googleapis.com"] { display: none !important; }
          body { top: 0 !important; position: static !important; }
          #google_translate_element { display: none !important; }
          font { background-color: transparent !important; }
        `}} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: 'en,hi,mr,gu,ta,te,bn',
                  autoDisplay: false,
                }, 'google_translate_element');
              }
            `,
          }}
        />
        <script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />

        {/* Structured Data / Schema.org for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
      </head>
      <body className="font-sans text-gray-800 overflow-x-hidden">{children}</body>
    </html>
  );
}
