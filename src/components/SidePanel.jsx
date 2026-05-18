import { sessionInfo } from "../data/fakeData";

function SidePanel() {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold tracking-wide text-cyan-300">
          Live Monitoring
        </p>

        <h2 className="mt-2 text-2xl font-extrabold text-white">
          Session Control Panel
        </h2>

        <p className="mt-2 text-sm text-slate-300">
          Real-time overview of the student&apos;s current learning session.
        </p>
      </div>

      <div className="space-y-4">
        <InfoCard
          icon="👤"
          label="User"
          value={sessionInfo.userName}
        />

        <InfoCard
          icon="🧪"
          label="Group"
          value={sessionInfo.group}
        />

        <InfoCard
          icon="🧠"
          label="Current Layer"
          value={sessionInfo.currentLayer}
        />

        <InfoCard
          icon="⏳"
          label="Remaining Time"
          value={sessionInfo.remainingTime}
        />

        <InfoCard
          icon="💡"
          label="Hints Used"
          value={sessionInfo.hintsUsed}
        />

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-400 to-cyan-400 text-xl">
              🔓
            </div>

            <div>
              <p className="text-sm text-slate-400">
                Unlocked Gates
              </p>

              <h3 className="font-bold text-white">
                Progress Conditions
              </h3>
            </div>
          </div>

          <ul className="space-y-3">
            {sessionInfo.unlockedGates.map((gate) => (
              <li
                key={gate}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3"
              >
                <span className="h-3 w-3 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/50"></span>

                <span className="text-sm font-medium text-slate-100">
                  {gate}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-cyan-300/40 hover:bg-white/10">
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl"></div>

      <div className="relative z-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-400 to-blue-500 text-2xl shadow-lg">
          {icon}
        </div>

        <div>
          <p className="text-sm text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-lg font-bold text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SidePanel;