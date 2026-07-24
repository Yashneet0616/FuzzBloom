import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya",
    location: "Delhi",
    quote:
      "Beautiful bouquet, the tulips looked so real I had to touch them twice to believe it wasn't fresh flowers.",
    rating: 5,
    color: "bg-[#f6d9ea]",
  },
  {
    id: 2,
    name: "Ananya",
    location: "Mumbai",
    quote:
      "Ordered a custom keychain for my sister's birthday — the detailing was incredible and it arrived so fast.",
    rating: 5,
    color: "bg-[#e0d6f7]",
  },
  {
    id: 3,
    name: "Kabir",
    location: "Bengaluru",
    quote:
      "Got the daisy pot as a housewarming gift. Genuinely looks handmade with love, exactly as advertised.",
    rating: 5,
    color: "bg-[#fbe6c8]",
  },
];

const Testimonials = () => {
  return (
    <section className="relative overflow-hidden bg-[#EEF7EE] py-24">
      <div className="absolute -left-14 bottom-0 h-64 w-64 rounded-full bg-white/50 blur-3xl" />

      <div className="relative mx-auto max-w-[1380px] px-6 lg:px-8 xl:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="rounded-xl bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8d5fd3]">
            Loved By Customers
          </span>
          <h2 className="mt-5 text-4xl font-black text-black lg:text-5xl">
            Words From Our Besties
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Real stories from people who've unboxed a little FuzzBloom joy.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="relative rounded-3xl border border-white bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:rotate-1 hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)]"
            >
              <Quote className="text-[#e3c8ff]" size={32} fill="#e3c8ff" strokeWidth={0} />

              <div className="mt-4 flex items-center gap-1 text-[#f4b400]">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>

              <p className="mt-4 leading-7 text-gray-700">"{t.quote}"</p>

              <div className="mt-6 flex items-center gap-3">
                <div className={`h-10 w-10 rounded-full ${t.color}`} />
                <div>
                  <p className="text-sm font-bold text-black">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;