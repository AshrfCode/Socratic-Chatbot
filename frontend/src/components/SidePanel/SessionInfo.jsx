import InfoCard from "./InfoCard";

function SessionInfo({ sessionInfo }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-md backdrop-blur-xl transition-colors sm:p-6 dark:border-white/5 dark:bg-[#1e2333]/80 dark:shadow-xl">
      <h2 className="mb-4 text-lg font-extrabold tracking-tight text-slate-900 sm:mb-5 sm:text-xl dark:text-white">
        Session Info
      </h2>

      {/* Mobile: 2 columns. Tablet: 4 columns. Desktop Sidebar: 1 column */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-1">
        <InfoCard title="Student" value={sessionInfo.userName || sessionInfo.studentName} />
        <InfoCard title="Group" value={sessionInfo.group} />
        <InfoCard title="Current Layer" value={sessionInfo.currentLayer} />
        <InfoCard title="Hints Used" value={sessionInfo.hintsUsed} />
      </div>
    </div>
  );
}

export default SessionInfo;