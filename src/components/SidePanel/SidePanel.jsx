import SessionInfo from "./SessionInfo";
import ProgressConditions from "./ProgressConditions";
import { useSession } from "../../Context/SessionContext";

function SidePanel() {
  const { sessionInfo } = useSession();

  if (!sessionInfo) {
    return <p className="text-slate-300">Loading session...</p>;
  }

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
        <SessionInfo sessionInfo={sessionInfo} />

           <ProgressConditions />
      </div>
    </section>
  );
}

export default SidePanel;