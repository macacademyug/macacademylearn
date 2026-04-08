import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProgressContextType {
  completedLessons: Record<string, boolean>;
  markComplete: (lessonId: string) => void;
  toggleComplete: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;
  getCourseProgress: (courseId: string, totalLessons: number) => number;
  isCourseComplete: (courseId: string, lessonIds: string[]) => boolean;
  unlockedCourses: Record<string, boolean>;
  unlockCourse: (courseId: string) => void;
  isUnlocked: (courseId: string) => boolean;
  studyStreak: number;
  lastStudyDate: string | null;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = "@mac_academy_progress";
const UNLOCK_KEY = "@mac_academy_unlocked";
const STREAK_KEY = "@mac_academy_streak";
const STREAK_DATE_KEY = "@mac_academy_streak_date";

function getTodayStr() {
  return new Date().toISOString().split("T")[0];
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [unlockedCourses, setUnlockedCourses] = useState<Record<string, boolean>>({ beginner: true });
  const [studyStreak, setStudyStreak] = useState(0);
  const [lastStudyDate, setLastStudyDate] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setCompletedLessons(JSON.parse(saved));
        const unlocked = await AsyncStorage.getItem(UNLOCK_KEY);
        if (unlocked) setUnlockedCourses(JSON.parse(unlocked));
        const streak = await AsyncStorage.getItem(STREAK_KEY);
        const streakDate = await AsyncStorage.getItem(STREAK_DATE_KEY);
        const dateStr = streakDate ?? null;
        const today = getTodayStr();
        if (dateStr) {
          const last = new Date(dateStr);
          const diff = Math.floor((Date.now() - last.getTime()) / (1000 * 60 * 60 * 24));
          if (diff > 1) {
            setStudyStreak(0);
            await AsyncStorage.setItem(STREAK_KEY, "0");
          } else {
            setStudyStreak(streak ? parseInt(streak) : 0);
          }
        }
        setLastStudyDate(dateStr);
      } catch {}
    })();
  }, []);

  const updateStreak = async (currentStreak: number, currentLastDate: string | null) => {
    const today = getTodayStr();
    if (currentLastDate === today) return;
    let newStreak = 1;
    if (currentLastDate) {
      const last = new Date(currentLastDate);
      const diff = Math.floor((Date.now() - last.getTime()) / (1000 * 60 * 60 * 24));
      if (diff === 1) newStreak = currentStreak + 1;
    }
    setStudyStreak(newStreak);
    setLastStudyDate(today);
    await AsyncStorage.setItem(STREAK_KEY, String(newStreak));
    await AsyncStorage.setItem(STREAK_DATE_KEY, today);
  };

  const markComplete = async (lessonId: string) => {
    const updated = { ...completedLessons, [lessonId]: true };
    setCompletedLessons(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      await updateStreak(studyStreak, lastStudyDate);
    } catch {}
  };

  const toggleComplete = async (lessonId: string) => {
    const current = !!completedLessons[lessonId];
    const updated = { ...completedLessons, [lessonId]: !current };
    setCompletedLessons(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      if (!current) await updateStreak(studyStreak, lastStudyDate);
    } catch {}
  };

  const isComplete = (lessonId: string) => !!completedLessons[lessonId];

  const getCourseProgress = (courseId: string, totalLessons: number) => {
    if (totalLessons === 0) return 0;
    const completed = Object.keys(completedLessons).filter(
      (key) => key.startsWith(courseId) && completedLessons[key]
    ).length;
    return Math.round((completed / totalLessons) * 100);
  };

  const isCourseComplete = (courseId: string, lessonIds: string[]) => {
    if (lessonIds.length === 0) return false;
    return lessonIds.every((id) => !!completedLessons[id]);
  };

  const unlockCourse = async (courseId: string) => {
    const updated = { ...unlockedCourses, [courseId]: true };
    setUnlockedCourses(updated);
    try {
      await AsyncStorage.setItem(UNLOCK_KEY, JSON.stringify(updated));
    } catch {}
  };

  const isUnlocked = (courseId: string) => !!unlockedCourses[courseId];

  return (
    <ProgressContext.Provider
      value={{ completedLessons, markComplete, toggleComplete, isComplete, getCourseProgress, isCourseComplete, unlockedCourses, unlockCourse, isUnlocked, studyStreak, lastStudyDate }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
