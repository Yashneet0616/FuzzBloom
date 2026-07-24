import Navbar from "../../components/shared/layout/Navbar"; 
import Hero from "../../components/customer/home/Hero";
import Categories from "../../components/customer/home/Categories";
import FeaturedProducts from "../../components/customer/home/FeaturedProducts";
import Gallery from "../../components/customer/home/Gallery";
import Testimonials from "../../components/customer/home/Testimonials";
import Newsletter from "../../components/customer/home/Newsletter";
import CustomOrderCTA from "../../components/customer/home/CustomOrderCTA";
import Footer from "../../components/shared/layout/Footer";
import SectionDivider from "../../components/customer/home/SectionDivider";

// Color flow across the page — each section gets its own subtle identity,
// and a wave divider softens the handoff between each pair of colors.
// white -> lavender wash -> white -> cream -> sage -> beige -> near-black -> white

const Home = () => {
  return (
    <>
      <Navbar />

      <Hero />
      <SectionDivider topColor="#ffffff" bottomColor="#faf7ff" />

      <Categories />
      <SectionDivider topColor="#faf7ff" bottomColor="#ffffff" />

      <FeaturedProducts />
      <SectionDivider topColor="#ffffff" bottomColor="#FFF9F3" />

      <Gallery />
      <SectionDivider topColor="#FFF9F3" bottomColor="#EEF7EE" />

      <Testimonials />
      <SectionDivider topColor="#EEF7EE" bottomColor="#F8F3EC" />

      <Newsletter />
      <SectionDivider topColor="#F8F3EC" bottomColor="#0a0a0a" />

      <CustomOrderCTA />
      <Footer />
    </>
  );
};

export default Home;