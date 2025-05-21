import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white mr-3">
            <i className="ri-user-smile-line text-xl"></i>
          </div>
          <h1 className="font-poppins font-semibold text-xl">
            Habit Hero
          </h1>
        </div>
      </header>

      {/* Hero section */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-16">
        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-poppins font-bold text-neutral-800 mb-4 leading-tight">
            Build Better Habits,<br />
            <span className="text-primary-500">One Day at a Time</span>
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-md">
            Track your habits, celebrate streaks, and unlock achievements as you build a better you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              className="bg-primary-400 hover:bg-primary-500 text-white px-8 py-6 text-lg"
              onClick={() => navigate("/dashboard")}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="px-8 py-6 text-lg"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div 
          className="lg:w-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative">
            {/* Feature highlights */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-4 relative z-10">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mr-4">
                  <i className="ri-fire-line text-accent-500 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Build Streaks</h3>
                  <p className="text-neutral-500">Track consecutive days of habit completion</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-4 ml-8 relative z-20">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center mr-4">
                  <i className="ri-bar-chart-line text-secondary-500 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visualize Progress</h3>
                  <p className="text-neutral-500">See your growth with detailed analytics</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 ml-4 relative z-30">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <i className="ri-award-line text-primary-500 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Earn Achievements</h3>
                  <p className="text-neutral-500">Unlock rewards as you meet your goals</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-neutral-500">
        <p>© 2025 Habit Hero. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;