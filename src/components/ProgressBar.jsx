import { layers } from "../data/fakeData";

function ProgressBar() {
  const currentStep = 1;

  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-white">Four-Layer Progression</h2>

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