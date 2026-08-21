"use client";

import React, { useState, useEffect } from 'react';
import { UserProfile, AppLanguage } from '@/types/pregnancy-journey';
import { speakText, stopAudio } from '@/lib/audio-player';
import { saveUserProfile, addCarePoints, getUserProfile } from '@/lib/pregnancy-store';
import EmergencyHelpModal from './EmergencyHelpModal';

// --- ANIMATION STYLES ---
const customStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes popIn {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 5px rgba(244, 63, 94, 0.4); }
  50% { box-shadow: 0 0 15px rgba(244, 63, 94, 0.8); }
}
.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
.animate-slide-in { animation: slideInRight 0.3s ease-out forwards; }
.animate-pop-in { animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.animate-pulse-glow { animation: pulseGlow 2s infinite; }
`;

interface Props {
    initialProfile: UserProfile;
}

// --- FULL COMPREHENSIVE QUIZ DATA ---
const STAGES_DATA = [
  {
    id: 1,
    icon: "🤔",
    titles: { en: "Am I Pregnant?", hi: "क्या मैं गर्भवती हूँ?", mr: "मी गर्भवती आहे का?" },
    subtitles: { en: "Early signs & confirmation", hi: "शुरुआती लक्षण और पुष्टि", mr: "सुरुवातीची लक्षणे आणि खात्री" },
    color: "from-rose-400 to-pink-500",
    pillars: [
      {
        id: "s1_p1",
        icon: "🔍",
        titles: { en: "Signs to Watch", hi: "ध्यान देने वाले लक्षण", mr: "लक्षणे ओळखा" },
        questions: [
          {
            q: { en: "Which of these is the EARLIEST sign of pregnancy?", hi: "इनमें से गर्भावस्था का सबसे पहला लक्षण कौन सा है?", mr: "यापैकी गर्भधारणेचे सर्वात पहिले लक्षण कोणते?" },
            options: [
              { text: { en: "Missed period", hi: "मासिक धर्म (पीरियड) न आना", mr: "मासिक पाळी न येणे" }, isCorrect: true },
              { text: { en: "Baby kicks", hi: "बच्चे की हलचल", mr: "बाळाची हालचाल" }, isCorrect: false },
              { text: { en: "Belly shows", hi: "पेट का बड़ा होना", mr: "पोट मोठे होणे" }, isCorrect: false }
            ],
            explanation: {
              en: "A missed period is usually the first sign. If your period is late by even 7 days, you should do a pregnancy test. Other early signs include morning sickness, breast tenderness, and tiredness.",
              hi: "मासिक धर्म (पीरियड) मिस होना आमतौर पर पहला लक्षण है। अगर पीरियड 7 दिन भी लेट हो, तो टेस्ट करें। अन्य लक्षणों में उल्टी होना, थकान और स्तनों में भारीपन शामिल हैं।",
              mr: "मासिक पाळी चुकणे हे सहसा पहिले लक्षण असते. पाळी ७ दिवस जरी उशिरा आली तरी टेस्ट करावी. इतर लक्षणांमध्ये उलट्या होणे, थकवा आणि स्तनांमध्ये जडपणा जाणवणे यांचा समावेश होतो."
            }
          },
          {
            q: { en: "Morning sickness happens only in the morning — True or False?", hi: "क्या मॉर्निंग सिकनेस केवल सुबह ही होती है?", mr: "मॉर्निंग सिकनेस फक्त सकाळीच होते का?" },
            options: [
              { text: { en: "True", hi: "हाँ, केवल सुबह", mr: "होय, फक्त सकाळी" }, isCorrect: false },
              { text: { en: "False (It can happen anytime)", hi: "नहीं, यह पूरे दिन में कभी भी हो सकती है", mr: "नाही, हे कधीही होऊ शकते" }, isCorrect: true }
            ],
            explanation: {
              en: "Despite its name, morning sickness (nausea and vomiting) can happen at any time of day or night. It is very common in the first 3 months.",
              hi: "नाम के विपरीत, जी मिचलाना और उल्टी होना (मॉर्निंग सिकनेस) दिन या रात में किसी भी समय हो सकता है। यह पहले ३ महीनों में बहुत आम है।",
              mr: "नावाच्या विरुद्ध, उलट्या किंवा मळमळणे (मॉर्निंग सिकनेस) दिवसा किंवा रात्री कधीही होऊ शकते. हे पहिल्या ३ महिन्यांत खूप सामान्य आहे."
            }
          }
        ]
      },
      {
        id: "s1_p2",
        icon: "🧪",
        titles: { en: "Confirm Pregnancy", hi: "गर्भावस्था की पुष्टि", mr: "गर्भावस्थेची खात्री" },
        questions: [
          {
            q: { en: "Which test is best for home confirmation?", hi: "घर पर प्रेगनेंसी चेक करने के लिए कौन सा टेस्ट सबसे अच्छा है?", mr: "घरी गरोदरपणा तपासण्यासाठी कोणती टेस्ट सर्वात चांगली आहे?" },
            options: [
              { text: { en: "Blood pressure test", hi: "ब्लड प्रेशर चेक करना", mr: "रक्तदाब तपासणे" }, isCorrect: false },
              { text: { en: "Urine pregnancy test kit", hi: "पेशाब जांच किट (Urine Kit)", mr: "लघवीची तपासणी कीट" }, isCorrect: true },
              { text: { en: "Sugar test", hi: "शुगर टेस्ट", mr: "शुगर टेस्ट" }, isCorrect: false }
            ],
            explanation: {
              en: "A urine test kit detects pregnancy hormones. Use your first morning urine for the most accurate and clear result. Two pink lines mean positive!",
              hi: "यूरिन टेस्ट किट से गर्भावस्था के हार्मोन का पता चलता है। सबसे सटीक परिणाम के लिए सुबह की पहली पेशाब का उपयोग करें। दो गुलाबी लाइनों का मतलब है पॉजिटिव!",
              mr: "लघवीची टेस्ट किट गरोदरपणाच्या संप्रेरकांचा शोध घेते. सर्वात अचूक निकालासाठी सकाळच्या पहिल्या लघवीचा वापर करा. दोन गुलाबी रेषा म्हणजे पॉझिटिव्ह!"
            }
          }
        ]
      },
      {
        id: "s1_p3",
        icon: "🩺",
        titles: { en: "First Doctor Visit", hi: "पहली डॉक्टर मुलाकात", mr: "पहिली डॉक्टर भेट" },
        questions: [
          {
            q: { en: "When should you visit the gynecologist?", hi: "आपको डॉक्टर (स्त्री रोग विशेषज्ञ) के पास कब जाना चाहिए?", mr: "तुम्ही स्त्रीरोगतज्ज्ञांकडे कधी जावे?" },
            options: [
              { text: { en: "As soon as test is positive", hi: "जैसे ही घर पर टेस्ट पॉजिटिव आए", mr: "घरची टेस्ट पॉझिटिव्ह आल्यावर लगेच" }, isCorrect: true },
              { text: { en: "Only after 3 months", hi: "केवल ३ महीने पूरे होने पर", mr: "फक्त ३ महिने पूर्ण झाल्यावर" }, isCorrect: false }
            ],
            explanation: {
              en: "Visit your gynecologist immediately after a positive test. Early visits help start critical folic acid supplements and confirm a healthy placement via scan.",
              hi: "टेस्ट पॉजिटिव आते ही तुरंत डॉक्टर से मिलें। शुरुआती जांच से बच्चे के विकास के लिए जरूरी फॉलिक एसिड टैबलेट्स समय पर शुरू हो जाती हैं।",
              mr: "टेस्ट पॉझिटिव्ह आल्यावर लगेच डॉक्टरांना भेटा. सुरुवातीच्या भेटीमुळे बाळाच्या विकासासाठी आवश्यक फॉलिक ॲसिड गोळ्या वेळेवर सुरू होतात."
            }
          }
        ]
      }
    ]
  },
  {
    id: 2,
    icon: "🌱",
    titles: { en: "Months 1-3", hi: "महीने 1-3 (पहली तिमाही)", mr: "महिने 1-3 (पहिले त्रैमासिक)" },
    subtitles: { en: "First Trimester Care", hi: "शुरुआती तीन महीने की देखभाल", mr: "सुरुवातीच्या तीन महिन्यांची काळजी" },
    color: "from-emerald-400 to-teal-500",
    pillars: [
      {
        id: "s2_p1",
        icon: "🍛",
        titles: { en: "Food & Nutrition", hi: "आहार और पोषण", mr: "आहार आणि पोषण" },
        questions: [
          {
            q: { en: "Do you need to eat double quantity ('for two') now?", hi: "क्या आपको इस समय दो लोगों के बराबर भोजन खाना चाहिए?", mr: "तुम्हाला या वेळी दोन लोकांइतके अन्न खावे लागेल का?" },
            options: [
              { text: { en: "Yes, eat double", hi: "हाँ, डबल खाना चाहिए", mr: "होय, दुप्पट खावे" }, isCorrect: false },
              { text: { en: "No, focus on quality, not quantity", hi: "नहीं, मात्रा नहीं बल्कि पौष्टिकता जरूरी है", mr: "नाही, अन्नाची पौष्टिकता महत्त्वाची आहे" }, isCorrect: true }
            ],
            explanation: {
              en: "You do not need double food! You only need extra nutrition. Focus on green vegetables, dals, milk, curd, and fruits to provide calcium and iron.",
              hi: "दोगुना भोजन खाने की जरूरत नहीं है! आपको केवल अतिरिक्त पौष्टिकता की आवश्यकता है। हरी सब्जियां, दालें, दूध, दही और फल खाएं।",
              mr: "दुप्पट जेवणाची गरज नाही! तुम्हाला फक्त अतिरिक्त पौष्टिकतेची गरज आहे. हिरव्या भाज्या, डाळी, दूध, दही आणि फळे खा."
            }
          },
          {
            q: { en: "Which fruit should be AVOIDED in early pregnancy?", hi: "गर्भावस्था की शुरुआत में किस फल से बचना चाहिए?", mr: "गर्भावस्थेच्या सुरुवातीला कोणत्या फळापासून दूर राहावे?" },
            options: [
              { text: { en: "Apple & Orange", hi: "सेब और संतरा", mr: "सफरचंद आणि संत्री" }, isCorrect: false },
              { text: { en: "Raw Papaya & Pineapple", hi: "कच्चा पपीता और अनानास", mr: "कच्ची पपई आणि अननस" }, isCorrect: true }
            ],
            explanation: {
              en: "Raw/unripe papaya contains latex which can cause uterine contractions and miscarriage. Avoid it completely.",
              hi: "कच्चे पपीते में लेटेक्स होता है जो गर्भपात या दर्द का कारण बन सकता है। पके पपीते को भी सावधानी से खाएं, कच्चा पपीता पूरी तरह टालें।",
              mr: "कच्च्या पपईमध्ये लेटेक्स असते ज्यामुळे गर्भपात होऊ शकतो. म्हणून कच्ची पपई खाणे पूर्णपणे टाळावे."
            }
          }
        ]
      },
      {
        id: "s2_p2",
        icon: "🏃‍♀️",
        titles: { en: "Physical Activity", hi: "शारीरिक गतिविधि", mr: "शारीरिक हालचाल" },
        questions: [
          {
            q: { en: "What kind of exercise is best in the first trimester?", hi: "पहले 3 महीनों में किस प्रकार का व्यायाम सबसे सुरक्षित है?", mr: "पहिल्या ३ महिन्यांत कोणता व्यायाम सर्वात सुरक्षित आहे?" },
            options: [
              { text: { en: "Heavy gym weightlifting", hi: "भारी वजन उठाना", mr: "जड वजन उचलणे" }, isCorrect: false },
              { text: { en: "Gentle walking & basic stretching", hi: "हल्की सैर (सैर करना) और स्ट्रेचिंग", mr: "हळूहळू चालणे आणि हलका व्यायाम" }, isCorrect: true }
            ],
            explanation: {
              en: "Gentle walking for 20-30 minutes is the best and safest exercise. Avoid lifting heavy buckets or straining your abdomen.",
              hi: "रोज २०-३० मिनट हल्की सैर करना सबसे बेहतर और सुरक्षित है। भारी पानी की बाल्टी उठाना या पेट पर दबाव डालना टालें।",
              mr: "दररोज २०-३० मिनिटे हळूहळू चालणे सर्वात सुरक्षित आहे. जड बादल्या उचलणे किंवा पोटावर ताण देणे टाळा."
            }
          }
        ]
      },
      {
        id: "s2_p3",
        icon: "💊",
        titles: { en: "Medicines", hi: "दवाइयाँ", mr: "औषधे" },
        questions: [
          {
            q: { en: "Which tablet is critical to prevent baby birth defects?", hi: "बच्चे के मानसिक और शारीरिक विकास के लिए शुरुआती हफ्तों में क्या जरूरी है?", mr: "बाळाच्या विकासासाठी सुरुवातीच्या आठवड्यात काय आवश्यक आहे?" },
            options: [
              { text: { en: "Folic Acid", hi: "फॉलिक एसिड (Folic Acid)", mr: "फॉलिक ऍसिड" }, isCorrect: true },
              { text: { en: "Painkillers", hi: "दर्द की दवा (Painkillers)", mr: "दुखण्याची औषधे" }, isCorrect: false }
            ],
            explanation: {
              en: "Folic acid helps form the baby's brain and spinal cord. Take it daily as prescribed. Never take self-prescribed painkillers.",
              hi: "फॉलिक एसिड बच्चे के दिमाग और रीढ़ की हड्डी के विकास के लिए बेहद जरूरी है। डॉक्टर की लिखी हुई विटामिन की गोलियां रोज लें।",
              mr: "फॉलिक ऍसिड बाळाच्या मेंदूच्या विकासासाठी अत्यंत आवश्यक आहे. डॉक्टरांनी दिलेल्या गोळ्या दररोज घ्या."
            }
          }
        ]
      }
    ]
  },
  {
    id: 3,
    icon: "🌸",
    titles: { en: "Months 4-6", hi: "महीने 4-6 (दूसरी तिमाही)", mr: "महिने 4-6 (दुसरे त्रैमासिक)" },
    subtitles: { en: "Second Trimester Care", hi: "गर्भावस्था के बीच का समय", mr: "गर्भावस्थेचा मधला काळ" },
    color: "from-amber-400 to-orange-500",
    pillars: [
      {
        id: "s3_p1",
        icon: "🍛",
        titles: { en: "Food & Nutrition", hi: "आहार और पोषण", mr: "आहार आणि पोषण" },
        questions: [
          {
            q: { en: "Which nutrient helps build baby's bones in months 4-6?", hi: "बच्चे की हड्डियों को मजबूत बनाने के लिए सबसे जरूरी क्या है?", mr: "बाळाची हाडे मजबूत करण्यासाठी सर्वात महत्त्वाचे काय आहे?" },
            options: [
              { text: { en: "Calcium (Milk, paneer, ragi)", hi: "कैल्शियम (दूध, दही, पनीर, रागी)", mr: "कॅल्शियम (दूध, दही, पनीर, नाचणी)" }, isCorrect: true },
              { text: { en: "Spicy pickle", hi: "तीखा अचार", mr: "तिखट लोणचे" }, isCorrect: false }
            ],
            explanation: {
              en: "Baby's bones are hardening. Eat calcium-rich foods like milk, paneer, curd, and ragi. Take your Calcium + Vitamin D tablets daily.",
              hi: "बच्चे की हड्डियां इस समय तेजी से विकसित होती हैं। कैल्शियम के लिए दूध, दही, पनीर और रागी का सेवन करें।",
              mr: "या काळात बाळाची हाडे वेगाने विकसित होतात. कॅल्शियमसाठी दूध, दही, पनीर आणि नाचणी खा."
            }
          }
        ]
      },
      {
        id: "s3_p2",
        icon: "🏃‍♀️",
        titles: { en: "Sleep Position", hi: "सोने की स्थिति", mr: "झोपण्याची स्थिती" },
        questions: [
          {
            q: { en: "Which sleeping position is safest in the second trimester?", hi: "दूसरी तिमाही में सोने की सबसे सुरक्षित स्थिति कौन सी है?", mr: "दुसऱ्या त्रैमासिकात झोपण्याची सर्वात सुरक्षित स्थिती कोणती?" },
            options: [
              { text: { en: "Sleeping flat on your back", hi: "पीठ के बल सीधा लेटना", mr: "पाठीवर सरळ झोपणे" }, isCorrect: false },
              { text: { en: "Sleeping on your left side", hi: "बाईं करवट (Left Side) लेकर सोना", mr: "डाव्या कुशीवर झोपणे" }, isCorrect: true }
            ],
            explanation: {
              en: "Sleeping on your left side improves blood flow and nutrients to the baby, and keeps pressure off your major veins.",
              hi: "बाईं करवट लेकर सोने से बच्चे को खून और पोषण का प्रवाह सबसे अच्छा मिलता है। पीठ के बल सीधा सोने से बचें।",
              mr: "डाव्या कुशीवर झोपल्याने बाळाला रक्त आणि पोषणाचा पुरवठा उत्तम होतो. पाठीवर सरळ झोपणे टाळा."
            }
          }
        ]
      }
    ]
  },
  {
    id: 4,
    icon: "👶",
    titles: { en: "Months 7-9", hi: "महीने 7-9 (तीसरी तिमाही)", mr: "महिने 7-9 (तिसरे त्रैमासिक)" },
    subtitles: { en: "Final Steps to Birth", hi: "प्रसव से पहले की सावधानियां", mr: "बाळंतपणापूर्वीची काळजी" },
    color: "from-purple-400 to-indigo-500",
    pillars: [
      {
        id: "s4_p1",
        icon: "🍛",
        titles: { en: "Frequent Meals", hi: "छोटे भोजन", mr: "छोटे जेवण" },
        questions: [
          {
            q: { en: "As the baby grows bigger and pushes your stomach, how should you eat?", hi: "जैसे-जैसे बच्चा बड़ा होता है और पेट पर दबाव डालता है, आपको कैसे खाना चाहिए?", mr: "जसजसे बाळ मोठे होते आणि पोटावर ताण येतो, तसे तुम्ही कसे खावे?" },
            options: [
              { text: { en: "Eat 3 large heavy meals", hi: "दिन में ३ बार भरपेट भारी खाना खाएं", mr: "दिवसात ३ वेळा भरपेट जेवा" }, isCorrect: false },
              { text: { en: "Eat small, frequent meals (5-6 times)", hi: "दिन में ५-६ बार थोड़ा-थोड़ा करके खाएं", mr: "दिवसात ५-६ वेळा थोडे-थोडे खा" }, isCorrect: true }
            ],
            explanation: {
              en: "Eating small portions frequently helps prevent acidity, heartburn, and bloating, which are very common now.",
              hi: "थोड़ा-थोड़ा करके दिन में कई बार खाने से एसिडिटी और सीने की जलन से राहत मिलती है, जो इस समय बहुत आम है।",
              mr: "दिवसातून अनेक वेळा थोडे-थोडे खाल्ल्याने ऍसिडिटी आणि जळजळ कमी होते, जी या काळात सामान्य आहे."
            }
          }
        ]
      },
      {
        id: "s4_p2",
        icon: "🩺",
        titles: { en: "Baby Movement", hi: "बच्चे की हलचल", mr: "बाळाची हालचाल" },
        questions: [
          {
            q: { en: "How many movements/kicks should you count in late pregnancy?", hi: "गर्भावस्था के अंतिम महीनों में आपको बच्चे की हलचल कैसे गिननी चाहिए?", mr: "शेवटच्या महिन्यांत बाळाची हालचाल कशी मोजावी?" },
            options: [
              { text: { en: "At least 10 kicks in 2 hours", hi: "२ घंटे में कम से कम १० हलचल", mr: "२ तासात किमान १० हालचाली" }, isCorrect: true },
              { text: { en: "Only 1-2 kicks a day is fine", hi: "दिन में १-२ बार होना ही काफी है", mr: "दिवसातून १-२ हालचाली पुरेशा आहेत" }, isCorrect: false }
            ],
            explanation: {
              en: "Count baby movements daily. You should feel at least 10 kicks/movements in 2 hours after meals. If less, contact your doctor immediately.",
              hi: "रोज भोजन के बाद बच्चे की हलचल गिनें। २ घंटे में कम से कम १० बार हलचल होनी चाहिए। कम होने पर तुरंत डॉक्टर से मिलें।",
              mr: "रोज जेवणानंतर बाळाची हालचाल मोजा. २ तासात किमान १० वेळा हालचाल जाणवली पाहिजे. कमी असल्यास डॉक्टरांशी संपर्क साधा."
            }
          }
        ]
      }
    ]
  },
  {
    id: 5,
    icon: "🏥",
    titles: { en: "Delivery Day", hi: "प्रसव का दिन", mr: "बाळंतपणाचा दिवस" },
    subtitles: { en: "Labour & Hospital Preparation", hi: "अस्पताल की तैयारी", mr: "रुग्णालयाची तयारी" },
    color: "from-blue-400 to-indigo-600",
    pillars: [
      {
        id: "s5_p1",
        icon: "🎒",
        titles: { en: "Hospital Bag", hi: "अस्पताल का बैग", mr: "रुग्णालयाची बॅग" },
        questions: [
          {
            q: { en: "What is the most critical item to keep in your hospital bag?", hi: "अस्पताल जाते समय बैग में रखने के लिए सबसे महत्वपूर्ण चीज क्या है?", mr: "रुग्णालयात जाताना बॅगेत ठेवण्यासाठी सर्वात महत्त्वाची गोष्ट कोणती?" },
            options: [
              { text: { en: "Baby toys", hi: "खिलौने", mr: "खेळणी" }, isCorrect: false },
              { text: { en: "All medical files, test reports & ID card", hi: "सभी मेडिकल फाइलें, टेस्ट रिपोर्ट और पहचान पत्र", mr: "सर्व वैद्यकीय फायली, चाचणी अहवाल आणि ओळखपत्र" }, isCorrect: true }
            ],
            explanation: {
              en: "Your medical file with all blood tests and scans is vital for the doctors at the hospital to ensure a safe delivery.",
              hi: "आपकी मेडिकल फाइल सबसे जरूरी है। इसमें खून की जांच, सोनोग्राफी रिपोर्ट्स होती हैं जो सुरक्षित प्रसव के लिए आवश्यक हैं।",
              mr: "तुमची वैद्यकीय फाईल सर्वात महत्त्वाची आहे. यामध्ये रक्त तपासणी आणि सोनोग्राफी रिपोर्ट असतात जे बाळंतपणासाठी आवश्यक असतात."
            }
          }
        ]
      },
      {
        id: "s5_p2",
        icon: "⚠️",
        titles: { en: "Labor Pain Signs", hi: "प्रसव पीड़ा के लक्षण", mr: "कळा येण्याची चिन्हे" },
        questions: [
          {
            q: { en: "Which of these is a sign of true labor pain?", hi: "इनमें से असली प्रसव पीड़ा (लेबर पेन) का लक्षण कौन सा है?", mr: "यापैकी खरे बाळंतपणाचे कळांचे लक्षण कोणते?" },
            options: [
              { text: { en: "Contractions that get regular and stronger", hi: "दर्द जो समय के साथ नियमित और तेज होता जाता है", mr: "वेदना ज्या वेळेनुसार नियमित आणि तीव्र होतात" }, isCorrect: true },
              { text: { en: "Pain that goes away with rest", hi: "दर्द जो आराम करने पर ठीक हो जाता है", mr: "वेदना ज्या विश्रांती घेतल्यावर बऱ्या होतात" }, isCorrect: false }
            ],
            explanation: {
              en: "True labor pain is regular, gets closer together, and becomes stronger even if you walk or rest. It may be accompanied by watery discharge.",
              hi: "सच्चा लेबर पेन आराम करने से ठीक नहीं होता, बल्कि समय के साथ और तेज तथा नियमित अंतराल पर आता है।",
              mr: "खऱ्या बाळंतपणाच्या कळा विश्रांती घेतल्याने थांबत नाहीत, उलट त्या वेळेनुसार अधिक तीव्र आणि नियमित होतात."
            }
          }
        ]
      }
    ]
  },
  {
    id: 6,
    icon: "🍼",
    titles: { en: "After Birth", hi: "शिशु की देखभाल", mr: "बाळाची काळजी" },
    subtitles: { en: "Newborn & Mother Care", hi: "स्तनपान और शिशु स्वास्थ्य", mr: "स्तनपान आणि बाळाचे आरोग्य" },
    color: "from-violet-400 to-purple-600",
    pillars: [
      {
        id: "s6_p1",
        icon: "🍼",
        titles: { en: "Breastfeeding", hi: "स्तनपान", mr: "स्तनपान" },
        questions: [
          {
            q: { en: "What is the first thick yellow milk (colostrum) called?", hi: "प्रसव के तुरंत बाद आने वाले गाढ़े पीले दूध (कोलोस्ट्रम) का क्या करना चाहिए?", mr: "बाळंतपणानंतर लगेच येणाऱ्या घट्ट पिवळ्या दुधाचे (कोलोस्ट्रम) काय करावे?" },
            options: [
              { text: { en: "Throw it away", hi: "इसे फेंक देना चाहिए", mr: "ते फेकून दिले पाहिजे" }, isCorrect: false },
              { text: { en: "Feed it to baby immediately (liquid gold)", hi: "बच्चे को तुरंत पिलाना चाहिए (यह अमृत है)", mr: "बाळाला लगेच पाजले पाहिजे (ते अमृत आहे)" }, isCorrect: true }
            ],
            explanation: {
              en: "Colostrum is the baby's first natural vaccine. It is full of antibodies and protects the newborn from major infections.",
              hi: "पहला पीला गाढ़ा दूध (खीस/कोलोस्ट्रम) बच्चे का पहला टीका होता है। यह बच्चे की रोग प्रतिरोधक क्षमता को बढ़ाता है।",
              mr: "पहिले पिवळे घट्ट दूध बाळाची रोगप्रतिकारक शक्ती वाढवते. हे बाळाचे पहिले नैसर्गिक लस असते."
            }
          },
          {
            q: { en: "Should water be given to a newborn in summer?", hi: "क्या गर्मियों में भी ६ महीने से छोटे नवजात शिशु को पानी देना चाहिए?", mr: "उन्हाळ्यातही ६ महिन्यांपेक्षा लहान बाळाला पाणी द्यावे का?" },
            options: [
              { text: { en: "No, only breast milk", hi: "नहीं, केवल माँ का दूध", mr: "नाही, फक्त आईचे दूध" }, isCorrect: true },
              { text: { en: "Yes, to prevent dehydration", hi: "हाँ, पानी देना चाहिए", mr: "होय, पाणी दिले पाहिजे" }, isCorrect: false }
            ],
            explanation: {
              en: "For the first 6 months, baby needs only breast milk. It contains 80%+ water and all nutrients. Extra water can cause infection.",
              hi: "पहले ६ महीने बच्चे को पानी की एक बूंद भी न दें, केवल स्तनपान कराएं। माँ के दूध में पर्याप्त पानी होता है।",
              mr: "पहिल्या ६ महिन्यांत बाळाला पाण्याची गरज नसते, फक्त आईचे दूध पाजावे. दुधात पुरेसे पाणी असते."
            }
          }
        ]
      }
    ]
  }
];

export default function MainDashboard({ initialProfile }: Props) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'stages' | 'pillars' | 'quiz' | 'pillar_complete'>('welcome');
  const [selectedStage, setSelectedStage] = useState<typeof STAGES_DATA[0] | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<typeof STAGES_DATA[0]['pillars'][0] | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [completedPillars, setCompletedPillars] = useState<string[]>([]);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [language, setLanguage] = useState<AppLanguage>('hi');

  // Load state and completion from local storage
  useEffect(() => {
    const activeProfile = getUserProfile();
    setProfile(activeProfile);
    setLanguage(activeProfile.language || 'hi');
    
    if (typeof window !== 'undefined') {
      const storedCompleted = localStorage.getItem('completed_pillars_v2');
      if (storedCompleted) {
        try {
          setCompletedPillars(JSON.parse(storedCompleted));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleLangChange = (lang: AppLanguage) => {
    setLanguage(lang);
    const updated = saveUserProfile({ language: lang });
    setProfile(updated);
  };

  const handleStartGame = () => {
    setCurrentScreen('stages');
  };

  const handleSelectStage = (stage: typeof STAGES_DATA[0]) => {
    setSelectedStage(stage);
    setCurrentScreen('pillars');
  };

  const handleSelectPillar = (pillar: typeof STAGES_DATA[0]['pillars'][0]) => {
    setSelectedPillar(pillar);
    setCurrentQuestionIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswered(false);
    setCurrentScreen('quiz');
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOptionIdx(idx);
    setIsAnswered(true);
    
    const currentQ = selectedPillar?.questions[currentQuestionIdx];
    if (currentQ) {
      // Play Audio Explanation automatically
      speakText(currentQ.explanation[language], language);
    }
  };

  const handleNextQuestion = () => {
    stopAudio();
    if (!selectedPillar) return;

    if (currentQuestionIdx < selectedPillar.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsAnswered(false);
    } else {
      // Completed current pillar!
      const pillarKey = `${selectedStage?.id}_${selectedPillar.id}`;
      const newCompleted = [...completedPillars];
      if (!newCompleted.includes(pillarKey)) {
        newCompleted.push(pillarKey);
        setCompletedPillars(newCompleted);
        localStorage.setItem('completed_pillars_v2', JSON.stringify(newCompleted));
        
        // Add care points
        const updated = addCarePoints(50);
        setProfile(updated);
      }
      setCurrentScreen('pillar_complete');
    }
  };

  const t = (enText: string, hiText: string, mrText: string) => {
    if (language === 'hi') return hiText;
    if (language === 'mr') return mrText;
    return enText;
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-gray-800 flex flex-col font-sans pb-8 antialiased">
      <style>{customStyles}</style>

      {/* --- FLOATING HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-spin" style={{ animationDuration: '6s' }}>🌸</span>
          <div>
            <h1 className="font-bold text-sm sm:text-base text-rose-700 leading-tight">
              {t("My Pregnancy Game", "मेरी गर्भावस्था खेल", "माझा गरोदरपण खेळ")}
            </h1>
            <p className="text-[10px] text-gray-500 font-bold tracking-wide">Dr. Vaibhavi Clinic</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Points display */}
          <div className="bg-amber-50 border border-amber-200 rounded-full px-3 py-1 flex items-center gap-1">
            <span className="text-xs">⭐</span>
            <span className="text-xs font-black text-amber-800">{profile.carePoints}</span>
          </div>

          {/* Emergency Help Button */}
          <button 
            onClick={() => setIsEmergencyOpen(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-full shadow-md animate-pulse-glow transition-all"
          >
            🚨 {t("Emergency Help", "आपातकालीन मदद", "मदत हवी आहे")}
          </button>
        </div>
      </header>

      {/* --- MAIN GAME CONTAINERS --- */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 pt-6 flex flex-col justify-center">

        {/* --- SCREEN 1: WELCOME GREETING --- */}
        {currentScreen === 'welcome' && (
          <div className="bg-white rounded-[32px] p-8 shadow-xl border-2 border-rose-100 text-center animate-pop-in space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-6xl animate-bounce">
              🌸
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-rose-700 tracking-tight">
                {t("Namaste! 🙏", "नमस्ते! 🙏", "नमस्ते! 🙏")}
              </h2>
              <p className="text-base font-bold text-gray-700">
                {t("Dr. Vaibhavi welcomes you to your pregnancy journey", "डॉ. वैभवी की ओर से आपकी गर्भावस्था यात्रा में आपका स्वागत है", "डॉ. वैभवी यांच्याकडून तुमच्या गरोदरपणाच्या प्रवासात स्वागत")}
              </p>
            </div>

            <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-100 text-xs sm:text-sm text-rose-950 font-semibold leading-relaxed">
              {t(
                "Whether you're just wondering if you're pregnant, or already on this beautiful path — let's learn through play! This simple game will guide you with correct advice on food, activity, medicines, and precautions.",
                "चाहे आप अभी सोच रही हैं कि क्या आप गर्भवती हैं, या पहले से ही इस खूबसूरत रास्ते पर हैं — आइए खेल-खेल में सीखें! यह सरल खेल आपको भोजन, गतिविधि, दवाओं और सावधानियों पर सही सलाह देगा।",
                "तुम्ही गरोदर आहात का असा विचार करत असाल किंवा आधीच या सुंदर प्रवासावर असाल — चला खेळत खेळत शिकूया! हा सोपा खेळ तुम्हाला आहार, व्यायाम, औषधे आणि काळजी याबद्दल योग्य माहिती देईल."
              )}
            </div>

            {/* Language Switcher inside Welcome */}
            <div className="flex justify-center gap-2 pt-2">
              <button 
                onClick={() => handleLangChange('en')} 
                className={`px-4 py-2 rounded-xl text-xs font-black border-2 transition-all ${language === 'en' ? 'bg-rose-600 border-rose-600 text-white shadow-md scale-105' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
              >
                English
              </button>
              <button 
                onClick={() => handleLangChange('hi')} 
                className={`px-4 py-2 rounded-xl text-xs font-black border-2 transition-all ${language === 'hi' ? 'bg-rose-600 border-rose-600 text-white shadow-md scale-105' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
              >
                हिंदी
              </button>
              <button 
                onClick={() => handleLangChange('mr')} 
                className={`px-4 py-2 rounded-xl text-xs font-black border-2 transition-all ${language === 'mr' ? 'bg-rose-600 border-rose-600 text-white shadow-md scale-105' : 'bg-gray-50 border-gray-200 text-gray-600'}`}
              >
                मराठी
              </button>
            </div>

            <button
              onClick={handleStartGame}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black py-4 rounded-full text-base shadow-lg hover:shadow-xl transform active:scale-95 transition-all"
            >
              {t("Start My Journey ➔", "मेरी यात्रा शुरू करें ➔", "माझा प्रवास सुरू करा ➔")}
            </button>
          </div>
        )}

        {/* --- SCREEN 2: STAGE SELECTION --- */}
        {currentScreen === 'stages' && (
          <div className="space-y-5 animate-fade-in">
            <div className="text-center space-y-1 mb-2">
              <h2 className="text-2xl font-black text-rose-900">
                {t("Choose Your Stage", "अपनी स्थिति चुनें", "तुमचा टप्पा निवडा")}
              </h2>
              <p className="text-xs text-gray-500 font-bold">
                {t("Tap the card that matches your current time", "उस कार्ड पर टैप करें जो आपके वर्तमान समय से मेल खाता है", "तुमच्या सध्याच्या महिन्याशी जुळणाऱ्या कार्डवर क्लिक करा")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STAGES_DATA.map((stage) => {
                // Calculate completion
                const totalPillars = stage.pillars.length;
                const completedCount = stage.pillars.filter(p => completedPillars.includes(`${stage.id}_${p.id}`)).length;
                const isAllDone = completedCount === totalPillars;

                return (
                  <button
                    key={stage.id}
                    onClick={() => handleSelectStage(stage)}
                    className="w-full bg-white rounded-3xl p-5 border-2 border-rose-100/60 shadow-md hover:shadow-lg hover:border-rose-300 text-left transition-all flex items-center gap-4 relative overflow-hidden group"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${stage.color} flex items-center justify-center text-3xl shadow-sm shrink-0 group-hover:scale-110 transition-transform`}>
                      {stage.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-black text-rose-600 tracking-wider uppercase">
                          {t(`STAGE ${stage.id}`, `पड़ाव ${stage.id}`, `टप्पा ${stage.id}`)}
                        </span>
                        {isAllDone && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.2 rounded-full">✓ Complete</span>
                        )}
                      </div>
                      <h3 className="font-extrabold text-sm text-gray-900 truncate">
                        {stage.titles[language]}
                      </h3>
                      <p className="text-[11px] text-gray-500 font-semibold truncate">
                        {stage.subtitles[language]}
                      </p>
                    </div>

                    <div className="text-gray-400 font-bold text-lg select-none">➔</div>
                  </button>
                );
              })}
            </div>
            
            {/* Back button */}
            <button
              onClick={() => setCurrentScreen('welcome')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-full text-xs transition-all text-center"
            >
              ◄ {t("Back to Welcome Screen", "वापस जाएँ", "मागे जा")}
            </button>
          </div>
        )}

        {/* --- SCREEN 3: PILLAR SELECTION (TOPICS GRID) --- */}
        {currentScreen === 'pillars' && selectedStage && (
          <div className="space-y-5 animate-fade-in">
            {/* Stage Header Info Banner */}
            <div className={`bg-gradient-to-r ${selectedStage.color} text-white rounded-3xl p-5 shadow-md flex items-center gap-4`}>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                {selectedStage.icon}
              </div>
              <div>
                <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">
                  {t(`STAGE ${selectedStage.id}`, `पड़ाव ${selectedStage.id}`, `टप्पा ${selectedStage.id}`)}
                </span>
                <h2 className="text-xl font-black leading-tight">{selectedStage.titles[language]}</h2>
                <p className="text-xs text-white/90 font-medium">{selectedStage.subtitles[language]}</p>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-gray-800">
                {t("Choose a Topic Quiz", "एक विषय चुनें", "एक विषय निवडा")}
              </h3>
              <p className="text-xs text-gray-500 font-bold">
                {t("Complete each quiz to unlock next and earn points", "अंक अर्जित करने के लिए प्रत्येक क्विज़ को पूरा करें", "गुण मिळवण्यासाठी प्रत्येक क्विझ पूर्ण करा")}
              </p>
            </div>

            {/* Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {selectedStage.pillars.map((pillar) => {
                const pKey = `${selectedStage.id}_${pillar.id}`;
                const isCompleted = completedPillars.includes(pKey);

                return (
                  <button
                    key={pillar.id}
                    onClick={() => handleSelectPillar(pillar)}
                    className={`w-full p-4 rounded-3xl border-2 text-left transition-all flex items-center justify-between ${
                      isCompleted 
                        ? 'bg-emerald-50/90 border-emerald-300 shadow-sm'
                        : 'bg-white border-rose-100 hover:border-rose-300 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-2xl ${isCompleted ? 'bg-emerald-200/60' : 'bg-rose-50'} shrink-0`}>
                        {pillar.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-xs text-gray-900 leading-snug truncate">
                          {pillar.titles[language]}
                        </p>
                        <p className="text-[10px] text-gray-500 font-semibold">
                          {pillar.questions.length} {t("Questions", "प्रश्न", "प्रश्न")}
                        </p>
                      </div>
                    </div>

                    {isCompleted ? (
                      <span className="text-emerald-600 text-lg font-black shrink-0">✓</span>
                    ) : (
                      <span className="text-rose-400 font-bold shrink-0">➔</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Return back button */}
            <button
              onClick={() => setCurrentScreen('stages')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-full text-xs transition-all text-center"
            >
              ◄ {t("Back to Stage Selection", "पड़ाव चयन पर वापस जाएँ", "टप्पा निवडीवर मागे जा")}
            </button>
          </div>
        )}

        {/* --- SCREEN 4: QUIZ FLOW --- */}
        {currentScreen === 'quiz' && selectedStage && selectedPillar && (
          <div className="space-y-5 animate-slide-in">
            {/* Quiz Header Bar */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedPillar.icon}</span>
                <span className="font-black text-xs text-gray-600 uppercase">
                  {selectedPillar.titles[language]}
                </span>
              </div>
              <span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                {t("Q.", "प्रश्न", "प्र.")} {currentQuestionIdx + 1} / {selectedPillar.questions.length}
              </span>
            </div>

            {/* Question Text Box */}
            <div className="bg-white rounded-[28px] p-6 shadow-md border-2 border-rose-100/60 relative overflow-hidden">
              <p className="text-base sm:text-lg font-extrabold text-gray-900 leading-snug">
                "{selectedPillar.questions[currentQuestionIdx].q[language]}"
              </p>
            </div>

            {/* Answers Selection */}
            <div className="space-y-2.5">
              {selectedPillar.questions[currentQuestionIdx].options.map((opt, oIdx) => {
                const isSelected = selectedOptionIdx === oIdx;
                const showCorrect = isAnswered && opt.isCorrect;
                const showWrong = isAnswered && isSelected && !opt.isCorrect;

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleOptionClick(oIdx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-sm flex items-center justify-between transition-all ${
                      showCorrect 
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 scale-[1.01] shadow-xs'
                        : showWrong
                          ? 'bg-rose-50 border-rose-500 text-rose-950 scale-[1.01] shadow-xs'
                          : isAnswered
                            ? 'bg-gray-50 border-gray-100 text-gray-400 opacity-60'
                            : 'bg-white border-rose-100 hover:border-rose-300 hover:bg-rose-50/20 active:scale-98'
                    }`}
                  >
                    <span>{opt.text[language]}</span>
                    
                    {/* Visual state icon */}
                    {showCorrect && <span className="text-emerald-600 text-lg">✓</span>}
                    {showWrong && <span className="text-rose-600 text-lg">✕</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation Section */}
            {isAnswered && (
              <div className="bg-amber-50/90 border border-amber-200 rounded-[24px] p-5 animate-fade-in relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📢</span>
                    <h4 className="font-extrabold text-xs text-amber-900 uppercase tracking-wide">
                      {t("Dr. Vaibhavi's Advice:", "डॉ. वैभवी की सलाह:", "डॉ. वैभवी यांचा सल्ला:")}
                    </h4>
                  </div>
                  <button 
                    onClick={() => speakText(selectedPillar.questions[currentQuestionIdx].explanation[language], language)}
                    className="text-xs font-black text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <span>🔊</span>
                    <span>{t("Listen", "सुनें", "ऐका")}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {selectedPillar.questions[currentQuestionIdx].explanation[language]}
                </p>
              </div>
            )}

            {/* Next Action Button */}
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-black py-4 rounded-full text-sm shadow-md transition-all text-center animate-fade-in"
              >
                {currentQuestionIdx < selectedPillar.questions.length - 1 
                  ? t("Next Question ➔", "अगला प्रश्न ➔", "पुढील प्रश्न ➔")
                  : t("Finish Quiz 🎉", "क्विज़ समाप्त करें 🎉", "क्विझ पूर्ण करा 🎉")
                }
              </button>
            )}
          </div>
        )}

        {/* --- SCREEN 5: PILLAR COMPLETE CELEBRATION --- */}
        {currentScreen === 'pillar_complete' && selectedStage && selectedPillar && (
          <div className="bg-white rounded-[32px] p-8 shadow-xl border-2 border-emerald-100 text-center animate-pop-in space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-emerald-50 flex items-center justify-center text-5xl animate-bounce">
              🎉
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-emerald-800">
                {t("Topic Completed!", "विषय पूरा हुआ!", "विषय पूर्ण झाला!")}
              </h2>
              <p className="text-xs text-gray-500 font-bold">
                {t("You are doing amazing! Dr. Vaibhavi is proud of you.", "आप बहुत अच्छा कर रही हैं! डॉ. वैभवी को आप पर गर्व है।", "तुम्ही खूप छान करत आहात! डॉ. वैभवी यांना तुमचा अभिमान वाटतो.")}
              </p>
            </div>

            <div className="inline-flex items-center gap-2.5 bg-amber-50 border border-amber-200 rounded-full px-5 py-2.5">
              <span className="text-xs font-black text-amber-800">⭐ +50 {t("Points Earned", "अंक अर्जित", "गुण मिळाले")}</span>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  stopAudio();
                  setCurrentScreen('pillars');
                }}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-full text-sm shadow-md transition-all"
              >
                {t("Next Topic ➔", "अगला विषय चुनें ➔", "पुढील विषय निवडा ➔")}
              </button>
              
              <button
                onClick={() => {
                  stopAudio();
                  setCurrentScreen('stages');
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3.5 rounded-full text-xs transition-all"
              >
                {t("Back to Stage Selection", "पड़ाव चयन पर वापस जाएँ", "टप्पा निवडीवर मागे जा")}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* --- FLOATING LANGUAGE SELECTOR ON NON-WELCOME PAGES --- */}
      {currentScreen !== 'welcome' && (
        <div className="max-w-xl w-full mx-auto px-4 mt-6 flex items-center justify-center gap-2">
          <span className="text-xs text-gray-400 font-semibold">{t("Language:", "भाषा:", "भाषा:")}</span>
          <button 
            onClick={() => handleLangChange('en')} 
            className={`px-2.5 py-1 rounded-lg text-[10px] font-black border transition-all ${language === 'en' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-gray-200 text-gray-600'}`}
          >
            EN
          </button>
          <button 
            onClick={() => handleLangChange('hi')} 
            className={`px-2.5 py-1 rounded-lg text-[10px] font-black border transition-all ${language === 'hi' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-gray-200 text-gray-600'}`}
          >
            हिन्दी
          </button>
          <button 
            onClick={() => handleLangChange('mr')} 
            className={`px-2.5 py-1 rounded-lg text-[10px] font-black border transition-all ${language === 'mr' ? 'bg-rose-600 border-rose-600 text-white' : 'bg-white border-gray-200 text-gray-600'}`}
          >
            मराठी
          </button>
        </div>
      )}

      {/* --- MODALS --- */}
      <EmergencyHelpModal 
        isOpen={isEmergencyOpen} 
        onClose={() => setIsEmergencyOpen(false)} 
        lang={language} 
      />
    </div>
  );
}
