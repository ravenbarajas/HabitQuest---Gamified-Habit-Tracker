import { useState, useEffect, useCallback } from "react";
import { AchievementWithStatus } from "@shared/schema";
import { getAchievements, getRecentAchievements, getUnlockedAchievementsCount } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

export function useAchievements() {
  const [achievements, setAchievements] = useState<AchievementWithStatus[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<AchievementWithStatus[]>([]);
  const [unlockedCount, setUnlockedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load all achievements
  const loadAchievements = useCallback(() => {
    try {
      const achievementsData = getAchievements();
      setAchievements(achievementsData);
      
      const recent = getRecentAchievements();
      setRecentAchievements(recent);
      
      setUnlockedCount(getUnlockedAchievementsCount());
      setLoading(false);
    } catch (error) {
      console.error("Failed to load achievements:", error);
      toast({
        title: "Error",
        description: "Failed to load achievements. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  }, [toast]);

  // Load achievements on mount
  useEffect(() => {
    loadAchievements();
  }, [loadAchievements]);

  // Check for newly unlocked achievements
  const checkForNewAchievements = useCallback(() => {
    loadAchievements();
  }, [loadAchievements]);

  // Get unlocked achievements
  const getUnlockedAchievements = useCallback(() => {
    return achievements.filter(a => a.unlocked);
  }, [achievements]);

  // Get locked achievements
  const getLockedAchievements = useCallback(() => {
    return achievements.filter(a => !a.unlocked);
  }, [achievements]);

  return {
    achievements,
    recentAchievements,
    unlockedCount,
    loading,
    checkForNewAchievements,
    getUnlockedAchievements,
    getLockedAchievements,
    refreshAchievements: loadAchievements
  };
}
