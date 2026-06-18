import { useState } from "react";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage"; // <-- Import the new page!
import ChatBox from "./components/Chat/ChatBox";
import SidePanel from "./components/SidePanel/SidePanel";
import DashboardPreview from "./components/Dashboard/DashboardPreview";
import ResearchAnalytics from "./components/Dashboard/ResearchAnalytics";
import ProgressBar from "./components/ProgressBar";
import StartSessionForm from "./components/StartSessionForm";
import ResearcherLogin from "./components/ResearcherLogin";
import PreTaskSurvey from "./components/Questionnaire/PreTaskSurvey";
import PostTaskSurvey from "./components/Questionnaire/PostTaskSurvey";
import { useSession } from "./Context/SessionContext";

function App() {
  const { sessionInfo, clearSession } = useSession();

  const [preTaskDone, setPreTaskDone] = useState(false);
  const [researcher, setResearcher] = useState(null);
  
  // --- NEW STATE: Manages the front door routing ---
  const [authRoute, setAuthRoute] = useState("landing"); // "landing" | "student" | "researcher"

  function handleLogout() {
    setResearcher(null);
    setPreTaskDone(false);
    setAuthRoute("landing"); // Kicks you back to the main landing page on logout
    clearSession();
  }

  const isAuthView = !sessionInfo && !researcher;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:bg-gradient-to-br dark:from-slate-950 dark:via-purple-900/10 dark:to-slate-950 dark:text-white">
      {/* Show the header, but hide the logout button if we are just staring at the landing page */}
      <Header 
        showLogout={!!(sessionInfo || researcher)} 
        onLogout={handleLogout} 
      />

      <div className={`flex-1 ${isAuthView && authRoute === "landing" ? "flex items-center justify-center" : "mx-auto w-full max-w-7xl p-4 md:p-6"}`}>
        
        {researcher ? (
          <div className="space-y-6">
            <DashboardPreview />
            <ResearchAnalytics />
          </div>
        ) : !sessionInfo ? (
          
          /* --- THE NEW ROUTING LOGIC --- */
          authRoute === "landing" ? (
            <LandingPage 
              onStudentClick={() => setAuthRoute("student")}
              onResearcherClick={() => setAuthRoute("researcher")}
            />
          ) : authRoute === "researcher" ? (
            <ResearcherLogin
              onLogin={setResearcher}
              onBack={() => setAuthRoute("landing")}
            />
          ) : (
            <StartSessionForm 
              // We pass onBack here so students can go back to the landing page
              onBack={() => setAuthRoute("landing")} 
            />
          )

        ) : !preTaskDone ? (
          <PreTaskSurvey onDone={() => setPreTaskDone(true)} />
        ) : sessionInfo.status === "completed" ? (
          <PostTaskSurvey onDone={handleLogout} />
        ) : (
          <div className="flex flex-col space-y-6">
            <ProgressBar />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ChatBox />
              </div>
              <SidePanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;