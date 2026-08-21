"use client";

import React, { useState, useEffect } from 'react';
import { UserProfile, AppLanguage } from '@/types/pregnancy-journey';
import { speakText, stopAudio } from '@/lib/audio-player';
import { saveUserProfile, addCarePoints, getUserProfile } from '@/lib/pregnancy-store';
import EmergencyHelpModal from './EmergencyHelpModal';

// --- ANIMATION STYLES ---
const customStyles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes popIn {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 5px rgba(244, 63, 94, 0.4); }
  50% { box-shadow: 0 0 15px rgba(244, 63, 94, 0.8); }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-6px); }
  40%, 80% { transform: translateX(6px); }
}
@keyframes floatUp {
  0% { transform: translateY(105vh) rotate(0deg); opacity: 0; }
  10% { opacity: 0.15; }
  90% { opacity: 0.15; }
  100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
}
@keyframes fallDown {
  0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
}
.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
.animate-slide-in { animation: slideInRight 0.3s ease-out forwards; }
.animate-pop-in { animation: popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
.animate-pulse-glow { animation: pulseGlow 2s infinite; }
.animate-shake { animation: shake 0.4s ease-in-out; }
.animate-float-1 { animation: floatUp 16s infinite linear; }
.animate-float-2 { animation: floatUp 22s infinite linear; }
.animate-float-3 { animation: floatUp 19s infinite linear; }
.animate-fall { animation: fallDown 3.5s linear forwards; }
`;

interface Props {
    initialProfile: UserProfile;
}

// --- FULL COMPREHENSIVE QUIZ DATA (4-5 QUESTIONS PER PILLAR WITH VISUAL HOOKS) ---
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
            },
            visuals: {
              yes: [{ emoji: "📅", label: { en: "Late Period", hi: "देरी से पीरियड", mr: "उशिरा पाळी" } }],
              no: [{ emoji: "🩸", label: { en: "Normal Flow", hi: "सामान्य फ्लो", mr: "नॉर्मल पाळी" } }]
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
            },
            visuals: {
              yes: [{ emoji: "☀️", label: { en: "Morning", hi: "सुबह", mr: "सकाळी" } }, { emoji: "🌙", label: { en: "Night", hi: "रात", mr: "रात्री" } }],
              no: []
            }
          },
          {
            q: { en: "Why does a woman feel extremely tired/fatigued in early pregnancy?", hi: "गर्भावस्था की शुरुआत में महिला को अत्यधिक थकान क्यों महसूस होती है?", mr: "गर्भावस्थेच्या सुरुवातीला महिलेला जास्त थकवा का जाणवतो?" },
            options: [
              { text: { en: "Due to lack of sleep only", hi: "केवल नींद की कमी के कारण", mr: "फक्त झोप कमी झाल्यामुळे" }, isCorrect: false },
              { text: { en: "Progesterone hormone levels rise rapidly", hi: "प्रोजेस्टेरोन हार्मोन का स्तर तेजी से बढ़ता है", mr: "प्रोजेस्टेरॉन संप्रेरक (हार्मोन) वेगाने वाढते" }, isCorrect: true }
            ],
            explanation: {
              en: "During early pregnancy, levels of the hormone progesterone soar, which can make you feel sleepy and exhausted. Resting is very important.",
              hi: "गर्भावस्था की शुरुआत में प्रोजेस्टेरोन हार्मोन का स्तर बहुत बढ़ जाता है, जिससे नींद और थकान महसूस होती है। इस समय आराम करना आवश्यक है।",
              mr: "गर्भावस्थेच्या सुरुवातीला प्रोजेस्टेरॉन हार्मोनचे प्रमाण वाढते, ज्यामुळे झोप आणि थकवा जाणवतो. या काळात विश्रांती घेणे आवश्यक आहे."
            },
            visuals: {
              yes: [{ emoji: "🛌", label: { en: "Take Rest", hi: "आराम करें", mr: "विश्रांती घ्या" } }],
              no: [{ emoji: "🏋️‍♀️", label: { en: "Overwork", hi: "कठिन काम", mr: "कष्टाचे काम" } }]
            }
          },
          {
            q: { en: "Breast tenderness/soreness in early weeks is:", hi: "शुरुआती हफ्तों में स्तनों में भारीपन या दर्द होना:", mr: "सुरुवातीच्या आठवड्यात स्तनांमध्ये जडपणा किंवा वेदना होणे:" },
            options: [
              { text: { en: "A normal pregnancy sign", hi: "एक सामान्य गर्भावस्था लक्षण है", mr: "एक सामान्य गरोदरपणाचे लक्षण आहे" }, isCorrect: true },
              { text: { en: "A sign of infection", hi: "इन्फेक्शन का संकेत है", mr: "संसर्गाचे (इन्फेक्शन) लक्षण आहे" }, isCorrect: false }
            ],
            explanation: {
              en: "Hormonal changes make breasts sensitive, heavy, or sore in the first few weeks as the body prepares for future breastfeeding.",
              hi: "हार्मोनल बदलावों के कारण शुरुआती हफ्तों में स्तन संवेदनशील और भारी हो जाते हैं, क्योंकि शरीर आगे चलकर स्तनपान की तैयारी करता है।",
              mr: "हॉर्मोनल बदलांमुळे सुरुवातीच्या आठवड्यात स्तन संवेदनशील आणि जड होतात, कारण शरीर पुढे जाऊन स्तनपानाची तयारी करत असते."
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
            q: { en: "Which test is best for home confirmation?", hi: "घर पर प्रेगनेंसी चेक करने के लिए कौन सा test सबसे अच्छा है?", mr: "घरी गरोदरपणा तपासण्यासाठी कोणती टेस्ट सर्वात चांगली आहे?" },
            options: [
              { text: { en: "Blood pressure test", hi: "ब्लड प्रेशर चेक करना", mr: "रक्तदाब तपासणे" }, isCorrect: false },
              { text: { en: "Urine pregnancy test kit", hi: "पेशाब जांच किट (Urine Kit)", mr: "लघवीची तपासणी कीट" }, isCorrect: true },
              { text: { en: "Sugar test", hi: "शुगर टेस्ट", mr: "शुगर टेस्ट" }, isCorrect: false }
            ],
            explanation: {
              en: "A urine test kit detects pregnancy hormones. Use your first morning urine for the most accurate and clear result. Two pink lines mean positive!",
              hi: "यूरिन टेस्ट किट से गर्भावस्था के हार्मोन का पता चलता है। सबसे सटीक परिणाम के लिए सुबह की पहली पेशाब का उपयोग करें। दो गुलाबी लाइनों का मतलब है पॉजिटिव!",
              mr: "लघवीची टेस्ट किट गरोदरपणाच्या संप्रेरकांचा शोध घेते. सर्वात अचूक निकालासाठी सकाळच्या पहिल्या लघवीचा वापर करा. दोन गुलाबी रेषा म्हणजे पॉझिटिव्ह!"
            },
            visuals: {
              yes: [{ emoji: "🧪", label: { en: "Urine Kit", hi: "यूरिन किट", mr: "लघवी कीट" } }],
              no: [{ emoji: "🩸", label: { en: "Sugar Test", hi: "शुगर जांच", mr: "साखर तपासणी" } }]
            }
          },
          {
            q: { en: "What does a faint second line on a urine test kit mean?", hi: "यूरिन किट पर दूसरी हल्की गुलाबी लाइन का क्या मतलब है?", mr: "लघवीच्या टेस्ट किटवर दुसरी फिकट गुलाबी रेषा दिसल्यास त्याचा काय अर्थ होतो?" },
            options: [
              { text: { en: "It is negative", hi: "यह नेगेटिव है", mr: "ते निगेटिव्ह आहे" }, isCorrect: false },
              { text: { en: "It is likely positive; retest in 2-3 days", hi: "यह पॉजिटिव हो सकता है; 2-3 दिनों में फिर से जांचें", mr: "ते पॉझिटिव्ह असू शकते; २-३ दिवसांनी पुन्हा तपासा" }, isCorrect: true }
            ],
            explanation: {
              en: "A faint line usually indicates early pregnancy with lower hormone levels. Retest after 2-3 days with morning's first urine, or consult Dr. Vaibhavi for a blood test.",
              hi: "हल्की लाइन शुरुआती गर्भावस्था को दर्शाती है जब हार्मोन का स्तर कम होता है। 2-3 दिनों के बाद सुबह के पहले यूरिन से दोबारा जांच करें या डॉक्टर से मिलें।",
              mr: "फिकट रेषा सुरुवातीचे गरोदरपण दर्शवते जेव्हा संप्रेरकांचे प्रमाण कमी असते. २-३ दिवसांनी पुन्हा सकाळी टेस्ट करा किंवा डॉक्टरांना भेटा."
            }
          },
          {
            q: { en: "When can an ultrasound (sonography) first show the pregnancy sac?", hi: "सोनोग्राफी में गर्भावस्था की थैली (sac) सबसे पहले कब देखी जा सकती है?", mr: "सोनोग्राफीमध्ये गर्भाशयातील पिशवी (sac) सर्वात आधी कधी दिसू शकते?" },
            options: [
              { text: { en: "At 5 to 6 weeks", hi: "5 से 6 सप्ताह में", mr: "५ ते ६ आठवड्यात" }, isCorrect: true },
              { text: { en: "At 9 months only", hi: "केवल 9वें महीने में", mr: "फक्त ९व्या महिन्यात" }, isCorrect: false }
            ],
            explanation: {
              en: "An early ultrasound can confirm the gestational sac inside the womb around 5-6 weeks, confirming a healthy pregnancy placement.",
              hi: "शुरुआती सोनोग्राफी में लगभग 5-6 हफ्तों में गर्भ में भ्रूण की थैली देखी जा सकती है, जिससे यह पक्का होता है कि गर्भ सही जगह पर ठहरा है।",
              mr: "सुरुवातीच्या सोनोग्राफीमध्ये साधारण ५-६ आठवड्यांत गर्भाशयात गर्भ पिशवी दिसते, ज्यामुळे गर्भ योग्य ठिकाणी असल्याचे निश्चित होते."
            }
          },
          {
            q: { en: "Can blood tests confirm pregnancy earlier than urine tests?", hi: "क्या ब्लड टेस्ट से यूरिन टेस्ट से पहले प्रेगनेंसी का पता चल सकता है?", mr: "ब्लड टेस्टमुळे लघवीच्या टेस्टपेक्षा आधी गरोदरपणाची खात्री होऊ शकते का?" },
            options: [
              { text: { en: "Yes", hi: "हाँ", mr: "होय" }, isCorrect: true },
              { text: { en: "No", hi: "नहीं", mr: "नाही" }, isCorrect: false }
            ],
            explanation: {
              en: "Yes, a Beta-hCG blood test can detect pregnancy hormones even before a missed period, with 100% accuracy.",
              hi: "हाँ, बीटा-एचसीजी ब्लड टेस्ट खून में हार्मोन की बहुत कम मात्रा को भी पहचान लेती है, जो यूरिन टेस्ट से पहले सटीक परिणाम दे सकती है।",
              mr: "होय, बीटा-एचसीजी ब्लड टेस्ट रक्तातील हार्मोनचे प्रमाण अचूक शोधते, जे लघवीच्या टेस्टच्या आधी गरोदरपणाची खात्री देते."
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
              mr: "मिस झालेली पाळी आणि पॉझिटिव्ह टेस्ट आल्यावर लगेच डॉक्टरांना भेटा. सुरुवातीच्या भेटीमुळे बाळाच्या विकासासाठी आवश्यक फॉलिक ऍसिड गोळ्या वेळेवर सुरू होतात."
            },
            visuals: {
              yes: [{ emoji: "🩺", label: { en: "Doctor", hi: "डॉक्टर", mr: "डॉक्टर" } }],
              no: [{ emoji: "⏳", label: { en: "Wait", hi: "देरी", mr: "उशीर" } }]
            }
          },
          {
            q: { en: "Why is checking Blood Pressure (BP) important on your first visit?", hi: "पहली मुलाकात में ब्लड प्रेशर (BP) मापना क्यों जरूरी है?", mr: "पहिल्या भेटीत रक्तदाब (BP) तपासणे का महत्त्वाचे आहे?" },
            options: [
              { text: { en: "To establish a baseline and screen for hypertension", hi: "शुरुआती रीडिंग जानने और उच्च रक्तचाप की जांच के लिए", mr: "सुरुवातीचे रीडिंग जाणून घेण्यासाठी आणि उच्च रक्तदाब तपासण्यासाठी" }, isCorrect: true },
              { text: { en: "It is just a hospital rule, not important", hi: "यह केवल एक सामान्य नियम है, महत्वपूर्ण नहीं", mr: "हा फक्त एक सामान्य नियम आहे, महत्त्वाचा नाही" }, isCorrect: false }
            ],
            explanation: {
              en: "Monitoring BP from the start is critical. High blood pressure during pregnancy (preeclampsia) can be dangerous if left untreated.",
              hi: "शुरुआत से ही बीपी की जांच करना महत्वपूर्ण है। गर्भावस्था में बढ़ा हुआ बीपी जच्चा और बच्चा दोनों के लिए खतरनाक हो सकता है।",
              mr: "सुरुवातीपासूनच बीपी तपासणे आवश्यक आहे. गरोदरपणातील उच्च रक्तदाब आई आणि बाळ दोघांसाठी धोकादायक ठरू शकतो."
            }
          },
          {
            q: { en: "Which tablet is started on the very first doctor visit?", hi: "पहली डॉक्टर मुलाकात में कौन सी सबसे महत्वपूर्ण गोली शुरू की जाती है?", mr: "पहिल्या डॉक्टर भेटीत कोणती सर्वात महत्त्वाची गोळी सुरू केली जाते?" },
            options: [
              { text: { en: "Folic Acid", hi: "फॉलिक एसिड", mr: "फॉलिक ऍसिड" }, isCorrect: true },
              { text: { en: "Painkillers", hi: "दर्द निवारक दवा", mr: "वेदनाशामक औषध" }, isCorrect: false }
            ],
            explanation: {
              en: "Folic acid is essential to prevent major brain and spine birth defects in the baby. It should be taken daily.",
              hi: "फॉलिक एसिड बच्चे के दिमाग और रीढ़ की हड्डी में होने वाले जन्मजात दोषों को रोकने के लिए सबसे आवश्यक पूरक है।",
              mr: "बाळाच्या मेंदू आणि पाठीच्या कण्याच्या विकासातील दोष टाळण्यासाठी फॉलिक ऍसिड गोळी अत्यंत आवश्यक आहे."
            },
            visuals: {
              yes: [{ emoji: "💊", label: { en: "Folic Acid", hi: "फॉलिक एसिड", mr: "फॉलिक ऍसिड" } }],
              no: []
            }
          },
          {
            q: { en: "Which blood test is checked on the first visit to see if you have low blood?", hi: "शरीर में खून की कमी (एनीमिया) जांचने के लिए कौन सा टेस्ट किया जाता है?", mr: "शरीरात रक्ताची कमतरता (एनिमिया) तपासण्यासाठी कोणती टेस्ट केली जाते?" },
            options: [
              { text: { en: "Hemoglobin (Hb) Test", hi: "हीमोग्लोबिन (Hb) टेस्ट", mr: "हिमोग्लोबिन (Hb) टेस्ट" }, isCorrect: true },
              { text: { en: "Cholesterol Test", hi: "कोलेस्ट्रॉल टेस्ट", mr: "कोलेस्टेरॉल टेस्ट" }, isCorrect: false }
            ],
            explanation: {
              en: "A Hemoglobin (Hb) test check for anemia. If your Hb is low, it can cause weakness and affect the baby's oxygen supply. Dr. Vaibhavi will prescribe iron supplements.",
              hi: "हीमोग्लोबिन टेस्ट से एनीमिया (खून की कमी) का पता चलता है। यदि यह 11 से कम है, तो डॉक्टर आपको आयरन की गोलियां और सही खान-पान की सलाह देंगे।",
              mr: "हिमोग्लोबिन टेस्टमुळे ॲनिमियाचे (रक्ताची कमतरता) निदान होते. ते ११ पेक्षा कमी असल्यास डॉक्टर लोहयुक्त आहार आणि गोळ्या सुचवतील."
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
            },
            visuals: {
              yes: [{ emoji: "🍛", label: { en: "Nutritious Food", hi: "पौष्टिक भोजन", mr: "पौष्टिक जेवण" } }],
              no: [{ emoji: "🍽️🍽️", label: { en: "Double Meals", hi: "दोगुना खाना", mr: "दुप्पट जेवण" } }]
            }
          },
          {
            q: { en: "Which fruit should be AVOIDED in early pregnancy?", hi: "गर्भावस्था की शुरुआत में किस फल से बचना चाहिए?", mr: "गर्भावस्थेच्या सुरुवातीला कोणत्या फळापासून दूर राहावे?" },
            options: [
              { text: { en: "Apple & Orange", hi: "सेब और संतरा", mr: "सफरचंद आणि संत्री" }, isCorrect: false },
              { text: { en: "Raw Papaya & Pineapple", hi: "कच्चा पपीता और अनानास", mr: "कच्ची पपई आणि अननस" }, isCorrect: true }
            ],
            explanation: {
              en: "Raw/unripe papaya contains latex which can cause uterine contractions and miscarriage. Avoid it completely. Apples and Oranges are safe.",
              hi: "कच्चे पपीते और अनानास से पूरी तरह बचें। सेब, संतरा और अमरूद जैसे फल पूरी तरह सुरक्षित और सेहतमंद हैं।",
              mr: "कच्ची पपई आणि अननस खाणे टाळा. सफरचंद, संत्री किंवा पेरू खाणे पूर्णपणे सुरक्षित आणि आरोग्यासाठी चांगले आहे."
            },
            visuals: {
              yes: [{ emoji: "🍎", label: { en: "Apple", hi: "सेब", mr: "सफरचंद" } }, { emoji: "🍊", label: { en: "Orange", hi: "संतरा", mr: "संत्री" } }],
              no: [{ emoji: "🥭", label: { en: "Raw Papaya", hi: "कच्चा पपीता", mr: "कच्ची पपई" } }, { emoji: "🍍", label: { en: "Pineapple", hi: "अनानास", mr: "अननस" } }]
            }
          },
          {
            q: { en: "How much water should a pregnant woman drink daily?", hi: "गर्भवती महिला को रोजाना कितना पानी पीना चाहिए?", mr: "गर्भवती महिलेने दररोज किती पाणी प्यावे?" },
            options: [
              { text: { en: "2-3 glasses only", hi: "केवल 2-3 गिलास", mr: "फक्त २-३ ग्लास" }, isCorrect: false },
              { text: { en: "8-10 glasses (2-3 liters)", hi: "8-10 glasses (2-3 liters)", mr: "८-१० ग्लास (२-३ लीटर)" }, isCorrect: true }
            ],
            explanation: {
              en: "Drinking 8-10 glasses of fluids prevents constipation, urinary tract infections (UTI), and keeps the amniotic fluid levels healthy.",
              hi: "रोजाना 8-10 गिलास पानी पीने से कब्ज, यूरिन इन्फेक्शन से बचाव होता है और गर्भ में पानी की कमी नहीं होती।",
              mr: "रोज ८-१० ग्लास पाणी पिल्याने बद्धकोष्ठता, लघवीचा संसर्ग टळतो आणि गर्भातील पाण्याचे प्रमाण चांगले राहते."
            },
            visuals: {
              yes: [{ emoji: "💧", label: { en: "Water", hi: "पानी", mr: "पाणी" } }, { emoji: "🥥", label: { en: "Coconut", hi: "नारियल", mr: "शहाळे" } }],
              no: [{ emoji: "🥤", label: { en: "Cold drinks", hi: "कोल्ड ड्रिंक्स", mr: "थंड पेये" } }]
            }
          },
          {
            q: { en: "How much tea or coffee is safe during pregnancy?", hi: "गर्भावस्था के दौरान कितनी चाय या कॉफी सुरक्षित है?", mr: "गरोदरपणात चहा किंवा कॉफीचे किती प्रमाण सुरक्षित आहे?" },
            options: [
              { text: { en: "Limit to max 1-2 small cups per day", hi: "अधिकतम 1-2 छोटे कप प्रतिदिन", mr: "दररोज जास्तीत जास्त १-२ लहान कप" }, isCorrect: true },
              { text: { en: "As much as you want", hi: "जितना चाहें उतना पी सकते हैं", mr: "हवे तितके पीऊ शकता" }, isCorrect: false }
            ],
            explanation: {
              en: "High caffeine intake can restrict baby growth and increase miscarriage risk. Limit chai/coffee to 1-2 cups maximum.",
              hi: "अधिक कैफीन बच्चे के विकास को धीमा कर सकता है। चाय या कॉफी को दिन में केवल 1 या 2 कप तक ही सीमित रखें।",
              mr: "जास्त कॅफिनमुळे बाळाच्या वाढीवर परिणाम होऊ शकतो. त्यामुळे चहा किंवा कॉफीचे प्रमाण दिवसातून १-२ कप ठेवावे."
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
              hi: "रोज २०-३० मिनट हल्की सैर करना सबसे बेहतर and सुरक्षित है। भारी पानी की बाल्टी उठाना या पेट पर दबाव डालना टालें।",
              mr: "दररोज २०-३० मिनिटे हळूहळू चालणे सर्वात सुरक्षित आहे. जड बादल्या उचलणे किंवा पोटावर ताण देणे टाळा."
            },
            visuals: {
              yes: [{ emoji: "🚶‍♀️", label: { en: "Walking", hi: "हल्की सैर", mr: "सैर" } }],
              no: [{ emoji: "🏋️‍♀️", label: { en: "Heavy Weight", hi: "भारी वजन", mr: "जड वजन" } }]
            }
          },
          {
            q: { en: "Is sitting cross-legged on the floor (Chaukdi) safe?", hi: "क्या फर्श पर आलती-पालती (चौकड़ी) मारकर बैठना सुरक्षित है?", mr: "जमिनीवर मांडी घालून बसणे सुरक्षित आहे का?" },
            options: [
              { text: { en: "Yes, it is very good and stretches hips", hi: "हाँ, यह बहुत अच्छा है और पेल्विक हिस्से को खोलता है", mr: "होय, हे खूप चांगले आहे आणि ओटीपोटाचे स्नायू ताणते" }, isCorrect: true },
              { text: { en: "No, it harms the baby", hi: "नहीं, इससे बच्चे को नुकसान होता है", mr: "नाही, यामुळे बाळाला त्रास होतो" }, isCorrect: false }
            ],
            explanation: {
              en: "Sitting cross-legged on a flat floor is completely safe and helps open your hip joints for an easier natural birth later.",
              hi: "जमीन पर आलती-पालती मारकर बैठना सुरक्षित है और यह प्रसव के समय हिप्स के जोड़ों को खोलने में मदद करता है।",
              mr: "जमिनीवर मांडी घालून बसणे पूर्णपणे सुरक्षित आहे आणि यामुळे बाळंतपणाच्या वेळी हाडे मोकळी होण्यास मदत होते."
            }
          },
          {
            q: { en: "Which movement should be AVOIDED completely?", hi: "इनमें से किस शारीरिक गतिविधि से पूरी तरह बचना चाहिए?", mr: "यापैकी कोणत्या शारीरिक हालचाली पूर्णपणे टाळल्या पाहिजेत?" },
            options: [
              { text: { en: "Bending forward quickly / heavy lifting", hi: "अचानक आगे झुकना या भारी वजन उठाना", mr: "अचानक पुढे वाकणे किंवा जड वस्तू उचलणे" }, isCorrect: true },
              { text: { en: "Slow side stretches", hi: "धीमी स्ट्रेचिंग करना", mr: "हळूहळू शरीर ताणणे" }, isCorrect: false }
            ],
            explanation: {
              en: "Avoid rapid bending, heavy domestic work like pushing furniture, or carrying heavy water pots to prevent back injury or strain.",
              hi: "भारी घरेलू सामान खिसकाना, पानी से भरे बड़े बर्तन उठाना या अचानक आगे झुकने से बचें। इससे पीठ दर्द या खिंचाव हो सकता है।",
              mr: "जड घरगुती वस्तू हलवणे, पाण्याचे हंडे उचलणे किंवा अचानक पुढे वाकणे टाळावे. यामुळे पाठीला दुखापत होऊ शकते."
            }
          },
          {
            q: { en: "If you feel dizzy or bleed while exercising, you should:", hi: "व्यायाम या काम करते समय चक्कर आने या ब्लीडिंग होने पर क्या करना चाहिए?", mr: "व्यायाम करताना चक्कर आल्यास किंवा रक्तस्त्राव झाल्यास काय करावे?" },
            options: [
              { text: { en: "Rest and continue later", hi: "आराम करें और बाद में फिर शुरू करें", mr: "विश्रांती घ्या आणि नंतर पुन्हा सुरू करा" }, isCorrect: false },
              { text: { en: "Stop immediately and contact Dr. Vaibhavi", hi: "तुरंत रुकें और डॉक्टर से संपर्क करें", mr: "लगेच थांबून डॉक्टरांशी संपर्क साधा" }, isCorrect: true }
            ],
            explanation: {
              en: "Stop any activity immediately if you have warning signs like bleeding, abdominal pain, fluid leaks, or severe dizziness, and seek urgent help.",
              hi: "यदि ब्लीडिंग, पेट दर्द, चक्कर या पानी बहने के संकेत मिलें तो तुरंत रुकें और बिना देरी किए डॉक्टर से संपर्क करें।",
              mr: "जर रक्तस्त्राव, पोटात दुखणे, चक्कर किंवा पाणी वाहणे असे त्रास जाणवल्यास लगेच थांबून डॉक्टरांशी बोला."
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
            },
            visuals: {
              yes: [{ emoji: "💊", label: { en: "Folic Acid", hi: "फॉलिक एसिड", mr: "फॉलिक ऍसिड" } }],
              no: []
            }
          },
          {
            q: { en: "Can you take common medicine from a local chemist without a prescription?", hi: "क्या आप बिना डॉक्टर से पूछे सिरदर्द या बुखार की दवा ले सकती हैं?", mr: "तुम्ही डॉक्टरांना न विचारता डोकेदुखी किंवा तापाचे औषध घेऊ शकता का?" },
            options: [
              { text: { en: "No, always consult doctor first", hi: "नहीं, हमेशा पहले डॉक्टर से पूछें", mr: "नाही, नेहमी आधी डॉक्टरांना विचारा" }, isCorrect: true },
              { text: { en: "Yes, it is safe", hi: "हाँ, यह सुरक्षित है", mr: "होय, ते सुरक्षित आहे" }, isCorrect: false }
            ],
            explanation: {
              en: "Many common painkillers and cold medicines are unsafe during pregnancy. Always consult Dr. Vaibhavi before taking any tablet.",
              hi: "गर्भावस्था में बिना डॉक्टर की सलाह के कोई भी दवा (जैसे दर्द निवारक या सर्दी-खांसी की दवा) लेना बच्चे को नुकसान पहुँचा सकता है।",
              mr: "गरोदरपणात डॉक्टरांच्या सल्ल्याशिवाय कोणतेही औषध घेणे बाळासाठी घातक ठरू शकते. नेहमी आधी डॉक्टरांचा सल्ला घ्या."
            },
            visuals: {
              yes: [{ emoji: "🩺", label: { en: "Doctor", hi: "डॉक्टर सलाह", mr: "डॉक्टर" } }],
              no: [{ emoji: "💊", label: { en: "Self-Pill", hi: "बिना डॉक्टर दवा", mr: "स्वतःची औषधे" } }]
            }
          },
          {
            q: { en: "Can you take Iron and Calcium tablets together at the same time?", hi: "क्या आयरन और कैल्शियम की गोली एक साथ एक ही समय पर ले सकते हैं?", mr: "लोह (आयरन) आणि कॅल्शियमच्या गोळ्या एकाच वेळी एकत्र घेऊ शकतात का?" },
            options: [
              { text: { en: "No, keep a gap of at least 2 hours", hi: "नहीं, दोनों के बीच कम से कम 2 घंटे का अंतर रखें", mr: "नाही, दोन्ही गोळ्यांमध्ये किमान २ तासांचे अंतर ठेवा" }, isCorrect: true },
              { text: { en: "Yes, taking them together is fine", hi: "हाँ, एक साथ ले सकते हैं", mr: "होय, एकत्र घेऊ शकता" }, isCorrect: false }
            ],
            explanation: {
              en: "Calcium blocks the absorption of iron in the body. Take Iron in the morning and Calcium at night, or keep a 2-hour gap.",
              hi: "कैल्शियम शरीर में आयरन को सोखने से रोकता है। इसलिए आयरन सुबह लें और कैल्शियम दोपहर या रात को लें, दोनों में अंतर रखें।",
              mr: "कॅल्शियम शरीराला लोह शोषून घेण्यापासून रोखते. म्हणूनच दोन्ही गोळ्या वेगवेगळ्या वेळी घ्याव्यात, जसे की एक सकाळी आणि दुसरी रात्री."
            },
            visuals: {
              yes: [{ emoji: "⏰", label: { en: "2 Hours Gap", hi: "2 घंटे का अंतर", mr: "२ तास गॅप" } }],
              no: [{ emoji: "💊💊", label: { en: "Taken Together", hi: "एक साथ लेना", mr: "एकत्र घेणे" } }]
            }
          },
          {
            q: { en: "What helps your body absorb Iron better?", hi: "आयरन की गोली का असर शरीर में बढ़ाने के लिए इसे किसके साथ लेना चाहिए?", mr: "आयरनच्या गोळीचा परिणाम शरीरात वाढवण्यासाठी ती कशासोबत घ्यावी?" },
            options: [
              { text: { en: "With lemon water or orange juice (Vitamin C)", hi: "नींबू पानी या संतरे के रस के साथ (विटामिन C)", mr: "लिंबू पाणी किंवा संत्र्याच्या रसासोबत (व्हिटॅमिन C)" }, isCorrect: true },
              { text: { en: "With tea or milk", hi: "चाय या दूध के साथ", mr: "चहा किंवा दुधासोबत" }, isCorrect: false }
            ],
            explanation: {
              en: "Vitamin C helps the body absorb iron. Avoid taking iron with tea or milk as they decrease its absorption.",
              hi: "विटामिन सी आयरन को सोखने में मदद करता है। चाय या दूध के साथ आयरन की गोली कभी न लें, इससे इसका असर खत्म हो जाता है।",
              mr: "व्हिटॅमिन सी लोह शोषण्यास मदत करते. चहा किंवा दुधासोबत लोखंडाची गोळी कधीही घेऊ नये, यामुळे त्याचे शोषण कमी होते."
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
            },
            visuals: {
              yes: [{ emoji: "🥛", label: { en: "Milk", hi: "दूध", mr: "दूध" } }, { emoji: "🧀", label: { en: "Paneer", hi: "पनीर", mr: "पनीर" } }],
              no: [{ emoji: "🍕", label: { en: "Junk Food", hi: "फास्ट फूड", mr: "जंक फूड" } }]
            }
          },
          {
            q: { en: "What helps prevent pregnancy constipation?", hi: "गर्भावस्था में कब्ज (constipation) से बचने के लिए क्या खाना चाहिए?", mr: "गरोदरपणात बद्धकोष्ठतेपासून वाचण्यासाठी काय खावे?" },
            options: [
              { text: { en: "Foods rich in fiber (fruits, green vegetables, oats)", hi: "फाइबर युक्त भोजन (फल, हरी सब्जियां, चोकर युक्त रोटी)", mr: "फायबरयुक्त अन्न (फळे, हिरव्या भाज्या, नाचणी, ओट्स)" }, isCorrect: true },
              { text: { en: "Refined flour (Maida) products", hi: "मैदा और बेकरी उत्पाद", mr: "मैदा आणि बेकरीचे पदार्थ" }, isCorrect: false }
            ],
            explanation: {
              en: "Constipation is common due to progesterone. High-fiber foods like vegetables, whole grains, and drinking water daily help keep digestion smooth.",
              hi: "कब्ज से बचने के लिए हरी सब्जियां, फल और साबुत अनाज खाएं। मैदा और बाहर के खाने से बचें, क्योंकि यह पेट साफ नहीं होने देते।",
              mr: "बद्धकोष्ठता टाळण्यासाठी हिरव्या भाज्या, फळे आणि तृणधान्ये खा. मैदा आणि बाहेरील पदार्थ खाणे टाळा."
            }
          },
          {
            q: { en: "Why is taking Jaggery (Gur) and roasted gram (Chana) recommended?", hi: "गुड़ और भुना हुआ चना खाना गर्भवती महिला के लिए क्यों फायदेमंद है?", mr: "गूळ आणि हरभरे खाणे गर्भवती महिलेसाठी का फायदेशीर आहे?" },
            options: [
              { text: { en: "It is rich in Iron and helps fight anemia", hi: "इसमें आयरन होता है जो खून बढ़ाता है", mr: "यामध्ये लोह (आयरन) असते जे रक्त वाढवण्यास मदत करते" }, isCorrect: true },
              { text: { en: "It reduces body weight", hi: "यह वजन घटाता है", mr: "याने वजन कमी होते" }, isCorrect: false }
            ],
            explanation: {
              en: "Jaggery (Gur) and Chana are traditional, inexpensive Indian sources of iron, which prevent weakness and anemia.",
              hi: "गुड़ और चना आयरन के बेहतरीन पारंपरिक स्रोत हैं। यह शरीर में खून का स्तर सुधारते हैं और कमजोरी दूर करते हैं।",
              mr: "गूळ आणि हरभरे हे लोहाचे उत्तम पारंपरिक स्रोत आहेत. यामुळे शरीरातील रक्ताचे प्रमाण सुधारते आणि अशक्तपणा दूर होतो."
            }
          },
          {
            q: { en: "Is it safe to eat raw/unwashed vegetables in salads?", hi: "क्या कच्चे या बिना धुले सलाद खाना सुरक्षित है?", mr: "कच्चे किंवा न धुता सॅलड खाणे सुरक्षित आहे का?" },
            options: [
              { text: { en: "No, they must be thoroughly washed to prevent infections", hi: "नहीं, बैक्टीरिया से बचने के लिए उन्हें बहुत अच्छे से धोना चाहिए", mr: "नाही, संसर्ग टाळण्यासाठी ते स्वच्छ धुवूनच खाल्ले पाहिजे" }, isCorrect: true },
              { text: { en: "Yes, straight from market is fine", hi: "हाँ, बाजार से लाकर सीधे खा सकते हैं", mr: "होय, बाजारातून आणून थेट खाऊ शकता" }, isCorrect: false }
            ],
            explanation: {
              en: "Raw salads can harbor harmful bacteria/parasites (like Toxoplasma). Wash fruits and vegetables under running tap water very thoroughly.",
              hi: "बिना धुली कच्ची सब्जियों में हानिकारक कीटाणु हो सकते हैं। सलाद या फलों को हमेशा नली के साफ पानी में अच्छे से धोकर ही खाएं।",
              mr: "न धुता सॅलड खाल्ल्याने पोटात जंतू जाऊ शकतात. त्यामुळे सॅलड किंवा फळे नेहमी स्वच्छ पाण्याने धुवूनच खावीत."
            }
          }
        ]
      },
      {
        id: "s3_p2",
        icon: "🏃‍♀️",
        titles: { en: "Sleep & Travel", hi: "सोना और यात्रा", mr: "झोप आणि प्रवास" },
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
            },
            visuals: {
              yes: [{ emoji: "🛌", label: { en: "Left Side", hi: "बाईं करवट", mr: "डावी कुशी" } }],
              no: [{ emoji: "🚶‍♀️", label: { en: "Flat Back", hi: "पीठ के बल", mr: "पाठीवर सरळ" } }]
            }
          },
          {
            q: { en: "Which trimester is generally the safest for necessary travel?", hi: "गर्भावस्था के दौरान यात्रा करने के लिए कौन सा समय सबसे सुरक्षित माना जाता है?", mr: "गरोदरपणात प्रवास करण्यासाठी कोणता काळ सर्वात सुरक्षित मानला जातो?" },
            options: [
              { text: { en: "Second trimester (Months 4-6)", hi: "दूसरी तिमाही (4 से 6 महीने)", mr: "दुसरे त्रैमासिक (४ ते ६ महिने)" }, isCorrect: true },
              { text: { en: "Third trimester (Last month)", hi: "तीसरी तिमाही (अंतिम महीना)", mr: "तिसरे त्रैमासिक (शेवटचा महिना)" }, isCorrect: false }
            ],
            explanation: {
              en: "The second trimester is usually safest because morning sickness has settled, energy is back, and the belly is not yet too heavy.",
              hi: "दूसरा तिमाही सफर के लिए सबसे अनुकूल होता है क्योंकि इस समय उल्टी बंद हो जाती है, ऊर्जा लौट आती है और पेट बहुत भारी नहीं होता।",
              mr: "प्रवासासाठी दुसरा त्रैमासिक सर्वात सोयीचा मानला जातो कारण या काळात मळमळ थांबते आणि पोट जास्त मोठे नसते."
            }
          },
          {
            q: { en: "When sitting for long hours during travel or work, you should:", hi: "काम या सफर के दौरान लंबे समय तक बैठते समय क्या करना चाहिए?", mr: "काम किंवा प्रवासादरम्यान दीर्घकाळ बसताना काय करावे?" },
            options: [
              { text: { en: "Stretch legs and walk for 5 mins every 1-2 hours", hi: "हर 1-2 घंटे में 5 मिनट के लिए पैरों को हिलाएं और घूमें", mr: "दर १-२ तासांनी ५ मिनिटे पाय मोकळे करा आणि फिरा" }, isCorrect: true },
              { text: { en: "Keep legs still in one position", hi: "पैरों को एक ही जगह बिना हिलाए रखें", mr: "पाय एकाच जागी स्थिर ठेवा" }, isCorrect: false }
            ],
            explanation: {
              en: "Lying or sitting still for long increases blood clot risks in legs. Keep stretching your ankles and walk briefly every hour.",
              hi: "लंबे समय तक पैर लटकाकर बैठने से पैरों में सूजन और ब्लड क्लॉट का खतरा रहता है। हर घंटे थोड़ी देर टहलें और पैर हिलाएं।",
              mr: "दीर्घकाळ पाय लटकवून बसल्याने पायांवर सूज येऊ शकते. त्यामुळे दर तासाला पाय थोडे हलवावे किंवा थोडे चालावे."
            }
          },
          {
            q: { en: "At what week range is the crucial Anomaly scan (organ scan) done?", hi: "बच्चे के अंगों के विकास की जांच (एनामली स्कैन/TIFFA) कब की जाती है?", mr: "बाळाच्या अवयवांची तपासणी (ॲनामली स्कॅन) कोणत्या आठवड्यात केली जाते?" },
            options: [
              { text: { en: "18 to 20 weeks", hi: "18 से 20 सप्ताह में", mr: "१८ ते २० आठवड्यात" }, isCorrect: true },
              { text: { en: "36 weeks onwards", hi: "36 सप्ताह के बाद", mr: "३६ आठवड्यांनंतर" }, isCorrect: false }
            ],
            explanation: {
              en: "The Anomaly Scan (Level 2) checks the baby's detailed organs (heart, brain, kidneys, spine) for normal development around 18-20 weeks.",
              hi: "18 से 20 हफ्ते में होने वाला एनामली स्कैन सबसे महत्वपूर्ण सोनोग्राफी है, जो बच्चे के अंगों का बारीक परीक्षण करती है।",
              mr: "१८ ते २० आठवड्यात होणारा स्कॅन अत्यंत महत्त्वाचा असतो, जो बाळाच्या सर्व अवयवांचे बारीक निरीक्षण करतो."
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
        titles: { en: "Food & Nutrition", hi: "आहार और पोषण", mr: "आहार आणि पोषण" },
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
            },
            visuals: {
              yes: [{ emoji: "🥣", label: { en: "Small Meals", hi: "छोटा भोजन", mr: "छोटे जेवण" } }],
              no: [{ emoji: "🍽️", label: { en: "Huge Meals", hi: "भारी भोजन", mr: "भारी जेवण" } }]
            }
          },
          {
            q: { en: "Why should highly salty foods (pickles, papad, chips) be limited now?", hi: "अंतिम महीनों में बहुत नमकीन चीजों (अचार, पापड़) से क्यों बचना चाहिए?", mr: "शेवटच्या महिन्यांत जास्त खारट पदार्थ (लोणचे, पापड) खाणे का टाळावे?" },
            options: [
              { text: { en: "They cause feet swelling and high BP", hi: "इनसे पैरों में सूजन और ब्लड प्रेशर बढ़ सकता है", mr: "यामुळे पायांवर सूज येऊ शकते आणि रक्तदाब वाढू शकतो" }, isCorrect: true },
              { text: { en: "They stop baby's growth", hi: "इनसे बच्चे का विकास रुक जाता है", mr: "यामुळे बाळाची वाढ थांबते" }, isCorrect: false }
            ],
            explanation: {
              en: "Too much salt causes fluid retention (swelling in feet) and raises blood pressure, which can be dangerous in late pregnancy.",
              hi: "ज्यादा नमक खाने से शरीर में पानी जमा होता है जिससे पैरों में सूजन आती है और बीपी बढ़ सकता है। सादा भोजन ही लें।",
              mr: "जास्त मीठ खाल्ल्याने शरीरात पाणी साठून पायांवर सूज येते आणि बीपी वाढू शकतो. त्यामुळे साधे जेवण घ्यावे."
            },
            visuals: {
              yes: [{ emoji: "🥗", label: { en: "Fresh Salad", hi: "ताजा सलाद", mr: "ताजे सॅलड" } }],
              no: [{ emoji: "🍟", label: { en: "Chips/Papad", hi: "पापड़/चिप्स", mr: "पापड/चिप्स" } }]
            }
          },
          {
            q: { en: "What benefit do Dates (Khajoor) provide in the 9th month?", hi: "9वें महीने में खजूर (Dates) खाने का क्या फायदा होता है?", mr: "९व्या महिन्यात खजूर खाण्याचा काय फायदा होतो?" },
            options: [
              { text: { en: "They may help ease cervical dilation & labor", hi: "यह प्रसव पीड़ा (लेबर) को आसान बनाने में मदद कर सकते हैं", mr: "हे बाळंतपणाच्या कळा सोप्या करण्यास मदत करू शकतात" }, isCorrect: true },
              { text: { en: "They change baby's eye color", hi: "इनसे बच्चे की आँखों का रंग बदलता है", mr: "याने बाळाच्या डोळ्याचा रंग बदलतो" }, isCorrect: false }
            ],
            explanation: {
              en: "Medical studies suggest eating 5-6 dates daily in late weeks helps soften the cervix and supports an easier natural labor.",
              hi: "रिसर्च बताते हैं कि अंतिम हफ्तों में रोजाना 4-5 खजूर खाने से प्रसव मार्ग लचीला होता है और प्रसव में कम समय लगता है।",
              mr: "संशोधनानुसार शेवटच्या आठवड्यात रोज ४-५ खजूर खाल्ल्याने बाळंतपणाचा मार्ग सुलभ होतो आणि कळा कमी वेळ देतात."
            }
          },
          {
            q: { en: "Which mineral intake is increased to prevent weakness during birth?", hi: "प्रसव के समय कमजोरी और खून की कमी से बचने के लिए क्या जरूरी है?", mr: "बाळंतपणाच्या वेळी अशक्तपणा टाळण्यासाठी काय आवश्यक आहे?" },
            options: [
              { text: { en: "Iron (green leafy vegetables, pomegranate, gur)", hi: "आयरन (हरी सब्जियां, अनार, गुड़)", mr: "लोह (हिरव्या भाज्या, डाळिंब, गूळ)" }, isCorrect: true },
              { text: { en: "Sugar & Sweets", hi: "चीनी और मिठाइयाँ", mr: "साखर आणि मिठाई" }, isCorrect: false }
            ],
            explanation: {
              en: "Iron helps build hemoglobin. Good levels prevent bleeding complications during delivery. Continue taking your iron pills.",
              hi: "आयरन शरीर में खून (हीमोग्लोबिन) बनाए रखता है, जिससे प्रसव के समय अधिक खून बहने का खतरा टलता है। गोलियां जारी रखें।",
              mr: "लोह रक्तातील हिमोग्लोबिनचे प्रमाण योग्य राखते, ज्यामुळे बाळंतपणात जास्त रक्तस्त्राव होण्याचा धोका टळतो. गोळ्या चालू ठेवा."
            }
          }
        ]
      },
      {
        id: "s4_p2",
        icon: "🩺",
        titles: { en: "Baby Health Monitoring", hi: "बच्चे की हलचल", mr: "बाळाची हालचाल" },
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
            },
            visuals: {
              yes: [{ emoji: "🦶", label: { en: "Active Kicks", hi: "10 हलचल", mr: "१० हालचाली" } }],
              no: [{ emoji: "💤", label: { en: "No movement", hi: "कोई हलचल नहीं", mr: "हालचाल नाही" } }]
            }
          },
          {
            q: { en: "If you feel the baby has not moved for 3-4 hours, what should you do first?", hi: "यदि बच्चा 3-4 घंटे से नहीं हिला है, तो सबसे पहले क्या करें?", mr: "जर बाळ ३-४ तास हलले नसेल, तर सर्वात आधी काय करावे?" },
            options: [
              { text: { en: "Drink cold water or eat sweet, lie on left side and count", hi: "ठंडा पानी पिएं या कुछ मीठा खाकर बाईं करवट लेटें और गिनें", mr: "थंड पाणी प्या किंवा गोड खाऊन डाव्या कुशीवर झोपा आणि मोजा" }, isCorrect: true },
              { text: { en: "Wait till tomorrow morning", hi: "अगली सुबह तक का इंतजार करें", mr: "अगल्या सकाळी वाट पाहा" }, isCorrect: false }
            ],
            explanation: {
              en: "Drinking cold water or eating a snack often wakes the baby up. Lie on your left side and monitor kicks. If no movement in next 1 hour, contact Dr. Vaibhavi.",
              hi: "मीठा खाने या ठंडा पानी पीने से बच्चा अक्सर सक्रिय हो जाता है। बाईं करवट लेटकर ध्यान दें। यदि हलचल न हो, तो तुरंत डॉक्टर को बताएं।",
              mr: "गोड खाल्ल्याने किंवा थंड पाणी पिल्याने बाळ हलचाल करू लागते. डाव्या कुशीवर झोपून लक्ष द्या. तरीही हालचाल न झाल्यास डॉक्टरांशी बोला."
            }
          },
          {
            q: { en: "Sudden swelling of face and hands accompanied by a headache is:", hi: "चेहरे-हाथों पर अचानक भारी सूजन और तेज सिरदर्द होना क्या संकेत देता है?", mr: "चेहऱ्यावर आणि हातावर अचानक सूज येणे आणि डोके दुखणे हे कशाचे लक्षण आहे?" },
            options: [
              { text: { en: "A danger sign (requires immediate BP check)", hi: "एक खतरे का संकेत (तुरंत बीपी जांच आवश्यक है)", mr: "एक धोक्याची घंटा (लगेच बीपी तपासणे आवश्यक आहे)" }, isCorrect: true },
              { text: { en: "Normal tiredness", hi: "सामान्य थकान है", mr: "सामान्य थकवा आहे" }, isCorrect: false }
            ],
            explanation: {
              en: "Sudden facial swelling or severe headache is a warning sign of high blood pressure (preeclampsia). Seek hospital care immediately.",
              hi: "चेहरे और हाथों पर अचानक आई सूजन बीपी बढ़ने का मुख्य लक्षण है। ऐसा होने पर तुरंत डॉक्टर के पास जाकर बीपी नपवाएं।",
              mr: "चेहऱ्यावर आणि हातावर अचानक सूज येणे हे बीपी वाढण्याचे प्रमुख लक्षण आहे. असे झाल्यास लगेच डॉक्टरांकडे जा."
            }
          },
          {
            q: { en: "Braxton Hicks contractions (false labor pain) are characterized by:", hi: "ब्रेक्सटन हिक्स (झूठा प्रसव दर्द) की क्या पहचान है?", mr: "फॉल्स लेबर पेन (खोट्या कळा) कशा ओळखायच्या?" },
            options: [
              { text: { en: "Irregular pain that goes away with rest or changing position", hi: "अनियमित दर्द जो आराम करने या चलने से ठीक हो जाता है", mr: "अनियमित कळा ज्या विश्रांती घेतल्यावर किंवा चालल्यावर थांबतात" }, isCorrect: true },
              { text: { en: "Regular pain that gets stronger and closer", hi: "लगातार तेज होने वाला दर्द जो रुकता नहीं", mr: "सतत वाढणाऱ्या कळा ज्या थांबत नाहीत" }, isCorrect: false }
            ],
            explanation: {
              en: "Braxton Hicks are irregular practice contractions. Real labor pain does not stop with rest; it becomes more intense and regular.",
              hi: "झूठा दर्द (फॉल्स पेन) थोड़ी देर में या करवट बदलने पर ठीक हो जाता है। असली प्रसव पीड़ा समय के साथ तेज होती जाती है।",
              mr: "खोट्या कळा थोड्या वेळात किंवा विश्रांती घेतल्यावर थांबतात. खऱ्या कळा मात्र वेळेनुसार अधिक तीव्र होतात आणि थांबत नाहीत."
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
            },
            visuals: {
              yes: [{ emoji: "📁", label: { en: "Medical File", hi: "मेडिकल फाइल", mr: "वैद्यकीय फाईल" } }],
              no: [{ emoji: "🧸", label: { en: "Toys", hi: "खिलौने", mr: "खेळणी" } }]
            }
          },
          {
            q: { en: "How many maternity sanitary pads should you pack in your bag?", hi: "अस्पताल के बैग में कितने सैनिटरी पैड्स (Maternity Pads) रखने चाहिए?", mr: "रुग्णालयाच्या बॅगेत किती सॅनिटरी पॅड्स (Maternity Pads) ठेवले पाहिजेत?" },
            options: [
              { text: { en: "1-2 pads only", hi: "केवल 1-2 पैड", mr: "फक्त १-२ पॅड" }, isCorrect: false },
              { text: { en: "At least 10-12 heavy absorbent pads", hi: "कम से कम 10-12 अधिक सोखने वाले मोटे पैड्स", mr: "किमान १०-१२ जास्त शोषून घेणारे मोठे पॅड्स" }, isCorrect: true }
            ],
            explanation: {
              en: "Post-delivery bleeding (lochia) is heavy. Regular thin pads are not enough. Pack thick, highly absorbent maternity pads.",
              hi: "डिलीवरी के बाद ब्लीडिंग ज्यादा होती है। इसके लिए अधिक सोखने वाले मोटे मैटरनिटी पैड्स की जरूरत होती है। कम से कम 10-12 पैड साथ रखें।",
              mr: "बाळंतपणानंतर रक्तस्त्राव जास्त होतो. यासाठी मोठे आणि जास्त शोषून घेणारे पॅड्स आवश्यक असतात. किमान १०-१२ पॅड सोबत ठेवावे."
            }
          },
          {
            q: { en: "For the baby's clothing, you should choose:", hi: "शिशु के लिए किस तरह के कपड़े बैग में रखने चाहिए?", mr: "बाळासाठी कोणत्या प्रकारचे कपडे बॅगेत ठेवावेत?" },
            options: [
              { text: { en: "New unwashed fancy clothes", hi: "नए बिना धुले फैंसी कपड़े", mr: "नवीन न धुतलेले फॅन्सी कपडे" }, isCorrect: false },
              { text: { en: "Soft, pre-washed, front-open cotton clothes", hi: "मुलायम, पहले से धुले हुए आगे से खुलने वाले सूती कपड़े", mr: "मऊ, आधीच धुतलेले पुढे बटन असणारे सुती कपडे" }, isCorrect: true }
            ],
            explanation: {
              en: "New clothes contain chemicals. Wash baby clothes with mild detergent first. Front-open clothes make dressing the fragile newborn easy.",
              hi: "नवजात शिशु की त्वचा बहुत नाजुक होती है। नए कपड़ों को पहले धो लें। आगे से खुलने वाले सूती कपड़े पहनाना सबसे आसान होता है।",
              mr: "बाळाची त्वचा खूप नाजूक असते. नवीन कपडे आधी स्वच्छ धुवून घ्यावेत. पुढे बटणे असणारे सुती कपडे घालणे सोपे जाते."
            }
          },
          {
            q: { en: "What type of clothes should the mother wear in the hospital?", hi: "अस्पताल में माँ के लिए किस प्रकार के कपड़े आरामदायक होते हैं?", mr: "रुग्णालयात आईसाठी कोणत्या प्रकारचे कपडे सोयीचे असतात?" },
            options: [
              { text: { en: "Tight fitting outfits", hi: "टाइट कपड़े", mr: "फिट कपडे" }, isCorrect: false },
              { text: { en: "Loose, comfortable front-open gowns or kurtis", hi: "ढीले, आरामदायक आगे से खुलने वाले गाउन या कुर्तियां", mr: "सैल, आरामदायक पुढे बटन असणारे गाऊन किंवा कुर्ती" }, isCorrect: true }
            ],
            explanation: {
              en: "Loose, front-open clothing makes breastfeeding easy and comfortable after delivery. Carry 2-3 sets to the hospital.",
              hi: "ढीले और आगे से बटन वाले कपड़े प्रसव के बाद स्तनपान कराने में आसानी प्रदान करते हैं। ऐसे 2-3 जोड़ी कपड़े साथ रखें।",
              mr: "सैल आणि पुढे बटणे असणारे कपडे बाळंतपणानंतर स्तनपान करण्यासाठी सोयीचे असतात. असे २-३ कपडे सोबत ठेवावेत."
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
          },
          {
            q: { en: "If your water breaks (leakage of clear fluid), you should:", hi: "यदि पानी की थैली फट जाए (पानी बहने लगे), तो आपको क्या करना चाहिए?", mr: "जर पाण्याची पिशवी फुटली (पाणी वाहू लागले), तर तुम्ही काय करावे?" },
            options: [
              { text: { en: "Wait at home for pains to start", hi: "दर्द शुरू होने का घर पर इंतजार करें", mr: "घरी कळा यायची वाट पाहा" }, isCorrect: false },
              { text: { en: "Go to the hospital immediately", hi: "बिना देरी किए तुरंत अस्पताल जाएं", mr: "विलंब न करता लगेच रुग्णालयात जा" }, isCorrect: true }
            ],
            explanation: {
              en: "Once the water breaks, the protective barrier around the baby is gone. Visit the hospital immediately to prevent infections, even if you have no pain.",
              hi: "पानी बहना शुरू होने पर संक्रमण का खतरा बढ़ जाता है। दर्द न होने पर भी तुरंत डॉक्टर के पास या अस्पताल जाएं।",
              mr: "पाणी वाहू लागल्यास बाळाला जंतू संसर्ग होण्याचा धोका असतो. कळा येत नसतील तरीही लगेच रुग्णालयात जावे."
            },
            visuals: {
              yes: [{ emoji: "💧", label: { en: "Clear Fluid", hi: "साफ पानी", mr: "स्वच्छ पाणी" } }],
              no: [{ emoji: "🟢", label: { en: "Green/Brown", hi: "हरा / भूरा", mr: "हिरवे / तपकिरी" } }]
            }
          },
          {
            q: { en: "What is the 'bloody show' during late pregnancy?", hi: "प्रसव से ठीक पहले होने वाले 'ब्लडी शो' (Bloody Show) का क्या अर्थ है?", mr: "बाळंतपणाच्या आधी होणाऱ्या 'ब्लडी शो' (Bloody Show) चा अर्थ काय?" },
            options: [
              { text: { en: "A sign that birth is near (cervix is opening)", hi: "प्रसव नजदीक होने का संकेत (गर्भाशय का मुंह खुल रहा है)", mr: "बाळंतपण जवळ आल्याचे लक्षण (गर्भाशयाचे तोंड उघडत आहे)" }, isCorrect: true },
              { text: { en: "A dangerous internal injury", hi: "कोई अंदरूनी गंभीर चोट", mr: "काहीतरी गंभीर दुखापत" }, isCorrect: false }
            ],
            explanation: {
              en: "A small discharge of pinkish or brown mucus is called the 'bloody show'. It means the cervix is softening and dilating for delivery.",
              hi: "हल्का गुलाबी या भूरे रंग का बलगम जैसा स्राव होना ब्लडी शो कहलाता है। इसका मतलब है कि प्रसव मार्ग खुलना शुरू हो गया है।",
              mr: "गुलाबी किंवा तपकिरी रंगाचा चिकट स्त्राव होणे म्हणजे बाळंतपणाची सुरुवात होणे. गर्भाशयाचा मार्ग मोकळा होत असल्याचे हे लक्षण आहे."
            }
          },
          {
            q: { en: "If the fluid from your water breaking is greenish-brown, it means:", hi: "यदि बहने वाला पानी हरे या भूरे रंग का दिखे, तो इसका क्या अर्थ है?", mr: "जर वाहणारे पाणी हिरवट-तपकिरी रंगाचे दिसले, तर त्याचा काय अर्थ होतो?" },
            options: [
              { text: { en: "It is normal", hi: "यह सामान्य बात है", mr: "हे सामान्य आहे" }, isCorrect: false },
              { text: { en: "It is an emergency (baby passed stool in womb)", hi: "यह एक इमरजेंसी है (बच्चे ने गर्भ में शौच कर दिया है)", mr: "ही आणीबाणी आहे (बाळाने पोटात शी केली आहे)" }, isCorrect: true }
            ],
            explanation: {
              en: "Green/brown fluid means the baby passed stool (meconium) inside. This is an emergency; rush to the hospital immediately.",
              hi: "हरे-भूरे पानी का मतलब है कि बच्चे ने गर्भ में शौच कर दिया है। यह एक गंभीर स्थिति है, तुरंत अस्पताल पहुंचें।",
              mr: "हिरवट पाण्याचा अर्थ बाळाने पोटात घाण केली आहे असा होतो. ही आणीबाणीची वेळ आहे, लगेच रुग्णालयात जावे."
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
            },
            visuals: {
              yes: [{ emoji: "🍼", label: { en: "Feed Colostrum", hi: "पीला दूध पिलाएं", mr: "पिवळे दूध पाजा" } }],
              no: [{ emoji: "🗑️", label: { en: "Discard Milk", hi: "दूध फेंकना", mr: "दूध फेकून देणे" } }]
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
            },
            visuals: {
              yes: [{ emoji: "🤱", label: { en: "Breast Milk Only", hi: "केवल माँ का दूध", mr: "फक्त आईचे दूध" } }],
              no: [{ emoji: "💧", label: { en: "Water / Honey", hi: "पानी या शहद", mr: "पाणी किंवा मध" } }]
            }
          },
          {
            q: { en: "What is a sign of a good breastfeeding latch?", hi: "सही तरीके से स्तनपान (Good Latch) कराने का क्या लक्षण है?", mr: "बाळाने दूध व्यवस्थित पकडल्याचे (Good Latch) काय लक्षण आहे?" },
            options: [
              { text: { en: "Only the tip of nipple is in baby's mouth", hi: "बच्चे के मुंह में केवल निप्पल का सिरा हो", mr: "बाळाच्या तोंडात फक्त दुधाचे टोक असणे" }, isCorrect: false },
              { text: { en: "Baby covers a large part of the dark area (areola)", hi: "बच्चा निप्पल के चारों ओर के काले हिस्से (Areola) को मुंह में ले", mr: "बाळाच्या तोंडात दुधाच्या टोकाभोवतीचा काळा भाग (Areola) जाणे" }, isCorrect: true }
            ],
            explanation: {
              en: "A deep latch covers most of the areola. If latching is correct, the mother will not feel pain, and the baby will feed efficiently.",
              hi: "सही लैचिंग में बच्चा काले हिस्से को मुंह में लेता है। इससे माँ को दर्द नहीं होता और बच्चे को पूरा दूध मिलता है।",
              mr: "योग्य पद्धतीने दूध पाजताना बाळ आजूबाजूचा काळा भाग तोंडात घेते. यामुळे आईला त्रास होत नाही आणि बाळाला पुरेसे दूध मिळते."
            }
          },
          {
            q: { en: "How often should you feed a newborn baby?", hi: "नवजात शिशु को कितनी बार दूध पिलाना चाहिए?", mr: "नवजात बाळाला किती वेळा दूध पाजावे?" },
            options: [
              { text: { en: "Every 2-3 hours (On demand)", hi: "हर 2 से 3 घंटे में (मांग के अनुसार)", mr: "दर २ ते ३ तासांनी (बाळाच्या गरजेनुसार)" }, isCorrect: true },
              { text: { en: "Only 3 times a day", hi: "दिन में केवल 3 बार", mr: "दिवसातून फक्त ३ वेळा" }, isCorrect: false }
            ],
            explanation: {
              en: "Newborns have tiny stomachs. Feed them every 2-3 hours (8-12 times a day) or whenever they show hunger signs like sucking fingers.",
              hi: "शिशु का पेट बहुत छोटा होता है। इसलिए उन्हें हर 2-3 घंटे में दूध पिलाना चाहिए। रोने का इंतजार न करें, हाथ मुंह में लेना भूख का शुरुआती संकेत है।",
              mr: "बाळाचे पोट लहान असते. त्यामुळे दर २-३ तासांनी दूध पाजावे. बाळ रडण्याची वाट पाहू नका, बोटे तोंडात घालणे हे भुकेचे लक्षण आहे."
            }
          }
        ]
      },
      {
        id: "s6_p2",
        icon: "👶",
        titles: { en: "Newborn Care", hi: "शिशु की शारीरिक देखभाल", mr: "बाळाची काळजी" },
        questions: [
          {
            q: { en: "How should you care for the baby's umbilical cord stump?", hi: "बच्चे की नाभि के बचे हुए हिस्से (Umbilical Stump) की देखभाल कैसे करें?", mr: "बाळाच्या नाळेची (Umbilical Stump) काळजी कशी घ्यावी?" },
            options: [
              { text: { en: "Apply oil, ghee, or turmeric daily", hi: "रोज तेल, घी या हल्दी लगाएं", mr: "रोज तेल, तूप किंवा हळद लावावी" }, isCorrect: false },
              { text: { en: "Keep it clean and dry; apply nothing", hi: "उसे साफ और सूखा रखें; कुछ भी न लगाएं", mr: "ते स्वच्छ आणि कोरडे ठेवा; काहीही लावू नका" }, isCorrect: true }
            ],
            explanation: {
              en: "Keep the cord dry. Do not apply anything like turmeric or oil as it causes infection. It falls off naturally in 7-14 days.",
              hi: "नाभि को हमेशा सूखा और साफ रखें। उस पर हल्दी, तेल या घी लगाने से इन्फेक्शन हो सकता है। यह 1-2 हफ्ते में खुद गिर जाती है।",
              mr: "नाळ नेहमी कोरडी ठेवावी. त्यावर हळद किंवा तेल लावल्यास संसर्ग जाऊ शकतो. ती १-२ आठवड्यात आपोआप गळून पडते."
            },
            visuals: {
              yes: [{ emoji: "💨", label: { en: "Keep Dry", hi: "सूखा रखें", mr: "कोरडे ठेवा" } }],
              no: [{ emoji: "🍯", label: { en: "Oil / Turmeric", hi: "तेल / हल्दी", mr: "तेल / हळद" } }]
            }
          },
          {
            q: { en: "How many wet diapers should a healthy baby have daily?", hi: "एक स्वस्थ नवजात शिशु २४ घंटे में कितनी बार पेशाब करता है?", mr: "एक निरोगी बाळ २४ तासांत साधारण किती वेळा लघवी करते?" },
            options: [
              { text: { en: "At least 6 to 8 wet diapers", hi: "कम से कम 6 से 8 बार गीला डायपर", mr: "किमान ६ ते ८ वेळा ओले डायपर" }, isCorrect: true },
              { text: { en: "1-2 times only", hi: "केवल 1-2 बार", mr: "फक्त १-२ वेळा" }, isCorrect: false }
            ],
            explanation: {
              en: "Passing urine 6-8 times a day shows that the baby is getting sufficient breast milk and is well-hydrated.",
              hi: "दिनभर में 6 से 8 बार पेशाब करना दर्शाता है कि बच्चे को पर्याप्त मात्रा में दूध मिल रहा है और वह स्वस्थ है।",
              mr: "दिवसभरात ६ ते ८ वेळा लघवी करणे हे बाळाला पुरेसे दूध मिळत असल्याचे उत्तम लक्षण आहे."
            }
          },
          {
            q: { en: "When is the best time for the baby's first bath?", hi: "शिशु को जन्म के बाद पहली बार कब नहलाना चाहिए?", mr: "बाळाला जन्मानंतर पहिल्यांदा कधी आंघोळ घालावी?" },
            options: [
              { text: { en: "Delay by at least 24 hours", hi: "जन्म के कम से कम 24 घंटे बाद", mr: "जन्मानंतर किमान २४ तासांनी" }, isCorrect: true },
              { text: { en: "Immediately after birth", hi: "जन्म के तुरंत बाद", mr: "जन्मानंतर लगेच" }, isCorrect: false }
            ],
            explanation: {
              en: "WHO recommends delaying the first bath by 24 hours to help regulate baby's body temperature and keep their skin protected.",
              hi: "बच्चे को जन्म के तुरंत बाद न नहलाएं। कम से कम 24 घंटे का इंतजार करें ताकि बच्चे के शरीर का तापमान सामान्य रह सके।",
              mr: "बाळाला जन्मानंतर लगेच आंघोळ घालू नये. किमान २४ तास थांबावे जेणेकरून बाळाच्या शरीराचे तापमान योग्य राहील."
            }
          },
          {
            q: { en: "Which vaccinations are given to a newborn baby at birth?", hi: "जन्म के तुरंत बाद बच्चे को कौन से टीके लगाए जाते हैं?", mr: "बाळाच्या जन्मानंतर लगेच कोणत्या लसी दिल्या जातात?" },
            options: [
              { text: { en: "BCG, Hepatitis B, and OPV (Polio)", hi: "बीसीजी, हेपेटाइटिस बी और ओपीवी (पोलियो ड्रॉप्स)", mr: "बीसीजी, हिपॅटायटीस बी आणि पोलिओ ड्रॉप्स" }, isCorrect: true },
              { text: { en: "None, wait for 1 year", hi: "कोई नहीं, 1 साल तक इंतजार करें", mr: "काहीही नाही, १ वर्ष थांबा" }, isCorrect: false }
            ],
            explanation: {
              en: "BCG, Polio drops (OPV-0), and Hepatitis B vaccine should be given within 24 hours of birth to protect the baby from severe diseases.",
              hi: "जन्म के तुरंत बाद बीसीजी (टीबी से बचाव), पोलियो की खुराक और हेपेटाइटिस बी का टीका लगाया जाता है। इसे न चूकें।",
              mr: "जन्मानंतर लगेच बीसीजी (टीबीपासून बचाव), पोलिओचे थेंब आणि हिपॅटायटीस बी ची लस दिली जाते. ही सरकारी रुग्णालयात मोफत मिळते."
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
  const [confetti, setConfetti] = useState<{ id: number; left: number; delay: number; color: string }[]>([]);

  // Trigger confetti on complete screen
  useEffect(() => {
    if (currentScreen === 'pillar_complete') {
      const items = Array.from({ length: 45 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        color: ['bg-rose-500', 'bg-yellow-400', 'bg-blue-400', 'bg-emerald-400', 'bg-purple-400', 'bg-pink-400'][Math.floor(Math.random() * 6)]
      }));
      setConfetti(items);
    } else {
      setConfetti([]);
    }
  }, [currentScreen]);

  // Load state and completion from local storage
  useEffect(() => {
    const activeProfile = getUserProfile();
    setProfile(activeProfile);
    setLanguage(activeProfile.language || 'hi');
    
    if (typeof window !== 'undefined') {
      const storedCompleted = localStorage.getItem('completed_pillars_v3');
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
        localStorage.setItem('completed_pillars_v3', JSON.stringify(newCompleted));
        
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

  // Helper to build WhatsApp dynamic message link
  const getWhatsAppLink = (questionText: string) => {
    const doctorPhone = "919321880359";
    const prefix = t(
      `Hello Dr. Vaibhavi, I am playing your Pregnancy Game and have a question regarding: `,
      `नमस्ते डॉ. वैभवी, मैं आपका गर्भावस्था खेल खेल रही हूँ और मुझे इस विषय में एक सवाल पूछना है: `,
      `नमस्ते डॉ. वैभवी, मी तुमचा गरोदरपणाचा खेळ खेळत आहे आणि मला याबद्दल एक प्रश्न विचारायचा आहे: `
    );
    const fullMessage = `${prefix}"${questionText}"`;
    return `https://wa.me/${doctorPhone}?text=${encodeURIComponent(fullMessage)}`;
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5] text-gray-800 flex flex-col font-sans pb-8 antialiased relative overflow-x-hidden">
      <style>{customStyles}</style>

      {/* --- BACKGROUND FLOATING DECORATIONS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <span className="absolute bottom-0 left-[12%] text-3xl opacity-[0.08] animate-float-1">🌸</span>
        <span className="absolute bottom-0 left-[35%] text-4xl opacity-[0.08] animate-float-2" style={{ animationDelay: '3s' }}>🌸</span>
        <span className="absolute bottom-0 left-[68%] text-2xl opacity-[0.08] animate-float-3" style={{ animationDelay: '6s' }}>🌸</span>
        <span className="absolute bottom-0 left-[85%] text-3xl opacity-[0.08] animate-float-1" style={{ animationDelay: '1.5s' }}>👶</span>
      </div>

      {/* --- CONFETTI SYSTEM --- */}
      {confetti.map((item) => (
        <div
          key={item.id}
          className={`fixed w-2.5 h-2.5 rounded-full ${item.color} animate-fall z-50 pointer-events-none`}
          style={{
            left: `${item.left}%`,
            top: `-20px`,
            animationDelay: `${item.delay}s`,
          }}
        />
      ))}

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
          <div className="relative w-full">
            {/* DESKTOP SIDE PANEL (LEFT): AVOID / NO (Mom Avoiding) */}
            {isAnswered && selectedPillar.questions[currentQuestionIdx].visuals?.no && (
              <div className="hidden lg:flex lg:flex-col items-center justify-center text-center p-3.5 bg-white border-2 border-rose-200 rounded-2xl shadow-lg w-44 absolute right-full mr-5 top-1/2 -translate-y-1/2 animate-pop-in">
                <span className="text-5xl mb-2 animate-pulse">🤰🙅‍♀️</span>
                <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-wider">
                  {t("Avoid", "बचें", "टाळा")} ✕
                </span>
                <div className="flex flex-wrap items-center gap-1.5 justify-center mb-1.5">
                  {selectedPillar.questions[currentQuestionIdx].visuals.no.map((v, vidx) => (
                    <span key={vidx} className="text-2xl animate-bounce" style={{ animationDelay: `${vidx * 0.2}s` }}>
                      {v.emoji}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] font-extrabold text-rose-955 leading-snug">
                  {selectedPillar.questions[currentQuestionIdx].visuals.no.map(v => v.label[language]).join(' + ')}
                </p>
              </div>
            )}

            {/* DESKTOP SIDE PANEL (RIGHT): EAT / YES (Mom Eating) */}
            {isAnswered && selectedPillar.questions[currentQuestionIdx].visuals?.yes && (
              <div className="hidden lg:flex lg:flex-col items-center justify-center text-center p-3.5 bg-white border-2 border-emerald-200 rounded-2xl shadow-lg w-44 absolute left-full ml-5 top-1/2 -translate-y-1/2 animate-pop-in">
                <span className="text-5xl mb-2 animate-pulse">🤰😋</span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-wider">
                  {t("Eat / Yes", "खाएं", "खा")} ✓
                </span>
                <div className="flex flex-wrap items-center gap-1.5 justify-center mb-1.5">
                  {selectedPillar.questions[currentQuestionIdx].visuals.yes.map((v, vidx) => (
                    <span key={vidx} className="text-2xl animate-bounce" style={{ animationDelay: `${vidx * 0.2}s` }}>
                      {v.emoji}
                    </span>
                  ))}
                </div>
                <p className="text-[10px] font-extrabold text-emerald-955 leading-snug">
                  {selectedPillar.questions[currentQuestionIdx].visuals.yes.map(v => v.label[language]).join(' + ')}
                </p>
              </div>
            )}

            <div className="space-y-3 animate-slide-in">
              {/* Quiz Header Bar */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedPillar.icon}</span>
                  <span className="font-black text-[10px] text-gray-500 uppercase tracking-wider">
                    {selectedPillar.titles[language]}
                  </span>
                </div>
                <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                  {t("Q.", "प्रश्न", "प्र.")} {currentQuestionIdx + 1} / {selectedPillar.questions.length}
                </span>
              </div>

              {/* Question Text Box */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border-2 border-rose-100/60 relative overflow-hidden">
                <p className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug">
                  {selectedPillar.questions[currentQuestionIdx].q[language]}
                </p>
              </div>

              {/* Answers Selection */}
              <div className="space-y-2">
                {selectedPillar.questions[currentQuestionIdx].options.map((opt, oIdx) => {
                  const isSelected = selectedOptionIdx === oIdx;
                  const showCorrect = isAnswered && opt.isCorrect;
                  const showWrong = isAnswered && isSelected && !opt.isCorrect;

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleOptionClick(oIdx)}
                      disabled={isAnswered}
                      className={`w-full py-2.5 px-4 rounded-xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                        showWrong ? 'animate-shake' : ''
                      } ${
                        showCorrect 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-955 scale-[1.01] shadow-xs'
                          : showWrong
                            ? 'bg-rose-50 border-rose-500 text-rose-955 scale-[1.01] shadow-xs'
                            : isAnswered
                              ? 'bg-gray-50 border-gray-100 text-gray-400 opacity-60'
                              : 'bg-white border-rose-100 hover:border-rose-300 hover:bg-rose-50/20 active:scale-98'
                      }`}
                    >
                      <span>{opt.text[language]}</span>
                      
                      {/* Visual state icon */}
                      {showCorrect && <span className="text-emerald-600 text-base">✓</span>}
                      {showWrong && <span className="text-rose-600 text-base">✕</span>}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Section */}
              {isAnswered && (
                <div className="bg-amber-50/90 border border-amber-200 rounded-[20px] p-3.5 animate-fade-in relative">
                  <div className="flex items-center justify-between mb-2 border-b border-amber-200/60 pb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-base">📢</span>
                      <h4 className="font-extrabold text-[10px] text-amber-900 uppercase tracking-wide">
                        {t("Dr. Vaibhavi's Advice:", "डॉ. वैभवी की सलाह:", "डॉ. वैभवीयांचा सल्ला:")}
                      </h4>
                    </div>
                    <button 
                      onClick={() => speakText(selectedPillar.questions[currentQuestionIdx].explanation[language], language)}
                      className="text-[9px] font-black text-rose-700 bg-white hover:bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm transition-all"
                    >
                      <span>🔊</span>
                      <span>{t("Listen", "सुनें", "ऐका")}</span>
                    </button>
                  </div>

                  {/* --- DYNAMIC MOBILE COMPACT VISUALS --- */}
                  {selectedPillar.questions[currentQuestionIdx].visuals && (
                    <div className="flex lg:hidden gap-2 mb-2.5">
                      {selectedPillar.questions[currentQuestionIdx].visuals.no && selectedPillar.questions[currentQuestionIdx].visuals.no.length > 0 && (
                        <div className="flex-1 bg-rose-50 border border-rose-200 rounded-xl p-1.5 flex items-center gap-2">
                          <span className="text-2xl shrink-0">🤰🙅‍♀️</span>
                          <div className="min-w-0">
                            <p className="text-[8px] font-black text-rose-700 uppercase tracking-wider leading-none mb-0.5">{t("Avoid", "बचें", "टाळा")} ✕</p>
                            <p className="text-[8px] font-bold text-rose-955 truncate leading-tight">
                              {selectedPillar.questions[currentQuestionIdx].visuals.no.map(v => v.emoji).join(' ')} {selectedPillar.questions[currentQuestionIdx].visuals.no.map(v => v.label[language]).join(', ')}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {selectedPillar.questions[currentQuestionIdx].visuals.yes && selectedPillar.questions[currentQuestionIdx].visuals.yes.length > 0 && (
                        <div className="flex-1 bg-emerald-50 border border-emerald-200 rounded-xl p-1.5 flex items-center gap-2">
                          <span className="text-2xl shrink-0">🤰😋</span>
                          <div className="min-w-0">
                            <p className="text-[8px] font-black text-emerald-700 uppercase tracking-wider leading-none mb-0.5">{t("Eat / Yes", "खाएं", "खा")} ✓</p>
                            <p className="text-[8px] font-bold text-emerald-955 truncate leading-tight">
                              {selectedPillar.questions[currentQuestionIdx].visuals.yes.map(v => v.emoji).join(' ')} {selectedPillar.questions[currentQuestionIdx].visuals.yes.map(v => v.label[language]).join(', ')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <p className="text-xs text-amber-955 font-semibold leading-relaxed mb-2.5">
                    {selectedPillar.questions[currentQuestionIdx].explanation[language]}
                  </p>

                  {/* --- CONNECT TO CLINIC HOOK --- */}
                  <div className="mt-2 pt-2 border-t border-amber-200/50 flex flex-col sm:flex-row items-center gap-2">
                    <p className="text-[10px] text-amber-900 font-extrabold text-center sm:text-left leading-tight flex-1">
                      {t(
                        "Have a doubt? Ask Dr. Vaibhavi directly:",
                        "कोई शंका है? सीधे डॉ. वैभवी से पूछें:",
                        "काही शंका आहे का? थेट डॉ. वैभवी यांना विचारा:"
                      )}
                    </p>
                    <a
                      href={getWhatsAppLink(selectedPillar.questions[currentQuestionIdx].q[language])}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] px-3 py-1.5 rounded-full shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0"
                    >
                      <span>💬</span>
                      <span>{t("Ask Doctor", "डॉक्टर से पूछें", "डॉक्टरांना विचारा")}</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Next Action Button */}
              {isAnswered && (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-black py-2.5 rounded-full text-xs shadow-md transition-all text-center animate-fade-in"
                >
                  {currentQuestionIdx < selectedPillar.questions.length - 1 
                    ? t("Next Question ➔", "अगला प्रश्न ➔", "पुढील प्रश्न ➔")
                    : t("Finish Quiz 🎉", "क्विज़ समाप्त करें 🎉", "क्विझ पूर्ण करा 🎉")
                  }
                </button>
              )}
            </div>
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
