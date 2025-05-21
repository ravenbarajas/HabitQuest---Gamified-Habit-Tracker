import React from "react";
import { useHabitContext } from "@/context/HabitContext";
import StatCard from "./StatCard";
import CompletionRing from "./CompletionRing";

interface ProgressSummaryProps {
  className?: string;
}

const ProgressSummary = ({ className }: ProgressSummaryProps) => {
  const { currentStreak, totalCompletions, unlockedCount, todayPercentage } = useHabitContext();
  
  return (
    <div className={`bg-white rounded-xl shadow-card p-6 ${className}`}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex-1 mb-6 md:mb-0">
          <h2 className="font-poppins font-semibold text-xl mb-1">Your Progress</h2>
          <p className="text-neutral-500 mb-4">You're making great strides!</p>
          
          <div className="flex flex-wrap gap-4">
            {/* Current Streak Stat */}
            <StatCard 
              label="Current streak" 
              value={`${currentStreak} days`} 
              icon="ri-fire-line" 
              color="accent"
            />
            
            {/* Habits Completed Stat */}
            <StatCard 
              label="Habits completed" 
              value={`${totalCompletions} total`} 
              icon="ri-check-double-line" 
              color="secondary"
            />
            
            {/* Achievements Stat */}
            <StatCard 
              label="Achievements" 
              value={`${unlockedCount} unlocked`} 
              icon="ri-award-line" 
              color="primary"
            />
          </div>
        </div>
        
        {/* Completion Ring */}
        <div className="relative w-48 h-48">
          <CompletionRing percentage={todayPercentage} />
        </div>
      </div>
    </div>
  );
};

export default ProgressSummary;
