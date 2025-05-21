import React, { useState } from "react";
import { motion } from "framer-motion";
import AppLayout from "@/components/layout/AppLayout";
import { useHabitContext } from "@/context/HabitContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { refreshHabits, refreshQuote } = useHabitContext();
  const { toast } = useToast();
  
  // These would be real settings in a full implementation
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  
  const handleResetData = () => {
    // Clear local storage
    localStorage.clear();
    
    // Refresh data from defaults
    refreshHabits();
    refreshQuote();
    
    toast({
      title: "Data Reset Complete",
      description: "All your habit data has been reset to defaults.",
    });
  };
  
  const handleExportData = () => {
    // Get all data from localStorage
    const data = {
      habits: localStorage.getItem('habits_data'),
      completions: localStorage.getItem('habit_completions'),
      achievements: localStorage.getItem('achievements'),
      userAchievements: localStorage.getItem('user_achievements')
    };
    
    // Create a download link
    const dataStr = JSON.stringify(data);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `habit-hero-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Data Exported",
      description: "Your data has been exported successfully.",
    });
  };
  
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <h1 className="text-3xl font-poppins font-bold text-neutral-800 mb-2">
          Settings
        </h1>
        <p className="text-neutral-500 mb-6">
          Customize your Habit Hero experience
        </p>
        
        <div className="space-y-6">
          {/* Preferences Card */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize how the application behaves
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-neutral-500">
                    Receive reminders for your habits
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-neutral-500">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="soundEffects">Sound Effects</Label>
                  <p className="text-sm text-neutral-500">
                    Play sounds for achievements and completions
                  </p>
                </div>
                <Switch
                  id="soundEffects"
                  checked={soundEffects}
                  onCheckedChange={setSoundEffects}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Data Management Card */}
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Manage your habit data and achievements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                Export your data for backup or transfer to another device.
              </p>
              <p className="text-sm text-yellow-600">
                Warning: Resetting data will remove all your habits and progress.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleExportData}>
                Export Data
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Reset Data</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will permanently delete all your habits, completions, and achievements. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetData}>
                      Yes, reset everything
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
          
          {/* About Card */}
          <Card>
            <CardHeader>
              <CardTitle>About Habit Hero</CardTitle>
              <CardDescription>
                Application information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">
                <strong>Version:</strong> 1.0.0
              </p>
              <p className="text-sm">
                <strong>Created By:</strong> Habit Hero Team
              </p>
              <p className="text-sm">
                A gamified habit tracker to help you build better habits through consistent practice and achievement-based motivation.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Settings;
