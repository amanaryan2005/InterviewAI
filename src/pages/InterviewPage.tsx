import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Mic, MicOff, Square, ChevronRight, SkipForward, Brain, Keyboard } from "lucide-react";
import { toast } from "sonner";
import { PROFESSIONS } from "@/constants/professions";
import { getQuestionsForProfession } from "@/constants/questions";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { canStartInterview, markFreeInterviewUsed, saveSession, getOrCreateUser } from "@/lib/storage";
import { evaluateSession } from "@/lib/interviewEngine";
import { generateId, formatTime } from "@/lib/utils";
import { WaveformVisualizer } from "@/components/features/WaveformVisualizer";
import type { InterviewSession, InterviewAnswer } from "@/types";

type Phase = "checking" | "gate" | "intro" | "question" | "recording" | "reviewing" | "evaluating";

const QUESTION_TIME = 120;

export default function InterviewPage() {
  const { professionId } = useParams<{ professionId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resolvedProfession = PROFESSIONS.find((p) => p.id === professionId);
  const professionTitle =
    searchParams.get("title") ||
    resolvedProfession?.title ||
    (professionId ? professionId.replace(/-/g, " ") : "General Interview");

  const questions = getQuestionsForProfession(
    professionId === "custom" ? "general" : professionId ?? "general"
  );

  const [phase, setPhase] = useState<Phase>("checking");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<InterviewAnswer[]>([]);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [startTime, setStartTime] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [useTextInput, setUseTextInput] = useState(false);

  const sessionRef = useRef<InterviewSession | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { isListening, transcript, interimTranscript, startListening, stopListening, resetTranscript, isSupported } =
    useSpeechRecognition();

  // Auth gate check
  useEffect(() => {
    const { canStart } = canStartInterview();
    setPhase(canStart ? "intro" : "gate");
  }, []);

  // Auto-use text if speech not supported
  useEffect(() => {
    if (!isSupported) setUseTextInput(true);
  }, [isSupported]);

  // Countdown timer
  useEffect(() => {
    if (phase !== "recording") return;
    if (timeLeft <= 0) {
      handleStopRecording();
      return;
    }
    const t = setTimeout(() => setTimeLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft]);

  const currentQuestion = questions[questionIndex];

  const handleStart = () => {
    const user = getOrCreateUser();
    const session: InterviewSession = {
      id: generateId(),
      profession: professionId ?? "general",
      professionTitle,
      startedAt: new Date().toISOString(),
      questions,
      answers: [],
    };
    sessionRef.current = session;
    markFreeInterviewUsed();
    setPhase("question");
  };

  const handleStartRecording = () => {
    resetTranscript();
    setTypedAnswer("");
    setTimeLeft(QUESTION_TIME);
    setStartTime(Date.now());
    setPhase("recording");
    if (!useTextInput && isSupported) {
      startListening();
    } else {
      setTimeout(() => textareaRef.current?.focus(), 100);
    }
  };

  const handleStopRecording = () => {
    if (isListening) stopListening();
    setPhase("reviewing");
  };

  const getActiveTranscript = () => {
    if (useTextInput) return typedAnswer;
    const full = (transcript + " " + interimTranscript).trim();
    return full;
  };

  const commitAnswer = (transcription: string) => {
    const duration = Math.round((Date.now() - startTime) / 1000);
    const answer: InterviewAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      transcription: transcription || "(No response provided)",
      duration,
    };
    const updated = [...answers, answer];
    setAnswers(updated);

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((i) => i + 1);
      setTimeLeft(QUESTION_TIME);
      resetTranscript();
      setTypedAnswer("");
      setPhase("question");
    } else {
      finishInterview(updated);
    }
  };

  const handleConfirm = () => commitAnswer(getActiveTranscript());

  const handleSkip = () => {
    if (isListening) stopListening();
    commitAnswer("(Skipped)");
  };

  const handleReRecord = () => {
    resetTranscript();
    setTypedAnswer("");
    setPhase("question");
  };

  const finishInterview = (finalAnswers: InterviewAnswer[]) => {
    setPhase("evaluating");
    const session = sessionRef.current!;
    const partial: InterviewSession = { ...session, answers: finalAnswers };
    setTimeout(() => {
      const result = evaluateSession(partial);
      const final: InterviewSession = {
        ...partial,
        ...result,
        completedAt: new Date().toISOString(),
      };
      saveSession(final);
      navigate(`/results/${final.id}`);
    }, 3200);
  };

  const progress = ((questionIndex) / questions.length) * 100;
  const timerColor = timeLeft < 30 ? "text-red-400" : timeLeft < 60 ? "text-amber-400" : "text-cyan-400";

  // ── Gate Screen ──
  if (phase === "gate") {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4">
        <div className="max-w-sm w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-4xl">
            🔒
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 font-display">Upgrade Required</h2>
          <p className="text-gray-400 mb-8 leading-relaxed text-sm">
            Your free interview has been used. Upgrade to Premium for unlimited practice across all professions.
          </p>
          <button onClick={() => navigate("/pricing")} className="w-full py-3.5 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-colors mb-3">
            View Premium Plans
          </button>
          <button onClick={() => navigate("/professions")} className="w-full py-3 text-gray-400 hover:text-white text-sm transition-colors">
            ← Back to Professions
          </button>
        </div>
      </div>
    );
  }

  // ── Checking Screen ──
  if (phase === "checking") {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center">
        <div className="w-6 h-6 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  // ── Evaluating Screen ──
  if (phase === "evaluating") {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="w-20 h-20 rounded-full border-2 border-cyan-400/20 absolute" />
            <div className="w-20 h-20 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin absolute" />
            <Brain className="w-8 h-8 text-cyan-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 font-display">Analyzing Your Responses</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Our AI is evaluating your answers, scoring your performance, and generating personalized coaching feedback…
          </p>
          <div className="mt-8 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-cyan-400/50 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] flex flex-col">
      {/* Header bar */}
      <header className="border-b border-white/5 px-4 sm:px-6 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-cyan-400 font-medium uppercase tracking-widest mb-0.5">AI Interview</div>
            <h1 className="text-white font-bold truncate">{professionTitle}</h1>
          </div>
          {phase !== "intro" && (
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-sm text-gray-400">
                Q<span className="text-white font-bold">{questionIndex + 1}</span>
                <span className="text-gray-600">/{questions.length}</span>
              </div>
              {phase === "recording" && (
                <div className={`font-mono font-bold text-lg ${timerColor} tabular-nums`}>
                  {formatTime(timeLeft)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Progress bar */}
        {phase !== "intro" && (
          <div className="max-w-4xl mx-auto mt-3">
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">

          {/* ── Intro Screen ── */}
          {phase === "intro" && (
            <div className="text-center space-y-8 animate-fade-up">
              <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" />
                <div className="w-24 h-24 rounded-full border-2 border-cyan-400/40 bg-cyan-400/5 flex items-center justify-center">
                  <Brain className="w-10 h-10 text-cyan-400" />
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-3 font-display">
                  Your {professionTitle} Interview
                </h2>
                <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
                  You'll be asked <strong className="text-white">{questions.length} questions</strong> by your AI interviewer.
                  Speak naturally using your microphone, or type your answers.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                {[
                  { icon: "🎤", label: "Voice or text" },
                  { icon: "⏱", label: "2 min / question" },
                  { icon: "📊", label: "Full AI scoring" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-xs text-gray-400 font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleStart}
                className="px-10 py-4 bg-cyan-400 text-black font-bold text-lg rounded-xl hover:bg-cyan-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Begin Interview →
              </button>
            </div>
          )}

          {/* ── Question / Recording / Reviewing ── */}
          {(phase === "question" || phase === "recording" || phase === "reviewing") && (
            <div className="space-y-6">
              {/* Question card */}
              <div className="card-surface rounded-2xl border border-white/10 p-8">
                <div className="flex items-center gap-2 mb-5">
                  <div className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full">
                    <span className="text-xs text-cyan-400 font-semibold">
                      Question {questionIndex + 1} of {questions.length}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 bg-white/5 px-2 py-1 rounded-full">
                    {currentQuestion.category}
                  </span>
                </div>

                <p className="text-white text-xl leading-relaxed font-medium">
                  {currentQuestion.question}
                </p>

                {currentQuestion.tips && phase === "question" && (
                  <div className="mt-5 p-4 rounded-xl bg-blue-500/5 border border-blue-500/15">
                    <p className="text-xs text-blue-300/70 leading-relaxed">
                      💡 <span className="font-medium text-blue-300">Tip:</span> {currentQuestion.tips}
                    </p>
                  </div>
                )}
              </div>

              {/* Recording controls */}
              {(phase === "question" || phase === "recording") && (
                <div className="card-surface rounded-2xl border border-white/8 p-8">
                  {/* Input mode toggle */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-400 text-sm">
                      {phase === "recording" ? (useTextInput ? "Type your answer below" : "Listening… speak clearly") : "Ready to record your answer"}
                    </p>
                    {isSupported && (
                      <button
                        onClick={() => setUseTextInput((v) => !v)}
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                      >
                        {useTextInput ? <Mic size={13} /> : <Keyboard size={13} />}
                        {useTextInput ? "Use voice" : "Use keyboard"}
                      </button>
                    )}
                  </div>

                  {/* Text input mode */}
                  {useTextInput && phase === "recording" ? (
                    <textarea
                      ref={textareaRef}
                      value={typedAnswer}
                      onChange={(e) => setTypedAnswer(e.target.value)}
                      placeholder="Type your answer here…"
                      rows={5}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 text-sm leading-relaxed resize-none focus:outline-none focus:border-cyan-400/40 transition-colors"
                    />
                  ) : (
                    /* Voice recording UI */
                    <div className="flex flex-col items-center gap-6">
                      {/* Mic button */}
                      <div className="relative flex items-center justify-center">
                        {phase === "recording" && (
                          <>
                            <div className="absolute w-24 h-24 rounded-full border-2 border-red-400/30 animate-ping" />
                            <div className="absolute w-20 h-20 rounded-full border border-red-400/20 animate-pulse" />
                          </>
                        )}
                        <button
                          onClick={phase === "recording" ? handleStopRecording : handleStartRecording}
                          className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
                            phase === "recording"
                              ? "bg-red-500 hover:bg-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                              : "bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
                          }`}
                        >
                          {phase === "recording" ? (
                            <Square className="w-6 h-6 text-white" fill="white" />
                          ) : (
                            <Mic className="w-6 h-6 text-black" />
                          )}
                        </button>
                      </div>

                      {/* Waveform */}
                      <WaveformVisualizer
                        isActive={phase === "recording" && isListening}
                        color={phase === "recording" ? "#ef4444" : "#00d4ff"}
                        height={40}
                        barCount={20}
                      />

                      {/* Real-time transcript preview */}
                      {phase === "recording" && (transcript || interimTranscript) && (
                        <div className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/8 max-h-32 overflow-y-auto">
                          <p className="text-gray-300 text-sm leading-relaxed">
                            {transcript}
                            <span className="text-gray-500 italic">{interimTranscript}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/5">
                    <button
                      onClick={handleSkip}
                      className="flex items-center gap-1.5 text-gray-500 hover:text-gray-300 text-sm transition-colors"
                    >
                      <SkipForward size={15} />
                      Skip question
                    </button>
                    {phase === "question" && (
                      <button
                        onClick={handleStartRecording}
                        className="flex items-center gap-2 px-6 py-2.5 bg-cyan-400 text-black text-sm font-bold rounded-lg hover:bg-cyan-300 transition-colors"
                      >
                        {useTextInput ? <Keyboard size={15} /> : <Mic size={15} />}
                        {useTextInput ? "Start typing" : "Start recording"}
                      </button>
                    )}
                    {phase === "recording" && (
                      <button
                        onClick={handleStopRecording}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white/10 text-white text-sm font-bold rounded-lg hover:bg-white/15 transition-colors border border-white/10"
                      >
                        <MicOff size={15} />
                        Stop & review
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Review screen */}
              {phase === "reviewing" && (
                <div className="card-surface rounded-2xl border border-white/8 p-8 space-y-5">
                  <h3 className="text-white font-semibold">Review Your Answer</h3>
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/8 min-h-[80px]">
                    {getActiveTranscript() ? (
                      <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
                        {getActiveTranscript()}
                      </p>
                    ) : (
                      <p className="text-gray-600 text-sm italic">No response recorded.</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={handleReRecord}
                      className="flex-1 py-3 border border-white/10 text-gray-300 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
                    >
                      Re-record
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 py-3 bg-cyan-400 text-black font-bold rounded-xl text-sm hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2"
                    >
                      {questionIndex < questions.length - 1 ? "Next Question" : "Finish Interview"}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
