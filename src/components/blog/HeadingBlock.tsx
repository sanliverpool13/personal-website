"use client";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";

interface HeadingBlockProps {
  text: string;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ text }) => {
  return (
    <motion.h3
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="text-2xl font-bold"
    >
      {text}
    </motion.h3>
  );
};

export default HeadingBlock;
