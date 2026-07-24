import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  Lock,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

import AuthInput from "./AuthInput";
import PasswordStrength from "./PasswordStrength";

import { signup } from "../../services/auth/authService";

function SignupSection() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  async function onSubmit(data) {
    try {
      setLoading(true);

      await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email.trim(),
        password: data.password,
      });

      toast.success(
        "Welcome to FuzzBloom 🌸"
      );

      navigate("/");
    } catch (error) {
      toast.error(
        error.message || "Signup failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <AuthInput
          label="First Name"
          placeholder="John"
          icon={User}
          register={register("firstName", {
            required:
              "First name is required",
          })}
          error={errors.firstName?.message}
        />

        <AuthInput
          label="Last Name"
          placeholder="Doe"
          icon={User}
          register={register("lastName", {
            required:
              "Last name is required",
          })}
          error={errors.lastName?.message}
        />
      </div>

      <AuthInput
        label="Phone Number"
        placeholder="+91 9876543210"
        icon={Phone}
        register={register("phone", {
          required:
            "Phone number is required",
        })}
        error={errors.phone?.message}
      />

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="john@example.com"
        icon={Mail}
        register={register("email", {
          required: "Email is required",
          pattern: {
            value:
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message:
              "Enter a valid email",
          },
        })}
        error={errors.email?.message}
      />

      <AuthInput
        label="Password"
        type="password"
        placeholder="Create your password"
        icon={Lock}
        register={register("password", {
          required:
            "Password is required",
          minLength: {
            value: 6,
            message:
              "Password must be at least 6 characters",
          },
        })}
        error={errors.password?.message}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <PasswordStrength
        password={password}
      />

      <button
        type="submit"
        disabled={loading}
        className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#FF6F91] font-semibold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff5d83] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>

      <p className="pt-2 text-center text-sm text-gray-500">
        By creating an account you agree to
        our{" "}
        <span className="font-semibold text-[#FF6F91] cursor-pointer">
          Terms
        </span>{" "}
        &
        <span className="font-semibold text-[#FF6F91] cursor-pointer">
          {" "}Privacy Policy
        </span>
      </p>
    </form>
  );
}

export default SignupSection;