import { apiGet } from "./api";

export function getDashboardData() {
  return apiGet("/dashboard");
}