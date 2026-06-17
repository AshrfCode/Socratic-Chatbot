import { apiGet } from "./api";

export function getDashboardData() {
  return apiGet("/dashboard");
}

export function getResearchAnalytics() {
  return apiGet("/dashboard/analytics");
}