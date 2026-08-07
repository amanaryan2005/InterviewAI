import { useNavigate } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import type { Profession } from "@/types";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/constants/professions";
import { formatNumber } from "@/lib/utils";

interface ProfessionCardProps {
  profession: Profession;
  compact?: boolean;
}

const DIFFICULTY_COLORS = {
  Beginner: "text-emerald-400 bg-emerald-400/10",
  Intermediate: "text-amber-400 bg-amber-400/10",
  Advanced: "text-rose-400 bg-rose-400/10",
};

export function ProfessionCard({ profession, compact = false }: ProfessionCardProps) {
  const navigate = useNavigate();
  const categoryStyle = CATEGORY_COLORS[profession.category];
  const difficultyStyle = DIFFICULTY_COLORS[profession.difficulty];

  const handleStart = () => {
    navigate(`/interview/${profession.id}`);
  };

  if (compact) {
    return (
      <button
        onClick={handleStart}
        className="group w-full text-left p-5 rounded-xl border border-white/5 bg-white/[0.025] hover:border-cyan-400/25 hover:bg-white/[0.04] transition-all duration-200 hover:-translate-y-0.5"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">{CATEGORY_ICONS[profession.category]}</span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{profession.title}</p>
            <p className="text-gray-500 text-xs mt-0.5">{profession.category}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0 mt-0.5" />
        </div>
      </button>
    );
  }

  return (
    <div className={`group rounded-2xl border bg-gradient-to-br ${categoryStyle} p-6 hover:border-opacity-50 transition-all duration-200 hover:-translate-y-0.5 flex flex-col gap-4`}>
      <div className="flex items-start justify-between">
        <span className="text-3xl">{CATEGORY_ICONS[profession.category]}</span>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyStyle}`}>
          {profession.difficulty}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-white font-bold text-lg mb-1.5 leading-snug">{profession.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{profession.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {profession.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-gray-500 text-xs">
          <Users size={12} />
          <span>{formatNumber(profession.interviewCount)} interviews</span>
        </div>
        <button
          onClick={handleStart}
          className="flex items-center gap-1.5 px-4 py-2 bg-cyan-400 text-black text-xs font-bold rounded-lg hover:bg-cyan-300 active:scale-95 transition-all duration-150"
        >
          Start <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}
