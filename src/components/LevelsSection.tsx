import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const levels = [

  {
    number: 1,
    title: "Global Talent",
    description: "Ready to work internationally.",
    skills: ["Fluent English + cultural awareness", "Remote-capable, cross-timezone experience", "No international work experience yet"],
    borderColor: "#5938b7",
  },

  {
    number: 2,
    title: "Global Champion",
    description: "2+ years working internationally.",
    skills: ["All Global Talent skills AND", "Direct cross-border project experience", "Navigated global operations and compliance"],
    borderColor: "#ed5e2a",
  },
  {
    number: 3,
    title: "Global Leader",
    description: "Designs and leads multicultural global teams.",
    skills: ["All global champion skills AND", "Strategic multi-market responsibility", "Builds culture and systems across regions"],
    borderColor: "#a88ee8",
  },
];

const LevelsSection = () => {
  const grid = useScrollReveal();

  return (
    <section className="bg-deel-gray-bg section-spacing">
      <div className="deel-container" id="certification-levels">
        <div
          ref={grid.ref}
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 scroll-hidden-child ${grid.isVisible ? 'scroll-visible-child' : ''}`}
        >
          {levels.map((level) => (
            <div
              key={level.number}
              className="bg-background rounded-2xl p-6 pb-10 min-h-[360px] flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden"
              style={{ transitionDelay: `${(level.number - 1) * 0.12}s` }}
            >
              <div
                className="absolute bottom-0 left-0 right-0 h-3 rounded-t-none"
                style={{ backgroundColor: level.borderColor, borderRadius: '0 0 1rem 1rem' }}
              />
              <p className="text-sm font-semibold text-muted-foreground">Level {level.number}</p>
              <h3 className="text-[20px] leading-[28px] font-bold text-foreground mt-2">{level.title}</h3>
              <p className="text-base leading-6 text-muted-foreground mt-3">{level.description}</p>
              <div className="mt-4">
                <p className="text-base leading-6 font-semibold text-foreground mb-2">Typical profile:</p>
                <ul className="space-y-1">
                  {level.skills.map((skill, i) => (
                    <li key={i} className="text-base leading-6 text-muted-foreground flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LevelsSection;
