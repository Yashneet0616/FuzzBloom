const { db } = require("../config/firebaseAdmin");
const { FieldValue } = require("firebase-admin/firestore");

// =====================================
// Get All Addresses
// =====================================
async function getAddresses(uid) {
  const snapshot = await db
    .collection("addresses")
    .where("userId", "==", uid)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// =====================================
// Add Address
// =====================================
async function addAddress(uid, data) {
  // If first address, make it default automatically
  const existing = await db
    .collection("addresses")
    .where("userId", "==", uid)
    .limit(1)
    .get();

  const isDefault =
    data.isDefault === true || existing.empty;

  // If new address is default, remove default from others
  if (isDefault) {
    const addresses = await db
      .collection("addresses")
      .where("userId", "==", uid)
      .get();

    const batch = db.batch();

    addresses.forEach((doc) => {
      batch.update(doc.ref, {
        isDefault: false,
      });
    });

    await batch.commit();
  }

  const docRef = await db.collection("addresses").add({
    userId: uid,

    label: data.label || "Home",

    fullName: data.fullName,

    phone: data.phone,

    addressLine1: data.addressLine1 || "",

    addressLine2: data.addressLine2 || "",

    city: data.city,

    state: data.state,

    pincode: data.pincode,

    country: data.country || "India",

    isDefault,

    createdAt: FieldValue.serverTimestamp(),

    updatedAt: FieldValue.serverTimestamp(),
  });

  const snapshot = await docRef.get();

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

// =====================================
// Update Address
// =====================================
async function updateAddress(uid, id, data) {
  const ref = db.collection("addresses").doc(id);

  const snapshot = await ref.get();

  if (!snapshot.exists) {
    throw new Error("Address not found.");
  }

  if (snapshot.data().userId !== uid) {
    throw new Error("Unauthorized.");
  }

  // If this address becomes default,
  // remove default from every other address.
  if (data.isDefault) {
    const addresses = await db
      .collection("addresses")
      .where("userId", "==", uid)
      .get();

    const batch = db.batch();

    addresses.forEach((doc) => {
      batch.update(doc.ref, {
        isDefault: false,
      });
    });

    await batch.commit();
  }

  await ref.update({
    label: data.label,

    fullName: data.fullName,

    phone: data.phone,

    addressLine1: data.addressLine1,

    addressLine2: data.addressLine2,

    city: data.city,

    state: data.state,

    pincode: data.pincode,

    country: data.country,

    isDefault: data.isDefault || false,

    updatedAt: FieldValue.serverTimestamp(),
  });

  const updated = await ref.get();

  return {
    id: updated.id,
    ...updated.data(),
  };
}

// =====================================
// Delete Address
// =====================================
async function deleteAddress(uid, id) {
  const ref = db.collection("addresses").doc(id);

  const snapshot = await ref.get();

  if (!snapshot.exists) {
    throw new Error("Address not found.");
  }

  if (snapshot.data().userId !== uid) {
    throw new Error("Unauthorized.");
  }

  const wasDefault = snapshot.data().isDefault;

  await ref.delete();

  // If default address deleted,
  // make another one default automatically.
  if (wasDefault) {
    const remaining = await db
      .collection("addresses")
      .where("userId", "==", uid)
      .limit(1)
      .get();

    if (!remaining.empty) {
      await remaining.docs[0].ref.update({
        isDefault: true,
      });
    }
  }

  return {
    message: "Address deleted successfully.",
  };
}

// =====================================
// Set Default Address
// =====================================
async function setDefaultAddress(uid, id) {
  const addresses = await db
    .collection("addresses")
    .where("userId", "==", uid)
    .get();

  const batch = db.batch();

  addresses.forEach((doc) => {
    batch.update(doc.ref, {
      isDefault: doc.id === id,
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();

  return {
    message: "Default address updated.",
  };
}

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};