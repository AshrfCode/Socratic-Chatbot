import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
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

  const navigate = useNavigate(); 

  function handleLogout() {
    setResearcher(null);
    setPreTaskDone(false);
    clearSession();
    navigate("/"); // Instantly kicks them back to the landing page URL
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-500 dark:bg-slate-950 dark:bg-gradient-to-br dark:from-slate-950 dark:via-purple-900/10 dark:to-slate-950 dark:text-white">
      
      <Header 
        showLogout={!!(sessionInfo || researcher)} 
        onLogout={handleLogout} 
      />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col p-4 md:p-6">
        <Routes>
          
          {/* 1. Landing Page */}
          <Route 
            path="/" 
            element={
              <div className="flex flex-1 items-center justify-center">
                <LandingPage 
                  onStudentClick={() => navigate("/login")}
                  onResearcherClick={() => navigate("/admin")}
                />
              </div>
            } 
          />

          {/* 2. Student Login */}
          <Route 
            path="/login" 
            element={
              sessionInfo ? <Navigate to="/session" /> : <StartSessionForm onBack={() => navigate("/")} />
            } 
          />

          {/* 3. Researcher Login */}
          <Route 
            path="/admin" 
            element={
              researcher ? <Navigate to="/dashboard" /> : (
                <ResearcherLogin
                  onLogin={(data) => {
                    setResearcher(data);
                    navigate("/dashboard");
                  }}
                  onBack={() => navigate("/")}
                />
              )
            } 
          />

          {/* 4. Researcher Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              researcher ? (
                <div className="space-y-6">
                  <DashboardPreview />
                  <ResearchAnalytics />
                </div>
              ) : <Navigate to="/admin" /> 
            } 
          />

          {/* 5. The Active Chat Session (FIXED) */}
          <Route 
            path="/session" 
            element={
              !sessionInfo ? (
                <Navigate to="/login" />
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
              )
            } 
          />

          {/* 6. Catch-All */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;