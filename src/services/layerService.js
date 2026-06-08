import { apiGet } from "./api";

export function getLayers() {
  return apiGet("/layers");
}
