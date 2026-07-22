import { motion } from "framer-motion";
import Button from "../ui/Button";
import heroImage from "../../assets/images/hero/hero.png";

function Hero() {
  // Temporary defaults until public settings API is created
  const loading = false;
  const heroEnabled = true;
  const banner = null;

  if (!heroEnabled) return null;

  return (
    <section className="bg-rose-50">
      <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col-reverse items-center gap-16 px-6 py-16 md:flex-row">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
            Handmade with Love
          </p>

          <h1
            className="text-5xl font-bold leading-tight text-stone-800 md:text-7xl"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            Handmade Flowers
            <br />
            That Last Forever
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-8 text-stone-600">
            Discover beautifully handcrafted pipe-cleaner flowers designed for
            gifts, celebrations and unforgettable memories.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button>Shop Collection</Button>

            <Button variant="secondary">
              Explore More
            </Button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-1 justify-center"
        >
          <img
            src={!loading && banner ? banner : heroImage}
            alt="FuzzBloom Handmade Flowers"
            className="w-full max-w-md rounded-[40px] object-cover shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;