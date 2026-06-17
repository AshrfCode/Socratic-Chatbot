import { apiGet, apiPost } from "./api";

export function startSession(studentData) {
  return apiPost("/session/start", studentData);
}

export function getSessionById(sessionId) {
  return apiGet(`/session/${sessionId}`);
}

export function increaseHintCounter(sessionId) {
  return apiPost("/session/increase-hint", { sessionId });
}