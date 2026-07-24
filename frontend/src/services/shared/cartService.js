import { auth } from "../../firebase/firebase";

const API_URL = "http://localhost:5000/api/cart";

async function getToken() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  return await user.getIdToken();
}

// =======================
// GET CART
// =======================
export async function getCart() {
  const token = await getToken();

  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch cart.");
  }

  return data.cart;
}

// =======================
// ADD TO CART
// =======================
export async function addToCart(product) {
  const token = await getToken();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add product.");
  }

  return data;
}

// =======================
// UPDATE QUANTITY
// =======================
export async function updateQuantity(productId, quantity) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update quantity.");
  }

  return data;
}

// =======================
// REMOVE ITEM
// =======================
export async function removeItem(productId) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to remove item.");
  }

  return data;
}

// =======================
// CLEAR CART
// =======================
export async function clearCart() {
  const token = await getToken();

  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to clear cart.");
  }

  return data;
}