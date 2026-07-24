const { db } = require("../config/firebaseAdmin");
const {
  FieldValue,
} = require("firebase-admin/firestore");

// ===============================
// Register User
// ===============================
async function registerUser(uid, data) {
  const userRef = db.collection("users").doc(uid);

  const snapshot = await userRef.get();

  // Existing user
  if (snapshot.exists) {
    return snapshot.data();
  }

  // New customer
  const user = {
    uid,
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    phone: data.phone || "",
    email: data.email || "",
    role: "customer",
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };

  await userRef.set(user);

  const newSnapshot = await userRef.get();

  return newSnapshot.data();
}

// ===============================
// Get Profile
// ===============================
async function getProfile(uid) {
  const userRef = db.collection("users").doc(uid);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    throw new Error("User not found.");
  }

  return snapshot.data();
}

// ===============================
// Update Profile
// ===============================
async function updateProfile(uid, data) {
  const userRef = db.collection("users").doc(uid);

  await userRef.update({
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    updatedAt: FieldValue.serverTimestamp(),
  });

  const snapshot = await userRef.get();

  return snapshot.data();
}

module.exports = {
  registerUser,
  getProfile,
  updateProfile,
};