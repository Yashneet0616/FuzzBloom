import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// ======================
// SIGN UP
// ======================
export async function signup({
  firstName,
  lastName,
  phone,
  email,
  password,
}) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = credential.user;

  const token = await user.getIdToken(true);

  const response = await fetch(
    `${API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
      }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return user;
}

// ======================
// LOGIN
// ======================
export async function login(email, password) {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return credential.user;
}

// ======================
// RESET PASSWORD
// ======================
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

// ======================
// LOGOUT
// ======================
export async function logout() {
  await signOut(auth);
}