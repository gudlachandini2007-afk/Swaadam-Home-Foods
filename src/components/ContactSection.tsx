import { useState, FormEvent } from "react";
import { Phone, MapPin, Clock, Send, CheckCircle2, Navigation, Compass, Eye, Globe } from "lucide-react";
import { Language, translations } from "../translations";

interface ShippingZone {
  name: string;
  region: string;
  eta: string;
  baseCharge: number;
  description: string;
}

interface ContactSectionProps {
  lang?: Language;
}

export function ContactSection({ lang = "en" }: ContactSectionProps) {
  const t = translations[lang];
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Local Jagtial delivery boundaries representing our fresh-dispatch service
  const shippingZones: ShippingZone[] = [
    { name: "Up to 5 km", region: "Local areas (Ganesh Nagar, etc.)", eta: "Delivered in 1 - 2 Hours", baseCharge: 50, description: "Fast delivery within 5 km of our kitchen at Ganesh Nagar Road no 2." },
    { name: "More than 5 km", region: "Other Jagtial Local areas", eta: "Delivered in 2 - 3 Hours", baseCharge: 75, description: "Delivered safely inside the complete town boundaries of Jagtial." }
  ];

  const [selectedZone, setSelectedZone] = useState<number>(0);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
    }, 1000);
  };

  const activeZone = shippingZones[selectedZone];
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Swaadam+Home+Foods+Ganesh+Nagar+Jagtial";

  return (
    <section id="swaadam-contact-section" className="py-16 px-4 bg-[#FFF9F2] text-neutral-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Direct info and Contact Form (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-[#E67E22] font-mono text-xs tracking-widest uppercase block mb-1 font-bold">{t.quickInfo}</span>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#5D4037] font-sans">
              {t.reachUs}
            </h2>
            <p className="text-gray-700 text-sm mt-3 leading-relaxed">
              {t.reachDesc}
            </p>
          </div>

          {/* Quick Info Grid - Saffron Gold themed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#FAD7A0] p-4 rounded-xl flex items-start gap-3 shadow-xs">
              <Phone className="w-5 h-5 text-[#E67E22] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{t.hotline}</p>
                <a href="tel:9666696274" className="text-sm font-extrabold text-[#5D4037] hover:text-[#E67E22] transition-colors">
                  +91 9666696274
                </a>
              </div>
            </div>

            <div className="bg-white border border-[#FAD7A0] p-4 rounded-xl flex items-start gap-3 shadow-xs">
              <Clock className="w-5 h-5 text-[#E67E22] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{lang === "te" ? "వంటగది వేళలు" : lang === "hi" ? "रसोई का समय" : "Kitchen Timings"}</p>
                <p className="text-sm font-extrabold text-[#5D4037]">{lang === "te" ? "ఉదయం 9:30 - రాత్రి 9:30" : lang === "hi" ? "सुबह 9:30 - रात 9:30" : "9:30 AM - 9:30 PM"}</p>
              </div>
            </div>

            <div className="bg-white border border-[#FAD7A0] p-4 rounded-xl flex items-start gap-3 shadow-xs">
              <MapPin className="w-5 h-5 text-[#E67E22] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{lang === "te" ? "ప్రధాన చిరునామా" : lang === "hi" ? "मुख्य पता" : "Main Address"}</p>
                <p className="text-xs font-bold text-gray-700 leading-tight">{t.addressStrip}</p>
              </div>
            </div>
          </div>

          {/* Contact Form Container (Royal White card with golden borders) */}
          <div className="bg-white border border-[#FAD7A0] p-6 rounded-2xl relative shadow-md shadow-orange-100/45 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-[#E67E22]" />
            
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#5D4037]">{lang === "te" ? "ప్రణామం! సందేశం అందింది" : lang === "hi" ? "प्रणाम! संदेश प्राप्त हुआ" : "Pranāmam! Message Received"}</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  {lang === "te" ? "మా గ్లోబల్ ఆర్డర్ కోఆర్డినేటర్ త్వరలోనే మీ మొబైల్ నంబరుకు సంప్రదిస్తారు!" : lang === "hi" ? "हमारे वैश्विक ऑर्डर समन्वयक शीघ्र ही आपके मोबाइल नंबर पर संपर्क करेंगे!" : "We have received your enquiry. Our global order coordinator will reach out to you on your mobile number shortly!"}
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 border border-[#E67E22] text-[#E67E22] text-xs px-4 py-2 rounded-lg hover:bg-[#E67E22] hover:text-white transition-all font-bold cursor-pointer"
                >
                  {lang === "te" ? "మరో సందేశం పంపండి" : lang === "hi" ? "दूसरा संदेश भेजें" : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Compass className="w-5 h-5 text-[#E67E22]" />
                  <h3 className="text-lg font-bold text-[#5D4037]">{lang === "te" ? "సాంప్రదాయ పిండివంటల విచారణ" : lang === "hi" ? "पारंपरिक व्यंजन पूछताछ भेजें" : "Send a Custom Culinary Enquiry"}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 font-bold mb-1 block">{t.fullName} *</label>
                    <input
                      type="text"
                      required
                      placeholder={lang === "te" ? "ఉదా: హరీష్ రెడ్డి" : lang === "hi" ? "जैसे: हरीश रेड्डी" : "e.g., Harish Reddy"}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-orange-50/30 border border-[#FAD7A0]/70 focus:border-[#E67E22] focus:bg-white rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#E67E22]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 font-bold mb-1 block">{lang === "te" ? "వాట్సాప్ మొబైల్ నంబర్" : lang === "hi" ? "व्हाट्सएप मोबाइल नंबर" : "Phone Number (WhatsApp Active)"} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g., 9666696274"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-orange-50/30 border border-[#FAD7A0]/70 focus:border-[#E67E22] focus:bg-white rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#E67E22]/20 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-600 font-bold mb-1 block">{lang === "te" ? "ఈమెయిల్ చిరునామా (ఐచ్ఛికం)" : lang === "hi" ? "ईमेल पता (वैकल्पिक)" : "Email Address (Optional)"}</label>
                  <input
                    type="email"
                    placeholder="e.g., mail@jagtial.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-orange-50/30 border border-[#FAD7A0]/70 focus:border-[#E67E22] focus:bg-white rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#E67E22]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600 font-bold mb-1 block">{lang === "te" ? "కావలసిన వంటకాలు & డెలివరీ దేశం/ప్రాంతం" : lang === "hi" ? "वांछित व्यंजन और वजन विवरण" : "Destination & Weight of Goods Requested"}</label>
                  <textarea
                    rows={3}
                    placeholder={lang === "te" ? "ఉదాహరణకు: దేశం పేరు (USA, UK, Canada), నగరం, పిన్‌కోడ్ మరియు కావలసిన పచ్చళ్ళు/пиండివంటల పరిమాణం..." : lang === "hi" ? "उदाहरण के लिए: देश का नाम (USA, UK, Canada), शहर, पिनकोड और पसंदीदा अचार/व्यंजनों की मात्रा..." : "Provide country name (e.g., USA, UK, Canada), city, state, pincode and the volume of pickles/sweets requested..."}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-orange-50/30 border border-[#FAD7A0]/70 focus:border-[#E67E22] focus:bg-white rounded-xl px-4 py-3 text-sm text-neutral-800 focus:outline-none focus:ring-1 focus:ring-[#E67E22]/20 resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#E67E22] hover:bg-[#D35400] font-bold text-white text-sm py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-100 active:scale-95"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {lang === "te" ? "సందేశం పంపండి" : lang === "hi" ? "संदेश भेजें" : "Submit Message"}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Global Transit & Interactive Google Map Redirect Card (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 animate-fade-in" id="swaadam-transit-card">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1 px-3 bg-[#E67E22]/10 border border-[#E67E22]/30 text-[#E67E22] rounded-full text-[10px] uppercase font-bold font-mono tracking-widest block">
                {lang === "te" ? "ప్రపంచ లాజిస్టిక్స్ హబ్" : lang === "hi" ? "वैश्विक रसद केंद्र" : "GLOBAL LOGISTICS HUB"}
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#5D4037]">{t.transitTitle}</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {t.transitDesc}
            </p>
          </div>

          {/* Map Image container - clicking redirects transparently to Google Maps */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Click to view Swaadam Sweets on Google Maps"
            className="block group relative overflow-hidden rounded-2xl border border-[#FAD7A0] bg-white p-2 shadow-md hover:border-[#E67E22] hover:shadow-lg transition-all"
            id="google-maps-card-redirect"
          >
            <div className="relative h-64 rounded-xl overflow-hidden bg-orange-50/25 flex items-center justify-center">
              {/* Grid background representing topography map */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#FAD7A0_1px,transparent_1px),linear-gradient(to_bottom,#FAD7A0_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-25" />
              
              {/* Radial signal rings to draw dramatic focus to Swaadam Shop */}
              <div className="absolute w-28 h-28 bg-[#E67E22]/10 rounded-full border border-[#E67E22]/20 animate-ping" />
              <div className="absolute w-12 h-12 bg-[#E67E22]/20 rounded-full border border-[#E67E22]/40" />

              {/* Styled interactive path lines visually spanning to worldwide regions */}
              <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none">
                <line x1="50%" y1="50%" x2="10%" y2="20%" stroke="#E67E22" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="50%" y1="50%" x2="90%" y2="15%" stroke="#E67E22" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="50%" y1="50%" x2="85%" y2="80%" stroke="#E67E22" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="50%" y1="50%" x2="15%" y2="85%" stroke="#E67E22" strokeWidth="2" strokeDasharray="3 3" />
              </svg>

              {/* Swaadam Shop Pin Marker (high contrast highlight requested by user) */}
              <div className="absolute z-10 flex flex-col items-center animate-bounce">
                <div className="w-10 h-10 bg-red-650 text-white rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                  <MapPin className="w-5 h-5 fill-white" />
                </div>
                <div className="mt-1.5 bg-[#5D4037] text-[#FFE8BC] text-[9px] font-black py-0.5 px-2 rounded shadow-lg border border-[#FAD7A0]">
                  Ganesh Nagar (Swaadam HQ)
                </div>
              </div>

              {/* Jagtial local neighborhoods floating indicators */}
              <span className="absolute left-6 top-8 text-[9px] font-bold text-gray-500 bg-white/80 p-1 rounded shadow-xs">📍 Dharoor</span>
              <span className="absolute right-6 top-12 text-[9px] font-bold text-gray-500 bg-white/80 p-1 rounded shadow-xs">📍 Puranipet</span>
              <span className="absolute right-8 bottom-10 text-[9px] font-bold text-gray-500 bg-white/80 p-1 rounded shadow-xs">📍 Old City</span>
              <span className="absolute left-8 bottom-8 text-[9px] font-bold text-gray-500 bg-white/80 p-1 rounded shadow-xs">📍 Jagtial Bus Stand</span>

              {/* Dark overlay showing redirect instruction on hover */}
              <div className="absolute inset-0 bg-[#5D4037]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                <Eye className="w-10 h-10 text-[#FFB74D] mb-2 animate-pulse" />
                <span className="font-extrabold text-xs tracking-tight text-white px-4 py-1.5 bg-[#E67E22] rounded-xl shadow-lg">
                  {lang === "te" ? "గూగుల్ మ్యాప్స్ లో వీక్షించండి" : lang === "hi" ? "गूगल मैप्स खोलें" : "Open Google Maps"}
                </span>
                <span className="text-[10px] text-orange-200 mt-1">{lang === "te" ? "గణేష్ నగర్ రోడ్ నం. 2 ను చూపిస్తుంది" : lang === "hi" ? "रोड नंबर 2, गणेश नगर दर्शाता है" : "Highlights Road no. 2, Ganesh Nagar"}</span>
              </div>
            </div>

            {/* Click information footer inside card */}
            <div className="p-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                <Globe className="w-4 h-4 text-[#E67E22] animate-spin" style={{ animationDuration: "12s" }} />
                <span>{lang === "te" ? "మ్యాప్స్ లింక్ నిరంతరం అందుబాటులో ఉంది" : lang === "hi" ? "మ్యాప్స్ link हमेशा सक्रिय है" : "Google Maps Link is Live"}</span>
              </div>
              <span className="text-[9px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {lang === "te" ? "స్థానిక పరిధి హైలైట్ చేయబడింది" : lang === "hi" ? "स्थानीय सीमाएं हाइलाइटेड" : "Local Jagtial Active"}
              </span>
            </div>
          </a>

          {/* Quick Rates / Transit Zone Calculator */}
          <div className="p-4 bg-orange-50/50 border border-[#FAD7A0]/60 rounded-xl space-y-3">
            <span className="text-xs font-bold text-[#5D4037] flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-[#E67E22]" /> {t.courierEstimates}
            </span>
            
            <div className="grid grid-cols-2 gap-2 border-b border-[#FAD7A0]/35 pb-2">
              {shippingZones.map((zone, idx) => {
                const zoneLabel = zone.name === "Up to 5 km"
                  ? (lang === "te" ? "5 కిమీ లోపు" : lang === "hi" ? "5 किमी तक" : "Up to 5 km")
                  : (lang === "te" ? "5 కిమీ పైన" : lang === "hi" ? "5 किमी से अधिक" : "More than 5 km");
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedZone(idx)}
                    className={`text-[10px] p-2 rounded-xl font-bold transition-all cursor-pointer ${
                      selectedZone === idx
                        ? "bg-[#E67E22] text-white"
                        : "bg-white border border-[#FAD7A0]/40 text-gray-700 hover:border-[#E67E22]"
                    }`}
                  >
                    {zoneLabel}
                  </button>
                );
              })}
            </div>

            <div className="bg-white p-3 rounded-lg border border-[#FAD7A0]/40 space-y-1.5 text-xs font-semibold">
              <div className="flex justify-between font-bold text-[#5D4037]">
                <span>
                  {activeZone.name === "Up to 5 km" ? (lang === "te" ? "5 కిమీ లోపు" : lang === "hi" ? "5 किमी तक" : "Up to 5 km") :
                   (lang === "te" ? "5 కిమీ పైన" : lang === "hi" ? "5 किमी से अधिक" : "More than 5 km")} ({
                   lang === "te" ? "జగిత్యాల స్థానిక పరిధి" : lang === "hi" ? "जगतियाल स्थानीय सीमा" : "Jagtial town limits"
                   })
                </span>
                <span className="text-[#E67E22]">₹{activeZone.baseCharge}/- {lang === "te" ? "ధర" : lang === "hi" ? "शुल्क" : "charge"}</span>
              </div>
              <p className="text-[11px] leading-relaxed font-semibold text-gray-600">
                {activeZone.name === "Up to 5 km" 
                  ? (lang === "te" ? "గణేష్ నగర్, రాస్తా మరియు సమీప వీధుల వారీగా గంటల్లోనే శీఘ్ర డెలివరీ." : lang === "hi" ? "गणेश नगर और आस-पास के क्षेत्रों में सुपरहीरो स्पीड डिलीवरी।" : activeZone.description)
                  : (lang === "te" ? "జగిత్యాల బాహ్య సరిహద్దు ప్రాంతాలకు 2-3 గంటల్లో సురక్షిత డెలివరీ." : lang === "hi" ? "जगतियाल की बाहरी सीमाओं में कूरियर द्वारा सुरक्षित डिलीवरी।" : activeZone.description)}
              </p>
              <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1 font-bold">
                <span>⏱️ {lang === "te" ? "చేరే సమయం:" : lang === "hi" ? "डिलिवरी समय:" : "Delivery ETA:"}</span>
                <span className="text-gray-700 font-black">
                  {lang === "te" ? (activeZone.name === "Up to 5 km" ? "1 - 2 గంటలు" : "2 - 3 గంటలు") : lang === "hi" ? (activeZone.name === "Up to 5 km" ? "1 - 2 घंटे" : "2 - 3 घंटे") : activeZone.eta}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
