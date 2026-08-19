import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createMultipleChoiceOptions, getShortMeaning } from "../../data/quizUtils";
import { usePersistentCounter } from "../../hooks/usePersistentCounter";
import SpeakButton from "../SpeakButton";

const getWordSizeClass = (text = "") => {
  if (text.length <= 4) return "text-4xl sm:text-5xl";
  if (text.length <= 8) return "text-3xl sm:text-4xl";
  return "text-2xl sm:text-3xl";
};

function VocabPractice({ vocab }) {
  const [currentItem, setCurrentItem] = useState(null);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle");
  const [showHint, setShowHint] = useState(false);
  const [, incrementLifetimeCorrect] = usePersistentCounter("vocab_total_correct");
  const remainingIndexesRef = useRef([]);
  const advanceTimeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);

  const resetRemainingItems = () => {
    remainingIndexesRef.current = vocab.map((_, index) => index);
  };

  const pickRandomItem = () => {
    if (vocab.length === 0) return;

    if (remainingIndexesRef.current.length === 0) {
      resetRemainingItems();
    }

    const randomPosition = Math.floor(Math.random() * remainingIndexesRef.current.length);
    const [nextItemIndex] = remainingIndexesRef.current.splice(randomPosition, 1);
    const nextItem = vocab[nextItemIndex];

    setCurrentItem(nextItem);
    setMultipleChoiceOptions(
      createMultipleChoiceOptions(vocab, getShortMeaning(nextItem.meaning), (item) =>
        getShortMeaning(item.meaning),
      ),
    );
    setSelectedAnswer("");
    setShowHint(false);
  };

  useEffect(() => {
    resetRemainingItems();
    setStatus("idle");
    pickRandomItem();

    return () => {
      clearTimeout(advanceTimeoutRef.current);
      clearTimeout(feedbackTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vocab]);

  const handleAnswer = (answer) => {
    if (!currentItem || status === "correct") return;

    clearTimeout(advanceTimeoutRef.current);
    clearTimeout(feedbackTimeoutRef.current);

    setSelectedAnswer(answer);

    const isCorrect = answer === getShortMeaning(currentItem.meaning);

    if (isCorrect) {
      setStatus("correct");
      setScore((s) => s + 1);
      incrementLifetimeCorrect();
      advanceTimeoutRef.current = setTimeout(() => {
        pickRandomItem();
        setStatus("idle");
      }, 600);
    } else {
      setStatus("wrong");
      feedbackTimeoutRef.current = setTimeout(() => {
        setSelectedAnswer("");
        setStatus("idle");
      }, 600);
    }
  };

  if (vocab.length === 0) {
    return (
      <p className="text-center text-sm font-medium text-slate-500 dark:text-white/50">
        Bài học này chưa có từ vựng để luyện tập.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {/* Main Card */}
      <div className="mx-auto max-w-md w-full glass-panel p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute right-6 top-6 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-xl dark:bg-white/5 border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 px-4 py-2 text-xs font-bold tracking-wider text-amber-500 dark:text-amber-200/90 shadow-inner overflow-hidden">
          ĐIỂM:{" "}
          <AnimatePresence mode="popLayout">
            <motion.span
              key={score}
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              {score}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center mt-10">
          {/* Word Display */}
          <div className="relative flex min-h-[120px] w-full flex-col items-center justify-center mb-2 px-2 text-center">
            <motion.div
              key={currentItem?.kana || "placeholder"}
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ wordBreak: "keep-all" }}
              className={`leading-tight font-black text-slate-700 dark:text-white transition-colors duration-300 ${getWordSizeClass(currentItem?.kana)} ${status === "correct" ? "scale-110 text-amber-500 dark:text-amber-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)] dark:drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]" : ""} ${status === "wrong" ? "animate-shake text-rose-500 dark:text-rose-400" : ""}`}
            >
              {currentItem?.kana || ""}
            </motion.div>
            {currentItem?.kanji && (
              <p className="mt-1 text-sm font-bold text-slate-400 dark:text-white/40">
                {currentItem.kanji}
              </p>
            )}
          </div>

          {currentItem && (
            <SpeakButton
              text={currentItem.kana}
              size="h-5 w-5"
              className="mb-6 bg-white/70 dark:bg-black/40 border border-white/80 dark:border-white/10 shadow-sm"
            />
          )}

          {/* Hint */}
          <div className="min-h-8 mb-8 flex items-center justify-center text-center">
            {showHint ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-bold text-amber-500 dark:text-amber-200/70"
              >
                {currentItem?.meaning}
              </motion.p>
            ) : (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-xs font-bold tracking-widest text-slate-400 dark:text-white/30 hover:text-slate-700 dark:hover:text-white/80 transition-colors underline decoration-dotted underline-offset-8 uppercase"
                tabIndex="-1"
              >
                Quên nghĩa?
              </button>
            )}
          </div>

          <div className="grid w-full grid-cols-1 gap-3">
            {multipleChoiceOptions.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = option === getShortMeaning(currentItem?.meaning || "");
              const shouldShowCorrect = status === "correct" && isCorrectAnswer;
              const shouldShowWrong = status === "wrong" && isSelected && !isCorrectAnswer;

              return (
                <motion.button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  disabled={status === "correct"}
                  whileHover={status === "correct" ? {} : { y: -2 }}
                  whileTap={status === "correct" ? {} : { scale: 0.97 }}
                  animate={shouldShowWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                  transition={shouldShowWrong ? { duration: 0.4 } : { duration: 0.2 }}
                  className={`cursor-pointer rounded-2xl border px-5 py-4 text-sm sm:text-base font-bold text-left shadow-lg backdrop-blur-xl transition-colors duration-300 disabled:cursor-default ${shouldShowCorrect
                    ? "border-amber-400/50 bg-amber-100 dark:bg-amber-400/20 text-amber-500 dark:text-amber-300"
                    : shouldShowWrong
                      ? "border-rose-500/50 bg-rose-100 dark:bg-rose-500/20 text-rose-500 dark:text-rose-300"
                      : "border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 bg-white/70 dark:bg-black/40 text-slate-700 dark:text-white hover:border-white dark:hover:border-white/30 hover:bg-white/80 dark:hover:bg-white/10"
                    }`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-slate-400 dark:text-white/40 text-xs font-medium tracking-widest uppercase">
        Chọn nghĩa đúng
      </p>
    </div>
  );
}

export default VocabPractice;
