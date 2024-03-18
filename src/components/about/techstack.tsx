import SectionTitle from "../general/sectiontitle";
import SkillTag from "../general/skilltag"; // Assuming this component already exists

const techStack = ["React", "Next.js", "Node.js"]; // Example tech stack

const TechStack = () => {
  return (
    <section className="flex flex-col gap-8 w-full">
      <SectionTitle title="My Tech Stack" />
      <div className="flex flex-wrap gap-2" style={{ maxWidth: "600px" }}>
        {techStack.map((tech, index) => (
          <SkillTag key={index} skill={tech} />
        ))}
      </div>
    </section>
  );
};

export default TechStack;
