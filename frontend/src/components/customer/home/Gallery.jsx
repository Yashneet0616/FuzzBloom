import { motion } from "framer-motion";
import { Heart, ArrowUpRight } from "lucide-react";

const photos = [
  { id: 1, color: "from-[#f9d9e8] to-[#fff0f6]", emoji: "💐", size: "row-span-2" },
  { id: 2, color: "from-[#f0dcff] to-[#f9f2ff]", emoji: "🔑", size: "" },
  { id: 3, color: "from-[#fff3d6] to-[#fffaf0]", emoji: "🌼", size: "" },
  { id: 4, color: "from-[#e2f1ff] to-[#f6fbff]", emoji: "🏺", size: "row-span-2" },
  { id: 5, color: "from-[#ffe1ec] to-[#fff6f9]", emoji: "🌷", size: "col-span-2" },
  { id: 6, color: "from-[#f3f0ff] to-[#fbfaff]", emoji: "💌", size: "" },
];

const Gallery = () => {
  return (
    <section className="relative overflow-hidden bg-[#FFF9F3] py-20">
      <div className="absolute -right-10 top-6 h-56 w-56 rounded-full bg-white/60 blur-3xl" />

      <div className="relative mx-auto max-w-[1380px] px-6 lg:px-8 xl:px-10">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <Heart size={20} className="mt-1 shrink-0 text-[#8d5fd3]" />
            <div>
              <h2 className="text-xl font-bold text-black lg:text-2xl">
                made by hands, meant for hearts 💜
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                tag us @fuzzbloom.co to get featured!
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8d5fd3]"
          >
            @fuzzbloom.co
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Masonry-style grid — fade + zoom scroll animation */}
        <div className="grid auto-rows-[110px] grid-cols-3 gap-3 sm:grid-cols-4">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className={`group relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br transition-transform duration-300 hover:rotate-1 hover:scale-[1.03] ${photo.color} ${photo.size}`}
            >
              {/* Photo placeholder — replace with real customer/product photo */}
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
                {photo.emoji}
              </span>

              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                <ArrowUpRight
                  size={18}
                  className="text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;