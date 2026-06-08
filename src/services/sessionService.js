import { apiGet, apiPost } from "./api";

export function getSessionInfo() {
  return apiGet("/session");
}

export function increaseHintCounter() {
  return apiPost("/session/hint", {});
}

export function moveToNextLayer() {
  return apiPost("/session/next-layer", {});
}