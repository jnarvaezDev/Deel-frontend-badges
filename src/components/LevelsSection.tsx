import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const levels = [
  {
    number: 1,
    title: "Global Leader",
    description: "Professionals who regularly collaborate across countries, cultures, or time zones.",
    skills: ["All global talent skills AND", "Coordination with international teams", "Responsibility in distributed projects", "Frequent collaboration across borders"],
    borderColor: "#a88ee8",
  },
  {
    number: 2,
    title: "Global Talent",
    description: "Professionals who already work or have worked with international companies.",
    skills: ["All global potential skills AND", "Experience collaborating with global teams", "Participation in cross-border projects", "Work experience in international organizations"],
    borderColor: "#5938b7",
  },
  {
    number: 3,
    title: "Global Champion",
    description: "Professionals with extensive experience operating in global environments.",
    skills: ["All global leader skills AND", "Experience building international teams or systems", "Participation in building global operations", "Advanced experience working across multiple regions"],
    borderColor: "#ed5e2a",
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
              <p className="text-sm leading-5 text-muted-foreground mt-3">{level.description}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Typical skills:</p>
                <ul className="space-y-1">
                  {level.skills.map((skill, i) => (
                    <li key={i} className="text-sm leading-5 text-muted-foreground flex items-start gap-2">
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
