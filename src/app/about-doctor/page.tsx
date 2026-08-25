"use client";
import React from 'react';
import Link from 'next/link';

export default function AboutDoctorPage() {
    return (
        <div className="min-h-screen bg-[#FAF9F6] text-gray-900 font-sans selection:bg-primary-500 selection:text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
                    <Link href="/" className="flex items-center gap-3 min-w-0 group outline-none">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-spa"></i>
                        </div>
                        <div className="min-w-0">
                            <span className="block truncate text-base sm:text-lg font-serif font-bold text-gray-900 tracking-wide group-hover:text-primary-600 transition-colors">Dr. Vaibhavi Dhenge</span>
                            <p className="truncate text-[10px] sm:text-xs text-primary-700 font-bold tracking-widest">Consultant Obstetrician & Gynecologist</p>
                        </div>
                    </Link>

                    <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-bold text-xs sm:text-sm hover:bg-primary-100 transition shadow-sm border border-primary-100/50 outline-none">
                        <i className="fa-solid fa-arrow-left text-xs"></i><span>Back to Home</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-xs font-bold tracking-widest text-primary-700 uppercase mb-1">Doctor Profile</h2>
                        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">About Dr. Vaibhavi</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm">
                        {/* Doctor Photo */}
                        <div className="lg:col-span-4 relative mx-auto w-full max-w-[320px] lg:max-w-none">
                            <img 
                                src="/images/doctor-about-perfect.jpg" 
                                alt="Dr. Vaibhavi OBGY" 
                                className="rounded-2xl shadow-md object-cover h-[320px] sm:h-[400px] lg:h-[460px] w-full" 
                            />
                        </div>
                        
                        {/* Doctor Bio Details */}
                        <div className="lg:col-span-8">
                            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-0.5">Dr. Vaibhavi</h2>
                            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-4">
                                MBBS, MS (Obstetrics & Gynaecology) | <span className="text-primary-600">Senior Resident, MGM Belapur Hospital</span>
                            </p>
                            
                            <p className="text-gray-600 leading-relaxed mb-6 font-sans text-xs sm:text-sm">
                                Dr. Vaibhavi is an Obstetrician and Gynecologist with 6+ years of experience in medical healthcare across 1,000+ cases — from high-risk pregnancies and complex surgeries to everyday women's health concerns, across premier institutions in Pune and Maharashtra.
                            </p>
                            
                            {/* Awards & Recognition — visual badge grid */}
                            <div className="mb-6">
                                <p className="text-[10px] font-bold tracking-widest text-primary-600 uppercase mb-3 flex items-center gap-1.5">
                                    <i className="fa-solid fa-trophy text-yellow-500"></i> Awards & Recognition
                                </p>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {/* Badge 1 */}
                                    <div className="bg-gradient-to-b from-yellow-900/90 to-gray-900 border border-yellow-500/40 rounded-xl p-2.5 text-center shadow-lg hover:scale-105 transition-transform duration-300">
                                        <div className="text-yellow-400 text-lg mb-1">🏆</div>
                                        <div className="text-yellow-400 text-[9px] font-black uppercase tracking-wider leading-tight">National</div>
                                        <div className="text-white text-[9px] font-bold leading-tight">Award Winner</div>
                                        <div className="text-yellow-200/90 text-[8px] mt-0.5">AICOG</div>
                                    </div>
                                    {/* Badge 2 */}
                                    <div className="bg-gradient-to-b from-yellow-900/90 to-gray-900 border border-yellow-500/40 rounded-xl p-2.5 text-center shadow-lg hover:scale-105 transition-transform duration-300">
                                        <div className="text-yellow-400 text-lg mb-1">🥇</div>
                                        <div className="text-yellow-400 text-[9px] font-black uppercase tracking-wider leading-tight">1st Rank</div>
                                        <div className="text-white text-[9px] font-bold leading-tight">Research Award</div>
                                        <div className="text-yellow-200/90 text-[8px] mt-0.5">MediAce Conference</div>
                                    </div>
                                    {/* Badge 3 */}
                                    <div className="bg-gradient-to-b from-yellow-900/90 to-gray-900 border border-yellow-500/40 rounded-xl p-2.5 text-center shadow-lg hover:scale-105 transition-transform duration-300">
                                        <div className="text-yellow-400 text-lg mb-1">🎖️</div>
                                        <div className="text-yellow-400 text-[9px] font-black uppercase tracking-wider leading-tight">Excellence</div>
                                        <div className="text-white text-[9px] font-bold leading-tight">Case Presenter</div>
                                        <div className="text-yellow-200/90 text-[8px] mt-0.5">POGS Society</div>
                                    </div>
                                    {/* Badge 4 */}
                                    <div className="bg-gradient-to-b from-yellow-900/90 to-gray-900 border border-yellow-500/40 rounded-xl p-2.5 text-center shadow-lg hover:scale-105 transition-transform duration-300">
                                        <div className="text-yellow-400 text-lg mb-1">🌟</div>
                                        <div className="text-yellow-400 text-[9px] font-black uppercase tracking-wider leading-tight">1000+ Cases</div>
                                        <div className="text-white text-[9px] font-bold leading-tight">Managed</div>
                                        <div className="text-yellow-200/90 text-[8px] mt-0.5">6+ Years Exp.</div>
                                    </div>
                                </div>
                            </div>

                            {/* Memberships */}
                            <div className="mb-6">
                                <p className="text-[10px] font-bold tracking-widest text-primary-600 uppercase mb-3 flex items-center gap-1.5">
                                    <i className="fa-solid fa-certificate text-primary-500"></i> Professional Memberships
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 bg-white border border-primary-100 text-primary-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        <i className="fa-solid fa-check-circle text-primary-500 text-[10px]"></i> Member · POGS (Pune)
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-white border border-primary-100 text-primary-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        <i className="fa-solid fa-check-circle text-primary-500 text-[10px]"></i> ACOG Conference
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-white border border-primary-100 text-primary-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        <i className="fa-solid fa-check-circle text-primary-500 text-[10px]"></i> AICOG Conference
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-white border border-primary-100 text-primary-700 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        <i className="fa-solid fa-check-circle text-primary-500 text-[10px]"></i> Mediace Conference
                                    </span>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4">
                                <Link 
                                    href="/#booking-form" 
                                    className="bg-primary-600 text-white px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-center hover:bg-primary-700 transition shadow-md"
                                >
                                    Book Appointment
                                </Link>
                                <Link 
                                    href="/#services" 
                                    className="text-primary-700 font-bold hover:text-primary-800 transition text-xs sm:text-sm flex items-center gap-1"
                                >
                                    Explore Specialties <i className="fa-solid fa-arrow-right text-[10px]"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
