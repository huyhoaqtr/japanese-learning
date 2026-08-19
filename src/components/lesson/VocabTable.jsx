import SpeakButton from "../SpeakButton";

function VocabTable({ items }) {
  return (
    <div className="glass-panel rounded-3xl p-5 divide-y divide-slate-200/70 dark:divide-white/10">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:gap-6">
          <div className="sm:w-56 flex-shrink-0">
            <p className="flex items-center gap-1 text-base font-bold text-slate-700 dark:text-white">
              {item.kana}
              <SpeakButton text={item.kana} />
            </p>
            {item.kanji && (
              <p className="text-xs font-medium text-slate-400 dark:text-white/40">{item.kanji}</p>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-600 dark:text-white/70">{item.meaning}</p>
            {item.note && (
              <p className="mt-1 text-xs text-slate-400 dark:text-white/40">{item.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default VocabTable;
