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

  return (
    <section className="mt-6 rounded-3xl bg-white/10 p-6 text-white shadow-xl">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Research Analytics
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-slate-400">Total Students</p>
          <h3 className="text-3xl font-bold">{analytics.totalStudents}</h3>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-slate-400">Completion Rate</p>
          <h3 className="text-3xl font-bold">{analytics.completionRate}%</h3>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-slate-400">Average Hints</p>
          <h3 className="text-3xl font-bold">{analytics.averageHints}</h3>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-slate-400">Experimental Group</p>
          <h3 className="text-3xl font-bold">
            {analytics.experimentalCount}
          </h3>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-slate-400">Control Group</p>
          <h3 className="text-3xl font-bold">{analytics.controlCount}</h3>
        </div>

        <div className="rounded-2xl bg-slate-900 p-4">
          <p className="text-slate-400">Gate Events</p>
          <h3 className="text-3xl font-bold">{analytics.totalGateEvents}</h3>
        </div>
      </div>
    </section>
  );
}

export default ResearchAnalytics;