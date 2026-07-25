import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

import AuthInput from "./AuthInput";
import { login, loginWithGoogle } from "../../services/auth/authService";
import useAuth from "../../hooks/useAuth";

function LoginSection() {
  const { refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [customError, setCustomError] = useState("");

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
      setCustomError("");
      await login(data.email.trim(), data.password);
      await redirectUser();
      toast.success("Welcome back 🌸");
    } catch (error) {
      setCustomError("Invalid email or password. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setGoogleLoading(true);
      setCustomError("");
      await loginWithGoogle();
      await redirectUser();
      toast.success("Logged in successfully.");
    } catch (error) {
      setCustomError("Google sign-in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      {customError && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 shadow-sm animate-fadeIn">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
          <div className="flex-1 font-medium">
            {customError}
          </div>
        </div>
      )}

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
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
          required: "Password is required",
        })}
        error={errors.password?.message}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />

      <div className="flex justify-end pt-0.5">
        <Link
          to="/forgot-password"
          className="text-xs font-semibold text-purple-400 hover:text-purple-600"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading || googleLoading}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#D8B4E2] text-xs font-bold text-white transition-transform duration-200 hover:bg-[#cd9fe0] active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            Logging in...
          </>
        ) : (
          <>
            Login <ArrowRight size={14} />
          </>
        )}
      </button>

      <div className="relative flex items-center justify-center py-1">
        <div className="w-full border-t border-gray-100" />
        <span className="absolute bg-white px-2 text-[10px] font-medium text-gray-400">
          or continue with
        </span>
      </div>

      <div>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white text-[11px] font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="h-3.5 w-3.5"
          />
          Continue with Google
        </button>
      </div>

      <p className="pt-1 text-center text-[10px] text-gray-400">
        By continuing, you agree to our{" "}
        <a href="#terms" className="font-semibold text-purple-400 hover:underline">
          Terms
        </a>{" "}
        and{" "}
        <a href="#privacy" className="font-semibold text-purple-400 hover:underline">
          Privacy
        </a>
      </p>
    </form>
  );
}

export default LoginSection;