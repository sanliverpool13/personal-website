"use client";
import Image from "next/image";
import ButtonLink from "../general/buttonlink";
import Link from "next/link";
import SectionTitle from "../general/sectiontitle";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    datePosted: string;
    readTime: string;
    imageUrl: string;
    description: string;
    link: string;
    slug: string;
  };
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post: { title, datePosted, readTime, imageUrl, description, link, slug, id },
}) => {
  const category = "Programming";
  console.log(imageUrl);
  return (
    <Link href={`/blog/${slug}`} legacyBehavior passHref>
      <a className="block cursor pointer">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="relative w-full h-60 ">
              <Image src={imageUrl} alt={title} fill className="rounded-md" />
            </div>
            <p className=" text-tag text-sm font-medium py-1 ">{category}</p>
          </div>

          <div className="flex flex-col gap-1 ">
            <h2 className="md:text-2xl text-xl font-bold">{title}</h2>
            {/* <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex items-center gap-2"
            >
              <h5 className="text-md">{datePosted}</h5>
              <span className="h-1 w-1 circle-separator-bg rounded-full" />
              <h5 className="text-md">{readTime}</h5>
            </motion.div> */}
          </div>

          <p className="text-lg leading-7 text-tag">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostCard;
