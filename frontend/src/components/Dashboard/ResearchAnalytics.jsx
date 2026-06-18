import { useEffect, useState } from "react";
import { getResearchAnalytics } from "../../services/dashboardService";
import { useSession } from "../../Context/SessionContext";

function ResearchAnalytics() {
  const { dashboardVersion } = useSession();
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function loadAnalytics() {
      const data = await getResearchAnalytics();
      setAnalytics(data);
    }
    loadAnalytics();
  }, [dashboardVersion]);

  if (!analytics) return null;

  const StatCard = ({ title, value, highlight = false }) => (
    <div className={`relative overflow-hidden rounded-2xl border border-white/5 bg-[#2a2f42]/50 p-6 transition-all hover:-translate-y-1 hover:bg-[#2a2f42]/80 hover:shadow-lg ${highlight ? 'shadow-purple-500/10' : ''}`}>
      {highlight && <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-purple-500/20 blur-xl"></div>}
      <p className="text-sm font-semibold text-slate-400">{title}</p>
      <h3 className={`mt-2 text-4xl font-extrabold ${highlight ? 'bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent' : 'text-white'}`}>
        {value}
      </h3>
    </div>
  );

  return (
    <section className="mt-6 rounded-2xl border border-white/5 bg-[#1e2333]/80 p-8 shadow-2xl backdrop-blur-xl">
      <h2 className="mb-6 text-xl font-bold text-white">
        Research Analytics Overview
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatCard title="Total Students" value={analytics.totalStudents} highlight />
        <StatCard title="Completion Rate" value={`${analytics.completionRate}%`} />
        <StatCard title="Average Hints" value={analytics.averageHints} />
        <StatCard title="Experimental" value={analytics.experimentalCount} />
        <StatCard title="Control" value={analytics.controlCount} />
        <StatCard title="Gate Events" value={analytics.totalGateEvents} />
      </div>
    </section>
  );
}

export default ResearchAnalytics;