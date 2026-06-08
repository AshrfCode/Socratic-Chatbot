import { useSession } from "../../Context/SessionContext";

const layers = ["Broad Context", "Structure", "Dynamics", "Evaluation"];

function ProgressConditions() {
  const { sessionInfo, goToNextLayer, progressError } = useSession();

  if (!sessionInfo) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
        Loading progress...
      </div>
    );
  }

  const currentIndex = layers.indexOf(sessionInfo.currentLayer);
  const nextLayer = layers[currentIndex + 1];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-semibold text-purple-300">
        Progress Conditions
      </p>

      <div className="mt-4 space-y-3">
        {layers.map((layer, index) => {
          const isCurrent = layer === sessionInfo.currentLayer;
          const isDone = index < currentIndex;

          return (
            <div
              key={layer}
              className={`rounded-xl border p-3 text-sm ${
                isCurrent
                  ? "border-blue-400/60 bg-blue-500/20 text-blue-100"
                  : isDone
                  ? "border-green-400/40 bg-green-500/10 text-green-200"
                  : "border-white/10 bg-slate-900/60 text-slate-400"
              }`}
            >
              {isDone && "✅ "}
              {isCurrent && "🔵 "}
              {!isDone && !isCurrent && "⚪ "}
              {layer}
            </div>
          );
        })}
      </div>

      {progressError && (
        <p className="mt-3 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200">
          {progressError}
        </p>
      )}

      <button
        onClick={goToNextLayer}
        disabled={!nextLayer}
        className="mt-4 w-full rounded-xl bg-blue-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-600"
      >
        {nextLayer ? "Check requirements and continue" : "All layers completed"}
      </button>
    </div>
  );
}

export default ProgressConditions;