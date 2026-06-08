function DashboardHeader() {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <p className="text-sm font-semibold text-purple-300">
          Research Monitoring Panel
        </p>

        <h2 className="mt-1 text-2xl font-extrabold text-white">
          Live Student Progress Dashboard
        </h2>

        <p className="mt-2 text-sm text-slate-300">
          Fake data preview for researchers to monitor progress, hints and
          session status.
        </p>
      </div>

      <div className="rounded-2xl border border-purple-400/30 bg-purple-400/10 px-5 py-3 text-sm font-bold text-purple-200">
        Experimental Demo
      </div>
    </div>
  );
}

export default DashboardHeader;