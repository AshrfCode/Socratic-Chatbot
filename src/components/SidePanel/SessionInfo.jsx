import InfoCard from "./InfoCard";
import { useSession } from "../../Context/SessionContext";

function SessionInfo() {
  const { sessionInfo } = useSession();

  if (!sessionInfo) return null;

  return (
    <>
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
    </>
  );
}

export default SessionInfo;