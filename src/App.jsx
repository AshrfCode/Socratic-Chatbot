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

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      <Header />

      {(sessionInfo || researcher) && (
        <button
          onClick={handleLogout}
          className="mb-4 rounded-xl bg-red-500/20 px-4 py-2 text-red-200 hover:bg-red-500/30"
        >
          Logout
        </button>
      )}

      {researcher ? (
        <>
          <DashboardPreview />
          <ResearchAnalytics />
        </>
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
      ) : (
        <>
          <ProgressBar />

          <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ChatBox />
            </div>

            <SidePanel />
          </main>

          {sessionInfo.status === "completed" && <PostTaskSurvey />}
        </>
      )}
    </div>
  );
}

export default App;