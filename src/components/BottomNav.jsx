import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { features } from "../data/features";

function BottomNav() {
  const navItems = features.filter((feature) => feature.showInNav);

  return (
    <nav
      className="md:hidden fixed inset-x-0 bottom-0 z-40 flex items-center gap-1 glass-panel px-2 pt-2"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      {navItems.map(({ id, path, label, icon: Icon }) => (
        <NavLink
          key={id}
          to={path}
          end={path === "/trang-chu"}
          className={({ isActive }) => `min-w-0 ${isActive ? "flex-[3]" : "flex-1"}`}
        >
          {({ isActive }) => (
            <div
              className={`relative flex items-center justify-center gap-1 overflow-hidden rounded-2xl py-2.5 transition-colors duration-300 ${isActive ? "px-1.5" : "px-1"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottom-active-pill"
                  className="absolute inset-0 rounded-2xl bg-amber-400/15"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <motion.div
                className="relative z-10 flex-shrink-0"
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-amber-500 dark:text-amber-300" : "text-slate-400 dark:text-white/40"}`}
                />
              </motion.div>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.05, ease: "easeOut" }}
                  className="relative z-10 max-w-[110px] truncate whitespace-nowrap text-[10px] font-black uppercase tracking-wide text-amber-500 dark:text-amber-300"
                >
                  {label}
                </motion.span>
              )}
            </div>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
