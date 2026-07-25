import { motion } from "framer-motion";
import { ArrowRight, Heart, Leaf, Gift, HeartHandshake } from "lucide-react";
import { NavLink } from "react-router-dom";

// Categories configuration with flatter radii, gradients, and custom positioning
const categories = [
  {
    title: "BOUQUETS",
    subtitle: "make their day 💜",
    image: "/images/bouquets.png",
    to: "/shop?category=bouquets",
    bgGradient: "bg-[linear-gradient(135deg,#efe1fb_0%,#ead8fb_45%,#f5eefe_100%)]",
    radius: "rounded-[42px_46px_44px_48px]", // 1. Flatter radii
    imageClass: "h-[190px] -top-7 left-1/2 -translate-x-1/2 -rotate-3",
  },
  {
    title: "FLOWERS",
    subtitle: "little blooms, big joy",
    image: "/images/flowers.png",
    to: "/shop?category=flowers",
    bgGradient: "bg-[linear-gradient(135deg,#ffdce8_0%,#ffd1df_45%,#ffe7ef_100%)]",
    radius: "rounded-[46px_42px_48px_44px]", // 1. Flatter radii
    imageClass: "h-[170px] top-0 left-1/2 -translate-x-1/2 rotate-2",
  },
  {
    title: "KEYCHAINS",
    subtitle: "carry your vibe everywhere",
    image: "/images/keychains.png",
    to: "/shop?category=keychains",
    bgGradient: "bg-[linear-gradient(135deg,#eef7d8_0%,#e7f2d2_45%,#f5fae8_100%)]",
    radius: "rounded-[44px_48px_42px_46px]", // 1. Flatter radii
    imageClass: "h-[160px] top-1 left-1/2 -translate-x-1/2 -rotate-4",
  },
  {
    title: "DECOR & MORE",
    subtitle: "for your space & more",
    image: "/images/decor.png",
    to: "/shop?category=decor",
    bgGradient: "bg-[linear-gradient(135deg,#fff3cf_0%,#ffefbf_45%,#fff7df_100%)]",
    radius: "rounded-[48px_44px_46px_42px]", // 1. Flatter radii
    imageClass: "h-[175px] -top-2 left-1/2 -translate-x-1/2 rotate-3",
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
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

// Subtle floral SVG icon
const FlowerIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M12 2.25a3.25 3.25 0 0 0-3.1 2.27 3.25 3.25 0 0 0-3.6 2.37 3.25 3.25 0 0 0-.25 4.28 3.25 3.25 0 0 0 .25 4.28 3.25 3.25 0 0 0 3.6 2.37 3.25 3.25 0 0 0 6.2 0 3.25 3.25 0 0 0 3.6-2.37 3.25 3.25 0 0 0 .25-4.28 3.25 3.25 0 0 0-.25-4.28 3.25 3.25 0 0 0-3.6-2.37A3.25 3.25 0 0 0 12 2.25Z"
      opacity="0.25"
    />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const Categories = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background ambient glow */}
      <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-[#f3e4ff] blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-[#fdeaf5] blur-3xl opacity-30 pointer-events-none" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-[1360px] px-6 lg:px-8 xl:px-10">
        
        {/* Heading Section */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-0 font-serif italic text-sm tracking-wide text-gray-500">
              what's your
            </p>
            <h2 className="mt-0.5 flex items-center gap-1 text-3xl lg:text-4xl">
              <span className="relative inline-block font-black text-black">
                pick
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#d19bf1] opacity-70"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M3,14 Q50,4 97,11"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              <span className="font-extrabold text-black/90">today?</span>
              <FlowerIcon className="inline-block h-5 w-5 text-[#d19bf1] ml-0.5" />
            </h2>
          </div>

          <NavLink
            to="/shop"
            className="group inline-flex items-center gap-1 text-[13px] font-normal text-black transition-opacity hover:opacity-75"
          >
            View all
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </NavLink>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category) => (
            <motion.div key={category.title} variants={item}>
              <NavLink
                to={category.to}
                /* 2. Soft inner highlight overlay via before pseudo-element
                   3. Soft lavender hover shadow
                   Optional Polish: transition-transform duration-500 ease-out */
                className={`group relative flex h-[220px] flex-col justify-end px-6 pb-5 overflow-hidden 
                  transition-transform duration-500 ease-out hover:-translate-y-1 
                  hover:shadow-[0_18px_40px_rgba(147,112,219,0.10)]
                  before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-br before:from-white/25 before:to-transparent before:pointer-events-none
                  ${category.bgGradient} ${category.radius}`}
              >
                {/* Floating Product Image Cutout - Optional Polish: group-hover:scale-[1.03] with 500ms duration */}
                <img
                  src={category.image}
                  alt={category.title}
                  className={`absolute object-contain pointer-events-none drop-shadow-[0_8px_12px_rgba(0,0,0,.08)] transition-transform duration-500 ease-out group-hover:scale-[1.03] ${category.imageClass}`}
                />

                {/* Bottom Card Title & Subtitle */}
                <div className="relative z-10 max-w-[70%] pointer-events-none">
                  <h3 className="text-[12px] font-extrabold tracking-[0.12em] text-black uppercase">
                    {category.title}
                  </h3>
                  <p className="mt-0.5 text-[11px] font-medium leading-4 text-gray-600">
                    {category.subtitle}
                  </p>
                </div>

                {/* 4. Arrow Action Icon (Fixed button container, animated arrow icon) */}
                <div className="absolute bottom-4 right-4 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white shadow-sm">
                  <ArrowRight
                    size={13}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </div>
              </NavLink>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 grid grid-cols-2 divide-y divide-gray-200 border-t border-b border-gray-200 lg:grid-cols-4 lg:divide-y-0 lg:divide-x"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              /* 5. Increased padding to py-10 for breathing room */
              <div key={feature.title} className="flex items-center gap-5 px-8 py-10">
                <Icon size={32} strokeWidth={1} className="shrink-0 text-black" />
                <div>
                  <p className="text-[13px] font-extrabold text-black">{feature.title}</p>
                  <p className="mt-0.5 text-[12px] text-gray-500 leading-tight">
                    {feature.description}
                  </p>
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