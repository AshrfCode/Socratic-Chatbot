import { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import StudentList from "./StudentList";
import { getDashboardData } from "../../services/dashboardService";
import { useSession } from "../../Context/SessionContext";

function DashboardPreview() {
  const [students, setStudents] = useState([]);

  const { dashboardVersion } = useSession();

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await getDashboardData();
        setStudents(data);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      }
    }

    loadStudents();
  }, [dashboardVersion]);

  return (
    <section className="mt-6 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
      <DashboardHeader />
      <StudentList students={students} />
    </section>
  );
}

export default DashboardPreview;