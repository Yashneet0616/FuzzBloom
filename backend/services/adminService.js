const { db } = require("../config/firebaseAdmin");
const { FieldValue } = require("firebase-admin/firestore");

const defaultSettings = {
  appearance: {
    heroBanner: "",
    sliderImages: [],
    sections: {
      hero: true,
      categories: true,
      featured: true,
      testimonials: true,
      newsletter: true,
      footerOffer: true,
    },
  },

  announcement: {
    enabled: true,
    text: "SIGN UP & GET 10% OFF",
    backgroundColor: "#000000",
    textColor: "#FFFFFF",
    link: "",
  },

  contact: {
    email: "",
    phone: "",
    whatsapp: "",
    instagram: "",
  },

  policies: {
    shipping: "",
    returns: "",
    privacy: "",
    terms: "",
  },
};

class AdminService {
  // ==========================
  // PRODUCTS
  // ==========================

  async getProducts() {
    const snapshot = await db.collection("products").get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getProductById(id) {
    const snapshot = await db.collection("products").doc(id).get();

    if (!snapshot.exists) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  }

  async addProduct(product) {
    const docRef = await db.collection("products").add({
      name: product.name,
      category: product.category,
      description: product.description,
      image: product.image,
      price: Number(product.price),

      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return {
      id: docRef.id,
    };
  }

  async updateProduct(id, product) {
    await db.collection("products").doc(id).update({
      name: product.name,
      category: product.category,
      description: product.description,
      image: product.image,
      price: Number(product.price),

      updatedAt: FieldValue.serverTimestamp(),
    });

    return {
      id,
    };
  }

  async deleteProduct(id) {
    await db.collection("products").doc(id).delete();

    return true;
  }

  // ==========================
  // ORDERS
  // ==========================

  async getOrders() {
    const snapshot = await db
      .collection("orders")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  async getOrderById(id) {
    const snapshot = await db.collection("orders").doc(id).get();

    if (!snapshot.exists) {
      return null;
    }

    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  }

  async updateOrderStatus(id, status) {
    await db.collection("orders").doc(id).update({
      status,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return {
      id,
      status,
    };
  }

  // ==========================
  // SETTINGS
  // ==========================

  async getSettings() {
    const docRef = db.collection("settings").doc("store");
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
      await docRef.set(defaultSettings);
      return defaultSettings;
    }

    const data = snapshot.data();

    return {
      appearance: {
        heroBanner: data.appearance?.heroBanner || "",
        sliderImages: data.appearance?.sliderImages || [],
        sections: {
          hero: data.appearance?.sections?.hero ?? true,
          categories: data.appearance?.sections?.categories ?? true,
          featured: data.appearance?.sections?.featured ?? true,
          testimonials: data.appearance?.sections?.testimonials ?? true,
          newsletter: data.appearance?.sections?.newsletter ?? true,
          footerOffer: data.appearance?.sections?.footerOffer ?? true,
        },
      },

      announcement: {
        ...defaultSettings.announcement,
        ...data.announcement,
      },

      contact: {
        ...defaultSettings.contact,
        ...data.contact,
      },

      policies: {
        ...defaultSettings.policies,
        ...data.policies,
      },
    };
  }

  async updateSettings(settings) {
    await db.collection("settings").doc("store").set({
      ...settings,
      updatedAt: FieldValue.serverTimestamp(),
    });

    return settings;
  }
}

module.exports = new AdminService();