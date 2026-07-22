const { db } = require("../config/firebaseAdmin");

async function calculateOrder(cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error("Cart is empty.");
  }

  const validatedItems = [];
  let total = 0;

  for (const cartItem of cartItems) {
    if (!cartItem.id || !cartItem.quantity) {
      throw new Error("Invalid cart item.");
    }

    const productRef = db.collection("products").doc(cartItem.id);
    const snapshot = await productRef.get();

    if (!snapshot.exists) {
      throw new Error(`Product not found: ${cartItem.id}`);
    }

    const product = snapshot.data();

    const quantity = Number(cartItem.quantity);
    const price = Number(product.price);

    if (quantity <= 0) {
      throw new Error("Invalid quantity.");
    }

    const itemTotal = quantity * price;

    total += itemTotal;

    validatedItems.push({
      id: snapshot.id,
      name: product.name,
      image: product.image,
      category: product.category,
      price,
      quantity,
      total: itemTotal,
    });
  }

  return {
    items: validatedItems,
    total,
  };
}

module.exports = {
  calculateOrder,
};