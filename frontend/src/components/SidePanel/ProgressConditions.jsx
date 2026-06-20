function ProgressConditions({ sessionInfo }) {
  const gates = sessionInfo.unlockedGates || [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-md backdrop-blur-xl transition-colors sm:p-5 dark:border-white/10 dark:bg-[#1e2333]/80 dark:shadow-xl">
      <h2 className="mb-3 text-lg font-bold text-slate-900 sm:mb-4 sm:text-xl dark:text-white">
        Unlocked Gates
      </h2>

      {gates.length === 0 ? (
        <p className="text-xs text-slate-500 sm:text-sm dark:text-slate-400">
          No gates unlocked yet. Start by defining the system goal.
        </p>
      ) : (
        /* Mobile: horizontal flex-wrap pills. Desktop: vertical list */
        <ul className="flex flex-wrap gap-2 lg:flex-col lg:space-y-1">
          {gates.map((gate) => (
            <li
              key={gate}
              className="rounded-lg bg-green-100 px-2.5 py-1.5 text-xs font-medium text-green-700 sm:px-3 sm:py-2 sm:text-sm dark:bg-green-500/20 dark:text-green-200"
            >
              ✓ {gate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProgressConditions;