import { createContext, useContext, useEffect, useState } from "react";
import {
  getSessionInfo,
  increaseHintCounter,
  moveToNextLayer,
} from "../services/sessionService";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [dashboardVersion, setDashboardVersion] = useState(0);
  const [progressError, setProgressError] = useState("");

  useEffect(() => {
    async function loadSession() {
      try {
        const data = await getSessionInfo();
        setSessionInfo(data);
      } catch (error) {
        console.error("Failed to load session info", error);
      }
    }

    loadSession();
  }, []);

  async function increaseHintsUsed() {
    try {
      const updatedSession = await increaseHintCounter();

      setSessionInfo(updatedSession);
      setDashboardVersion((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to increase hints used", error);
    }
  }

  async function goToNextLayer() {
    try {
      setProgressError("");

      const updatedSession = await moveToNextLayer();

      setSessionInfo(updatedSession);
      setDashboardVersion((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to move to next layer", error);

      setProgressError(
        error.message || "You cannot move to the next layer yet."
      );
    }
  }

  return (
    <SessionContext.Provider
      value={{
        sessionInfo,
        increaseHintsUsed,
        goToNextLayer,
        dashboardVersion,
        progressError,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}