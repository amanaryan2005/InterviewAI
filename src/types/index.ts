export interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  freeInterviewUsed: boolean;
  interviewCount: number;
  createdAt: string;
}

export type ProfessionCategory =
  | "Technology"
  | "Healthcare"
  | "Finance"
  | "Education"
  | "Engineering"
  | "Marketing"
  | "Design"
  | "Legal"
  | "Business"
  | "Science"
  | "Creative"
  | "Hospitality";

export interface Profession {
  id: string;
  title: string;
  category: ProfessionCategory;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  interviewCount: number;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  category: string;
  timeLimit: number;
  tips?: string;
}

export interface InterviewAnswer {
  questionId: string;
  questionText: string;
  transcription: string;
  duration: number;
  score?: number;
  feedback?: string;
  idealAnswer?: string;
  strengths?: string[];
  improvements?: string[];
}

export interface CategoryScore {
  name: string;
  score: number;
  color: string;
}

export interface InterviewSession {
  id: string;
  profession: string;
  professionTitle: string;
  startedAt: string;
  completedAt?: string;
  questions: InterviewQuestion[];
  answers: InterviewAnswer[];
  overallScore?: number;
  categoryScores?: CategoryScore[];
  summary?: string;
  strengths?: string[];
  improvements?: string[];
}
