import React from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import WelcomeHeader from "@/components/dashboard/WelcomeHeader";
import DateDisplay from "@/components/dashboard/DateDisplay";
import ProgressSummary from "@/components/dashboard/ProgressSummary";
import TodayHabits from "@/components/dashboard/TodayHabits";
import WeeklyProgress from "@/components/dashboard/WeeklyProgress";
import RecentAchievements from "@/components/dashboard/RecentAchievements";
import MotivationalQuote from "@/components/dashboard/MotivationalQuote";

const Dashboard = () => {
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
          <WelcomeHeader />
          <DateDisplay className="mb-6 lg:mb-0" />
        </div>
        
        <ProgressSummary className="mb-8" />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 order-2 lg:order-1">
            <TodayHabits />
            <WeeklyProgress className="mb-8" />
          </div>
          
          <div className="w-full lg:w-80 order-1 lg:order-2">
            <RecentAchievements className="mb-8" />
            <MotivationalQuote />
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Dashboard;
