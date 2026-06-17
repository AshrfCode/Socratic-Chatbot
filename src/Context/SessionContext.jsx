import { createContext, useContext, useState } from "react";
import {
  startSession,
  getSessionById,
  increaseHintCounter,
} from "../services/sessionService";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [dashboardVersion, setDashboardVersion] = useState(0);

  async function startStudentSession(formData) {
    const data = await startSession(formData);
    setSessionInfo(data);
    setDashboardVersion((prev) => prev + 1);
    return data;
  }

  async function refreshSession() {
    if (!sessionInfo?.sessionId) return;

    const data = await getSessionById(sessionInfo.sessionId);
    setSessionInfo(data);
    return data;
  }

  async function increaseHintsUsed() {
    if (!sessionInfo?.sessionId) return;

    const data = await increaseHintCounter(sessionInfo.sessionId);
    setSessionInfo(data);
    setDashboardVersion((prev) => prev + 1);
    return data;
  }

  function updateAfterMessage(updatedSession) {
    if (!updatedSession) return;

    setSessionInfo((prev) => ({
      ...prev,
      ...updatedSession,
    }));

    setDashboardVersion((prev) => prev + 1);
  }

  function refreshDashboard() {
    setDashboardVersion((prev) => prev + 1);
  }
  function clearSession() {
  setSessionInfo(null);
  setDashboardVersion(0);
}

  return (
    <SessionContext.Provider
      value={{
        sessionInfo,
        dashboardVersion,
        startStudentSession,
        refreshSession,
        increaseHintsUsed,
        updateAfterMessage,
        refreshDashboard,
        clearSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}


export function useSession() {
  return useContext(SessionContext);
}