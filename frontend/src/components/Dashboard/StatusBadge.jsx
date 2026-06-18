function StatusBadge({ status }) {
  // Determine styles based on status. Fallback to blue.
  const baseStyle = "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md";
  
  let colorStyle = "border-blue-500/30 bg-blue-500/10 text-blue-300"; // Active / Default
  
  if (status?.toLowerCase() === "completed") {
    colorStyle = "border-green-500/30 bg-green-500/10 text-green-300";
  } else if (status?.toLowerCase() === "needs support") {
    colorStyle = "border-yellow-500/30 bg-yellow-500/10 text-yellow-300";
  }

  return (
    <span className={`${baseStyle} ${colorStyle}`}>
      {status || "Active"}
    </span>
  );
}

export default StatusBadge;