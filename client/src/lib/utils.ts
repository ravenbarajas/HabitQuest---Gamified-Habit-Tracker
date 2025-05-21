import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isSameDay, parseISO, startOfToday } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateStreak(completions: Date[]): number {
  if (!completions.length) return 0;
  
  // Sort dates in descending order
  const sortedDates = [...completions].sort((a, b) => b.getTime() - a.getTime());
  
  let currentStreak = 0;
  let yesterday = startOfToday();
  
  // Check if today is completed
  const todayCompleted = sortedDates.some(date => isSameDay(date, yesterday));
  
  if (!todayCompleted) {
    // If today is not completed, check if yesterday was
    yesterday.setDate(yesterday.getDate() - 1);
  } else {
    currentStreak = 1;
  }
  
  // Iterate through sorted dates to find consecutive days
  for (let i = todayCompleted ? 0 : -1; i < sortedDates.length - 1; i++) {
    const currentDate = i >= 0 ? sortedDates[i] : yesterday;
    const nextDate = sortedDates[i + 1];
    
    const diffTime = currentDate.getTime() - nextDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      currentStreak++;
      yesterday = nextDate;
    } else {
      break;
    }
  }
  
  return currentStreak;
}

export function formatDate(date: Date | string): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, 'EEEE, MMMM d');
}

export function formatTime(time: string | null | undefined): string {
  if (!time) return 'All day';
  return time;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getCompletionRate(completions: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completions / total) * 100);
}

export const motivationalQuotes = [
  {
    quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle"
  },
  {
    quote: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier"
  },
  {
    quote: "Habits are the compound interest of self-improvement.",
    author: "James Clear"
  },
  {
    quote: "You'll never change your life until you change something you do daily.",
    author: "John C. Maxwell"
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  }
];
