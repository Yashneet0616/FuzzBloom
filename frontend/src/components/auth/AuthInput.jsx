import { Eye, EyeOff } from "lucide-react";

function AuthInput({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  register,
  error,
  showPassword,
  setShowPassword,
  ...props
}) {
  const isPassword = type === "password";

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-semibold text-gray-800">
          {label}
        </label>
      )}

      <div
        className={`flex h-11 items-center rounded-2xl border bg-[#FAFAFA] px-3.5 transition-all duration-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-purple-200 ${
          error ? "border-red-300" : "border-gray-200 focus-within:border-purple-400"
        }`}
      >
        {Icon && <Icon size={16} className="mr-2.5 shrink-0 text-gray-400" />}

        <input
          {...register}
          {...props}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="h-full w-full bg-transparent text-xs text-gray-800 outline-none placeholder:text-gray-400 sm:text-sm"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 shrink-0 text-gray-400 transition hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>

      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

export default AuthInput;