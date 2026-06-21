export type Language = "en" | "te" | "hi";

const productTranslations: Record<string, Record<Language, string>> = {
  "Pappu Garelu": { en: "Pappu Garelu", te: "పప్పు గారెలు", hi: "पप्पू गारेलु" },
  "Palli Garelu": { en: "Palli Garelu", te: "పల్లి గారెలు", hi: "पल्ली गारेलु" },
  "Shanaga Pappu Garelu": { en: "Shanaga Pappu Garelu", te: "శనగపప్పు గారెలు", hi: "चना दाल गारेलु" },
  "Pachi Mirchi Garelu": { en: "Pachi Mirchi Garelu", te: "పచ్చిమిర్చి గారెలు", hi: "हरी मिर्च गारेलु" },
  "White Sakinalu": { en: "White Sakinalu", te: "తెల్ల సకినాలు", hi: "सफेद सकीनालु" },
  "Karam Sakinalu": { en: "Karam Sakinalu", te: "కారం సకినాలు", hi: "तीखा सकीनालु" },
  "Salted Murukulu": { en: "Salted Murukulu", te: "ఉప్పు మురుకులు", hi: "नमकीन मुरुतुलु" },
  "Karam Murukulu": { en: "Karam Murukulu", te: "కారం మురుకులు", hi: "तीखा मुरुतुलु" },
  "Karapusa": { en: "Karapusa", te: "కారప్పూస", hi: "कारापूसा" },
  "Boondi Laddu": { en: "Boondi Laddu", te: "బూంది లడ్డు", hi: "बूंदी लड्डू" },
  "Badusha": { en: "Badusha", te: "బాదుషా", hi: "बालूशाही (बादुशा)" },
  "Burelu": { en: "Burelu", te: "బూరెలు", hi: "बूरेलु" },
  "Kobbari Laddu": { en: "Kobbari Laddu", te: "కొబ్బరి లడ్డు", hi: "नारियल लड्डू" },
  "Ravva Laddu": { en: "Ravva Laddu", te: "రవ్వ లడ్డు", hi: "रवा लड्डू" },
  "Chekkari Karijelu": { en: "Chekkari Karijelu", te: "చక్కెర కరిజెలు", hi: "शक्कर गझिया" },
  "Bellam Karijelu": { en: "Bellam Karijelu", te: "బెల్లం కరిజెలు", hi: "गुड़ गझिया" },
  "Chekkari Gavvalu": { en: "Chekkari Gavvalu", te: "చక్కెర గవ్వలు", hi: "शक्कर गव्वालु" },
  "Bellam Gavvalu": { en: "Bellam Gavvalu", te: "బెల్లం గవ్వలు", hi: "गुड़ गव्वालु" },
  "Nuvvula Laddu": { en: "Nuvvula Laddu", te: "నువ్వుల లడ్డు", hi: "तिल के लड्डू" },
  "Palli Laddu": { en: "Palli Laddu", te: "పల్లి లడ్డు", hi: "मूंगफली लड्डू" },
  "Nuvvulu & Pallilu Laddu": { en: "Nuvvulu & Pallilu Laddu", te: "నువ్వులు & పల్లీల లడ్డు", hi: "तिल-मूंगफली लड्डू" },
  "Ragi Bellam Sunnundalu": { en: "Ragi Bellam Sunnundalu", te: "రాగి బెల్లం సున్నుండలు", hi: "रागी गुड़ सुन्नुंडालु" },
  "Minapa Bellam Sunnundalu": { en: "Minapa Bellam Sunnundalu", te: "మినప బెల్లం సున్నుండలు", hi: "उड़द दाल गुड़ सुन्नुंडालु" },
  "Pesara Bellam Sunnundalu": { en: "Pesara Bellam Sunnundalu", te: "పెసర బెల్లం సున్నుండలు", hi: "मूंग दाल गुड़ सुन्नुंडालु" },
  "Sabudhana Fry Mixture": { en: "Sabudhana Fry Mixture", te: "సబ్దాన్ ఫ్రై మిశ్రమం", hi: "साबूदाना फ्राई मिक्सचर" },
  "Spicy Boondi": { en: "Spicy Boondi", te: "కారపు బూంది", hi: "तीखा बूंदी" },
  "Spicy Palli": { en: "Spicy Palli", te: "కారపు పల్లీలు", hi: "तीखा मूंगफली" },
  "Makka Pottu Mixture": { en: "Makka Pottu Mixture", te: "మొక్కజొన్న మిక్సర్", hi: "मक्का पोहा मिक्सचर" },
  "Salted Mungdhal": { en: "Salted Mungdhal", te: "మూంగ్‌దాల్ నమkeen", hi: "मूंग दाल नमकीन" },
  "Paper Chuda Atukulu": { en: "Paper Chuda Atukulu", te: "పేపర్ చెక్క అటుకులు", hi: "पतला पोहा नमकीन" },
  "Pappu Chegodilu": { en: "Pappu Chegodilu", te: "పప్పు చేగోడీలు", hi: "दाल चेगोडिलु" },
  "Spicy Shanaga Pappu Fry": { en: "Spicy Shanaga Pappu Fry", te: "కారపు శనగ పప్పు ఫ్రై", hi: "मसालेदार चना फ्राई" },
  "Tomato Pickle": { en: "Tomato Pickle", te: "టమోటా పచ్చడి", hi: "टमाटर का अचार" },
  "Kakarakaya Pickle": { en: "Kakarakaya Pickle", te: "కాకరకాయ పచ్చడి", hi: "करेले का अचार" },
  "Mango Pickle": { en: "Mango Pickle", te: "మామిడికాయ పచ్చడి (ఆవకాయ)", hi: "आम का अचार (अवाकाया)" },
  "Mango Allam Pickle": { en: "Mango Allam Pickle", te: "ఇంగువ అల్లం మామిడి పచ్చడి", hi: "आम अदरक का अचार" },
  "Pulihora Pickle": { en: "Pulihora Pickle", te: "పులిహోర పచ్చడి", hi: "इमली राइस अचार" },
  "Chicken Boneless Pickle": { en: "Chicken Boneless Pickle", te: "బోన్‌లెస్ చికెన్ పచ్చడి", hi: "चिकन बोनलेस अचार" },
  "Chicken With Bone Pickle": { en: "Chicken With Bone Pickle", te: "బోన్‌తో చికెన్ పచ్చడి", hi: "चिकन हड्डी के साथ अचार" },
  "Mutton Boneless Pickle": { en: "Mutton Boneless Pickle", te: "బోన్‌లెస్ మటన్ పచ్చడి", hi: "मटन बोनलेस अचार" },
  "Mutton With Bone Pickle": { en: "Mutton With Bone Pickle", te: "బోన్‌తో మటన్ పచ్చడి", hi: "मटन हड्डी के साथ अचार" },
  "Fish Pickle (Koramenu)": { en: "Fish Pickle (Koramenu)", te: "చేపల పచ్చడి (కొరమేను)", hi: "मछली का अचार (कोरामेनु)" }
};

export const translateItemName = (name: string, lang: Language = "en"): string => {
  const match = productTranslations[name];
  if (match) {
    return match[lang];
  }
  const key = Object.keys(productTranslations).find(k => k.toLowerCase() === name.toLowerCase());
  if (key) {
    return productTranslations[key][lang];
  }
  return name;
};

export interface TranslationSet {
  home: string;
  dailyMenu: string;
  reviews: string;
  contactMap: string;
  managerConsole: string;
  appName: string;
  appSub: string;
  hotline: string;
  timings: string;
  addressStrip: string;
  basket: string;
  heroTitle: string;
  heroDesc: string;
  exploreMenu: string;
  exploreGallery: string;
  preservativeFree: string;
  snacksSweets: string;
  cookedOrder: string;
  worldwideDelivery: string;
  genuineRecipes: string;
  genuineDesc: string;
  premiumHygiene: string;
  premiumDesc: string;
  dailySpecials: string;
  artisanalGallery: string;
  galleryDesc: string;
  menuTitle: string;
  menuDesc: string;
  addToCart: string;
  updateCart: string;
  searchPlaceholder: string;
  allCategories: string;
  sweets: string;
  savouries: string;
  pickles: string;
  mixtures: string;
  all: string;
  pricePerKg: string;
  cartTitle: string;
  cartDesc: string;
  emptyCart: string;
  checkoutFormTitle: string;
  fullName: string;
  whatsappPhone: string;
  addressPlaceholder: string;
  notesPlaceholder: string;
  paymentMethod: string;
  cod: string;
  payCard: string;
  placeOrder: string;
  subtotal: string;
  globalShipment: string;
  calcWeight: string;
  totalBill: string;
  reviewsTitle: string;
  reviewsDesc: string;
  writeReview: string;
  submitReview: string;
  rating: string;
  reviewText: string;
  reachUs: string;
  reachDesc: string;
  quickInfo: string;
  transitTitle: string;
  transitDesc: string;
  mapsRedirect: string;
  storeHQ: string;
  courierEstimates: string;
}

export const translations: Record<Language, TranslationSet> = {
  en: {
    home: "Home",
    dailyMenu: "Daily Menu",
    reviews: "Reviews",
    contactMap: "Contact & Map",
    managerConsole: "Manager Console",
    appName: "Swaadam Home Foods",
    appSub: "handcrafted flavours",
    hotline: "ORDER DESK HOTLINE",
    timings: "TIMINGS: 9:30 AM TO 9:30 PM DAILY",
    addressStrip: "GANESH NAGAR, ROAD NO.2, JAGTIAL",
    basket: "Shopping Basket",
    heroTitle: "Traditional & Hand crafted flavours",
    heroDesc: "Light the fires of nostalgia! Our family kitchen meticulously blends age-old recipe books with pure double-filtered oils, hand-ground spices, and immaculate safety to deliver heritage food to your doorstep worldwide.",
    exploreMenu: "Explore Catalogue Menu",
    exploreGallery: "Explore Gallery",
    preservativeFree: "100% Preservative Free",
    snacksSweets: "30+ Snacks & Sweets",
    cookedOrder: "Cooked to Order",
    worldwideDelivery: "Worldwide Delivery",
    genuineRecipes: "Genuine Recipes",
    genuineDesc: "Every sweet and savory loop conforms exactly to inherited guidelines of culinary purity, using raw jaggery, local sesame, and double filtered groundnut oils.",
    premiumHygiene: "Premium Hygiene",
    premiumDesc: "Our kitchens are scrubbed daily and ingredients undergo rigorous cleaning. We uphold strict standards to ensure safety, nutrition, and delightful texture.",
    dailySpecials: "Our Daily Specials",
    artisanalGallery: "Artisanal Kitchen Gallery",
    galleryDesc: "A beautiful, live visual look at our traditional manufacturing processes, fresh yields, and festive configurations in Jagtial.",
    menuTitle: "Traditional Telangana Menu",
    menuDesc: "We do not sell pre-packed industrial inventory. Choose your customized kilogram quantities; our home cooks will hand-prepare, fry in fresh oils, and dispatch with vacuum compliance.",
    addToCart: "Add to Basket",
    updateCart: "Update Basket",
    searchPlaceholder: "Search traditional recipes...",
    allCategories: "All Traditional Recipes",
    sweets: "Traditional Sweets (మధురములు)",
    savouries: "Traditional Savouries (पिंडीवनतुलु)",
    pickles: "Traditional Pickles (పచ్చళ్ళు)",
    mixtures: "Premium Mixtures (మిక్సర్స్)",
    all: "View All",
    pricePerKg: "Price per Kilogram",
    cartTitle: "Your Shopping Basket",
    cartDesc: "Review your freshly cooked package metrics. Each selection is prepared warm directly upon final checkout sync.",
    emptyCart: "Your basket is empty! Fill it from the Daily Menu.",
    checkoutFormTitle: "Secure Dispatch Coordinates",
    fullName: "Full Name",
    whatsappPhone: "Active WhatsApp Phone Number (With country code, e.g. 91xxxxxxxx)",
    addressPlaceholder: "Complete Courier Shipping Address (City, Pincode, Country, etc.)",
    notesPlaceholder: "Festival specs, spiciness level, courier request notes...",
    paymentMethod: "Payment Coordination Method",
    cod: "Pay with GPay / Cash on Delivery",
    payCard: "Simulated International Debit/Credit Card (Test Mode)",
    placeOrder: "Register Order & Sync WhatsApp",
    subtotal: "Item Subtotal",
    globalShipment: "Global/Courier Shipment Fee",
    calcWeight: "Calculated based on Weight & Region",
    totalBill: "Estimated Total Bill",
    reviewsTitle: "Swaadam Customer Reviews",
    reviewsDesc: "Read verified feedback from patrons globally who enjoy our heritage foods, or submit your own home rating.",
    writeReview: "Share Your Heritage Rating",
    submitReview: "Submit Heritage Review",
    rating: "Rating",
    reviewText: "Write your dining experience or package courier review...",
    reachUs: "Reach Swaadam Home Foods",
    reachDesc: "We pack every order elegantly in heavy vacuum-sealed containers for long shelf life and safely deliver it over countries across the globe!",
    quickInfo: "Overall Delivery Available Internationally & Domestically",
    transitTitle: "Global Delivery & Location",
    transitDesc: "We ship our famous Telangana pickles and sweets internationally. Click on the map image below to view our physical store location on Google Maps, get instant directions, and see our store pinned at Ganesh Nagar, Jagtial.",
    mapsRedirect: "Redirect via Google Maps Directions",
    storeHQ: "📌 Swaadam Shop (HQ)",
    courierEstimates: "Courier Transit Estimates & Charges"
  },
  te: {
    home: "హోమ్",
    dailyMenu: "రోజువారీ మెనూ",
    reviews: "సమీక్షలు",
    contactMap: "సంప్రదించండి & మ్యాప్",
    managerConsole: "మేనేజర్ కన్సోల్",
    appName: "స్వాదం హోమ్ ఫుడ్స్",
    appSub: "అసలైన సాంప్రదాయ రుచులు",
    hotline: "ఆర్డర్ డెస్క్ హాట్‌లైన్",
    timings: "సమయం: ప్రతిరోజూ ఉదయం 9:30 నుండి రాత్రి 9:30 వరకు",
    addressStrip: "గణేష్ నగర్, రోడ్ నంబర్ 2, జగిత్యాల",
    basket: "షాపింగ్ బాస్కెట్",
    heroTitle: "చేతితో చేసిన సాంప్రదాయ పిండివంటలు & రుచులు",
    heroDesc: "మధురమైన జ్ఞాపకాలను గుర్తుచేసుకోండి! మా కుటుంబ వంటగది పాతకాలపు వంటల పద్ధతులను, స్వచ్ఛమైన నూనెలను, చేతితో నూరిన మసాలా దినుసులను ఉపయోగించి, ప్రపంచవ్యాప్తంగా మీ ఇంటి వద్దకే నిజమైన రుచులను చేరవేస్తుంది.",
    exploreMenu: "మెనూ కేటలాగ్ చూడండి",
    exploreGallery: "గ్యాలరీ చూడండి",
    preservativeFree: "100% ప్రిజర్వేటివ్స్ లేనివి",
    snacksSweets: "30+ కంటే పిండివంటలు & స్వీట్స్",
    cookedOrder: "తాజాగా తయారు చేయబడును",
    worldwideDelivery: "ప్రపంచవ్యాప్త డెలివరీ",
    genuineRecipes: "నిజమైన సాంప్రదాయ వంటకాలు",
    genuineDesc: "ప్రతి స్వీట్ మరియు పిండివంట మా పూర్వీకుల పద్ధతుల ప్రకారం, స్వచ్ఛమైన బెల్లం, వేరుశెనగ నూనెలతో ఎంతో శుచిగా తయారుచేయబడుతుంది.",
    premiumHygiene: "ప్రీమియం పరిశుభ్రత",
    premiumDesc: "మా వంటగదులు ప్రతిరోజూ శుభ్రం చేయబడతాయి. నాణ्यత, రక్షణ మరియు అద్భుతమైన రుచి కోసం మేము కఠినమైన ప్రమాణాలను పాటిస్తాము.",
    dailySpecials: "మా రోజువారీ ప్రత్యేకతలు",
    artisanalGallery: "సాంప్రదాయ వంట గ్యాలరీ",
    galleryDesc: "జగిత్యాలలో మా సాంప్రదాయ తయారీ ప్రక్రియలు, తాజా ఉత్పత్తులు మరియు పండుగ ప్యాకేజీల ప్రత్యక్ష వీక్షణ.",
    menuTitle: "సాంప్రదాయ తెలంగాణ మెనూ",
    menuDesc: "మేము ముందుగా ప్యాక్ చేసిన నిల్వ పదార్థాలను విక్రయించము. మీ ఆర్డర్ ఆధారంగా కేజీల పరిమాణాన్ని ఎంచుకోండి; మా వంట మనుషులు తాజాగా తయారు చేసి ప్యాకింగ్ చేస్తారు.",
    addToCart: "బాస్కెట్ లో చేర్చు",
    updateCart: "బాస్కెట్ నవీకరించు",
    searchPlaceholder: "సాంప్రదాయ వంటకాలను శోధించండి...",
    allCategories: "అన్ని సాంప్రదాయ వంటకాలు",
    sweets: "సాంప్రదాయ స్వీట్స్ (మధురములు)",
    savouries: "సాంప్రదాయ పిండివంటలు (పిండివంటలు)",
    pickles: "సాంప్రదాయ పచ్చళ్ళు (పచ్చళ్ళు)",
    mixtures: "నెయ్యి మిక్సర్స్ (మిక్సర్స్)",
    all: "అన్నీ చూడండి",
    pricePerKg: "కిలో ధర",
    cartTitle: "మీ షాపింగ్ బాస్కెట్",
    cartDesc: "మీరు ఎంచుకున్న వంటకాల వివరాలు చూడండి. ప్రతి వస్తువు మీ ఆర్డర్ ఖరారు కాగానే తాజాగా తయారు చేయబడుతుంది.",
    emptyCart: "మీ బాస్కెట్ ఖాళీగా ఉంది! రోజువారీ మెనూ నుండి చేర్చండి.",
    checkoutFormTitle: "సురక్షిత డెలివరీ వివరాలు",
    fullName: "పూర్తి పేరు",
    whatsappPhone: "వాట్సాప్ నంబర్ (కంట్రీ కోడ్‌తో, ఉదా: 91xxxxxxxx)",
    addressPlaceholder: "పూర్తి కొరియర్ డెలివరీ చిరునామా (నగరం, పిన్‌కోడ్, దేశం, మొదలైనవి)",
    notesPlaceholder: "కారం స్థాయి, పండుగ రకం, కొరియర్ అభ్యర్థనలు మొదలైనవి...",
    paymentMethod: "చెల్లింపు పద్ధతి",
    cod: "గూగుల్ పే / క్యాష్ ఆన్ డెలివరీ",
    payCard: "సిమ్యులేటెड అంతర్జాతీయ కార్డు (టెస్ట్ మోడ్)",
    placeOrder: "ఆర్డర్ నమోదు చేయండి & వాట్సాప్ పంపండి",
    subtotal: "మొత్తం ధర",
    globalShipment: "ప్రపంచవ్యాప్త కొరియర్ ఛార్జీ",
    calcWeight: "బరువు మరియు ప్రాంతం ఆధారంగా లెక్కించబడును",
    totalBill: "మొత్తం అంచనా బిల్‌",
    reviewsTitle: "స్వాదం కస్టమర్ సమీక్షలు",
    reviewsDesc: "మా వంటకాలను ఆస్వాదించిన ప్రపంచవ్యాప్త కస్టమర్ల అభిప్రायాలను చదవండి లేదా మీ రేటింగ్‌ను తెలియజేయండి.",
    writeReview: "మీ రేటింగ్‌ను తెలియజేయండి",
    submitReview: "సమీక్షను సమర్పించండి",
    rating: "రేటింగ్",
    reviewText: "మీ అనుభవాన్ని లేదా కొరియర్ డెలివరీ గురించి రాయండి...",
    reachUs: "స్వాదం హోమ్ ఫుడ్స్‌ను సంప్రదించండి",
    reachDesc: "ఎక్కువ కాలం నిల్వ ఉండేలా వంటకాలను గాలి చొరబడని శూన్య ప్యాకేజింగ్ (vacuum-sealed) చేసి ప్రపంచవ్యాప్తంగా సురక్షితంగా అందజేస్తాము!",
    quickInfo: "ప్రపంచవ్యాప్తంగా మరియు భారతదేశంలో ఎక్కడికైనా డెలివరీ చేయబడును",
    transitTitle: "ప్రపంచవ్యాప్త డెలివరీ & స్థానం",
    transitDesc: "మా ప్రసిద్ధ తెలంగాణ పచ్చళ్ళు మరియు పిండివంటలను అంతర్జాతీయంగా కొరియర్ ద్వారా పంపుతాము. గూగుల్ మ్యాప్స్‌లో మా స్థానాన్ని చూడటానికి క్రింది చిత్రంపై క్లిక్ చేయండి.",
    mapsRedirect: "గూగుల్ మ్యాప్స్ దిశల ద్వారా వీక్షించండి",
    storeHQ: "📌 స్వాదం షాప్ (ప్రధాన కార్యాలయం)",
    courierEstimates: "కొరియర్ సమయము & అంచనా ఛార్జీలు"
  },
  hi: {
    home: "होम",
    dailyMenu: "दैनिक मेनू",
    reviews: "समीक्षाएं",
    contactMap: "संपर्क और मानचित्र",
    managerConsole: "मैनेजर कंसोल",
    appName: "स्वादम होम फूड्स",
    appSub: "अकाट्य पारंपरिक स्वाद",
    hotline: "ऑर्डर डेस्क हॉटलाइन",
    timings: "समय: प्रतिदिन सुबह 9:30 से रात 9:30 बजे तक",
    addressStrip: "गणेश नगर, रोड नंबर 2, जगतियाल",
    basket: "शॉपिंग बास्केट",
    heroTitle: "पारंपरिक एवं हस्तनिर्मित व्यंजन और स्वाद",
    heroDesc: "पुरानी यादों को ताज़ा करें! हमारी पारिवारिक रसोई अत्यधिक सावधानी से पारंपरिक व्यंजनों, शुद्ध तेलों और विशिष्ट स्वच्छता के साथ स्वादिष्ट मिठाइयाँ और नमकीन दुनिया भर में आपके द्वार तक पहुँचाती है।",
    exploreMenu: "मेन्यू सूची देखें",
    exploreGallery: "गैलरी देखें",
    preservativeFree: "100% परिरक्षक रहित",
    snacksSweets: "30+ से अधिक स्नैक्स और मिठाइयाँ",
    cookedOrder: "ऑर्डर पर ताजा तैयार",
    worldwideDelivery: "देश-विदेश में डिलीवरी",
    genuineRecipes: "प्रामाणिक रेसिपी",
    genuineDesc: "हर मिठाई और नमकीन हमारी परंपराओं के अनुसार शुद्ध गुड़, स्थानीय तिल और उत्कृष्ट मूंगफली तेल से बनाई जाती है।",
    premiumHygiene: "प्रीमियम स्वच्छता",
    premiumDesc: "हमारी रसोई को दैनिक रूप से साफ किया जाता है। हम सुरक्षा, पोषण और अद्भुत स्वाद बनाए रखने के लिए कठोर मानकों का पालन करते है।",
    dailySpecials: "हमारे दैनिक विशेष",
    artisanalGallery: "पारंपरिक रसोई गैलरी",
    galleryDesc: "जगतियाल में हमारी पारंपरिक विनिर्माण प्रक्रिया, ताज़ा उत्पाद और उत्सव पैकेजों का सीधा नज़ारा।",
    menuTitle: "पारंपरिक तेलंगाना मेनू",
    menuDesc: "हम पहले से पैक किया हुआ बासी भोजन नहीं बेचते हैं। अपनी आवश्यकतानुसार वजन चुनें; हमारे रसोइये ऑर्डर मिलने पर इसे तुरंत ताज़ा तैयार करेंगे।",
    addToCart: "बास्केट में जोड़ें",
    updateCart: "बास्केट अपडेट करें",
    searchPlaceholder: "पारंपरिक व्यंजनों को खोजें...",
    allCategories: "सभी पारंपरिक रेसिपी",
    sweets: "पारंपरिक मिठाइयाँ (मधुरम)",
    savouries: "पारंपरिक नमकीन (पिंडीवनतुलु)",
    pickles: "पारंपरिक अचार (पचारलु)",
    mixtures: "प्रीमियम मिक्सचर्स (मिक्सर)",
    all: "सभी देखें",
    pricePerKg: "प्रति किलोग्राम मूल्य",
    cartTitle: "आपकी शॉपिंग बास्केट",
    cartDesc: "अपनी ताज़ा तैयार की गई टोकरी की समीक्षा करें। अंतिम चेकआउट के बाद हर सामग्री ताज़ा बनाई जाएगी।",
    emptyCart: "आपकी टोकरी खाली है! दैनिक मेनू से पसंदीदा व्यंजन जोड़ें।",
    checkoutFormTitle: "सुरक्षित डिलीवरी स्थान विवरण",
    fullName: "पूरा नाम",
    whatsappPhone: "सक्रिय व्हाट्सएप नंबर (कंट्री कोड के साथ, जैसे: 91xxxxxxxx)",
    addressPlaceholder: "पूरा कूरियर शिपिंग पता (शहर, पिनकोड, देश, आदि)",
    notesPlaceholder: "तीखापन, त्योहार का प्रकार, कूरियर विशेष निर्देश...",
    paymentMethod: "भुगतान समन्वय विधि",
    cod: "जीपे / कैश ऑन डिलीवरी",
    payCard: "सिम्युलेटेड इंटरनेशनल कार्ड (टेस्ट मोड)",
    placeOrder: "ऑर्डर पंजीकृत करें और व्हाट्सएप भेजें",
    subtotal: "सामग्री का मूल्य",
    globalShipment: "वैश्विक कूरियर शिपमेंट शुल्क",
    calcWeight: "वजन और क्षेत्र के आधार पर गणना की जाएगी",
    totalBill: "कुल अनुमानित बिल",
    reviewsTitle: "स्वादम ग्राहक समीक्षाएं",
    reviewsDesc: "दुनिया भर के ग्राहकों की सत्यापित प्रतिक्रियाएं पढ़ें या अपनी रेटिंग प्रदान करें।",
    writeReview: "अपनी रेटिंग साझा करें",
    submitReview: "समीक्षा सबमिट करें",
    rating: "रेटिंग",
    reviewText: "अपना अनुभव या कूरियर डिलीवरी समीक्षा लिखें...",
    reachUs: "स्वादम होम Foods से संपर्क करें",
    reachDesc: "हम लंबे समय तक सुरक्षित रखने के लिए कूरियर बक्से को अच्छी तरह से वैक्यूम-सील्ड (गैस-मुक्त) डिब्बों में पैक करते हैं और दुनिया भर में भेजते हैं।",
    quickInfo: "देश और दुनिया भर में हर जगह डिलीवरी उपलब्ध है",
    transitTitle: "वैश्विक डिलीवरी और स्थान",
    transitDesc: "हम अपने प्रसिद्ध तेलंगाना अचार और स्वादिष्ट व्यंजनों को अंतरराष्ट्रीय स्तर पर भी भेजते हैं। गूगल मैप्स पर हमारा स्थान देखने के लिए नीचे दिए गए मानचित्र चित्र पर क्लिक करें।",
    mapsRedirect: "गूगल मैप्स के माध्यम से सीधा मार्ग",
    storeHQ: "📌 स्वादम शॉप (मुख्यालय)",
    courierEstimates: "कूरियर समय और अनुमानित शुल्क"
  }
};
