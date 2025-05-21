import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StreakIndicatorProps {
  streak: number;
  className?: string;
}

const StreakIndicator = ({ streak, className }: StreakIndicatorProps) => {
  // Determine if the streak should have the flame effect
  const hasStreak = streak > 0;
  
  return (
    <div 
      className={cn(
        "py-1 px-2 rounded-md flex items-center",
        hasStreak ? "bg-accent-50 text-accent-500" : "bg-neutral-100 text-neutral-400",
        className
      )}
    >
      <motion.i
        className={cn(
          "ri-fire-line mr-1", 
          hasStreak && "streak-flame"
        )}
        animate={
          hasStreak ? {
            filter: [
              "drop-shadow(0 0 3px rgba(255, 174, 26, 0.4))",
              "drop-shadow(0 0 5px rgba(255, 174, 26, 0.7))",
              "drop-shadow(0 0 3px rgba(255, 174, 26, 0.4))"
            ]
          } : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      ></motion.i>
      <span className="text-sm font-medium">{streak}</span>
    </div>
  );
};

export { StreakIndicator };
