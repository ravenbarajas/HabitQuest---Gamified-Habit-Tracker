import React, { createContext, useContext, ReactNode } from "react";
import { HabitWithMetrics } from "@shared/schema";
import { useHabits } from "@/hooks/useHabits";
import { useAchievements } from "@/hooks/useAchievements";
import { motivationalQuotes } from "@/lib/utils";

interface HabitContextType {
  // Habit data
  habits: HabitWithMetrics[];
  loading: boolean;
  todayPercentage: number;
  currentStreak: number;
  totalCompletions: number;
  weeklyData: { day: string; completed: number; total: number }[];
  
  // Habit actions
  createHabit: ReturnType<typeof useHabits>["createHabit"];
  editHabit: ReturnType<typeof useHabits>["editHabit"];
  removeHabit: ReturnType<typeof useHabits>["removeHabit"];
  toggleCompletion: ReturnType<typeof useHabits>["toggleCompletion"];
  refreshHabits: ReturnType<typeof useHabits>["refreshHabits"];
  
  // Achievement data
  achievements: ReturnType<typeof useAchievements>["achievements"];
  recentAchievements: ReturnType<typeof useAchievements>["recentAchievements"];
  unlockedCount: number;
  
  // Achievement actions
  checkForNewAchievements: ReturnType<typeof useAchievements>["checkForNewAchievements"];
  getUnlockedAchievements: ReturnType<typeof useAchievements>["getUnlockedAchievements"];
  getLockedAchievements: ReturnType<typeof useAchievements>["getLockedAchievements"];
  
  // UI State
  quote: { quote: string; author: string };
  refreshQuote: () => void;
  userName: string;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: ReactNode }) {
  const {
    habits,
    loading,
    todayPercentage,
    currentStreak,
    totalCompletions,
    weeklyData,
    createHabit,
    editHabit,
    removeHabit,
    toggleCompletion,
    refreshHabits
  } = useHabits();

  const {
    achievements,
    recentAchievements,
    unlockedCount,
    checkForNewAchievements,
    getUnlockedAchievements,
    getLockedAchievements
  } = useAchievements();

  // Motivational quote - random selection
  const [quote, setQuote] = React.useState(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    return motivationalQuotes[randomIndex];
  });

  const refreshQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  };

  // For demonstration purposes, using a fixed username
  const userName = "Alex";

  const value = {
    habits,
    loading,
    todayPercentage,
    currentStreak,
    totalCompletions,
    weeklyData,
    createHabit,
    editHabit,
    removeHabit,
    toggleCompletion,
    refreshHabits,
    achievements,
    recentAchievements,
    unlockedCount,
    checkForNewAchievements,
    getUnlockedAchievements,
    getLockedAchievements,
    quote,
    refreshQuote,
    userName
  };

  return <HabitContext.Provider value={value}>{children}</HabitContext.Provider>;
}

export function useHabitContext() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabitContext must be used within a HabitProvider");
  }
  return context;
}
