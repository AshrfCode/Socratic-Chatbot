import { useState } from "react";
import Header from "./components/Header";
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
  const [showResearcherLogin, setShowResearcherLogin] = useState(false);
  const [researcher, setResearcher] = useState(null);

  function handleLogout() {
    setResearcher(null);
    setShowResearcherLogin(false);
    setPreTaskDone(false);
    clearSession();
  }

  const isAuthView = !sessionInfo && !researcher;

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Header 
        showLogout={!!(sessionInfo || researcher)} 
        onLogout={handleLogout} 
      />

      <div className={`flex-1 ${isAuthView ? "" : "mx-auto w-full max-w-7xl p-4 md:p-6"}`}>
        
        {researcher ? (
          <div className="space-y-6">
            <DashboardPreview />
            <ResearchAnalytics />
          </div>
        ) : showResearcherLogin ? (
          <ResearcherLogin
            onLogin={setResearcher}
            onBack={() => setShowResearcherLogin(false)}
          />
        ) : !sessionInfo ? (
          <StartSessionForm
            onResearcherClick={() => setShowResearcherLogin(true)}
          />
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