import StatusBadge from "./StatusBadge";

function StudentCard({ student }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 text-white shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">
            {student.studentName}
          </h3>

          <p className="text-sm text-slate-300">
            {student.group}
          </p>
        </div>

        <StatusBadge status={student.status} />
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-100">
        <p>
          <span className="text-slate-400">Current Layer:</span>{" "}
          <span className="text-white">{student.currentLayer}</span>
        </p>

        <p>
          <span className="text-slate-400">Hints Used:</span>{" "}
          <span className="text-white">{student.hintsUsed}</span>
        </p>

        <div>
          <div className="mb-1 flex justify-between text-xs text-slate-300">
            <span>Progress</span>
            <span>{student.progress}%</span>
          </div>

          <div className="h-3 rounded-full bg-slate-700">
            <div
              className="h-3 rounded-full bg-purple-500"
              style={{ width: `${student.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCard;