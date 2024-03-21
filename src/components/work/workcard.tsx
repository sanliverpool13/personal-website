import Image from "next/image";
import Link from "next/link";
import SkillTag from "../general/skilltag"; // Adjust the import path as needed
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WorkCardType } from "@/types";
import SectionTitle from "../general/sectiontitle";

interface WorkCardProps {
  work: WorkCardType;
}

const WorkCard: React.FC<WorkCardProps> = ({
  work: { imageUrl, imageAlt, description, skills, link, title, date },
}) => {
  return (
    <div className="grid md:grid-cols-2 md:gap-24 gap-8">
      <div className="relative border-8 h-96 md:h-auto">
        <Image src={`${imageUrl}`} alt={imageAlt} fill={true} />
      </div>
      <div className="flex flex-col md:gap-8 gap-4">
        <div className="flex flex-col md:gap-4 gap-2">
          <SectionTitle title={title} />
          <p>{description}</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, skillIndex) => (
              <SkillTag key={skillIndex} skill={skill} />
            ))}
          </div>
        </div>

        <p className="font-bold">{date}</p>

        <Link href={link.href} passHref legacyBehavior>
          <a className="underline flex items-center gap-2">
            {link.text}
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default WorkCard;
