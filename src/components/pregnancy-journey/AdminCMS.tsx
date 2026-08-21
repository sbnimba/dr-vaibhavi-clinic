"use client";
import { useState } from 'react';
import { SAMPLE_WEEKLY_STAGES } from '@/lib/pregnancy-journey-data';

export default function AdminCMS() {
    const [selectedWeek, setSelectedWeek] = useState(12);
    const [status, setStatus] = useState<'draft' | 'under_review' | 'approved'>('approved');
    const [reviewer, setReviewer] = useState('Dr. Vaibhavi Dhenge (MGM Hospital)');

    const currentData = SAMPLE_WEEKLY_STAGES[selectedWeek] || SAMPLE_WEEKLY_STAGES[12];

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 text-left my-8">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-gray-200">
                <div>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
                        👨‍⚕️ Medical Review CMS Portal
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mt-1">
                        Pregnancy Content Management & Doctor Review
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-500">Status:</span>
                    <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full uppercase">
                        ✓ {status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Sidebar: Week Selector */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                        Select Pregnancy Week:
                    </h3>
                    <div className="space-y-2">
                        {[4, 12, 24, 36].map((w) => (
                            <button
                                key={w}
                                onClick={() => setSelectedWeek(w)}
                                className={`w-full p-3 rounded-xl text-left font-bold text-xs sm:text-sm flex items-center justify-between transition ${selectedWeek === w ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-800 hover:bg-gray-100 border border-gray-200'}`}
                            >
                                <span>Week {w} Content</span>
                                <span>{SAMPLE_WEEKLY_STAGES[w]?.fruitIcon}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                            Medical Reviewer:
                        </label>
                        <input
                            type="text"
                            value={reviewer}
                            onChange={(e) => setReviewer(e.target.value)}
                            className="w-full p-2.5 rounded-xl border text-xs font-bold text-gray-900 bg-white"
                        />
                    </div>
                </div>

                {/* Right Content Editor & Approval Workflow */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                            Fruit Comparison Icon & Name:
                        </h4>
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">{currentData.fruitIcon}</span>
                            <input
                                type="text"
                                defaultValue={currentData.fruitName.en}
                                className="w-full p-2.5 rounded-xl border text-xs font-bold text-gray-900 bg-white"
                            />
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                            Baby Development Milestone (Hindi):
                        </h4>
                        <textarea
                            defaultValue={currentData.babyDevelopment.hi}
                            rows={2}
                            className="w-full p-3 rounded-xl border text-xs font-bold text-gray-900 bg-white"
                        />
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                            Mother Body Changes (Hindi):
                        </h4>
                        <textarea
                            defaultValue={currentData.motherBodyChanges.hi}
                            rows={2}
                            className="w-full p-3 rounded-xl border text-xs font-bold text-gray-900 bg-white"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <span className="text-xs text-gray-500 font-medium">
                            Last reviewed by {reviewer} on 2026-08-21
                        </span>
                        <button
                            onClick={() => setStatus('approved')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-full text-xs shadow-md transition"
                        >
                            ✓ Approve & Publish Medical Content
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
