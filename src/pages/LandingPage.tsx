import { useNavigate } from "react-router-dom";
import { Search, Mic, BarChart2, ArrowRight, Zap, Star, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProfessionCard } from "@/components/features/ProfessionCard";
import { POPULAR_PROFESSIONS, CATEGORY_ICONS, PROFESSION_CATEGORIES } from "@/constants/professions";
import heroImage from "@/assets/hero-interview.jpg";

const STATS = [
  { value: "50K+", label: "Interviews Completed" },
  { value: "100+", label: "Professions Covered" },
  { value: "94%", label: "Candidate Success Rate" },
  { value: "4.9★", label: "Average Rating" },
];

const STEPS = [
  { number: "01", title: "Choose Your Profession", description: "Search from 100+ professions or type any job title. Our AI generates tailored questions for your exact role.", Icon: Search },
  { number: "02", title: "Practice with AI", description: "Answer 8 interview questions in a real-session environment. Speak naturally or type — your choice.", Icon: Mic },
  { number: "03", title: "Get Deep Feedback", description: "Receive a full AI report with scores, detailed feedback, ideal answers, and improvement coaching.", Icon: BarChart2 },
];

const TESTIMONIALS = [
  { name: "Sarah Chen", role: "Software Engineer @ Google", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=60&h=60&fit=crop&crop=face", quote: "InterviewAI helped me land my dream job. The AI feedback was shockingly accurate and helped me fix patterns I never noticed.", score: 92 },
  { name: "Marcus Williams", role: "Product Manager @ Stripe", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face", quote: "I practiced for 2 weeks before my PM interviews. The question quality was better than any mock interview I had with humans.", score: 88 },
  { name: "Priya Sharma", role: "UX Designer @ Airbnb", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=face", quote: "The ideal answers section is gold. I could compare my response to what a top candidate would say and improve instantly.", score: 95 },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020817]">
      <Header />

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020817]/75 via-[#020817]/65 to-[#020817]" />
        <div className="absolute inset-0 bg-cyber-grid opacity-40" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-cyan-400 text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI-Powered Interview Coach
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 font-display tracking-tight">
            Ace Your Next Interview{" "}
            <span className="text-gradient-cyan">with AI</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Practice real job interviews for any profession. Get instant AI feedback,
            detailed scoring, and expert coaching — available 24/7, starting free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button
              onClick={() => navigate("/professions")}
              className="w-full sm:w-auto px-8 py-4 bg-cyan-400 text-black font-bold text-lg rounded-xl hover:bg-cyan-300 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Start Free Interview <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/5 transition-colors"
            >
              View Pricing
            </button>
          </div>
          <p className="text-sm text-gray-500">First interview free · No credit card required</p>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
          <div className="w-5 h-8 border border-gray-700 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-gray-600 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-cyan-400 font-display mb-1 glow-text-cyan">
                  {s.value}
                </div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-display">
              How InterviewAI Works
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              From nervous candidate to confident professional in three steps
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative group">
                <div className="card-surface rounded-2xl p-8 border border-white/5 hover:border-cyan-400/20 transition-all duration-300 h-full">
                  <div className="text-cyan-400/15 font-bold text-7xl font-display leading-none mb-6 select-none">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center mb-5">
                    <step.Icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{step.description}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 w-6 h-6 items-center justify-center">
                    <ArrowRight className="text-cyan-400/30 w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Category ── */}
      <section className="py-20 px-4 bg-white/[0.015]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3 font-display">Browse by Category</h2>
            <p className="text-gray-400">Every industry. Every role. One platform.</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {PROFESSION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => navigate(`/professions?category=${cat}`)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-white/[0.04] transition-all duration-200 group"
              >
                <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors text-center leading-snug">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Professions ── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 font-display">Most Popular</h2>
              <p className="text-gray-400">Top professions practiced by our users</p>
            </div>
            <button
              onClick={() => navigate("/professions")}
              className="hidden sm:flex items-center gap-1.5 text-cyan-400 text-sm font-medium hover:gap-2.5 transition-all"
            >
              View all <ArrowRight size={15} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POPULAR_PROFESSIONS.map((p) => (
              <ProfessionCard key={p.id} profession={p} compact />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-4 bg-white/[0.015]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3 font-display">Candidates Love InterviewAI</h2>
            <div className="flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
              <span className="text-gray-400 text-sm ml-2">4.9 out of 5 from 3,200+ reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card-surface rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                  <div className="ml-auto text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded-lg">
                    {t.score}/100
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex gap-0.5 mt-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3 font-display">Everything You Need to Succeed</h2>
            <p className="text-gray-400">Every Premium interview comes with a complete coaching package</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🎤", title: "Voice Interview Simulation", desc: "Speak naturally using your microphone. Our AI transcribes and evaluates your responses in real time." },
              { icon: "📊", title: "Detailed Scoring & Feedback", desc: "Every answer scored out of 100 with specific feedback on content, structure, and delivery." },
              { icon: "💡", title: "AI-Generated Ideal Answers", desc: "See exactly how a top candidate would answer each question to benchmark and improve." },
              { icon: "📈", title: "Category Breakdown", desc: "Scores across Communication, Technical, Problem Solving, Leadership, and Cultural Fit." },
              { icon: "📋", title: "Strengths & Improvement Areas", desc: "Clear, actionable coaching on what to keep doing and what to fix before your real interview." },
              { icon: "🔁", title: "Unlimited Practice", desc: "Premium members can practice as many times as needed across all 100+ professions." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-colors bg-white/[0.02]">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-400/10 via-blue-600/5 to-transparent p-12 text-center">
            <div className="absolute inset-0 bg-cyber-grid opacity-30" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-cyan-400/15 border border-cyan-400/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 font-display">
                Ready to Land Your Dream Job?
              </h2>
              <p className="text-gray-400 mb-8 text-lg">
                Start with your free interview today. No credit card required.
              </p>
              <button
                onClick={() => navigate("/professions")}
                className="px-10 py-4 bg-cyan-400 text-black font-bold text-lg rounded-xl hover:bg-cyan-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Begin Free Interview
              </button>
              <div className="flex items-center justify-center gap-6 mt-6">
                {["Free to start", "Voice or text input", "Instant AI feedback"].map((f) => (
                  <div key={f} className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <CheckCircle size={13} className="text-emerald-400" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
