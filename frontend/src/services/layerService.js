import { apiGet, apiPost } from "./api";

export function getLayers() {
  return apiGet("/layers");
}

export function checkLayer() {
  return apiPost("/layers/check");
}