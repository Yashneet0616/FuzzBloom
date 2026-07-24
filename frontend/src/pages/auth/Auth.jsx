import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import AuthLayout from "../../components/auth/AuthLayout";
import LoginSection from "../../components/auth/LoginSection";
import SignupSection from "../../components/auth/SignupSection";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout isLogin={isLogin}>
      
      {/* Toggle Pill */}
      <div className="mb-5">
        <div className="relative flex rounded-full bg-[#F4EBF7] p-1.5">
          <motion.div
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-[#D8B4E2] shadow-sm"
            animate={{ x: isLogin ? 0 : "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`relative z-10 flex-1 py-2 text-center text-xs font-semibold transition-colors duration-200 ${
              isLogin ? "text-white" : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`relative z-10 flex-1 py-2 text-center text-xs font-semibold transition-colors duration-200 ${
              !isLogin ? "text-white" : "text-gray-700 hover:text-gray-900"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Form Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
          transition={{ duration: 0.15 }}
        >
          {isLogin ? <LoginSection /> : <SignupSection />}
        </motion.div>
      </AnimatePresence>

    </AuthLayout>
  );
}

export default Auth;