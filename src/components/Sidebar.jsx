import { motion } from "motion/react";
import { NavLink } from "react-router-dom";
import { features } from "../data/features";
import ThemeToggle from "./ThemeToggle";

function Sidebar({ isDarkMode, onToggleTheme }) {
  const navItems = features.filter((feature) => feature.showInNav);

  return (
    <aside className="hidden md:flex fixed inset-y-0 left-0 z-40 w-64 flex-col glass-panel">
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/20 text-lg font-black text-amber-500 dark:text-amber-300">
          日
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-white">
            Chinh Phục
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-amber-500 dark:text-amber-200/70">
            Tiếng Nhật
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-2">
        {navItems.map(({ id, path, label, icon: Icon, status }) => (
          <NavLink
            key={id}
            to={path}
            end={path === "/dashboard"}
            className={({ isActive }) =>
              `relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold tracking-wide transition-colors duration-300 ${
                isActive
                  ? "text-amber-500 dark:text-white"
                  : "text-slate-500 dark:text-white/50 hover:bg-white/60 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-2xl bg-white/80 dark:bg-white/10 shadow-[0_0_20px_rgba(251,191,36,0.15)] ring-1 ring-amber-500/30 dark:ring-amber-400/30"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className="relative z-10 h-5 w-5 shrink-0" />
                <span className="relative z-10 flex-1">{label}</span>
                {status === "coming-soon" && (
                  <span className="relative z-10 rounded-full bg-slate-200/80 dark:bg-white/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-white/50">
                    Soon
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center justify-between px-6 py-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/30">
          N5 · JLPT
        </p>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} className="w-10 h-10" />
      </div>
    </aside>
  );
}

export default Sidebar;
