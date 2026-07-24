import { auth } from "../../firebase/firebase";

const API_URL = `${import.meta.env.VITE_API_URL}/api/admin`;

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
// GET ALL ORDERS
// ==========================
export async function getOrders() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/orders`, {
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
// GET ORDER BY ID
// ==========================
export async function getOrderById(id) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/orders/${id}`, {
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

// ==========================
// UPDATE ORDER STATUS
// ==========================
export async function updateOrderStatus(id, status) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/orders/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update order.");
  }

  return data;
}

// ==========================
// CREATE ORDER
// ==========================
// Customer checkout already uses /payment and /verifyPayment.
// This function is intentionally disabled.
export async function createOrder() {
  throw new Error(
    "Orders are created through the payment flow."
  );
}                         