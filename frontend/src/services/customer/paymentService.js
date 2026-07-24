  import { auth } from "../../firebase/firebase";

  const API_URL = import.meta.env.VITE_API_URL;

  export const createRazorpayOrder = async (cartItems) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Please login first.");
    }

    const token = await user.getIdToken();

    const payload = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    const response = await fetch(`${API_URL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: payload,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create Razorpay order.");
    }

    return data;
  };