import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";

// Initial fallback data for offline/initial render
const initialProducts = [
  {
    id: 1,
    name: "Sweet Tulip Bouquet",
    price: 899,
    oldPrice: 1099,
    image: "/images/products/tulip-bouquet.webp",
  },
  {
    id: 2,
    name: "Blue Lily",
    price: 249,
    oldPrice: 329,
    image: "/images/products/blue-lily.webp",
  },
  {
    id: 3,
    name: "Tulip Keychain",
    price: 179,
    oldPrice: 229,
    image: "/images/products/tulip-keychain.webp",
  },
  {
    id: 4,
    name: "Daisy Pot",
    price: 349,
    oldPrice: 449,
    image: "/images/products/daisy-pot.webp",
  },
];

const FeaturedProducts = () => {
  // 12. State initialized for backend API fetching
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    // Backend API integration ready:
    // fetch("/api/products/featured")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data))
    //   .catch((err) => console.error(err));
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Soft background ambient glow */}
      <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#f6e8ff] blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#fff5ea] blur-3xl opacity-40 pointer-events-none" />

      <div className="relative mx-auto max-w-[1380px] px-6 lg:px-8 xl:px-10">
        {/* Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8d5fd3]">
              BEST SELLERS
            </p>
            {/* 11. Updated Heading */}
            <h2 className="mt-2 text-3xl font-black text-black lg:text-4xl">
              crafted with love ✨
            </h2>
          </div>

          <NavLink
            to="/shop"
            className="group inline-flex items-center gap-2 rounded-full border border-[#e8d4f5] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#faf4ff]"
          >
            View all
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </NavLink>
        </div>

        {/* 1. Grid layout replacing carousel */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              /* 9. Soft border border-[#efe6fb] & 10. Subtle hover hover:-translate-y-1.5 */
              className="group overflow-hidden rounded-[34px] border border-[#efe6fb] bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(145,110,214,.12)]"
            >
              {/* 2. Soft background gradient frame (Wishlist button completely removed) */}
              <div className="relative flex h-[270px] items-center justify-center bg-gradient-to-b from-[#fcf9ff] to-[#f8f3ff] rounded-t-3xl">
                {/* 3. Product image with extra padding */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-[205px] object-contain px-6 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Info & Action */}
              <div className="p-5 pt-0">
                {/* 5. Clean Title */}
                <h3 className="mt-5 text-base font-semibold leading-6 text-black">
                  {product.name}
                </h3>

                {/* 6. Formatted Prices in INR */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xl font-bold text-black">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-400 line-through">
                    ₹{product.oldPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* 7. Spacing (mt-6) & 8. Brand Color Button */}
                <button className="mt-6 w-full rounded-full border border-[#8d5fd3] text-[#8d5fd3] py-3 text-sm font-semibold transition-all duration-300 hover:bg-[#8d5fd3] hover:border-[#8d5fd3] hover:text-white">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;