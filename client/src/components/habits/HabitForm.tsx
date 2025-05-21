import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useHabitContext } from "@/context/HabitContext";
import { HabitWithMetrics } from "@shared/schema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Form schema
const habitFormSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }).max(50),
  description: z.string().max(200).optional(),
  frequency: z.enum(["daily", "weekly", "custom"]),
  timeOfDay: z.string().optional(),
});

type HabitFormValues = z.infer<typeof habitFormSchema>;

interface HabitFormProps {
  habit?: HabitWithMetrics;
  onComplete?: () => void;
}

const HabitForm = ({ habit, onComplete }: HabitFormProps) => {
  const { createHabit, editHabit } = useHabitContext();
  const isEditing = !!habit;
  
  // Default values
  const defaultValues: Partial<HabitFormValues> = {
    title: habit?.title || "",
    description: habit?.description || "",
    frequency: habit?.frequency || "daily",
    timeOfDay: habit?.timeOfDay || "",
  };
  
  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitFormSchema),
    defaultValues,
  });
  
  const onSubmit = (values: HabitFormValues) => {
    if (isEditing && habit) {
      // Update existing habit
      editHabit({
        ...habit,
        ...values,
      });
    } else {
      // Create new habit
      createHabit({
        ...values,
        userId: 1, // Default user ID for demo
        isActive: true,
      });
    }
    
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Habit" : "Create New Habit"}</DialogTitle>
        <DialogDescription>
          {isEditing 
            ? "Update your habit details below" 
            : "Add a new habit to track and build consistency"}
        </DialogDescription>
      </DialogHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Morning Meditation" {...field} />
                </FormControl>
                <FormDescription>
                  A short name for your habit
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="e.g., 10 minutes of mindfulness" {...field} />
                </FormControl>
                <FormDescription>
                  Optional details about your habit
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How often you want to perform this habit
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="timeOfDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time of Day</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="e.g., 8:00 AM (optional)" {...field} />
                </FormControl>
                <FormDescription>
                  When you plan to perform this habit (optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end pt-4">
            <Button type="submit" className="bg-primary-400 hover:bg-primary-500">
              {isEditing ? "Save Changes" : "Create Habit"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default HabitForm;
