import React from "react";
import { useLocation } from "wouter";
import MobileHeader from "./MobileHeader";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [location] = useLocation();
  
  const activePage = location === "/" 
    ? "dashboard" 
    : location.startsWith("/habits") 
    ? "habits"
    : location.startsWith("/progress")
    ? "progress"
    : location.startsWith("/achievements")
    ? "achievements"
    : location.startsWith("/settings")
    ? "settings"
    : "dashboard";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <Sidebar activePage={activePage} />
        
        {/* Main content area */}
        <main className="flex-1 lg:ml-64 pb-20 lg:pb-10">
          {children}
        </main>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNavigation activePage={activePage} />
    </div>
  );
};

export default AppLayout;
