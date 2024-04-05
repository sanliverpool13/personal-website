"use client";
import Image from "next/image";
import Link from "next/link";
import SkillTag from "../general/skilltag"; // Adjust the import path as needed
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WorkCardType } from "@/types";
import SectionTitle from "../general/sectiontitle";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";

const containerVariants2 = {
  hidden: { opacity: 0, y: -10, rotateY: 0, skewY: 0 },
  visible: {
    opacity: 1,
    y: 0,
    rotateY: -20,
    skewY: -10,
    transition: { duration: 0.8 },
  },
};

interface WorkCardProps {
  work: WorkCardType;
}

const WorkCard: React.FC<WorkCardProps> = ({
  work: { imageSrc, imageAlt, description, skills, link, title, date },
}) => {
  return (
    <div className="grid md:grid-cols-2 md:gap-24 gap-8">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants2}
        className="relative border-8 h-48 md:h-auto rounded-15 shadow-lg"
        style={{ transform: "rotateY(10deg)" }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariantsWithDelay}
        className="flex flex-col md:gap-8 gap-4"
      >
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
      </motion.div>
    </div>
  );
};

export default WorkCard;
