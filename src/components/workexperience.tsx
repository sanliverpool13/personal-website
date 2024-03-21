import SectionTitle from "./general/sectiontitle";
import WorkExperienceCard from "./about/workexperiencecard";
import ButtonLink from "./general/buttonlink";
import { WorkExperienceType } from "@/types";

interface WorkExperienceSectionProps {
  showButton?: boolean;
  title: string;
  workExperiences: WorkExperienceType[]; // Assuming you have defined this type
}

const WorkExperienceSection: React.FC<WorkExperienceSectionProps> = ({
  showButton,
  title,
  workExperiences,
}) => {
  return (
    <section className="flex flex-col md:gap-20 gap-12">
      <SectionTitle title={title} />
      <div className="flex flex-col md:gap-28 gap-12">
        {workExperiences.map((exp, index) => (
          <WorkExperienceCard key={index} {...exp} />
        ))}
      </div>
      {showButton && (
        <div className="w-full md:w-auto">
          <ButtonLink href="/about" ariaLabel="More Work Experience">
            More Work Experience
          </ButtonLink>
        </div>
      )}
    </section>
  );
};

export default WorkExperienceSection;
