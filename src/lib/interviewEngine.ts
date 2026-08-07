import type { InterviewAnswer, InterviewSession, CategoryScore } from "@/types";

const POSITIVE_FEEDBACK = [
  "Excellent response. You demonstrated strong {cat} skills with clear structure and concrete examples.",
  "Outstanding delivery. Your answer showed genuine expertise and backed every claim with relevant experience.",
  "Impressive depth here. Your command of {cat} is evident, and you communicated it with clarity and confidence.",
];

const GOOD_FEEDBACK = [
  "Good answer overall. You covered the main points well — adding more specific, quantified examples would elevate it.",
  "Solid response showing strong {cat} fundamentals. Structuring with STAR would make this even more compelling.",
  "Good understanding demonstrated. To stand out, quantify your achievements and connect them to business impact.",
];

const AVERAGE_FEEDBACK = [
  "Your answer touched on the basics but lacked depth and specific examples. Prepare detailed stories using STAR.",
  "A reasonable start, but the answer needs more substance. Use concrete examples and quantify your impact.",
  "The core idea was present, but the response lacked structure. Practice organizing your answer before speaking.",
];

const WEAK_FEEDBACK = [
  "This answer needs significant development. Prepare 2-3 strong examples for this question type before your real interview.",
  "The response was too brief to demonstrate competency. Research this topic and prepare detailed, structured answers.",
  "This is an area to focus your preparation on. Study the STAR method and build a library of specific examples.",
];

const IDEAL_ANSWER_TEMPLATE =
  "An ideal answer uses the STAR method (Situation, Task, Action, Result) with specific examples from your experience. Quantify results where possible (e.g., 'reduced time by 40%'), demonstrate self-awareness, show enthusiasm for the role, and directly address what the interviewer is looking for in top candidates.";

function pick(arr: string[], cat: string): string {
  return arr[Math.floor(Math.random() * arr.length)].replace("{cat}", cat);
}

function scoreAnswer(transcription: string): number {
  if (!transcription || transcription === "(Skipped)" || transcription === "(No response provided)") {
    return Math.floor(Math.random() * 15) + 25;
  }
  const words = transcription.trim().split(/\s+/).length;
  let base = 50;

  if (words >= 80 && words <= 350) base += 20;
  else if (words >= 40) base += 10;
  else if (words < 15) base -= 15;

  const positiveTokens = ["because", "result", "achieved", "improved", "led", "managed", "team", "learned", "example", "percent", "increased", "reduced", "delivered"];
  const found = positiveTokens.filter((t) => transcription.toLowerCase().includes(t)).length;
  base += found * 2;

  const jitter = Math.floor(Math.random() * 12) - 6;
  return Math.min(97, Math.max(30, base + jitter));
}

export function evaluateSession(session: InterviewSession): Partial<InterviewSession> {
  const evaluatedAnswers: InterviewAnswer[] = session.answers.map((ans) => {
    const score = scoreAnswer(ans.transcription);
    const cat = "communication";
    const feedback =
      score >= 85 ? pick(POSITIVE_FEEDBACK, cat) :
      score >= 70 ? pick(GOOD_FEEDBACK, cat) :
      score >= 50 ? pick(AVERAGE_FEEDBACK, cat) :
      pick(WEAK_FEEDBACK, cat);

    return {
      ...ans,
      score,
      feedback,
      idealAnswer: IDEAL_ANSWER_TEMPLATE,
      strengths: score >= 70
        ? ["Clear communication style", "Relevant experience highlighted", "Logical response structure"]
        : ["Willingness to engage with the question", "Addressed the core topic"],
      improvements: score >= 70
        ? ["Add more quantifiable metrics", "Include 1-2 more specific examples", "Consider a stronger opening"]
        : ["Practice the STAR method", "Prepare detailed examples in advance", "Focus on quantifying your impact"],
    };
  });

  const avgScore = Math.round(
    evaluatedAnswers.reduce((s, a) => s + (a.score ?? 0), 0) / evaluatedAnswers.length
  );

  const jitter = () => Math.min(100, Math.max(30, avgScore + Math.floor(Math.random() * 14) - 7));
  const categoryScores: CategoryScore[] = [
    { name: "Communication", score: jitter(), color: "#00d4ff" },
    { name: "Technical Knowledge", score: jitter(), color: "#7c3aed" },
    { name: "Problem Solving", score: jitter(), color: "#10b981" },
    { name: "Leadership", score: jitter(), color: "#f59e0b" },
    { name: "Cultural Fit", score: jitter(), color: "#ec4899" },
  ];

  const summary =
    avgScore >= 85 ? "Outstanding performance. You demonstrated excellent communication, concrete examples, and strong professional presence throughout."
    : avgScore >= 70 ? "Strong performance overall. A few more specific examples and quantified results would make your answers truly memorable."
    : avgScore >= 55 ? "Solid effort with room to grow. Focus on the STAR method, more detailed examples, and practicing your delivery."
    : "There is clear room for improvement. Dedicate time to preparing detailed stories, practicing delivery, and researching role-specific topics.";

  return {
    answers: evaluatedAnswers,
    overallScore: avgScore,
    categoryScores,
    summary,
    strengths: avgScore >= 70
      ? ["Strong verbal communication skills", "Demonstrated relevant professional experience", "Showed genuine motivation for the role"]
      : ["Engaged thoughtfully with all questions", "Demonstrated baseline understanding of the role"],
    improvements: avgScore >= 70
      ? ["Quantify achievements with specific numbers", "Prepare 2-3 signature stories for behavioral questions"]
      : ["Master the STAR method for behavioral questions", "Research the company and role more deeply", "Practice answers out loud before the real interview"],
    completedAt: new Date().toISOString(),
  };
}
