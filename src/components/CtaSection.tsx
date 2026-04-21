import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import ctaImage from "@/assets/cta-image.png";

const CtaSection = () => {
  const content = useScrollReveal();

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_LINKEDIN_URI}`;
  };

  return (
    <section className="section-spacing">
      <div className="deel-container">
        <div
          ref={content.ref}
          className={`relative flex flex-col lg:flex-row items-stretch overflow-hidden rounded-[20px] scroll-hidden ${content.isVisible ? 'scroll-visible' : ''}`}
          style={{ backgroundColor: "#1b1b1b" }}
        >
          {/* Text left */}
          <div className="flex flex-col justify-center flex-1 px-8 py-10 lg:px-14">
            <h2 className="text-[24px] leading-[32px] lg:text-[32px] lg:leading-[40px] font-bold text-primary-foreground">
              Make your global experience visible.
            </h2>
            <p className="mt-3 text-base leading-6 text-primary-foreground/80">
              Get your certification and add your badge to LinkedIn.
            </p>
            <button
              onClick={handleLogin}
              className="mt-5 h-[44px] px-7 rounded-full font-semibold text-sm transition-opacity hover:opacity-90 self-start"
              style={{ backgroundColor: "#fcc400", color: "#111111" }}
            >
              GET CERTIFIED
            </button>
          </div>

          {/* Image right */}
          <div className="hidden lg:block w-[40%] flex-shrink-0">
            <img
              src={ctaImage}
              alt="Professional working"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;