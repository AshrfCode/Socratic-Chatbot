/*
  api.js is the central place for all frontend API requests.

  React components should not write fetch directly.
  Instead:
  Component -> service file -> api.js -> backend

  This keeps the project clean and beginner-friendly.
*/

// This tells React: "If we are on Vercel, use the live backend URL. If we are testing locally, use localhost!"
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function apiGet(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);

    if (!response.ok) {
      throw new Error("API GET request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("apiGet error:", error);
    throw error;
  }
}

export async function apiPost(endpoint, data = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("API POST request failed");
    }

    return await response.json();
  } catch (error) {
    console.error("apiPost error:", error);
    throw error;
  }
}