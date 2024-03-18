import "server-only";
import BlogPostsGrid from "@/components/blog/blogpostsgrid";
import { fetchNotionData, parseNotionData } from "@/lib/notion/notionService";
import { NotionApiResponse } from "@/types/notion";
import SectionTitle from "@/components/general/sectiontitle";

const BlogPage: React.FC = async () => {
  const databaseId = `${process.env.NOTION_BLOG_DB_ID}`;
  const rawNotionDatabaseData = await fetchNotionData(databaseId);
  const parsedNotionDatabaseData = await parseNotionData(
    rawNotionDatabaseData as NotionApiResponse
  );

  return (
    <div className="flex flex-col gap-16 w-full">
      {parsedNotionDatabaseData.length > 0 ? (
        <BlogPostsGrid blogPosts={parsedNotionDatabaseData} />
      ) : (
        <SectionTitle title="Coming Soon!" />
      )}
    </div>
  );
};

export default BlogPage;
