import balenciaga from "@/assets/logos/balenciaga.svg";
import logoBird from "@/assets/logos/logo-bird.svg";
import klarna from "@/assets/logos/klarna.svg";
import muji from "@/assets/logos/muji.svg";
import ramp from "@/assets/logos/ramp.svg";
import group from "@/assets/logos/group.svg";
import huber from "@/assets/logos/huber.svg";
import orderbird from "@/assets/logos/orderbird.svg";
import intuit from "@/assets/logos/intuit.svg";
import anthropic from "@/assets/logos/anthropic.svg";
import ericsson from "@/assets/logos/ericsson.svg";
import hm from "@/assets/logos/hm.svg";
import canva from "@/assets/logos/canva.svg";
import linkedin from "@/assets/logos/linkedin.svg";
import zillow from "@/assets/logos/zillow.svg";
import lockheed from "@/assets/logos/lockheed.svg";
import puma from "@/assets/logos/puma.svg";
import lucid from "@/assets/logos/lucid.svg";
import klm from "@/assets/logos/klm.svg";
import doordash from "@/assets/logos/doordash.svg";
import hersheys from "@/assets/logos/hersheys.svg";
import rollsroyce from "@/assets/logos/rollsroyce.svg";
import re from "@/assets/logos/re.svg";
import iee from "@/assets/logos/iee.svg";
import verizon from "@/assets/logos/verizon.svg";

const row1 = [
  { src: balenciaga, alt: "Balenciaga", height: 12 },
  { src: logoBird, alt: "Logo Bird", height: 24 },
  { src: klarna, alt: "Klarna", height: 14 },
  { src: muji, alt: "Muji", height: 22 },
  { src: ramp, alt: "Ramp", height: 24 },
  { src: group, alt: "Group", height: 20 },
  { src: huber, alt: "Huber", height: 18 },
  { src: orderbird, alt: "Orderbird", height: 20 },
  { src: intuit, alt: "Intuit", height: 14 },
  { src: anthropic, alt: "Anthropic", height: 12 },
  { src: ericsson, alt: "Ericsson", height: 18 },
  { src: hm, alt: "H&M", height: 18 },
  { src: canva, alt: "Canva", height: 18 },
];

const row2 = [
  { src: linkedin, alt: "LinkedIn", height: 16 },
  { src: zillow, alt: "Zillow", height: 16 },
  { src: lockheed, alt: "Lockheed Martin", height: 20 },
  { src: puma, alt: "Puma", height: 18 },
  { src: lucid, alt: "Lucid Motors", height: 10 },
  { src: klm, alt: "KLM", height: 18 },
  { src: doordash, alt: "DoorDash", height: 12 },
  { src: hersheys, alt: "Hershey's", height: 16 },
  { src: rollsroyce, alt: "Rolls Royce", height: 16 },
  { src: re, alt: "RE", height: 12 },
  { src: iee, alt: "IEE", height: 14 },
  { src: verizon, alt: "Verizon", height: 16 },
  { src: balenciaga, alt: "Balenciaga", height: 12 },
  { src: ramp, alt: "Ramp", height: 24 },
  { src: anthropic, alt: "Anthropic", height: 12 },
  { src: canva, alt: "Canva", height: 18 },
];

const LogoRow = ({
  logos,
  reverse = false,
}: {
  logos: typeof row1;
  reverse?: boolean;
}) => (
  <div className="relative max-w-[1200px] mx-auto overflow-hidden">
    <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    <div className={`flex ${reverse ? "animate-logo-scroll-reverse" : "animate-logo-scroll"}`}>
      {[...logos, ...logos].map((logo, i) => (
        <div
          key={i}
          className="flex-shrink-0 flex items-center justify-center px-7"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            style={{ height: `${logo.height}px` }}
            className="w-auto object-contain"
          />
        </div>
      ))}
    </div>
  </div>
);

const LogoCarousel = () => {
  return (
    <section className="py-10 lg:py-14 overflow-hidden">
      <div className="deel-container">
        <p
          className="text-[12px] uppercase tracking-[0.1em] text-center mb-8 font-medium"
          style={{ color: "#1b1b1b" }}
        >
          Trusted by thousands of companies worldwide to scale global teams without limits.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <LogoRow logos={row1} />
        <LogoRow logos={row2} reverse />
      </div>
    </section>
  );
};

export default LogoCarousel;
