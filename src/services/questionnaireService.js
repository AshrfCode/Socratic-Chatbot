import { apiPost } from "./api";

export function submitPreTask(data) {
  return apiPost("/questionnaires/pre-task", data);
}

export function submitPostTask(data) {
  return apiPost("/questionnaires/post-task", data);
}