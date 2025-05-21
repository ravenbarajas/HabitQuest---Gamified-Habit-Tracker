import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useHabitContext } from "@/context/HabitContext";
import { HabitCheckbox } from "@/components/ui/habit-checkbox";
import { StreakIndicator } from "@/components/ui/streak-indicator";
import { HabitWithMetrics } from "@shared/schema";
import { formatTime } from "@/lib/utils";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import HabitForm from "@/components/habits/HabitForm";

interface HabitCardProps {
  habit: HabitWithMetrics;
  className?: string;
}

const HabitCard = ({ habit, className }: HabitCardProps) => {
  const { toggleCompletion, removeHabit } = useHabitContext();
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  const handleToggle = () => {
    toggleCompletion(habit.id);
  };
  
  const handleEdit = () => {
    setShowEditDialog(true);
  };
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${habit.title}"?`)) {
      removeHabit(habit.id);
    }
  };
  
  return (
    <>
      <div className={`p-4 flex items-center justify-between hover:bg-neutral-50 transition-colors ${className}`}>
        <div className="flex items-center">
          <HabitCheckbox 
            checked={habit.completedToday} 
            onChange={handleToggle} 
            className="mr-4"
          />
          <div>
            <h3 className="font-medium text-neutral-800">{habit.title}</h3>
            <p className="text-sm text-neutral-500">{formatTime(habit.timeOfDay)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <StreakIndicator streak={habit.streak} className="mr-3" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-neutral-400 hover:text-neutral-600 p-1 rounded-full hover:bg-neutral-100" aria-label="Edit habit">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <i className="ri-edit-line mr-2"></i> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive">
                <i className="ri-delete-bin-line mr-2"></i> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Edit Habit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <HabitForm habit={habit} onComplete={() => setShowEditDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HabitCard;
