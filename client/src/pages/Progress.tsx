import React, { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { useHabitContext } from "@/context/HabitContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeekView from "@/components/progress/WeekView";
import MonthView from "@/components/progress/MonthView";
import ProgressChart from "@/components/progress/ProgressChart";

const Progress = () => {
  const { habits, loading } = useHabitContext();
  const [selectedHabit, setSelectedHabit] = useState<number | null>(
    habits.length > 0 ? habits[0].id : null
  );

  // Update selected habit when habits load if none is selected
  React.useEffect(() => {
    if (!selectedHabit && habits.length > 0) {
      setSelectedHabit(habits[0].id);
    }
  }, [habits, selectedHabit]);

  const selectedHabitData = habits.find(h => h.id === selectedHabit);

  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <h1 className="text-3xl font-poppins font-bold text-neutral-800 mb-6">
          Progress Tracker
        </h1>

        {loading ? (
          <div className="bg-white rounded-xl shadow-card p-8 text-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
            <p className="text-neutral-500">Loading your progress data...</p>
          </div>
        ) : habits.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-bar-chart-line text-2xl text-neutral-400"></i>
            </div>
            <h2 className="text-xl font-semibold mb-2">No habits to track</h2>
            <p className="text-neutral-500 mb-4">
              Add some habits to see your progress over time
            </p>
            <Button
              className="bg-primary-400 hover:bg-primary-500 text-white"
              onClick={() => window.location.href = "/habits"}
            >
              Add Habits
            </Button>
          </div>
        ) : (
          <>
            {/* Habit Selector */}
            <div className="bg-white rounded-xl shadow-card mb-6 p-6">
              <h2 className="font-poppins font-semibold text-xl mb-4">
                Select a Habit to Track
              </h2>
              <div className="flex flex-wrap gap-2">
                {habits.map(habit => (
                  <Button
                    key={habit.id}
                    variant={selectedHabit === habit.id ? "default" : "outline"}
                    className={
                      selectedHabit === habit.id
                        ? "bg-primary-400 hover:bg-primary-500"
                        : ""
                    }
                    onClick={() => setSelectedHabit(habit.id)}
                  >
                    {habit.title}
                  </Button>
                ))}
              </div>
            </div>

            {/* Habit Details & Stats */}
            {selectedHabitData && (
              <div className="bg-white rounded-xl shadow-card mb-6 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-poppins font-semibold text-2xl mb-1">
                      {selectedHabitData.title}
                    </h2>
                    {selectedHabitData.description && (
                      <p className="text-neutral-500 mb-4">
                        {selectedHabitData.description}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-4 my-4 md:my-0">
                    <div className="bg-accent-50 p-3 rounded-lg">
                      <p className="text-sm text-neutral-500">Current Streak</p>
                      <p className="font-poppins font-semibold text-xl flex items-center">
                        <i className="ri-fire-line text-accent-500 mr-2 streak-flame"></i>
                        {selectedHabitData.streak} days
                      </p>
                    </div>
                    <div className="bg-secondary-50 p-3 rounded-lg">
                      <p className="text-sm text-neutral-500">Completion Rate</p>
                      <p className="font-poppins font-semibold text-xl">
                        {selectedHabitData.completionRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Chart Section */}
            {selectedHabitData && (
              <div className="bg-white rounded-xl shadow-card p-6">
                <Tabs defaultValue="week">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-poppins font-semibold text-xl">
                      Progress Over Time
                    </h2>
                    <TabsList>
                      <TabsTrigger value="week">Week</TabsTrigger>
                      <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="week" className="h-[400px]">
                    <WeekView habitId={selectedHabitData.id} />
                  </TabsContent>

                  <TabsContent value="month" className="h-[400px]">
                    <MonthView habitId={selectedHabitData.id} />
                  </TabsContent>
                </Tabs>

                {/* Overall Progress Chart */}
                <div className="mt-8 pt-8 border-t border-neutral-200">
                  <h3 className="font-poppins font-semibold text-lg mb-4">
                    Completion Trends
                  </h3>
                  <div className="h-[300px]">
                    <ProgressChart habitId={selectedHabitData.id} />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </motion.div>
    </AppLayout>
  );
};

export default Progress;
