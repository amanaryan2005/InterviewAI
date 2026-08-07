import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { X, CreditCard, Lock, Zap, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { PricingCard } from "@/components/features/PricingCard";
import { setPremium, getUser } from "@/lib/storage";

const FREE_FEATURES = [
  "1 free interview session",
  "8 AI-generated questions",
  "Basic overall score",
  "General AI feedback summary",
  "Voice & text input support",
];

const PREMIUM_FEATURES = [
  "Unlimited interview sessions",
  "100+ professions covered",
  "Per-question detailed scoring",
  "In-depth AI coaching feedback",
  "Ideal answer for every question",
  "5-category performance breakdown",
  "Strengths & improvement analysis",
  "Practice history & progress tracking",
];

const FAQS = [
  { q: "Can I cancel anytime?", a: "Yes, cancel anytime from your account settings. No questions asked." },
  { q: "Is the interview voice-based?", a: "Yes. You can use your microphone or type if you prefer — both are fully supported." },
  { q: "How accurate is the AI feedback?", a: "Our AI evaluates answer structure, relevance, and depth. While not a human coach, it accurately surfaces patterns you can improve." },
  { q: "What professions are covered?", a: "We cover 100+ professions across Technology, Healthcare, Finance, Design, and more. You can also type any custom role." },
];

export default function PricingPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const user = getUser();

  const handleFreePlan = () => {
    if (user?.freeInterviewUsed) {
      toast.error("Free interview already used. Upgrade to continue.");
    } else {
      navigate("/professions");
    }
  };

  const handleMockPayment = () => {
    if (!name.trim() || cardNum.length < 16) {
      toast.error("Please fill in all card details.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setPremium(true);
      setLoading(false);
      setShowModal(false);
      toast.success("Welcome to Premium! Unlimited interviews unlocked.");
      navigate("/professions");
    }, 2000);
  };

  const formatCardNum = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  return (
    <div className="min-h-screen bg-[#020817]">
      <Header />

      <div className="pt-28 pb-24 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Page header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-medium mb-6">
              Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
              Invest in Your Career
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Start free and upgrade when you are ready for unlimited practice.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-20">
            <PricingCard
              name="Free"
              price={null}
              description="Perfect for trying InterviewAI before committing."
              features={FREE_FEATURES}
              highlighted={false}
              ctaText={user?.freeInterviewUsed ? "Free Interview Used" : "Start Free Interview"}
              onSelect={handleFreePlan}
            />
            <PricingCard
              name="Premium"
              price={19}
              period="month"
              description="Everything you need to ace any job interview with confidence."
              features={PREMIUM_FEATURES}
              highlighted={true}
              ctaText={user?.isPremium ? "Current Plan ✓" : "Get Premium"}
              badge="Most Popular"
              onSelect={() => !user?.isPremium && setShowModal(true)}
            />
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-20">
            {[
              { icon: "🔒", text: "Secure & encrypted" },
              { icon: "↩", text: "Cancel anytime" },
              { icon: "⚡", text: "Instant access" },
              { icon: "🎯", text: "50,000+ interviews done" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-gray-400 text-sm">
                <span>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          {/* Feature comparison table */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white text-center mb-8 font-display">
              Full Feature Comparison
            </h2>
            <div className="overflow-hidden rounded-2xl border border-white/8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left p-5 text-gray-400 text-sm font-medium">Feature</th>
                    <th className="p-5 text-gray-400 text-sm font-medium text-center w-28">Free</th>
                    <th className="p-5 text-cyan-400 text-sm font-semibold text-center w-28">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Interview sessions", "1 only", "Unlimited"],
                    ["Professions covered", "All 100+", "All 100+"],
                    ["Voice + text input", true, true],
                    ["AI-generated questions", true, true],
                    ["Overall score", true, true],
                    ["Per-question scoring", false, true],
                    ["Detailed AI feedback", "Summary only", "Full analysis"],
                    ["Ideal answer examples", false, true],
                    ["Category breakdowns", false, true],
                    ["Strengths & improvements", false, true],
                    ["Practice history", false, true],
                  ].map(([feature, free, premium], i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.015]">
                      <td className="p-4 text-gray-300 text-sm">{feature}</td>
                      <td className="p-4 text-center">
                        {typeof free === "boolean" ? (
                          free ? <CheckCircle size={16} className="text-gray-400 mx-auto" /> : <X size={14} className="text-gray-700 mx-auto" />
                        ) : (
                          <span className="text-gray-400 text-xs">{free}</span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {typeof premium === "boolean" ? (
                          premium ? <CheckCircle size={16} className="text-cyan-400 mx-auto" /> : <X size={14} className="text-gray-700 mx-auto" />
                        ) : (
                          <span className="text-cyan-400 text-xs font-medium">{premium}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8 font-display">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="card-surface rounded-xl border border-white/8 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                    <span className="text-gray-500 flex-shrink-0">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 border-t border-white/5 pt-4">
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-8 max-w-sm w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-bold text-xl">Premium — $19/mo</h3>
                <p className="text-gray-400 text-sm mt-0.5">Unlimited AI interview practice</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block">Cardholder Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 font-medium mb-1.5 block flex items-center gap-1.5">
                  <CreditCard size={12} /> Card Number
                </label>
                <input
                  type="text"
                  value={cardNum}
                  onChange={(e) => setCardNum(formatCardNum(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Expiry</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">CVV</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="•••"
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50 transition-colors font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-4 mb-5 text-xs text-gray-500">
              <Lock size={11} />
              Demo only — no real charges. Enter any details.
            </div>

            <button
              onClick={handleMockPayment}
              disabled={loading}
              className="w-full py-3.5 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <Zap size={16} />
                  Pay $19/month
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
