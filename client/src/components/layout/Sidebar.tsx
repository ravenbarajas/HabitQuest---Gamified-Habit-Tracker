import React from "react";
import { Link } from "wouter";

interface SidebarProps {
  activePage: string;
}

const Sidebar = ({ activePage }: SidebarProps) => {
  return (
    <aside className="hidden lg:block w-64 bg-white shadow-md z-20 fixed h-full">
      <div className="p-4">
        {/* App Logo/Title */}
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white mr-3">
            <i className="ri-user-smile-line text-xl"></i>
          </div>
          <h1 className="font-poppins font-semibold text-xl">
            Habit Hero
          </h1>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 relative">
          {/* Nav indicator highlight */}
          <div 
            className="nav-indicator h-10 w-1 bg-primary-400 absolute rounded-r-lg" 
            style={{ 
              transform: activePage === "dashboard" 
                ? "translateY(0px)" 
                : activePage === "habits" 
                ? "translateY(48px)" 
                : activePage === "progress" 
                ? "translateY(96px)" 
                : activePage === "achievements" 
                ? "translateY(144px)" 
                : "translateY(0px)" 
            }}
          />
          
          {/* Dashboard Link */}
          <Link href="/">
            <a className={`flex items-center pl-4 py-3 ${activePage === "dashboard" ? "text-primary-400" : "text-neutral-600"} font-medium cursor-pointer hover:bg-neutral-50 rounded-lg mb-1`}>
              <i className="ri-dashboard-line text-xl mr-3"></i>
              <span>Dashboard</span>
            </a>
          </Link>
          
          {/* My Habits Link */}
          <Link href="/habits">
            <a className={`flex items-center pl-4 py-3 ${activePage === "habits" ? "text-primary-400" : "text-neutral-600"} font-medium cursor-pointer hover:bg-neutral-50 rounded-lg mb-1`}>
              <i className="ri-list-check text-xl mr-3"></i>
              <span>My Habits</span>
            </a>
          </Link>
          
          {/* Progress Link */}
          <Link href="/progress">
            <a className={`flex items-center pl-4 py-3 ${activePage === "progress" ? "text-primary-400" : "text-neutral-600"} font-medium cursor-pointer hover:bg-neutral-50 rounded-lg mb-1`}>
              <i className="ri-bar-chart-line text-xl mr-3"></i>
              <span>Progress</span>
            </a>
          </Link>
          
          {/* Achievements Link */}
          <Link href="/achievements">
            <a className={`flex items-center pl-4 py-3 ${activePage === "achievements" ? "text-primary-400" : "text-neutral-600"} font-medium cursor-pointer hover:bg-neutral-50 rounded-lg mb-1`}>
              <i className="ri-award-line text-xl mr-3"></i>
              <span>Achievements</span>
            </a>
          </Link>
        </nav>
        
        {/* Settings link (bottom) */}
        <div className="absolute bottom-8 left-4 right-4">
          <Link href="/settings">
            <a className={`flex items-center ${activePage === "settings" ? "text-primary-400" : "text-neutral-600"} hover:text-neutral-800 p-3`}>
              <i className="ri-settings-3-line text-xl mr-3"></i>
              <span className="font-medium">Settings</span>
            </a>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
