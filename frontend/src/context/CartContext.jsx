import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import {
  getCart,
  addToCart as addCartItem,
  updateQuantity,
  removeItem,
  clearCart as clearCartApi,
} from "../services/cartService";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // LOAD CART
  // ==========================
  async function loadCart() {
    if (!auth.currentUser) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      const cart = await getCart();
      setCartItems(cart);
    } catch (error) {
      console.error("Load Cart:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      loadCart();
    });

    return unsubscribe;
  }, []);

  // ==========================
  // ADD
  // ==========================
  async function addToCart(product) {
    try {
      await addCartItem(product);
      await loadCart();
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================
  // REMOVE
  // ==========================
  async function removeFromCart(id) {
    try {
      await removeItem(id);
      await loadCart();
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================
  // INCREASE
  // ==========================
  async function increaseQuantity(id) {
    const item = cartItems.find((i) => i.id === id);

    if (!item) return;

    await updateQuantity(id, item.quantity + 1);
    await loadCart();
  }

  // ==========================
  // DECREASE
  // ==========================
  async function decreaseQuantity(id) {
    const item = cartItems.find((i) => i.id === id);

    if (!item) return;

    await updateQuantity(id, item.quantity - 1);
    await loadCart();
  }

  // ==========================
  // CLEAR
  // ==========================
  async function clearCart() {
    try {
      await clearCartApi();
      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}