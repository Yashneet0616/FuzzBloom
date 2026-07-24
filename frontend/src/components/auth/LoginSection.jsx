import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

import AuthInput from "./AuthInput";

import {
  login,
  loginWithGoogle,
} from "../../services/auth/authService";

import useAuth from "../../hooks/useAuth";

function LoginSection() {
  const { refreshProfile } = useAuth();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] =
    useState(false);
  const [showPassword, setShowPassword] =
    useState(false);
  const [capsLock, setCapsLock] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function redirectUser() {
    const profile = await refreshProfile();

    if (profile?.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else {
      window.location.href = "/";
    }
  }

  async function onSubmit(data) {
    try {
      setLoading(true);

      await login(
        data.email.trim(),
        data.password
      );

      await redirectUser();

      toast.success("Welcome back 🌸");
    } catch (error) {
      toast.error(
        error.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setGoogleLoading(true);

      await loginWithGoogle();

      await redirectUser();

      toast.success("Logged in successfully.");
    } catch (error) {
      toast.error(
        error.message ||
          "Google Sign-In failed."
      );
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
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
        placeholder="Enter your password"
        icon={Lock}
        register={register("password", {
          required:
            "Password is required",
        })}
        error={errors.password?.message}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        onKeyUp={(e) =>
          setCapsLock(
            e.getModifierState(
              "CapsLock"
            )
          )
        }
      />

      {capsLock && (
        <div className="flex items-center gap-2 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-700">
          <AlertTriangle size={18} />
          Caps Lock is ON
        </div>
      )}

      <div className="flex justify-end">
        <Link
          to="/forgot-password"
          className="text-sm font-medium text-[#FF6F91] hover:text-[#ff4d79]"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={
          loading || googleLoading
        }
        className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#FF6F91] font-semibold text-white shadow-lg shadow-pink-200 transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff5d83] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-pink-100" />

        <span className="text-xs font-semibold uppercase tracking-[4px] text-pink-400">
          OR
        </span>

        <div className="h-px flex-1 bg-pink-100" />
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={
          loading || googleLoading
        }
        className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-pink-100 bg-pink-50 font-medium transition-all duration-300 hover:-translate-y-1 hover:bg-pink-100"
      >
        {googleLoading ? (
          <>
            <Loader2 className="animate-spin" />
            Signing In...
          </>
        ) : (
          <>
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-5 w-5"
            />

            Continue with Google
          </>
        )}
      </button>

      <p className="pt-2 text-center text-sm text-gray-500">
        New to FuzzBloom?{" "}
        <span className="font-semibold text-[#FF6F91]">
          Create an account above 🌸
        </span>
      </p>
    </form>
  );
}

export default LoginSection;