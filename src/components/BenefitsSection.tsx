import benefitImage from "@/assets/prueba-benefit-BMik2FpY.png";
import recruiterVisibilityImage from "@/assets/visibilidad-benefit-Dj7TA8Hh.png";
import validacionImage from "@/assets/validacion-benefit.png";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const benefits = [
"Clear validation of global experience",
"Stronger professional profile",
"Greater visibility for international recruiters"];


const BenefitsSection = () => {
  const header = useScrollReveal();
  const grid = useScrollReveal();

  return (
    <section className="bg-deel-gray-bg section-spacing">
      <div className="deel-container">
        <div
          ref={header.ref}
          className={`text-center max-w-[640px] mx-auto scroll-hidden ${header.isVisible ? 'scroll-visible' : ''}`}>
          
          <h2 className="text-[28px] leading-[36px] lg:text-[40px] lg:leading-[48px] font-bold text-foreground">Adding a badge helps make your international experience visible

          </h2>
        </div>

        <div
          ref={grid.ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 scroll-hidden-child ${grid.isVisible ? 'scroll-visible-child' : ''}`}>
          
          {benefits.map((benefit, i) =>
          <div
            key={i}
            className="bg-background rounded-2xl p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col items-center aspect-[5/4] justify-end"
            style={{ transitionDelay: `${i * 0.12}s` }}>
            
              {i === 1 ?
            <img src={benefitImage} alt="" className="w-[65%] flex-1 object-contain mb-4" /> :
            i === 2 ?
            <img src={recruiterVisibilityImage} alt="" className="w-[48.75%] flex-1 object-contain mb-4" /> :
            i === 0 ?
            <img src={validacionImage} alt="" className="w-[48.75%] flex-1 object-contain mb-4" /> :

            <div className="w-full flex-1 bg-muted rounded-xl mb-4 flex items-center justify-center" />
            }
              <p className="text-2xl leading-8 font-semibold text-foreground">
                {benefit}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default BenefitsSection;
