import { Moon, Sun } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function ThemeToggle({ isDarkMode, onToggle, className = "" }) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      className={`cursor-pointer flex items-center justify-center w-9.5 h-9.5 rounded-full bg-white/60 dark:bg-black/40 border border-white dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-colors duration-500 hover:bg-white/90 dark:hover:bg-black/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] dark:hover:border-white/30 ${className}`}
      aria-label="Toggle Theme"
    >
      <div className="relative flex h-5 w-5 items-center justify-center text-slate-700 dark:text-amber-300">
        <AnimatePresence mode="wait" initial={false}>
          {isDarkMode ? (
            <motion.div
              key="sun"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Sun className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}

export default ThemeToggle;
