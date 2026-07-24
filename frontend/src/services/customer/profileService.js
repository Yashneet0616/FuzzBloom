import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

/**
 * Get user profile
 */
export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data(),
    };
  } catch (error) {
    console.error("Error getting profile:", error);
    throw error;
  }
};

/**
 * Backward compatibility
 */
export const getProfile = getUserProfile;

/**
 * Create profile if it doesn't exist
 */
export const createUserProfile = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);

    const snap = await getDoc(userRef);

    if (snap.exists()) return;

    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName || "",
      email: user.email || "",
      phone: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
};

/**
 * Backward compatibility
 */
export const createProfile = createUserProfile;

/**
 * Update profile
 */
export const updateUserProfile = async (uid, data) => {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

/**
 * Backward compatibility
 */
export const updateProfile = updateUserProfile;

/**
 * Update phone only
 */
export const updatePhoneNumber = async (uid, phone) => {
  try {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      phone,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating phone:", error);
    throw error;
  }
};