function StatusBadge({ status }) {
  let style = "border-blue-400/30 bg-blue-400/10 text-blue-200";

  if (status === "Completed") {
    style = "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  }

  if (status === "Needs Support") {
    style = "border-amber-400/30 bg-amber-400/10 text-amber-200";
  }

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${style}`}>
      {status}
    </span>
  );
}

export default StatusBadge;