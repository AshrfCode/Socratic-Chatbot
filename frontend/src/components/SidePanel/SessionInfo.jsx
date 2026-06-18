import InfoCard from "./InfoCard";

function SessionInfo({ sessionInfo }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#1e2333]/80 p-6 shadow-xl backdrop-blur-xl">
      <h2 className="mb-5 text-xl font-extrabold tracking-tight text-white">
        Session Info
      </h2>

      <div className="grid gap-3">
        {/* Removed the CountdownTimer from here completely */}
        <InfoCard title="Student" value={sessionInfo.userName || sessionInfo.studentName} />
        <InfoCard title="Group" value={sessionInfo.group} />
        <InfoCard title="Current Layer" value={sessionInfo.currentLayer} />
        <InfoCard title="Hints Used" value={sessionInfo.hintsUsed} />
      </div>
    </div>
  );
}

export default SessionInfo;