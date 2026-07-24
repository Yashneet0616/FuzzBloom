import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Send,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const categories = [
  { name: "Bouquets", path: "/shop" },
  { name: "Flowers", path: "/shop" },
  { name: "Keychains", path: "/shop" },
  { name: "Custom Orders", path: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-[#f2e8ff] bg-white">
      <div className="mx-auto max-w-[1380px] px-6 py-20 lg:px-8 xl:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <NavLink
              to="/"
              className="text-4xl font-black tracking-tight text-[#8d5fd3]"
            >
              FuzzBloom
            </NavLink>

            <p className="mt-5 max-w-sm leading-7 text-gray-600">
              Handmade pipe cleaner flowers crafted with love to create memories
              that never fade.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#f4e8ff] p-3 text-[#8d5fd3] transition hover:bg-[#8d5fd3] hover:text-white"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#f4e8ff] p-3 text-[#8d5fd3] transition hover:bg-[#8d5fd3] hover:text-white"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[#f4e8ff] p-3 text-[#8d5fd3] transition hover:bg-[#8d5fd3] hover:text-white"
              >
                <FaPinterestP size={18} />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-6 text-xl font-bold">Quick Links</h3>

            <div className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="text-gray-600 transition hover:text-[#8d5fd3]"
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-6 text-xl font-bold">Collections</h3>

            <div className="flex flex-col gap-4">
              {categories.map((category) => (
                <NavLink
                  key={category.name}
                  to={category.path}
                  className="text-gray-600 transition hover:text-[#8d5fd3]"
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-6 text-xl font-bold">
              Stay Connected
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <Mail
                  className="mt-1 text-[#8d5fd3]"
                  size={18}
                />

                <span className="text-gray-600">
                  hello@fuzzbloom.com
                </span>
              </div>

              <div className="flex items-start gap-4">
                <Phone
                  className="mt-1 text-[#8d5fd3]"
                  size={18}
                />

                <span className="text-gray-600">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex items-start gap-4">
                <MapPin
                  className="mt-1 text-[#8d5fd3]"
                  size={18}
                />

                <span className="text-gray-600">
                  India
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-gray-700">
                Subscribe to our newsletter
              </p>

              <div className="flex overflow-hidden rounded-full border border-[#eadbff]">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-5 py-3 text-sm outline-none"
                />

                <button className="bg-[#8d5fd3] px-5 text-white transition hover:bg-[#7b4ec5]">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#f2e8ff] pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} FuzzBloom. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            Made with
            <Heart
              size={16}
              className="fill-[#8d5fd3] text-[#8d5fd3]"
            />
            for flower lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;