import { CheckCircle2, Circle } from "lucide-react";

function PasswordStrength({ password = "" }) {
  // If no password is typed, render nothing
  if (!password || password.length === 0) {
    return null;
  }

  const rules = [
    { label: "8+ chars", valid: password.length >= 8 },
    { label: "Uppercase", valid: /[A-Z]/.test(password) },
    { label: "Lowercase", valid: /[a-z]/.test(password) },
    { label: "Number", valid: /\d/.test(password) },
    { label: "Special char", valid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];

  const passed = rules.filter((r) => r.valid).length;
  const strength = 
    passed <= 2 ? { text: "Weak", color: "text-red-400" } :
    passed <= 4 ? { text: "Medium", color: "text-amber-500" } : 
    { text: "Strong", color: "text-purple-600" };

  return (
    <div className="mt-2 rounded-2xl bg-[#F7F2FA] p-3 transition-all duration-200">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-gray-700">Password Strength</span>
        <span className={`text-[11px] font-bold ${strength.color}`}>{strength.text}</span>
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
        {rules.map((rule) => (
          <div key={rule.label} className="flex items-center gap-1.5">
            {rule.valid ? (
              <CheckCircle2 size={13} className="text-purple-500 shrink-0" />
            ) : (
              <Circle size={13} className="text-gray-300 shrink-0" />
            )}
            <span className={`text-[10px] ${rule.valid ? "font-medium text-purple-700" : "text-gray-500"}`}>
              {rule.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PasswordStrength;