import SkillTag from "../general/skilltag";
import { WorkExperienceType } from "@/types";

interface WorkExperienceProps {
  date: string;
  role: string;
  company: string;
  description: string;
  skills: string[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
  date,
  role,
  company,
  description,
  skills,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      {/* Date Section */}
      <div className="md:flex-1">
        <h3 className="text-lg">{date}</h3>
      </div>

      {/* Role, Company, Description, and Skills Section */}
      <div className="md:flex-1 md:flex md:flex-col gap-4">
        <div className="flex items-center gap-1 font-semibold">
          <h4 className="text-lg  inline">{role}</h4>
          <span className="mx-2 h-1 w-1 bg-inherit rounded-full inline-block circle-separator-bg"></span>
          <h4 className="text-lg ">{company}</h4>
        </div>
        <p className="text-base mb-4 leading-7">{description}</p>
        <div className="flex flex-wrap gap-2" style={{ maxWidth: "400px" }}>
          {skills.map((skill, index) => (
            <SkillTag key={index} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExperience;
