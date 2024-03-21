import BlogPostCard from "./blog/blogpostcard";
import SectionTitle from "./general/sectiontitle";
import ButtonLink from "./general/buttonlink";
import { BlogPost } from "@/types/blogPost";

interface LandingBlogSectionProps {
  blogPosts: BlogPost[];
}

const LandingBlogSection: React.FC<LandingBlogSectionProps> = ({
  blogPosts,
}) => {
  // Dummy blog post data - replace with your actual data source
  // const blogPosts = [
  //   {
  //     id: "id1",
  //     title: "Why I Read So Much",
  //     datePosted: "Feb 20, 2023",
  //     readTime: "4 min",
  //     imageUrl: "/library.webp",
  //     description:
  //       "In this week's blog post, we delve into the transformative power of reading. From the timeless classics that have shaped our worldviews to the latest bestsellers that challenge our perceptions, books hold the key to understanding, escape, and inspiration.",
  //     link: "/blog/post-1",
  //     slug: "/blog/post-1",
  //   },
  //   {
  //     id: "id2",
  //     title: "StreetCars Are Better Means Of Transport Than Cars",
  //     datePosted: "Feb 25, 2023",
  //     readTime: "6 min",
  //     imageUrl: "/torontostreetcar.webp",
  //     description:
  //       "In this week's blog post, we delve into the transformative power of reading. From the timeless classics that have shaped our worldviews to the latest bestsellers that challenge our perceptions, books hold the key to understanding, escape, and inspiration.",
  //     link: "/blog/post-2",
  //     slug: "/blog/post-2",
  //   },
  // ];

  return (
    <section className="flex flex-col md:gap-20 gap-12 w-full">
      <SectionTitle
        title={
          blogPosts.length > 0
            ? `Recent Blog Posts`
            : "Recent Blog Posts Coming Soon!"
        }
      />
      {blogPosts.length > 0 && (
        <div className="flex flex-col md:gap-28 gap-12">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>
      )}
      {blogPosts.length > 0 && (
        <div className="w-full md:w-auto">
          <ButtonLink href="/blog" ariaLabel="View All Blog Posts">
            View All Blog Posts
          </ButtonLink>
        </div>
      )}
    </section>
  );
};

export default LandingBlogSection;
