import { useSession } from "../../Context/SessionContext";
import SessionInfo from "./SessionInfo";
import ProgressConditions from "./ProgressConditions";
import InfoCard from "./InfoCard";

/*
  SidePanel consumes SessionContext.
  It acts as the "Smart Container" following the Braude architecture.
*/

function SidePanel() {
  const { sessionInfo, loading, error, updateSessionStatus } = useSession();

  if (loading) {
    return (
      <aside className="w-full space-y-4 text-white">
        <InfoCard title="Session" value="Loading..." />
      </aside>
    );
  }

  if (error || !sessionInfo) {
    return (
      <aside className="w-full space-y-4 text-white">
        <InfoCard title="Error" value="Session data unavailable" />
      </aside>
    );
  }

  // --- TIMER LOGIC HOUSED IN THE SMART COMPONENT ---
  function handleTimerReminder(message) {
    // We will hook this up to your chat log later!
    console.log("System Reminder:", message);
  }

  function handleTimeUp() {
    console.log("Time is up! Transitioning session status.");
    // This will force the App.jsx to render the PostTaskSurvey
    if (updateSessionStatus) {
      updateSessionStatus("completed");
    }
  }

  return (
    <aside className="w-full space-y-4 text-white">
      {/* Pass the logic down as props to the presentational component */}
      <SessionInfo 
        sessionInfo={sessionInfo} 
        onTimeUp={handleTimeUp}
        onReminder={handleTimerReminder}
      />
      <ProgressConditions sessionInfo={sessionInfo} />
    </aside>
  );
}

export default SidePanel;