import badgeVideo from "@/assets/video-badge.mp4";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const FeatureSection = () => {
  const textBlock = useScrollReveal();
  const videoBlock = useScrollReveal();

  return (
    <section className="deel-container pb-24 lg:pb-24 md:pb-[72px]">
      <div
        ref={textBlock.ref}
        className={`rounded-[20px] p-8 lg:p-12 relative overflow-hidden scroll-hidden ${textBlock.isVisible ? 'scroll-visible' : ''}`}
        style={{ background: "#201547" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px"
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="flex-1">
            <h2 className="text-[28px] leading-[36px] lg:text-[40px] lg:leading-[48px] font-bold" style={{ color: "#faf4ee" }}>
              Deel Global Badges are certifications that validate your ability to work globally
            </h2>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <p className="text-base leading-6" style={{ color: "#faf4ee", opacity: 0.9 }}>
              Added to your LinkedIn profile, they help recruiters quickly identify professionals with international readiness and multicultural collaboration skills.
            </p>
            <p className="text-base leading-6" style={{ color: "#faf4ee", opacity: 0.9 }}>
              There are four badge levels, each designed to reflect a different stage of global experience.
            </p>
            <p className="text-base leading-6" style={{ color: "#faf4ee", opacity: 0.9 }}>
              Just answer a few simple questions with our AI and get your badge instantly to share on LinkedIn.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={videoBlock.ref}
        className={`mt-8 mx-auto rounded-[20px] overflow-hidden scroll-hidden ${videoBlock.isVisible ? 'scroll-visible' : ''}`}
        style={{ transitionDelay: '0.15s', maxWidth: '70%' }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto rounded-[20px]"
          style={{ margin: '0 -1px', width: 'calc(100% + 2px)', maxWidth: 'none' }}
        >
          <source src={badgeVideo} type="video/mp4" />
        </video>
      </div>
    </section>
  );
};

export default FeatureSection;
