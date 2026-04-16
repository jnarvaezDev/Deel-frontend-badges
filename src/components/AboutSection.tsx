import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import aboutImage from "@/assets/about-image.png";

const AboutSection = () => {
  const left = useScrollReveal();
  const right = useScrollReveal();

  return (
    <section className="section-spacing" style={{ backgroundColor: '#201547' }}>
      <div className="deel-container">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div
            ref={left.ref}
            className={`flex-1 w-full relative min-h-[320px] lg:min-h-[400px] rounded-[20px] overflow-hidden scroll-hidden ${left.isVisible ? 'scroll-visible' : ''}`}
          >
            <img src={aboutImage} alt="Deel global infrastructure" className="w-full h-full object-cover rounded-[20px]" />
          </div>

          <div
            ref={right.ref}
            className={`max-w-[520px] flex-shrink-0 scroll-hidden ${right.isVisible ? 'scroll-visible' : ''}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <p className="text-[13px] uppercase tracking-wider mb-3" style={{ color: '#faf4ee', fontFamily: 'Inter, sans-serif' }}>
              WHO IS DEEL?
            </p>
            <h2 className="text-[28px] leading-[36px] lg:text-[40px] lg:leading-[48px] font-bold" style={{ color: '#faf4ee' }}>
              The global infrastructure for modern work
            </h2>
            <p className="mt-6 text-base leading-6" style={{ color: '#faf4ee', opacity: 0.8 }}>
              Deel is a leading global platform that helps companies hire, pay, and manage talent across borders.
            </p>
            <p className="mt-4 text-base leading-6" style={{ color: '#faf4ee', opacity: 0.8 }}>
              With operations in over 150 countries, Deel enables organizations to build distributed teams compliantly and efficiently. From payroll and compliance to HR and contractor management, Deel powers the future of global work.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
