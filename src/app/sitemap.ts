import type { MetadataRoute } from 'next';
import { SITE_URL, NOINDEX_ROUTES } from '@/lib/site';

/**
 * Generated sitemap. Previously /sitemap.xml returned 404, so search engines had to
 * discover the ten medical guides by crawling alone — and /pregnancy-diet-guide, which
 * has no crawlable inbound link, was unreachable entirely.
 */
const GUIDES = [
  'high-risk-pregnancy',
  'early-signs-pregnancy',
  'essential-prenatal-tests',
  'baby-growth-pregnancy',
  'pregnancy-warning-signs',
  'nutrition-first-trimester',
  'pregnancy-supplements',
  'normal-delivery-vs-csection',
  'pcos-myths-facts',
  'infertility-consult',
  'pregnancy-diet-guide',
];

const TOOLS = ['pregnancy-calculator', 'pcos-quiz'];
const LEGAL = ['privacy-policy', 'terms-conditions', 'medical-disclaimer'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entry = (
    route: string,
    priority: number,
    changeFrequency: 'weekly' | 'monthly' | 'yearly'
  ): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}/${route}`,
    lastModified,
    changeFrequency,
    priority,
  });

  const routes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
    ...TOOLS.map((r) => entry(r, 0.9, 'monthly')),
    ...GUIDES.map((r) => entry(r, 0.8, 'monthly')),
    ...LEGAL.map((r) => entry(r, 0.3, 'yearly')),
  ];

  return routes.filter((e) => !NOINDEX_ROUTES.has(e.url.replace(`${SITE_URL}/`, '')));
}
