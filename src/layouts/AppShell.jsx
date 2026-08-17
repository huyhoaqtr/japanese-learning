import { Outlet } from "react-router-dom";
import "../App.css";
import BottomNav from "../components/BottomNav";
import MobileTopBar from "../components/MobileTopBar";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../hooks/useTheme";

function AppShell() {
  const [isDarkMode, toggleTheme] = useTheme();

  return (
    <>
      <div className="ambient-background" />
      <div className="min-h-screen selection:bg-amber-400/30 dark:selection:text-white text-slate-700 dark:text-slate-200">
        <Sidebar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
        <MobileTopBar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

        <main className="md:pl-64 pb-24 md:pb-0">
          <div className="w-full max-w-5xl mx-auto px-4 py-10 relative z-10">
            <Outlet />
          </div>
        </main>

        <BottomNav />
      </div>
    </>
  );
}

export default AppShell;
