function StatusBadge({ status }) {
  // Determine styles based on status. Fallback to blue.
  const baseStyle = "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md transition-colors";
  
  // Light mode default: Blue | Dark mode default: Blue
  let colorStyle = "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"; 
  
  if (status?.toLowerCase() === "completed") {
    colorStyle = "border-green-200 bg-green-50 text-green-700 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-300";
  } else if (status?.toLowerCase() === "needs support") {
    colorStyle = "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-300";
  }

  return (
    <span className={`${baseStyle} ${colorStyle}`}>
      {status || "Active"}
    </span>
  );
}

export default StatusBadge;