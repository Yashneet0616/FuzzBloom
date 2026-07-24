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
    <div className="space-y-2">

      <label className="block text-sm font-medium text-[#5B5551]">
        {label}
      </label>

      <div
        className={`group flex h-14 items-center rounded-2xl border bg-white px-5 transition-all duration-300 ${
          error
            ? "border-red-300"
            : "border-[#F1D8DD] hover:border-[#FF9DB3] focus-within:border-[#FF6F91] focus-within:shadow-[0_0_0_4px_rgba(255,111,145,.10)]"
        }`}
      >
        {Icon && (
          <Icon
            size={18}
            className="mr-3 text-[#FF8AA8]"
          />
        )}

        <input
          {...register}
          {...props}
          type={
            isPassword
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[15px] text-[#3E3E3E] placeholder:text-[#B4A6AB] outline-none"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="text-[#A08B93] transition hover:text-[#FF6F91]"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default AuthInput;