import { CheckCircle2, GraduationCap, LayoutGrid } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { features } from "../data/features";
import { usePersistentCounter } from "../hooks/usePersistentCounter";
import { usePageMeta } from "../hooks/usePageMeta";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

function HomePage() {
  usePageMeta({
    title: "Trang chủ | Chinh Phục Tiếng Nhật",
    description: "Tổng quan lộ trình học N5, tiến độ luyện tập và lối vào từng mục học tập.",
  });
  const [totalCorrect] = usePersistentCounter("kana_total_correct");
  const featureCards = features.filter((feature) => feature.id !== "home");
  const availableCount = featureCards.filter((f) => f.status === "available").length;

  const stats = [
    {
      label: "Câu đã trả lời đúng",
      value: totalCorrect,
      icon: CheckCircle2,
    },
    {
      label: "Cấp độ hiện tại",
      value: "N5",
      icon: GraduationCap,
    },
    {
      label: "Tính năng đã sẵn sàng",
      value: `${availableCount}/${featureCards.length}`,
      icon: LayoutGrid,
    },
  ];

  return (
    <motion.div
      className="flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero */}
      <motion.div variants={itemVariants} className="text-center mb-10 max-w-2xl">
        <p className="text-amber-500 dark:text-amber-200/70 text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Nền tảng học tiếng Nhật cho người Việt
        </p>
        <h1 className="text-4xl sm:text-5xl font-black leading-[1.3] text-slate-700 dark:text-white tracking-[0.05em] drop-shadow-2xl mb-4 uppercase">
          Chinh Phục Tiếng Nhật
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-white/50 mb-8">
          Luyện Hiragana, Katakana, từ vựng, ngữ pháp và Kanji theo lộ trình JLPT N5 —
          từng bước, ngay trên trình duyệt.
        </p>
        <motion.div
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
          className="inline-block"
        >
          <Link
            to="/luyen-kana"
            className="cursor-pointer inline-block rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/70 backdrop-blur-xl dark:bg-white/10 px-8 py-4 text-sm font-bold tracking-widest text-slate-700 dark:text-white shadow-lg transition-colors duration-300 hover:bg-white/80 dark:hover:bg-white/20 uppercase"
          >
            Bắt đầu luyện Kana
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        className="grid w-full max-w-3xl grid-cols-1 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-12"
      >
        {stats.map(({ label, value, icon: Icon }) => (
          <motion.div key={label} variants={itemVariants} className="h-full">
            <div className="glass-panel rounded-3xl p-5 flex items-center gap-4 h-full">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-500 dark:text-amber-300">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-700 dark:text-white">{value}</p>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/40">
                  {label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature grid */}
      <div className="w-full">
        <motion.h2
          variants={itemVariants}
          className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white/40 mb-4"
        >
          Các mục học tập
        </motion.h2>
        <motion.div
          variants={containerVariants}
          className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {featureCards.map(({ id, path, label, description, icon: Icon, status }) => {
            const isAvailable = status === "available";

            return (
              <motion.div
                key={id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Link
                  to={path}
                  className="group glass-panel rounded-3xl p-6 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-500 dark:text-amber-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    {!isAvailable && (
                      <span className="rounded-full bg-slate-200/80 dark:bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-white/50">
                        Sắp ra mắt
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-white mb-2">
                    {label}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-white/50 flex-1">
                    {description}
                  </p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-widest text-amber-500 dark:text-amber-300 group-hover:translate-x-1 transition-transform duration-300">
                    {isAvailable ? "Bắt đầu →" : "Xem chi tiết →"}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Footer info */}
      <motion.div
        variants={itemVariants}
        className="mt-12 text-center text-slate-400 dark:text-white/40 text-xs font-medium tracking-widest uppercase"
      >
        <p>&copy; {new Date().getFullYear()} Chinh Phục Tiếng Nhật. All rights reserved.</p>
      </motion.div>
    </motion.div>
  );
}

export default HomePage;
