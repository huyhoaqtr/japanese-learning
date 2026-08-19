function ReferenceTable({ table }) {
  return (
    <div className="glass-panel rounded-3xl p-5">
      <h3 className="mb-3 text-xs font-black uppercase tracking-widest text-amber-500 dark:text-amber-300">
        {table.title}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/70 dark:border-white/10">
              {table.columns.map((column) => (
                <th
                  key={column}
                  className="py-2 pr-4 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white/40"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 dark:divide-white/10">
            {table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2 pr-4 font-medium text-slate-600 dark:text-white/70">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReferenceTable;
