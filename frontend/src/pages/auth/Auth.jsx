import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import LoginSection from "../../components/auth/LoginSection";
import SignupSection from "../../components/auth/SignupSection";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthLayout
      title={
        isLogin
          ? "Welcome Back 🌸"
          : "Create Account 💕"
      }
      subtitle={
        isLogin
          ? "Sign in to continue shopping."
          : "Join FuzzBloom and start spreading happiness."
      }
    >
      {/* Toggle */}

      <div className="mb-8">

        <div className="relative flex rounded-2xl bg-[#FFE7EE] p-1 shadow-inner">

          {/* Sliding Pill */}

          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-lg"
            animate={{
              x: isLogin ? 0 : "100%",
            }}
          />

          <button
            onClick={() => setIsLogin(true)}
            className={`relative z-10 flex-1 rounded-xl py-3 text-sm font-semibold transition ${
              isLogin
                ? "text-[#FF5F87]"
                : "text-[#8A8085]"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`relative z-10 flex-1 rounded-xl py-3 text-sm font-semibold transition ${
              !isLogin
                ? "text-[#FF5F87]"
                : "text-[#8A8085]"
            }`}
          >
            Sign Up
          </button>

        </div>

      </div>

      {/* Form */}

      <AnimatePresence mode="wait">

        <motion.div
          key={isLogin ? "login" : "signup"}
          initial={{
            opacity: 0,
            x: isLogin ? -25 : 25,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: isLogin ? 25 : -25,
          }}
          transition={{
            duration: .35,
          }}
        >
          {isLogin ? (
            <LoginSection />
          ) : (
            <SignupSection />
          )}
        </motion.div>

      </AnimatePresence>

    </AuthLayout>
  );
}

export default Auth;