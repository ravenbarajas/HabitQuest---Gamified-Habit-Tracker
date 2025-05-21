import React from "react";
import { formatDate } from "@/lib/utils";

interface DateDisplayProps {
  className?: string;
}

const DateDisplay = ({ className }: DateDisplayProps) => {
  const today = new Date();
  const formattedDate = formatDate(today);
  
  return (
    <div className={`flex items-center bg-white p-3 rounded-lg shadow-sm ${className}`}>
      <div className="bg-primary-50 text-primary-500 rounded-lg p-2 mr-3">
        <i className="ri-calendar-line text-xl"></i>
      </div>
      <div>
        <p className="text-neutral-400 text-sm">Today</p>
        <p className="font-medium">{formattedDate}</p>
      </div>
    </div>
  );
};

export default DateDisplay;
