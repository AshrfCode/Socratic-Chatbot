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
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl">
      <h2 className="mb-4 text-xl font-bold text-white">
        Layer Progression
      </h2>

      <div className="grid gap-3 md:grid-cols-4">
        {layers.map((layer, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={layer.name}
              className={`rounded-2xl p-4 text-white ${
                isCurrent
                  ? "bg-purple-600"
                  : isCompleted
                  ? "bg-green-600"
                  : "bg-slate-800"
              }`}
            >
              <p className="font-bold">{layer.name}</p>

              {layer.description && (
                <p className="mt-2 text-xs text-slate-200">
                  {layer.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;