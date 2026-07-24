import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import AuthInput from "./AuthInput";
import { login, loginWithGoogle } from "../../services/auth/authService";
import useAuth from "../../hooks/useAuth";

function LoginSection() {
  const { refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      await login(data.email.trim(), data.password);
      await redirectUser();
      toast.success("Welcome back 🌸");
    } catch (error) {
      toast.error(error.message || "Login failed.");
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
      toast.error(error.message || "Google Sign-In failed.");
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#D8B4E2] text-sm font-bold text-white transition-transform duration-200 hover:bg-[#cd9fe0] active:scale-[0.99] disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Logging in...
          </>
        ) : (
          <>
            Login <ArrowRight size={16} />
          </>
        )}
      </button>

      <div className="relative flex items-center justify-center py-2">
        <div className="w-full border-t border-gray-100" />
        <span className="absolute bg-white px-3 text-[11px] font-medium text-gray-400">
          or continue with
        </span>
      </div>

      <div className="space-y-2.5">
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="flex h-11 w-full items-center justify-center gap-2.5 rounded-2xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="h-4 w-4"
          />
          Continue with Google
        </button>

        <button
          type="button"
          className="flex h-11 w-full items-center justify-center gap-2.5 rounded-2xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.32c.62-.75 1.04-1.8 0.92-2.84-.9.04-2 0.6-2.65 1.36-.58.67-1.09 1.75-.95 2.78 1.01.08 2.05-.55 2.68-1.3" />
          </svg>
          Continue with Apple
        </button>
      </div>

      <p className="pt-2 text-center text-[11px] text-gray-400">
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