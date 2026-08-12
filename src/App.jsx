import { useState, useEffect, useRef } from "react";
import "./App.css";

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const hiraganaData = [
  { romaji: "a", kana: "あ" },
  { romaji: "i", kana: "い" },
  { romaji: "u", kana: "う" },
  { romaji: "e", kana: "え" },
  { romaji: "o", kana: "お" },
  { romaji: "ka", kana: "か" },
  { romaji: "ki", kana: "き" },
  { romaji: "ku", kana: "く" },
  { romaji: "ke", kana: "け" },
  { romaji: "ko", kana: "こ" },
  { romaji: "sa", kana: "さ" },
  { romaji: "shi", kana: "し" },
  { romaji: "su", kana: "す" },
  { romaji: "se", kana: "せ" },
  { romaji: "so", kana: "そ" },
  { romaji: "ta", kana: "た" },
  { romaji: "chi", kana: "ち" },
  { romaji: "tsu", kana: "つ" },
  { romaji: "te", kana: "て" },
  { romaji: "to", kana: "と" },
  { romaji: "na", kana: "な" },
  { romaji: "ni", kana: "に" },
  { romaji: "nu", kana: "ぬ" },
  { romaji: "ne", kana: "ね" },
  { romaji: "no", kana: "の" },
  { romaji: "ha", kana: "は" },
  { romaji: "hi", kana: "ひ" },
  { romaji: "fu", kana: "ふ" },
  { romaji: "he", kana: "へ" },
  { romaji: "ho", kana: "ほ" },
  { romaji: "ma", kana: "ま" },
  { romaji: "mi", kana: "み" },
  { romaji: "mu", kana: "む" },
  { romaji: "me", kana: "め" },
  { romaji: "mo", kana: "も" },
  { romaji: "ya", kana: "や" },
  { romaji: "yu", kana: "ゆ" },
  { romaji: "yo", kana: "よ" },
  { romaji: "ra", kana: "ら" },
  { romaji: "ri", kana: "り" },
  { romaji: "ru", kana: "る" },
  { romaji: "re", kana: "れ" },
  { romaji: "ro", kana: "ろ" },
  { romaji: "wa", kana: "わ" },
  { romaji: "wo", kana: "を" },
  { romaji: "n", kana: "ん" },
];

const katakanaData = [
  { romaji: "a", kana: "ア" },
  { romaji: "i", kana: "イ" },
  { romaji: "u", kana: "ウ" },
  { romaji: "e", kana: "エ" },
  { romaji: "o", kana: "オ" },
  { romaji: "ka", kana: "カ" },
  { romaji: "ki", kana: "キ" },
  { romaji: "ku", kana: "ク" },
  { romaji: "ke", kana: "ケ" },
  { romaji: "ko", kana: "コ" },
  { romaji: "sa", kana: "サ" },
  { romaji: "shi", kana: "シ" },
  { romaji: "su", kana: "ス" },
  { romaji: "se", kana: "セ" },
  { romaji: "so", kana: "ソ" },
  { romaji: "ta", kana: "タ" },
  { romaji: "chi", kana: "チ" },
  { romaji: "tsu", kana: "ツ" },
  { romaji: "te", kana: "テ" },
  { romaji: "to", kana: "ト" },
  { romaji: "na", kana: "ナ" },
  { romaji: "ni", kana: "ニ" },
  { romaji: "nu", kana: "ヌ" },
  { romaji: "ne", kana: "ネ" },
  { romaji: "no", kana: "ノ" },
  // { romaji: "ha", kana: "ハ" },
  // { romaji: "hi", kana: "ヒ" },
  // { romaji: "fu", kana: "フ" },
  // { romaji: "he", kana: "ヘ" },
  // { romaji: "ho", kana: "ホ" },
  // { romaji: "ma", kana: "マ" },
  // { romaji: "mi", kana: "ミ" },
  // { romaji: "mu", kana: "ム" },
  // { romaji: "me", kana: "メ" },
  // { romaji: "mo", kana: "モ" },
  // { romaji: "ya", kana: "ヤ" },
  // { romaji: "yu", kana: "ユ" },
  // { romaji: "yo", kana: "ヨ" },
  // { romaji: "ra", kana: "ラ" },
  // { romaji: "ri", kana: "リ" },
  // { romaji: "ru", kana: "ル" },
  // { romaji: "re", kana: "レ" },
  // { romaji: "ro", kana: "ロ" },
  // { romaji: "wa", kana: "ワ" },
  // { romaji: "wo", kana: "ヲ" },
  // { romaji: "n", kana: "ン" },
];

const mixedData = [...hiraganaData, ...katakanaData];

const gojuonLayout = [
  "n", "wa", "ra", "ya", "ma", "ha", "na", "ta", "sa", "ka", "a",
  null, null, "ri", null, "mi", "hi", "ni", "chi", "shi", "ki", "i",
  null, null, "ru", "yu", "mu", "fu", "nu", "tsu", "su", "ku", "u",
  null, null, "re", null, "me", "he", "ne", "te", "se", "ke", "e",
  null, "wo", "ro", "yo", "mo", "ho", "no", "to", "so", "ko", "o"
];

const learningModes = {
  hiragana: {
    label: "Hiragana",
    characters: hiraganaData,
  },
  katakana: {
    label: "Katakana",
    characters: katakanaData,
  },
  mixed: {
    label: "Hỗn hợp",
    characters: mixedData,
  },
};

const answerModes = {
  typing: "Gõ đáp án",
  multipleChoice: "Trắc nghiệm",
};

const shuffleItems = (items) => {
  const shuffledItems = [...items];

  for (let i = shuffledItems.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffledItems[i], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[i],
    ];
  }

  return shuffledItems;
};

const createMultipleChoiceOptions = (characters, correctRomaji) => {
  const distractors = [...new Set(characters.map((character) => character.romaji))]
    .filter((romaji) => romaji !== correctRomaji);

  return shuffleItems([
    correctRomaji,
    ...shuffleItems(distractors).slice(0, 3),
  ]);
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });
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
  const inputRef = useRef(null);
  const remainingCharacterIndexesRef = useRef([]);
  const advanceTimeoutRef = useRef(null);
  const feedbackTimeoutRef = useRef(null);
  const activeMode = learningModes[mode];
  const activeCharacters = activeMode.characters;

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

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

  let displayCharacters = activeCharacters;
  if (mode === "hiragana" || mode === "katakana") {
    const charMap = new Map(activeCharacters.map((c) => [c.romaji, c]));
    displayCharacters = gojuonLayout.map((romaji, index) => {
      if (!romaji) return { empty: true, id: `empty-${index}` };
      const char = charMap.get(romaji);
      return char ? { ...char, id: char.kana } : { empty: true, id: `missing-${romaji}` };
    });
  } else {
    displayCharacters = activeCharacters.map(c => ({ ...c, id: c.kana }));
  }

  return (
    <>
      <div className="ambient-background" />
      <div className="min-h-screen flex items-center justify-center p-4 selection:bg-amber-400/30 dark:selection:text-white text-slate-700 dark:text-slate-200">

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="cursor-pointer fixed top-6 right-6 z-50 group flex items-center justify-center w-12 h-12 rounded-full bg-white/60 dark:bg-black/40 border border-white dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-500 hover:scale-110 hover:bg-white/90 dark:hover:bg-black/60 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_25px_rgba(251,191,36,0.2)] dark:hover:border-white/30"
          aria-label="Toggle Theme"
        >
          <div className="relative flex items-center justify-center text-slate-700 dark:text-amber-300 transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110">
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </div>
        </button>
        <div className="w-full max-w-5xl mx-auto py-10 relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-slate-700 dark:text-white tracking-[0.15em] drop-shadow-2xl mb-3 uppercase">
              Học bảng chữ Nhật
            </h1>
            <p className="text-amber-500 dark:text-amber-200/70 text-sm font-bold tracking-[0.2em] uppercase">
              Cấp độ N5 - Bảng chữ cái
            </p>
          </div>

          {/* Mode Selector */}
          <div className="mx-auto mb-6 grid w-full max-w-xl gap-3 grid-cols-3">
            {Object.entries(learningModes).map(([modeKey, option]) => {
              const isActive = modeKey === mode;

              return (
                <button
                  key={modeKey}
                  type="button"
                  onClick={() => handleModeChange(modeKey)}
                  className={`cursor-pointer rounded-2xl border px-3 py-2 text-left shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${isActive
                    ? "border-amber-400/40 bg-white/80 dark:bg-white/10 text-amber-500 dark:text-white shadow-[0_0_20px_rgba(251,191,36,0.2)] dark:shadow-[0_0_20px_rgba(251,191,36,0.1)] ring-1 ring-amber-500/30 dark:ring-amber-400/30"
                    : "border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 bg-white/80 dark:bg-black/40 text-slate-500 dark:text-white/50 hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:hover:border-white/30 hover:bg-white/80 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-white"
                    }`}
                >
                  <span className="block text-sm uppercase tracking-widest font-black text-center">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Answer Mode Selector */}
          <div className="mx-auto mb-8 grid w-full max-w-md grid-cols-2 gap-3 rounded-[1.25rem] border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 bg-white/80 dark:bg-black/40 p-2 shadow-xl dark:shadow-2xl backdrop-blur-xl">
            {Object.entries(answerModes).map(([answerModeKey, label]) => {
              const isActive = answerModeKey === answerMode;

              return (
                <button
                  key={answerModeKey}
                  type="button"
                  onClick={() => setAnswerMode(answerModeKey)}
                  className={`cursor-pointer rounded-xl px-3 py-2 text-center text-xs font-black uppercase tracking-widest transition-all duration-300 ${isActive
                    ? "border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/20 bg-white/80 dark:bg-white/10 text-slate-700 dark:text-white shadow-lg"
                    : "border border-transparent text-slate-500 dark:text-white/50 hover:bg-white/80 backdrop-blur-xl dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-white"
                    }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Main Card */}
          <div className="mx-auto max-w-md glass-panel p-10 rounded-[2.5rem] relative overflow-hidden">
            <div className="absolute right-6 top-6 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-xl dark:bg-white/5 border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 px-4 py-2 text-xs font-bold tracking-wider text-amber-500 dark:text-amber-500 dark:text-amber-200/90 shadow-inner">
              ĐIỂM: {score}
            </div>

            <div className="flex flex-col items-center mt-10">
              {/* Character Display */}
              <div
                className={`text-[130px] leading-none font-black text-slate-700 dark:text-white mb-4 transition-all duration-300 ${status === "correct" ? "scale-110 text-amber-500 dark:text-amber-300 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)] dark:drop-shadow-[0_0_30px_rgba(251,191,36,0.6)]" : ""} ${status === "wrong" ? "animate-shake text-rose-500 dark:text-rose-400 drop-shadow-[0_0_30px_rgba(244,63,94,0.2)] dark:drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]" : ""}`}
                style={{ textShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
              >
                {currentCharacter?.kana || "あ"}
              </div>

              {/* Hint */}
              <div className="h-8 mb-8 flex items-center justify-center">
                {showHint ? (
                  <div className="text-2xl font-black text-amber-500 dark:text-amber-200/70 tracking-[0.2em] uppercase animate-pulse">
                    {currentCharacter?.romaji}
                  </div>
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
                    className={`w-full max-w-[260px] text-center text-4xl font-black py-4 px-6 rounded-2xl bg-white/70 dark:bg-black/40 text-slate-700 dark:text-white border shadow-inner placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 transition-all duration-300 ${status === "wrong"
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
                  <button
                    type="submit"
                    className="cursor-pointer mt-8 w-full max-w-[260px] rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/70 backdrop-blur-xl dark:bg-white/10 px-6 py-4 text-sm font-bold tracking-widest text-slate-700 dark:text-white shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 dark:hover:bg-white/20 hover:border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:border-white/30 active:translate-y-0 uppercase"
                  >
                    Kiểm tra
                  </button>
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
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleMultipleChoiceAnswer(option)}
                        disabled={status === "correct"}
                        className={`cursor-pointer rounded-2xl border px-5 py-5 text-2xl font-black tracking-widest uppercase shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 disabled:cursor-default disabled:hover:translate-y-0 ${shouldShowCorrect
                          ? "border-amber-400/50 bg-amber-100 dark:bg-amber-400/20 text-amber-500 dark:text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] dark:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                          : shouldShowWrong
                            ? "border-rose-500/50 bg-rose-100 dark:bg-rose-500/20 text-rose-500 dark:text-rose-300 shadow-[0_0_20px_rgba(225,29,72,0.2)] dark:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
                            : "border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/10 bg-white/70 dark:bg-black/40 text-slate-700 dark:text-white hover:border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:border-white/30 hover:bg-white/80 dark:hover:bg-white/10"
                          }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowCharacterTable((isShowing) => !isShowing)}
              className="cursor-pointer rounded-full border border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 bg-white/80 dark:bg-black/40 px-6 py-3 text-xs font-bold tracking-widest text-slate-600 dark:text-white/70 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:hover:border-white/30 hover:bg-white/80 dark:hover:bg-white/10 hover:text-slate-700 dark:hover:text-white uppercase"
              aria-expanded={showCharacterTable}
            >
              {showCharacterTable ? "Ẩn bảng chữ cái" : "Hiện bảng chữ cái"}
            </button>
          </div>

          {/* Character Table */}
          {showCharacterTable && (
            <div className="mt-8 rounded-[2.5rem] glass-panel p-8">
              <div className="mb-8 flex flex-col gap-2 text-slate-700 dark:text-white sm:flex-row sm:items-end sm:justify-between border-b border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:border-white/10 pb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-widest uppercase">
                    Bảng chữ {activeMode.label}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 dark:text-white/50 mt-2">
                    Các chữ đã xuất hiện trong một vòng sẽ không bị random lại cho
                    tới khi hết bảng.
                  </p>
                </div>
                <p className="text-xs font-bold tracking-widest text-amber-500 dark:text-amber-200/80 uppercase">
                  {activeCharacters.length} chữ
                </p>
              </div>

              <div className="overflow-x-auto pb-4">
                <div className={`grid gap-1 sm:gap-2 min-w-[600px] sm:min-w-0 ${mode === "mixed" ? "grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10" : "grid-cols-11 max-w-5xl mx-auto"}`}>
                  {displayCharacters.map((character) => {
                    if (character.empty) {
                      return <div key={character.id} className="col-span-1"></div>;
                    }

                    const isCurrentCharacter =
                      currentCharacter?.kana === character.kana;

                    return (
                      <div
                        key={character.id}
                        className={`rounded-2xl border p-2 sm:p-4 text-center transition-all duration-300 ${isCurrentCharacter
                          ? "border-amber-400/60 bg-amber-100 dark:bg-amber-400/20 text-amber-500 dark:text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.15)] scale-110 z-10 relative"
                          : "border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:border-white/5 bg-white/70 dark:bg-black/40 text-slate-700 dark:text-white/80 hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:hover:border-white/20 hover:bg-white/80 dark:hover:bg-white/5"
                          }`}
                      >
                        <div className="text-2xl sm:text-3xl font-black leading-none">
                          {character.kana}
                        </div>
                        <div
                          className={`mt-1 sm:mt-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase ${isCurrentCharacter ? "text-amber-500 dark:text-amber-200/90" : "text-slate-400 dark:text-white/40"}`}
                        >
                          {character.romaji}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Footer info */}
          <div className="mt-12 text-center text-slate-400 dark:text-slate-400 dark:text-white/40 text-xs font-medium tracking-widest uppercase flex flex-col gap-2">
            <p>
              {answerMode === "typing"
                ? 'Nhập rōmaji (VD: "ka", "ki") và nhấn Enter'
                : "Chọn đáp án rōmaji đúng"}
            </p>
            <p>
              &copy; {new Date().getFullYear()} Japanese Learning. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
