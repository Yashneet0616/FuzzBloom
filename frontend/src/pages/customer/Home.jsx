import HeroSection from "../../components/home/HeroSection";
import CategoriesSection from "../../components/home/CategoriesSection";
import BestSellerSection from "../../components/home/BestSellerSection";
import InstagramSection from "../../components/home/InstagramSection";
import CTASection from "../../components/home/CTASection";
import Footer from "../../components/shared/layout/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BestSellerSection />
      <InstagramSection />
      <CTASection />
      <Footer />
    </>
  );
};

export default Home;