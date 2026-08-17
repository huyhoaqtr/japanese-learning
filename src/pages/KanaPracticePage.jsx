import { Check, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { gojuonLayout, learningModes, modeGroups } from "../data/kana";
import { answerModes, createMultipleChoiceOptions } from "../data/quizUtils";
import { usePersistentCounter } from "../hooks/usePersistentCounter";

const getCharacterSizeClass = (kana = "") => {
  if (kana.length <= 2) return "text-[130px]";
  if (kana.length <= 4) return "text-6xl sm:text-7xl";
  return "text-4xl sm:text-5xl";
};

function KanaPracticePage() {
  const [mode, setMode] = useState("hiragana");
  const [answerMode, setAnswerMode] = useState("typing");
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [multipleChoiceOptions, setMultipleChoiceOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("idle"); // idle, correct, wrong
  const [showHint, setShowHint] = useState(false);
  const [showCharacterTable, setShowCharacterTable] = useState(false);
  const [isModeMenuOpen, setIsModeMenuOpen] = useState(false);
  const [, incrementLifetimeCorrect] = usePersistentCounter("kana_total_correct");
  const inputRef = useRef(null);
  const remainingCharacterIndexesRef = useRef([]);
  const advanceTimeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const activeMode = learningModes[mode];
  const activeCharacters = activeMode.characters;

  useEffect(() => {
    resetRemainingCharacters(activeCharacters);
    setInput("");
    setSelectedAnswer("");
    setStatus("idle");
    pickRandomCharacter(activeCharacters);

    return () => {
      clearTimeout(advanceTimeoutRef.current);
      clearTimeout(feedbackTimeoutRef.current);
    };
  }, [activeCharacters]);

  useEffect(() => {
    clearTimeout(feedbackTimeoutRef.current);
    setInput("");
    setSelectedAnswer("");
    setStatus("idle");
    setShowHint(false);
    inputRef.current?.focus();
  }, [answerMode]);

  const resetRemainingCharacters = (characters) => {
    remainingCharacterIndexesRef.current = characters.map((_, index) => index);
  };

  const pickRandomCharacter = (characters = activeCharacters) => {
    if (characters.length === 0) return;

    if (remainingCharacterIndexesRef.current.length === 0) {
      resetRemainingCharacters(characters);
    }

    const randomPosition = Math.floor(
      Math.random() * remainingCharacterIndexesRef.current.length,
    );
    const [nextCharacterIndex] = remainingCharacterIndexesRef.current.splice(
      randomPosition,
      1,
    );

    const nextCharacter = characters[nextCharacterIndex];

    setCurrentCharacter(nextCharacter);
    setMultipleChoiceOptions(
      createMultipleChoiceOptions(characters, nextCharacter.romaji),
    );
    setSelectedAnswer("");
    setShowHint(false);
  };

  const handleModeChange = (nextMode) => {
    if (nextMode === mode) return;

    clearTimeout(advanceTimeoutRef.current);
    setMode(nextMode);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const checkAnswer = (answer) => {
    if (!answer || !currentCharacter || status === "correct") return;

    clearTimeout(advanceTimeoutRef.current);
    clearTimeout(feedbackTimeoutRef.current);

    if (answer === currentCharacter.romaji) {
      setStatus("correct");
      setScore((s) => s + 1);
      incrementLifetimeCorrect();
      advanceTimeoutRef.current = setTimeout(() => {
        pickRandomCharacter();
        setInput("");
        setStatus("idle");
        inputRef.current?.focus();
      }, 500);
    } else {
      setStatus("wrong");
      feedbackTimeoutRef.current = setTimeout(() => {
        setSelectedAnswer("");
        setStatus("idle");
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkAnswer(input.trim());
  };

  const handleMultipleChoiceAnswer = (answer) => {
    setSelectedAnswer(answer);
    checkAnswer(answer);
  };

  const isGojuonMode = mode === "hiragana" || mode === "katakana";

  const modeEntries = Object.entries(learningModes);
  const basicModeEntries = modeEntries.filter(([, option]) => option.group === "basic");
  const extendedModeEntries = modeEntries.filter(([, option]) => option.group === "extended");

  const renderModeListItem = ([modeKey, option]) => {
    const isActive = modeKey === mode;

    return (
      <button
        key={modeKey}
        type="button"
        onClick={() => {
          handleModeChange(modeKey);
          setIsModeMenuOpen(false);
        }}
        className={`flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${isActive
          ? "bg-amber-400/15 text-amber-500 dark:text-amber-300"
          : "text-slate-600 dark:text-white/60 hover:bg-white/60 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white"
          }`}
      >
        <span>{option.label}</span>
        {isActive && <Check className="h-4 w-4 flex-shrink-0" />}
      </button>
    );
  };

  let displayCharacters = activeCharacters;
  if (isGojuonMode) {
    const charMap = new Map(activeCharacters.map((c) => [c.romaji, c]));
    displayCharacters = gojuonLayout.map((romaji, index) => {
      if (!romaji) return { empty: true, id: `empty-${index}` };
      const char = charMap.get(romaji);
      return char ? { ...char, id: char.kana } : { empty: true, id: `missing-${romaji}` };
    });
  } else {
    displayCharacters = activeCharacters.map((c) => ({ ...c, id: c.kana }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-black leading-[1.3] text-slate-700 dark:text-white tracking-[0.15em] drop-shadow-2xl mb-3 uppercase">
          Học bảng chữ Nhật
        </h1>
        <p className="text-amber-500 dark:text-amber-200/70 text-sm font-bold tracking-[0.2em] uppercase">
          Cấp độ N5 - {activeMode.label}
        </p>
      </div>

      {/* Mode & Answer Selectors */}
      <div className="relative mx-auto mb-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 ">
        {/* Mode Dropdown */}
        <div className="relative w-full max-w-md">
          <motion.button
            type="button"
            onClick={() => setIsModeMenuOpen((open) => !open)}
            whileTap={{ scale: 0.97 }}
            className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 bg-white/80 dark:bg-black/40 p-1.5 text-left shadow-xl dark:shadow-2xl backdrop-blur-xl transition-colors duration-300 hover:border-white dark:hover:border-white/30"
          >
            <span className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-amber-400/20 text-sm font-black text-amber-500 dark:text-amber-300">
                {activeMode.label.charAt(0)}
              </span>
              <span className="truncate text-sm font-black uppercase tracking-widest text-slate-700 dark:text-white">
                {activeMode.label}
              </span>
            </span>
            <ChevronDown
              className={`h-4 w-4 flex-shrink-0 text-slate-400 dark:text-white/40 transition-transform duration-300 ${isModeMenuOpen ? "rotate-180" : ""}`}
            />
          </motion.button>

          <AnimatePresence>
            {isModeMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsModeMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 top-full z-50 mt-2 w-full glass-panel rounded-2xl p-2 flex flex-col gap-0.5"
                >
                  <p className="px-3 pb-1 pt-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                    {modeGroups.basic}
                  </p>
                  {basicModeEntries.map((entry) => renderModeListItem(entry))}
                  <p className="px-3 pb-1 pt-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">
                    {modeGroups.extended}
                  </p>
                  {extendedModeEntries.map((entry) => renderModeListItem(entry))}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Answer Mode Selector */}
        <div className="grid w-full max-w-md grid-cols-2 gap-2 rounded-2xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 bg-white/80 dark:bg-black/40 p-1.5 shadow-xl dark:shadow-2xl backdrop-blur-xl sm:w-auto">
          {Object.entries(answerModes).map(([answerModeKey, label]) => {
            const isActive = answerModeKey === answerMode;

            return (
              <motion.button
                key={answerModeKey}
                type="button"
                onClick={() => setAnswerMode(answerModeKey)}
                whileTap={{ scale: 0.96 }}
                className={`relative cursor-pointer rounded-xl px-4 py-2.5 text-center text-xs font-black uppercase tracking-widest transition-colors duration-300 ${isActive
                  ? "text-slate-700 dark:text-white"
                  : "text-slate-500 dark:text-white/50 hover:bg-white/80 backdrop-blur-xl dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-white"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="kana-answer-pill"
                    className="absolute inset-0 rounded-xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/20 bg-white/80 dark:bg-white/10 shadow-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Card */}
      <div className="mx-auto max-w-md w-full glass-panel p-10 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute right-6 top-6 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-xl dark:bg-white/5 border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 px-4 py-2 text-xs font-bold tracking-wider text-amber-500 dark:text-amber-500 dark:text-amber-200/90 shadow-inner overflow-hidden">
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
          {/* Character Display */}
          <div className="relative flex h-[160px] w-full items-center justify-center mb-4 px-2">
            <motion.div
              key={currentCharacter?.kana || "placeholder"}
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className={`absolute text-center leading-none font-black text-slate-700 dark:text-white transition-colors duration-300 ${getCharacterSizeClass(currentCharacter?.kana)} ${status === "correct" ? "scale-110 text-amber-500 dark:text-amber-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)] dark:drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]" : ""} ${status === "wrong" ? "animate-shake text-rose-500 dark:text-rose-400 drop-shadow-[0_0_30px_rgba(244,63,94,0.2)] dark:drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]" : ""}`}
              style={{ textShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
            >
              {currentCharacter?.kana || "あ"}
            </motion.div>
          </div>

          {/* Hint */}
          <div className="h-8 mb-8 flex items-center justify-center">
            {showHint ? (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-center"
              >
                <span className="text-2xl font-black text-amber-500 dark:text-amber-200/70 tracking-[0.2em] uppercase">
                  {currentCharacter?.romaji}
                </span>
                {currentCharacter?.meaning && (
                  <span className="text-xs font-bold text-slate-400 dark:text-white/40">
                    ({currentCharacter.meaning})
                  </span>
                )}
              </motion.div>
            ) : (
              <button
                type="button"
                onClick={() => setShowHint(true)}
                className="text-xs font-bold tracking-widest text-slate-400 dark:text-white/30 hover:text-slate-700 dark:hover:text-white/80 transition-colors underline decoration-dotted underline-offset-8 uppercase"
                tabIndex="-1"
              >
                Quên cách đọc?
              </button>
            )}
          </div>

          {answerMode === "typing" ? (
            /* Input Form */
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className={`w-full max-w-[280px] text-center text-2xl sm:text-3xl font-black py-4 px-6 rounded-2xl bg-white/70 dark:bg-black/40 text-slate-700 dark:text-white border shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all duration-300 ${status === "wrong"
                  ? "focus:ring-rose-500/50 border-rose-500/50"
                  : status === "correct"
                    ? "focus:ring-amber-400/50 border-amber-400/50"
                    : "border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 focus:ring-black/10 dark:focus:ring-white/20 hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:hover:border-white/20"
                  }`}
                placeholder="rōmaji"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
              <motion.button
                type="submit"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="cursor-pointer mt-8 w-full max-w-[260px] rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/70 backdrop-blur-xl dark:bg-white/10 px-6 py-4 text-sm font-bold tracking-widest text-slate-700 dark:text-white shadow-lg backdrop-blur-xl transition-colors duration-300 hover:bg-white/80 dark:hover:bg-white/20 hover:border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:border-white/30 uppercase"
              >
                Kiểm tra
              </motion.button>
            </form>
          ) : (
            /* Multiple Choice Form */
            <div className="grid w-full grid-cols-2 gap-3">
              {multipleChoiceOptions.map((option) => {
                const isSelected = selectedAnswer === option;
                const isCorrectAnswer = option === currentCharacter?.romaji;
                const shouldShowCorrect =
                  status === "correct" && isCorrectAnswer;
                const shouldShowWrong =
                  status === "wrong" && isSelected && !isCorrectAnswer;

                return (
                  <motion.button
                    key={option}
                    type="button"
                    onClick={() => handleMultipleChoiceAnswer(option)}
                    disabled={status === "correct"}
                    whileHover={status === "correct" ? {} : { y: -4 }}
                    whileTap={status === "correct" ? {} : { scale: 0.95 }}
                    animate={shouldShowWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                    transition={shouldShowWrong ? { duration: 0.4 } : { duration: 0.2 }}
                    className={`cursor-pointer rounded-2xl border px-5 py-5 text-lg sm:text-xl font-black tracking-wider uppercase shadow-lg backdrop-blur-xl transition-colors duration-300 disabled:cursor-default ${shouldShowCorrect
                      ? "border-amber-400/50 bg-amber-100 dark:bg-amber-400/20 text-amber-500 dark:text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                      : shouldShowWrong
                        ? "border-rose-500/50 bg-rose-100 dark:bg-rose-500/20 text-rose-500 dark:text-rose-300 shadow-[0_0_20px_rgba(225,29,72,0.2)] dark:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                        : "border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 bg-white/70 dark:bg-black/40 text-slate-700 dark:text-white hover:border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:border-white/30 hover:bg-white/80 dark:hover:bg-white/10"
                      }`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <motion.button
          type="button"
          onClick={() => setShowCharacterTable((isShowing) => !isShowing)}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
          className="cursor-pointer rounded-full border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/80 dark:bg-black/40 px-6 py-3 text-xs font-bold tracking-widest text-slate-600 dark:text-white/70 shadow-lg backdrop-blur-xl transition-colors duration-300 hover:border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:border-white/30 hover:bg-white/80 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-white uppercase"
          aria-expanded={showCharacterTable}
        >
          {showCharacterTable ? "Ẩn bảng chữ cái" : "Hiện bảng chữ cái"}
        </motion.button>
      </div>

      {/* Character Table */}
      <AnimatePresence>
        {showCharacterTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full overflow-hidden"
          >
            <div className="mt-8 w-full rounded-[2.5rem] glass-panel p-8">
              <div className="mb-8 flex flex-col gap-2 text-slate-700 dark:text-white sm:flex-row sm:items-end sm:justify-between border-b border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 pb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-widest uppercase">
                    {activeMode.isWordBased ? "Ví dụ" : "Bảng chữ"} {activeMode.label}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 dark:text-white/50 mt-2">
                    {activeMode.isWordBased
                      ? "Các từ minh họa kèm nghĩa tiếng Việt, dùng để luyện đọc và nhận diện quy tắc."
                      : "Các chữ đã xuất hiện trong một vòng sẽ không bị random lại cho tới khi hết bảng."}
                  </p>
                </div>
                <p className="text-xs font-bold tracking-widest text-amber-500 dark:text-amber-200/80 uppercase">
                  {activeCharacters.length} {activeMode.isWordBased ? "từ" : "chữ"}
                </p>
              </div>

              {activeMode.isWordBased ? (
                <div className="space-y-2">
                  {displayCharacters.map((word) => {
                    const isCurrentCharacter = currentCharacter?.kana === word.kana;

                    return (
                      <div
                        key={word.id}
                        className={`relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border p-4 transition-colors duration-300 ${isCurrentCharacter
                          ? "border-amber-400/60 z-10"
                          : "border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/5 bg-white/70 dark:bg-black/40 hover:border-white dark:hover:border-white/20 hover:bg-white/80 dark:hover:bg-white/5"
                          }`}
                      >
                        {isCurrentCharacter && (
                          <motion.div
                            layoutId="kana-table-highlight"
                            className="absolute inset-0 rounded-2xl bg-amber-100 dark:bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                        <div className="relative z-10 flex items-center gap-4">
                          <span className={`text-xl font-black leading-none ${isCurrentCharacter ? "text-amber-500 dark:text-amber-300" : "text-slate-700 dark:text-white"}`}>
                            {word.kana}
                          </span>
                          <span className={`text-xs font-bold uppercase tracking-widest ${isCurrentCharacter ? "text-amber-500 dark:text-amber-200/90" : "text-slate-400 dark:text-white/40"}`}>
                            {word.romaji}
                          </span>
                        </div>
                        <span className="relative z-10 text-xs font-medium text-slate-500 dark:text-white/50 text-right">
                          {word.meaning}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="overflow-x-auto pb-4">
                  <div className={`grid gap-1 sm:gap-2 ${isGojuonMode ? "min-w-[600px] sm:min-w-0 grid-cols-11 max-w-5xl mx-auto" : "grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10"}`}>
                    {displayCharacters.map((character) => {
                      if (character.empty) {
                        return <div key={character.id} className="col-span-1"></div>;
                      }

                      const isCurrentCharacter =
                        currentCharacter?.kana === character.kana;

                      return (
                        <div
                          key={character.id}
                          className={`relative rounded-2xl border p-2 sm:p-4 text-center transition-colors duration-300 ${isCurrentCharacter
                            ? "border-amber-400/60 text-amber-500 dark:text-amber-300 z-10"
                            : "border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/5 bg-white/70 dark:bg-black/40 text-slate-700 dark:text-white/80 hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:hover:border-white/20 hover:bg-white/80 dark:hover:bg-white/5"
                            }`}
                        >
                          {isCurrentCharacter && (
                            <motion.div
                              layoutId="kana-table-highlight"
                              className="absolute inset-0 rounded-2xl bg-amber-100 dark:bg-amber-400/20 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                              transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            />
                          )}
                          <div className="relative z-10 text-2xl sm:text-3xl font-black leading-none">
                            {character.kana}
                          </div>
                          <div
                            className={`relative z-10 mt-1 sm:mt-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase ${isCurrentCharacter ? "text-amber-500 dark:text-amber-200/90" : "text-slate-400 dark:text-white/40"}`}
                          >
                            {character.romaji}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer info */}
      <div className="mt-12 text-center text-slate-400 dark:text-white/40 text-xs font-medium tracking-widest uppercase flex flex-col gap-2">
        <p>
          {answerMode === "typing"
            ? 'Nhập rōmaji (VD: "ka", "ki") và nhấn Enter'
            : "Chọn đáp án rōmaji đúng"}
        </p>
      </div>
    </motion.div>
  );
}

export default KanaPracticePage;
