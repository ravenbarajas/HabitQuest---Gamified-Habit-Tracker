import { AnimationProps } from "framer-motion";

// Animation presets for Framer Motion
export const animations = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  },

  // Fade in animation
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },

  // Scale up animation
  scaleUp: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },

  // List item animations
  listItem: (index: number): AnimationProps => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.1, duration: 0.4 }
  }),

  // Achievement unlock animation
  achievementUnlock: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { 
      scale: [0.5, 1.1, 1],
      opacity: 1,
      transition: { 
        duration: 0.6,
        times: [0, 0.7, 1],
        ease: "easeOut" 
      }
    }
  },

  // Habit completion animation
  habitCompletion: {
    initial: { backgroundColor: "var(--neutral-100)" },
    animate: { 
      backgroundColor: ["var(--primary-100)", "var(--neutral-100)"],
      transition: { duration: 1.5, ease: "easeOut" }
    }
  },

  // Float animation
  float: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Pulse animation
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },

  // Streak indicator animation
  streakFlame: {
    animate: {
      filter: [
        "drop-shadow(0 0 5px rgba(255, 174, 26, 0.5))",
        "drop-shadow(0 0 10px rgba(255, 174, 26, 0.7))",
        "drop-shadow(0 0 5px rgba(255, 174, 26, 0.5))"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};
