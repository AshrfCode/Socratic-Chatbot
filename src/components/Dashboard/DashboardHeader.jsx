function DashboardHeader() {
  return (
    <div className="mb-5">
      <p className="text-sm font-semibold text-purple-300">
        Research Monitoring Panel
      </p>

      <h2 className="mt-1 text-2xl font-extrabold text-white">
        Live Student Progress Dashboard
      </h2>

      <p className="mt-2 text-sm text-slate-300">
        Data is loaded from MongoDB through backend REST APIs.
      </p>
    </div>
  );
}

export default DashboardHeader;