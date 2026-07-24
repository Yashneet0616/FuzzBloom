import { motion } from "framer-motion";
import { ArrowUpRight, Camera } from "lucide-react";

const posts = [
  {
    id: 1,
    color: "from-[#FDEBFF] to-[#F8F2FF]",
    emoji: "💐",
  },
  {
    id: 2,
    color: "from-[#FFF5E6] to-[#FFFDF6]",
    emoji: "🌷",
  },
  {
    id: 3,
    color: "from-[#EEF8FF] to-[#F8FDFF]",
    emoji: "🧸",
  },
  {
    id: 4,
    color: "from-[#F2FFF2] to-[#FBFFFB]",
    emoji: "🌸",
  },
  {
    id: 5,
    color: "from-[#FFF0F5] to-[#FFF8FB]",
    emoji: "🎁",
  },
  {
    id: 6,
    color: "from-[#F6F1FF] to-[#FCFAFF]",
    emoji: "🌹",
  },
];

const InstagramSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1380px] px-6 lg:px-8 xl:px-10">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="rounded-full bg-[#f4e8ff] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8d5fd3]">
            Instagram
          </span>

          <h2 className="mt-5 text-4xl font-black text-black lg:text-5xl">
            Follow Our Bloom Journey
          </h2>

          <p className="mt-5 text-gray-600">
            Behind every bouquet is creativity, care, and handmade craftsmanship.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              className="group"
            >
              <div
                className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br ${post.color}`}
              >
                <span className="text-7xl transition duration-300 group-hover:scale-110">
                  {post.emoji}
                </span>

                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
                  <div className="translate-y-4 rounded-full bg-white p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={22} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#8d5fd3] px-8 py-4 font-semibold text-white transition hover:bg-[#7b4ec5]"
          >
            <Camera size={20} />
            Follow @fuzzbloom
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;