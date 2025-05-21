import React from "react";
import { Link } from "wouter";

interface MobileNavigationProps {
  activePage: string;
}

const MobileNavigation = ({ activePage }: MobileNavigationProps) => {
  return (
    <nav className="lg:hidden fixed bottom-0 w-full bg-white shadow-lg z-30">
      <div className="flex justify-around py-2">
        {/* Dashboard Link */}
        <Link href="/">
          <a className={`flex flex-col items-center py-1 px-4 ${activePage === "dashboard" ? "text-primary-400" : "text-neutral-500"}`} aria-label="Dashboard">
            <i className="ri-dashboard-line text-xl"></i>
            <span className="text-xs font-medium mt-1">Home</span>
          </a>
        </Link>
        
        {/* My Habits Link */}
        <Link href="/habits">
          <a className={`flex flex-col items-center py-1 px-4 ${activePage === "habits" ? "text-primary-400" : "text-neutral-500"}`} aria-label="My Habits">
            <i className="ri-list-check text-xl"></i>
            <span className="text-xs font-medium mt-1">Habits</span>
          </a>
        </Link>
        
        {/* Add Habit Button (centered) */}
        <Link href="/habits/new">
          <a className="flex flex-col items-center py-1 px-4 text-neutral-500" aria-label="Add Habit">
            <div className="w-12 h-12 bg-primary-400 rounded-full flex items-center justify-center text-white -mt-5">
              <i className="ri-add-line text-xl"></i>
            </div>
          </a>
        </Link>
        
        {/* Progress Link */}
        <Link href="/progress">
          <a className={`flex flex-col items-center py-1 px-4 ${activePage === "progress" ? "text-primary-400" : "text-neutral-500"}`} aria-label="Progress">
            <i className="ri-bar-chart-line text-xl"></i>
            <span className="text-xs font-medium mt-1">Progress</span>
          </a>
        </Link>
        
        {/* Achievements Link */}
        <Link href="/achievements">
          <a className={`flex flex-col items-center py-1 px-4 ${activePage === "achievements" ? "text-primary-400" : "text-neutral-500"}`} aria-label="Achievements">
            <i className="ri-award-line text-xl"></i>
            <span className="text-xs font-medium mt-1">Achieve</span>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNavigation;
