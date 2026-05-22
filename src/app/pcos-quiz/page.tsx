"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function PCOSQuizPage() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            question: "Are your periods irregular, or do you have fewer than 8 periods a year?",
            options: [
                { label: "Yes, very irregular", points: 3 },
                { label: "Sometimes they are late", points: 1 },
                { label: "No, they are regular", points: 0 }
            ]
        },
        {
            question: "Have you noticed excessive hair growth on your face, chest, or back?",
            options: [
                { label: "Yes, quite noticeable", points: 3 },
                { label: "A little bit", points: 1 },
                { label: "No", points: 0 }
            ]
        },
        {
            question: "Do you struggle with severe acne that doesn't go away with standard treatments?",
            options: [
                { label: "Yes", points: 2 },
                { label: "Occasionally", points: 1 },
                { label: "No", points: 0 }
            ]
        },
        {
            question: "Have you experienced sudden, unexplained weight gain or difficulty losing weight?",
            options: [
                { label: "Yes, definitely", points: 2 },
                { label: "A little bit", points: 1 },
                { label: "No", points: 0 }
            ]
        }
    ];

    const handleAnswer = (points: number) => {
        setScore(score + points);
        setStep(step + 1);
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] py-20 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-2xl mx-auto">
                <Link href="/" className="inline-flex items-center text-primary-600 font-bold mb-8 hover:text-primary-700 transition">
                    <i className="fa-solid fa-arrow-left mr-2"></i> Back to Home
                </Link>

                <div className="bg-white rounded-[2rem] shadow-premium overflow-hidden border border-gray-100 p-8 sm:p-12">
                    <div className="text-center mb-8">
                        <h2 className="text-xs font-bold tracking-widest text-primary-600 uppercase mb-2">Health Assessment</h2>
                        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">PCOS Risk Assessment</h1>
                        <p className="text-gray-600 text-sm">Take this quick 2-minute quiz to understand your symptoms better.</p>
                    </div>

                    {step < questions.length ? (
                        <div className="animate-fade-in">
                            <div className="w-full bg-gray-100 h-2 rounded-full mb-8 overflow-hidden">
                                <div 
                                    className="bg-primary-600 h-full transition-all duration-500" 
                                    style={{ width: `${(step / questions.length) * 100}%` }}
                                ></div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{questions[step].question}</h3>
                            
                            <div className="space-y-3">
                                {questions[step].options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(opt.points)}
                                        className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-primary-500 hover:bg-primary-50/30 transition-all font-medium text-gray-800 outline-none"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center animate-fade-in space-y-6">
                            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl text-white shadow-lg ${score >= 5 ? 'bg-orange-500 shadow-orange-500/30' : 'bg-emerald-500 shadow-emerald-500/30'}`}>
                                <i className={`fa-solid ${score >= 5 ? 'fa-exclamation' : 'fa-check'}`}></i>
                            </div>
                            
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                                    {score >= 5 ? "High Likelihood of PCOS" : "Low to Moderate Risk"}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {score >= 5 
                                        ? "Based on your answers, you are exhibiting several classic symptoms of PCOS (Polycystic Ovary Syndrome). While this quiz is not a medical diagnosis, we strongly recommend consulting a specialist."
                                        : "Your symptoms do not strongly indicate classic PCOS, but hormonal health is complex. If you are experiencing discomfort or irregularities, a professional evaluation is always a good idea."}
                                </p>
                            </div>

                            <div className="bg-brand-peach/10 border border-brand-peach/30 rounded-2xl p-5 text-left">
                                <h4 className="font-bold text-sm text-gray-900 mb-2">Next Steps</h4>
                                <p className="text-xs text-gray-600 mb-4">Dr. Vaibhavi specializes in hormone management and PCOS treatments. Book a consultation today for a proper diagnosis.</p>
                                <Link href="/#appointment" className="inline-block w-full text-center bg-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-700 transition shadow-md">
                                    Book a Consultation
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-center text-[10px] text-gray-400 mt-6">* This assessment is for informational purposes only and does not replace professional medical advice.</p>
            </div>
        </div>
    );
}
