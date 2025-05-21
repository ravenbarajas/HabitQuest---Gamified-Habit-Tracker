import React from "react";
import { useHabitContext } from "@/context/HabitContext";

interface WelcomeHeaderProps {
  className?: string;
}

const WelcomeHeader = ({ className }: WelcomeHeaderProps) => {
  const { userName } = useHabitContext();
  
  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  
  return (
    <div className={className}>
      <h1 className="text-3xl font-poppins font-bold text-neutral-800 mb-2">
        {getGreeting()}, {userName}!
      </h1>
      <p className="text-neutral-500 mb-4">
        Today is a great day to build some habits.
      </p>
    </div>
  );
};

export default WelcomeHeader;
