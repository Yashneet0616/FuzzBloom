import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  auth,
  googleProvider,
} from "../../firebase/firebase";

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
  const credential =
    await createUserWithEmailAndPassword(
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
// EMAIL LOGIN
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
// GOOGLE LOGIN
// ======================
export async function loginWithGoogle() {
  const credential = await signInWithPopup(
    auth,
    googleProvider
  );

  const user = credential.user;

  const token = await user.getIdToken(true);

  const firstName =
    user.displayName?.split(" ")[0] || "";

  const lastName =
    user.displayName
      ?.split(" ")
      .slice(1)
      .join(" ") || "";

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
        phone: user.phoneNumber || "",
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