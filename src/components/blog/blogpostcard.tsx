import Image from "next/image";
import ButtonLink from "../general/buttonlink";
import Link from "next/link";

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
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            {/* New container with a smaller gap */}
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex items-center gap-2">
              <h5 className="text-md">{datePosted}</h5>
              <span className="h-1 w-1 bg-black rounded-full"></span>
              <h5 className="text-md">{readTime}</h5>
            </div>
          </div>
          <div className="relative w-full lg:h-96 h-72">
            <Image
              src={imageUrl}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <p className="text-base leading-7">{description}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogPostCard;
