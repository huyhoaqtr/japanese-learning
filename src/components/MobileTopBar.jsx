import ThemeToggle from "./ThemeToggle";

function MobileTopBar({ isDarkMode, onToggleTheme }) {
  return (
    <header className="md:hidden sticky top-0 z-40 flex items-center justify-between glass-panel px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/20 text-sm font-black text-amber-500 dark:text-amber-300">
          日
        </div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-white">
          Chinh Phục Tiếng Nhật
        </p>
      </div>
      <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} className="w-9 h-9" />
    </header>
  );
}

export default MobileTopBar;
