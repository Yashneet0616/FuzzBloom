import {
  CheckCircle2,
  Circle,
} from "lucide-react";

function PasswordStrength({ password = "" }) {
  const rules = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const passed = rules.filter((rule) => rule.valid).length;

  const getStrength = () => {
    if (password.length === 0)
      return {
        text: "",
        color: "",
      };

    if (passed <= 2)
      return {
        text: "Weak",
        color: "text-red-500",
      };

    if (passed === 3 || passed === 4)
      return {
        text: "Medium",
        color: "text-yellow-500",
      };

    return {
      text: "Strong",
      color: "text-green-600",
    };
  };

  const strength = getStrength();

  return (
    <div className="mt-4 rounded-2xl bg-rose-50 p-4">

      {strength.text && (
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Password Strength
          </span>

          <span
            className={`text-sm font-semibold ${strength.color}`}
          >
            {strength.text}
          </span>
        </div>
      )}

      <div className="space-y-2">
        {rules.map((rule) => (
          <div
            key={rule.label}
            className="flex items-center gap-2"
          >
            {rule.valid ? (
              <CheckCircle2
                size={18}
                className="text-green-500"
              />
            ) : (
              <Circle
                size={18}
                className="text-gray-300"
              />
            )}

            <span
              className={`text-sm ${
                rule.valid
                  ? "text-green-700"
                  : "text-gray-500"
              }`}
            >
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PasswordStrength;