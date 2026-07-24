import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="bg-[#fcf9ff] py-20">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-8 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#8d5fd3] via-[#a678eb] to-[#c4a4f5] px-8 py-16 text-center shadow-2xl lg:px-16"
        >
          {/* Decorative Blobs */}
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="rounded-full bg-white/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
              Handmade with Love
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight text-white lg:text-6xl">
              Make Every Moment
              <br />
              Bloom Forever
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
              Discover handcrafted pipe cleaner flowers that never fade.
              Perfect for birthdays, anniversaries, weddings, and every special
              memory.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <NavLink
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-[#8d5fd3] transition hover:scale-105 hover:shadow-xl"
              >
                Shop Collection
                <ArrowRight size={18} />
              </NavLink>

              <NavLink
                to="/contact"
                className="rounded-full border border-white/40 px-8 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Custom Orders
              </NavLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;