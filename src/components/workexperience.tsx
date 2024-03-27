"use client";
import SectionTitle from "./general/sectiontitle";
import WorkExperienceCard from "./about/workexperiencecard";
import ButtonLink from "./general/buttonlink";
import { WorkExperienceType } from "@/types";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

// Define the animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

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
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);

  return (
    <section className="flex flex-col md:gap-20 gap-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        ref={ref}
      >
        <SectionTitle title={title} />
      </motion.div>

      <div className="flex flex-col md:gap-28 gap-12">
        {workExperiences.map((exp, index) => (
          <WorkExperienceCard key={index} {...exp} />
        ))}
      </div>
      {showButton && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          ref={ref}
        >
          <div className="w-full md:w-auto">
            <ButtonLink href="/about" ariaLabel="More Work Experience">
              More Work Experience
            </ButtonLink>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default WorkExperienceSection;
