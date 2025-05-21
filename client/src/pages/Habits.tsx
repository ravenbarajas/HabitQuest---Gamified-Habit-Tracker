import React, { useState } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { useHabitContext } from "@/context/HabitContext";
import HabitCard from "@/components/dashboard/HabitCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import HabitForm from "@/components/habits/HabitForm";
import { Input } from "@/components/ui/input";

const Habits = () => {
  const { habits, loading } = useHabitContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  
  // Filter habits based on search query
  const filteredHabits = habits.filter(habit => 
    habit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (habit.description && habit.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-poppins font-bold text-neutral-800 mb-4 md:mb-0">
            My Habits
          </h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search habits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-w-[200px]"
            />
            
            <Button 
              className="bg-primary-400 hover:bg-primary-500 text-white"
              onClick={() => setShowDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Habit
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="bg-white rounded-xl shadow-card p-8 text-center">
            <div className="animate-spin h-10 w-10 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
            <p className="text-neutral-500">Loading your habits...</p>
          </div>
        ) : filteredHabits.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card p-12 text-center">
            {searchQuery ? (
              <>
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-search-line text-2xl text-neutral-400"></i>
                </div>
                <h2 className="text-xl font-semibold mb-2">No matching habits</h2>
                <p className="text-neutral-500 mb-4">Try a different search term or clear your search</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-add-line text-2xl text-neutral-400"></i>
                </div>
                <h2 className="text-xl font-semibold mb-2">No habits yet</h2>
                <p className="text-neutral-500 mb-4">Start building better habits today</p>
                <Button 
                  className="bg-primary-400 hover:bg-primary-500 text-white"
                  onClick={() => setShowDialog(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Habit
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-card overflow-hidden">
            {filteredHabits.map((habit, index) => (
              <motion.div 
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={index < filteredHabits.length - 1 ? "border-b border-neutral-200" : ""}
              >
                <HabitCard habit={habit} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
      
      {/* Add Habit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <HabitForm onComplete={() => setShowDialog(false)} />
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Habits;
