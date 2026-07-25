
import Hero from "../../components/customer/home/Hero";
import Categories from "../../components/customer/home/Categories";
import FeaturedProducts from "../../components/customer/home/FeaturedProducts";
import CustomOrderCTA from "../../components/customer/home/CustomOrderCTA";
import Footer from "../../components/shared/layout/Footer";
import SectionDivider from "../../components/customer/home/SectionDivider";



const Home = () => {
  return (
    <>
      

      <Hero />
      <SectionDivider topColor="#ffffff" bottomColor="#faf7ff" />
        <CustomOrderCTA />

      <Categories />
      <SectionDivider topColor="#faf7ff" bottomColor="#ffffff" />

      <FeaturedProducts />
      <SectionDivider topColor="#ffffff" bottomColor="#FFF9F3" />
      <Footer />
    </>
  );
};

export default Home;