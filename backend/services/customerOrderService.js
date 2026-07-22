const { db } = require("../config/firebaseAdmin");

async function getUserOrders(uid) {
  const snapshot = await db
    .collection("orders")
    .where("uid", "==", uid)
    .orderBy("createdAt", "desc")
    .get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

async function getOrderById(uid, orderId) {
  const doc = await db.collection("orders").doc(orderId).get();

  if (!doc.exists) {
    throw new Error("Order not found.");
  }

  const order = doc.data();

  if (order.uid !== uid) {
    throw new Error("Unauthorized.");
  }

  return {
    id: doc.id,
    ...order,
  };
}

module.exports = {
  getUserOrders,
  getOrderById,
};