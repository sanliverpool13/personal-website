"use client";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";

interface ParagraphBlockProps {
  text: string;
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ text }) => {
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="text-xl leading-9"
    >
      {text}
    </motion.p>
  );
};

export default ParagraphBlock;
