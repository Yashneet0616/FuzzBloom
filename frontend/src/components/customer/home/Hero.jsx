import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { NavLink } from "react-router-dom";
import heroImage from "../../../assets/home/hero.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-20 min-h-[calc(100vh-96px)] flex items-center">
      {/* Subtle grain/paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative Background blobs */}
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#f5e7ff] blur-3xl opacity-60" />
      <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-[#f7efff] blur-3xl opacity-60" />

      {/* Floating tiny sparkles / stars scattered around the section */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[18%] text-[#d48be9] opacity-70"
      >
        <Sparkles size={20} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute left-[42%] top-[6%] text-[#9f7aea] opacity-60 text-lg"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[20%] bottom-[12%] text-[#d48be9] opacity-50 text-xl"
      >
        ✦
      </motion.div>

      {/* Floating petals near the bouquet */}
      <motion.span
        animate={{ y: [0, 12, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        className="absolute right-[48%] top-[25%] text-xl opacity-80 z-20 pointer-events-none"
      >
        🌸
      </motion.span>
      <motion.span
        animate={{ y: [0, -10, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute right-[6%] bottom-[20%] text-lg opacity-70 z-20 pointer-events-none"
      >
        ✿
      </motion.span>

      {/* Bottom gradient transition into the next section's lavender wash */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#faf7ff]" />

      <div className="relative z-10 mx-auto grid max-w-[1380px] items-center gap-16 px-6 lg:grid-cols-2 lg:px-8 xl:px-10 w-full">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <span className="inline-flex rounded-xl bg-[#f4e8ff] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-800">
              Handmade • Heartmade
            </span>
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-black lg:text-6xl xl:text-7xl">
            not just flowers,
            <br />
            <span className="bg-gradient-to-r from-[#d48be9] to-[#9f7aea] bg-clip-text text-transparent">
              pure feelings
            </span>

            <Heart
              className="ml-3 inline text-[#d48be9]"
              fill="#d48be9"
              size={36}
              strokeWidth={1.5}
            />
          </h1>

          <p className="mt-6 max-w-[430px] text-[15px] leading-7 text-gray-600">
            Handmade pipe cleaner flowers, bouquets, keychains and more —
            crafted to make every moment special.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <NavLink
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Shop Now
            </NavLink>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Organic blob backdrop behind the bouquet */}
          <div className="absolute right-2 top-8 h-[90%] w-[90%] rounded-[46%_54%_60%_40%/45%_40%_60%_55%] bg-[#f2e3ff]" />

          <Sparkles
            className="absolute -top-2 right-6 text-black/70"
            size={30}
            strokeWidth={1.5}
          />

          {/* Hand-drawn SVG strokes & curves around bouquet */}
          <svg className="absolute -left-6 top-1/4 w-12 h-12 text-black/40 pointer-events-none z-20" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M 10 40 Q 30 20 40 10 M 30 10 L 40 10 L 40 20" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <svg className="absolute -right-2 bottom-1/3 w-10 h-10 text-purple-400/60 pointer-events-none z-20" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M 5 20 Q 20 5 35 25" strokeLinecap="round"/>
          </svg>

          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[520px]"
          >
            {/* Product image container */}
            <div className="flex aspect-[4/5] items-center justify-center rounded-[32px] shadow-[0_40px_100px_rgba(179,122,240,.28)] overflow-hidden p-0">
              <img
                src={heroImage}
                alt="Handmade bouquet"
                loading="eager"
                fetchPriority="high"
                className="h-full w-full object-contain drop-shadow-md"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;