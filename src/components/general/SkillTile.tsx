import { motion } from "framer-motion";
import { skillTileVariants } from "@/lib/framer-motion";

interface SkillsProps {
  skillName: string;
  Icon: React.ElementType;
  delay: number;
}

const SkillTile: React.FC<SkillsProps> = ({ skillName, Icon, delay }) => {
  return (
    <motion.div
      initial="hidden"
      variants={skillTileVariants}
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
      className="flex flex-col gap-3 items-center justify-center box-border p-4 shadow-tile h-24 w-24 skill-tile-dm"
    >
      <Icon />
      <span className="text-sm md:text-base font-medium bg-transparent">
        {skillName}
      </span>
    </motion.div>
  );
};

export default SkillTile;
