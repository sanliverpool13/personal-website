"use client";
import { motion } from "framer-motion";
import { containerVariants } from "@/lib/framer-motion";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <h2 className="md:text-5xl text-3xl font-bold">{title}</h2>
    </motion.div>
  );
};

export default SectionTitle;
