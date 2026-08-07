import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowRight, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ProfessionCard } from "@/components/features/ProfessionCard";
import { PROFESSIONS, PROFESSION_CATEGORIES, CATEGORY_ICONS } from "@/constants/professions";
import { canStartInterview } from "@/lib/storage";
import type { ProfessionCategory } from "@/types";

export default function ProfessionsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProfessionCategory | null>(
    (searchParams.get("category") as ProfessionCategory) ?? null
  );
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category") as ProfessionCategory | null;
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = PROFESSIONS.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = !activeCategory || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleCategoryClick = (cat: ProfessionCategory) => {
    setActiveCategory(activeCategory === cat ? null : cat);
    setSearchParams(activeCategory === cat ? {} : { category: cat });
  };

  const handleCustomSearch = () => {
    if (!search.trim()) return;
    const exact = PROFESSIONS.find((p) => p.title.toLowerCase() === search.toLowerCase());
    if (exact) {
      handleStartInterview(`/interview/${exact.id}`);
    } else {
      handleStartInterview(`/interview/custom?title=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleStartInterview = (path: string) => {
    const { canStart } = canStartInterview();
    if (canStart) {
      navigate(path);
    } else {
      setShowGate(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#020817]">
      <Header />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-3 font-display">
              Choose Your Profession
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              100+ professions with AI-tailored questions. Search below or pick a category.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCustomSearch()}
                placeholder="Search any profession — e.g. 'Data Scientist', 'Chef', 'Nurse'..."
                className="w-full pl-12 pr-28 py-4 bg-white/[0.04] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-[5.5rem] text-gray-500 hover:text-white transition-colors p-1"
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={handleCustomSearch}
                disabled={!search.trim()}
                className="absolute right-2 px-4 py-2 bg-cyan-400 text-black text-sm font-bold rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-300 transition-colors flex items-center gap-1.5"
              >
                Go <ArrowRight size={14} />
              </button>
            </div>

            {/* Custom profession hint */}
            {search.trim() && !PROFESSIONS.some((p) => p.title.toLowerCase().includes(search.toLowerCase())) && (
              <div className="mt-3 p-3 rounded-lg bg-cyan-400/5 border border-cyan-400/15 flex items-center justify-between">
                <span className="text-sm text-gray-300">
                  Start interview for <span className="text-cyan-400 font-medium">"{search}"</span> using general questions
                </span>
                <button
                  onClick={handleCustomSearch}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                >
                  Start →
                </button>
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-1.5 text-gray-400 text-sm flex-shrink-0">
              <SlidersHorizontal size={15} />
              <span>Filter:</span>
            </div>
            <button
              onClick={() => { setActiveCategory(null); setSearchParams({}); }}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                !activeCategory
                  ? "bg-cyan-400/15 border-cyan-400/30 text-cyan-400"
                  : "border-white/10 text-gray-400 hover:text-white hover:border-white/25"
              }`}
            >
              All
            </button>
            {PROFESSION_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                  activeCategory === cat
                    ? "bg-cyan-400/15 border-cyan-400/30 text-cyan-400"
                    : "border-white/10 text-gray-400 hover:text-white hover:border-white/25"
                }`}
              >
                <span>{CATEGORY_ICONS[cat]}</span>
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400 text-sm">
              {filtered.length} {filtered.length === 1 ? "profession" : "professions"} found
              {activeCategory && <span> in <span className="text-white">{activeCategory}</span></span>}
            </p>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProfessionCard key={p.id} profession={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-white font-semibold text-xl mb-2">No professions found</h3>
              <p className="text-gray-400 mb-6">Try a different search term or press Enter to start a custom interview.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory(null); setSearchParams({}); }}
                className="px-6 py-2.5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/5 transition-colors text-sm"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upgrade Gate Modal */}
      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0f1629] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Free Interview Used</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              You have used your free interview. Upgrade to Premium to practice unlimited interviews across all professions.
            </p>
            <button
              onClick={() => navigate("/pricing")}
              className="w-full py-3 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-colors mb-3"
            >
              Upgrade to Premium
            </button>
            <button
              onClick={() => setShowGate(false)}
              className="w-full py-3 text-gray-400 hover:text-white text-sm transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
