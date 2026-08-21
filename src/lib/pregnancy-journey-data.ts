import { WeeklyStageContent, FoodThaliItem, MythFactItem, TrafficLightItem, HospitalBagItem, Badge } from '@/types/pregnancy-journey';

export const BADGES: Badge[] = [
    {
        id: 'nutrition_explorer',
        icon: '🥗',
        title: { en: 'Nutrition Explorer', hi: 'पोषण खोजकर्ता', mr: 'पोषण शोधक' },
        description: { en: 'Learned about healthy Indian thali foods!', hi: 'पौष्टिक भारतीय थाली के बारे में जाना!', mr: 'पोषक भारतीय थाळीबद्दल माहिती घेतली!' }
    },
    {
        id: 'hydration_hero',
        icon: '💧',
        title: { en: 'Hydration Hero', hi: 'जल रक्षक', mr: 'जल रक्षक' },
        description: { en: 'Logged 3 liters of water daily!', hi: 'रोज 3 लीटर पानी पीने की आदत बनाई!', mr: 'रोज ३ लिटर पाणी पिण्याची सवय केली!' }
    },
    {
        id: 'checkup_champion',
        icon: '🩺',
        title: { en: 'Checkup Champion', hi: 'जांच विजेता', mr: 'तपासणी विजेता' },
        description: { en: 'Completed antenatal care visit quest!', hi: 'डॉक्टर की जांच की पूरी जानकारी ली!', mr: 'डॉक्टरांच्या तपासणीची पूर्ण माहिती घेतली!' }
    },
    {
        id: 'baby_movement',
        icon: '👶',
        title: { en: 'Baby Movement Expert', hi: 'शिशु हलचल विशेषज्ञ', mr: 'बाळाची हालचाल तज्ज्ञ' },
        description: { en: 'Learned how to track baby kicks!', hi: 'बच्चे की पहली लात और हलचल ट्रैक करना सीखा!', mr: 'बाळाची पहिली हालचाल ट्रॅक करायला शिकले!' }
    },
    {
        id: 'hospital_bag',
        icon: '🎒',
        title: { en: 'Hospital Bag Ready', hi: 'अस्पताल बैग तैयार', mr: 'हॉस्पिटल बॅग तयार' },
        description: { en: 'Packed essential delivery items!', hi: 'डिलीवरी के लिए आवश्यक अस्पताल बैग तैयार किया!', mr: 'डिलीव्हरीसाठी आवश्यक हॉस्पिटल बॅग तयार केली!' }
    },
    {
        id: 'myth_buster',
        icon: '📚',
        title: { en: 'Pregnancy Myth Buster', hi: 'भ्रम निवारक', mr: 'गैरसमज दूर करणारा' },
        description: { en: 'Mastered pregnancy myths vs medical facts!', hi: 'गर्भावस्था के भ्रम और मेडिकल सच को समझा!', mr: 'गरोदरपणातील गैरसमज व वैद्यकीय सत्य समजून घेतले!' }
    }
];

export const SAMPLE_WEEKLY_STAGES: Record<number, WeeklyStageContent> = {
    4: {
        week: 4,
        trimester: 1,
        fruitIcon: '🌾',
        fruitName: { en: 'Poppy Seed (Rava)', hi: 'खसखस या रवा', mr: 'खसखस किंवा रवा' },
        babyDevelopment: {
            en: 'The fertilized egg implants into your uterus wall. Small cells begin forming the placenta.',
            hi: 'निषेचित अंडा आपके गर्भाशय में स्थापित हो रहा है। नाल (Placenta) की कोशिकाएं बनने लगी हैं।',
            mr: 'फलित अंडे तुमच्या गर्भाशयात रोपित होत आहे. नाळेच्या पेशी तयार होऊ लागल्या आहेत.'
        },
        motherBodyChanges: {
            en: 'You may notice light spotting, slight breast tenderness, or subtle fatigue.',
            hi: 'आपको हल्का धब्बा (Spotting), स्तनों में कोमलता या थोड़ी थकावट महसूस हो सकती है।',
            mr: 'तुम्हाला हलका डाग, स्तनांमध्ये मऊपणा किंवा थोडा थकवा जाणवू शकतो.'
        },
        recommendedFoods: [
            {
                name: { en: 'Palak (Spinach)', hi: 'पालक सब्ज़ी', mr: 'पालक भाजी' },
                icon: '🥬',
                why: { en: 'Rich in Folic acid to prevent neural tube defects.', hi: 'फोलिक एसिड से भरपूर - बच्चे के तंत्रिका विकास के लिए जरूरी।', mr: 'फोलिक ॲसिडने समृद्ध - बाळाच्या मज्जासंस्थेच्या विकासासाठी आवश्यक.' },
                isAffordable: true
            },
            {
                name: { en: 'Milk / Dahi (Curd)', hi: 'दूध या ताजा दही', mr: 'दूध किंवा ताजे दही' },
                icon: '🥛',
                why: { en: 'Provides Calcium for bone foundation.', hi: 'कैल्शियम का बेहतरीन स्रोत।', mr: 'कॅल्शियमचा उत्तम स्रोत.' },
                isAffordable: true
            }
        ],
        precautions: [
            { en: 'Avoid smoking, alcohol, and unprescribed pills.', hi: 'धूम्रपान, शराब और बिना सलाह दवाइयों से बचें।', mr: 'धूम्रपान, मद्यपान आणि डॉक्टरांच्या सल्ल्याशिवाय औषधे टाळा.' },
            { en: 'Start taking daily Folic Acid tablets as prescribed.', hi: 'डॉक्टर की सलाह से फोलिक एसिड टैबलेट शुरू करें।', mr: 'डॉक्टरांच्या सल्ल्याने फोलिक ॲसिड गोळ्या सुरू करा.' }
        ],
        doctorVisitsAndTests: [
            { en: 'Schedule home urine pregnancy test & confirm with gynaecologist.', hi: 'घर पर यूरिन प्रेगनेंसी टेस्ट करें और डॉक्टर से पुष्टि कराएं।', mr: 'घरी युरिन प्रेग्नन्सी टेस्ट करा आणि डॉक्टरांकडून खात्री करून घ्या.' }
        ],
        vaccinations: [
            { en: 'Discuss Tetanus Toxoid (TT) vaccine schedule.', hi: 'टीटी (TT) टीके की समय-सारणी पर डॉक्टर से चर्चा करें।', mr: 'टीटी (TT) लसीकरणाच्या वेळापत्रकाबाबत डॉक्टरांशी चर्चा करा.' }
        ],
        warningSigns: [
            { en: 'Severe lower abdominal pain or heavy bleeding.', hi: 'पेट के निचले हिस्से में तेज दर्द या तेज ब्लीडिंग।', mr: 'पोटाच्या खालच्या भागात तीव्र वेदना किंवा जास्त रक्तस्त्राव.' }
        ]
    },
    12: {
        week: 12,
        trimester: 1,
        fruitIcon: '🍋',
        fruitName: { en: 'Lemon', hi: 'नींबू', mr: 'लिंबू' },
        babyDevelopment: {
            en: 'Baby reflexes develop! Tiny fingers can curl, and organs are fully formed.',
            hi: 'बच्चे के अंग पूरी तरह बन चुके हैं। नन्हीं उंगलियां मुड़ने लगी हैं।',
            mr: 'बाळाचे अवयव पूर्ण तयार झाले आहेत. चिमुकली बोटे वळू लागली आहेत.'
        },
        motherBodyChanges: {
            en: 'Morning sickness may start fading. Energy levels begin to improve.',
            hi: 'सुबह की मिचली (Morning Sickness) कम होने लगेगी। ऊर्जा में सुधार महसूस होगा।',
            mr: 'सकाळची मळमळ कमी होऊ लागेल. उत्साहात सुधारणा जाणवेल.'
        },
        recommendedFoods: [
            {
                name: { en: 'Moong Dal & Chana', hi: 'मूंग दाल और चना', mr: 'मुगाची डाळ आणि चणा' },
                icon: '🍲',
                why: { en: 'Plant protein for muscle & tissue growth.', hi: 'कोशिकाओं के विकास के लिए प्रोटीन का अच्छा स्रोत।', mr: 'पेशींच्या विकासासाठी प्रथिनांचा चांगला स्रोत.' },
                isAffordable: true
            },
            {
                name: { en: 'Seasonal Fruit (Guava/Pomegranate)', hi: 'अमरूद / अनार', mr: 'पेरू / डाळिंब' },
                icon: '🍎',
                why: { en: 'Vitamin C helps iron absorption in blood.', hi: 'विटामिन सी खून में आयरन सोखने में मदद करता है।', mr: 'व्हिटॅमिन सी रक्तातील आयर्न शोषून घेण्यास मदत करते.' },
                isAffordable: true
            }
        ],
        precautions: [
            { en: 'Drink at least 3 liters of clean water daily.', hi: 'दिन में कम से कम 3 लीटर साफ पानी पिएं।', mr: 'दिवसातून किमान ३ लिटर स्वच्छ पाणी प्या.' },
            { en: 'Avoid lifting heavy water buckets or lifting heavy weights.', hi: 'भारी बाल्टी या वजनदार वस्तुएं न उठाएं।', mr: 'जड बादली किंवा वजनदार वस्तू उचलू नका.' }
        ],
        doctorVisitsAndTests: [
            { en: 'NT Scan & First Trimester Screening ultrasound.', hi: 'एनटी स्कैन (NT Scan) और रक्त जांच करवाएं।', mr: 'एनटी स्कॅन (NT Scan) आणि रक्त तपासणी करून घ्या.' }
        ],
        vaccinations: [
            { en: 'First Dose of TT (Tetanus Toxoid) Vaccine.', hi: 'टीटी (TT) टीके की पहली खुराक लें।', mr: 'टीटी (TT) लसीचा पहिला डोस घ्या.' }
        ],
        warningSigns: [
            { en: 'High fever (>100°F) or painful urination.', hi: 'तेज बुखार या पेशाब में जलन/दर्द।', mr: 'तीव्र ताप किंवा लघवी करताना जळजळ/वेदना.' }
        ]
    },
    24: {
        week: 24,
        trimester: 2,
        fruitIcon: '🌽',
        fruitName: { en: 'Corn / Bhutta', hi: 'मक्के का भुट्टा', mr: 'मका' },
        babyDevelopment: {
            en: 'Baby hears your voice & heartbeats! Lungs are developing air sacs.',
            hi: 'बच्चा आपकी आवाज सुन सकता है! फेफड़ों में हवा की थैलियां बन रही हैं।',
            mr: 'बाळ तुमचा आवाज ऐकू शकते! फुफ्फुसांचा विकास होत आहे.'
        },
        motherBodyChanges: {
            en: 'You will feel clear baby kicks (Quickening). Growing belly may cause mild backache.',
            hi: 'पेट में बच्चे की स्पष्ट हलचल महसूस होगी। पीठ में हल्का खिंचाव हो सकता है।',
            mr: 'पोटात बाळाची हालचाल स्पष्ट जाणवेल. पाठीत हलका ताण येऊ शकतो.'
        },
        recommendedFoods: [
            {
                name: { en: 'Gur & Chana (Jaggery & Roasted Gram)', hi: 'गुड़ और भुना चना', mr: 'गुळ आणि भाजलेला चणा' },
                icon: '🥜',
                why: { en: 'Affordable, natural booster for Hemoglobin (Iron).', hi: 'हीमोग्लोबिन और आयरन बढ़ाने का प्राकृतिक देसी तरीका।', mr: 'हिमोग्लोबिन आणि आयर्न वाढवण्याचा नैसर्गिक देशी मार्ग.' },
                isAffordable: true
            },
            {
                name: { en: 'Sprouts & Roti', hi: 'अंकुरित अनाज और रोटी', mr: 'मोड आलेली कडधान्ये व भाकरी' },
                icon: '🌾',
                why: { en: 'Fiber prevents pregnancy constipation.', hi: 'फाइबर से भरपूर - कब्ज से राहत देता है।', mr: 'फायबरने समृद्ध - बद्धकोष्ठतेपासून आराम देतो.' },
                isAffordable: true
            }
        ],
        precautions: [
            { en: 'Sleep on your left side to optimize blood flow to placenta.', hi: 'बाईं करवट सोएं - बच्चे को ऑक्सीजन और खून बेहतर मिलता है।', mr: 'डाव्या कुशीवर झोपा - बाळाला ऑक्सिजन आणि रक्तपुरवठा चांगला होतो.' },
            { en: 'Take Iron & Calcium tablets at separate times.', hi: 'आयरन और कैल्शियम गोलियां अलग-अलग समय पर लें।', mr: 'आयर्न आणि कॅल्शियम गोळ्या वेगवेगळ्या वेळी घ्या.' }
        ],
        doctorVisitsAndTests: [
            { en: 'Glucose Tolerance Test (OGTT) for gestational diabetes.', hi: 'शुगर/मधुमेह जांच (OGTT टेस्ट) करवाएं।', mr: 'साखर/मधुमेह तपासणी (OGTT टेस्ट) करून घ्या.' }
        ],
        vaccinations: [
            { en: 'Second Dose of TT Vaccine / Tdap as advised.', hi: 'टीटी टीके की दूसरी खुराक लें।', mr: 'टीटी लसीचा दुसरा डोस घ्या.' }
        ],
        warningSigns: [
            { en: 'Noticeable drop in baby movements or sudden swelling in face/hands.', hi: 'बच्चे की हलचल में कमी महसूस होना या चेहरे/हाथों में अचानक सूजन।', mr: 'बाळाच्या हालचालीत घट जाणवणे किंवा चेहरा/हातावर अचानक सुज येणे.' }
        ]
    },
    36: {
        week: 36,
        trimester: 3,
        fruitIcon: '🎃',
        fruitName: { en: 'Papaya / Pumpkin', hi: 'कद्दू', mr: 'भोपळा' },
        babyDevelopment: {
            en: 'Baby gains weight rapidly and lowers into pelvis position (Lightening).',
            hi: 'बच्चे का वजन तेजी से बढ़ रहा है और सिर डिलीवरी की स्थिति में नीचे आ रहा है।',
            mr: 'बाळाचे वजन वेगाने वाढत आहे आणि डोके डिलिव्हरीच्या स्थितीत खाली येत आहे.'
        },
        motherBodyChanges: {
            en: 'Frequent urination as baby presses on bladder. Braxton Hicks (practice) contractions.',
            hi: 'मूत्राशय पर दबाव के कारण बार-बार पेशाब जाना। पेट का हल्का कसना।',
            mr: 'लघवीच्या पिशवीवर दाब आल्याने वारंवार लघवी होणे. पोटाचा हलका ताण.'
        },
        recommendedFoods: [
            {
                name: { en: 'Khichdi with Ghee', hi: 'घी के साथ मूंग दाल खिचड़ी', mr: 'तुपासोबत मूग डाळ खिचडी' },
                icon: '🍲',
                why: { en: 'Easy to digest and gives quick energy for labor.', hi: 'पचाने में आसान और डिलीवरी के लिए तुरंत ऊर्जा देता है।', mr: 'पचायला हलकी आणि डिलिव्हरीसाठी त्वरित ऊर्जा देते.' },
                isAffordable: true
            }
        ],
        precautions: [
            { en: 'Pack hospital delivery bag with medical files & clothes.', hi: 'अस्पताल डिलीवरी बैग (मेडिकल फाइल और कपड़े) तैयार रखें।', mr: 'हॉस्पिटल डिलिव्हरी बॅग (मेडिकल फाइल व कपडे) तयार ठेवा.' },
            { en: 'Keep emergency transport numbers and doctor contact handy.', hi: 'इमरजेंसी गाड़ी और डॉक्टर का नंबर लिखकर रखें।', mr: 'इमर्जन्सी गाडी आणि डॉक्टरांचा नंबर लिहून ठेवा.' }
        ],
        doctorVisitsAndTests: [
            { en: 'Weekly checkups & NST (Non-Stress Test) if advised.', hi: 'साप्ताहिक डॉक्टर जांच और बच्चे की धड़कन की निगरानी।', mr: 'साप्ताहिक डॉक्टर तपासणी आणि बाळाच्या ठोक्यांची देखरेख.' }
        ],
        vaccinations: [
            { en: 'Ensure all primary maternal vaccines are complete.', hi: 'सुनिश्चित करें कि सभी आवश्यक टीके लग चुके हैं।', mr: 'सर्व आवश्यक लसी पूर्ण झाल्याची खात्री करा.' }
        ],
        warningSigns: [
            { en: 'Water breaking (clear fluid leak), severe abdominal cramps, or bright red blood.', hi: 'पानी की थैली फटना (Water Leakage), पेट में तेज ऐंठन, या लाल रक्त।', mr: 'पाण्याची पिशवी फुटणे (Water Leakage), पोटात तीव्र गोळा येणे, किंवा लाल रक्त.' }
        ]
    }
};

export const THALI_FOODS: FoodThaliItem[] = [
    { id: 'dal', name: { en: 'Moong / Toor Dal', hi: 'दाल (मूंग / तुअर)', mr: 'डाळ (मूग / तूर)' }, icon: '🍲', category: 'protein', isHealthy: true, reason: { en: 'Essential protein for baby cells.', hi: 'बच्चे की कोशिकाओं के लिए आवश्यक प्रोटीन।', mr: 'बाळाच्या पेशींसाठी आवश्यक प्रथिने.' }, costTier: 'low' },
    { id: 'roti', name: { en: 'Wheat Roti / Bhakri', hi: 'गेहूं की रोटी / भाकरी', mr: 'गव्हाची पोळी / भाकरी' }, icon: '🫓', category: 'carbs', isHealthy: true, reason: { en: 'Provides sustained daily energy.', hi: 'दिनभर ऊर्जा देता है।', mr: 'दिवसभर ऊर्जा देते.' }, costTier: 'low' },
    { id: 'palak', name: { en: 'Palak / Green Sabzi', hi: 'पालक / हरी सब्ज़ी', mr: 'पालक / हिरवी भाजी' }, icon: '🥬', category: 'vitamins', isHealthy: true, reason: { en: 'High Folic acid & Iron for blood.', hi: 'खून और फोलिक एसिड से भरपूर।', mr: 'रक्त आणि फोलिक ॲसिडने समृद्ध.' }, costTier: 'low' },
    { id: 'dahi', name: { en: 'Dahi / Milk', hi: 'दही / दूध', mr: 'दही / दूध' }, icon: '🥛', category: 'calcium', isHealthy: true, reason: { en: 'Calcium for baby bones & teeth.', hi: 'बच्चे की हड्डियों के लिए कैल्शियम।', mr: 'बाळाच्या हाडांसाठी कॅल्शियम.' }, costTier: 'low' },
    { id: 'egg_paneer', name: { en: 'Egg / Paneer / Chana', hi: 'अंडा / पनीर / उबला चना', mr: 'अंडे / पनीर / उकडलेला चणा' }, icon: '🥚', category: 'protein', isHealthy: true, reason: { en: 'High quality protein for tissue building.', hi: 'मांसपेशियों के निर्माण के लिए प्रोटीन।', mr: 'स्नायूंच्या बांधणीसाठी प्रथिने.' }, costTier: 'low' },
    { id: 'raw_papaya', name: { en: 'Raw Unripe Papaya', hi: 'कच्चा पपीता', mr: 'कच्ची पपई' }, icon: '🥭', category: 'avoid', isHealthy: false, reason: { en: 'Latex in raw papaya can trigger uterine contractions.', hi: 'कच्चे पपीते का लेटेक्स गर्भाशय में संकुचन कर सकता है।', mr: 'कच्च्या पपईतील लॅटेक्स गर्भाशयात ताण निर्माण करू शकते.' }, costTier: 'low' },
    { id: 'junk_chai', name: { en: 'Excess Tea / Coffee (>3 cups)', hi: 'ज्यादा चाय या कॉफी', mr: 'जास्त चहा किंवा कॉफी' }, icon: '☕', category: 'avoid', isHealthy: false, reason: { en: 'High caffeine blocks iron absorption.', hi: 'ज्यादा कैफीन शरीर में आयरन सोखने में बाधा डालता है।', mr: 'जास्त कॅफिन शरीरात आयर्न शोषून घेण्यास अडथळा आणते.' }, costTier: 'low' }
];

export const MYTH_FACTS: MythFactItem[] = [
    {
        id: 'eat_for_two',
        statement: {
            en: 'A pregnant woman should eat double the food for two people.',
            hi: 'गर्भवती महिला को दो लोगों के बराबर दोगुना खाना खाना चाहिए।',
            mr: 'गरोदर स्त्रीने दोन पट जास्त अन्न खाल्ले पाहिजे.'
        },
        isMyth: true,
        explanation: {
            en: 'Myth! You only need extra quality nutrition and about 300 extra healthy calories in 2nd/3rd trimester, not double quantity.',
            hi: 'यह भ्रम है! आपको दोगुना खाना नहीं, बल्कि सही पौष्टिक खाना और दूसरी/तीसरी तिमाही में केवल 300 अतिरिक्त कैलोरी चाहिए।',
            mr: 'हा गैरसमज आहे! तुम्हाला दुप्पट अन्न नाही, तर योग्य पोषक अन्न आणि फक्त ३०० अतिरिक्त कॅलरीजची गरज असते.'
        }
    },
    {
        id: 'papaya_miscarriage',
        statement: {
            en: 'Fully ripe sweet papaya is safe in moderate quantity.',
            hi: 'पूरी तरह पका हुआ मीठा पपीता सीमित मात्रा में सुरक्षित है।',
            mr: 'पूर्ण पिकलेली गोड पपई मर्यादित प्रमाणात सुरक्षित असते.'
        },
        isMyth: false,
        explanation: {
            en: 'Fact! Only raw/unripe papaya contains harmful latex. Ripe yellow papaya has Vitamin A and C and is generally safe if recommended by doctor.',
            hi: 'सच! केवल कच्चा हरा पपीता नुकसान पहुंचाता है। पूरी तरह पका पीला पपीता विटामिन से भरपूर होता है।',
            mr: 'सत्य! फक्त कच्ची हिरवी पपई हानी पोहोचवते. पूर्ण पिकलेली पपई व्हिटॅमिनने समृद्ध असते.'
        }
    },
    {
        id: 'exercise_danger',
        statement: {
            en: 'All physical activity and walking is dangerous during pregnancy.',
            hi: 'गर्भावस्था में हर तरह का चलना या व्यायाम खतरनाक होता है।',
            mr: 'गरोदरपणात चालणे किंवा व्यायाम करणे धोकादायक असते.'
        },
        isMyth: true,
        explanation: {
            en: 'Myth! 30 minutes of gentle walking daily improves blood circulation and aids normal delivery unless advised bed rest by your doctor.',
            hi: 'यह भ्रम है! डॉक्टर द्वारा मना न करने पर रोज 30 मिनट हल्की सैर नॉर्मल डिलीवरी में मदद करती है।',
            mr: 'हा गैरसमज आहे! डॉक्टरांनी मनाई केली नसल्यास रोज ३० मिनिटे चालणे नॉर्मल डिलिव्हरीसाठी फायदेशीर असते.'
        }
    }
];

export const TRAFFIC_LIGHT_ITEMS: TrafficLightItem[] = [
    {
        id: 'daily_walk',
        icon: '🚶‍♀️',
        title: { en: '30 Mins Daily Walk', hi: 'रोज 30 मिनट हल्की सैर', mr: 'रोज ३० मिनिटे चालणे' },
        status: 'green',
        explanation: { en: 'Generally safe and recommended for blood circulation.', hi: 'सुरक्षित और स्वास्थ्यप्रद।', mr: 'सुरक्षित आणि आरोग्यासाठी फायदेशीर.' }
    },
    {
        id: 'herbal_decoction',
        icon: '🍵',
        title: { en: 'Unprescribed Herbal Decoctions (Kadha)', hi: 'बिना डॉक्टर सलाह का काढ़ा', mr: 'डॉक्टरांच्या सल्ल्याशिवाय काढा' },
        status: 'yellow',
        explanation: { en: 'Ask your doctor! Strong herbs can generate body heat.', hi: 'डॉक्टर से पूछें! कुछ जड़ी-बूटियां गर्म प्रकृति की हो सकती हैं।', mr: 'डॉक्टरांना विचारा! काही वनस्पती उष्ण असू शकतात.' }
    },
    {
        id: 'heavy_buckets',
        icon: '🏋️‍♀️',
        title: { en: 'Lifting Heavy Buckets / Furniture', hi: 'भारी बाल्टी या सामान उठाना', mr: 'जड बादली किंवा सामान उचलणे' },
        status: 'red',
        explanation: { en: 'Avoid! Puts severe strain on uterus and lower back.', hi: 'बचें! पेट और गर्भाशय पर अत्यधिक दबाव डालता है।', mr: 'टाळा! पोटावर आणि गर्भाशयावर ताण येतो.' }
    }
];

export const HOSPITAL_BAG_ITEMS: HospitalBagItem[] = [
    { id: 'medical_files', icon: '📁', name: { en: 'Aadhaar & Medical Reports File', hi: 'आधार कार्ड और मेडिकल जांच फाइल', mr: 'आधार कार्ड व मेडिकल फाइल्स' }, category: 'documents', isEssential: true },
    { id: 'maternity_gowns', icon: '👗', name: { en: 'Loose Maternity Gowns & Clothes', hi: 'ढीले सूती कपड़े और गाउन', mr: 'सैल सुती कपडे व गाऊन' }, category: 'mother', isEssential: true },
    { id: 'baby_clothes', icon: '👶', name: { en: 'Soft Baby Clothes & Blankets', hi: 'नरम बच्चे के कपड़े और लंगोट', mr: 'मऊ बाळाचे कपडे व लंगोट' }, category: 'baby', isEssential: true },
    { id: 'sanitary_pads', icon: '🩺', name: { en: 'Maternity Pads & Towel', hi: 'मैटर्निटी पैड और तौलिया', mr: 'मॅटर्निटी पॅड व टॉवेल' }, category: 'mother', isEssential: true },
    { id: 'baby_wipes', icon: '🧻', name: { en: 'Soft Baby Wipes & Oil', hi: 'बेबी वाइप्स और नारियल तेल', mr: 'बेबी वाइप्स व खोबरेल तेल' }, category: 'baby', isEssential: true },
    { id: 'fancy_jewelry', icon: '💍', name: { en: 'Gold Jewelry & Heavy Items', hi: 'सोने के गहने और कीमती सामान', mr: 'सोन्याचे दागिने व मौल्यवान वस्तू' }, category: 'mother', isEssential: false }
];
