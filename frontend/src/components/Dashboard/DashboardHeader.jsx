function DashboardHeader() {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4 transition-colors sm:mb-8 sm:pb-5 dark:border-white/5">
      <div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500"></span>
          </span>
          <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600 sm:text-xs dark:text-purple-400">
            Research Monitoring Panel
          </p>
        </div>

        <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          Live Student Progress Dashboard
        </h2>

        <p className="mt-1 text-xs text-slate-500 sm:mt-2 sm:text-sm dark:text-slate-400">
          Monitoring active sessions and questionnaire data in real-time.
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;