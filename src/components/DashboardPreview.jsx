import { dashboardData } from "../data/fakeData";

function DashboardPreview() {
  return (
    <section className="mt-6 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold text-purple-300">
            Research Monitoring Panel
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-white">
            Live Student Progress Dashboard
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Fake data preview for researchers to monitor progress, hints and session status.
          </p>
        </div>

        <div className="rounded-2xl border border-purple-400/30 bg-purple-400/10 px-5 py-3 text-sm font-bold text-purple-200">
          Experimental Demo
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {dashboardData.map((student) => (
          <StudentCard key={student.name} student={student} />
        ))}
      </div>
    </section>
  );
}

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
              <h3 className="font-bold text-white">{student.name}</h3>
              <p className="text-xs text-slate-400">Active learning session</p>
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

function StatusBadge({ status }) {
  let style = "border-blue-400/30 bg-blue-400/10 text-blue-200";

  if (status === "Completed") {
    style = "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  }

  if (status === "Needs Support") {
    style = "border-amber-400/30 bg-amber-400/10 text-amber-200";
  }

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

function getProgress(layer) {
  if (layer === "Broad Context") return 25;
  if (layer === "Structure") return 50;
  if (layer === "Dynamics") return 75;
  if (layer === "Evaluation") return 100;
  return 0;
}

export default DashboardPreview;