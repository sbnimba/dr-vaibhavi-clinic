import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Vaibhavi Dhenge | Premium Obstetrician & Gynaecologist",
  description: "Dr. Vaibhavi Dhenge, Senior Resident at MGM Belapur Hospital. Expert Obstetrician & Gynaecologist for pregnancy, PCOS, and women's health.",
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
        {/* Libraries */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />

        {/* Google Analytics Placeholder */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} />

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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Physician", "MedicalBusiness"],
              "name": "Dr. Vaibhavi Dhenge",
              "image": "https://sbnimba.github.io/dr-vaibhavi-clinic/images/doctor-hero-hd.jpg",
              "description": "Consultant Obstetrician & Gynecologist. Expert in high-risk pregnancy, PCOS, and women's health.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "MGM Hospital, Sector 1A, CBD Belapur",
                "addressLocality": "Navi Mumbai",
                "addressRegion": "Maharashtra",
                "postalCode": "400614",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 19.0187,
                "longitude": 73.0416
              },
              "url": "https://sbnimba.github.io/dr-vaibhavi-clinic/",
              "telephone": "+91-9999999999",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                  ],
                  "opens": "09:00",
                  "closes": "21:00"
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans text-gray-800 overflow-x-hidden">{children}</body>
    </html>
  );
}
