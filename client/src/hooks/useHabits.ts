import { useState, useEffect, useCallback } from "react";
import { HabitWithMetrics } from "@shared/schema";
import {
  getHabits,
  getHabitById,
  addHabit,
  updateHabit,
  deleteHabit,
  toggleHabitCompletion,
  getTodayCompletionPercentage,
  getCurrentUserStreak,
  getTotalCompletions,
  getWeeklyProgressData
} from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

export function useHabits() {
  const [habits, setHabits] = useState<HabitWithMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [todayPercentage, setTodayPercentage] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalCompletions, setTotalCompletions] = useState(0);
  const [weeklyData, setWeeklyData] = useState<{ day: string, completed: number, total: number }[]>([]);
  const { toast } = useToast();

  // Load habits from storage
  const loadHabits = useCallback(() => {
    try {
      const habitsData = getHabits();
      setHabits(habitsData);
      setTodayPercentage(getTodayCompletionPercentage());
      setCurrentStreak(getCurrentUserStreak());
      setTotalCompletions(getTotalCompletions());
      setWeeklyData(getWeeklyProgressData());
      setLoading(false);
    } catch (error) {
      console.error("Failed to load habits:", error);
      toast({
        title: "Error",
        description: "Failed to load habits. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  }, [toast]);

  // Load habits on mount
  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  // Add a new habit
  const createHabit = useCallback(
    (habitData: Omit<HabitWithMetrics, "id" | "createdAt" | "streak" | "completedToday" | "totalCompletions" | "completionRate">) => {
      try {
        const newHabit = addHabit({
          ...habitData,
          streak: 0,
          completedToday: false,
          totalCompletions: 0,
          completionRate: 0,
          createdAt: new Date()
        });
        
        setHabits(prevHabits => [...prevHabits, newHabit]);
        setTodayPercentage(getTodayCompletionPercentage());
        
        toast({
          title: "Habit Created",
          description: `"${habitData.title}" has been added to your habits.`
        });
        
        return newHabit;
      } catch (error) {
        console.error("Failed to create habit:", error);
        toast({
          title: "Error",
          description: "Failed to create habit. Please try again.",
          variant: "destructive"
        });
        return null;
      }
    },
    [toast]
  );

  // Update an existing habit
  const editHabit = useCallback(
    (habitData: HabitWithMetrics) => {
      try {
        const updated = updateHabit(habitData);
        
        setHabits(prevHabits =>
          prevHabits.map(habit => (habit.id === updated.id ? updated : habit))
        );
        
        toast({
          title: "Habit Updated",
          description: `"${habitData.title}" has been updated.`
        });
        
        return updated;
      } catch (error) {
        console.error("Failed to update habit:", error);
        toast({
          title: "Error",
          description: "Failed to update habit. Please try again.",
          variant: "destructive"
        });
        return null;
      }
    },
    [toast]
  );

  // Remove a habit
  const removeHabit = useCallback(
    (id: number) => {
      try {
        const habitToDelete = habits.find(h => h.id === id);
        if (!habitToDelete) return false;
        
        deleteHabit(id);
        
        setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
        setTodayPercentage(getTodayCompletionPercentage());
        setCurrentStreak(getCurrentUserStreak());
        setTotalCompletions(getTotalCompletions());
        setWeeklyData(getWeeklyProgressData());
        
        toast({
          title: "Habit Deleted",
          description: `"${habitToDelete.title}" has been removed.`
        });
        
        return true;
      } catch (error) {
        console.error("Failed to delete habit:", error);
        toast({
          title: "Error",
          description: "Failed to delete habit. Please try again.",
          variant: "destructive"
        });
        return false;
      }
    },
    [habits, toast]
  );

  // Toggle completion status for today
  const toggleCompletion = useCallback(
    (id: number) => {
      try {
        const updated = toggleHabitCompletion(id, 1); // Using userId 1 for demo
        
        setHabits(prevHabits =>
          prevHabits.map(habit => (habit.id === updated.id ? updated : habit))
        );
        
        setTodayPercentage(getTodayCompletionPercentage());
        setCurrentStreak(getCurrentUserStreak());
        setTotalCompletions(getTotalCompletions());
        setWeeklyData(getWeeklyProgressData());
        
        if (updated.completedToday) {
          toast({
            title: "Habit Completed",
            description: `Great job completing "${updated.title}"!`
          });
        }
        
        return updated;
      } catch (error) {
        console.error("Failed to toggle habit completion:", error);
        toast({
          title: "Error",
          description: "Failed to update habit status. Please try again.",
          variant: "destructive"
        });
        return null;
      }
    },
    [toast]
  );

  return {
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
    refreshHabits: loadHabits
  };
}
