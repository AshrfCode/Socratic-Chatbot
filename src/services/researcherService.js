import { apiPost } from "./api";

export function loginResearcher(data) {
  return apiPost("/researcher/login", data);
}