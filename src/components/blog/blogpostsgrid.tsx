import BlogPostCard from "./blogpostcard"; // Adjust the import path as necessary
import { BlogPost } from "../../types/blogPost";
import SectionTitle from "../general/sectiontitle";

interface BlogPostsGridProps {
  blogPosts: BlogPost[];
}

const BlogPostsGrid: React.FC<BlogPostsGridProps> = ({ blogPosts }) => {
  return (
    <div className="flex flex-col gap-24">
      <header className="flex flex-col gap-6 w-full">
        <SectionTitle title="Stuff I Find Interesting" />
        <div className="flex flex-col gap-2">
          <p className="text-xl max-w-2xl text-tag">
            Writing helps me organize my thoughts, focus, learn, and improve my
            communication skills. In this blog you will find posts about
            anything I find interesting. Hope you enjoy!
          </p>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPostsGrid;
