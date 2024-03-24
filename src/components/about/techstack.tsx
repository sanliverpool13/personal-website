import SectionTitle from "../general/sectiontitle";
import SkillTag from "../general/skilltag"; // Assuming this component already exists
import SkillTile from "../general/SkillTile";
import DockerIcon from "../../../public/docker.svg";
// import { DockerIconComponent, ReactIcon } from "../general/SkillTileIcon";
import {
  JSIcon,
  NextJSIcon,
  NodeJSIcon,
  PythonIcon,
  ReactIcon,
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
]; // Example tech stack

const TechStack = () => {
  return (
    <section className="flex flex-col gap-12 w-full">
      <SectionTitle title="Skills & Tools" />
      <div className="flex flex-wrap gap-2" style={{ maxWidth: "600px" }}>
        {techStack.map((tech, index) => (
          <SkillTile key={index} skillName={tech.skillName} Icon={tech.icon} />
        ))}
      </div>
    </section>
  );
};

export default TechStack;
