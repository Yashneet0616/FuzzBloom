import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { Mail, Lock, User, Phone, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

import AuthInput from "./AuthInput";
import PasswordStrength from "./PasswordStrength";
import { signup, loginWithGoogle } from "../../services/auth/authService";
import useAuth from "../../hooks/useAuth";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrorMessages";

const COUNTRY_CODES = [
  { code: "+91", country: "IN", flag: "🇮🇳" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+1", country: "CA", flag: "🇨🇦" },
  { code: "+61", country: "AU", flag: "🇦🇺" },
  { code: "+65", country: "SG", flag: "🇸🇬" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
];

function SignupSection() {
  const navigate = useNavigate();
  const { refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [customError, setCustomError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    password,
  } = useWatch({ control });

  const passwordValue = password || "";

  const selectedCountryData =
    COUNTRY_CODES.find((c) => c.country === selectedCountry) ??
    COUNTRY_CODES[0];

  async function redirectUser() {
    const profile = await refreshProfile();
    if (profile?.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  }

  async function onSubmit(data) {
    try {
      setLoading(true);
      setCustomError("");
      const fullPhoneNumber = `${selectedCountryData.code}${data.phone.trim()}`;
      await signup({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: fullPhoneNumber.trim(),
        email: data.email.trim(),
        password: data.password,
      });
      toast.success("Welcome to FuzzBloom 🌸");
      await redirectUser();
    } catch (error) {
      const errMsg = getFirebaseErrorMessage(error.code);
      setCustomError(errMsg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setGoogleLoading(true);
      setCustomError("");
      await loginWithGoogle();
      toast.success("Welcome to FuzzBloom 🌸");
      await redirectUser();
    } catch (error) {
      const errMsg = getFirebaseErrorMessage(error.code);
      setCustomError(errMsg);
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
      {customError && (
        <div 
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 shadow-sm animate-fadeIn"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
          <div className="flex-1 font-medium">
            {customError}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2.5">
        <AuthInput
          label="First Name"
          type="text"
          placeholder="Enter first name"
          icon={User}
          disabled={loading || googleLoading}
          autoComplete="given-name"
          register={register("firstName", {
            required: "First name is required",
            pattern: {
              value: /^[A-Za-z\s'-]{2,50}$/,
              message: "Enter a valid name",
            },
            onChange: () => {
              if (customError) setCustomError("");
            },
          })}
          error={errors.firstName?.message}
        />

        <AuthInput
          label="Last Name"
          type="text"
          placeholder="Enter last name"
          icon={User}
          disabled={loading || googleLoading}
          autoComplete="family-name"
          register={register("lastName", {
            required: "Last name is required",
            pattern: {
              value: /^[A-Za-z\s'-]{2,50}$/,
              message: "Enter a valid name",
            },
            onChange: () => {
              if (customError) setCustomError("");
            },
          })}
          error={errors.lastName?.message}
        />
      </div>

      {/* Phone Number with Country Code Dropdown */}
      <div className="space-y-1">
        <label className="block text-xs font-semibold text-gray-800">Phone Number</label>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center gap-1 border-r border-gray-200 pr-2">
            <span className="text-xs">
              {selectedCountryData.flag}
            </span>
            <select
              value={selectedCountry}
              disabled={loading || googleLoading}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                if (customError) setCustomError("");
              }}
              className="bg-transparent text-xs font-semibold text-gray-700 focus:outline-none cursor-pointer disabled:opacity-50"
            >
              {COUNTRY_CODES.map((item, index) => (
                <option key={`${item.code}-${item.country}-${index}`} value={item.country}>
                  {item.code}
                </option>
              ))}
            </select>
          </div>

          <input
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={15}
            placeholder="Enter phone number"
            disabled={loading || googleLoading}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^\d{7,15}$/,
                message: "Enter a valid phone number",
              },
              onChange: () => {
                if (customError) setCustomError("");
              },
            })}
            className="flex h-11 w-full rounded-2xl border border-gray-200 bg-[#FAFAFA] pl-24 pr-3.5 text-xs text-gray-800 placeholder:text-gray-400 shadow-sm transition focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-200 disabled:opacity-50 sm:text-sm"
          />
        </div>
        {errors.phone && (
          <p className="text-[11px] text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <AuthInput
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        disabled={loading || googleLoading}
        autoComplete="email"
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
          onChange: () => {
            if (customError) setCustomError("");
          },
        })}
        error={errors.email?.message}
      />

      <div className="space-y-1">
        <AuthInput
          label="Password"
          type="password"
          placeholder="Create a strong password"
          icon={Lock}
          disabled={loading || googleLoading}
          autoComplete="new-password"
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            onChange: () => {
              if (customError) setCustomError("");
            },
          })}
          error={errors.password?.message}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <PasswordStrength password={passwordValue} />
      </div>

      {passwordValue.length >= 8 && (
        <AuthInput
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          icon={Lock}
          disabled={loading || googleLoading}
          autoComplete="new-password"
          register={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
            onChange: () => {
              if (customError) setCustomError("");
            },
          })}
          error={errors.confirmPassword?.message}
          showPassword={showConfirmPassword}
          setShowPassword={setShowConfirmPassword}
        />
      )}

      <button
        type="submit"
        disabled={loading || googleLoading}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#D8B4E2] text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-[#cd9fe0] hover:shadow-lg active:scale-[0.99] disabled:opacity-65 sm:text-sm"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={16} />
            Creating account...
          </>
        ) : (
          <>
            Create Account <ArrowRight size={14} />
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
          className="flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-65 sm:text-sm"
        >
          {googleLoading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Signing in...
            </>
          ) : (
            <>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-4 w-4"
              />
              Continue with Google
            </>
          )}
        </button>
      </div>

      <p className="text-center text-[11px] text-gray-400 pt-1">
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

export default SignupSection;