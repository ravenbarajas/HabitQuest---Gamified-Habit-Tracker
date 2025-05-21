import React, { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { useHabitContext } from "@/context/HabitContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchievementGrid from "@/components/achievements/AchievementGrid";

const Achievements = () => {
  const { getUnlockedAchievements, getLockedAchievements, loading } = useHabitContext();
  
  const unlockedAchievements = getUnlockedAchievements();
  const lockedAchievements = getLockedAchievements();

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <h1 className="text-3xl font-poppins font-bold text-neutral-800 mb-2">
          Achievements
        </h1>
        <p className="text-neutral-500 mb-6">
          Track your progress and earn rewards for building consistent habits
        </p>

        {loading ? (
          <div className="bg-white rounded-xl shadow-card p-8 text-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
            <p className="text-neutral-500">Loading your achievements...</p>
          </div>
        ) : (
          <>
            {/* Achievement Summary */}
            <div className="bg-white rounded-xl shadow-card mb-6 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="font-poppins font-semibold text-xl mb-1">
                    Your Achievement Collection
                  </h2>
                  <p className="text-neutral-500">
                    You've unlocked {unlockedAchievements.length} out of {unlockedAchievements.length + lockedAchievements.length} achievements
                  </p>
                </div>

                <div className="bg-accent-50 p-3 rounded-lg flex items-center">
                  <div className="w-12 h-12 rounded-full bg-accent-200 flex items-center justify-center mr-3 shadow-achievement">
                    <i className="ri-trophy-line text-accent-500 text-xl"></i>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Completion</p>
                    <p className="font-poppins font-semibold text-xl">
                      {Math.round((unlockedAchievements.length / (unlockedAchievements.length + lockedAchievements.length)) * 100)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Tabs */}
            <div className="bg-white rounded-xl shadow-card p-6">
              <Tabs defaultValue="all">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-poppins font-semibold text-xl">
                    Achievements
                  </h2>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
                    <TabsTrigger value="locked">Locked</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all">
                  <AchievementGrid 
                    achievements={[...unlockedAchievements, ...lockedAchievements]} 
                  />
                </TabsContent>

                <TabsContent value="unlocked">
                  {unlockedAchievements.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-3 bg-neutral-100 rounded-full flex items-center justify-center">
                        <i className="ri-medal-line text-2xl text-neutral-400"></i>
                      </div>
                      <h3 className="text-lg font-medium mb-2">No achievements unlocked yet</h3>
                      <p className="text-neutral-500">Complete your habits consistently to earn achievements!</p>
                    </div>
                  ) : (
                    <AchievementGrid achievements={unlockedAchievements} />
                  )}
                </TabsContent>

                <TabsContent value="locked">
                  {lockedAchievements.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-3 bg-accent-100 rounded-full flex items-center justify-center">
                        <i className="ri-medal-fill text-2xl text-accent-500"></i>
                      </div>
                      <h3 className="text-lg font-medium mb-2">All achievements unlocked!</h3>
                      <p className="text-neutral-500">Congratulations, you've completed all available achievements!</p>
                    </div>
                  ) : (
                    <AchievementGrid achievements={lockedAchievements} />
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </motion.div>
    </AppLayout>
  );
};

export default Achievements;
