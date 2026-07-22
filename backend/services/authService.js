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

  if (snapshot.exists) {
    return snapshot.data();
  }

  const user = {
    uid,
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    phone: data.phone || "",
    email: data.email || "",
    role: "USER",
    createdAt: FieldValue.serverTimestamp(),
  };

  await userRef.set(user);

  const newSnapshot = await userRef.get();

  return newSnapshot.data();
}

// ===============================
// Get Profile
// ===============================
async function getProfile(uid) {
  console.log("==================================");
  console.log("GET PROFILE");
  console.log("UID:", uid);

  const userRef = db.collection("users").doc(uid);

  const snapshot = await userRef.get();

  console.log("Document Exists:", snapshot.exists);

  if (snapshot.exists) {
    console.log("User Data:", snapshot.data());
    console.log("==================================");
    return snapshot.data();
  }

  console.log("==================================");

  throw new Error("User not found.");
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
  });

  const snapshot = await userRef.get();

  return snapshot.data();
}

module.exports = {
  registerUser,
  getProfile,
  updateProfile,
};