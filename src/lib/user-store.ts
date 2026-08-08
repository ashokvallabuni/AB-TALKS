import { useState, useEffect } from "react";
import { DayStatus } from "./abtalks-data";

export type UserSubmission = {
  day: number;
  completedAt: string;
  githubUrl?: string;
  linkedinUrl?: string;
  synergyEarned: number;
};

const STORAGE_KEY = "abtalks_user_state_v1";

export type UserState = {
  selectedTrack: string;
  synergyPoints: number;
  currentStreak: number;
  longestStreak: number;
  completedDays: number[];
  dayStatusMap: Record<number, DayStatus>;
  submissions: Record<number, UserSubmission>;
  referralCode: string;
};

const DEFAULT_STATE: UserState = {
  selectedTrack: "claude-challenge",
  synergyPoints: 0,
  currentStreak: 0,
  longestStreak: 0,
  completedDays: [],
  dayStatusMap: {
    1: "Future",
  },
  submissions: {},
  referralCode: "N74HY3",
};

export function useUserState() {
  const [state, setState] = useState<UserState>(() => {
    if (typeof window === "undefined") return DEFAULT_STATE;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to parse local storage user state:", e);
    }
    return DEFAULT_STATE;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error("Failed to save user state:", e);
      }
    }
  }, [state]);

  const selectTrack = (trackId: string) => {
    setState((prev: UserState) => ({ ...prev, selectedTrack: trackId }));
  };

  const submitDayTask = (day: number, githubUrl?: string, linkedinUrl?: string) => {
    let earned = 0;
    if (githubUrl && githubUrl.trim().length > 0) earned += 5;
    if (linkedinUrl && linkedinUrl.trim().length > 0) earned += 8;

    const now = new Date().toISOString();
    const isNew = !state.completedDays.includes(day);

    setState((prev: UserState) => {
      const newCompletedDays = isNew ? [...prev.completedDays, day] : prev.completedDays;
      const newStreak = isNew ? prev.currentStreak + 1 : prev.currentStreak;
      const newLongest = Math.max(prev.longestStreak, newStreak);
      const newSynergy = prev.synergyPoints + (isNew ? earned : 0);

      return {
        ...prev,
        synergyPoints: newSynergy,
        currentStreak: newStreak,
        longestStreak: newLongest,
        completedDays: newCompletedDays,
        dayStatusMap: {
          ...prev.dayStatusMap,
          [day]: "On time",
        },
        submissions: {
          ...prev.submissions,
          [day]: {
            day,
            completedAt: now,
            synergyEarned: earned,
            ...(githubUrl ? { githubUrl } : {}),
            ...(linkedinUrl ? { linkedinUrl } : {}),
          },
        },
      };
    });
  };

  return {
    state,
    selectTrack,
    submitDayTask,
  };
}
