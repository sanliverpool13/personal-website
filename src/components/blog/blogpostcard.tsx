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
import { BlogPost } from "@/types/blogPost";
import { capitalizeFirstLetter } from "@/lib/clientHelpers";

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post: {
    title,
    datePosted,
    readTime,
    imageUrl,
    description,
    link,
    slug,
    id,
    categories,
  },
}) => {
  // Define a color mapping for categories
  // const categoryColors: Record<string, string> = {
  //   programming: "bg-blue-100 text-blue-800",
  //   business: "bg-green-100 text-green-800",
  //   "personal growth": "bg-purple-100 text-purple-800",
  // };
  return (
    <Link href={`/blog/${slug}`} legacyBehavior passHref>
      <a className="block cursor pointer">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <div className="relative w-full h-60 ">
              <Image src={imageUrl} alt={title} fill className="rounded-md" />
            </div>
            {/* Render categories */}
            <div className="flex gap-2">
              {categories.map((category, index) => (
                <p
                  key={index}
                  className={`text-xs font-semibold py-1 rounded ${
                    // categoryColors[category.name.toLowerCase()] ||
                    // "bg-gray-100 text-gray-800"
                    " text-tag"
                  }`}
                >
                  {capitalizeFirstLetter(category.name)}
                </p>
              ))}
            </div>
            {/* <p className=" text-tag text-sm font-medium py-1 ">{category}</p> */}
          </div>

          <div className="flex flex-col gap-1 ">
            <h2 className="md:text-2xl text-xl font-bold">{title}</h2>
          </div>

          <p className="text-lg leading-7 text-tag">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostCard;
