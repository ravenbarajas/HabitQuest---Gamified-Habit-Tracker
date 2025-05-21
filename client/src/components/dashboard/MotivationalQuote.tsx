import React from "react";
import { motion } from "framer-motion";
import { useHabitContext } from "@/context/HabitContext";

interface MotivationalQuoteProps {
  className?: string;
}

const MotivationalQuote = ({ className }: MotivationalQuoteProps) => {
  const { quote, refreshQuote } = useHabitContext();
  
  return (
    <motion.div 
      className={`bg-primary-400 rounded-xl shadow-card p-6 text-white relative overflow-hidden cursor-pointer ${className}`}
      onClick={refreshQuote}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute top-4 right-4 text-white opacity-20">
        <i className="ri-double-quotes-r text-5xl"></i>
      </div>
      
      <motion.p 
        key={quote.quote} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-lg font-medium mb-6 relative z-10"
      >
        "{quote.quote}"
      </motion.p>
      
      <motion.p 
        key={quote.author}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-primary-100 text-sm"
      >
        — {quote.author}
      </motion.p>
    </motion.div>
  );
};

export default MotivationalQuote;
