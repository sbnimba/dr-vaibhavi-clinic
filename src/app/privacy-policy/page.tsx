import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-500">Last Updated: May 2026</p>
          </div>
          
          <div className="prose prose-gray max-w-none text-sm leading-relaxed text-gray-600">
            <p>Welcome to the Dr. Vaibhavi Dhenge Clinic ("Clinic", "we", "our", "us"). We respect your privacy and are committed to protecting your personal data in compliance with the Digital Personal Data Protection Act, 2023 (DPDPA) and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.</p>
            
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p>When you book an appointment or consult with us online, we may collect the following Sensitive Personal Data or Information (SPDI):</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Personal identifiers (Name, Age, Contact details).</li>
                <li>Health information, medical history, past diagnoses, and symptoms.</li>
                <li>Details regarding your consultation mode (In-Clinic or Online).</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use your data solely for the purpose of:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>Providing clinical care and online medical consultations.</li>
                <li>Managing appointment scheduling and sending status updates via email.</li>
                <li>Maintaining internal clinical records as required by the National Medical Commission (NMC).</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">3. Data Security & Sharing</h2>
            <p>Your health data is highly confidential. We do not sell, rent, or trade your personal information to any third-party marketing agencies. Your data may only be shared with legally authorized government bodies if required by law.</p>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">4. Your Consent</h2>
            <p>By checking the consent box during the appointment booking process, you explicitly agree to the collection and processing of your medical data as outlined in this Privacy Policy.</p>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">5. Contact Us</h2>
            <p>If you have any questions regarding your privacy or data, please contact our Grievance Officer at:</p>
            <p className="font-mono mt-2">
                Dr. Vaibhavi Dhenge Clinic<br/>
                MGM Hospital, Sector 1, Belapur, Navi Mumbai<br/>
                Medical Reg No: 2020/07/4756 (MMC)<br/>
                Email: consult@drvaibhavi.com
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                <Link href="/" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition">
                    <i className="fa-solid fa-arrow-left"></i>
                    Back to Home
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
