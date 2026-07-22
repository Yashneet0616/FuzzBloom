import { auth } from "../firebase/firebase";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function authHeaders() {
  const token = await auth.currentUser.getIdToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getProfile() {
  const response = await fetch(
    `${API_URL}/api/auth/profile`,
    {
      headers: await authHeaders(),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.profile;
}

export async function updateProfile(profile) {
  const response = await fetch(
    `${API_URL}/api/auth/profile`,
    {
      method: "PUT",
      headers: await authHeaders(),
      body: JSON.stringify(profile),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.profile;
}