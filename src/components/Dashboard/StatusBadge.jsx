function StatusBadge({ status }) {
  const style =
    status === "Completed"
      ? "bg-green-500/20 text-green-200"
      : status === "Needs Support"
      ? "bg-yellow-500/20 text-yellow-200"
      : "bg-blue-500/20 text-blue-200";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default StatusBadge;