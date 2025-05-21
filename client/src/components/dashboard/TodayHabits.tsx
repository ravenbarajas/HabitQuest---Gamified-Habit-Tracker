import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useHabitContext } from "@/context/HabitContext";
import HabitCard from "./HabitCard";
import { Button } from "@/components/ui/button";
import HabitForm from "@/components/habits/HabitForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface TodayHabitsProps {
  className?: string;
}

const TodayHabits = ({ className }: TodayHabitsProps) => {
  const { habits, loading } = useHabitContext();
  const [showDialog, setShowDialog] = useState(false);
  
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-poppins font-semibold text-xl">Today's Habits</h2>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary-400 hover:bg-primary-500 text-white">
              <i className="ri-add-line mr-1"></i>
              <span>Add Habit</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <HabitForm onComplete={() => setShowDialog(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8">
        <AnimatePresence>
          {loading ? (
            // Loading state
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center"
            >
              <div className="animate-spin h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
              <p className="text-neutral-500">Loading your habits...</p>
            </motion.div>
          ) : habits.length === 0 ? (
            // Empty state
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 text-center"
            >
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-emotion-sad-line text-2xl text-neutral-400"></i>
              </div>
              <h3 className="font-medium text-lg mb-2">No habits yet</h3>
              <p className="text-neutral-500 mb-4">Start by adding your first habit to track.</p>
              <Button className="bg-primary-400 hover:bg-primary-500 text-white" onClick={() => setShowDialog(true)}>
                <i className="ri-add-line mr-1"></i>
                <span>Add Habit</span>
              </Button>
            </motion.div>
          ) : (
            // List of habits
            <div>
              {habits.map((habit, index) => (
                <motion.div
                  key={habit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={index < habits.length - 1 ? "border-b border-neutral-200" : ""}
                >
                  <HabitCard habit={habit} />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodayHabits;
