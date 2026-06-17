import { useSession } from "../../Context/SessionContext";
import SessionInfo from "./SessionInfo";
import ProgressConditions from "./ProgressConditions";
import InfoCard from "./InfoCard";

/*
  SidePanel consumes SessionContext.

  It updates automatically when:
  - hintsUsed changes
  - currentLayer changes
  - unlockedGates changes
*/

function SidePanel() {
  const { sessionInfo, loading, error } = useSession();

  if (loading) {
    return <InfoCard title="Session" value="Loading..." />;
  }

  if (error || !sessionInfo) {
    return <InfoCard title="Error" value="Session data unavailable" />;
  }

  return (
  <aside className="space-y-4 text-white">
    <SessionInfo sessionInfo={sessionInfo} />
    <ProgressConditions sessionInfo={sessionInfo} />
  </aside>
);
}

export default SidePanel;