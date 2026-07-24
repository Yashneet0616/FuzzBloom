import { Heart } from "lucide-react";
import flowersImg from "../../assets/auth/flowers.png";

function AuthLayout({ isLogin, children }) {
  return (
    <div
      className="flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#F5EEF8] to-[#EDE4F0] p-4 sm:p-6"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Card Container */}
      <div className="relative flex h-full max-h-[720px] w-full max-w-[1040px] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_20px_60px_rgba(150,115,170,0.15)] sm:rounded-[36px] lg:h-[680px] lg:flex-row">
        
        {/* LEFT PANEL - Form */}
        <div className="flex h-full w-full flex-col p-6 sm:p-8 lg:w-1/2 lg:p-10">
          
          {/* MOBILE ONLY LOGO */}
          <div className="mb-3 flex-none lg:hidden">
            <h1 className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-[#1A1A1A]">
              FuzzBloom <span className="text-sm font-medium text-purple-400">🌸</span>
            </h1>
            <p className="text-[10px] font-medium tracking-wide text-gray-400">
              pipe cleaner magic ✨
            </p>
          </div>

          {/* Internal Scrollable Form Area */}
          <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto flex w-full max-w-[380px] flex-col py-6">
              
              <div className="mb-3">
                <h2 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-[#1A1A1A] sm:text-4xl">
                  {isLogin ? "let’s get" : "create"} <br />
                  <span className="text-[#C89BD6]">{isLogin ? "started ♡" : "account ♡"}</span>
                </h2>
              </div>

              {/* Injects the Login/Signup Forms */}
              <div className="w-full">
                {children}
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT PANEL - Image (Clean background image with text removed) */}
        <div className="relative hidden h-full w-full flex-col p-10 lg:flex lg:w-1/2">
          
          {/* Full-bleed Background Image */}
          <img
            src={flowersImg}
            alt="Handmade Pipe Cleaner Bouquet"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

        </div>

      </div>
    </div>
  );
}

export default AuthLayout;