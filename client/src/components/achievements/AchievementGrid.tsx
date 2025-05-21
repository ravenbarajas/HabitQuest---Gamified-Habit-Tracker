import React from "react";
import { motion } from "framer-motion";
import { AchievementWithStatus } from "@shared/schema";
import { Progress } from "@/components/ui/progress";

interface AchievementGridProps {
  achievements: AchievementWithStatus[];
}

const AchievementGrid = ({ achievements }: AchievementGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className={`p-4 rounded-lg ${achievement.unlocked ? 'bg-accent-50' : 'bg-neutral-50'}`}>
            <div className="flex mb-3">
              <motion.div 
                className={`w-14 h-14 rounded-full flex items-center justify-center mr-3 ${
                  achievement.unlocked 
                    ? 'bg-accent-100 shadow-achievement' 
                    : 'bg-neutral-200'
                }`}
                animate={
                  achievement.unlocked
                    ? {
                        y: [0, -5, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                }}
              >
                <i className={`${achievement.icon} text-2xl ${achievement.unlocked ? 'text-accent-500' : 'text-neutral-500'}`}></i>
              </motion.div>
              <div className="flex-1">
                <h3 className="font-medium text-lg text-neutral-800">
                  {achievement.title}
                </h3>
                <p className="text-sm text-neutral-500 mb-2">
                  {achievement.description}
                </p>
                {achievement.unlocked ? (
                  <span className="inline-block bg-secondary-100 text-secondary-700 text-xs px-2 py-1 rounded">
                    Unlocked {achievement.unlockedAt 
                      ? new Date(achievement.unlockedAt).toLocaleDateString() 
                      : ''}
                  </span>
                ) : (
                  <div>
                    <div className="flex justify-between text-xs text-neutral-500 mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-2" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AchievementGrid;
