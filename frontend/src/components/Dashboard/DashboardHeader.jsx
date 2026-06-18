function DashboardHeader() {
  return (
    <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-5">
      <div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500"></span>
          </span>
          <p className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Research Monitoring Panel
          </p>
        </div>

        <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white">
          Live Student Progress Dashboard
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Monitoring active sessions and questionnaire data in real-time.
        </p>
      </div>
    </div>
  );
}

export default DashboardHeader;