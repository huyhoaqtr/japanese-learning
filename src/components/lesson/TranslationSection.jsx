import SpeakButton from "../SpeakButton";

function TranslationSection({ translation }) {
  const { patterns, examples, dialogue, selfIntroExercise } = translation;

  return (
    <div className="flex flex-col gap-6">
      {patterns?.length > 0 && (
        <div className="glass-panel rounded-3xl p-5">
          <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-amber-500 dark:text-amber-300">
            Mẫu câu
          </h3>
          <ol className="list-decimal space-y-2 pl-5 text-sm font-medium text-slate-600 dark:text-white/70">
            {patterns.map((sentence, index) => (
              <li key={index}>{sentence}</li>
            ))}
          </ol>
        </div>
      )}

      {examples?.length > 0 && (
        <div className="glass-panel rounded-3xl p-5">
          <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-amber-500 dark:text-amber-300">
            Ví dụ
          </h3>
          <ol className="list-decimal space-y-4 pl-5 text-sm">
            {examples.map((example, index) => (
              <li key={index} className="space-y-1">
                <p className="font-bold text-slate-700 dark:text-white">{example.question}</p>
                {example.answer.split("\n").map((line, lineIndex) => (
                  <p key={lineIndex} className="font-medium text-slate-600 dark:text-white/70">
                    {line}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </div>
      )}

      {dialogue && (
        <div className="glass-panel rounded-3xl p-5">
          <h3 className="mb-1 text-xs font-black uppercase tracking-widest text-amber-500 dark:text-amber-300">
            Hội thoại
          </h3>
          <p className="mb-3 text-center text-sm font-bold text-slate-700 dark:text-white">
            {dialogue.title}
          </p>
          <div className="space-y-3">
            {dialogue.lines.map((line, index) => (
              <div key={index} className="flex gap-3 text-sm">
                <p className="w-20 flex-shrink-0 font-bold text-slate-700 dark:text-white">
                  {line.speaker}:
                </p>
                <div className="font-medium text-slate-600 dark:text-white/70">
                  {line.text.split("\n").map((part, partIndex) => (
                    <p key={partIndex}>{part}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selfIntroExercise && (
        <div className="glass-panel rounded-3xl p-5">
          <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-amber-500 dark:text-amber-300">
            Bài tập: Tự giới thiệu bản thân
          </h3>
          <p className="mb-3 text-sm font-medium text-slate-600 dark:text-white/70">
            {selfIntroExercise.instruction}
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-5 text-sm font-medium text-slate-600 dark:text-white/70">
            {selfIntroExercise.prompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>

          <div className="rounded-2xl bg-amber-400/10 p-4">
            <p className="mb-3 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white/40">
              Ví dụ trả lời
            </p>
            <div className="space-y-2">
              {selfIntroExercise.sampleAnswer.lines.map((line, index) => (
                <p key={index} className="flex flex-wrap items-center gap-1 text-sm">
                  <span className="font-bold text-slate-700 dark:text-white">{line.jp}</span>
                  <SpeakButton text={line.jp} />
                  <span className="font-medium text-slate-500 dark:text-white/50">{line.vi}</span>
                </p>
              ))}
            </div>
            {selfIntroExercise.sampleAnswer.note && (
              <p className="mt-3 text-xs italic text-slate-400 dark:text-white/40">
                {selfIntroExercise.sampleAnswer.note}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TranslationSection;
