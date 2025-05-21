import React, { useState } from "react";
import { motion } from "framer-motion";
import { useHabitContext } from "@/context/HabitContext";

interface WeeklyProgressProps {
  className?: string;
}

const WeeklyProgress = ({ className }: WeeklyProgressProps) => {
  const { weeklyData } = useHabitContext();
  const [view, setView] = useState<"week" | "month">("week");
  
  // Calculate weekly average completion percentage
  const calculateAverage = () => {
    if (weeklyData.length === 0) return 0;
    
    const totalPercentages = weeklyData.reduce((sum, day) => {
      const percentage = day.total > 0 ? Math.round((day.completed / day.total) * 100) : 0;
      return sum + percentage;
    }, 0);
    
    return Math.round(totalPercentages / weeklyData.length);
  };
  
  const averagePercentage = calculateAverage();
  
  return (
    <div className={`bg-white rounded-xl shadow-card p-6 ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-poppins font-semibold text-xl">Weekly Progress</h2>
        <div className="flex">
          <button 
            className={`${view === "week" ? "bg-neutral-100" : ""} hover:bg-neutral-200 text-neutral-700 rounded-lg px-3 py-1 text-sm mr-2`}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button 
            className={`${view === "month" ? "bg-neutral-100" : ""} hover:bg-neutral-200 text-neutral-700 rounded-lg px-3 py-1 text-sm`}
            onClick={() => setView("month")}
          >
            Month
          </button>
        </div>
      </div>
      
      <div className="h-64">
        <div className="h-full flex flex-col">
          <div className="flex justify-between mb-4">
            <div className="text-xs text-neutral-500">Habits Completed</div>
            <div className="text-xs text-neutral-500">{averagePercentage}% average</div>
          </div>
          
          <div className="flex-1 flex items-end">
            {weeklyData.map((day, index) => {
              const percentage = day.total > 0 ? (day.completed / day.total) * 100 : 0;
              const height = percentage > 0 ? `${Math.max(20, percentage)}%` : "20%";
              
              // Determine if this day is in the future
              const isFutureDay = index >= 5; // For demo, treating weekend as future
              
              return (
                <div className="flex flex-col items-center flex-1" key={index}>
                  <div className="w-full px-1">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`${isFutureDay ? "bg-neutral-300" : "bg-primary-400"} rounded-t-md`}
                    ></motion.div>
                  </div>
                  <div className="text-xs text-neutral-600 mt-2">{day.day}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgress;
