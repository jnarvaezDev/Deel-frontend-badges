import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LogoCarousel from "@/components/LogoCarousel";
import FeatureSection from "@/components/FeatureSection";
import LevelsSection from "@/components/LevelsSection";
import ProcessSection from "@/components/ProcessSection";
import BenefitsSection from "@/components/BenefitsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <LogoCarousel />
      <FeatureSection />
      <LevelsSection />
      <ProcessSection />
      <BenefitsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
