import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import mockupImage from "@/assets/linkedin-mockup.png";

const steps = [
  "Register on the landing page",
  "Complete a short assessment powered with AI",
  "Your results are verified",
  "Receive your badge",
  "Add your badge to your LinkedIn profile",
];

const ProcessSection = () => {
  const section = useScrollReveal();

  return (
    <section className="section-spacing">
      <div className="deel-container">
        <div
          ref={section.ref}
          className={`flex flex-col lg:flex-row gap-12 items-center scroll-hidden ${section.isVisible ? 'scroll-visible' : ''}`}
        >
          {/* Image left */}
          <div className="flex-1 flex justify-center">
            <img
              src={mockupImage}
              alt="LinkedIn badge preview"
              className="w-full max-w-[400px] rounded-[20px]"
              style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}
            />
          </div>

          {/* Text right */}
          <div className="flex-1">
            <h2 className="text-[28px] leading-[36px] lg:text-[40px] lg:leading-[48px] font-bold text-foreground">
              Verify your LinkedIn profile in 2 minutes — free
            </h2>
            <p className="mt-4">
              <span className="highlight-label">Getting certified is simple</span>
            </p>

            <div className="mt-10">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && <div className="w-px h-8 bg-border mt-1" />}
                  </div>
                  <p className={`text-base leading-7 text-muted-foreground pt-0.5 ${i === 4 ? 'font-bold text-foreground' : ''}`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;