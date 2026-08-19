function TranslationSection({ translation }) {
  const { patterns, examples, dialogue } = translation;

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
    </div>
  );
}

export default TranslationSection;
