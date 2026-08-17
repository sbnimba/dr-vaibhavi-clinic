import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

/** Previously /robots.txt returned 404. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Staff and patient-specific screens carry no search value and should stay out of the index.
        disallow: ['/admin', '/patient-portal', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
