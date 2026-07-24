import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Decorative Background */}
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#f5e7ff] blur-3xl opacity-60" />
      <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-[#f7efff] blur-3xl opacity-60" />

      <div className="relative z-10 mx-auto grid min-h-[720px] max-w-[1380px] items-center gap-16 px-6 py-16 lg:grid-cols-2 lg:px-8 xl:px-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex rounded-full bg-[#f4e8ff] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8d5fd3]">
            Handmade • Heartmade
          </span>

          <h1 className="mt-8 text-5xl font-black leading-tight text-black lg:text-6xl xl:text-7xl">
            not just flowers,
            <br />
            <span className="bg-gradient-to-r from-[#d48be9] to-[#9f7aea] bg-clip-text text-transparent">
              pure feelings
            </span>

            <Heart
              className="ml-3 inline text-[#d48be9]"
              fill="#d48be9"
              size={42}
              strokeWidth={1.5}
            />
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-gray-600">
            Handmade pipe cleaner flowers, bouquets, keychains and thoughtful
            gifts crafted to celebrate every special moment.
          </p>

          <div className="mt-10 flex flex-wrap gap-5">
            <NavLink
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 font-semibold text-white transition hover:scale-105"
            >
              Shop Now
              <ArrowRight size={18} />
            </NavLink>

            <NavLink
              to="/shop"
              className="group inline-flex items-center gap-2 font-semibold text-black"
            >
              Explore Collection
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </NavLink>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-[520px]"
          >
            {/* Placeholder */}
            <div className="flex aspect-[4/5] items-center justify-center rounded-[40px] bg-gradient-to-br from-[#f7ebff] via-[#fff] to-[#f1e4ff] shadow-[0_30px_80px_rgba(170,120,240,0.18)]">
              <div className="text-center">
                <p className="text-7xl">💐</p>
                <p className="mt-4 font-medium text-[#9f7aea]">
                  Bouquet Image
                </p>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-2xl bg-white px-6 py-4 shadow-xl"
            >
              <p className="text-xs text-gray-500">
                handcrafted with love
              </p>

              <p className="mt-1 font-bold text-[#8d5fd3]">
                FuzzBloom
              </p>
            </motion.div>

            {/* Decorative Text */}
            <div className="absolute right-2 top-10 text-right">
              <p className="text-sm font-medium text-gray-700">
                cute
              </p>
              <p className="text-sm font-medium text-gray-700">
                handmade
              </p>
              <p className="text-sm font-medium text-gray-700">
                forever ♡
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;