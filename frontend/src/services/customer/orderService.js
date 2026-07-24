import { auth } from "../../firebase/firebase";

const API_URL = import.meta.env.VITE_API_URL;

// ==========================
// GET TOKEN
// ==========================
async function getToken() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  return await user.getIdToken();
}

// ==========================
// GET MY ORDERS
// ==========================
export async function getOrders() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch orders.");
  }

  return data.orders;
}

// ==========================
// GET SINGLE ORDER
// ==========================
export async function getOrderById(id) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/api/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch order.");
  }

  return data.order;
}