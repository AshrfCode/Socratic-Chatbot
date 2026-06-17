import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";
import { useSession } from "../../Context/SessionContext";
import DashboardHeader from "./DashboardHeader";
import StudentList from "./StudentList";

/*
  DashboardPreview loads real data from MongoDB.

  Important:
  No fakeData.

  It refreshes when dashboardVersion changes in SessionContext.

  Example:
  Student clicks Get Hint
  ↓
  backend updates hintsUsed in MongoDB
  ↓
  SessionContext increases dashboardVersion
  ↓
  DashboardPreview useEffect runs again
  ↓
  latest MongoDB data appears without page reload
*/

function DashboardPreview() {
  const { dashboardVersion } = useSession();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardData();
        setStudents(data);
      } catch (err) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [dashboardVersion]);

 return (
  <section className="mt-6 rounded-3xl border border-white/10 bg-white/10 p-6 text-white shadow-2xl">
    <DashboardHeader />

    {loading && <p className="text-slate-300">Loading dashboard...</p>}

    {error && (
      <p className="rounded-xl bg-red-500/20 p-3 text-red-200">
        {error}
      </p>
    )}

    {!loading && !error && <StudentList students={students} />}
  </section>
);
}

export default DashboardPreview;