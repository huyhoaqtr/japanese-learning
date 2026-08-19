import SpeakButton from "../SpeakButton";

function GrammarSection({ grammar }) {
  return (
    <div className="flex flex-col gap-4">
      {grammar.map((point) => (
        <div key={point.number} className="glass-panel rounded-3xl p-5">
          <div className="mb-3 flex items-baseline gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-xs font-black text-amber-500 dark:text-amber-300">
              {point.number}
            </span>
            <p className="text-sm font-bold text-slate-700 dark:text-white">{point.pattern}</p>
          </div>
          <div className="space-y-4 pl-9">
            {point.sections.map((section, index) => (
              <div key={index}>
                {section.subtitle && (
                  <p className="mb-1 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white/40">
                    {section.subtitle}
                  </p>
                )}
                <p className="text-sm font-medium text-slate-600 dark:text-white/70">{section.body}</p>
                {section.examples?.length > 0 && (
                  <div className="mt-2 space-y-1 rounded-2xl bg-amber-400/10 p-3">
                    {section.examples.map((example, exampleIndex) => (
                      <p key={exampleIndex} className="flex flex-wrap items-center gap-1 text-sm">
                        <span className="font-bold text-slate-700 dark:text-white">{example.jp}</span>
                        <SpeakButton text={example.jp} />{" "}
                        <span className="font-medium text-slate-500 dark:text-white/50">{example.vi}</span>
                      </p>
                    ))}
                  </div>
                )}
                {section.note && (
                  <p className="mt-2 text-xs italic text-slate-400 dark:text-white/40">
                    [Chú ý] {section.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GrammarSection;
