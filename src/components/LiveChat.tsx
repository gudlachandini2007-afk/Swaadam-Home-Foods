import { useState, useEffect, useRef, FormEvent } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { ChatMessage } from "../types";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      sender: "representative",
      text: "Namaste! Welcome to Swaadam Home Foods customer support. 😊 How can we assist you with traditional Telugu recipes, catering, or home delivery today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: "user_" + Date.now(),
      sender: "customer",
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMsg]);
    const originalText = inputText;
    setInputText("");
    setIsTyping(true);

    // Auto response logic
    setTimeout(() => {
      let replyText = "Thank you for reaching out! A Swaadam culinary associate will answer shortly, or feel free to call us directly on 9666696274!";
      const textLower = originalText.toLowerCase();

      if (textLower.includes("price") || textLower.includes("cost") || textLower.includes("rate")) {
        replyText = "Our prices are calculated per Kilogram! Sakinalu is ₹300/- kg, Pappu Garelu is ₹300/- kg, and our high-protein Sunnundalu are ₹500/- kg. Please view the 'Traditional Menu' tab above for comprehensive itemizations.";
      } else if (textLower.includes("delivery") || textLower.includes("jagtial") || textLower.includes("address")) {
        replyText = "We deliver worldwide! We are located at Road no.2, Ganesh Nagar, Jagtial. Delivery is supported locally within Telangana and across all countries internationally (USA, UK, Canada, Gulf, etc.).";
      } else if (textLower.includes("sakinalu") || textLower.includes("custom") || textLower.includes("festival")) {
        replyText = "We specialize in authentic hand-rolled Telangana Sakinalu (White sesame or Spicy Karam) for marriages and festivals like Sankranthi. To place bulk volumes above 10 kg, please call us directly at 9666696274!";
      } else if (textLower.includes("timing") || textLower.includes("hour") || textLower.includes("open")) {
        replyText = "Our home kitchen operates daily from 9:30 AM to 9:30 PM! Feel free to checkout online anytime and we will prepare it fresh.";
      } else if (textLower.includes("discount") || textLower.includes("offer") || textLower.includes("promo")) {
        replyText = "Check out our active promotions on the homepage grid! Currently, we offer high shelf life, vacuum-sealed packaging for both domestic and international courier orders.";
      }

      const repMsg: ChatMessage = {
        id: "rep_" + Date.now(),
        sender: "representative",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };

      setMessages((prev) => [...prev, repMsg]);
      setIsTyping(false);
    }, 1250);
  };

  return (
    <div id="swaadam-chat-root" className="fixed bottom-6 right-6 z-50 animate-fade-in text-neutral-850">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          id="chat-trigger-btn"
          onClick={() => setIsOpen(true)}
          className="bg-[#E67E22] hover:bg-[#D35400] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center border border-orange-400 group cursor-pointer relative"
          title="Chat with Swaadam helpdesk"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-28 group-hover:ml-2 transition-all duration-300 ease-out text-sm font-bold tracking-wide whitespace-nowrap">
            Live Chat
          </span>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black animate-pulse">
            1
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="chat-box-window"
          className="bg-white border-2 border-[#E67E22] rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col max-h-[480px]"
        >
          {/* Header styled with vibrant Saffron */}
          <div className="bg-[#E67E22] p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#C5A059] text-[#121212] rounded-full flex items-center justify-center font-extrabold text-xs shadow-inner">
                SWM
              </div>
              <div>
                <p className="font-extrabold text-sm tracking-tight">Swaadam Culinary Chat</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-bold opacity-90">Cook is Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-orange-600/35 p-1 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Grid area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FFFDF9] max-h-72 min-h-60 flex flex-col">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 max-w-[85%] ${
                  msg.sender === "customer" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                {msg.sender === "representative" && (
                  <div className="w-6 h-6 bg-orange-100 text-[#E67E22] rounded-full flex items-center justify-center shrink-0 text-[10px] font-black border border-orange-200">
                    S
                  </div>
                )}
                <div>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      msg.sender === "customer"
                        ? "bg-[#E67E22] text-white font-semibold rounded-tr-none"
                        : "bg-orange-50/50 text-[#5D4037] rounded-tl-none border border-[#FAD7A0]/50 font-medium"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[8px] text-gray-450 mt-1 block px-1 text-right font-semibold font-mono">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 mr-auto max-w-[80%] items-center">
                <div className="w-6 h-6 bg-orange-100 text-[#E67E22] rounded-full flex items-center justify-center shrink-0 text-[10px] font-black border border-orange-200">
                  S
                </div>
                <div className="bg-orange-55/40 p-3 rounded-2xl rounded-tl-none border border-[#FAD7A0]/50 flex gap-1">
                  <span className="w-1.5 h-1.5 bg-[#E67E22] rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-[#E67E22] rounded-full animate-bounce delay-200" />
                  <span className="w-1.5 h-1.5 bg-[#E67E22] rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form input fields */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-[#FAD7A0]/65 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask our coordinator a question..."
              className="flex-1 bg-orange-50/25 border border-[#FAD7A0]/85 focus:border-[#E67E22] focus:bg-white rounded-xl px-3 py-2.5 text-xs text-neutral-800 focus:outline-none placeholder-gray-400"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-[#E67E22] hover:bg-[#D35400] disabled:opacity-45 text-white p-2.5 rounded-xl transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
