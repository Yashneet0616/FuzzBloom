import { auth } from "../../firebase/firebase";

const API_URL = "http://localhost:5000/api/admin";

async function getAuthHeaders() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await user.getIdToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getSettings() {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/settings`, {
    method: "GET",
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch settings");
  }

  return data.settings;
}

export async function saveSettings(settings) {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_URL}/settings`, {
    method: "PUT",
    headers,
    body: JSON.stringify(settings),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to save settings");
  }

  return data.settings;
}