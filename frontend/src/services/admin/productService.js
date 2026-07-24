import { auth } from "../../firebase/firebase";

const API_URL = "http://localhost:5000/api/admin";

async function getToken() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  return await user.getIdToken();
}

// =======================
// GET ALL PRODUCTS
// =======================
export async function getProducts() {
  const token = await getToken();

  const response = await fetch(`${API_URL}/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products.");
  }

  return data.products;
}

// =======================
// GET PRODUCT BY ID
// =======================
export async function getProductById(id) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch product.");
  }

  return data.product;
}

// =======================
// ADD PRODUCT
// =======================
export async function addProduct(product) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/products`, {
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

  return data.product;
}

// =======================
// UPDATE PRODUCT
// =======================
export async function updateProduct(id, product) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update product.");
  }

  return data;
}

// =======================
// DELETE PRODUCT
// =======================
export async function deleteProduct(id) {
  const token = await getToken();

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product.");
  }

  return data;
}