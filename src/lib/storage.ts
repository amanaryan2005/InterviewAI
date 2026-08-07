import type { User, InterviewSession } from "@/types";
import { generateId } from "@/lib/utils";

const KEYS = {
  user: "interviewai_user",
  sessions: "interviewai_sessions",
};

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(KEYS.user);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

export function saveUser(user: User): void {
  localStorage.setItem(KEYS.user, JSON.stringify(user));
}

export function getOrCreateUser(): User {
  const existing = getUser();
  if (existing) return existing;
  const user: User = {
    id: generateId(),
    name: "Guest User",
    email: "",
    isPremium: false,
    freeInterviewUsed: false,
    interviewCount: 0,
    createdAt: new Date().toISOString(),
  };
  saveUser(user);
  return user;
}

export function markFreeInterviewUsed(): void {
  const user = getOrCreateUser();
  saveUser({ ...user, freeInterviewUsed: true, interviewCount: user.interviewCount + 1 });
}

export function setPremium(isPremium: boolean): void {
  const user = getOrCreateUser();
  saveUser({ ...user, isPremium });
}

export function canStartInterview(): { canStart: boolean; reason?: string } {
  const user = getOrCreateUser();
  if (user.isPremium) return { canStart: true };
  if (!user.freeInterviewUsed) return { canStart: true };
  return { canStart: false, reason: "free_used" };
}

export function getSessions(): InterviewSession[] {
  try {
    const raw = localStorage.getItem(KEYS.sessions);
    return raw ? (JSON.parse(raw) as InterviewSession[]) : [];
  } catch {
    return [];
  }
}

export function saveSession(session: InterviewSession): void {
  const sessions = getSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session);
  }
  localStorage.setItem(KEYS.sessions, JSON.stringify(sessions));
}

export function getSession(id: string): InterviewSession | null {
  return getSessions().find((s) => s.id === id) ?? null;
}
