import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import customBouquet from "../../../assets/home/custom.png";

// 7-stroke doodle SVG matching the reference icon precisely
const Burst = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-white"
  >
    <g stroke="white" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2v8" />
      <path d="M6 5l4 5" />
      <path d="M3 12h7" />
      <path d="M6 20l5-4" />
      <path d="M22 6l-5 6" />
      <path d="M24 13h-7" />
      <path d="M21 20l-4-4" />
    </g>
  </svg>
);

const CustomOrderCTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative mx-auto my-12 max-w-[1380px] px-6 lg:px-8 xl:px-10"
    >
      {/* Pill container with overflow-visible so the bouquet can naturally overflow the pill edge */}
      <div className="relative rounded-full bg-[#111111] py-2.5 pl-10 pr-36 lg:pr-44">
        
        {/* Flexible distributed layout matching reference spacing */}
        <div className="flex items-center justify-between w-full">
          
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Burst />
            <h3 className="text-[15px] font-semibold leading-[18px] text-white">
              want something
              <br />
              extra special?
            </h3>
          </div>

          {/* Divider 1 */}
          <div className="hidden h-8 w-px bg-white/10 lg:block" />

          {/* Center Text Section */}
          <div className="flex flex-col justify-center">
            <p className="mt-0 text-[13px] font-semibold text-white">
              Custom orders open!
            </p>
            <p className="mt-0.5 text-[11px] text-white/60">
              We'll bring your ideas to life 💐
            </p>
          </div>

          {/* Divider 2 */}
          <div className="hidden h-8 w-px bg-white/10 lg:block" />

          {/* CTA Button Container */}
          <div className="z-10 flex items-center">
            <NavLink
              to="/custom-order"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#d9a6f5] px-10 py-2.5 text-[13px] font-semibold tracking-[0.04em] text-black transition-all duration-500 ease-out hover:-translate-y-0.5 hover:bg-[#dfb5f7] hover:shadow-[0_6px_20px_rgba(217,166,245,.35)]"
            >
              ORDER CUSTOM
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </NavLink>
          </div>
        </div>

        {/* Bouquet image positioned to overflow the pill edge cleanly */}
        <img
          src={customBouquet}
          alt="Custom Bouquet"
          draggable={false}
          loading="lazy"
          className="pointer-events-none absolute -bottom-3 -right-3 z-20 hidden h-32 w-auto select-none object-contain lg:block"
        />
      </div>
    </motion.section>
  );
};

export default CustomOrderCTA;