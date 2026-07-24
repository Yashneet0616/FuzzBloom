import {
  Heart,
  Sparkles,
  Gift,
  Leaf,
  Scissors,
} from "lucide-react";

function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      className="min-h-screen overflow-hidden px-4 py-6 lg:px-10"
      style={{
        background:
          "linear-gradient(135deg,#FFF7F4 0%,#FFFDFB 55%,#FFF6FA 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Floating Background */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-pink-200/30 blur-3xl" />

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-rose-100/40 blur-3xl" />

        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-100/30 blur-3xl" />

      </div>

      <div className="relative mx-auto flex min-h-[92vh] max-w-[1500px] overflow-hidden rounded-[40px] bg-[#FFFDFC] shadow-[0_30px_80px_rgba(255,111,145,.15)]">

        {/* LEFT */}

        <div className="relative hidden w-[45%] overflow-hidden bg-[#FFECEF] lg:flex lg:flex-col lg:justify-between">

          {/* Tape */}

          <div className="absolute left-10 top-8 h-8 w-24 -rotate-6 rounded-md bg-white/50 backdrop-blur" />

          {/* Hearts */}

          <Heart
            size={18}
            className="absolute left-16 top-28 rotate-12 text-pink-300"
          />

          <Sparkles
            size={18}
            className="absolute right-20 top-24 text-amber-300"
          />

          <Heart
            size={14}
            className="absolute bottom-32 left-20 text-rose-300"
          />

          {/* Content */}

          <div className="relative z-10 px-14 pt-14">

            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-wider text-rose-500 shadow">
              HANDMADE • PIPE CLEANER FLOWERS
            </span>

            <h1
              className="mt-8 text-6xl leading-none text-[#343434]"
              style={{
                fontFamily:
                  "'Baloo 2', cursive",
              }}
            >
              FuzzBloom
            </h1>

            <p className="mt-6 max-w-md text-2xl font-semibold leading-relaxed text-[#4F4F4F]">
              Handmade flowers,
              <br />
              Happy hearts.
            </p>

            <p className="mt-6 max-w-md leading-8 text-[#7A7A7A]">
              Beautiful pipe cleaner flowers
              handcrafted with care for gifts,
              birthdays, anniversaries and
              special memories.
            </p>

          </div>

          {/* Flower Image */}

          <div className="relative flex flex-1 items-center justify-center px-10">

            <div className="absolute h-[430px] w-[430px] rounded-full bg-white/50 blur-2xl" />

            <img
              src="/src/assets/auth/flowers.png"
              alt="Flowers"
              className="relative z-10 max-h-[470px] object-contain drop-shadow-2xl transition duration-500 hover:scale-105"
            />

          </div>

          {/* Bottom */}

          <div className="z-10 px-12 pb-12">

            <div className="rounded-[28px] bg-white p-6 shadow-lg">

              <h3
                className="text-2xl text-[#333]"
                style={{
                  fontFamily:
                    "'Baloo 2', cursive",
                }}
              >
                Thank you 💌
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-500">
                Every bouquet is carefully
                handcrafted to bring a smile to
                someone special.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-rose-500">

                  <Scissors size={16} />

                  Handmade

                </div>

                <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-600">

                  <Leaf size={16} />

                  Eco Friendly

                </div>

                <div className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-500">

                  <Gift size={16} />

                  Ready to Gift

                </div>

              </div>

            </div>

          </div>

        </div>
                  {/* RIGHT */}

          <div className="flex w-full items-center justify-center bg-[#FFFDFC] px-6 py-10 lg:w-[55%] lg:px-16">

            <div className="w-full max-w-md">

              {/* Mobile Header */}

              <div className="mb-10 text-center lg:hidden">

                <h1
                  className="text-5xl text-[#343434]"
                  style={{
                    fontFamily: "'Baloo 2', cursive",
                  }}
                >
                  FuzzBloom
                </h1>

                <p className="mt-3 text-gray-500">
                  Handmade flowers, Happy hearts.
                </p>

              </div>

              {/* Heading */}

              <h2
                className="text-5xl text-[#343434]"
                style={{
                  fontFamily: "'Baloo 2', cursive",
                }}
              >
                {title}
              </h2>

              <p className="mt-3 mb-8 text-[#777] leading-7">
                {subtitle}
              </p>

              {children}

            </div>

          </div>

        </div>

      </div>
  );
}

export default AuthLayout;