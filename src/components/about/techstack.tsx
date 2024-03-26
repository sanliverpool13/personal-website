import SectionTitle from "../general/sectiontitle";
import SkillTag from "../general/skilltag"; // Assuming this component already exists
import SkillTile from "../general/SkillTile";
// import { DockerIconComponent, ReactIcon } from "../general/SkillTileIcon";
import {
  DockerIcon,
  FigmaIcon,
  JSIcon,
  MongoDBIcon,
  NextJSIcon,
  NodeJSIcon,
  PythonIcon,
  ReactIcon,
  SassIcon,
  TSIcon,
  VueIcon,
} from "../icons";

const techStack = [
  { skillName: "React", icon: ReactIcon },
  { skillName: "JavaScript", icon: JSIcon },
  { skillName: "TypeScript", icon: TSIcon },
  { skillName: "Vue", icon: VueIcon },
  { skillName: "Next.js", icon: NextJSIcon },
  { skillName: "Node.js", icon: NodeJSIcon },
  { skillName: "Python", icon: PythonIcon },
  { skillName: "Figma", icon: FigmaIcon },
  { skillName: "MongoDB", icon: MongoDBIcon },
  { skillName: "Docker", icon: DockerIcon },
  { skillName: "Sass", icon: SassIcon },
];

const TechStack = () => {
  return (
    <section className="flex flex-col gap-12 w-full">
      <SectionTitle title="Skills & Tools" />
      <div className="flex flex-wrap gap-4">
        {techStack.map((tech, index) => (
          <SkillTile key={index} skillName={tech.skillName} Icon={tech.icon} />
        ))}
      </div>
    </section>
  );
};

export default TechStack;
