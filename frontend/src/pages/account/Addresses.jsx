import { useEffect, useState } from "react";
import { Plus, MapPin, Loader2, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import {
  getAddresses,
  addAddress,
  deleteAddress,
} from "../../services/addressService";

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
    loadAddresses();
  }, []);

  async function onSubmit(data) {
    try {
      setSaving(true);

      await addAddress(data);

      toast.success("Address added successfully.");

      reset();

      await loadAddresses();
    } catch (error) {
      console.error(error);
      toast.error("Unable to save address.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Delete this address?"
    );

    if (!confirmed) return;

    try {
      await deleteAddress(id);

      toast.success("Address deleted.");

      await loadAddresses();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete address.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-bold">
        My Addresses
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <Plus className="text-pink-500" />

            <h2 className="text-xl font-semibold">
              Add New Address
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <input
              {...register("fullName", {
                required: true,
              })}
              placeholder="Full Name"
              className="w-full rounded-xl border p-3"
            />

            {errors.fullName && (
              <p className="text-sm text-red-500">
                Full name is required.
              </p>
            )}

            <input
              {...register("phone", {
                required: true,
              })}
              placeholder="Phone Number"
              className="w-full rounded-xl border p-3"
            />

            <textarea
              {...register("addressLine", {
                required: true,
              })}
              placeholder="Street Address"
              rows={3}
              className="w-full rounded-xl border p-3"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                {...register("city", {
                  required: true,
                })}
                placeholder="City"
                className="rounded-xl border p-3"
              />

              <input
                {...register("state", {
                  required: true,
                })}
                placeholder="State"
                className="rounded-xl border p-3"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                {...register("pincode", {
                  required: true,
                })}
                placeholder="Pincode"
                className="rounded-xl border p-3"
              />

              <input
                {...register("country", {
                  required: true,
                })}
                defaultValue="India"
                placeholder="Country"
                className="rounded-xl border p-3"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center rounded-xl bg-pink-500 py-3 font-semibold text-white hover:bg-pink-600 disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="mr-2 animate-spin"
                  />
                  Saving...
                </>
              ) : (
                "Save Address"
              )}
            </button>
          </form>
        </div>

        <div>
          <h2 className="mb-5 text-xl font-semibold">
            Saved Addresses
          </h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2
                className="animate-spin text-pink-500"
                size={28}
              />
            </div>
          ) : (
            <div className="space-y-4">
                            {addresses.length === 0 ? (
                <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
                  No addresses saved yet.
                </div>
              ) : (
                addresses.map((address) => (
                  <div
                    key={address.id}
                    className="rounded-2xl border bg-white p-5 shadow-sm"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin
                          size={18}
                          className="text-pink-500"
                        />

                        <h3 className="font-semibold">
                          {address.fullName}
                        </h3>
                      </div>

                      <button
                        onClick={() =>
                          handleDelete(address.id)
                        }
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        title="Delete Address"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <p>{address.phone}</p>

                    <p className="mt-2 text-gray-600">
                      {address.addressLine}
                    </p>

                    <p className="text-gray-600">
                      {address.city}, {address.state}
                    </p>

                    <p className="text-gray-600">
                      {address.pincode}, {address.country}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Addresses; 