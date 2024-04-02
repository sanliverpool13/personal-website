"use client";
import SectionTitle from "../general/sectiontitle";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";

interface BlogPostHeaderProps {
  title: string;
  datePosted: string;
  readTime: string;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  title,
  datePosted,
  readTime,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle title={title} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariantsWithDelay}
        className="flex items-center gap-2"
      >
        <span>{datePosted}</span>
        <span className="mx-2 h-2 w-2 circle-separator-bg rounded-full"></span>
        <span>{readTime}</span>
      </motion.div>
    </div>
  );
};

export default BlogPostHeader;
