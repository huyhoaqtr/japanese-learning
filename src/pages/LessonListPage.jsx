import { Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { getLessonList } from "../data/lessons";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

function LessonListPage() {
  const lessons = getLessonList();

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 max-w-2xl text-center">
        <p className="text-amber-500 dark:text-amber-200/70 text-xs font-bold tracking-[0.2em] uppercase mb-3">
          Minna no Nihongo Sơ cấp I
        </p>
        <h1 className="text-3xl sm:text-4xl font-black leading-[1.3] text-slate-700 dark:text-white tracking-[0.05em] mb-3 uppercase">
          Bài học
        </h1>
        <p className="text-sm font-medium text-slate-500 dark:text-white/50">
          Từ vựng, hội thoại và ngữ pháp N5 theo từng bài, bám sát giáo trình Minna no Nihongo.
        </p>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {lessons.map((lesson) => {
          const isAvailable = lesson.status === "available";

          const cardContent = (
            <div
              className={`glass-panel rounded-3xl p-6 flex flex-col h-full ${
                isAvailable ? "group" : "opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-400/20 text-sm font-black text-amber-500 dark:text-amber-300">
                  {lesson.number}
                </span>
                {!isAvailable && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-200/80 dark:bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-white/50">
                    <Sparkles className="h-3 w-3" />
                    Sắp ra mắt
                  </span>
                )}
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-700 dark:text-white mb-2">
                {lesson.title}
              </h3>
              {isAvailable && (
                <p className="mt-auto text-xs font-bold uppercase tracking-widest text-amber-500 dark:text-amber-300 group-hover:translate-x-1 transition-transform duration-300">
                  Bắt đầu học →
                </p>
              )}
            </div>
          );

          return (
            <motion.div key={lesson.id} variants={itemVariants} className="h-full">
              {isAvailable ? (
                <Link to={`/lessons/${lesson.id}`} className="block h-full">
                  {cardContent}
                </Link>
              ) : (
                cardContent
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default LessonListPage;
