import { useState, useEffect } from "react";
import {
  Home,
  Utensils,
  ShoppingBasket,
  Star,
  MapPin,
  Clock,
  Phone,
  Shield,
  Volume2,
  Bell,
  X,
  MessageSquare,
  Sparkles,
  Menu
} from "lucide-react";

// Components
import { HomeSection } from "./components/HomeSection";
import { MenuSection } from "./components/MenuSection";
import { CartSection } from "./components/CartSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { ContactSection } from "./components/ContactSection";
import { ManagerSection } from "./components/ManagerSection";
import { LiveChat } from "./components/LiveChat";
import { SwaadamLogo } from "./components/SwaadamLogo";
import { UserAuthButton } from "./components/UserAuthButton";
import { User as FirebaseUser } from "firebase/auth";
import { subscribeToAuth, saveReviewToFirestore, subscribeToFirestoreOrders, subscribeToFirestoreReviews } from "./services/firebaseService";
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_NOTIFICATIONS } from "./data/initialData";

// Types
import { Product, Order, Review, PushNotification } from "./types";
import { Language, translations } from "./translations";

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("swaadam_lang");
    return (saved as Language) || "en";
  });

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("swaadam_lang", newLang);
  };

  const t = translations[lang];
  const [activeTab, setActiveTab] = useState<"home" | "menu" | "cart" | "reviews" | "contact" | "manager">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Real-time backend state variables initialized with reliable default data
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  
  // Firebase Authenticated user state
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  // Local shopping cart: productId -> quantity in Kilograms (e.g. 1.5)
  const [cart, setCart] = useState<Record<string, number>>({});

  // Checkout modal confirmations
  const [checkedOutId, setCheckedOutId] = useState<string | null>(null);
  const [whatsappRedirectUrl, setWhatsappRedirectUrl] = useState<string>("");

  // Live Toast push notification
  const [activeToast, setActiveToast] = useState<PushNotification | null>(null);
  const [seenNotificationIds, setSeenNotificationIds] = useState<Set<string>>(new Set());

  // Safe JSON fetch utility to prevent "Unexpected token '<' / doctype" errors when proxies return HTML
  const fetchJsonSafely = async <T,>(url: string): Promise<T | null> => {
    try {
      const res = await fetch(url, {
        headers: { "Accept": "application/json" },
      });
      if (!res.ok) return null;
      const contentType = res.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        return null;
      }
      const text = await res.text();
      if (!text || text.trim().startsWith("<")) {
        return null;
      }
      return JSON.parse(text) as T;
    } catch {
      return null;
    }
  };

  // API Data fetching with safe parsing and error guards
  const refreshMenuData = async () => {
    const data = await fetchJsonSafely<Product[]>("/api/menu");
    if (data && Array.isArray(data) && data.length > 0) {
      setProducts(data);
    }
  };

  const refreshOrdersData = async () => {
    const data = await fetchJsonSafely<Order[]>("/api/orders");
    if (data && Array.isArray(data)) {
      setOrders(data);
      
      // Dynamic push update if order from active customer is transitioned!
      const adminToken = localStorage.getItem("swaadam_admin_token");
      if (!adminToken) {
        const userPhone = localStorage.getItem("customer_phone");
        if (userPhone) {
          const customerActiveOrders = data.filter((o: Order) => o.phone === userPhone);
          customerActiveOrders.forEach((o: Order) => {
            if (o.status !== "Pending" && o.notificationSent && !seenNotificationIds.has(o.id + o.status)) {
              setActiveToast({
                id: o.id + o.status,
                title: `🔥 Order status update: ${o.id}`,
                message: `Your food crate has transitioned to: ${o.status}! Our chef compiled it with absolute fresh quality!`,
                type: "info",
                createdAt: new Date().toISOString()
              });
              seenNotificationIds.add(o.id + o.status);
              setSeenNotificationIds(new Set(seenNotificationIds));
            }
          });
        }
      }
    }
  };

  const refreshReviewsData = async () => {
    const data = await fetchJsonSafely<Review[]>("/api/reviews");
    if (data && Array.isArray(data) && data.length > 0) {
      setReviews(data);
    }
  };

  const refreshNotificationsData = async () => {
    const data = await fetchJsonSafely<PushNotification[]>("/api/notifications");
    if (data && Array.isArray(data)) {
      setNotifications(data);

      if (data.length > 0) {
        const newest = data[0];
        if (!seenNotificationIds.has(newest.id)) {
          setActiveToast(newest);
          seenNotificationIds.add(newest.id);
          setSeenNotificationIds(new Set(seenNotificationIds));
        }
      }
    }
  };

  // Initial loads, real-time polling synchronizations, and Firestore backups
  useEffect(() => {
    refreshMenuData();
    refreshOrdersData();
    refreshReviewsData();
    refreshNotificationsData();

    // Firebase Auth listener
    const unsubscribeAuth = subscribeToAuth((user) => {
      setFirebaseUser(user);
    });

    // Firestore real-time listeners for persistent sync across cloud
    const unsubscribeOrders = subscribeToFirestoreOrders((cloudOrders) => {
      if (cloudOrders && cloudOrders.length > 0) {
        setOrders(cloudOrders);
      }
    });

    const unsubscribeReviews = subscribeToFirestoreReviews((cloudReviews) => {
      if (cloudReviews && cloudReviews.length > 0) {
        setReviews(cloudReviews);
      }
    });

    const interval = setInterval(() => {
      refreshMenuData();
      refreshOrdersData();
      refreshNotificationsData();
    }, 4000);

    return () => {
      clearInterval(interval);
      unsubscribeAuth();
      unsubscribeOrders();
      unsubscribeReviews();
    };
  }, []);

  // Scroll to top of the page whenever the active tab changes to ensure starting from the 1st item
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  // Shopping Cart Actions
  const handleAddToCart = (productId: string, qty: number = 1) => {
    setCart((prev) => ({
      ...prev,
      [productId]: qty,
    }));
  };

  const handleUpdateCartQty = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) => ({
      ...prev,
      [productId]: quantity,
    }));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  // Submit written review with permanent Firestore backup
  const handlePostReview = async (customerName: string, rating: number, text: string) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName, rating, text }),
      });
      if (res.ok) {
        const text = await res.text();
        const data = text && !text.trim().startsWith("<") ? JSON.parse(text) : {};
        if (data.review) {
          saveReviewToFirestore(data.review).catch((err) =>
            console.warn("Firestore review backup notice:", err)
          );
        }
        refreshReviewsData();
      }
    } catch (err) {
      console.error("Review posting failed:", err);
    }
  };

  const handlePlaceOrderSuccess = (orderId: string, whatsappUrl: string) => {
    // Keep track of phone to notify status updates later
    const userPhone = orders.find(o => o.id === orderId)?.phone || localStorage.getItem("customer_phone");
    if (userPhone) {
      localStorage.setItem("customer_phone", userPhone);
    }
    
    setCheckedOutId(orderId);
    setWhatsappRedirectUrl(whatsappUrl);
    // Move tab to home or success window
    setActiveTab("home");
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled", cancelReason: "Order cancelled by customer" }),
      });
      if (response.ok) {
        refreshOrdersData();
        setActiveToast({
          id: orderId + "Cancelled",
          title: "❌ Order Cancelled Successfully",
          message: `Your order ${orderId} has been successfully cancelled and removed from active preparation queues.`,
          type: "info",
          createdAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error("Failed to cancel order status:", err);
    }
  };

  const currentCartSize = Object.keys(cart).length;

  return (
    <div id="swaadam-app-root" className="min-h-screen bg-[#FFF9F2] font-sans text-neutral-800 selection:bg-[#E67E22] selection:text-white">
      
      {/* Upper Swaadam Official Meta Info strip */}
      <header id="store-banner-strip" className="bg-white border-b border-[#FAD7A0] text-[11px] py-2 px-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-2 font-mono scroll-mt-0 text-[#5D4037]">
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[#5D4037] items-center">
          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#E67E22]" /> {t.addressStrip}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#E67E22]" /> {t.timings}</span>
        </div>
        <div className="flex items-center gap-4 flex-wrap justify-center">
          {/* Language Selector */}
          <div className="flex bg-orange-50 border border-[#FAD7A0]/70 p-0.5 rounded-lg text-[10px] font-bold">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`px-2 py-1 rounded transition-all cursor-pointer ${lang === "en" ? "bg-[#E67E22] text-white" : "text-[#5D4037] hover:bg-orange-100"}`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange("te")}
              className={`px-2 py-1 rounded transition-all cursor-pointer ${lang === "te" ? "bg-[#E67E22] text-white" : "text-[#5D4037] hover:bg-orange-100"}`}
            >
              తెలుగు
            </button>
            <button
              onClick={() => handleLanguageChange("hi")}
              className={`px-2 py-1 rounded transition-all cursor-pointer ${lang === "hi" ? "bg-[#E67E22] text-white" : "text-[#5D4037] hover:bg-orange-100"}`}
            >
              हिंदी
            </button>
          </div>

          <span className="text-[#E67E22] font-semibold">|</span>

          <span className="text-gray-405 font-bold">{t.hotline}:</span>
          <a href="tel:9666696274" className="text-[#E67E22] font-extrabold hover:underline transition-all flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 fill-[#E67E22] text-[#E67E22]" /> +91 9666696274
          </a>
        </div>
      </header>

      {/* Main navigation Header bar */}
      <nav id="navbar" className="bg-white/90 backdrop-blur-md border-b border-[#FAD7A0] sticky top-0 z-30 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* Logo Brand Brand */}
          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <SwaadamLogo size={36} />
            <div>
              <p className="font-extrabold tracking-tight leading-none text-[#DFBA73] text-sm group-hover:text-[#F5D792] transition-colors uppercase">
                {t.appName}
              </p>
              <p className="text-[9px] text-[#E5CFA3]/80 font-semibold uppercase tracking-wider mt-1">{t.appSub}</p>
            </div>
          </div>

          {/* Desktop Navigation row */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "home" ? "bg-[#E67E22] text-white font-bold" : "text-[#5D4037] hover:text-[#E67E22] hover:bg-orange-50/50"
              }`}
            >
              <Home className="w-4 h-4" /> {t.home}
            </button>

            <button
              id="cta-menu-btn"
              onClick={() => setActiveTab("menu")}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "menu" ? "bg-[#E67E22] text-white font-bold" : "text-[#5D4037] hover:text-[#E67E22] hover:bg-orange-50/50"
              }`}
            >
              <Utensils className="w-4 h-4" /> {t.dailyMenu}
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "reviews" ? "bg-[#E67E22] text-white font-bold" : "text-[#5D4037] hover:text-[#E67E22] hover:bg-orange-50/50"
              }`}
            >
              <Star className="w-4 h-4" /> {t.reviews}
            </button>

            <button
              onClick={() => setActiveTab("contact")}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "contact" ? "bg-[#E67E22] text-white font-bold" : "text-[#5D4037] hover:text-[#E67E22] hover:bg-orange-50/50"
              }`}
            >
              <MapPin className="w-4 h-4" /> {t.contactMap}
            </button>

            <button
              onClick={() => setActiveTab("manager")}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "manager" ? "bg-[#E67E22] text-white font-bold" : "text-[#5D4037] hover:text-[#E67E22] hover:bg-orange-50/50"
              }`}
            >
              <Shield className="w-4 h-4" /> {t.managerConsole}
            </button>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2">
            {/* Google Authentication & Cloud Sync Profile */}
            <UserAuthButton
              user={firebaseUser}
              onViewMyOrders={() => {
                setActiveTab("cart");
                setIsMobileMenuOpen(false);
              }}
            />

            {/* Cart Icon trigger */}
            <button
              onClick={() => {
                setActiveTab("cart");
                setIsMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl border relative transition-all cursor-pointer ${
                activeTab === "cart"
                  ? "bg-[#E67E22] border-[#E67E22] text-white"
                  : "bg-white border-[#FAD7A0] text-[#E67E22] hover:border-[#E67E22]/50"
              }`}
              title="Shopping Basket"
            >
              <ShoppingBasket className="w-5 h-5" />
              {currentCartSize > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-full z-10 shadow-md">
                  {currentCartSize}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle (Hamburger) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl border border-[#FAD7A0] bg-white text-[#E67E22] hover:border-[#E67E22]/50 transition-all cursor-pointer flex items-center justify-center focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#121212] border-t border-[#dfba73]/30 px-4 py-3 space-y-2 animate-fade-in">
            <button
              onClick={() => {
                setActiveTab("home");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-sm font-semibold cursor-pointer ${
                activeTab === "home" ? "bg-[#dfba73] text-white font-bold" : "text-[#E5CFA3] hover:text-[#FCFAF4] hover:bg-white/5"
              }`}
            >
              <Home className="w-4 h-4" /> {t.home}
            </button>

            <button
              onClick={() => {
                setActiveTab("menu");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-sm font-semibold cursor-pointer ${
                activeTab === "menu" ? "bg-[#dfba73] text-white font-bold" : "text-[#E5CFA3] hover:text-[#FCFAF4] hover:bg-white/5"
              }`}
            >
              <Utensils className="w-4 h-4" /> {t.dailyMenu}
            </button>

            <button
              onClick={() => {
                setActiveTab("reviews");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-sm font-semibold cursor-pointer ${
                activeTab === "reviews" ? "bg-[#dfba73] text-white font-bold" : "text-[#E5CFA3] hover:text-[#FCFAF4] hover:bg-white/5"
              }`}
            >
              <Star className="w-4 h-4" /> {t.reviews}
            </button>

            <button
              onClick={() => {
                setActiveTab("contact");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-sm font-semibold cursor-pointer ${
                activeTab === "contact" ? "bg-[#dfba73] text-white font-bold" : "text-[#E5CFA3] hover:text-[#FCFAF4] hover:bg-white/5"
              }`}
            >
              <MapPin className="w-4 h-4" /> {t.contactMap}
            </button>

            <button
              onClick={() => {
                setActiveTab("manager");
                setIsMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl transition-all flex items-center gap-3 text-sm font-semibold cursor-pointer ${
                activeTab === "manager" ? "bg-[#dfba73] text-white font-bold" : "text-[#E5CFA3] hover:text-[#FCFAF4] hover:bg-white/5"
              }`}
            >
              <Shield className="w-4 h-4" /> {t.managerConsole}
            </button>
          </div>
        )}
      </nav>

      {/* Main section content container */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative">
        
        {/* Render pages depending on active navigation view */}
        {activeTab === "home" && (
          <HomeSection
            onOrderNow={() => {
              setActiveTab("menu");
              document.getElementById("navbar")?.scrollIntoView({ behavior: "smooth" });
            }}
            onNavigateToReviews={() => setActiveTab("reviews")}
            reviews={reviews}
            notifications={notifications}
            onDismissNotification={(id) => {
              const prev = new Set(seenNotificationIds);
              prev.add(id);
              setSeenNotificationIds(prev);
              setActiveToast(null);
            }}
            lang={lang}
            products={products}
            orders={orders}
            onCancelOrder={handleCancelOrder}
          />
        )}

        {activeTab === "menu" && (
          <MenuSection
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onNavigateToCart={() => setActiveTab("cart")}
            lang={lang}
          />
        )}

        {activeTab === "cart" && (
          <CartSection
            products={products}
            cart={cart}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            onPlaceOrderSuccess={handlePlaceOrderSuccess}
            lang={lang}
            orders={orders}
            onCancelOrder={handleCancelOrder}
            currentUser={firebaseUser}
          />
        )}

        {activeTab === "reviews" && (
          <ReviewsSection
            reviews={reviews}
            onSubmitReview={handlePostReview}
            lang={lang}
          />
        )}

        {activeTab === "contact" && (
          <ContactSection lang={lang} />
        )}

        {activeTab === "manager" && (
          <ManagerSection
            products={products}
            orders={orders}
            onRefreshOrders={refreshOrdersData}
            onRefreshProducts={refreshMenuData}
          />
        )}

      </main>

      {/* Floating live push notification alerts system widget */}
      {activeToast && (
        <div id="live-toast-box" className="fixed bottom-6 left-6 z-50 max-w-sm w-full bg-neutral-900 border border-amber-500/40 rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-slide-up">
          <div className="bg-amber-500 text-neutral-950 p-1.5 rounded-lg shrink-0">
            <Bell className="w-4.5 h-4.5" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">Live Swaadam Notice</span>
              <button
                onClick={() => setActiveToast(null)}
                className="text-neutral-500 hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-white pr-2">{activeToast.title}</h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed pr-1">{activeToast.message}</p>
          </div>
        </div>
      )}

      {/* ORDER COMPILATION SUCCESS DIALOG MODAL (Simulated invoice) */}
      {checkedOutId && (
        <div id="invoice-modal-backdrop" className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl p-6 max-w-md w-full text-center space-y-5">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">Order Registered Successfully!</h3>
            <p className="text-xs text-neutral-400">
              Your purchase reference is <span className="font-mono font-bold text-white px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded">{checkedOutId}</span>. Our kitchen hearth is preheated.
            </p>

            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 space-y-3 text-left">
              <p className="text-[10px] font-bold text-amber-500 font-mono tracking-wider uppercase">Simulated Receipt Outline</p>
              
              <div className="space-y-1.5 text-xs text-neutral-300 font-mono border-b border-neutral-850 pb-3">
                <p>• Verified SSL Security: <span className="text-green-500 font-bold">Passed</span></p>
                <p>• Database Sync State: <span className="text-green-500 font-bold">Saved (Live Dispatch Ready)</span></p>
                <p>• Destination Grid: <span className="text-neutral-100">Jagtial Urban limits</span></p>
              </div>

              <p className="text-[10px] text-neutral-500 leading-relaxed">
                We have prepared a formatted digital order with correct prices per Kilogram and packed counts. Click the button below to connect straight with the executive over WhatsApp to coordinate courier timing.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <a
                href={whatsappRedirectUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                onClick={() => setCheckedOutId(null)}
                className="bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs uppercase py-3.5 px-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                <MessageSquare className="w-4.5 h-4.5 fill-neutral-950" /> Send WhatsApp Message & Proceed
              </a>

              <button
                onClick={() => setCheckedOutId(null)}
                className="text-xs text-neutral-500 hover:text-neutral-300 font-bold cursor-pointer hover:underline py-1"
              >
                Dismiss Window & Keep Exploring
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating customer Express LiveChat helper widget */}
      <LiveChat />

      {/* Footer credentials info */}
      <footer className="bg-neutral-950 border-t border-neutral-900/60 py-12 px-4 text-center text-xs text-neutral-500 space-y-4">
        <div className="flex justify-center mb-3">
          <SwaadamLogo size={52} />
        </div>
        <div className="flex justify-center gap-4 text-neutral-400">
          <button onClick={() => setActiveTab("home")} className="hover:text-amber-500 font-medium cursor-pointer">Home</button>
          <span>•</span>
          <button onClick={() => setActiveTab("menu")} className="hover:text-amber-500 font-medium cursor-pointer">Menu Catalogue</button>
          <span>•</span>
          <button onClick={() => setActiveTab("contact")} className="hover:text-amber-500 font-medium cursor-pointer">Interactive Map</button>
          <span>•</span>
          <button onClick={() => setActiveTab("manager")} className="hover:text-amber-500 font-medium cursor-pointer">Manager Workspace</button>
        </div>
        <p className="max-w-md mx-auto leading-relaxed">
          Swaadam Home Foods is dedicated to pure hygiene and Telangana culinary tradition. Every bundle, loop, and laddu is prepared with strict supervision in Jagtial, Telangana.
        </p>
        <p className="font-mono text-[10px] text-neutral-600">
          © {new Date().getFullYear()} Swaadam Home Foods. Hand-delivered warm in Ganesh Nagar, Jagtial.
        </p>
      </footer>

    </div>
  );
}
