const isSupported = typeof window !== "undefined" && "speechSynthesis" in window;

let cachedVoices = [];

function refreshVoices() {
  cachedVoices = window.speechSynthesis.getVoices();
}

if (isSupported) {
  refreshVoices();
  window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
}

// Ưu tiên đúng 1 giọng cụ thể theo tên, để cùng 1 trình duyệt/OS luôn phát ra
// cùng 1 giọng giữa các lần gọi. Không thể đồng nhất tuyệt đối giữa các thiết bị
// khác OS (điện thoại vs laptop) vì mỗi nền tảng chỉ có sẵn những giọng riêng của nó.
const PREFERRED_VOICE_NAMES = ["Google 日本語"];

function pickJapaneseVoice() {
  const voices = cachedVoices.filter((voice) => voice.lang?.toLowerCase().startsWith("ja"));

  if (voices.length === 0) return null;

  for (const preferredName of PREFERRED_VOICE_NAMES) {
    const match = voices.find((voice) => voice.name === preferredName);
    if (match) return match;
  }

  return voices[0];
}

export function useSpeak() {
  const speak = (text) => {
    if (!isSupported || !text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    utterance.rate = 0.85;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = pickJapaneseVoice();
    if (voice) utterance.voice = voice;

    window.speechSynthesis.speak(utterance);
  };

  return { speak, isSupported };
}
