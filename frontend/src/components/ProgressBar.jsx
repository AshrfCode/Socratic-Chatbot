import { useEffect, useState } from "react";
import { getLayers } from "../services/layerService";
import { useSession } from "../Context/SessionContext";

function ProgressBar() {
  const { sessionInfo } = useSession();

  const [layers, setLayers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLayers() {
      try {
        const data = await getLayers();
        setLayers(data);
      } catch {
        setError("Failed to load layers.");
      }
    }

    loadLayers();
  }, []);

  const currentLayer = sessionInfo?.currentLayer;

  const currentIndex = layers.findIndex(
    (layer) => layer.name === currentLayer
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-md backdrop-blur-xl transition-colors sm:p-5 dark:border-white/5 dark:bg-[#1e2333]/80 dark:shadow-xl">
      <h2 className="mb-3 text-lg font-bold text-slate-900 sm:mb-4 sm:text-xl dark:text-white">
        Layer Progression
      </h2>

      {/* 
        THE FIX: 
        Mobile -> flex row, overflows horizontally so users can swipe. 
        Desktop (md) -> snaps back to the 4-column grid.
      */}
      <div className="flex w-full snap-x snap-mandatory gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
        {layers.map((layer, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={layer.name}
              className={`min-w-[160px] flex-shrink-0 snap-start rounded-xl p-3 transition-colors sm:p-4 md:min-w-0 ${
                isCurrent
                  ? "bg-purple-600 text-white shadow-md dark:bg-purple-600/90"
                  : isCompleted
                  ? "bg-emerald-500 text-white shadow-md dark:bg-emerald-600/90"
                  : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              <p className={`text-sm font-bold sm:text-base ${isCurrent || isCompleted ? "text-white" : "text-slate-800 dark:text-slate-200"}`}>
                {layer.name}
              </p>

              {layer.description && (
                <p className={`mt-1 text-[10px] sm:mt-2 sm:text-xs ${isCurrent || isCompleted ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
                  {layer.description}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

export default ProgressBar;