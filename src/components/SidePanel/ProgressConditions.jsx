function ProgressConditions({ sessionInfo }) {
  const gates = sessionInfo.unlockedGates || [];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl">
      <h2 className="mb-4 text-xl font-bold">Unlocked Gates</h2>

      {gates.length === 0 ? (
        <p className="text-sm text-slate-300">
          No gates unlocked yet. Start by defining the system goal.
        </p>
      ) : (
        <ul className="space-y-2">
          {gates.map((gate) => (
            <li
              key={gate}
              className="rounded-xl bg-green-500/20 px-3 py-2 text-sm text-green-100"
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