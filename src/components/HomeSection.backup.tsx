import { Bell, Flame, Award, Star, ArrowRight, ShieldCheck, Heart, Clock, ChevronRight } from "lucide-react";
import { Review, PushNotification } from "../types";
import { SwaadamLogo } from "./SwaadamLogo";

import { Language, translations } from "../translations";

interface HomeSectionProps {
  onOrderNow: () => void;
  onNavigateToReviews: () => void;
  reviews: Review[];
  notifications: PushNotification[];
  onDismissNotification: (id: string) => void;
  lang?: Language;
}

export function HomeSection({
  onOrderNow,
  onNavigateToReviews,
  reviews,
  notifications,
  onDismissNotification,
  lang = "en",
}: HomeSectionProps) {
  const t = translations[lang];

  // Real gallery representation matching user's loaded traditional images
  const galleryItems = [
    {
      title: lang === "te" ? "సాంప్రదాయ సకినాలు" : lang === "hi" ? "पारंपरिक सकीनालु" : "Artisanal White Sakinalu",
      description: lang === "te" ? "బియ్యప్పిండి మరియు నువ్వులతో చేతితో చేసిన సాంప్రదాయ పండుగ సకినాలు." : lang === "hi" ? "चावल के आटे और तिल से बनी उत्कृष्ट सकीनालु।" : "Traditional Telangana festive spirals hand-shaped with rice flour and sesame seeds, drying under fresh morning sunlight.",
      tag: lang === "te" ? "సిగ్నేチャー" : lang === "hi" ? "विशेष" : "Signature",
      imageText: "🌀 White Sakinalu on muslin sheets",
      imageUrl: "https://study4sure.com/wp-content/uploads/2026/01/sakinalu-1024x576.jpg"
    },
    {
      title: lang === "te" ? "లేయర్డ్ గోల్డెన్ బాదుషా" : lang === "hi" ? "सुनहरी बालूशाही (बादुशा)" : "Layered Golden Badusha",
      description: lang === "te" ? "యాలకుల ఫ్లేవర్‌తో జ్యుసి సిరప్ పొరలతో కూడిన సాంప్రదాయ స్వీట్." : lang === "hi" ? "इलायची स्वाद और मीठी चाशनी से भरपूर परतदार बालूशाही।" : "Layered, crispy outer crust sweet donuts with a moist cardamom-glazed core.",
      tag: lang === "te" ? "బెస్ట్ సెల్లర్" : lang === "hi" ? "लोकप्रिय" : "Best Seller",
      imageText: "🍩 Crispy Glazed Badusha trays",
      imageUrl: "https://www.shutterstock.com/image-photo/balushahi-makhan-bada-indian-sweet-260nw-1076800412.jpg"
    },
    {
      title: lang === "te" ? "సాంప్రదాయ పప్పు గారెలు" : lang === "hi" ? "दाल गारेलु" : "Handmade Pappu Garelu",
      description: lang === "te" ? "శనగపప్పు, జీలకర్ర మరియు అల్లం ముక్కలతో ఎంతో రుచికరంగా వండిన తాజా గారెలు." : lang === "hi" ? "चना दाल और मसालों से तैयार करारे स्वादिष्ट गारेलु।" : "Sizzling golden savory donuts made of rich split Bengal gram, cumin, and fresh ginger.",
      tag: lang === "te" ? "సాయంత్రం స్పెషల్" : lang === "hi" ? "दैनिक ताजा" : "Daily Special",
      imageText: "🍘 Spiced Pappu Garelu",
      imageUrl: "https://dpfoods.in/wp-content/uploads/2025/01/11.png"
    }
  ];

  return (
    <div id="swaadam-home-view" className="space-y-16">
      
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

      {/* Hero Showcase banner */}
      <section id="hero-banner" className="relative min-h-[580px] flex items-center justify-center py-20 px-6 bg-gradient-to-b from-[#181818] via-[#121212] to-[#1a1a1a] rounded-3xl overflow-hidden border-2 border-[#C5A059] shadow-2xl shadow-[#C5A059]/10">
        {/* Background artistic overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.12),transparent_75%)] pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DFBA73]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl text-center z-10 space-y-6 relative flex flex-col items-center">
          {/* Main Logo Emblem in full glory */}
          <div className="mb-4 animate-fade-in hover:scale-105 transition-all duration-500 cursor-pointer">
            <SwaadamLogo size={220} />
          </div>

          <div className="inline-flex items-center gap-1.5 bg-[#C5A059]/10 border border-[#C5A059]/30 rounded-full px-5 py-2 text-[11px] text-[#DFBA73] font-bold tracking-widest uppercase font-mono mb-1">
            <Flame className="w-3.5 h-3.5 fill-[#DFBA73] animate-pulse text-[#DFBA73]" /> {t.appSub}
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.12]">
            {t.heroTitle}
          </h1>

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
              href="#gallery-showcase"
              className="w-full sm:w-auto border border-[#C5A059]/50 hover:bg-[#C5A059]/10 text-[#DFBA73] hover:text-white font-bold px-10 py-4 rounded-xl transition-colors text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer bg-transparent"
            >
              {t.exploreGallery}
            </a>
          </div>

          {/* Quick core metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-3xl mx-auto pt-10 text-center border-t border-[#C5A059]/20 mt-12">
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#DFBA73] font-mono leading-none">100%</p>
              <p className="text-[10px] text-[#E5CFA3]/75 uppercase tracking-widest mt-1.5 font-bold font-mono">{t.preservativeFree}</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#DFBA73] font-mono leading-none">30+</p>
              <p className="text-[10px] text-[#E5CFA3]/75 uppercase tracking-widest mt-1.5 font-bold font-mono">{t.snacksSweets}</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#DFBA73] font-mono leading-none">9666</p>
              <p className="text-[10px] text-[#E5CFA3]/75 uppercase tracking-widest mt-1.5 font-bold font-mono">{t.cookedOrder}</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-extrabold text-[#DFBA73] font-mono leading-none">GLOBAL</p>
              <p className="text-[10px] text-[#E5CFA3]/75 uppercase tracking-widest mt-1.5 font-bold font-mono">{t.worldwideDelivery}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Pillars */}
      <section id="trust-pillars" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white border border-[#FAD7A0] shadow-sm p-6 rounded-2xl space-y-3 hover:border-[#E67E22] transition-colors">
          <div className="w-10 h-10 bg-[#E67E22]/10 text-[#E67E22] rounded-xl flex items-center justify-center border border-[#FAD7A0]/60">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#5D4037]">{t.genuineRecipes}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.genuineDesc}
          </p>
        </div>

        <div className="bg-white border border-[#FAD7A0] shadow-sm p-6 rounded-2xl space-y-3 hover:border-[#E67E22] transition-colors">
          <div className="w-10 h-10 bg-[#E67E22]/10 text-[#E67E22] rounded-xl flex items-center justify-center border border-[#FAD7A0]/60">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#5D4037]">{t.cookedOrder}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {lang === "te" ? "మేము నిల్వ ఉండే ఆహారాన్ని విక్రయించము. ఆర్డర్ చేయగానే తాజాగా తయారుచేసి కొరియర్ చేస్తాము." : lang === "hi" ? "हम पहले से पैक भोजन नहीं बेचते। जब आप ऑर्डर करते हैं हम इसे तुरंत तैयार करके भेजते हैं।" : "We do not stockpile stale foods. When you hit check-out, we light the hearth, cook your sweets, package them warm inside sealed boxes and dispatch!"}
          </p>
        </div>

        <div className="bg-white border border-[#FAD7A0] shadow-sm p-6 rounded-2xl space-y-3 hover:border-[#E67E22] transition-colors">
          <div className="w-10 h-10 bg-[#E67E22]/10 text-[#E67E22] rounded-xl flex items-center justify-center border border-[#FAD7A0]/60">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#5D4037]">{t.premiumHygiene}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.premiumDesc}
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery-showcase" className="scroll-mt-10 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[#E67E22] font-mono text-xs tracking-widest uppercase block">{t.dailySpecials}</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5D4037] tracking-tight">
            {t.artisanalGallery}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {t.galleryDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#FAD7A0] rounded-2xl overflow-hidden group hover:border-[#E67E22] transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              {/* Photo Representation Box */}
              <div className="h-44 bg-orange-50/50 relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037]/60 via-transparent to-[#5D4037]/45 pointer-events-none" />
                
                {/* Visual Label overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none">
                  <span className="text-[10px] sm:text-[11px] font-mono font-extrabold tracking-wider text-[#FFE5A3] uppercase block drop-shadow-md">
                    {item.imageText}
                  </span>
                </div>
                
                <span className="absolute top-3 right-3 text-[9px] bg-neutral-950/80 text-[#dfba73] border border-[#dfba73]/40 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider backdrop-blur-xs">
                  {item.tag}
                </span>
              </div>

               {/* Photo Caption Box */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-[#5D4037] group-hover:text-[#E67E22] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#FAD7A0]/40 flex justify-between items-center text-[10px]">
                  <span className="text-gray-400 font-mono">Swaadam Handcrafted</span>
                  <button
                    onClick={onOrderNow}
                    className="text-[#E67E22] font-semibold flex items-center gap-0.5 group-hover:underline cursor-pointer"
                  >
                    {t.exploreMenu} <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Reviews Spotlight Section */}
      <section id="reviews-spotlight" className="bg-white border border-[#FAD7A0] shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <span className="text-[#E67E22] font-mono text-xs tracking-widest uppercase block">
              {lang === "te" ? "మా వినియోగదారుల అభిప్రాయం" : lang === "hi" ? "हमारे ग्राहकों के विचार" : "Voice of our Food Lovers"}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#5D4037]">{t.reviewsTitle}</h3>
          </div>
          <button
            onClick={onNavigateToReviews}
            className="text-xs sm:text-sm text-[#E67E22] hover:text-white font-bold border border-[#E67E22]/30 px-4 py-2 rounded-xl hover:bg-[#E67E22] cursor-pointer transition-colors"
          >
            {lang === "te" ? "అన్ని సమీక్షలు చదవండి & మీ రేటింగ్ రాయండి" : lang === "hi" ? "सभी समीक्षाएं पढ़ें और स्वाद अनुभव साझा करें" : "Read All Reviews & Share Your Taste Experience"}
          </button>
        </div>

        {/* Selected Highlight reviews in cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {reviews.slice(0, 3).map((rev) => (
            <div key={rev.id} className="bg-[#FFF9F2] border border-[#FAD7A0]/60 p-5 rounded-xl space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < rev.rating ? "text-amber-550 fill-[#E67E22] text-[#E67E22]" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-700 italic leading-relaxed">
                  "{rev.text}"
                </p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#FAD7A0]/40 text-[10px]">
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
