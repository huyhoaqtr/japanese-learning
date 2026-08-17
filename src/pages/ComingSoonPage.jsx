import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

function ComingSoonPage({ feature }) {
  const Icon = feature.icon;

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto max-w-lg w-full glass-panel p-10 rounded-[2.5rem] flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-400/20 text-amber-500 dark:text-amber-300 mb-6"
        >
          <Icon className="h-10 w-10" />
        </motion.div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-amber-500 dark:text-amber-300 mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          Sắp ra mắt
        </span>

        <h1 className="text-2xl font-black uppercase tracking-widest text-slate-700 dark:text-white mb-3">
          {feature.label}
        </h1>

        <p className="text-sm font-medium text-slate-500 dark:text-white/50 mb-8">
          {feature.description}
        </p>

        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/30 mb-8">
          Tính năng đang được phát triển, quay lại sau nhé!
        </p>

        <MotionLink
          to="/"
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
          className="cursor-pointer rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/70 backdrop-blur-xl dark:bg-white/10 px-6 py-3 text-sm font-bold tracking-widest text-slate-700 dark:text-white shadow-lg transition-colors duration-300 hover:bg-white/80 dark:hover:bg-white/20 uppercase"
        >
          Về trang chủ
        </MotionLink>
      </motion.div>
    </div>
  );
}

export default ComingSoonPage;
