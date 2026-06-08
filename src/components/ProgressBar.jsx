import { useEffect, useState } from "react";
import { getLayers } from "../services/layerService";

function ProgressBar() {
  const currentStep = 1;
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    async function loadLayers() {
      try {
        const data = await getLayers();
        setLayers(data);
      } catch (error) {
        console.error("Failed to load layers", error);
      }
    }

    loadLayers();
  }, []);

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-white">
        Four-Layer Progression
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {layers.map((layer, index) => (
          <div
            key={layer}
            className={`p-4 rounded-xl border text-center ${
              index < currentStep
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-50 text-gray-600 border-gray-200"
            }`}
          >
            <p className="font-semibold">{layer}</p>
            <p className="text-sm mt-1">
              {index < currentStep ? "Unlocked" : "Locked"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProgressBar;