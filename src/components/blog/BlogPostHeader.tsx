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
      <h2 className="text-4xl font-medium">{title}</h2>
      <div className="flex items-center gap-2 text-gray-600">
        <span>{datePosted}</span>
        <span className="mx-2 h-2 w-2 bg-gray-600 rounded-full"></span>
        <span>{readTime}</span>
      </div>
    </div>
  );
};

export default BlogPostHeader;
