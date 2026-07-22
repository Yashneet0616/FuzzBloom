import { auth } from "../firebase/firebase";

const API_URL = import.meta.env.VITE_API_URL;

export const verifyPayment = async (paymentData) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Please login first.");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${API_URL}/api/verify-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Payment verification failed");
  }

  return data;
};