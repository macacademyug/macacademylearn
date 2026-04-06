import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProgressContextType {
  completedLessons: Record<string, boolean>;
  markComplete: (lessonId: string) => void;
  isComplete: (lessonId: string) => boolean;
  getCourseProgress: (courseId: string, totalLessons: number) => number;
  unlockedCourses: Record<string, boolean>;
  unlockCourse: (courseId: string) => void;
  isUnlocked: (courseId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = "@mac_academy_progress";
const UNLOCK_KEY = "@mac_academy_unlocked";

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<Record<string, boolean>>({});
  const [unlockedCourses, setUnlockedCourses] = useState<Record<string, boolean>>({
    beginner: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setCompletedLessons(JSON.parse(saved));
        const unlocked = await AsyncStorage.getItem(UNLOCK_KEY);
        if (unlocked) setUnlockedCourses(JSON.parse(unlocked));
      } catch {}
    })();
  }, []);

  const markComplete = async (lessonId: string) => {
    const updated = { ...completedLessons, [lessonId]: true };
    setCompletedLessons(updated);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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
      value={{ completedLessons, markComplete, isComplete, getCourseProgress, unlockedCourses, unlockCourse, isUnlocked }}
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
