const API_URL = "http://localhost:5000/api/products";

// =======================
// GET ALL PRODUCTS
// =======================
export async function getProducts() {
  const response = await fetch(API_URL);

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
  const response = await fetch(`${API_URL}/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch product.");
  }

  return data.product;
}