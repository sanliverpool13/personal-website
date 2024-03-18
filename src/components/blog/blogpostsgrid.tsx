import BlogPostCard from "./blogpostcard"; // Adjust the import path as necessary
import { BlogPost } from "../../types/blogPost";

interface BlogPostsGridProps {
  blogPosts: BlogPost[];
}

const BlogPostsGrid: React.FC<BlogPostsGridProps> = ({ blogPosts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      {blogPosts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogPostsGrid;
