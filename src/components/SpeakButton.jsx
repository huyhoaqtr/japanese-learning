import { Volume2 } from "lucide-react";
import { useSpeak } from "../hooks/useSpeak";

function SpeakButton({ text, className = "", size = "h-4 w-4" }) {
  const { speak, isSupported } = useSpeak();

  if (!isSupported) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        speak(text);
      }}
      aria-label={`Nghe phát âm: ${text}`}
      className={`inline-flex flex-shrink-0 items-center justify-center rounded-full p-1.5 text-slate-400 transition-colors duration-200 hover:bg-amber-400/20 hover:text-amber-500 dark:text-white/40 dark:hover:text-amber-300 ${className}`}
    >
      <Volume2 className={size} />
    </button>
  );
}

export default SpeakButton;
