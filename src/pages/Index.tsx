
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import TrustIndicators from "../components/TrustIndicators";
import BrowsingHistory from "../components/BrowsingHistory";
import TrainingCourse from "../components/TrainingCourse";
import FrequentlyAskedQuestions from "../components/FrequentlyAskedQuestions";
import SubscribeSection from "../components/SubscribeSection";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import LoadingScreen from "../components/LoadingScreen";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background dark:bg-background transition-colors duration-300">
      <Navbar />
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <Hero />
          <Categories />
          <FeaturedProducts />
          <BrowsingHistory />
          <TrainingCourse />
          <TrustIndicators />
          <FrequentlyAskedQuestions />
          <SubscribeSection />
        </>
      )}
      <ScrollToTop />
      <Footer />
    </div>
  );
};

export default Index;
