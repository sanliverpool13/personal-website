'use client';
import Image from 'next/image';
import ButtonLink from '../general/buttonlink';
import Link from 'next/link';
import SectionTitle from '../general/sectiontitle';
import { motion } from 'framer-motion';
import {
  containerVariants,
  containerVariantsWithDelay,
} from '@/lib/framer-motion';

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
  return (
    <Link href={`/blog/${slug}`} legacyBehavior passHref>
      <a className="block cursor pointer">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 ">
            <h2 className="md:text-3xl text-2xl font-bold">{title}</h2>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex items-center gap-2"
            >
              <h5 className="text-md">{datePosted}</h5>
              <span className="h-1 w-1 circle-separator-bg rounded-full" />
              <h5 className="text-md">{readTime}</h5>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariantsWithDelay}
            className="relative w-full h-60"
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              // layout="fill"
              // objectFit="cover"
              className="rounded-md"
            />
          </motion.div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariantsWithDelay}
            className="text-xl leading-7"
          >
            {description}
          </motion.p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostCard;
