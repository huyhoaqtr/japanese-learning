import SpeakButton from "../SpeakButton";

function PhraseList({ title, items }) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      {title && (
        <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-amber-500 dark:text-amber-300">
          {title}
        </h3>
      )}
      <div className="divide-y divide-slate-200/70 dark:divide-white/10">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:gap-6">
            <p className="flex items-center gap-1 sm:w-56 flex-shrink-0 text-base font-bold text-slate-700 dark:text-white">
              {item.jp}
              <SpeakButton text={item.jp} />
            </p>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-white/70">{item.vi}</p>
              {item.note && (
                <p className="mt-1 text-xs text-slate-400 dark:text-white/40">{item.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhraseList;
