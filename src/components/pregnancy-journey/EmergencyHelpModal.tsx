"use client";
import { useState } from 'react';
import { AppLanguage } from '@/types/pregnancy-journey';
import { speakText } from '@/lib/audio-player';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    lang: AppLanguage;
}

export default function EmergencyHelpModal({ isOpen, onClose, lang }: Props) {
    const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null);

    if (!isOpen) return null;

    const WARNING_SYMPTOMS = [
        { id: 'bleeding', icon: '🩸', title: { en: 'Vaginal Bleeding / Spotting', hi: 'योनि से रक्तस्राव या ब्लीडिंग', mr: 'योनीतून रक्तस्त्राव' } },
        { id: 'pain', icon: '⚡', title: { en: 'Severe Abdominal Cramps', hi: 'पेट के निचले हिस्से में तेज दर्द', mr: 'पोटाच्या खालच्या भागात तीव्र वेदना' } },
        { id: 'water_leak', icon: '💧', title: { en: 'Water Leakage (Fluid Break)', hi: 'पानी की थैली फटना (Clear Fluid)', mr: 'पाण्याची पिशवी फुटणे' } },
        { id: 'movements', icon: '👶', title: { en: 'Reduced Baby Kicks / Movement', hi: 'बच्चे की हलचल में अचानक कमी', mr: 'बाळाच्या हालचालीत अचानक घट' } },
        { id: 'fever', icon: '🌡️', title: { en: 'High Fever (>100°F) or Chills', hi: 'तेज बुखार या ठंड लगना', mr: 'तीव्र ताप किंवा थंडी वाजणे' } },
        { id: 'headache', icon: '👁️', title: { en: 'Severe Headache / Blurred Vision', hi: 'तेज सिरदर्द या आंखों में धुंधलापन', mr: 'तीव्र डोकेदुखी किंवा अंधुक दिसणे' } },
    ];

    const handleSelectSymptom = (title: string) => {
        setSelectedSymptom(title);
        const warning = lang === 'hi'
            ? 'कृपया तुरंत डॉक्टर से संपर्क करें या नजदीकी अस्पताल जाएं।'
            : lang === 'mr'
                ? 'कृपया ताबडतोब डॉक्टरांशी संपर्क साधा किंवा जवळच्या रुग्णालयात जा.'
                : 'Please contact your doctor immediately or visit the nearest hospital.';
        speakText(warning, lang);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-4 border-rose-500 animate-scale-up text-left max-h-[90vh] overflow-y-auto">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-100">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl animate-bounce">🚨</span>
                        <div>
                            <h3 className="font-serif font-bold text-xl text-rose-700">
                                {lang === 'hi' ? 'इमरजेंसी चेतावनी संकेत' : lang === 'mr' ? 'इमर्जन्सी चेतावणी चिन्हे' : 'Emergency Warning Signs'}
                            </h3>
                            <p className="text-xs text-gray-500 font-medium">
                                {lang === 'hi' ? 'क्या आप कोई अस्वस्थ लक्षण महसूस कर रही हैं?' : lang === 'mr' ? 'तुम्हाला काही त्रास जाणवत आहे का?' : 'Are you experiencing any warning symptoms?'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 font-bold text-xl p-2 rounded-full hover:bg-gray-100"
                    >
                        ✕
                    </button>
                </div>

                {/* Disclaimer Alert Box */}
                <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3.5 mb-4 text-xs text-rose-900 font-medium leading-relaxed">
                    ⚠️ <strong>{lang === 'hi' ? 'चिकित्सा अस्वीकरण:' : lang === 'mr' ? 'वैद्यकीय अस्वीकरण:' : 'Medical Disclaimer:'}</strong>{' '}
                    {lang === 'hi'
                        ? 'यह ऐप केवल शिक्षा के लिए है और डॉक्टर की जगह नहीं ले सकता।'
                        : lang === 'mr'
                            ? 'हे ॲप फक्त शिक्षणासाठी आहे आणि डॉक्टरांची जागा घेऊ शकत नाही.'
                            : 'This app is for education only and does not replace your doctor or emergency medical services.'}
                </div>

                {/* Symptom Selection Cards */}
                <p className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    {lang === 'hi' ? 'लक्षण पर टैप करें (Tap Symptom):' : lang === 'mr' ? 'लक्षण निवडा:' : 'Tap Symptom:'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {WARNING_SYMPTOMS.map((sym) => (
                        <button
                            key={sym.id}
                            onClick={() => handleSelectSymptom(sym.title[lang])}
                            className={`p-3 rounded-2xl border-2 text-left flex items-center gap-3 transition-all ${selectedSymptom === sym.title[lang] ? 'bg-rose-100 border-rose-600 ring-2 ring-rose-300' : 'bg-gray-50 border-gray-200 hover:border-rose-300'}`}
                        >
                            <span className="text-2xl shrink-0">{sym.icon}</span>
                            <span className="text-xs font-bold text-gray-900 leading-snug">{sym.title[lang]}</span>
                        </button>
                    ))}
                </div>

                {/* Emergency Action Banner */}
                {selectedSymptom && (
                    <div className="bg-rose-600 text-white rounded-2xl p-4 mb-4 text-center animate-fade-in shadow-lg">
                        <p className="text-xs font-bold uppercase tracking-wider text-rose-200 mb-1">
                            {lang === 'hi' ? 'त्वरित कार्रवाई आवश्यक' : lang === 'mr' ? 'तात्काळ कारवाई आवश्यक' : 'Immediate Action Required'}
                        </p>
                        <h4 className="font-bold text-sm sm:text-base mb-2">
                            {lang === 'hi'
                                ? 'कृपया बिना देरी किए डॉक्टर से संपर्क करें या अस्पताल जाएं।'
                                : lang === 'mr'
                                    ? 'कृपया उशीर न करता डॉक्टरांशी संपर्क साधा किंवा रुग्णालयात जा.'
                                    : 'Please contact your doctor or go to the hospital immediately.'}
                        </h4>
                    </div>
                )}

                {/* Contact Doctor Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <a
                        href="tel:+919321880359"
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3.5 px-4 rounded-full text-xs sm:text-sm text-center shadow-md flex items-center justify-center gap-2"
                    >
                        <span>📞</span>
                        <span>{lang === 'hi' ? 'डॉक्टर को कॉल करें (+91 9321880359)' : lang === 'mr' ? 'डॉक्टरांना कॉल करा' : 'Call Doctor (+91 9321880359)'}</span>
                    </a>
                    <a
                        href="https://wa.me/919321880359?text=EMERGENCY:%20I%20have%20an%20urgent%20pregnancy%20warning%20symptom.%20Please%20help."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-full text-xs sm:text-sm text-center shadow-md flex items-center justify-center gap-2"
                    >
                        <span>💬</span>
                        <span>WhatsApp</span>
                    </a>
                </div>

            </div>
        </div>
    );
}
