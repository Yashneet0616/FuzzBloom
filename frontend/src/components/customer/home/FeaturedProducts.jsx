import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { NavLink } from "react-router-dom";

const initialProducts = [
  {
    id: 1,
    name: "Sweet Tulip Bouquet",
    price: 899,
    oldPrice: 1099,
    rating: 4.9,
    reviews: 124,
    badge: "Best Seller",
    color: "from-[#f7d9e6] to-[#fff0f5]",
    emoji: "💐",
  },
  {
    id: 2,
    name: "Blue Lily",
    price: 249,
    oldPrice: 329,
    rating: 4.8,
    reviews: 86,
    badge: "New",
    color: "from-[#e4f1ff] to-[#f7fbff]",
    emoji: "🌼",
  },
  {
    id: 3,
    name: "Tulip Keychain",
    price: 179,
    oldPrice: 229,
    rating: 4.9,
    reviews: 201,
    badge: "Best Seller",
    color: "from-[#fde6f0] to-[#fff5fa]",
    emoji: "🔑",
  },
  {
    id: 4,
    name: "Daisy Pot",
    price: 349,
    oldPrice: 449,
    rating: 5.0,
    reviews: 47,
    badge: "Limited",
    color: "from-[#fff2da] to-[#fffaf0]",
    emoji: "🌻",
  },
];

const FeaturedProducts = () => {
  const scrollRef = useRef(null);
  const [liked, setLiked] = useState({});

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
  };

  const toggleLike = (id) => setLiked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="relative overflow-hidden bg-white py-28">
      {/* Background decorations */}
      <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-[#f7ecff] blur-3xl opacity-60" />
      <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#fff3e8] blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-[1380px] px-6 lg:px-8 xl:px-10">
        {/* Heading */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8d5fd3]">
              Best Sellers
            </p>
            <h2 className="mt-2 text-3xl font-black text-black lg:text-4xl">
              our bestsellers ✨
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Made with love, chosen by everyone.
            </p>
          </div>

          <NavLink
            to="/shop"
            className="group inline-flex items-center gap-2 rounded-full border border-[#e8d4f5] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#faf4ff]"
          >
            See all
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </NavLink>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="absolute -left-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 sm:flex"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="grid grid-cols-2 gap-6 overflow-x-auto scroll-smooth sm:grid-cols-4 sm:overflow-visible"
          >
            {initialProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group overflow-hidden rounded-3xl border border-[#f1e8fb] bg-white transition-all duration-300 hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_25px_60px_rgba(141,95,211,0.22)]"
              >
                {/* Image */}
                <div className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-t-3xl bg-gradient-to-br ${product.color}`}>
                  <span className="absolute left-3 top-3 rounded-xl bg-[#8d5fd3] px-3 py-1 text-[11px] font-semibold text-white">
                    {product.badge}
                  </span>

                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-transform duration-300 hover:scale-125"
                  >
                    <Heart
                      size={16}
                      className={liked[product.id] ? "text-red-500" : "text-black"}
                      fill={liked[product.id] ? "currentColor" : "none"}
                    />
                  </button>

                  {/* Quick view icon — appears on hover */}
                  <button className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-3 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <Eye size={16} />
                  </button>

                  {/* Product image placeholder — replace with real product photo */}
                  <span className="text-7xl transition-transform duration-500 group-hover:scale-125">
                    {product.emoji}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-2 flex items-center gap-1 text-[#f4b400]">
                    <Star size={14} fill="currentColor" strokeWidth={0} />
                    <span className="text-xs font-semibold text-gray-700">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h3 className="text-[15px] font-semibold text-black">{product.name}</h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-lg font-bold text-black">₹{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">₹{product.oldPrice}</span>
                  </div>

                  <button className="mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-gray-300 px-4 py-3 text-sm font-semibold text-black transition-all duration-300 group-hover:border-black group-hover:bg-black group-hover:text-white">
                    <ShoppingBag size={16} />
                    Add to cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="absolute -right-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105 sm:flex"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;