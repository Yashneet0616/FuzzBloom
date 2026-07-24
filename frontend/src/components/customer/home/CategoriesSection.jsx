import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const categories = [
  {
    title: "Bouquets",
    subtitle: "Make their day 💜",
    color: "from-[#FDEBFF] to-[#F6F0FF]",
    emoji: "💐",
  },
  {
    title: "Flowers",
    subtitle: "Little blooms, big joy",
    color: "from-[#FFF3E9] to-[#FFF8F2]",
    emoji: "🌷",
  },
  {
    title: "Keychains",
    subtitle: "Carry happiness",
    color: "from-[#EEF8FF] to-[#F6FCFF]",
    emoji: "🧸",
  },
  {
    title: "Decor",
    subtitle: "Made for your space",
    color: "from-[#F2FFF2] to-[#FBFFFB]",
    emoji: "🏡",
  },
];

const features = [
  {
    title: "100% Handmade",
    description: "Crafted with care",
    icon: "💜",
  },
  {
    title: "Eco Friendly",
    description: "Reusable materials",
    icon: "🌿",
  },
  {
    title: "Perfect Gifts",
    description: "For every occasion",
    icon: "🎁",
  },
  {
    title: "Made to Last",
    description: "Flowers that never fade",
    icon: "✨",
  },
];

const CategoriesSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-8 xl:px-10">
        {/* Heading */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="rounded-full bg-[#f4e8ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8d5fd3]">
              Collections
            </span>

            <h2 className="mt-5 text-4xl font-black text-black lg:text-5xl">
              Shop by Category
            </h2>

            <p className="mt-4 max-w-xl text-gray-600">
              Discover handcrafted creations designed to make every celebration
              memorable.
            </p>
          </div>

          <NavLink
            to="/shop"
            className="group inline-flex items-center gap-2 font-semibold text-black"
          >
            View All

            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </NavLink>
        </div>

        {/* Category Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group"
            >
              <div className="overflow-hidden rounded-[30px] border border-[#f3edf9] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div
                  className={`flex aspect-square items-center justify-center bg-gradient-to-br ${category.color}`}
                >
                  <span className="text-7xl transition-transform duration-300 group-hover:scale-110">
                    {category.emoji}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-black">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {category.subtitle}
                  </p>

                  <NavLink
                    to="/shop"
                    className="group mt-6 inline-flex items-center gap-2 font-semibold text-[#8d5fd3]"
                  >
                    Explore

                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </NavLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="rounded-3xl border border-[#f2e8ff] bg-[#fcf9ff] p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4e8ff] text-3xl">
                {feature.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold text-black">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;