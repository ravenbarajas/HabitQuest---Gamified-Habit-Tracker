import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HabitCheckboxProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

const HabitCheckbox = ({ checked, onChange, className }: HabitCheckboxProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onChange();
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <motion.div
      className={cn(
        "relative h-6 w-6 rounded-md border-2 border-neutral-300 cursor-pointer flex items-center justify-center",
        checked && "bg-secondary-500 border-secondary-500",
        className
      )}
      onClick={handleClick}
      animate={
        isAnimating && checked
          ? {
              scale: [1, 1.2, 1],
              transition: { duration: 0.3 }
            }
          : {}
      }
    >
      {checked && (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.2 }}
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </motion.svg>
      )}
      
      {/* Animation ripple effect */}
      {isAnimating && checked && (
        <motion.div
          className="absolute inset-0 rounded-md"
          initial={{ scale: 0.5, opacity: 0.3 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ backgroundColor: 'var(--secondary-500)' }}
        />
      )}
    </motion.div>
  );
};

export { HabitCheckbox };
