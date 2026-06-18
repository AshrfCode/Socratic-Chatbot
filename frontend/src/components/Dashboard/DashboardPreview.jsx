import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboardService";
import { useSession } from "../../Context/SessionContext";
import DashboardHeader from "./DashboardHeader";
import StudentList from "./StudentList";
import StudentAnalyticsView from "./StudentAnalyticsView";
import StudentChatView from "./StudentChatView";

function DashboardPreview() {
  const { dashboardVersion } = useSession();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeView, setActiveView] = useState("list"); 
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");
        
        const data = await getDashboardData();
        
        // SAFETY CHECK: Ensure the backend actually sent an array!
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          console.error("Dashboard data is not an array:", data);
          setError("Received invalid data format from the server.");
        }
        
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, [dashboardVersion]);

  function goBack() {
    setActiveView("list");
    setSelectedStudent(null);
  }

  if (activeView === "analytics" && selectedStudent) {
    return <StudentAnalyticsView student={selectedStudent} onBack={goBack} />;
  }

  if (activeView === "chat" && selectedStudent) {
    return <StudentChatView student={selectedStudent} onBack={goBack} />;
  }

  return (
    <section className="mt-6 rounded-2xl border border-white/5 bg-[#1e2333]/80 p-8 shadow-2xl backdrop-blur-xl">
      <DashboardHeader />

      {loading && (
        <div className="flex h-32 items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-purple-500 border-t-transparent"></span>
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {!loading && !error && (
        <StudentList 
          students={students} 
          onViewAnalytics={(s) => { setSelectedStudent(s); setActiveView("analytics"); }}
          onViewChat={(s) => { setSelectedStudent(s); setActiveView("chat"); }}
        />
      )}
    </section>
  );
}

export default DashboardPreview;