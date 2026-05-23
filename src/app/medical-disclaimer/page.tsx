import Link from 'next/link';

export default function MedicalDisclaimer() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Medical Disclaimer</h1>
            <p className="text-gray-500">Last Updated: May 2026</p>
          </div>
          
          <div className="prose prose-gray max-w-none text-sm leading-relaxed text-gray-600">
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-8 font-bold">
                ⚠️ NOT FOR MEDICAL EMERGENCIES. If you are experiencing heavy bleeding, severe abdominal pain, loss of consciousness, or any other medical emergency, immediately call local emergency services or visit the nearest hospital casualty department.
            </div>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">1. Informational Purposes Only</h2>
            <p>The content provided on this website—including but not limited to text, graphics, images, dietary charts, pregnancy calculators, and blog posts—is for general informational and educational purposes only. It is NOT intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">2. No Doctor-Patient Relationship</h2>
            <p>Simply reading the information on this website, downloading a diet chart, or submitting a contact form does NOT establish a doctor-patient relationship between you and Dr. Vaibhavi Dhenge. A formal clinical relationship is only established upon a formal consultation (in-clinic or via scheduled telemedicine).</p>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">3. Consult Your Physician</h2>
            <p>Never disregard professional medical advice or delay in seeking it because of something you have read on this website. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or treatment plan.</p>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">4. Limitation of Liability</h2>
            <p>Dr. Vaibhavi Dhenge and the clinic shall not be held liable for any direct, indirect, consequential, or special damages arising from the use of information provided on this website. Reliance on any information provided herein is solely at your own risk.</p>

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
