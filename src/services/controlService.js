import { apiPost } from "./api";

export function logControlGroupText(text) {
  return apiPost("/control/log", { text });
}