import { useState } from "react";
import { motion } from "motion/react";
import { 
  Bell, 
  Flame, 
  Award, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Heart, 
  Clock, 
  Sparkles, 
  ShoppingBag, 
  TrendingUp,
  Flame as HotFlame
} from "lucide-react";
import { Review, PushNotification, Product, Order } from "../types";
import { SwaadamLogo } from "./SwaadamLogo";
import { Language, translations } from "../translations";

interface HomeSectionProps {
  onOrderNow: () => void;
  onNavigateToReviews: () => void;
  reviews: Review[];
  notifications: PushNotification[];
  onDismissNotification: (id: string) => void;
  lang?: Language;
  products?: Product[];
  orders?: Order[];
  onCancelOrder?: (orderId: string) => Promise<void>;
}

const DEFAULT_FALLBACK_IMG = "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80";

export function HomeSection({
  onOrderNow,
  onNavigateToReviews,
  reviews,
  notifications,
  onDismissNotification,
  lang = "en",
  products = [],
  orders = [],
  onCancelOrder,
}: HomeSectionProps) {
  const t = translations[lang];

  // Wishlist simulation state
  const [lovedItems, setLovedItems] = useState<Record<string, boolean>>({});
  
  // Pack size selector state
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({
    "s1": "500g",
    "sw2": "500g",
    "pk3": "500g"
  });

  const toggleLove = (id: string) => {
    setLovedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSizeChange = (itemId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const handleCategoryClick = (categorySymbol: string) => {
    sessionStorage.setItem("swaadam_selected_category", categorySymbol);
    onOrderNow();
  };

  // Predefined Categories List
  const categoriesList = [
    {
      symbol: "ALL",
      titleEn: "Shop All",
      titleTe: "అన్నీ చూడండి",
      titleHi: "सभी उत्पाद",
      desc: "Full catalogue",
      image: "https://res.cloudinary.com/dplgcubw5/image/upload/f_auto,q_auto,w_200/v1781761316/WhatsApp_Image_2026-06-18_at_10.00.04_AM_fpdwvp.jpg"
    },
    {
      symbol: "GARELU",
      titleEn: "Crispy Garelu",
      titleTe: "పప్పు గారెలు",
      titleHi: "दाल गारेलु",
      desc: "Savory lentil rings",
      image: "https://dpfoods.in/wp-content/uploads/2025/01/11.png"
    },
    {
      symbol: "SAKINALU",
      titleEn: "Lacy Sakinalu",
      titleTe: "సాంప్రదాయ సకినాలు",
      titleHi: "सकीनालु",
      desc: "Festive sesame loops",
      image: "https://study4sure.com/wp-content/uploads/2026/01/sakinalu-1024x576.jpg"
    },
    {
      symbol: "MURUKULU",
      titleEn: "Crunchy Murukulu",
      titleTe: "కారపు మురుకులు",
      titleHi: "कुरकुरे मुरुतुलु",
      desc: "Spiced butter loops",
      image: "https://5.imimg.com/data5/SELLER/Default/2021/9/ZU/PA/PM/51213938/butter-salted-murukku-chakli-500x500.jpg"
    },
    {
      symbol: "SWEETS",
      titleEn: "Ghee Sweets",
      titleTe: "సాంప్రదాయ స్వీట్స్",
      titleHi: "शुद्ध घी मिठाइयां",
      desc: "Layered delicacies",
      image: "https://www.shutterstock.com/image-photo/balushahi-makhan-bada-indian-sweet-260nw-1076800412.jpg"
    },
    {
      symbol: "SUNNUNDALU",
      titleEn: "Sunnundalu",
      titleTe: "పౌష్టిక సున్నుండలు",
      titleHi: "उड़द दाल लड्डू",
      desc: "Healthy jaggery balls",
      image: "https://theyummydelights.com/wp-content/uploads/2021/09/peanut-ladoo-recipe-720x720.jpg"
    },
    {
      symbol: "MIXTURES",
      titleEn: "Namkeen Mixtures",
      titleTe: "కారం మిక్సర్స్",
      titleHi: "मसालेदार नमकीन",
      desc: "Roasted grains & nuts",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/10/353313680/RM/XE/ON/128182712/dsc00844-500x500.jpg"
    },
    {
      symbol: "PICKLES",
      titleEn: "Heritage Pickles",
      titleTe: "నిల్వ పచ్చళ్ళు",
      titleHi: "पारंपरिक अचार",
      desc: "Fiery spicy preserves",
      image: "https://tiimg.tistatic.com/fp/1/007/913/easy-to-digest-good-in-taste-mango-pickle-with-no-artificial-colors-and-no-preservatives-775.jpg"
    }
  ];

  // Traditional Best Sellers incorporating actual Swaadam prices
  const bestSellersList = [
    {
      id: "s1", // White Sakinalu in db.json
      titleEn: "Traditional White Sakinalu",
      titleTe: "సాంప్రదాయ సకినాలు (నువ్వులు)",
      titleHi: "पारंपरिक प्रामाणिक सकीनालु",
      category: "SAKINALU",
      descEn: "Authentic Telangana festive rice flour spirals, hand-shaped with fresh sesame seeds. Unrivaled crunchiness.",
      descTe: "బియ్యప్పిండి మరియు నల్లా నువ్వులతో చేసిన సంక్రాంతి ప్రత్యేక పిండివంట.",
      descHi: "चावल के आटे और भरपूर तिलों से बनी प्रामाणिक करारी सकीनालु व्यंजन।",
      imageUrl: "https://study4sure.com/wp-content/uploads/2026/01/sakinalu-1024x576.jpg",
      // Actual database price is ₹300 per kg -> 250g = 75, 500g = 150, 1kg = 300
      prices: { "250g": 75, "500g": 150, "1kg": 300 },
      isNew: false,
      badge: lang === "te" ? "సిగ్నేచర్" : lang === "hi" ? "अति लोकप्रिय" : "Best Seller"
    },
    {
      id: "sw2", // Badusha in db.json
      titleEn: "Layered Golden Badusha",
      titleTe: "లేయర్డ్ గోల్డెన్ బాదుషా",
      titleHi: "परतदार बालूशाही (बादुशा)",
      category: "SWEETS",
      descEn: "Traditional sweet donuts with a crisp outer crust and structural moist, cardamom-perfumed juicy center layers.",
      descTe: "తాజా వనస్పతి నేతితో కాల్చిన కరకరలాడే రసయుక్తమైన తియ్యని గోధుమ బాదుషా.",
      descHi: "शुद्ध इलायची की महक और परतदार मुलायम रसीली बालूशाही जो मुंह में जाते ही घुल जाए।",
      imageUrl: "https://www.shutterstock.com/image-photo/balushahi-makhan-bada-indian-sweet-260nw-1076800412.jpg",
      // Actual database price is ₹300 per kg -> 250g = 75, 500g = 150, 1kg = 300
      prices: { "250g": 75, "500g": 150, "1kg": 300 },
      isNew: true,
      badge: lang === "te" ? "నూతన స్వీట్" : lang === "hi" ? "नया व्यंजन" : "NEW RECIPE"
    },
    {
      id: "pk3", // Mango Pickle in db.json
      titleEn: "Avakaya (Mango) Pickle",
      titleTe: "ఆవకాయ మామిడి పచ్చడి",
      titleHi: "घर का बना आम का अचार",
      category: "PICKLES",
      descEn: "Fiery, premium cold-pressed sesame oil-cured raw mango blocks tossed in sun-baked organic mustard and red chili dust.",
      descTe: "తేమ లేకుండా తాజా మామిడికాయ ముక్కలు, ఆవపిండి మరియు పల్లి నూనెతో చేసిన గృహ ఆవకాయ.",
      descHi: "पारंपरिक सरसों और शुद्ध मूंगफली तेल से तैयार किया गया असली घरेलू स्वादिष्ट आम का अचार।",
      imageUrl: "https://tiimg.tistatic.com/fp/1/007/913/easy-to-digest-good-in-taste-mango-pickle-with-no-artificial-colors-and-no-preservatives-775.jpg",
      // Actual database price is ₹400 per kg -> 250g = 100, 500g = 200, 1kg = 400
      prices: { "250g": 100, "500g": 200, "1kg": 400 },
      isNew: false,
      badge: lang === "te" ? "హాట్ నిల్వ" : lang === "hi" ? "सदाबहार" : "LEGENDARY"
    }
  ];



  return (
    <div id="swaadam-home-view" className="space-y-12">
      


      {/* Real-time Push Notification Simulation banner */}
      {notifications.length > 0 && (
        <div id="push-notifications-panel" className="max-w-4xl mx-auto px-4">
          <div className="bg-neutral-950 border-2 border-[#dfba73] rounded-2xl p-4 flex items-start gap-4 relative animate-fade-in shadow-xl shadow-black/40">
            <div className="bg-[#dfba73] text-neutral-950 p-2.5 rounded-xl shrink-0">
              <Bell className="w-5 h-5 text-neutral-950" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-widest text-[#dfba73] font-mono">Push Notification Alert</span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              </div>
              <h4 className="text-sm sm:text-base font-black text-[#FCFAF4] leading-tight">
                {notifications[0].title}
              </h4>
              <p className="text-xs sm:text-sm text-[#e2cfbe] font-medium leading-relaxed">
                {notifications[0].message}
              </p>
            </div>
            <button
              onClick={() => onDismissNotification(notifications[0].id)}
              className="text-xs text-neutral-400 hover:text-[#dfba73] font-bold hover:underline p-1 cursor-pointer transition-colors shrink-0"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 2. MAIN HERO BANNER - Split Layout & Staggered Animations */}
      <section id="hero-banner" className="relative min-h-[580px] flex items-center justify-center py-16 px-6 bg-gradient-to-b from-[#181818] via-[#121212] to-[#1a1a1a] rounded-3xl overflow-hidden border-2 border-[#C5A059] shadow-2xl shadow-[#C5A059]/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12),transparent_75%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DFBA73]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl text-center z-10 space-y-6 relative flex flex-col items-center">
          
          {/* Badge styled beautifully */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#dfba73]/15 border-2 border-[#dfba73]/45 rounded-full px-5 py-2.5 text-[10px] sm:text-[11px] text-[#DFBA73] font-black tracking-widest uppercase font-mono max-w-full"
          >
            <HotFlame className="w-4 h-4 fill-[#DFBA73] animate-pulse text-[#DFBA73]" /> 
            <span>ONE STOP FOR ALL YOUR CRAVINGS 🔥</span>
          </motion.div>

          {/* Highlighted Delivery Info above Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center justify-center bg-gradient-to-r from-[#171717] to-[#121212] border-2 border-[#dfba73]/65 rounded-2xl px-6 py-3.5 max-w-full shadow-lg shadow-black/30 relative overflow-hidden"
          >
            {/* Top border highlight line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500 via-[#dfba73] to-amber-500" />
            
            <div className="flex items-center gap-2.5 text-[#FCFAF4] font-black text-xs sm:text-[13px] tracking-wide select-none">
              <span className="text-lg shrink-0">🎁</span>
              <p className="text-orange-100 flex items-center gap-1.5 flex-wrap">
                <span>
                  {lang === "te" 
                    ? "ఉచిత డెలివరీ (ఆర్డర్ విలువ):" 
                    : lang === "hi" 
                    ? "मुफ्त डिलीवरी (ऑर्डर मूल्य):" 
                    : "Free Delivery on Orders Above:"}
                </span>
                <span className="text-[#dfba73] font-mono bg-neutral-950 px-2.5 py-0.5 rounded-md border border-[#dfba73]/40 text-xs shadow-inner">
                  ₹1000+
                </span>
              </p>
            </div>
          </motion.div>

          {/* Main Logo Emblem in full glory */}
          <div className="mb-4 animate-fade-in hover:scale-105 transition-all duration-500 cursor-pointer">
            <SwaadamLogo size={230} />
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.12]">
            {t.heroTitle}
          </h1>

          {/* Slogan: Every Pack a Promise of Trust */}
          <div className="bg-[#dfba73]/10 border border-[#dfba73]/30 px-6 py-3 rounded-2xl max-w-lg mx-auto">
            <p className="text-[#dfba73] font-black text-xs sm:text-sm tracking-widest uppercase font-mono">
              ★ EVERY PACK A PROMISE OF TRUST ★
            </p>
            <p className="text-[10px] text-gray-300 mt-0.5">
              100% Homemade delicacy prepared meticulously with hygiene
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#E5CFA3] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            {t.heroDesc}
          </p>

          <div id="hero-actions" className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={onOrderNow}
              className="w-full sm:w-auto bg-[#C5A059] hover:bg-[#DFBA73] text-[#121212] font-black tracking-wider text-xs uppercase px-10 py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-[#C5A059]/15 flex items-center justify-center gap-2 cursor-pointer group"
            >
              {t.exploreMenu} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#categories-rail-section"
              className="w-full sm:w-auto border border-[#C5A059]/50 hover:bg-[#C5A059]/10 text-[#DFBA73] hover:text-white font-bold px-10 py-4 rounded-xl transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer bg-transparent"
            >
              {lang === "te" ? "వర్గాలు చూడండి" : lang === "hi" ? "श्रेणियां देखें" : "View Categories"}
            </a>
          </div>

          {/* Quick core metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-3xl mx-auto pt-10 text-center border-t border-[#C5A059]/20 mt-12">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#DFBA73] font-mono leading-none">100%</p>
              <p className="text-[10px] text-[#E5CFA3]/75 uppercase tracking-widest mt-1.5 font-bold font-mono">{t.preservativeFree}</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#DFBA73] font-mono leading-none">35+</p>
              <p className="text-[10px] text-[#E5CFA3]/75 uppercase tracking-widest mt-1.5 font-bold font-mono">{t.snacksSweets}</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#DFBA73] font-mono leading-none">FRESH</p>
              <p className="text-[10px] text-[#E5CFA3]/75 uppercase tracking-widest mt-1.5 font-bold font-mono">{t.cookedOrder}</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#DFBA73] font-mono leading-none">GLOBAL</p>
              <p className="text-[10px] text-[#E5CFA3]/75 uppercase tracking-widest mt-1.5 font-bold font-mono">{t.worldwideDelivery}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INFINITELY SLIDING COMMITMENT TICKER */}
      <div className="bg-[#E67E22] border-y border-[#C0392B] py-3.5 overflow-hidden select-none shadow-md">
        <div className="flex whitespace-nowrap gap-12 text-xs font-black uppercase tracking-widest text-[#FFF] font-mono">
          <motion.div 
            animate={{ x: [0, -1200] }}
            transition={{ ease: "linear", duration: 32, repeat: Infinity }}
            className="flex shrink-0 gap-12"
          >
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex gap-12 shrink-0 animate-infinite-scroll">
                <span className="flex items-center gap-1.5"><span className="text-base">🛑</span> NO ARTIFICIAL PRESERVATIVES</span>
                <span className="text-[#FAD7A0]/80">✦</span>
                <span className="flex items-center gap-1.5"><span className="text-base">🎨</span> NO ADDED COLORS</span>
                <span className="text-[#FAD7A0]/80">✦</span>
                <span className="flex items-center gap-1.5"><span className="text-base">🥥</span> 100% HOME MADE INGREDIENTS</span>
                <span className="text-[#FAD7A0]/80">✦</span>
                <span className="flex items-center gap-1.5"><span className="text-base">🍳</span> COOKED ONLY UPON ORDER PLACEMENT</span>
                <span className="text-[#FAD7A0]/80">✦</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 4. "OUR CATEGORIES" CIRCULAR CAROUSEL GRID */}
      <section id="categories-rail-section" className="scroll-mt-24 space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1 bg-[#dfba73]/10 border border-[#dfba73]/30 px-3 py-1 rounded-full text-[10px] text-[#dfba73] font-black uppercase tracking-wider font-mono">
            <ShoppingBag className="w-3 h-3 text-[#dfba73]" /> Browse Catalogues
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5D4037] tracking-tight">
            {lang === "te" ? "ప్రసిద్ధ వంటకాల వర్గాలు" : lang === "hi" ? "हमारे व्यंजनों की श्रेणियां" : "Explore Our Categories"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Click on any circle to navigate directly to our freshly-made menu collection preloaded with that category.
          </p>
        </div>

        {/* Circular Grid Container */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 max-w-6xl mx-auto px-2">
          {categoriesList.map((cat) => (
            <motion.div
              key={cat.symbol}
              whileHover={{ y: -6, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => handleCategoryClick(cat.symbol)}
              className="flex flex-col items-center text-center cursor-pointer group space-y-2.5 p-3 rounded-2xl bg-white/40 border border-[#dfba73]/20 hover:border-[#dfba73]/70 hover:bg-white/90 transition-all duration-300"
            >
              {/* Image Circle */}
              <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-[#dfba73] bg-orange-50/50 p-1 group-hover:shadow-lg group-hover:shadow-[#dfba73]/20 transition-all duration-300">
                <img
                  src={cat.image}
                  alt={cat.symbol}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.hasFallback) {
                      target.dataset.hasFallback = "true";
                      target.src = DEFAULT_FALLBACK_IMG;
                    }
                  }}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 rounded-full group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
              </div>
              
              {/* Category Info */}
              <div className="space-y-0.5">
                <h4 className="text-[11px] sm:text-xs font-black text-[#5D4037] group-hover:text-[#dfba73] uppercase tracking-wide leading-tight transition-colors">
                  {lang === "te" ? cat.titleTe : lang === "hi" ? cat.titleHi : cat.titleEn}
                </h4>
                <p className="text-[9px] text-gray-500 font-mono group-hover:text-[#5D4037]">
                  {cat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. "OUR BEST SELLERS" SPOTLIGHT SECTION WITH REAL SWAADAM PRICING */}
      <section id="best-sellers-section" className="scroll-mt-24 space-y-8 bg-amber-50/15 border-y border-[#dfba73]/20 py-12 px-4 rounded-3xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#dfba73]/10 border border-[#dfba73]/30 px-3 py-1 rounded-full text-[10px] text-[#dfba73] font-black uppercase tracking-wider font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-[#dfba73] animate-bounce" /> Verified Best Sellers
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5D4037] tracking-tight">
            Our Traditional Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            The most sought-after signature delicacies cooked daily with local ingredients. Accurate Swaadam Kitchen pricing listed below!
          </p>
        </div>

        {/* Best seller cards grid with weights selection and wishlist like screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-4">
          {bestSellersList.map((item) => {
            const activeSize = selectedSizes[item.id] || "500g";
            const dbProduct = products?.find((p) => p.id === item.id);
            const basePrice = dbProduct ? dbProduct.price : (item.id === "pk3" ? 400 : 300);
            const multiplier = activeSize === "250g" ? 0.25 : activeSize === "500g" ? 0.5 : 1.0;
            const price = Math.round(basePrice * multiplier);
            const isLoved = !!lovedItems[item.id];

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -4 }}
                className="bg-white border-2 border-[#dfba73]/30 rounded-2xl overflow-hidden shadow-md flex flex-col justify-between hover:border-[#dfba73] transition-all duration-300 relative"
              >
                {/* Visual Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 select-none font-mono">
                  <span className="text-[8px] bg-neutral-950 text-[#dfba73] border border-[#dfba73]/45 px-2.5 py-1 rounded-md font-black uppercase tracking-widest">
                    {item.badge}
                  </span>
                  
                  {item.isNew && (
                    <span className="text-[8px] bg-red-650 text-white font-black px-2 py-1 rounded-md uppercase tracking-wider self-start flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> NEW
                    </span>
                  )}
                </div>

                {/* Heart Wishlist Toggle inside Card Corner */}
                <button
                  onClick={() => toggleLove(item.id)}
                  className="absolute top-3 right-3 z-10 bg-white/95 border border-[#dfba73]/30 p-2 rounded-full cursor-pointer hover:bg-red-550 hover:border-red-400 transition-all shadow-md group"
                  aria-label="Toggle Wishlist"
                >
                  <Heart 
                    className={`w-4.5 h-4.5 transition-all duration-300 ${
                      isLoved 
                        ? "fill-red-500 text-red-500 scale-110" 
                        : "text-gray-400 group-hover:text-red-550"
                    }`} 
                  />
                </button>

                {/* Image Section */}
                <div className="h-56 bg-orange-50/50 overflow-hidden relative border-b border-[#dfba73]/25">
                  <img
                    src={item.imageUrl}
                    alt={item.titleEn}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                </div>

                {/* Content Box */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] bg-[#dfba73]/15 text-[#dfba73] border border-[#dfba73]/35 rounded-full px-2.5 py-0.5 uppercase tracking-widest font-bold">
                      {item.category}
                    </span>
                    <h3 className="text-base font-black text-[#5D4037] leading-tight">
                      {lang === "te" ? item.titleTe : lang === "hi" ? item.titleHi : item.titleEn}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">
                      {lang === "te" ? item.descTe : lang === "hi" ? item.descHi : item.descEn}
                    </p>
                  </div>

                  {/* Weight Pack Selector (Exactly like mInnieintiruchulu) */}
                  <div className="space-y-1.5 pt-2 border-t border-[#dfba73]/15">
                    <span className="text-[9px] text-[#5D4037] font-black uppercase tracking-wider block">
                      Choose Pack Weight:
                    </span>
                    <div className="flex gap-2">
                      {["250g", "500g", "1kg"].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSizeChange(item.id, sz)}
                          className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                            activeSize === sz
                              ? "bg-[#dfba73] border-[#dfba73] text-neutral-950 font-black shadow-sm"
                              : "bg-white hover:bg-orange-50/30 border-[#dfba73]/30 text-gray-600"
                          }`}
                        >
                          {sz === "250g" ? "250 Grms" : sz === "500g" ? "500 Grms" : "1.0 Kg"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action button */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#dfba73]/20 mt-1">
                    <div>
                      <span className="text-[9px] text-[#E67E22] font-extrabold uppercase block tracking-wider">
                        Pack Price ({activeSize})
                      </span>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-lg font-black text-[#5D4037] font-mono">
                          ₹{price}/-
                        </span>
                        <span className="text-[10px] text-gray-400 line-through font-mono">
                          ₹{Math.round(price / 0.9)}
                        </span>
                        <span className="text-[9px] bg-red-100 text-red-750 font-black px-1.5 py-0.5 rounded animate-pulse">
                          10% OFF
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCategoryClick(item.category)}
                      className="bg-[#121212] hover:bg-[#dfba73] text-[#dfba73] hover:text-white border-2 border-[#dfba73] font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>SELECT OPTIONS</span> <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. CREDIBILITY PILLARS & CORE COMMITMENT */}
      <section id="trust-pillars" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white border border-[#dfba73] shadow-sm p-6 rounded-2xl space-y-3 hover:border-amber-600 transition-all">
          <div className="w-10 h-10 bg-[#dfba73]/10 text-neutral-950 rounded-xl flex items-center justify-center border border-[#dfba73]/40">
            <Award className="w-5 h-5 text-[#dfba73]" />
          </div>
          <h3 className="text-base font-bold text-[#5D4037]">{t.genuineRecipes}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.genuineDesc}
          </p>
        </div>

        <div className="bg-white border border-[#dfba73] shadow-sm p-6 rounded-2xl space-y-3 hover:border-amber-600 transition-all">
          <div className="w-10 h-10 bg-[#dfba73]/10 text-neutral-950 rounded-xl flex items-center justify-center border border-[#dfba73]/40">
            <Clock className="w-5 h-5 text-[#dfba73]" />
          </div>
          <h3 className="text-base font-bold text-[#5D4037]">{t.cookedOrder}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {lang === "te" ? "మేము నిల్వ ఉండే ఆహారాన్ని విక్రయించము. ఆర్డర్ చేయగానే తాజాగా తయారుచేసి కొరియర్ చేస్తాము." : lang === "hi" ? "हम पहले से पैक भोजन नहीं बेचते। जब आप ऑर्डर करते हैं हम इसे तुरंत तैयार करके भेजते हैं।" : "We do not stockpile stale foods. When you hit check-out, we light the hearth, cook your sweets, package them warm inside sealed boxes and dispatch!"}
          </p>
        </div>

        <div className="bg-white border border-[#dfba73] shadow-sm p-6 rounded-2xl space-y-3 hover:border-amber-600 transition-all">
          <div className="w-10 h-10 bg-[#dfba73]/10 text-neutral-950 rounded-xl flex items-center justify-center border border-[#dfba73]/40">
            <ShieldCheck className="w-5 h-5 text-[#dfba73]" />
          </div>
          <h3 className="text-base font-bold text-[#5D4037]">{t.premiumHygiene}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.premiumDesc}
          </p>
        </div>
      </section>



      {/* 8. CUSTOMER REVIEWS SPOTLIGHT SECTION */}
      <section id="reviews-spotlight" className="bg-white border border-[#dfba73]/60 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[#dfba73] font-mono text-xs tracking-wildest uppercase block">
              {lang === "te" ? "మా వినియోగదారుల అభిప్రాయం" : lang === "hi" ? "हमारे ग्राहकों के विचार" : "Voice of our Food Lovers"}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#5D4037]">{t.reviewsTitle}</h3>
          </div>
          <button
            onClick={onNavigateToReviews}
            className="text-xs sm:text-sm text-[#dfba73] hover:text-white font-bold border border-[#dfba73]/50 px-4 py-2 rounded-xl hover:bg-[#dfba73] cursor-pointer transition-colors"
          >
            {lang === "te" ? "అన్ని సమీక్షలు చదవండి & మీ రేటింగ్ రాయండి" : lang === "hi" ? "सभी समीक्षाएं पढ़ें और स्वाद अनुभव साझा करें" : "Read All Reviews & Share Your Taste Experience"}
          </button>
        </div>

        {/* Selected Highlight reviews in cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {reviews.slice(0, 3).map((rev) => (
            <div key={rev.id} className="bg-[#FFF9F2] border border-[#dfba73]/40 p-5 rounded-xl space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? "text-amber-555 fill-[#dfba73] text-[#dfba73]" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-700 italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#dfba73]/30 text-[10px]">
                <span className="font-bold text-[#5D4037] flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500 shrink-0" />
                  {rev.customerName}
                </span>
                <span className="text-gray-400 font-mono">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
