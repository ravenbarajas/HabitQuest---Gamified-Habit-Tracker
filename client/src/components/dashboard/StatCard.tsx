import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  color: "primary" | "secondary" | "accent";
  className?: string;
}

const StatCard = ({ label, value, icon, color, className }: StatCardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary-50",
          iconBg: "bg-primary-100",
          iconColor: "text-primary-400"
        };
      case "secondary":
        return {
          bg: "bg-secondary-50",
          iconBg: "bg-secondary-100",
          iconColor: "text-secondary-500"
        };
      case "accent":
        return {
          bg: "bg-accent-50",
          iconBg: "bg-accent-200",
          iconColor: "text-accent-500"
        };
      default:
        return {
          bg: "bg-neutral-50",
          iconBg: "bg-neutral-100",
          iconColor: "text-neutral-500"
        };
    }
  };
  
  const { bg, iconBg, iconColor } = getColorClasses();
  
  const isStreakCard = icon === "ri-fire-line";
  
  return (
    <div className={`${bg} rounded-lg p-4 flex items-center ${className}`}>
      <motion.div 
        className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center mr-3 ${isStreakCard ? "streak-flame" : ""}`}
        animate={
          isStreakCard 
            ? {
                filter: [
                  "drop-shadow(0 0 3px rgba(255, 174, 26, 0.4))",
                  "drop-shadow(0 0 5px rgba(255, 174, 26, 0.7))",
                  "drop-shadow(0 0 3px rgba(255, 174, 26, 0.4))"
                ]
              } 
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      >
        <i className={`${icon} ${iconColor}`}></i>
      </motion.div>
      <div>
        <p className="text-sm text-neutral-500">{label}</p>
        <p className="font-poppins font-semibold text-xl">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
