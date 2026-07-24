import { motion } from "framer-motion";
import { ArrowRight, Heart, Sparkles, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

const besties = [
  { id: 1, color: "bg-[#f6c9e0]" },
  { id: 2, color: "bg-[#c9b8f0]" },
  { id: 3, color: "bg-[#f7d9b0]" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Subtle grain/paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative Background blobs */}
      <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#f5e7ff] blur-3xl opacity-60" />
      <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-[#f7efff] blur-3xl opacity-60" />

      {/* Floating tiny petals / stars scattered around the section */}
      <motion.span
        animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[18%] text-2xl opacity-70"
      >
        🌸
      </motion.span>
      <motion.span
        animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute left-[42%] top-[6%] text-lg opacity-60"
      >
        ✦
      </motion.span>
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute left-[20%] bottom-[12%] text-xl opacity-50"
      >
        ✿
      </motion.span>

      {/* Bottom gradient transition into the next section's lavender wash */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#faf7ff]" />

      <div className="relative z-10 mx-auto grid min-h-[680px] max-w-[1380px] items-center gap-16 px-6 lg:grid-cols-2 lg:px-8 xl:px-10">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex rounded-xl bg-[#f4e8ff] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-800">
              Handmade • Heartmade
            </span>

            {/* Rotated sticker badge */}
            <span className="inline-flex -rotate-6 items-center rounded-xl bg-black px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
              100% Handmade
            </span>
          </div>

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
            Handmade pipe cleaner flowers, bouquets, keychains and more —
            crafted to make every moment special.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <NavLink
              to="/shop"
              className="group inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Shop Now
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </NavLink>

            <NavLink
              to="/shop"
              className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black"
            >
              Explore Collections
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </NavLink>
          </div>

          {/* Social proof: rating + avatars */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-3">
              {besties.map((b) => (
                <div
                  key={b.id}
                  className={`h-9 w-9 rounded-full border-2 border-white ${b.color}`}
                />
              ))}
            </div>

            <div className="h-8 w-px bg-gray-200" />

            <div>
              <div className="flex items-center gap-1 text-[#f4b400]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
                <span className="ml-1 text-sm font-bold text-black">4.9</span>
              </div>
              <p className="text-sm text-gray-500">Loved by 1,000+ customers</p>
            </div>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Solid blob backdrop directly behind the image */}
          <div className="absolute right-0 top-6 h-[85%] w-[85%] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-[#f2e3ff]" />

          <Sparkles
            className="absolute -top-2 right-6 text-black/70"
            size={30}
            strokeWidth={1.5}
          />

          {/* Since 2025 ribbon badge */}
          <div className="absolute -left-3 top-8 z-20 -rotate-12">
            <div className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#8d5fd3] shadow-lg">
              Since 2025 ✦
            </div>
          </div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[520px]"
          >
            {/* Product image placeholder — replace src with your real bouquet photo */}
            <div className="flex aspect-[4/5] items-center justify-center rounded-[32px] bg-gradient-to-br from-[#f7ebff] via-[#fff] to-[#f1e4ff] shadow-[0_30px_80px_rgba(170,120,240,0.18)]">
              {/* <img src="/images/hero-bouquet.jpg" alt="Tulip bouquet" className="h-full w-full rounded-[32px] object-cover" /> */}
              <div className="text-center">
                <p className="text-7xl">💐</p>
                <p className="mt-4 font-medium text-[#9f7aea]">Bouquet Image</p>
              </div>
            </div>

            {/* Decorative tag text */}
            <div className="absolute right-6 top-10 text-right opacity-70">
              <p className="text-xs font-light italic text-gray-600">cute</p>
              <p className="text-xs font-light italic text-gray-600">handmade</p>
              <p className="text-xs font-light italic text-gray-600">forever ♡</p>
            </div>

            {/* Small review card overlapping the image */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 z-20 rounded-2xl bg-white px-5 py-4 shadow-xl"
            >
              <div className="flex items-center gap-1 text-[#f4b400]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-1 text-xs font-semibold text-black">4.9 · 1,000+ happy orders</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;