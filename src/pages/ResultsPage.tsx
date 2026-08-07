import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, ArrowLeft, RotateCcw, Zap, TrendingUp, TrendingDown } from "lucide-react";
import Header from "@/components/layout/Header";
import { ScoreGauge } from "@/components/features/ScoreGauge";
import { getSession } from "@/lib/storage";
import { getScoreTailwindColor } from "@/lib/utils";
import type { InterviewSession } from "@/types";

export default function ResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!sessionId) return;
    const s = getSession(sessionId);
    if (s) setSession(s);
    else navigate("/professions");
  }, [sessionId, navigate]);

  if (!session) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  const score = session.overallScore ?? 0;

  return (
    <div className="min-h-screen bg-[#020817]">
      <Header />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Back */}
          <button
            onClick={() => navigate("/professions")}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Professions
          </button>

          {/* Hero Score Section */}
          <div className="card-surface rounded-2xl border border-white/8 p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              {/* Score gauge */}
              <div className="flex-shrink-0">
                <ScoreGauge score={score} size={160} />
              </div>

              {/* Summary */}
              <div className="flex-1 text-center lg:text-left">
                <div className="text-xs text-cyan-400 font-medium uppercase tracking-widest mb-2">
                  Interview Complete — {session.professionTitle}
                </div>
                <h1 className="text-3xl font-bold text-white mb-3 font-display">
                  {score >= 85 ? "Outstanding Performance!" :
                   score >= 70 ? "Strong Interview!" :
                   score >= 55 ? "Good Effort!" : "Keep Practicing!"}
                </h1>
                <p className="text-gray-400 leading-relaxed mb-5">{session.summary}</p>

                {/* Strengths + Improvements row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/15">
                    <div className="flex items-center gap-2 mb-2.5">
                      <TrendingUp size={14} className="text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Strengths</span>
                    </div>
                    <ul className="space-y-1.5">
                      {(session.strengths ?? []).map((s, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">✓</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/15">
                    <div className="flex items-center gap-2 mb-2.5">
                      <TrendingDown size={14} className="text-amber-400" />
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Improve</span>
                    </div>
                    <ul className="space-y-1.5">
                      {(session.improvements ?? []).map((s, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">→</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Scores */}
          {session.categoryScores && session.categoryScores.length > 0 && (
            <div className="card-surface rounded-2xl border border-white/8 p-8">
              <h2 className="text-white font-bold text-lg mb-6">Score Breakdown</h2>
              <div className="space-y-4">
                {session.categoryScores.map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-300 font-medium">{cat.name}</span>
                      <span className="text-sm font-bold" style={{ color: cat.color }}>
                        {cat.score}/100
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${cat.score}%`,
                          backgroundColor: cat.color,
                          boxShadow: `0 0 8px ${cat.color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Per-Question Feedback */}
          <div>
            <h2 className="text-white font-bold text-lg mb-4">Question-by-Question Feedback</h2>
            <div className="space-y-3">
              {session.answers.map((answer, i) => {
                const isOpen = openIndex === i;
                const qScore = answer.score ?? 0;
                const scoreColor = getScoreTailwindColor(qScore);

                return (
                  <div
                    key={i}
                    className="card-surface rounded-xl border border-white/8 overflow-hidden"
                  >
                    {/* Accordion header */}
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-400 font-bold">{i + 1}</span>
                      </div>
                      <p className="flex-1 text-white text-sm font-medium line-clamp-2 leading-snug">
                        {answer.questionText}
                      </p>
                      <div className={`text-sm font-bold flex-shrink-0 ${scoreColor}`}>
                        {qScore}/100
                      </div>
                      {isOpen ? (
                        <ChevronUp size={16} className="text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown size={16} className="text-gray-500 flex-shrink-0" />
                      )}
                    </button>

                    {/* Accordion body */}
                    {isOpen && (
                      <div className="px-5 pb-6 space-y-4 border-t border-white/5 pt-5">
                        {/* Your answer */}
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Your Answer</p>
                          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                              {answer.transcription}
                            </p>
                          </div>
                        </div>

                        {/* AI Feedback */}
                        {answer.feedback && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">AI Feedback</p>
                            <div className="p-3.5 rounded-xl bg-blue-500/5 border border-blue-500/15">
                              <p className="text-blue-200/80 text-sm leading-relaxed">{answer.feedback}</p>
                            </div>
                          </div>
                        )}

                        {/* Ideal Answer */}
                        {answer.idealAnswer && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Ideal Answer Guidance</p>
                            <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                              <p className="text-emerald-200/80 text-sm leading-relaxed">{answer.idealAnswer}</p>
                            </div>
                          </div>
                        )}

                        {/* Strengths & Improvements */}
                        <div className="grid sm:grid-cols-2 gap-3">
                          {answer.strengths && answer.strengths.length > 0 && (
                            <div>
                              <p className="text-xs text-emerald-400 font-semibold mb-2">✓ Strengths</p>
                              <ul className="space-y-1">
                                {answer.strengths.map((s, j) => (
                                  <li key={j} className="text-xs text-gray-400">{s}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {answer.improvements && answer.improvements.length > 0 && (
                            <div>
                              <p className="text-xs text-amber-400 font-semibold mb-2">→ Improve</p>
                              <ul className="space-y-1">
                                {answer.improvements.map((s, j) => (
                                  <li key={j} className="text-xs text-gray-400">{s}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate(`/interview/${session.profession}`)}
              className="flex-1 flex items-center justify-center gap-2 py-4 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 transition-colors"
            >
              <RotateCcw size={18} />
              Practice Again
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              <Zap size={18} />
              Unlock Unlimited Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
