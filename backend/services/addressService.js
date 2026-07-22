const { db } = require("../config/firebaseAdmin");
const { FieldValue } = require("firebase-admin/firestore");

// ===============================
// Get Addresses
// ===============================
async function getAddresses(uid) {
  const snapshot = await db
    .collection("addresses")
    .where("userId", "==", uid)
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// ===============================
// Add Address
// ===============================
async function addAddress(uid, data) {
  const docRef = await db.collection("addresses").add({
    userId: uid,
    fullName: data.fullName,
    phone: data.phone,
    addressLine: data.addressLine,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    country: data.country,
    createdAt: FieldValue.serverTimestamp(),
  });

  const snapshot = await docRef.get();

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// ===============================
// Update Address
// ===============================
async function updateAddress(uid, id, data) {
  const ref = db.collection("addresses").doc(id);

  const snapshot = await ref.get();

  if (!snapshot.exists) {
    throw new Error("Address not found.");
  }

  if (snapshot.data().userId !== uid) {
    throw new Error("Unauthorized.");
  }

  await ref.update({
    fullName: data.fullName,
    phone: data.phone,
    addressLine: data.addressLine,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    country: data.country,
  });

  const updated = await ref.get();

  return {
    id: updated.id,
    ...updated.data(),
  };
}

// ===============================
// Delete Address
// ===============================
async function deleteAddress(uid, id) {
  const ref = db.collection("addresses").doc(id);

  const snapshot = await ref.get();

  if (!snapshot.exists) {
    throw new Error("Address not found.");
  }

  if (snapshot.data().userId !== uid) {
    throw new Error("Unauthorized.");
  }

  await ref.delete();

  return {
    message: "Address deleted successfully.",
  };
}

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};