import StatusBadge from "./StatusBadge";

function StudentCard({ student, onViewAnalytics, onViewChat }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-[#2a2f42]/40 p-5 transition-all hover:-translate-y-1 hover:border-purple-500/30 hover:bg-[#2a2f42]/60 hover:shadow-xl hover:shadow-purple-500/10">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">
              {student.studentName}
            </h3>
            <p className="text-xs font-medium text-purple-400">
              {student.group}
            </p>
          </div>
          <StatusBadge status={student.status} />
        </div>

        <div className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between rounded-lg bg-black/20 p-2.5">
            <span className="text-slate-400">Current Layer:</span>
            <span className="font-semibold text-white">{student.currentLayer || "N/A"}</span>
          </div>

          <div className="flex justify-between rounded-lg bg-black/20 p-2.5">
            <span className="text-slate-400">Hints Used:</span>
            <span className="font-semibold text-white">{student.hintsUsed || 0}</span>
          </div>

          <div className="pt-2">
            <div className="mb-1.5 flex justify-between text-xs font-medium text-slate-300">
              <span>Overall Progress</span>
              <span>{student.progress || 0}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${student.progress || 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2 xl:flex-row">
        <button 
          onClick={() => onViewAnalytics(student)}
          className="flex-1 rounded-xl bg-purple-600/20 py-2.5 text-sm font-semibold text-purple-300 transition-colors hover:bg-purple-600 hover:text-white"
        >
          📊 Analytics
        </button>
        <button 
          onClick={() => onViewChat(student)}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-indigo-600 hover:border-transparent hover:text-white"
        >
          💬 Chat Log
        </button>
      </div>
    </div>
  );
}

export default StudentCard;