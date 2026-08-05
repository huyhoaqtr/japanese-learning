import { useState, useEffect, useRef } from 'react';
import './App.css';

const hiraganaData = [
  { romaji: 'a', kana: 'あ' }, { romaji: 'i', kana: 'い' }, { romaji: 'u', kana: 'う' }, { romaji: 'e', kana: 'え' }, { romaji: 'o', kana: 'お' },
  { romaji: 'ka', kana: 'か' }, { romaji: 'ki', kana: 'き' }, { romaji: 'ku', kana: 'く' }, { romaji: 'ke', kana: 'け' }, { romaji: 'ko', kana: 'こ' },
  { romaji: 'sa', kana: 'さ' }, { romaji: 'shi', kana: 'し' }, { romaji: 'su', kana: 'す' }, { romaji: 'se', kana: 'せ' }, { romaji: 'so', kana: 'そ' },
  { romaji: 'ta', kana: 'た' }, { romaji: 'chi', kana: 'ち' }, { romaji: 'tsu', kana: 'つ' }, { romaji: 'te', kana: 'て' }, { romaji: 'to', kana: 'と' },
  { romaji: 'na', kana: 'な' }, { romaji: 'ni', kana: 'に' }, { romaji: 'nu', kana: 'ぬ' }, { romaji: 'ne', kana: 'ね' }, { romaji: 'no', kana: 'の' },
  { romaji: 'ha', kana: 'は' }, { romaji: 'hi', kana: 'ひ' }, { romaji: 'fu', kana: 'ふ' }, { romaji: 'he', kana: 'へ' }, { romaji: 'ho', kana: 'ほ' },
  { romaji: 'ma', kana: 'ま' }, { romaji: 'mi', kana: 'み' }, { romaji: 'mu', kana: 'む' }, { romaji: 'me', kana: 'め' }, { romaji: 'mo', kana: 'も' },
  { romaji: 'ya', kana: 'や' }, { romaji: 'yu', kana: 'ゆ' }, { romaji: 'yo', kana: 'よ' },
  { romaji: 'ra', kana: 'ら' }, { romaji: 'ri', kana: 'り' }, { romaji: 'ru', kana: 'る' }, { romaji: 're', kana: 'れ' }, { romaji: 'ro', kana: 'ろ' },
  { romaji: 'wa', kana: 'わ' }, { romaji: 'wo', kana: 'を' }, { romaji: 'n', kana: 'ん' }
];

function App() {
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState('idle'); // idle, correct, wrong
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef(null);
  const bagRef = useRef([]);

  useEffect(() => {
    pickRandomCharacter();
  }, []);

  const pickRandomCharacter = () => {
    if (hiraganaData.length === 0) return;

    if (bagRef.current.length === 0) {
      // Tạo một túi mới chứa tất cả các index
      let newBag = hiraganaData.map((_, i) => i);
      // Trộn túi (Fisher-Yates shuffle)
      for (let i = newBag.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newBag[i], newBag[j]] = [newBag[j], newBag[i]];
      }

      // Nếu phần tử sẽ được pop ra đầu tiên bị trùng với chữ hiện tại, tráo đổi nó
      if (currentCharacter && newBag.length > 1 && hiraganaData[newBag[newBag.length - 1]].romaji === currentCharacter.romaji) {
        const swapIndex = Math.floor(Math.random() * (newBag.length - 1));
        [newBag[newBag.length - 1], newBag[swapIndex]] = [newBag[swapIndex], newBag[newBag.length - 1]];
      }

      bagRef.current = newBag;
    }

    const nextIndex = bagRef.current.pop();
    setCurrentCharacter(hiraganaData[nextIndex]);
    setShowHint(false);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || !currentCharacter) return;

    if (input.trim() === currentCharacter.romaji) {
      setStatus('correct');
      setScore(s => s + 1);
      setTimeout(() => {
        pickRandomCharacter();
        setInput('');
        setStatus('idle');
        inputRef.current?.focus();
      }, 500);
    } else {
      setStatus('wrong');
      setTimeout(() => {
        setStatus('idle');
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 selection:bg-pink-300 selection:text-pink-900">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-sm mb-2">
            Học Hiragana
          </h1>
          <p className="text-indigo-100 text-lg font-medium">Cấp độ N5 - Bảng chữ cái</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="flex flex-col items-center mt-6">
            {/* Character Display */}
            <div
              className={`text-[120px] leading-none font-bold text-white mb-2 transition-transform duration-300 ${status === 'correct' ? 'scale-110 text-green-300' : ''} ${status === 'wrong' ? 'animate-shake text-red-300' : ''}`}
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
            >
              {currentCharacter?.kana || 'あ'}
            </div>

            {/* Hint */}
            <div className="h-8 mb-6 flex items-center justify-center">
              {showHint ? (
                <div className="text-2xl font-bold text-pink-200 tracking-widest animate-pulse">
                  {currentCharacter?.romaji}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="text-sm font-medium text-white/50 hover:text-white/90 transition-colors underline decoration-dotted underline-offset-4"
                  tabIndex="-1"
                >
                  Quên cách đọc?
                </button>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                className={`w-full max-w-[240px] text-center text-3xl font-bold py-3 px-6 rounded-2xl bg-white/90 text-slate-800 shadow-inner focus:outline-none focus:ring-4 transition-all ${status === 'wrong' ? 'focus:ring-red-400 border-red-400' :
                  status === 'correct' ? 'focus:ring-green-400 border-green-400' :
                    'focus:ring-pink-400 border-transparent'
                  }`}
                placeholder="Cách đọc..."
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
              <button
                type="submit"
                className="mt-6 w-full max-w-[240px] bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform transition hover:-translate-y-1 active:translate-y-0"
              >
                Kiểm tra
              </button>
            </form>

          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-white/70 text-sm flex flex-col gap-1">
          <p>Nhập cách đọc romaji (VD: "ka", "ki") và nhấn Enter</p>
          <p>&copy; {new Date().getFullYear()} Japanese Learning. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
