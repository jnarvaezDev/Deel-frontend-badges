import heroImage from "@/assets/hero-image.gif";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const HeroSection = () => {
  const left = useScrollReveal();
  const right = useScrollReveal();

  const handleLogin = () => {
    window.location.href = "http://localhost:3000/auth/linkedin";
  };

  return (
    <section className="section-spacing">
      <div className="deel-container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div
            ref={left.ref}
            className={`max-w-[520px] flex-shrink-0 scroll-hidden ${left.isVisible ? 'scroll-visible' : ''}`}
          >
            <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[64px] font-bold text-foreground">
              Stand out on LinkedIn for international opportunities
            </h1>
            <p className="mt-6 text-base leading-6 text-muted-foreground">
              Deel Global Badges certify your readiness to work globally so recruiters can find you.
            </p>
            <p className="mt-3 text-base leading-6 text-muted-foreground">
              From global potential to global leadership: find the badge that matches your experience.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleLogin}
                className="h-[48px] px-6 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity w-full sm:w-auto">
                GET YOUR BADGE
              </button>
              <button className="h-[48px] px-6 rounded-full border border-deel-border bg-background text-foreground font-semibold text-sm hover:bg-muted transition-colors w-full sm:w-auto">
                SEE CERTIFICATION LEVELS
              </button>
            </div>
          </div>

          <div
            ref={right.ref}
            className={`flex-1 w-full relative min-h-[360px] lg:min-h-[440px] scroll-hidden ${right.isVisible ? 'scroll-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="relative w-[95%] h-full rounded-[20px] overflow-hidden ml-auto min-h-[400px]">
              <img src={heroImage} alt="Professional with Global Champion badge" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
