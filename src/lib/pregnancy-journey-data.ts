import { WeeklyStageContent, FoodThaliItem, MythFactItem, HospitalBagItem, Badge, PrePregnancySymptom, NewbornCareMilestone, BreastfeedingSupportItem, TrafficLightItem } from '@/types/pregnancy-journey';

export const PRE_PREGNANCY_SYMPTOMS: PrePregnancySymptom[] = [
    { id: 'nausea', title: { en: 'Feeling Nauseous?', hi: 'सुबह उल्टी या मिचली?', mr: 'सकाळी मळमळणे?' }, icon: '🤢', isSelected: false },
    { id: 'fatigue', title: { en: 'Unusually Tired?', hi: 'असामान्य थकावट?', mr: 'असाधारण थकवा?' }, icon: '😴', isSelected: false },
    { id: 'missed_period', title: { en: 'Missed Period?', hi: 'माहवारी में देरी?', mr: 'पाळी चुकली आहे का?' }, icon: '📅', isSelected: false },
    { id: 'breast_tenderness', title: { en: 'Breast Tenderness?', hi: 'स्तनों में भारीपन या दर्द?', mr: 'स्तनांमध्ये जडपणा किंवा वेदना?' }, icon: '💗', isSelected: false },
    { id: 'urination', title: { en: 'Frequent Urination?', hi: 'बार-बार पेशाब जाना?', mr: 'वारंवार लघवी होणे?' }, icon: '🚽', isSelected: false }
];

export const BADGES: Badge[] = [
    {
        id: 'first_step',
        icon: '🌱',
        title: { en: 'First Step Taken', hi: 'पहला कदम', mr: 'पहिले पाऊल' },
        description: { en: 'Took the first step to confirm pregnancy!', hi: 'गर्भावस्था की पुष्टि के लिए पहला कदम उठाया!', mr: 'गरोदरपणाची खात्री करण्यासाठी पहिले पाऊल उचलले!' }
    },
    {
        id: 'nutrition_explorer',
        icon: '🥗',
        title: { en: 'Nutrition Explorer', hi: 'पोषण खोजकर्ता', mr: 'पोषण शोधक' },
        description: { en: 'Built a balanced Indian pregnancy thali!', hi: 'पौष्टिक थाली तैयार की!', mr: 'पोषक थाळी तयार केली!' }
    },
    {
        id: 'myth_buster',
        icon: '💥',
        title: { en: 'Pregnancy Myth Buster', hi: 'भ्रम निवारक', mr: 'गैरसमज दूर करणारा' },
        description: { en: 'Defeated pregnancy myths with facts!', hi: 'गर्भावस्था के भ्रम दूर किए!', mr: 'गरोदरपणातील गैरसमज दूर केले!' }
    },
    {
        id: 'prepared_parent',
        icon: '🎒',
        title: { en: 'Prepared Parent', hi: 'तैयार माता-पिता', mr: 'तयार पालक' },
        description: { en: 'Packed delivery hospital bag!', hi: 'अस्पताल डिलीवरी बैग तैयार किया!', mr: 'हॉस्पिटल डिलिव्हरी बॅग तयार केली!' }
    },
    {
        id: 'hello_baby',
        icon: '👶',
        title: { en: 'Hello Baby Champion', hi: 'शिशु का स्वागत', mr: 'बाळाचे स्वागत' },
        description: { en: 'Reached the beautiful birth milestone!', hi: 'जन्म के ऐतिहासिक पड़ाव पर पहुंचे!', mr: 'जन्माच्या ऐतिहासिक टप्प्यावर पोहोचले!' }
    },
    {
        id: 'nourishment_hero',
        icon: '🍼',
        title: { en: 'First Nourishment Hero', hi: 'अमृत पोषण रक्षक', mr: 'पहिले पोषण रक्षक' },
        description: { en: 'Learned newborn feeding & breastfeeding care!', hi: 'शिशु के पहले दूध और पोषण के बारे में जाना!', mr: 'बाळाच्या पहिल्या दुधाबद्दल माहिती घेतली!' }
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

export const SAMPLE_WEEKLY_STAGES: Record<number, WeeklyStageContent> = {
    4: {
        week: 4,
        trimester: 1,
        fruitIcon: '🌾',
        fruitName: { en: 'Poppy Seed (Rava)', hi: 'खसखस या रवा', mr: 'खसखस किंवा रवा' },
        babyDevelopment: {
            en: 'The fertilized egg implants safely into your uterus. Cells begin forming the protective placenta.',
            hi: 'निषेचित अंडा आपके गर्भाशय में स्थापित हो रहा है। नाल (Placenta) बनने लगी है।',
            mr: 'फलित अंडे तुमच्या गर्भाशयात रोपित होत आहे. नाळ तयार होऊ लागली आहे.'
        },
        motherBodyChanges: {
            en: 'You may notice light spotting, slight breast tenderness, or fatigue.',
            hi: 'हल्का धब्बा (Spotting), स्तनों में कोमलता या थोड़ी थकावट हो सकती है।',
            mr: 'हलका डाग, स्तनांमध्ये मऊपणा किंवा थोडा थकवा जाणवू शकतो.'
        },
        interactiveQuiz: {
            question: { en: 'Can your baby hear sounds outside yet at Week 4?', hi: 'क्या हफ्ता 4 में बच्चा बाहर की आवाजें सुन सकता है?', mr: 'आठवडा ४ मध्ये बाळ बाहेरचे आवाज ऐकू शकते का?' },
            options: [
                { id: 'no', label: { en: 'No, ears are not formed yet', hi: 'नहीं, अभी कान नहीं बने हैं', mr: 'नाही, अजून कान तयार झाले नाहीत' }, isCorrect: true },
                { id: 'yes', label: { en: 'Yes, baby hears clearly', hi: 'हाँ, बच्चा साफ सुनता है', mr: 'होय, बाळ ऐकू शकते' }, isCorrect: false }
            ],
            explanation: { en: 'At Week 4, ears & hearing nerves develop much later around Week 18.', hi: 'हफ्ता 4 में कान और सुनने की तंत्रिकाएं अभी नहीं बनी हैं। हफ्ता 18 के आसपास सुनना शुरू होता है।', mr: 'आठवडा ४ मध्ये कान अजून तयार झालेले नसतात. १८व्या आठवड्यापासून ऐकू येते.' }
        },
        recommendedFoodsVeg: [
            { name: { en: 'Palak (Spinach)', hi: 'पालक सब्ज़ी', mr: 'पालक भाजी' }, icon: '🥬', why: { en: 'High Folic acid for brain development.', hi: 'फोलिक एसिड से भरपूर - बच्चे के दिमाग के लिए।', mr: 'फोलिक ॲसिडने समृद्ध.' } },
            { name: { en: 'Dahi / Milk', hi: 'दही या दूध', mr: 'दही किंवा दूध' }, icon: '🥛', why: { en: 'Calcium for bone foundation.', hi: 'हड्डियों के लिए कैल्शियम।', mr: 'हाडांसाठी कॅल्शियम.' } }
        ],
        recommendedFoodsNonVeg: [
            { name: { en: 'Boiled Egg', hi: 'उबला अंडा', mr: 'उकडलेले अंडे' }, icon: '🥚', why: { en: 'Rich in Protein & Choline for cell growth.', hi: 'कोशिकाओं के विकास के लिए प्रोटीन और कोलीन।', mr: 'पेशींच्या विकासासाठी प्रथिने.' } }
        ],
        precautions: [
            { en: 'Avoid smoking, alcohol, and unprescribed medicines.', hi: 'धूम्रपान, शराब और बिना सलाह दवाइयों से बचें।', mr: 'धूम्रपान, मद्यपान आणि डॉक्टरांच्या सल्ल्याशिवाय औषधे टाळा.' }
        ],
        doctorVisitsAndTests: [
            { en: 'Confirm pregnancy test with your gynaecologist.', hi: 'डॉक्टर से मिलकर प्रेगनेंसी टेस्ट की पुष्टि कराएं।', mr: 'डॉक्टरांना भेटून चाचणीची खात्री करा.' }
        ],
        warningSigns: [
            { en: 'Severe lower abdominal pain or heavy bleeding.', hi: 'पेट के निचले हिस्से में तेज दर्द या तेज ब्लीडिंग।', mr: 'पोटाच्या खालच्या भागात तीव्र वेदना किंवा जास्त रक्तस्त्राव.' }
        ]
    },
    6: {
        week: 6,
        trimester: 1,
        fruitIcon: '🫘',
        fruitName: { en: 'Chickpea (Chana)', hi: 'चना', mr: 'चणा' },
        babyDevelopment: {
            en: 'Baby’s heart begins beating at around 100-160 beats per minute! Tiny arm buds appear.',
            hi: 'बच्चे का नन्हा दिल धड़कना शुरू हो चुका है! नन्हें हाथ-पैर के अंकुर बन रहे हैं।',
            mr: 'बाळाचे छोटे हृदय धडधडू लागले आहे! चिमुकल्या हातांचे अंकुर तयार होत आहेत.'
        },
        motherBodyChanges: {
            en: 'Morning sickness (nausea) and sensitivity to smells may peak.',
            hi: 'सुबह की मिचली (Morning Sickness) और गंध के प्रति संवेदनशीलता बढ़ सकती है।',
            mr: 'सकाळची मळमळ आणि वासाची संवेदनशीलता वाढू शकते.'
        },
        interactiveQuiz: {
            question: { en: 'Is morning sickness limited only to the morning time?', hi: 'क्या मॉर्निंग सिकनेस केवल सुबह ही होती है?', mr: 'सकाळची मळमळ फक्त सकाळीच होते का?' },
            options: [
                { id: 'no', label: { en: 'No, it can happen anytime of day', hi: 'नहीं, यह दिन में किसी भी समय हो सकती है', mr: 'नाही, ती दिवसा कोणत्याही वेळी होऊ शकते' }, isCorrect: true },
                { id: 'yes', label: { en: 'Yes, only in morning', hi: 'हाँ, केवल सुबह', mr: 'होय, फक्त सकाळी' }, isCorrect: false }
            ],
            explanation: { en: 'Nausea can happen at any time due to pregnancy hormones. Small dry snacks help!', hi: 'हार्मोन के कारण मिचली दिन में कभी भी हो सकती है। सूखे टोस्ट या बिस्किट खाएं।', mr: 'हॉर्मोन्समुळे मळमळ कधीही होऊ शकते. सुका नाश्ता घ्या.' }
        },
        recommendedFoodsVeg: [
            { name: { en: 'Moong Dal Khichdi', hi: 'मूंग दाल खिचड़ी', mr: 'मुगाची डाळ खिचडी' }, icon: '🍲', why: { en: 'Gentle on stomach and easy to digest.', hi: 'पेट के लिए हल्की और पचाने में आसान।', mr: 'पोटासाठी हलकी व पचायला सोपी.' } }
        ],
        recommendedFoodsNonVeg: [
            { name: { en: 'Steamed Fish (Low Mercury)', hi: 'उबली / ग्रिल्ड मछली', mr: 'उकडलेला मासा' }, icon: '🐟', why: { en: 'Omega-3 fatty acids for brain.', hi: 'दिमाग के लिए ओमेगा-3 फैटी एसिड।', mr: 'मेंदूसाठी ओमेगा-३ फॅटी ॲसिड.' } }
        ],
        precautions: [
            { en: 'Eat small, frequent meals rather than large heavy meals.', hi: 'एक बार में ज्यादा खाने की जगह थोड़ा-थोड़ा खाएं।', mr: 'एकाच वेळी जास्त खाण्याऐवजी थोडे-थोडे खा.' }
        ],
        doctorVisitsAndTests: [
            { en: 'First Antenatal Visit & Viability Ultrasound Scan.', hi: 'पहली डॉक्टर जांच और अल्ट्रासाउंड स्कैन।', mr: 'पहिली डॉक्टर तपासणी आणि अल्ट्रासाऊंड स्कॅन.' }
        ],
        warningSigns: [
            { en: 'Persistent vomiting unable to keep water down.', hi: 'लगातार उल्टी होना और पानी भी न रुकना।', mr: 'सतत उलट्या होणे आणि पाणीही न पचणे.' }
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
            en: 'Morning sickness starts fading. Your energy levels begin to improve.',
            hi: 'सुबह की मिचली कम होने लगेगी। शरीर में ताजगी महसूस होगी।',
            mr: 'सकाळची मळमळ कमी होऊ लागेल. शरीरात उत्साह जाणवेल.'
        },
        interactiveQuiz: {
            question: { en: 'Can your baby move their fingers and toes at Week 12?', hi: 'क्या हफ्ता 12 में बच्चा उंगलियां हिला सकता है?', mr: 'आठवडा १२ मध्ये बाळ बोटे हलवू शकते का?' },
            options: [
                { id: 'yes', label: { en: 'Yes, baby reflexes are active!', hi: 'हाँ, बच्चे की उंगलियां मुड़ती हैं!', mr: 'होय, बाळाची बोटे वळतात!' }, isCorrect: true },
                { id: 'no', label: { en: 'No, not yet', hi: 'नहीं, अभी नहीं', mr: 'नाही, अजून नाही' }, isCorrect: false }
            ],
            explanation: { en: 'Yes! Reflexes are active, though you will feel movements later around Week 18.', hi: 'हाँ! बच्चा उंगलियां हिलाता है, लेकिन आपको हलचल हफ्ता 18 के आसपास महसूस होगी।', mr: 'होय! बाळ बोटे हलवते, पण हालचाल १८व्या आठवड्यात जाणवेल.' }
        },
        recommendedFoodsVeg: [
            { name: { en: 'Paneer / Sprouts', hi: 'पनीर या अंकुरित चना', mr: 'पनीर किंवा मोड आलेला चणा' }, icon: '🧀', why: { en: 'High Protein for tissue growth.', hi: 'मांसपेशियों के लिए प्रोटीन।', mr: 'स्नायूंच्या वाढीसाठी प्रथिने.' } }
        ],
        recommendedFoodsNonVeg: [
            { name: { en: 'Chicken Soup / Eggs', hi: 'चिकन सूप या अंडा', mr: 'चिकन सूप किंवा अंडे' }, icon: '🍗', why: { en: 'Rich in Iron & Protein.', hi: 'आयरन और प्रोटीन से भरपूर।', mr: 'आयर्न आणि प्रथिनांनी समृद्ध.' } }
        ],
        precautions: [
            { en: 'Drink 3 Liters of water daily.', hi: 'दिन में 3 लीटर पानी पिएं।', mr: 'दिवसातून ३ लिटर पाणी प्या.' }
        ],
        doctorVisitsAndTests: [
            { en: 'NT Scan & First Trimester Blood Tests.', hi: 'एनटी स्कैन (NT Scan) करवाएं।', mr: 'एनटी स्कॅन करून घ्या.' }
        ],
        warningSigns: [
            { en: 'High fever (>100°F) or severe cramping.', hi: 'तेज बुखार या पेट में ऐंठन।', mr: 'तीव्र ताप किंवा पोटात गोळा येणे.' }
        ]
    },
    24: {
        week: 24,
        trimester: 2,
        fruitIcon: '🌽',
        fruitName: { en: 'Corn (Bhutta)', hi: 'मक्के का भुट्टा', mr: 'मका' },
        babyDevelopment: {
            en: 'Baby hears your voice & heartbeats clearly! Lungs are forming air sacs.',
            hi: 'बच्चा आपकी आवाज सुन सकता है! फेफड़ों में हवा की थैलियां बन रही हैं।',
            mr: 'बाळ तुमचा आवाज ऐकू शकते! फुफ्फुसांचा विकास होत आहे.'
        },
        motherBodyChanges: {
            en: 'You will feel clear baby kicks (Quickening). Growing belly may cause mild backache.',
            hi: 'पेट में बच्चे की लात/हलचल स्पष्ट महसूस होगी। पीठ में हल्का खिंचाव हो सकता है।',
            mr: 'पोटात बाळाची हालचाल स्पष्ट जाणवेल. पाठीत हलका ताण येऊ शकतो.'
        },
        interactiveQuiz: {
            question: { en: 'Can your baby hear your voice at Week 24?', hi: 'क्या हफ्ता 24 में बच्चा आपकी आवाज सुन सकता है?', mr: 'आठवडा २४ मध्ये बाळ तुमचा आवाज ऐकू शकते का?' },
            options: [
                { id: 'yes', label: { en: 'Yes, baby hears & responds to voice!', hi: 'हाँ, बच्चा आवाज सुनता है!', mr: 'होय, बाळ आवाज ऐकू शकते!' }, isCorrect: true },
                { id: 'no', label: { en: 'No, inside uterus is silent', hi: 'नहीं, अंदर सन्नाटा होता है', mr: 'नाही, आत शांतता असते' }, isCorrect: false }
            ],
            explanation: { en: 'Yes! Talk, sing, and read to your baby. Your voice soothes your baby!', hi: 'हाँ! बच्चे से बातें करें या लोरी गाएं। आपकी आवाज बच्चे को शांत करती है।', mr: 'होय! बाळाशी बोला किंवा गाणी म्हणा. तुमचा आवाज बाळाला शांत करतो.' }
        },
        recommendedFoodsVeg: [
            { name: { en: 'Gur & Chana (Jaggery & Roasted Gram)', hi: 'गुड़ और भुना चना', mr: 'गुळ आणि भाजलेला चणा' }, icon: '🥜', why: { en: 'Natural Hemoglobin & Iron booster.', hi: 'हीमोग्लोबिन और आयरन बढ़ाने का देसी तरीका।', mr: 'हिमोग्लोबिन आणि आयर्न वाढवण्याचा देशी मार्ग.' } }
        ],
        recommendedFoodsNonVeg: [
            { name: { en: 'Chicken / Mutton Liver (Controlled)', hi: 'चिकन / मटन लीवर', mr: 'चिकन / मटण लिव्हर' }, icon: '🥩', why: { en: 'Concentrated source of Iron & B12.', hi: 'आयरन और बी12 का समृद्ध स्रोत।', mr: 'आयर्न आणि बी१२ चा समृद्ध स्रोत.' } }
        ],
        precautions: [
            { en: 'Sleep on your left side to maximize blood flow to baby.', hi: 'बाईं करवट सोएं - बच्चे को ऑक्सीजन और खून बेहतर मिलता है।', mr: 'डाव्या कुशीवर झोपा - बाळाला ऑक्सिजन चांगला मिळतो.' }
        ],
        doctorVisitsAndTests: [
            { en: 'Glucose Tolerance Test (OGTT) for gestational diabetes.', hi: 'शुगर/मधुमेह जांच (OGTT टेस्ट) करवाएं।', mr: 'साखर/मधुमेह तपासणी करून घ्या.' }
        ],
        warningSigns: [
            { en: 'Noticeable drop in baby movements or sudden facial swelling.', hi: 'बच्चे की हलचल में कमी होना या चेहरे पर अचानक सूजन।', mr: 'बाळाच्या हालचालीत घट जाणवणे किंवा चेहऱ्यावर सुज येणे.' }
        ]
    },
    36: {
        week: 36,
        trimester: 3,
        fruitIcon: '🎃',
        fruitName: { en: 'Pumpkin / Papaya', hi: 'कद्दू', mr: 'भोपळा' },
        babyDevelopment: {
            en: 'Baby gains weight rapidly and lowers head into pelvis (Lightening).',
            hi: 'बच्चे का सिर डिलीवरी की स्थिति में नीचे आ रहा है।',
            mr: 'बाळाचे डोके डिलिव्हरीच्या स्थितीत खाली येत आहे.'
        },
        motherBodyChanges: {
            en: 'Frequent urination as baby presses on bladder. Practice Braxton Hicks contractions.',
            hi: 'बार-बार पेशाब जाना और पेट का हल्का कसना।',
            mr: 'वारंवार लघवी होणे आणि पोटाचा हलका ताण.'
        },
        interactiveQuiz: {
            question: { en: 'Is it time to keep your hospital delivery bag ready at Week 36?', hi: 'क्या हफ्ता 36 में अस्पताल बैग तैयार रखना चाहिए?', mr: 'आठवडा ३६ मध्ये हॉस्पिटल बॅग तयार ठेवावी का?' },
            options: [
                { id: 'yes', label: { en: 'Yes, pack files & baby clothes now!', hi: 'हाँ, फाइल और कपड़े पैक रखें!', mr: 'होय, फाइल्स व कपडे पॅक ठेवा!' }, isCorrect: true },
                { id: 'no', label: { en: 'No, wait till labor pain starts', hi: 'नहीं, दर्द का इंतजार करें', mr: 'नाही, वेदनांची वाट पाहा' }, isCorrect: false }
            ],
            explanation: { en: 'Yes! Keep your bag ready near the door so you are stress-free when labor begins.', hi: 'हाँ! मेडिकल फाइल और कपड़ों का बैग तैयार रखें ताकि वक्त पर घबराहट न हो।', mr: 'होय! मेडिकल फाइल्स व कपड्यांची बॅग तयार ठेवा.' }
        },
        recommendedFoodsVeg: [
            { name: { en: 'Khichdi with Desi Ghee', hi: 'घी के साथ मूंग दाल खिचड़ी', mr: 'तुपासोबत मूग डाळ खिचडी' }, icon: '🍲', why: { en: 'Provides quick digestible energy for labor.', hi: 'पचाने में आसान और डिलीवरी के लिए तुरंत ऊर्जा देता है।', mr: 'पचायला हलकी आणि डिलिव्हरीसाठी ऊर्जा देते.' } }
        ],
        recommendedFoodsNonVeg: [
            { name: { en: 'Egg Bhurji / Chicken Broth', hi: 'अंडा भुर्जी या चिकन सूप', mr: 'अंडे भुरजी किंवा चिकन सूप' }, icon: '🍳', why: { en: 'High stamina & protein builder.', hi: 'स्टैमिना और प्रोटीन बढ़ाता है।', mr: 'स्टॅमिना आणि प्रथिने वाढवते.' } }
        ],
        precautions: [
            { en: 'Keep emergency transport and doctor contact number ready.', hi: 'इमरजेंसी गाड़ी और डॉक्टर का नंबर लिखकर रखें।', mr: 'इमर्जन्सी गाडी व डॉक्टरांचा नंबर लिहून ठेवा.' }
        ],
        doctorVisitsAndTests: [
            { en: 'Weekly doctor visits & NST heartbeat monitoring.', hi: 'साप्ताहिक डॉक्टर जांच और बच्चे की धड़कन जांच।', mr: 'साप्ताहिक डॉक्टर तपासणी व बाळाच्या ठोक्यांची देखरेख.' }
        ],
        warningSigns: [
            { en: 'Water breaking (clear fluid leak), severe abdominal cramps, or bright red blood.', hi: 'पानी की थैली फटना (Water Leakage), पेट में तेज ऐंठन, या लाल रक्त।', mr: 'पाण्याची पिशवी फुटणे (Water Leakage), पोटात तीव्र गोळा येणे.' }
        ]
    }
};

export const THALI_FOODS: FoodThaliItem[] = [
    { id: 'dal', name: { en: 'Moong / Toor Dal', hi: 'दाल (मूंग / तुअर)', mr: 'डाळ (मूग / तूर)' }, icon: '🍲', category: 'protein', isHealthy: true, isVegetarian: true, reason: { en: 'Essential protein for baby cells.', hi: 'बच्चे की कोशिकाओं के लिए आवश्यक प्रोटीन।', mr: 'बाळाच्या पेशींसाठी आवश्यक प्रथिने.' } },
    { id: 'roti', name: { en: 'Wheat Roti / Bhakri', hi: 'गेहूं की रोटी / भाकरी', mr: 'गव्हाची पोळी / भाकरी' }, icon: '🫓', category: 'carbs', isHealthy: true, isVegetarian: true, reason: { en: 'Provides sustained daily energy.', hi: 'दिनभर ऊर्जा देता है।', mr: 'दिवसभर ऊर्जा देते.' } },
    { id: 'palak', name: { en: 'Palak / Green Sabzi', hi: 'पालक / हरी सब्ज़ी', mr: 'पालक / हिरवी भाजी' }, icon: '🥬', category: 'vitamins', isHealthy: true, isVegetarian: true, reason: { en: 'High Folic acid & Iron for blood.', hi: 'खून और फोलिक एसिड से भरपूर।', mr: 'रक्त आणि फोलिक ॲसिडने समृद्ध.' } },
    { id: 'dahi', name: { en: 'Dahi / Milk', hi: 'दही / दूध', mr: 'दही / दूध' }, icon: '🥛', category: 'calcium', isHealthy: true, isVegetarian: true, reason: { en: 'Calcium for baby bones & teeth.', hi: 'बच्चे की हड्डियों के लिए कैल्शियम।', mr: 'बाळाच्या हाडांसाठी कॅल्शियम.' } },
    { id: 'paneer_chana', name: { en: 'Paneer / Chana / Rajma', hi: 'पनीर / उबला चना / राजमा', mr: 'पनीर / चणा / राजमा' }, icon: '🧀', category: 'protein', isHealthy: true, isVegetarian: true, reason: { en: 'High quality vegetarian protein.', hi: 'शाकाहारी प्रोटीन का बेहतरीन स्रोत।', mr: 'शाकाहारी प्रथिनांचा उत्तम स्रोत.' } },
    { id: 'egg', name: { en: 'Boiled Egg', hi: 'उबला अंडा', mr: 'उकडलेले अंडे' }, icon: '🥚', category: 'protein', isHealthy: true, isVegetarian: false, reason: { en: 'Complete protein & choline for brain.', hi: 'दिमाग के विकास के लिए कोलीन और प्रोटीन।', mr: 'मेंदूच्या विकासासाठी कोलीन आणि प्रथिने.' } },
    { id: 'chicken', name: { en: 'Grilled Chicken / Soup', hi: 'चिकन सूप / ग्रिल्ड चिकन', mr: 'चिकन सूप / ग्रिल्ड चिकन' }, icon: '🍗', category: 'protein', isHealthy: true, isVegetarian: false, reason: { en: 'Lean protein & iron builder.', hi: 'मांसपेशियों के लिए लीन प्रोटीन और आयरन।', mr: 'स्नायूसाठी प्रथिने आणि आयर्न.' } },
    { id: 'fish', name: { en: 'Low Mercury Fish', hi: 'सुरमई / रोहू मछली', mr: 'सुरमई / रोहू मासा' }, icon: '🐟', category: 'vitamins', isHealthy: true, isVegetarian: false, reason: { en: 'Omega-3 fatty acids for baby eyes.', hi: 'बच्चे की आंखों के लिए ओमेगा-3 फैटी एसिड।', mr: 'बाळाच्या डोळ्यांसाठी ओमेगा-३.' } },
    { id: 'raw_papaya', name: { en: 'Raw Unripe Papaya', hi: 'कच्चा पपीता', mr: 'कच्ची पपई' }, icon: '🥭', category: 'avoid', isHealthy: false, isVegetarian: true, reason: { en: 'Latex in raw papaya can trigger uterine contractions.', hi: 'कच्चे पपीते का लेटेक्स गर्भाशय में संकुचन कर सकता है।', mr: 'कच्च्या पपईतील लॅटेक्स गर्भाशयात ताण निर्माण करू शकते.' } },
    { id: 'junk_chai', name: { en: 'Excess Tea / Coffee (>3 cups)', hi: 'ज्यादा चाय या कॉफी', mr: 'जास्त चहा किंवा कॉफी' }, icon: '☕', category: 'avoid', isHealthy: false, isVegetarian: true, reason: { en: 'High caffeine blocks iron absorption.', hi: 'ज्यादा कैफीन शरीर में आयरन सोखने में बाधा डालता है।', mr: 'जास्त कॅफिन शरीरात आयर्न शोषून घेण्यास अडथळा आणते.' } }
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
            hi: 'यह भ्रम है! आपको दोगुना खाना नहीं, बल्कि सही पौष्टिक खाना और केवल 300 अतिरिक्त कैलोरी चाहिए।',
            mr: 'हा गैरसमज आहे! तुम्हाला दुप्पट अन्न नाही, तर फक्त ३०० अतिरिक्त कॅलरीजची गरज असते.'
        }
    },
    {
        id: 'papaya_miscarriage',
        statement: {
            en: 'Fully ripe sweet yellow papaya is safe in moderate quantity.',
            hi: 'पूरी तरह पका हुआ मीठा पीला पपीता सीमित मात्रा में सुरक्षित है।',
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

export const HOSPITAL_BAG_ITEMS: HospitalBagItem[] = [
    { id: 'medical_files', icon: '📁', name: { en: 'Aadhaar & Medical Reports File', hi: 'आधार कार्ड और मेडिकल जांच फाइल', mr: 'आधार कार्ड व मेडिकल फाइल्स' }, category: 'documents', isEssential: true },
    { id: 'maternity_gowns', icon: '👗', name: { en: 'Loose Maternity Gowns & Clothes', hi: 'ढीले सूती कपड़े और गाउन', mr: 'सैल सुती कपडे व गाऊन' }, category: 'mother', isEssential: true },
    { id: 'baby_clothes', icon: '👶', name: { en: 'Soft Baby Clothes & Blankets', hi: 'नरम बच्चे के कपड़े और लंगोट', mr: 'मऊ बाळाचे कपडे व लंगोट' }, category: 'baby', isEssential: true },
    { id: 'sanitary_pads', icon: '🩺', name: { en: 'Maternity Pads & Towel', hi: 'मैटर्निटी पैड और तौलिया', mr: 'मॅटर्निटी पॅड व टॉवेल' }, category: 'mother', isEssential: true },
    { id: 'baby_wipes', icon: '🧻', name: { en: 'Soft Baby Wipes & Oil', hi: 'बेबी वाइप्स और नारियल तेल', mr: 'बेबी वाइप्स व खोबरेल तेल' }, category: 'baby', isEssential: true },
    { id: 'fancy_jewelry', icon: '💍', name: { en: 'Gold Jewelry & Heavy Items', hi: 'सोने के गहने और कीमती सामान', mr: 'सोन्याचे दागिने व मौल्यवान वस्तू' }, category: 'mother', isEssential: false }
];

export const NEWBORN_MILESTONES: NewbornCareMilestone[] = [
    {
        id: 'day_1_7',
        dayRange: { en: 'Days 1 – 7', hi: 'दिन 1 - 7', mr: 'दिवस १ - ७' },
        title: { en: 'First Week Wonders & Umbilical Cord Care', hi: 'पहला हफ्ता और नाभि की देखभाल', mr: 'पहिला आठवडा आणि नाळेची काळजी' },
        icon: '👶',
        careTips: [
            { en: 'Keep the umbilical cord stump clean & dry. Do not apply oil or turmeric unless prescribed.', hi: 'बच्चे की नाभि को सूखा और साफ रखें। तेल या हल्दी न लगाएं।', mr: 'नाळ कोरडी व स्वच्छ ठेवा. तेल किंवा हळद लावू नका.' },
            { en: 'Skin-to-skin contact with mother helps regulate baby body temperature.', hi: 'मां की छाती से सटाकर रखने से बच्चे का तापमान सही रहता है।', mr: 'आईच्या छातीशी स्पर्श ठेवल्याने बाळाचे तापमान नियंत्रित राहते.' }
        ]
    },
    {
        id: 'day_8_30',
        dayRange: { en: 'Days 8 – 30', hi: 'दिन 8 - 30', mr: 'दिवस ८ - ३०' },
        title: { en: 'Jaundice Awareness & Sleep Patterns', hi: 'पीलिया (Jaundice) की पहचान और नींद', mr: 'काविळ ओळखणे आणि झोप' },
        icon: '🌙',
        careTips: [
            { en: 'Newborns sleep 16-18 hours daily in short stretches.', hi: 'नवजात शिशु दिन में 16-18 घंटे सोते हैं।', mr: 'नवजात बाळ दिवसातून १६-१८ तास झोपते.' },
            { en: 'Watch for yellow tint in baby eyes or skin. Consult doctor if baby appears unusually lethargic.', hi: 'आंखों या त्वचा में पीलापन दिखे तो डॉक्टर को दिखाएं।', mr: 'डोळे किंवा त्वचेवर पिवळेपणा दिसल्यास डॉक्टरांचा सल्ला घ्या.' }
        ]
    }
];

export const BREASTFEEDING_ITEMS: BreastfeedingSupportItem[] = [
    {
        id: 'colostrum',
        icon: '🥛',
        situation: { en: 'Thick yellow first milk (Colostrum) comes after birth.', hi: 'जन्म के तुरंत बाद गाढ़ा पीला पहला दूध (खीस) आता है।', mr: 'जन्मानंतर लगेचच येणारे चिकाचे दूध (Colostrum).' },
        type: 'observe',
        recommendedAction: { en: 'Give this liquid gold to baby! It contains powerful antibodies.', hi: 'यह पहला पीला दूध बच्चे के लिए पहला प्राकृतिक टीका है - इसे जरूर पिलाएं!', mr: 'हे पहिले दूध बाळासाठी नैसर्गिक लस आहे - नक्की द्या!' }
    },
    {
        id: 'latch_pain',
        icon: '😣',
        situation: { en: 'Experiencing severe nipple pain or cracks during feeding.', hi: 'दूध पिलाते समय निप्पल में बहुत तेज दर्द या दरार?', mr: 'दूध पाजताना तीव्र वेदना किंवा भेगा?' },
        type: 'doctor',
        recommendedAction: { en: 'Consult a lactation nurse or doctor to adjust baby latching position.', hi: 'दूध पिलाने की सही पोजीशन (Latch) के लिए डॉक्टर की मदद लें।', mr: 'दूध पाजण्याच्या योग्य पद्धतीसाठी डॉक्टरांचे मार्गदर्शन घ्या.' }
    }
];
