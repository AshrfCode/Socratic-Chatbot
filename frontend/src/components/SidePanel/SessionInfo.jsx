import InfoCard from "./InfoCard";

function SessionInfo({ sessionInfo }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/10 p-5 shadow-xl">
      <h2 className="mb-4 text-xl font-bold">Session Info</h2>

      <div className="grid gap-3">
        <InfoCard title="Student" value={sessionInfo.userName} />
        <InfoCard title="Group" value={sessionInfo.group} />
        <InfoCard title="Current Layer" value={sessionInfo.currentLayer} />
        <InfoCard title="Remaining Time" value={sessionInfo.remainingTime} />
        <InfoCard title="Hints Used" value={sessionInfo.hintsUsed} />
      </div>
    </div>
  );
}

export default SessionInfo;