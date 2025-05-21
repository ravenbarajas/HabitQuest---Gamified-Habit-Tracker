import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useHabitContext } from "@/context/HabitContext";
import AchievementItem from "./AchievementItem";

interface RecentAchievementsProps {
  className?: string;
}

const RecentAchievements = ({ className }: RecentAchievementsProps) => {
  const { recentAchievements } = useHabitContext();
  
  return (
    <div className={`bg-white rounded-xl shadow-card ${className}`}>
      <div className="p-6 border-b border-neutral-200">
        <h2 className="font-poppins font-semibold text-xl">Recent Achievements</h2>
      </div>
      
      <div className="p-4">
        {recentAchievements.length === 0 ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
              <i className="ri-medal-line text-2xl text-neutral-400"></i>
            </div>
            <p className="text-neutral-500 mb-2">No achievements yet</p>
            <p className="text-xs text-neutral-400">Complete your habits to unlock achievements!</p>
          </div>
        ) : (
          <>
            {recentAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <AchievementItem achievement={achievement} />
              </motion.div>
            ))}
          </>
        )}
        
        <Link href="/achievements">
          <a className="w-full py-2 text-primary-400 font-medium hover:bg-primary-50 rounded-lg transition-colors mt-2 block text-center">
            View All Achievements
          </a>
        </Link>
      </div>
    </div>
  );
};

export default RecentAchievements;
