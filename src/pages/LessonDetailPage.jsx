import { useState } from "react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { BookOpenText, ChevronLeft } from "lucide-react";
import { getLessonById } from "../data/lessons";
import VocabTable from "../components/lesson/VocabTable";
import PhraseList from "../components/lesson/PhraseList";
import TranslationSection from "../components/lesson/TranslationSection";
import ReferenceTable from "../components/lesson/ReferenceTable";
import GrammarSection from "../components/lesson/GrammarSection";
import VocabPractice from "../components/lesson/VocabPractice";

const TABS = [
  { id: "vocab", label: "Từ vựng" },
  { id: "translation", label: "Phần dịch" },
  { id: "reference", label: "Tham khảo" },
  { id: "grammar", label: "Ngữ pháp" },
  { id: "practice", label: "Luyện tập" },
];

function LessonDetailPage() {
  const { lessonId } = useParams();
  const lesson = getLessonById(lessonId);
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  if (!lesson) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="glass-panel max-w-md rounded-[2.5rem] p-10 flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-400/20 text-amber-500 dark:text-amber-300 mb-6">
            <BookOpenText className="h-8 w-8" />
          </div>
          <h1 className="text-xl font-black uppercase tracking-widest text-slate-700 dark:text-white mb-3">
            Bài học chưa sẵn sàng
          </h1>
          <p className="text-sm font-medium text-slate-500 dark:text-white/50 mb-8">
            Bài học này chưa có nội dung hoặc không tồn tại. Quay lại danh sách để chọn bài khác.
          </p>
          <Link
            to="/lessons"
            className="cursor-pointer rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/70 backdrop-blur-xl dark:bg-white/10 px-6 py-3 text-sm font-bold tracking-widest text-slate-700 dark:text-white transition-colors duration-300 hover:bg-white/80 dark:hover:bg-white/20 uppercase"
          >
            Về danh sách bài học
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Link
        to="/lessons"
        className="mb-4 inline-flex items-center gap-1 self-start text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 hover:text-amber-500 dark:hover:text-amber-300 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
        Danh sách bài học
      </Link>

      <h1 className="text-3xl sm:text-4xl font-black leading-[1.3] text-slate-700 dark:text-white tracking-[0.05em] mb-6 uppercase">
        {lesson.title}
      </h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className="relative rounded-2xl px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="lesson-tab-highlight"
                  className="absolute inset-0 rounded-2xl bg-amber-400 dark:bg-amber-400/80"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              )}
              <span
                className={`relative z-10 ${
                  isActive ? "text-slate-900" : "text-slate-500 dark:text-white/50"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {activeTab === "vocab" && (
          <div className="flex flex-col gap-6">
            <VocabTable items={lesson.vocab} />
            {lesson.keyPhrases?.length > 0 && (
              <PhraseList title="Mẫu câu giao tiếp" items={lesson.keyPhrases} />
            )}
            {lesson.countryVocab?.length > 0 && (
              <PhraseList title="Tên nước" items={lesson.countryVocab} />
            )}
            {lesson.fictionalNames?.length > 0 && (
              <PhraseList title="Tên giả định dùng trong bài học" items={lesson.fictionalNames} />
            )}
          </div>
        )}

        {activeTab === "translation" && <TranslationSection translation={lesson.translation} />}

        {activeTab === "reference" && lesson.reference && <ReferenceTable table={lesson.reference} />}

        {activeTab === "grammar" && <GrammarSection grammar={lesson.grammar} />}

        {activeTab === "practice" && <VocabPractice vocab={lesson.vocab} />}
      </motion.div>
    </div>
  );
}

export default LessonDetailPage;
