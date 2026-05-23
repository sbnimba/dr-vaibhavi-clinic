import Link from 'next/link';

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Terms & Conditions</h1>
            <p className="text-gray-500">Last Updated: May 2026</p>
          </div>
          
          <div className="prose prose-gray max-w-none text-sm leading-relaxed text-gray-600">
            <p>Welcome to the Dr. Vaibhavi Dhenge Clinic website. By accessing or using this website to book appointments or read content, you agree to be bound by these Terms & Conditions.</p>
            
            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">1. Telemedicine & Online Consultations</h2>
            <p>Online video consultations are conducted in accordance with the Telemedicine Practice Guidelines issued by the National Medical Commission (NMC). By opting for an online consultation:</p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>You acknowledge that online consultations have limitations compared to in-person physical examinations.</li>
                <li>The doctor reserves the right to terminate an online consultation and request an in-clinic visit if a physical examination is deemed medically necessary.</li>
                <li>Online consultations are strictly NOT for medical emergencies.</li>
            </ul>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">2. Appointments & Scheduling</h2>
            <p>Booking an appointment through this website constitutes a request. The appointment is only considered final when you receive an "Appointment Confirmed" email notification. The clinic reserves the right to reschedule or decline appointments based on the doctor's availability.</p>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">3. User Conduct</h2>
            <p>You agree to provide accurate, current, and complete information regarding your medical history and identity. Falsifying identity during online consultations is a violation of telemedicine laws.</p>

            <h2 className="text-lg font-bold text-gray-900 mt-8 mb-4">4. Governing Law & Jurisdiction</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of the use of this website or the medical services provided shall be subject to the exclusive jurisdiction of the courts located in Navi Mumbai, Maharashtra.</p>

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
