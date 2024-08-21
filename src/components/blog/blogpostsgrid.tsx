import BlogPostCard from './blogpostcard'; // Adjust the import path as necessary
import { BlogPost } from '../../types/blogPost';
import SectionTitle from '../general/sectiontitle';

interface BlogPostsGridProps {
  blogPosts: BlogPost[];
}

const BlogPostsGrid: React.FC<BlogPostsGridProps> = ({ blogPosts }) => {
  return (
    <div className="flex flex-col gap-24">
      <header className="flex flex-col gap-6 w-full">
        <SectionTitle title="Blog" />
        <div className="flex flex-col gap-2">
          <p className="text-2xl max-w-2xl text-gray-500">
            Writing helps me organize my thoughts, focus and learn.
          </p>
          <p className="text-2xl max-w-2xl text-gray-500">
            Here I share whatever stuff I find interesting. Once I have written
            more, I will be able to narrow down to specific topics.
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
