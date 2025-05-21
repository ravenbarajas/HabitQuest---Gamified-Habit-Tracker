import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white mr-3">
            <i className="ri-user-smile-line text-xl"></i>
          </div>
          <h1 className="font-poppins font-semibold text-xl">
            Habit Hero
          </h1>
        </div>
        <nav>
          <Link href="/">
            <Button variant="ghost">Home</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="ml-2 bg-primary-400 hover:bg-primary-500 text-white">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-poppins font-bold text-neutral-800 mb-6">
            About Habit Hero
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Habit Hero is a powerful habit tracking application designed to help you build better habits 
              and achieve your personal goals. With our engaging gamification features, you'll find it easier 
              than ever to stick to your habit routines.
            </p>
            
            <h2>Key Features</h2>
            
            <h3>Daily Habit Tracking</h3>
            <p>
              Keep track of your daily habits with our intuitive interface. Mark habits complete, 
              see your progress, and stay on top of your daily routine.
            </p>
            
            <h3>Streak Counting</h3>
            <p>
              Build momentum with our streak counter. See how many days in a row you've completed 
              each habit and try to maintain your streak for as long as possible.
            </p>
            
            <h3>Visual Progress</h3>
            <p>
              Visualize your progress with beautiful charts and graphs. See patterns in your 
              behavior and identify areas for improvement.
            </p>
            
            <h3>Achievement System</h3>
            <p>
              Unlock achievements as you reach milestones in your habit journey. Each achievement 
              represents real progress toward your goals.
            </p>
            
            <h2>Our Philosophy</h2>
            <p>
              At Habit Hero, we believe that small, consistent actions lead to big changes. 
              Our app is designed around the science of habit formation, making it easier for you 
              to develop positive behaviors that last a lifetime.
            </p>
            
            <blockquote>
              "We are what we repeatedly do. Excellence, then, is not an act, but a habit." 
              — Aristotle
            </blockquote>
            
            <div className="mt-8">
              <Link href="/dashboard">
                <Button className="bg-primary-400 hover:bg-primary-500 text-white">
                  Start Building Better Habits
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-neutral-500 border-t">
        <p>© 2025 Habit Hero. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;