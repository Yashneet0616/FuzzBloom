const { db } = require("../config/firebaseAdmin");
const { FieldValue } = require("firebase-admin/firestore");

class CartService {
  // ==========================
  // GET CART
  // ==========================
  async getCart(uid) {
    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // ==========================
  // ADD TO CART
  // ==========================
  async addToCart(uid, product) {
    const cartRef = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .doc(product.id);

    const existing = await cartRef.get();

    if (existing.exists) {
      const current = existing.data();

      await cartRef.update({
        quantity: current.quantity + 1,
        updatedAt: FieldValue.serverTimestamp(),
      });
    } else {
      await cartRef.set({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: Number(product.price),
        quantity: 1,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
    }

    return true;
  }

  // ==========================
  // UPDATE QUANTITY
  // ==========================
  async updateQuantity(uid, productId, quantity) {
    const cartRef = db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .doc(productId);

    if (quantity <= 0) {
      await cartRef.delete();
      return true;
    }

    await cartRef.update({
      quantity,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return true;
  }

  // ==========================
  // REMOVE ITEM
  // ==========================
  async removeItem(uid, productId) {
    await db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .doc(productId)
      .delete();

    return true;
  }

  // ==========================
  // CLEAR CART
  // ==========================
  async clearCart(uid) {
    const snapshot = await db
      .collection("users")
      .doc(uid)
      .collection("cart")
      .get();

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return true;
  }
}

module.exports = new CartService();