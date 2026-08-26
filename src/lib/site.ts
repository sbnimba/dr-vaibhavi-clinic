/**
 * Single source of truth for the site's public identity.
 * Change SITE_URL here when a custom domain is connected — canonical tags,
 * the sitemap, OpenGraph tags and the Schema.org block all read from it.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://drvaibhavicare.com';

export const SITE_NAME = 'Vemina | Obstetrician & Gynaecologist';
export const DOCTOR_NAME = 'Dr. Vaibhavi Dhenge';
export const CLINIC_PHONE = '+91-9321880359';
export const OG_IMAGE = '/images/og-cover.jpg';

type PageMeta = { title: string; description: string; keywords?: string[] };

/**
 * Per-route metadata. Every page previously inherited one shared title, which meant
 * Google saw 19 identical pages and none of the medical guides could rank.
 */
export const PAGE_META: Record<string, PageMeta> = {
  'high-risk-pregnancy': {
    title: 'High-Risk Pregnancy: Warning Signs, Risk Factors & Care',
    description:
      'A gynaecologist’s guide to high-risk pregnancy — who is at risk, the warning signs that need urgent attention, and how specialised monitoring keeps mother and baby safe.',
    keywords: ['high risk pregnancy', 'pregnancy complications', 'maternal fetal medicine', 'Navi Mumbai gynaecologist'],
  },
  'early-signs-pregnancy': {
    title: 'Early Signs of Pregnancy: What’s Normal and What Isn’t',
    description:
      'The earliest symptoms of pregnancy explained by an obstetrician — which signs are completely normal, which need a doctor, and when to take a test.',
    keywords: ['early pregnancy symptoms', 'am I pregnant', 'first signs of pregnancy'],
  },
  'essential-prenatal-tests': {
    title: 'Essential Prenatal Tests: A Trimester-by-Trimester Guide',
    description:
      'Which prenatal tests and scans matter in each trimester, what each one screens for, and why early detection makes pregnancy safer for mother and baby.',
    keywords: ['prenatal tests', 'pregnancy scans', 'antenatal screening', 'NT scan', 'anomaly scan'],
  },
  'baby-growth-pregnancy': {
    title: 'Baby Growth Month by Month: Development Through Pregnancy',
    description:
      'How your baby develops from month one to birth — key milestones, movement, and what to expect at each stage of pregnancy.',
    keywords: ['baby growth', 'fetal development', 'pregnancy month by month'],
  },
  'pregnancy-warning-signs': {
    title: 'Pregnancy Warning Signs You Should Never Ignore',
    description:
      'Symptoms during pregnancy that need urgent medical attention — bleeding, severe pain, reduced fetal movement and more, explained by an obstetrician.',
    keywords: ['pregnancy warning signs', 'pregnancy emergency', 'when to call the doctor pregnancy'],
  },
  'nutrition-first-trimester': {
    title: 'First Trimester Nutrition: What to Eat in Early Pregnancy',
    description:
      'Practical first-trimester nutrition guidance — the nutrients that matter most, managing nausea, and foods to avoid in early pregnancy.',
    keywords: ['first trimester diet', 'pregnancy nutrition', 'what to eat when pregnant'],
  },
  'pregnancy-supplements': {
    title: 'Pregnancy Supplements: Folic Acid, Iron, Calcium & Vitamin D',
    description:
      'Which supplements are genuinely needed during pregnancy, correct dosages by trimester, and why self-prescribing can do harm.',
    keywords: ['pregnancy supplements', 'folic acid pregnancy', 'iron in pregnancy', 'prenatal vitamins'],
  },
  'normal-delivery-vs-csection': {
    title: 'Normal Delivery vs C-Section: An Honest Comparison',
    description:
      'A balanced comparison of vaginal delivery and caesarean section — recovery, risks, when a C-section is medically necessary, and how to prepare for labour.',
    keywords: ['normal delivery', 'c-section', 'caesarean vs vaginal delivery', 'painless delivery'],
  },
  'pcos-myths-facts': {
    title: 'PCOS Myths vs Facts: What the Evidence Actually Says',
    description:
      'Common PCOS myths corrected by a gynaecologist — fertility, weight, diet and treatment, separating internet misinformation from clinical evidence.',
    keywords: ['PCOS myths', 'PCOS facts', 'PCOD treatment', 'polycystic ovary syndrome'],
  },
  'infertility-consult': {
    title: 'Infertility: When to Seek Help and What Happens Next',
    description:
      'When a couple should seek an infertility evaluation, what the workup involves for both partners, and the treatment paths available.',
    keywords: ['infertility treatment', 'trying to conceive', 'fertility evaluation', 'IVF consultation'],
  },
  'pregnancy-diet-guide': {
    title: 'Complete Pregnancy Diet Guide',
    description:
      'A full trimester-by-trimester pregnancy diet plan covering nutrients, meal ideas, and foods to avoid.',
  },
  'pregnancy-calculator': {
    title: 'Pregnancy Due Date Calculator',
    description:
      'Calculate your estimated due date, current pregnancy week and trimester from your last menstrual period, with a month-by-month development timeline.',
    keywords: ['due date calculator', 'pregnancy calculator', 'EDD calculator', 'how many weeks pregnant'],
  },
  'pcos-quiz': {
    title: 'PCOS Risk Self-Assessment Quiz',
    description:
      'A short, private self-assessment to help you understand whether your symptoms suggest PCOS and whether it is worth seeing a gynaecologist.',
    keywords: ['PCOS quiz', 'PCOS symptoms test', 'PCOS risk assessment'],
  },
  'patient-portal': {
    title: 'Patient Portal',
    description: 'Look up and manage your appointment with Dr. Vaibhavi using your reference ID.',
  },
  admin: {
    title: 'Staff Portal',
    description: 'Secure staff login for Dr. Vaibhavi Clinic.',
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    description: 'How Dr. Vaibhavi Clinic collects, stores and protects your personal and medical information.',
  },
  'terms-conditions': {
    title: 'Terms & Conditions',
    description: 'Terms of use for the Dr. Vaibhavi Clinic website and online appointment booking.',
  },
  'medical-disclaimer': {
    title: 'Medical Disclaimer',
    description:
      'Information on this site is educational and does not replace an in-person consultation or emergency medical care.',
  },
};

/** Routes that should not be indexed by search engines. */
export const NOINDEX_ROUTES = new Set(['admin', 'patient-portal']);
