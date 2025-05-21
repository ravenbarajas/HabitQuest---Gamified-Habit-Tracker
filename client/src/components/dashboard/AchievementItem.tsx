import React from "react";
import { motion } from "framer-motion";
import { AchievementWithStatus } from "@shared/schema";

interface AchievementItemProps {
  achievement: AchievementWithStatus;
  className?: string;
}

const AchievementItem = ({ achievement, className }: AchievementItemProps) => {
  return (
    <div className={`flex p-3 rounded-lg bg-neutral-50 mb-3 ${className}`}>
      <motion.div 
        className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center shadow-achievement mr-3"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
      >
        <i className={`${achievement.icon} text-accent-500 text-xl`}></i>
      </motion.div>
      <div>
        <h3 className="font-medium text-neutral-800">{achievement.title}</h3>
        <p className="text-xs text-neutral-500">{achievement.description}</p>
      </div>
    </div>
  );
};

export default AchievementItem;
