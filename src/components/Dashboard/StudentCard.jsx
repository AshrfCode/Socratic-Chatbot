import StatusBadge from "./StatusBadge";


function StudentCard({ student }) {
  const progress = getProgress(student.layer);

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/50 p-5 shadow-xl transition hover:-translate-y-1 hover:border-blue-300/50 hover:bg-slate-900/70">
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/20 blur-2xl transition group-hover:bg-purple-500/30"></div>

      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-500 text-xl font-black text-white shadow-lg">
              {student.name.split(" ")[1]}
            </div>

            <div>
              <h3 className="font-bold text-white">
                {student.name}
              </h3>

              <p className="text-xs text-slate-400">
                Active learning session
              </p>
            </div>
          </div>

          <StatusBadge status={student.status} />
        </div>

        <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-slate-400">Current Layer</p>

          <p className="mt-1 text-lg font-bold text-blue-200">
            {student.layer}
          </p>
        </div>

        <div className="mb-4">
          <div className="mb-2 flex justify-between text-xs text-slate-400">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-blue-400 to-purple-400"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400">Hints Used</p>

            <p className="mt-1 text-2xl font-black text-amber-300">
              {student.hints}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-400">Log Status</p>

            <p className="mt-2 text-sm font-bold text-emerald-300">
              Saved
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function getProgress(layer) {
  if (layer === "Broad Context") return 25;
  if (layer === "Structure") return 50;
  if (layer === "Dynamics") return 75;
  if (layer === "Evaluation") return 100;
  return 0;
}

export default StudentCard;