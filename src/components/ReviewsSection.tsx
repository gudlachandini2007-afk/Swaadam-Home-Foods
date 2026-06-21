import { useState, FormEvent } from "react";
import { Star, MessageSquarePlus, CheckCircle2, Heart } from "lucide-react";
import { Review } from "../types";
import { Language, translations } from "../translations";

interface ReviewsSectionProps {
  reviews: Review[];
  onSubmitReview: (name: string, rating: number, text: string) => Promise<void>;
  lang?: Language;
}

export function ReviewsSection({ reviews, onSubmitReview, lang = "en" }: ReviewsSectionProps) {
  const t = translations[lang];
  const [name, setName] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [text, setText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmitReview(name, rating, text);
      setIsSubmitting(false);
      setIsDone(true);
      setName("");
      setRating(5);
      setText("");
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  // Compute stats
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const ratingCounts = [0, 0, 0, 0, 0]; // 1 to 5 star distributions
  reviews.forEach((r) => {
    const starIdx = Math.max(1, Math.min(5, r.rating)) - 1;
    ratingCounts[starIdx]++;
  });

  return (
    <div id="swaadam-reviews-section" className="space-y-10 min-h-[500px] text-[#5D4037] scroll-mt-20">
      
      {/* Intro Stats Row with Golden Light borders */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-[#FAD7A0]/60 pb-8">
        <div className="md:col-span-4 text-center sm:text-left space-y-2">
          <span className="text-[#E67E22] font-mono text-xs tracking-widest uppercase block font-bold">
            {lang === "te" ? "విశ్వసనీయత సూచిక" : lang === "hi" ? "ट्रस्ट इंडेक्स" : "Trust Index"}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#5D4037] font-sans">{t.reviewsTitle}</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.reviewsDesc}
          </p>
        </div>

        {/* Aggregated ratings score */}
        <div className="md:col-span-4 bg-white border border-[#FAD7A0] p-5 rounded-2xl text-center space-y-2 shadow-xs">
          <p className="text-4xl font-black text-[#E67E22] font-mono">{averageRating}</p>
          <div className="flex gap-1 justify-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4.5 h-4.5 ${
                  i < Math.round(Number(averageRating)) ? "text-amber-500 fill-amber-500" : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            {lang === "te" ? `${reviews.length} మంది సంతోషకరమైన కస్టమర్ల అభిప్రాయం` : lang === "hi" ? `${reviews.length} खुशहाल ग्राहकों की प्रतिक्रिया` : `Aggregate score of ${reviews.length} native critics`}
          </p>
        </div>

        {/* percentage bars */}
        <div className="md:col-span-4 space-y-2 text-xs">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingCounts[stars - 1];
            const percent = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 font-semibold">
                <span className="text-[#5D4037] w-3 font-mono font-bold">{stars}★</span>
                <div className="flex-1 h-2 bg-orange-100/30 border border-[#FAD7A0]/45 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-gray-500 w-8 text-right font-mono">{Math.round(percent)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Core Layout: Left are Reviews, Right is Submit form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Reviews Feed Column (7 cols) */}
        <div className="lg:col-span-7 space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#E67E22] font-mono">
            {lang === "te" ? `ధృవీకరించబడిన కస్టమర్ సమీక్షలు (${reviews.length})` : lang === "hi" ? `सत्यापित ग्राहक समीक्षाएं (${reviews.length})` : `Verified Sweet Critiques (${reviews.length})`}
          </h3>
          
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-white border border-[#FAD7A0]/60 rounded-xl shadow-xs">
              <p className="text-xs text-gray-500 font-bold">
                {lang === "te" ? "మీ అమూల్యమైన సమీక్షను పంచుకునే మొదటి కస్టమర్ అవ్వండి!" : lang === "hi" ? "अपनी मूल्यवान समीक्षा साझा करने वाले पहले ग्राहक बनें!" : "Be the very first culinary lover to share feedback!"}
              </p>
            </div>
          ) : (
            reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-[#FAD7A0]/70 p-5 rounded-2xl space-y-3 hover:border-[#E67E22] shadow-xs hover:shadow-sm transition-all duration-200"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 bg-orange-50 text-[#E67E22] rounded-full border border-[#FAD7A0]/60 flex items-center justify-center text-xs font-black font-mono uppercase">
                      {rev.customerName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#5D4037] flex items-center gap-1.5 leading-none">
                        {rev.customerName}
                        <Heart className="w-3 h-3 text-red-500 fill-red-500 shrink-0" />
                      </p>
                      <span className="text-[9px] text-gray-400 font-semibold">{rev.date}</span>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? "text-amber-500 fill-amber-500" : "text-gray-100"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed pl-12">
                  "{rev.text}"
                </p>
              </div>
            ))
          )}
        </div>

        {/* Submit review Form Column (5 cols) - Styled beautifully with high contrast */}
        <div className="lg:col-span-5 bg-white border border-[#FAD7A0] p-6 rounded-2xl h-fit shadow-md shadow-orange-100/40 relative">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-[#E67E22]" />

          {isDone ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 bg-emerald-55 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-extrabold text-[#5D4037]">{lang === "te" ? "సమీక్ష విజయవంతంగా సేవ్ చేయబడింది!" : lang === "hi" ? "समीक्षा सफलतापूर्वक सहेजी गई!" : "Taste Review Saved!"}</h3>
              <p className="text-xs text-gray-600 max-w-xs mx-auto leading-relaxed">
                {lang === "te" ? "మీకు చాలా ధన్యవాదాలు! మీ అభిప్రాయం నేరుగా మా డేటాబేస్‌లో నిల్వ చేయబడింది మరియు ఇతర సందర్శకులకు తక్షణమే చూపిస్తుంది." : lang === "hi" ? "आपका बहुत-बहुत धन्यवाद! आपकी बहुमूल्य प्रतिक्रिया सीधे हमारे डेटाबेस में सहेज ली गई है और तुरंत दिखाई देगी।" : "Thank you so much! Your feedback has been persisted directly in our database and will show up instantly for other viewers."}
              </p>
              <button
                onClick={() => setIsDone(false)}
                className="mt-2 border border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white text-xs py-2 px-5 rounded-lg font-bold transition-all cursor-pointer"
              >
                {lang === "te" ? "మరొక సమీక్షను పంచుకోండి" : lang === "hi" ? "दूसरा फीडबैक साझा करें" : "Share Another Feedback"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-1">
              <h3 className="font-extrabold text-[#5D4037] text-sm pb-2 border-b border-[#FAD7A0]/45 flex items-center gap-2">
                <MessageSquarePlus className="w-4.5 h-4.5 text-[#E67E22]" /> {t.writeReview}
              </h3>

              <div>
                <label className="text-gray-600 mb-1 block text-xs font-bold">{t.fullName} *</label>
                <input
                  type="text"
                  required
                  placeholder={lang === "te" ? "ఉదా: కె. శ్రీనివాస్ (జగిత్యాల)" : lang === "hi" ? "जैसे: के. श्रीनिवास (जगतियाल)" : "e.g., K. Srinivas (Road 2, Jagtial)"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl px-3 py-2.5 text-xs text-neutral-800 focus:outline-none"
                />
              </div>

              {/* Stars selector */}
              <div>
                <label className="text-gray-600 mb-1 block text-xs font-bold font-sans">{t.rating} *</label>
                <div className="flex gap-1.5 focus:outline-none">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(num)}
                      className="p-0.5 cursor-pointer hover:scale-115 transition-transform"
                      title={`${num} Stars`}
                    >
                      <Star
                        className={`w-6.5 h-6.5 ${
                          num <= rating ? "text-amber-500 fill-amber-500" : "text-gray-200"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-600 mb-1 block text-xs font-bold">{lang === "te" ? "అభిప్రాయ సందేశం *" : lang === "hi" ? "समीक्षा संदेश *" : "Message Feedback *"}</label>
                <textarea
                  rows={4}
                  required
                  placeholder={t.reviewText}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-orange-50/25 border border-[#FAD7A0] focus:border-[#E67E22] focus:bg-white rounded-xl p-3 text-xs text-neutral-800 focus:outline-none resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E67E22] hover:bg-[#D35400] disabled:opacity-50 text-white font-extrabold py-3 px-4 rounded-xl text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-orange-100"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  t.submitReview
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
