import { useState, useEffect } from "react";
import { Search, ShoppingBasket, Plus, Minus, Info, AlertTriangle, Sparkles, CheckCircle } from "lucide-react";
import { Product } from "../types";
import { Language, translations, translateItemName } from "../translations";

const DEFAULT_FALLBACK_IMG = "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80";
const getFoodImage = (name: string, category: string): string => {
  const normName = name.toLowerCase();
  const normCat = category.toLowerCase();

  // High-priority specific overrides
  if (normName.includes("spicy shanaga pappu") || normName.includes("shanaga pappu fry")) {
    return "https://res.cloudinary.com/dplgcubw5/image/upload/f_auto,q_auto,w_600/v1781761316/WhatsApp_Image_2026-06-18_at_10.00.04_AM_fpdwvp.jpg";
  }
  if (normName.includes("pachhi mirchi garelu") || normName.includes("pachi mirchi garelu") || normName.includes("mirchi garelu")) {
    return "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRh5uH-zlkCR7BLzdMTujfe49VoSRMPhWnut4pghKLuWnYd1IC8";
  }

  // Garelu specific matches
  if (normName.includes("shanaga")) {
    return "https://www.telanganapindivantalu.in/wp-content/uploads/2019/12/Karabilallu-pappu.jpg";
  }
  if (normName.includes("palli garelu")) {
    return "https://www.distacart.com/cdn/shop/products/4lFmQ23PA3_1280x.jpg?v=1623155331";
  }
  if (normName.includes("pappu garelu") || normName.includes("garelu")) {
    return "https://dpfoods.in/wp-content/uploads/2025/01/11.png";
  }

  // Sakinalu match
  if (normName.includes("karam sakinalu")) {
    return "https://www.karkarafoods.com/media/items/Karam%20Sakinalu/telangana-snack-karam-sakinalu-main.jpeg";
  }
  if (normName.includes("sakinalu")) {
    return "https://study4sure.com/wp-content/uploads/2026/01/sakinalu-1024x576.jpg";
  }

  // Murukulu & Karapusa matches
  if (normName.includes("salted murukulu")) {
    return "https://5.imimg.com/data5/SELLER/Default/2021/9/ZU/PA/PM/51213938/butter-salted-murukku-chakli-500x500.jpg";
  }
  if (normName.includes("karam murukulu")) {
    return "https://i.ytimg.com/vi/FMnZhYHB3gE/hqdefault.jpg";
  }
  if (normName.includes("karapusa")) {
    return "https://5.imimg.com/data5/LV/LQ/MY-24852937/sev-namkeen-1000x1000.jpg";
  }
  if (normName.includes("chegodilu") || normName.includes("pappu chegodilu")) {
    return "https://i.ytimg.com/vi/uaEtIocWY8o/maxresdefault.jpg";
  }

  // Sweets - distinct from homemade
  if (normName.includes("boondi laddu")) {
    return "https://cookingfromheart.com/wp-content/uploads/2019/10/Boondi-Laddu-1.jpg";
  }
  if (normName.includes("badusha")) {
    return "https://www.shutterstock.com/image-photo/balushahi-makhan-bada-indian-sweet-260nw-1076800412.jpg";
  }
  if (normName.includes("burelu")) {
    return "https://res.cloudinary.com/dplgcubw5/image/upload/f_auto,q_auto,w_600/v1781714903/burelu_scbbad.jpg";
  }
  if (normName.includes("kobbariladdu") || normName.includes("kobbari laddu") || normName.includes("coconut")) {
    return "https://tse4.mm.bing.net/th/id/OIP.63XwyL1xmd72EborhbjPwQHaGK?r=0&pid=ImgDet&w=184&h=153&c=7&dpr=1.3&o=7&rm=3";
  }
  if (normName.includes("ravva laddu")) {
    return "https://tse1.explicit.bing.net/th/id/OIP.I1yz2qwQ-dpRact-oE63vAHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
  }
  if (normName.includes("chekkari karijelu")) {
    return "https://i.pinimg.com/736x/a4/6f/0e/a46f0eefadc51894bdced0b946b53ce0.jpg";
  }
  if (normName.includes("bellam karijelu")) {
    return "https://thedesifood.com/media/Almond%20House%20Bellam%20Kajjikayalu,%20250%20g-1.webp";
  }
  if (normName.includes("chekkari gavvalu")) {
    return "https://i.ytimg.com/vi/xO-VIopAEGw/maxresdefault.jpg";
  }
  if (normName.includes("bellam gavvalu")) {
    return "https://tse2.mm.bing.net/th/id/OIP.8J7TXR_QqoXXmsDXy0uEZgHaEb?r=0&w=800&h=479&rs=1&pid=ImgDetMain&o=7&rm=3";
  }
  if (normName.includes("nuvvula laddu") || normName.includes("nuvvulu laddu") || normName.includes("sesame")) {
    return "https://foodiesterminal.com/wp-content/uploads/2020/01/til-gud-laddu-1.jpg";
  }
  if (normName.includes("palli laddu")) {
    return "https://cpimg.tistatic.com/05141512/b/4/Kadalai-Mittai.jpg";
  }
  if (normName.includes("nuvvulu & pallilu laddu") || normName.includes("nuvvulu & pallilu")) {
    return "https://i.pinimg.com/736x/38/72/65/3872658d34ea30d80184e9d5fafe954f.jpg";
  }
  if (normName.includes("ragi bellam") || normName.includes("raagi bellam")) {
    return "https://pappaladabba.com/wp-content/uploads/2023/10/1000-X-1000-v01-bsn.jpg";
  }
  if (normName.includes("minapa bellam")) {
    return "https://4.bp.blogspot.com/-pcwSLrQtyDk/ULTYDOoLotI/AAAAAAAAD7Y/YGamq6qPNNM/s1600/P1060644.JPG";
  }
  if (normName.includes("pesara bellam")) {
    return "https://1.bp.blogspot.com/_Y0frr_D4Cj4/TKoZDohQIqI/AAAAAAAAApo/NSCu_akhI5M/s1600/DSC08764.JPG";
  }
  if (normName.includes("sunnundalu")) {
    return "https://theyummydelights.com/wp-content/uploads/2021/09/peanut-ladoo-recipe-720x720.jpg";
  }
  if (normName.includes("sabudhana fry") || normName.includes("sabudhana")) {
    return "https://5.imimg.com/data5/SELLER/Default/2023/10/353313680/RM/XE/ON/128182712/dsc00844-500x500.jpg";
  }
  if (normName.includes("spicy boondi") || normName.includes("boondi")) {
    return "https://i.ytimg.com/vi/KQeGjaCLzHc/maxresdefault.jpg";
  }
  if (normName.includes("spicy palli") || normName.includes("palli")) {
    return "https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2021/11/22/masala-kappalandi.jpg?w=1120&h=583";
  }
  if (normName.includes("makka pottu") || normName.includes("corn flakes")) {
    return "https://5.imimg.com/data5/UN/HY/MY-10407558/corn-flakes-mixture-500x500.png";
  }
  if (normName.includes("salted mungdhal") || normName.includes("moong dal") || normName.includes("mungdhal") || normName.includes("moongdal")) {
    return "https://5.imimg.com/data5/SELLER/Default/2022/7/ZV/YQ/XL/86436838/salted-moong-dal-namkeen-1000x1000.jpg";
  }
  if (normName.includes("paper chuda") || normName.includes("atukulu") || normName.includes("chuda")) {
    return "https://i.ytimg.com/vi/0WfFbyQKbr0/maxresdefault.jpg";
  }

  if (normName.includes("tomato pickle")) {
    return "https://m.media-amazon.com/images/I/618FlTMxrjL._SL1280_.jpg";
  }
  if (normName.includes("kakarakaya pickle")) {
    return "https://tse4.mm.bing.net/th/id/OIP.UTPqcuykE2bOE0CnBMzqsAHaEo?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
  }
  if (normName.includes("mango allam pickle")) {
    return "https://5.imimg.com/data5/IZ/FS/FT/SELLER-105950955/mango-allam-avakaya-pickle-1000x1000.jpg";
  }
  if (normName.includes("mango pickle")) {
    return "https://tiimg.tistatic.com/fp/1/007/913/easy-to-digest-good-in-taste-mango-pickle-with-no-artificial-colors-and-no-preservatives-775.jpg";
  }
  if (normName.includes("pulihora pickle")) {
    return "https://i.ytimg.com/vi/0szaDieKqpY/maxresdefault.jpg";
  }
  if (normName.includes("chicken boneless")) {
    return "https://tse3.mm.bing.net/th/id/OIP.7kuP_XwSwvcHNRnbvuod_QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
  }
  if (normName.includes("chicken with bone")) {
    return "https://tse4.mm.bing.net/th/id/OIP.S89vjkmDYwGMMMLRRCDxqgHaHu?r=0&rs=1&pid=ImgDetMain&o=7&rm=3";
  }
  if (normName.includes("mutton boneless")) {
    return "https://prepmypickle.com/wp-content/uploads/2025/03/Mutton-Pickle.webp";
  }
  if (normName.includes("mutton with bone")) {
    return "https://anumoluhomefoods.com/wp-content/uploads/2025/07/mutton-bone-pickle.webp";
  }
  if (normName.includes("fish pickle") || normName.includes("koramenu")) {
    return "https://5.imimg.com/data5/ANDROID/Default/2022/1/ZG/CF/RB/145196166/product-jpeg-500x500.jpg";
  }
  if (normName.includes("laddu")) {
    return "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80";
  }

  // Fallbacks by category
  if (normCat === "garelu") {
    return "https://dpfoods.in/wp-content/uploads/2025/01/11.png";
  }
  if (normCat === "sakinalu") {
    return "https://study4sure.com/wp-content/uploads/2026/01/sakinalu-1024x576.jpg";
  }
  if (normCat === "murukulu") {
    return "https://5.imimg.com/data5/SELLER/Default/2021/9/ZU/PA/PM/51213938/butter-salted-murukku-chakli-500x500.jpg";
  }
  if (normCat === "sweets") {
    return "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80";
  }
  if (normCat === "sunnundalu") {
    return "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80";
  }
  if (normCat === "mixtures") {
    return "https://5.imimg.com/data5/SELLER/Default/2023/10/353313680/RM/XE/ON/128182712/dsc00844-500x500.jpg";
  }
  if (normCat === "pickles") {
    return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80";
  }

  return "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80";
};

interface MenuSectionProps {
  products: Product[];
  cart: Record<string, number>; // productId -> quantity (in kg)
  onAddToCart: (productId: string, quantity: number) => void;
  onUpdateCartQty: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onNavigateToCart: () => void;
  lang?: Language;
}

export function MenuSection({
  products,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onRemoveFromCart,
  onNavigateToCart,
  lang = "en",
}: MenuSectionProps) {
  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<string>(() => {
    return sessionStorage.getItem("swaadam_selected_category") || "ALL";
  });

  const handleTabChange = (cat: string) => {
    setActiveTab(cat);
    sessionStorage.setItem("swaadam_selected_category", cat);
  };

  // Scroll to the top of the window when the chosen category changes so the user begins exploring from the 1st item
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["ALL", "GARELU", "SAKINALU", "MURUKULU", "SWEETS", "SUNNUNDALU", "MIXTURES", "PICKLES"];

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "ALL": return t.all;
      case "GARELU": return lang === "te" ? "గారెలు" : lang === "hi" ? "गारेलु" : "Garelu";
      case "SAKINALU": return lang === "te" ? "సకినాలు" : lang === "hi" ? "सकीनालु" : "Sakinalu";
      case "MURUKULU": return lang === "te" ? "మురుకులు" : lang === "hi" ? "मुरुतुलु" : "Murukulu";
      case "SWEETS": return lang === "te" ? "మధురములు (స్వీట్స్)" : lang === "hi" ? "पारंपरिक मिठाइयाँ" : "Traditional Sweets";
      case "SUNNUNDALU": return lang === "te" ? "సున్నుండలు" : lang === "hi" ? "सुन्नुंडालु" : "Sunnundalu";
      case "MIXTURES": return lang === "te" ? "ప్రీమియం మిక్సర్స్" : lang === "hi" ? "प्रीमियम मिक्सचर्स" : "Premium Mixtures";
      case "PICKLES": return lang === "te" ? "నిల్వ పచ్చళ్ళు" : lang === "hi" ? "पारंपरिक अचार" : "Traditional Pickles";
      default: return cat;
    }
  };

  // Filter products based on active tab and search query
  const filteredProducts = products.filter((p) => {
    const matchesTab = activeTab === "ALL" || p.category === activeTab;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Calculate cart metrics
  const totalCartItems = Object.keys(cart).length;
  const totalCartCost = Object.entries(cart).reduce((sum, [pId, qty]) => {
    const p = products.find((prod) => prod.id === pId);
    return sum + (p ? p.price * qty : 0);
  }, 0);

  const getProductQtyInCart = (id: string) => cart[id] || 0;

  return (
    <section id="swaadam-menu-section" className="space-y-8 min-h-[600px] text-neutral-800 scroll-mt-20">
      
      {/* Intro Heading - Premium Light Saffron and Chocolate style */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 border-b border-[#FAD7A0]/60 pb-6">
        <div>
          <span className="text-[#E67E22] font-mono text-xs tracking-widest uppercase block mb-1 font-bold">{t.appSub}</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5D4037] tracking-tight">
            {t.menuTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1.5 max-w-xl">
            {t.menuDesc}
          </p>
        </div>

        {/* Search Row */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-800 placeholder-gray-450 focus:outline-none focus:ring-1 focus:ring-[#E67E22]/20 shadow-xs"
          />
        </div>
      </div>

      {/* Categories Tabs Filter */}
      <div className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-none">
        <div className="flex gap-2 min-w-max pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              className={`text-xs px-4.5 py-2.5 rounded-xl border font-bold transition-all duration-200 cursor-pointer ${
                activeTab === cat
                  ? "bg-[#E67E22] border-[#E67E22] text-white font-extrabold shadow-sm shadow-orange-100"
                  : "bg-white hover:bg-orange-50/40 border-[#FAD7A0]/70 text-[#5D4037]"
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-[#FAD7A0]/60 rounded-2xl bg-white shadow-inner">
          <AlertTriangle className="w-10 h-10 text-[#E67E22]/60 mx-auto mb-4" />
          <p className="text-[#5D4037] font-bold">No Traditional Foods Found</p>
          <p className="text-xs text-gray-500 mt-1">Try adapting your keyword search or switching tabs</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const qty = getProductQtyInCart(p.id);
            return (
              <div
                key={p.id}
                className={`bg-white border transition-all duration-300 rounded-2xl p-5 flex flex-col justify-between relative group ${
                  qty > 0 
                    ? "border-[#E67E22] ring-1 ring-[#E67E22]/30 bg-orange-50/10 shadow-md shadow-orange-100/30" 
                    : "border-[#FAD7A0]/70 hover:border-[#E67E22] shadow-xs hover:shadow-md hover:shadow-orange-100/10"
                }`}
              >
                {/* Visual Accent Corner for Selected */}
                {qty > 0 && (
                  <div className="absolute top-0 right-0 bg-[#E67E22] text-[#FCFAF4] text-[9px] px-3 py-1 rounded-bl-xl rounded-tr-xl font-extrabold uppercase tracking-wider flex items-center gap-1 z-10 animate-fade-in">
                    <CheckCircle className="w-3 h-3 fill-white text-[#E67E22]" /> Loaded
                  </div>
                )}

                {/* Product Image Card Cover */}
                <div 
                  className="w-full h-40 bg-orange-50/50 rounded-xl overflow-hidden border border-[#FAD7A0]/45 relative cursor-pointer mb-3"
                  onClick={() => setSelectedProduct(p)}
                >
                  <img
                    src={getFoodImage(p.name, p.category)}
                    alt={p.name}
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
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Card Content Top half */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-orange-50 text-[#E67E22] border border-[#FAD7A0]/45 py-0.5 px-2.5 rounded-full font-bold uppercase tracking-widest font-mono">
                      {p.category}
                    </span>
                    
                    {/* Status badges based on availability */}
                    {!p.isAvailable ? (
                      <span className="text-[9px] bg-red-50 text-red-700 border border-red-200 py-0.5 px-2 rounded-full font-bold uppercase font-mono">
                        {lang === "te" ? "ప్రస్తుతం లేదు" : lang === "hi" ? "अनुपलब्ध" : "Temporarily Out"}
                      </span>
                    ) : p.estimatedDays ? (
                      <span className="text-[9px] bg-blue-50 text-blue-700 border border-blue-200 py-0.5 px-2 rounded-full font-bold uppercase font-mono flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5 text-[#E67E22]" /> {lang === "te" ? `${p.estimatedDays} రోజుల్లో సిద్ధం` : lang === "hi" ? `${p.estimatedDays} दिन में तैयार` : `Prep ${p.estimatedDays} Days`}
                      </span>
                    ) : (
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 py-0.5 px-2 rounded-full font-bold uppercase font-mono">
                        {lang === "te" ? "తాజా వంటకం" : lang === "hi" ? "ताजा भोजन" : "Cooked Fresh"}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3
                      className="font-extrabold text-[#5D4037] text-base hover:text-[#E67E22] transition-colors cursor-pointer"
                      onClick={() => setSelectedProduct(p)}
                    >
                      {translateItemName(p.name, lang)}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>

                {/* Card footer: Pricing and dynamic counter */}
                <div className="mt-5 pt-4 border-t border-[#FAD7A0]/35 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{lang === "te" ? "కిలో ధర" : lang === "hi" ? "प्रति किलो" : "Per kg"}</p>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-gray-400 line-through font-mono">
                        ₹{Math.round(p.price / 0.9)}
                      </span>
                      <span className="text-base font-extrabold text-[#5D4037] font-mono">
                        ₹{p.price}/-
                      </span>
                      <span className="text-[9px] bg-red-50 text-red-650 border border-red-150 font-black px-1.5 py-0.5 rounded-md">
                        10% OFF
                      </span>
                    </div>
                  </div>

                  <div>
                    {!p.isAvailable ? (
                      <button
                        disabled
                        className="bg-orange-50 text-gray-400 border border-[#FAD7A0]/45 text-xs px-4 py-2 rounded-xl cursor-not-allowed font-bold"
                      >
                        {lang === "te" ? "అయిపోయింది" : lang === "hi" ? "समाप्त" : "Sold Out"}
                      </button>
                    ) : qty === 0 ? (
                      <button
                        onClick={() => onAddToCart(p.id, 1)}
                        className="bg-[#E67E22] hover:bg-[#D35400] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-orange-150 hover:scale-[1.01] flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> {lang === "te" ? "చేర్చు (1 kg)" : lang === "hi" ? "जोड़ें (1 kg)" : "Add (1 kg)"}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2.5 bg-orange-50 border border-[#FAD7A0] px-2 py-1.5 rounded-xl">
                        <button
                          onClick={() => {
                            if (qty <= 0.5) {
                              onRemoveFromCart(p.id);
                            } else {
                              onUpdateCartQty(p.id, qty - 0.5);
                            }
                          }}
                          className="bg-white hover:bg-orange-100 border border-[#FAD7A0]/60 text-[#E67E22] p-1 rounded-lg cursor-pointer transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        
                        <span className="text-xs font-black text-[#5D4037] font-mono min-w-8 text-center">
                          {qty} kg
                        </span>

                        <button
                          onClick={() => onUpdateCartQty(p.id, qty + 0.5)}
                          className="bg-white hover:bg-orange-100 border border-[#FAD7A0]/60 text-[#E67E22] p-1 rounded-lg cursor-pointer transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Detail info popover trigger */}
                <div className="text-right mt-2">
                  <button
                    onClick={() => setSelectedProduct(p)}
                    className="text-[10px] text-[#E67E22] hover:text-[#D35400] font-bold inline-flex items-center gap-1 cursor-pointer hover:underline underline-offset-2"
                  >
                    {lang === "te" ? "వివరాలు చూడండి" : lang === "hi" ? "विवरण देखें" : "View Details"} <Info className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Interactive Detail Modal Backdrop */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-[#5D4037]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#E67E22] rounded-2xl p-6 max-w-sm sm:max-w-md w-full relative space-y-4 shadow-2xl">
            {/* Modal Image banner */}
            <div className="w-full h-48 bg-orange-50/50 rounded-xl overflow-hidden border border-[#FAD7A0]/45 relative">
              <img
                src={getFoodImage(selectedProduct.name, selectedProduct.category)}
                alt={selectedProduct.name}
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.hasFallback) {
                    target.dataset.hasFallback = "true";
                    target.src = DEFAULT_FALLBACK_IMG;
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>
            
            <h3 className="text-lg font-extrabold text-[#5D4037] tracking-tight">{translateItemName(selectedProduct.name, lang)}</h3>
            
            <span className="text-xs bg-orange-50 text-[#E67E22] border border-[#FAD7A0]/50 py-1.5 px-3 rounded-full font-bold uppercase tracking-wider font-mono inline-block">
              {lang === "te" ? "వర్గం" : lang === "hi" ? "श्रेणी" : "Category"}: {getCategoryLabel(selectedProduct.category)}
            </span>
            
            <p className="text-xs leading-relaxed text-gray-700">
              {selectedProduct.description || "Traditional recipe prepared carefully to retain organic hygiene and authentic Telangana spice signatures."}
            </p>
            
            <div className="pt-3 border-t border-[#FAD7A0]/45 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-400 block font-bold uppercase">{lang === "te" ? "కిలో ధర" : lang === "hi" ? "प्रति किलो" : "Rate per kg"}</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-gray-400 line-through font-mono">
                    ₹{Math.round(selectedProduct.price / 0.9)}
                  </span>
                  <span className="text-base font-black text-[#E67E22] font-mono">₹{selectedProduct.price}/-</span>
                  <span className="text-[9px] bg-red-50 text-red-650 border border-red-150 font-black px-1.5 py-0.5 rounded-sm">
                    10% OFF
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#5D4037] font-bold italic bg-orange-50/60 p-1 px-3 rounded border border-orange-100">
                {lang === "te" ? "తాజా గృహ వంటకం" : lang === "hi" ? "ताजा घर का भोजन" : "Fresh house kitchen yield"}
              </span>
            </div>
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 w-full bg-[#E67E22] hover:bg-[#D35400] text-white transition-all py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
            >
              {lang === "te" ? "వివరాలు మూసివేయి" : lang === "hi" ? "विवरण बंद करें" : "Close Details"}
            </button>
          </div>
        </div>
      )}

      {/* Sticky Cart Strip (Visible when items are in cart) */}
      {totalCartItems > 0 && (
        <div id="sticky-cart-strip" className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-[#E67E22] rounded-2xl p-4 w-[92%] max-w-xl shadow-2xl shadow-orange-100/80 flex items-center justify-between z-40 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="bg-[#E67E22] text-white p-2.5 rounded-xl shadow-sm">
              <ShoppingBasket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-black text-[#5D4037]">{lang === "te" ? "మీ సాంప్రదాయ బుట్ట" : lang === "hi" ? "आपकी टोकरी" : "Your Traditional Basket"} ({totalCartItems})</p>
              <p className="text-sm font-black text-[#E67E22] font-mono">₹{totalCartCost}/- <span className="text-[9px] text-gray-400 font-bold">{lang === "te" ? "సుమారు మొత్తం" : lang === "hi" ? "अनुमानित कुल" : "approx total"}</span></p>
            </div>
          </div>

          <button
            onClick={onNavigateToCart}
            className="bg-[#E67E22] hover:bg-[#D35400] text-white text-xs font-extrabold px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer"
          >
            {lang === "te" ? "బుట్టను సరిచూసుకోండి & ఆర్డర్ చేయండి" : lang === "hi" ? "बास्केट जांचें और ऑर्डर करें" : "Review & Checkout Swaadam"}
          </button>
        </div>
      )}

    </section>
  );
}
