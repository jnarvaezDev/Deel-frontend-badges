import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LogoCarousel from "@/components/LogoCarousel";
import FeatureSection from "@/components/FeatureSection";
import LevelsSection from "@/components/LevelsSection";
import ProcessSection from "@/components/ProcessSection";
import BenefitsSection from "@/components/BenefitsSection";
import CommunitySection from "@/components/CommunitySection";
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
      <CommunitySection />
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="h-px bg-border" />
      </div>
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
