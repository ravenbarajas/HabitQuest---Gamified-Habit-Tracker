import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Split background: top half primary color, bottom half white */}
      <div className="absolute inset-0 z-0">
        <div className="h-[55%] bg-primary-400"></div>
        <div className="h-[45%] bg-white"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-secondary-400 rounded-bl-[100px] opacity-20 z-0"></div>
      <div className="absolute top-40 left-0 w-64 h-64 bg-accent-400 rounded-full opacity-10 z-0"></div>
      <div className="absolute bottom-40 right-20 w-40 h-40 bg-primary-300 rounded-full opacity-20 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-6 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary-500 mr-3 shadow-lg">
              <i className="ri-user-smile-line text-xl"></i>
            </div>
            <h1 className="font-poppins font-semibold text-2xl text-white">
              Habit Hero
            </h1>
          </div>

          <nav>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-primary-500"
              onClick={() => navigate("/about")}
            >
              About
            </Button>
            <Button 
              className="bg-white text-primary-500 hover:bg-neutral-100 ml-2"
              onClick={() => navigate("/dashboard")}
            >
              Log In
            </Button>
          </nav>
        </header>

        {/* Hero section */}
        <main className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-10">
            <motion.h1 
              className="text-4xl md:text-6xl font-poppins font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Your Habits, <span className="text-accent-300">Gamified</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-white text-opacity-90 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Track your habits, celebrate streaks, and unlock achievements as you build a better you.
            </motion.p>
          </div>

          {/* Feature Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mb-6 mx-auto">
                <i className="ri-fire-line text-accent-500 text-3xl"></i>
              </div>
              <h3 className="font-semibold text-xl text-center mb-3">Build Streaks</h3>
              <p className="text-neutral-600 text-center">Track consecutive days of habit completion and keep your momentum going.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mb-6 mx-auto">
                <i className="ri-bar-chart-line text-secondary-500 text-3xl"></i>
              </div>
              <h3 className="font-semibold text-xl text-center mb-3">Visualize Progress</h3>
              <p className="text-neutral-600 text-center">See your growth with detailed analytics and clear visual feedback.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-6 mx-auto">
                <i className="ri-award-line text-primary-500 text-3xl"></i>
              </div>
              <h3 className="font-semibold text-xl text-center mb-3">Earn Achievements</h3>
              <p className="text-neutral-600 text-center">Unlock rewards as you meet your goals and celebrate your success.</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-7 text-xl rounded-full shadow-lg"
              onClick={() => navigate("/dashboard")}
            >
              Start Your Journey
            </Button>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="py-8 text-center text-neutral-600 bg-transparent relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>© 2025 Habit Hero. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-6">
              <a href="#" className="text-neutral-400 hover:text-primary-500">Terms</a>
              <a href="#" className="text-neutral-400 hover:text-primary-500">Privacy</a>
              <a href="#" className="text-neutral-400 hover:text-primary-500">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;