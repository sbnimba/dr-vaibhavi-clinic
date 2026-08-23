'use client';

import { useEffect } from 'react';

export default function InstagramRedirect() {
  useEffect(() => {
    // Redirect to homepage with UTM parameters
    window.location.replace('/?utm_source=instagram&utm_medium=social&utm_campaign=bio_link');
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-base font-serif font-bold text-gray-900 mb-1">Dr. Vaibhavi Care</h1>
        <p className="text-xs text-gray-500">Redirecting to our website...</p>
      </div>
    </div>
  );
}
