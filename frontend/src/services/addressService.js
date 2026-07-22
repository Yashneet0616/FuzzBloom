import axios from "axios";
import { auth } from "../firebase/firebase";

const API_URL = "http://localhost:5000/api/addresses";

async function getToken() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated.");
  }

  return await user.getIdToken();
}

export async function getAddresses() {
  const token = await getToken();

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function addAddress(address) {
  const token = await getToken();

  const response = await axios.post(API_URL, address, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateAddress(id, address) {
  const token = await getToken();

  const response = await axios.put(
    `${API_URL}/${id}`,
    address,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}

export async function deleteAddress(id) {
  const token = await getToken();

  const response = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}   