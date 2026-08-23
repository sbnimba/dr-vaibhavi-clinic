"use client";
import React from 'react';
import Link from 'next/link';

export default function PhilosophyPage() {
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
                            <span className="block truncate text-base sm:text-lg font-serif font-bold text-gray-900 tracking-wide group-hover:text-primary-600 transition-colors">Vemina</span>
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
                        <h2 className="text-xs font-bold tracking-widest text-primary-700 uppercase mb-1">Our Philosophy</h2>
                        <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900">Mission, Vision & Values</h1>
                        <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">The foundational principles that guide our patient care, clinical excellence, and dedication to women's health.</p>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Mission Card */}
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-2xl bg-brand-blush/30 text-primary-600 flex items-center justify-center text-lg mb-3 shadow-inner">
                                        <i className="fa-solid fa-bullseye"></i>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mb-2">Our Mission</h2>
                                    <p className="font-serif italic text-gray-700 text-xs sm:text-sm leading-relaxed">
                                        "To be the doctor every woman deserves — one who listens without judgment, understands without rushing, and delivers care that is both medically excellent and deeply human."
                                    </p>
                                </div>
                            </div>

                            {/* Vision Card */}
                            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-2xl bg-brand-lavender/50 text-purple-600 flex items-center justify-center text-lg mb-3 shadow-inner">
                                        <i className="fa-solid fa-eye"></i>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 mb-2">Our Vision</h2>
                                    <p className="font-serif italic text-gray-700 text-xs sm:text-sm leading-relaxed">
                                        "A world where every woman — regardless of where she comes from — has access to compassionate, expert, and dignified healthcare at every stage of her life."
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Core Values */}
                        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-sm border border-gray-100">
                            <div className="text-center mb-6">
                                <h3 className="text-xs font-bold uppercase tracking-widest text-primary-600 mb-1">Our Commitments</h3>
                                <h2 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Core Values</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center text-center px-4">
                                    <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center text-xl mb-3 shadow-inner">
                                        🤝
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-bold font-serif text-gray-900 mb-1">Trust</h4>
                                    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed max-w-xs">A safe space where no concern is too small and no question goes unheard.</p>
                                </div>
                                <div className="flex flex-col items-center text-center px-4 border-t md:border-t-0 md:border-l md:border-r border-gray-100">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl mb-3 shadow-inner">
                                        ⚕️
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-bold font-serif text-gray-900 mb-1">Excellence</h4>
                                    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed max-w-xs">Evidence-based, modern care backed by 1,000+ real clinical experiences.</p>
                                </div>
                                <div className="flex flex-col items-center text-center px-4 border-t md:border-t-0 border-gray-100">
                                    <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center text-xl mb-3 shadow-inner">
                                        🌸
                                    </div>
                                    <h4 className="text-lg sm:text-xl font-bold font-serif text-gray-900 mb-1">Dignity</h4>
                                    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed max-w-xs">Every woman treated with the privacy, respect, and warmth she deserves.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center gap-4">
                        <Link 
                            href="/#booking-form" 
                            className="bg-primary-600 text-white px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-center hover:bg-primary-700 transition shadow-md"
                        >
                            Book Appointment
                        </Link>
                        <Link 
                            href="/#services" 
                            className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-center hover:bg-gray-50 transition shadow-sm"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
