import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getUserProfile,
  updateUserProfile,
} from "../../../services/customer/profileService";

const Profile = () => {
  const auth = getAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = auth.currentUser;

      if (!user) return;

      const profile = await getUserProfile(user.uid);

      setForm({
        name: profile?.name || "",
        email: profile?.email || user.email || "",
        phone: profile?.phone || "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const user = auth.currentUser;

      if (!user) return;

      await updateUserProfile(user.uid, {
        name: form.name.trim(),
        phone: form.phone.trim(),
      });

      alert("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

      <h1 className="text-2xl font-bold mb-6">
        Personal Information
      </h1>

      <form
        onSubmit={handleSave}
        className="space-y-5"
      >
        <div>
          <label className="block mb-2 font-medium">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email Address
          </label>

          <input
            type="email"
            value={form.email}
            disabled
            className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Enter phone number"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;