import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Save } from "lucide-react";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";
import { updateProfile } from "../../services/profileService";

function Profile() {
  const { profile } = useAuth();

  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        email: profile.email || "",
      });
    }
  }, [profile, reset]);

  async function onSubmit(data) {
    try {
      setSaving(true);

      await updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      });

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="mb-8 text-3xl font-bold">
          My Profile
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                First Name
              </label>

              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full rounded-xl border p-3"
              />

              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Last Name
              </label>

              <input
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className="w-full rounded-xl border p-3"
              />

              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Phone Number
            </label>

            <input
              {...register("phone", {
                required: "Phone number is required",
              })}
              className="w-full rounded-xl border p-3"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Email Address
            </label>

            <input
              disabled
              {...register("email")}
              className="w-full cursor-not-allowed rounded-xl border bg-gray-100 p-3"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white hover:bg-pink-600 disabled:opacity-60"
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
              <>
                <Save
                  size={18}
                  className="mr-2"
                />
                Save Changes
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;