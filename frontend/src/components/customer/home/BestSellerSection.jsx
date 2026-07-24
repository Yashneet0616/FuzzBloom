import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Star,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Lavender Dream Bouquet",
    price: 899,
    oldPrice: 1099,
    rating: 4.9,
    badge: "Best Seller",
    color: "from-[#FDEBFF] to-[#F7F2FF]",
    emoji: "💐",
  },
  {
    id: 2,
    name: "Sunflower Bloom",
    price: 699,
    oldPrice: 899,
    rating: 4.8,
    badge: "Popular",
    color: "from-[#FFF4D8] to-[#FFFBEF]",
    emoji: "🌻",
  },
  {
    id: 3,
    name: "Rose Basket",
    price: 999,
    oldPrice: 1299,
    rating: 5.0,
    badge: "New",
    color: "from-[#FFE8EF] to-[#FFF5F8]",
    emoji: "🌹",
  },
  {
    id: 4,
    name: "Tulip Arrangement",
    price: 849,
    oldPrice: 999,
    rating: 4.9,
    badge: "Limited",
    color: "from-[#EEF8FF] to-[#F8FCFF]",
    emoji: "🌷",
  },
];

const BestSellerSection = () => {
  return (
    <section className="bg-[#fcf9ff] py-20">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-8 xl:px-10">
        {/* Heading */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="rounded-full bg-[#f4e8ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8d5fd3]">
              Featured
            </span>

            <h2 className="mt-5 text-4xl font-black text-black lg:text-5xl">
              Best Sellers
            </h2>

            <p className="mt-4 max-w-xl text-gray-600">
              Handmade creations loved by our customers.
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

        {/* Products */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group overflow-hidden rounded-[30px] border border-[#f1e8fb] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Image */}
              <div
                className={`relative flex aspect-square items-center justify-center bg-gradient-to-br ${product.color}`}
              >
                <span className="absolute left-4 top-4 rounded-full bg-[#8d5fd3] px-3 py-1 text-xs font-semibold text-white">
                  {product.badge}
                </span>

                <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110">
                  <Heart size={18} />
                </button>

                <span className="text-8xl transition-transform duration-300 group-hover:scale-110">
                  {product.emoji}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 flex items-center gap-1 text-[#f4b400]">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-semibold text-gray-700">
                    {product.rating}
                  </span>
                </div>

                <h3 className="line-clamp-2 text-xl font-bold text-black">
                  {product.name}
                </h3>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#8d5fd3]">
                    ₹{product.price}
                  </span>

                  <span className="text-gray-400 line-through">
                    ₹{product.oldPrice}
                  </span>
                </div>

                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#8d5fd3] px-5 py-3 font-semibold text-white transition hover:bg-[#7a4fc4]">
                  <ShoppingBag size={18} />
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

export default BestSellerSection;