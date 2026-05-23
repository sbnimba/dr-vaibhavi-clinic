"use client";
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function PatientPortal() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState<'email' | 'mobile'>('mobile');
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setError('Please enter your details to search.');
            return;
        }

        setIsSearching(true);
        setError('');
        setHasSearched(false);

        try {
            const column = searchType === 'email' ? 'email_address' : 'mobile_number';
            const { data, error: fetchError } = await supabase
                .from('appointments')
                .select('*')
                .eq(column, searchQuery.trim())
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;

            setAppointments(data || []);
            setHasSearched(true);
        } catch (err: any) {
            console.error('Search error:', err);
            setError('Failed to fetch records. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex flex-col items-center">
            <div className="max-w-3xl w-full px-4 sm:px-6 lg:px-8">
                
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4 shadow-inner">
                        <i className="fa-solid fa-hospital-user text-2xl"></i>
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Patient Portal</h1>
                    <p className="text-gray-600">Access your appointment history and current status.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 mb-8">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-1/3">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Search By</label>
                                <select 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block p-3.5"
                                    value={searchType}
                                    onChange={(e) => setSearchType(e.target.value as 'email' | 'mobile')}
                                >
                                    <option value="mobile">Mobile Number</option>
                                    <option value="email">Email Address</option>
                                </select>
                            </div>
                            <div className="w-full sm:w-2/3">
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                    Enter {searchType === 'mobile' ? 'Mobile Number' : 'Email Address'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                                        <i className={searchType === 'mobile' ? "fa-solid fa-phone" : "fa-solid fa-envelope"}></i>
                                    </div>
                                    <input 
                                        type={searchType === 'mobile' ? "tel" : "email"}
                                        placeholder={searchType === 'mobile' ? "+91 98765 43210" : "patient@example.com"}
                                        className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block p-3.5 pl-11"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

                        <button 
                            type="submit" 
                            disabled={isSearching}
                            className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isSearching ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-magnifying-glass"></i>}
                            {isSearching ? 'Searching...' : 'Find My Appointments'}
                        </button>
                    </form>
                </div>

                {hasSearched && (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Your Appointment History</h3>
                        
                        {appointments.length === 0 ? (
                            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                    <i className="fa-regular fa-folder-open text-2xl"></i>
                                </div>
                                <p className="text-gray-600 font-medium mb-4">No appointments found for this {searchType}.</p>
                                <Link href="/#booking-form" className="inline-block bg-primary-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-md shadow-primary-500/20 hover:bg-primary-700 transition">
                                    Book a New Visit
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {appointments.map((app) => (
                                    <div key={app.id} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                    app.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                    app.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                    app.status === 'Rescheduled' ? 'bg-blue-100 text-blue-700' :
                                                    app.status === 'Completed' ? 'bg-gray-100 text-gray-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                    {app.status}
                                                </span>
                                                <span className="text-xs text-gray-400 font-mono">{app.id}</span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-base">{app.specialty}</h4>
                                            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                                <i className="fa-regular fa-calendar"></i> {app.appointment_date} &bull; <i className="fa-regular fa-clock"></i> {app.time_slot}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1.5">
                                                <i className="fa-solid fa-location-dot"></i> {app.consultation_mode}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition text-sm">
                        <i className="fa-solid fa-arrow-left"></i>
                        Back to Home
                    </Link>
                </div>

            </div>
        </div>
    );
}
