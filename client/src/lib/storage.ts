import { HabitWithMetrics, AchievementWithStatus } from "@shared/schema";
import { calculateStreak } from "./utils";

// Storage keys
const STORAGE_KEYS = {
  HABITS: 'habits_data',
  COMPLETIONS: 'habit_completions',
  ACHIEVEMENTS: 'achievements',
  USER_ACHIEVEMENTS: 'user_achievements',
  USER: 'current_user'
};

// Default habits
const DEFAULT_HABITS: HabitWithMetrics[] = [
  {
    id: 1,
    userId: 1,
    title: "Morning Meditation",
    description: "10 minutes of mindfulness meditation",
    frequency: "daily",
    timeOfDay: "8:00 AM",
    isActive: true,
    createdAt: new Date(),
    streak: 28,
    completedToday: true,
    totalCompletions: 45,
    completionRate: 90
  },
  {
    id: 2,
    userId: 1,
    title: "Read for 30 minutes",
    description: "Read books that help you grow",
    frequency: "daily",
    timeOfDay: "10:00 AM",
    isActive: true,
    createdAt: new Date(),
    streak: 14,
    completedToday: true,
    totalCompletions: 32,
    completionRate: 85
  },
  {
    id: 3,
    userId: 1,
    title: "Workout Session",
    description: "30 minutes strength training",
    frequency: "daily",
    timeOfDay: "5:30 PM",
    isActive: true,
    createdAt: new Date(),
    streak: 5,
    completedToday: true,
    totalCompletions: 20,
    completionRate: 70
  },
  {
    id: 4,
    userId: 1,
    title: "Drink 8 Glasses of Water",
    description: "Stay hydrated throughout the day",
    frequency: "daily",
    timeOfDay: null,
    isActive: true,
    createdAt: new Date(),
    streak: 0,
    completedToday: false,
    totalCompletions: 15,
    completionRate: 50
  }
];

// Default achievements
const DEFAULT_ACHIEVEMENTS: AchievementWithStatus[] = [
  {
    id: 1,
    title: "7-Day Streak",
    description: "Complete a habit for 7 days in a row",
    icon: "ri-fire-line",
    requiredCount: 7,
    type: "streak",
    unlocked: true,
    unlockedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    progress: 100
  },
  {
    id: 2,
    title: "Early Bird",
    description: "Complete a habit before 9 AM for 5 days",
    icon: "ri-sun-line",
    requiredCount: 5,
    type: "completion",
    unlocked: true,
    unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    progress: 100
  },
  {
    id: 3,
    title: "Healthy Mind",
    description: "Complete 10 meditation sessions",
    icon: "ri-mental-health-line",
    requiredCount: 10,
    type: "completion",
    unlocked: true,
    unlockedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    progress: 100
  },
  {
    id: 4,
    title: "Book Worm",
    description: "Read for 20 days total",
    icon: "ri-book-open-line",
    requiredCount: 20,
    type: "completion",
    unlocked: false,
    progress: 80
  },
  {
    id: 5,
    title: "30-Day Streak",
    description: "Maintain a habit for 30 consecutive days",
    icon: "ri-fire-fill",
    requiredCount: 30,
    type: "streak",
    unlocked: false,
    progress: 93
  },
  {
    id: 6,
    title: "Consistency King",
    description: "Complete all habits for 7 days straight",
    icon: "ri-crown-line",
    requiredCount: 7,
    type: "consistency",
    unlocked: false,
    progress: 70
  }
];

// Type for habit completion entries
export interface CompletionEntry {
  habitId: number;
  userId: number;
  completionDate: string; // ISO date string
}

// Initialize local storage with default data if empty
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.HABITS)) {
    localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(DEFAULT_HABITS));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.COMPLETIONS)) {
    // Generate some completion history for the default habits
    const today = new Date();
    const completions: CompletionEntry[] = [];
    
    // Generate completion history for each habit
    DEFAULT_HABITS.forEach(habit => {
      if (habit.completedToday) {
        completions.push({
          habitId: habit.id,
          userId: habit.userId,
          completionDate: today.toISOString()
        });
      }
      
      // Add historical completions based on streak
      for (let i = 1; i <= habit.streak; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        completions.push({
          habitId: habit.id,
          userId: habit.userId,
          completionDate: date.toISOString()
        });
      }
    });
    
    localStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(completions));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS)) {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(DEFAULT_ACHIEVEMENTS));
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.USER_ACHIEVEMENTS)) {
    // Extract unlocked achievements
    const unlockedAchievements = DEFAULT_ACHIEVEMENTS
      .filter(a => a.unlocked)
      .map(a => ({
        achievementId: a.id,
        userId: 1,
        unlockedAt: a.unlockedAt?.toISOString() || new Date().toISOString()
      }));
    
    localStorage.setItem(STORAGE_KEYS.USER_ACHIEVEMENTS, JSON.stringify(unlockedAchievements));
  }
}

// Get all habits with metrics
export function getHabits(): HabitWithMetrics[] {
  initializeStorage();
  const habits = JSON.parse(localStorage.getItem(STORAGE_KEYS.HABITS) || '[]') as HabitWithMetrics[];
  return habits;
}

// Get habit by ID
export function getHabitById(id: number): HabitWithMetrics | undefined {
  const habits = getHabits();
  return habits.find(h => h.id === id);
}

// Save habits to local storage
export function saveHabits(habits: HabitWithMetrics[]): void {
  localStorage.setItem(STORAGE_KEYS.HABITS, JSON.stringify(habits));
}

// Add a new habit
export function addHabit(habit: Omit<HabitWithMetrics, 'id'>): HabitWithMetrics {
  const habits = getHabits();
  const newId = habits.length > 0 ? Math.max(...habits.map(h => h.id)) + 1 : 1;
  
  const newHabit: HabitWithMetrics = {
    ...habit,
    id: newId,
    createdAt: new Date(),
    streak: 0,
    completedToday: false,
    totalCompletions: 0,
    completionRate: 0
  };
  
  saveHabits([...habits, newHabit]);
  return newHabit;
}

// Update an existing habit
export function updateHabit(updatedHabit: HabitWithMetrics): HabitWithMetrics {
  const habits = getHabits();
  const updatedHabits = habits.map(h => 
    h.id === updatedHabit.id ? updatedHabit : h
  );
  
  saveHabits(updatedHabits);
  return updatedHabit;
}

// Delete a habit
export function deleteHabit(id: number): void {
  const habits = getHabits();
  const updatedHabits = habits.filter(h => h.id !== id);
  saveHabits(updatedHabits);
  
  // Also clean up completions
  const completions = getCompletions();
  const updatedCompletions = completions.filter(c => c.habitId !== id);
  saveCompletions(updatedCompletions);
}

// Get all completions
export function getCompletions(): CompletionEntry[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETIONS) || '[]');
}

// Save completions
export function saveCompletions(completions: CompletionEntry[]): void {
  localStorage.setItem(STORAGE_KEYS.COMPLETIONS, JSON.stringify(completions));
}

// Toggle habit completion for today
export function toggleHabitCompletion(habitId: number, userId: number): HabitWithMetrics {
  const habits = getHabits();
  const habit = habits.find(h => h.id === habitId);
  
  if (!habit) {
    throw new Error(`Habit with id ${habitId} not found`);
  }
  
  const completions = getCompletions();
  const today = new Date().toISOString().split('T')[0];
  
  // Check if this habit is already completed today
  const existingCompletion = completions.find(
    c => c.habitId === habitId && c.completionDate.startsWith(today)
  );
  
  let updatedCompletions;
  
  if (existingCompletion) {
    // Remove the completion
    updatedCompletions = completions.filter(
      c => !(c.habitId === habitId && c.completionDate.startsWith(today))
    );
  } else {
    // Add new completion
    updatedCompletions = [
      ...completions,
      {
        habitId,
        userId,
        completionDate: new Date().toISOString()
      }
    ];
  }
  
  saveCompletions(updatedCompletions);
  
  // Update habit metrics
  const habitCompletions = updatedCompletions.filter(c => c.habitId === habitId)
    .map(c => new Date(c.completionDate));
  
  const streak = calculateStreak(habitCompletions);
  const totalCompletions = habitCompletions.length;
  
  // Calculate completion rate based on days since habit creation
  const creationDate = new Date(habit.createdAt);
  const currentDate = new Date();
  const daysSinceCreation = Math.max(1, Math.ceil((currentDate.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24)));
  const completionRate = Math.min(100, Math.round((totalCompletions / daysSinceCreation) * 100));
  
  const updatedHabit: HabitWithMetrics = {
    ...habit,
    streak,
    completedToday: !existingCompletion,
    totalCompletions,
    completionRate
  };
  
  // Update the habit in storage
  const updatedHabits = habits.map(h => h.id === habitId ? updatedHabit : h);
  saveHabits(updatedHabits);
  
  // Check for achievements
  checkForAchievements(userId);
  
  return updatedHabit;
}

// Get all achievements
export function getAchievements(): AchievementWithStatus[] {
  initializeStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS) || '[]');
}

// Get recently unlocked achievements (last 7 days)
export function getRecentAchievements(): AchievementWithStatus[] {
  const achievements = getAchievements();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  return achievements
    .filter(a => a.unlocked && a.unlockedAt && new Date(a.unlockedAt) >= sevenDaysAgo)
    .sort((a, b) => {
      if (!a.unlockedAt || !b.unlockedAt) return 0;
      return new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime();
    });
}

// Check and unlock achievements
export function checkForAchievements(userId: number): AchievementWithStatus[] {
  const habits = getHabits();
  const completions = getCompletions();
  const achievements = getAchievements();
  const userAchievements = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_ACHIEVEMENTS) || '[]');
  
  const newlyUnlocked: AchievementWithStatus[] = [];
  
  // Check each achievement
  achievements.forEach(achievement => {
    if (achievement.unlocked) return; // Already unlocked
    
    let progress = 0;
    let unlocked = false;
    
    switch (achievement.type) {
      case 'streak':
        // Check if any habit has the required streak
        const maxStreak = Math.max(...habits.map(h => h.streak), 0);
        progress = Math.min(100, Math.round((maxStreak / achievement.requiredCount) * 100));
        unlocked = maxStreak >= achievement.requiredCount;
        break;
        
      case 'completion':
        // Check specific achievement conditions
        if (achievement.title === 'Early Bird') {
          // Count completions before 9 AM
          const earlyCompletions = completions.filter(c => {
            const date = new Date(c.completionDate);
            return date.getHours() < 9;
          }).length;
          
          progress = Math.min(100, Math.round((earlyCompletions / achievement.requiredCount) * 100));
          unlocked = earlyCompletions >= achievement.requiredCount;
        } else if (achievement.title === 'Healthy Mind') {
          // Count meditation completions
          const meditationHabit = habits.find(h => h.title.toLowerCase().includes('meditation'));
          if (meditationHabit) {
            const meditationCompletions = completions.filter(c => c.habitId === meditationHabit.id).length;
            progress = Math.min(100, Math.round((meditationCompletions / achievement.requiredCount) * 100));
            unlocked = meditationCompletions >= achievement.requiredCount;
          }
        } else if (achievement.title === 'Book Worm') {
          // Count reading completions
          const readingHabit = habits.find(h => h.title.toLowerCase().includes('read'));
          if (readingHabit) {
            const readingCompletions = completions.filter(c => c.habitId === readingHabit.id).length;
            progress = Math.min(100, Math.round((readingCompletions / achievement.requiredCount) * 100));
            unlocked = readingCompletions >= achievement.requiredCount;
          }
        }
        break;
        
      case 'consistency':
        // Check if all habits were completed on the same days for the required period
        // This is a simplified implementation
        progress = 70; // Hardcoded for demo
        unlocked = false;
        break;
    }
    
    // Update achievement progress
    achievement.progress = progress;
    
    // If unlocked, record it
    if (unlocked && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date();
      
      // Add to user achievements
      userAchievements.push({
        achievementId: achievement.id,
        userId,
        unlockedAt: achievement.unlockedAt.toISOString()
      });
      
      newlyUnlocked.push(achievement);
    }
  });
  
  // Save updated achievements and user achievements
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  localStorage.setItem(STORAGE_KEYS.USER_ACHIEVEMENTS, JSON.stringify(userAchievements));
  
  return newlyUnlocked;
}

// Get weekly progress data
export function getWeeklyProgressData(): { day: string, completed: number, total: number }[] {
  const habits = getHabits();
  const completions = getCompletions();
  
  // Get dates for the last 7 days
  const result = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dayStr = date.toISOString().split('T')[0];
    
    // Count completions for this day
    const dayCompletions = completions.filter(c => c.completionDate.startsWith(dayStr)).length;
    
    // For simplicity, assume all current habits existed on that day
    const totalPossible = habits.length;
    
    result.push({
      day: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
      completed: dayCompletions,
      total: totalPossible
    });
  }
  
  return result;
}

// Get current user streak
export function getCurrentUserStreak(): number {
  const habits = getHabits();
  
  // For this demo, we'll use the max streak among all habits
  if (habits.length === 0) return 0;
  
  return Math.max(...habits.map(h => h.streak));
}

// Get total number of habit completions
export function getTotalCompletions(): number {
  const completions = getCompletions();
  return completions.length;
}

// Get number of unlocked achievements
export function getUnlockedAchievementsCount(): number {
  const achievements = getAchievements();
  return achievements.filter(a => a.unlocked).length;
}

// Get today's goal completion percentage
export function getTodayCompletionPercentage(): number {
  const habits = getHabits();
  if (habits.length === 0) return 0;
  
  const completedToday = habits.filter(h => h.completedToday).length;
  return Math.round((completedToday / habits.length) * 100);
}
