import { motion } from "framer-motion";
import { ArrowRight, Heart, Leaf, Gift, HeartHandshake } from "lucide-react";
import { NavLink } from "react-router-dom";

const categories = [
  {
    title: "BOUQUETS",
    subtitle: "make their day 💜",
    color: "from-[#f2ddff] to-[#e9caff]",
    emoji: "💐",
    span: "sm:row-span-2", // tall
  },
  {
    title: "FLOWERS",
    subtitle: "little blooms, big joy",
    color: "from-[#ffd9e6] to-[#ffe3ee]",
    emoji: "🌷",
    span: "", // square
  },
  {
    title: "KEYCHAINS",
    subtitle: "carry your vibe everywhere",
    color: "from-[#e2f4d9] to-[#eefbe6]",
    emoji: "🧸",
    span: "sm:col-span-2", // wide
  },
  {
    title: "DECOR & MORE",
    subtitle: "for your space & more",
    color: "from-[#fff1cf] to-[#fff8e6]",
    emoji: "🌸",
    span: "rounded-[50%_50%_45%_55%/55%_45%_55%_45%]", // curved silhouette
  },
];

const features = [
  { title: "100% Handmade", description: "crafted with love", icon: HeartHandshake },
  { title: "Eco-Friendly", description: "safe for you & the planet", icon: Leaf },
  { title: "Perfect for Gifting", description: "for every emotion & occasion", icon: Gift },
  { title: "Made to Last", description: "timeless keepsakes, not just things", icon: Heart },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Categories = () => {
  return (
    <section className="relative overflow-hidden bg-[#faf7ff] py-24">
      {/* Background decorations */}
      <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-[#f3e4ff] blur-3xl opacity-70" />
      <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-[#fdeaf5] blur-3xl opacity-60" />
      <span className="absolute left-[6%] top-[10%] text-lg text-[#d9b8f2] opacity-60">✦</span>
      <span className="absolute right-[10%] bottom-[8%] text-xl text-[#f2b8d9] opacity-50">✿</span>

      <div className="relative mx-auto max-w-[1380px] px-6 lg:px-8 xl:px-10">
        {/* Heading */}
        <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              what's your
            </p>
            <h2 className="mt-2 text-4xl font-black text-black lg:text-5xl">
              <span className="relative inline-block">
                pick
                <span className="absolute -bottom-1 left-0 h-2 w-full -rotate-1 rounded-full bg-[#e3c8ff]/70" />
              </span>{" "}
              <span className="relative">today?</span> 🌸
            </h2>
            <p className="mt-3 max-w-md text-sm text-gray-500">
              Handpicked collections, made just for you.
            </p>
          </div>

          <NavLink
            to="/shop"
            className="group inline-flex items-center gap-2 font-semibold text-black"
          >
            View all
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </NavLink>
        </div>

        {/* Bento-style Category Cards — staggered reveal */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid auto-rows-[220px] gap-6 sm:grid-cols-4"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={item} className={`group ${category.span}`}>
              <NavLink
                to="/shop"
                className={`relative flex h-full flex-col justify-end overflow-hidden rounded-3xl bg-gradient-to-br p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_25px_60px_rgba(141,95,211,0.25)] ${category.color}`}
              >
                {/* Product image placeholder — replace with real category photo */}
                <span className="absolute inset-x-0 top-6 text-center text-6xl transition-transform duration-500 group-hover:scale-125">
                  {category.emoji}
                </span>

                <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-black/0 to-black/0 transition-colors duration-300 group-hover:from-black/10" />

                <div className="relative z-10">
                  <h3 className="text-sm font-extrabold tracking-wide text-black">
                    {category.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-700">{category.subtitle}</p>
                </div>

                <div className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-md transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:shadow-lg">
                  <ArrowRight size={16} />
                </div>
              </NavLink>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Strip */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 divide-y divide-[#f0e5fc] rounded-3xl border border-[#f0e5fc] bg-white/60 backdrop-blur-sm lg:grid-cols-4 lg:divide-y-0 lg:divide-x"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-center gap-5 px-7 py-8">
                <Icon size={28} strokeWidth={1.5} className="shrink-0 text-black" />
                <div>
                  <p className="text-sm font-bold text-black">{feature.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-gray-500">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;