import { useEffect, useState } from "react";
import {
  Plus,
  Loader2,
  Trash2,
  Pencil,
  Star,
  Home,
  Building2,
  MapPinned,
  MapPin,
} from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "../../../services/customer/addressService";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Andaman & Nicobar Islands",
  "Lakshadweep",
  "Dadra & Nagar Haveli and Daman & Diu",
];

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: "Home",
      country: "India",
      isDefault: false,
    },
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  async function loadAddresses() {
    try {
      setLoading(true);

      const data = await getAddresses();

      setAddresses(data);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load addresses.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchPincodeDetails(pincode) {
    if (pincode.length !== 6) return;

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );

      const data = await response.json();

      if (
        data[0].Status === "Success" &&
        data[0].PostOffice?.length
      ) {
        const post = data[0].PostOffice[0];

        setValue("city", post.District);
        setValue("state", post.State);
        setValue("country", post.Country);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmit(data) {
    try {
      setSaving(true);

      if (editingId) {
        await updateAddress(editingId, data);
        toast.success("Address updated.");
      } else {
        await addAddress(data);
        toast.success("Address added.");
      }

      reset({
        label: "Home",
        country: "India",
        isDefault: false,
      });

      setEditingId(null);

      await loadAddresses();
    } catch (error) {
      console.error(error);
      toast.error("Unable to save address.");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(address) {
    setEditingId(address.id);

    reset({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      country: address.country,
      isDefault: address.isDefault,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this address?")) return;

    await deleteAddress(id);

    toast.success("Address deleted.");

    await loadAddresses();
  }

  async function handleDefault(id) {
    await setDefaultAddress(id);

    toast.success("Default address updated.");

    await loadAddresses();
  }

  function getLabelIcon(label) {
    switch (label) {
      case "Home":
        return <Home size={18} className="text-pink-500" />;

      case "Work":
        return <Building2 size={18} className="text-pink-500" />;

      default:
        return <MapPinned size={18} className="text-pink-500" />;
    }
  }
  return (
  <div className="mx-auto max-w-7xl px-6 py-10">

    {/* Header */}

    <div className="mb-10 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          My Addresses
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your delivery addresses for faster checkout.
        </p>
      </div>

      <div className="hidden rounded-2xl bg-pink-50 p-4 lg:block">
        <MapPin className="h-8 w-8 text-pink-500" />
      </div>
    </div>

    <div className="grid gap-10 lg:grid-cols-2">

      {/* ================= Form ================= */}

      <div className="rounded-3xl border border-pink-100 bg-white p-8 shadow-sm">

        <div className="mb-8 flex items-center gap-3">

          <div className="rounded-2xl bg-pink-100 p-3">
            <Plus className="text-pink-600" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <p className="text-sm text-gray-500">
              Save your delivery address securely.
            </p>
          </div>

        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* Label */}

          <select
            {...register("label")}
            className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-pink-400"
          >
            <option value="Home">🏠 Home</option>
            <option value="Work">🏢 Work</option>
            <option value="Other">📍 Other</option>
          </select>

          {/* Full Name */}

          <div>
            <input
              {...register("fullName", {
                required: "Full name is required",
              })}
              placeholder="Full Name"
              className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-pink-400"
            />

            {errors.fullName && (
              <p className="mt-2 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Phone */}

          <div>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              placeholder="Phone Number"
              className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-pink-400"
            />

            {errors.phone && (
              <p className="mt-2 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address 1 */}

          <div>
            <input
              {...register("addressLine1", {
                required: "Address Line 1 is required",
              })}
              placeholder="House No., Building, Street..."
              className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-pink-400"
            />

            {errors.addressLine1 && (
              <p className="mt-2 text-sm text-red-500">
                {errors.addressLine1.message}
              </p>
            )}
          </div>

          {/* Address 2 */}

          <input
            {...register("addressLine2")}
            placeholder="Apartment, Landmark (Optional)"
            className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-pink-400"
          />

          {/* Pincode */}

          <div>
            <input
              {...register("pincode", {
                required: "Pincode is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Enter a valid 6-digit pincode",
                },
              })}
              placeholder="Pincode"
              maxLength={6}
              className="w-full rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-pink-400"
              onChange={(e) => {
                if (e.target.value.length === 6) {
                  fetchPincodeDetails(e.target.value);
                }
              }}
            />

            {errors.pincode && (
              <p className="mt-2 text-sm text-red-500">
                {errors.pincode.message}
              </p>
            )}
          </div>

          {/* City & State */}

          <div className="grid gap-4 md:grid-cols-2">

            <input
              {...register("city", {
                required: "City is required",
              })}
              placeholder="City"
              className="rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-pink-400"
            />

            <select
              {...register("state", {
                required: "State is required",
              })}
              className="rounded-2xl border border-gray-200 p-4 outline-none transition focus:border-pink-400"
            >
              <option value="">
                Select State
              </option>

              {STATES.map((state) => (
                <option
                  key={state}
                  value={state}
                >
                  {state}
                </option>
              ))}

            </select>

          </div>

          {/* Country */}

          <input
            {...register("country")}
            className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-4"
            readOnly
          />

          {/* Default */}

          <label className="flex items-center gap-3 rounded-2xl border border-pink-100 bg-pink-50 p-4">

            <input
              type="checkbox"
              {...register("isDefault")}
            />

            <span className="font-medium">
              Make this my default address
            </span>

          </label>

          {/* Buttons */}

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-2xl bg-pink-500 py-4 font-semibold text-white transition hover:bg-pink-600 disabled:opacity-60"
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Saving...
                </span>
              ) : editingId ? (
                "Update Address"
              ) : (
                "Save Address"
              )}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);

                  reset({
                    label: "Home",
                    country: "India",
                    isDefault: false,
                  });
                }}
                className="rounded-2xl border px-8 transition hover:bg-gray-100"
              >
                Cancel
              </button>
            )}

          </div>

        </form>

      </div>
            {/* ================= Saved Addresses ================= */}

      <div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Saved Addresses
          </h2>

          <p className="mt-2 text-gray-500">
            Choose your preferred delivery address.
          </p>
        </div>

        {loading ? (
          <div className="flex h-80 items-center justify-center rounded-3xl bg-white shadow-sm">
            <Loader2
              size={36}
              className="animate-spin text-pink-500"
            />
          </div>
        ) : addresses.length === 0 ? (
          <div className="flex h-80 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-pink-200 bg-white text-center shadow-sm">

            <MapPin
              size={48}
              className="mb-4 text-pink-400"
            />

            <h3 className="text-xl font-semibold text-gray-800">
              No Saved Addresses
            </h3>

            <p className="mt-2 max-w-xs text-gray-500">
              Add your first delivery address to make
              checkout faster and easier.
            </p>

          </div>
        ) : (
          <div className="space-y-6">

            {addresses.map((address) => (
              <div
                key={address.id}
                className={`rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  address.isDefault
                    ? "border-pink-400 ring-2 ring-pink-100"
                    : "border-gray-200 hover:border-pink-200"
                }`}
              >
                {/* Header */}

                <div className="mb-5 flex items-start justify-between">

                  <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-pink-50 p-3">
                      {getLabelIcon(address.label)}
                    </div>

                    <div>

                      <h3 className="font-semibold text-gray-900">
                        {address.label || "Home"}
                      </h3>

                      {address.isDefault && (
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700">
                          <Star
                            size={12}
                            fill="currentColor"
                          />
                          Default
                        </span>
                      )}

                    </div>

                  </div>

                  <div className="flex items-center gap-2">

                    {!address.isDefault && (
                      <button
                        type="button"
                        onClick={() =>
                          handleDefault(address.id)
                        }
                        className="rounded-xl border border-pink-200 px-3 py-2 text-sm font-medium text-pink-600 transition hover:bg-pink-50"
                      >
                        Set Default
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(address)
                      }
                      className="rounded-xl p-2 text-blue-600 transition hover:bg-blue-50"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(address.id)
                      }
                      className="rounded-xl p-2 text-red-500 transition hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

                {/* Address Details */}

                <div className="space-y-3">

                  <div>

                    <h4 className="text-lg font-semibold text-gray-900">
                      {address.fullName}
                    </h4>

                    <p className="mt-1 text-sm text-gray-500">
                      {address.phone}
                    </p>

                  </div>

                  <div className="space-y-1 text-gray-700">

                    <p>{address.addressLine1}</p>

                    {address.addressLine2 && (
                      <p>{address.addressLine2}</p>
                    )}

                    <div className="flex items-center gap-2">

                      <MapPin
                        size={16}
                        className="shrink-0 text-pink-500"
                      />

                      <span>
                        {address.city}, {address.state} -{" "}
                        {address.pincode}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500">
                      {address.country}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  </div>
);

}

export default Addresses;