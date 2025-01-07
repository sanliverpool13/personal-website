"use client";
import SectionTitle from "../general/sectiontitle";
import Image from "next/image";

import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";
import Link from "next/link";

interface BlogPostHeaderProps {
  title: string;
  datePosted: string;
  lastEditedTime: string;
  readTime: string;
  cover: string;
}

const BlogPostHeader: React.FC<BlogPostHeaderProps> = ({
  title,
  datePosted,
  lastEditedTime,
  readTime,
  cover,
}) => {
  console.log(`last edited time:`, lastEditedTime);
  return (
    <div className="flex flex-col gap-16 lg:w-[80%]">
      <div className="mb-6">
        <Link href="/blog" className="text-sm flex items-center gap-2">
          <span>&larr;</span> Back to All Posts
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <SectionTitle title={title} />
        <div className="flex items-center gap-2">
          <p className="text-md">{`Published ${datePosted} • Last Updated ${lastEditedTime} • ${readTime} read`}</p>
          {/* <span>Published {datePosted}</span>
        <span className="mx-2 h-2 w-2 circle-separator-bg rounded-full"></span>
        <span>Last Edited {lastEditedTime}</span>
        <span className="mx-2 h-2 w-2 circle-separator-bg rounded-full"></span>
        <span>{readTime}</span> */}
        </div>
      </div>

      <div className="relative w-full h-96">
        <Image src={cover} alt={title} fill className="rounded-md" />
      </div>
    </div>
  );
};

export default BlogPostHeader;
