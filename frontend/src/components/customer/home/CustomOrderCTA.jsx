import { motion } from "framer-motion";
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw, Headset } from "lucide-react";
import { NavLink } from "react-router-dom";

const trustItems = [
  { title: "Fast & Safe Delivery", description: "pan india shipping", icon: Truck },
  { title: "Secure Payments", description: "100% secure checkout", icon: ShieldCheck },
  { title: "Easy Returns", description: "hassle-free returns", icon: RefreshCw },
  { title: "Support 24/7", description: "we're here for you", icon: Headset },
];

const CustomOrderCTA = () => {
  return (
    <section className="bg-white">
      {/* Gradient CTA bar with floating decorations */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden bg-gradient-to-r from-black via-[#1a1120] to-[#3a2354] py-20"
      >
        {/* Floating decorative circles */}
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#8d5fd3]/20 blur-3xl" />
        <motion.span
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[12%] top-8 text-xl text-white/20"
        >
          ✦
        </motion.span>
        <motion.span
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute right-[16%] bottom-10 text-lg text-white/20"
        >
          ✿
        </motion.span>

        <div className="relative mx-auto flex max-w-[1380px] flex-col items-center gap-8 px-6 text-center lg:flex-row lg:justify-between lg:text-left lg:px-8 xl:px-10">
          <div>
            <p className="mb-2 text-xs italic text-white/50">— made with a little extra love —</p>
            <h3 className="text-3xl font-black leading-tight text-white">
              want something
              <br />
              extra special?
            </h3>
          </div>

          <div>
            <p className="text-lg font-bold text-white">Custom orders open!</p>
            <p className="mt-1 text-sm text-gray-400">We'll bring your ideas to life 🎁</p>

            {/* Testimonial snippet */}
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2">
              <div className="flex text-[#f4b400]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-xs text-white/80">"Best gift I've ever given" — Meera</p>
            </div>
          </div>

          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#8d5fd3] px-8 py-4 font-semibold text-white transition hover:scale-105 hover:bg-[#7a4fc4]"
          >
            Order Custom
            <ArrowRight size={18} />
          </NavLink>
        </div>
      </motion.div>

      {/* Trust badges */}
      <div className="mx-auto grid max-w-[1380px] grid-cols-2 gap-8 px-6 py-10 lg:grid-cols-4 lg:px-8 xl:px-10">
        {trustItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-center justify-center gap-4 text-center lg:justify-start lg:text-left">
              <Icon size={30} strokeWidth={1.5} className="shrink-0 text-gray-700" />
              <div>
                <p className="text-sm font-bold text-black">{item.title}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CustomOrderCTA;