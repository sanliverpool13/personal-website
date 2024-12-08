import "server-only";
import BlogPostsGrid from "@/components/blog/blogpostsgrid";
import { fetchNotionData, parseNotionData } from "@/lib/notion/notionService";
import { NotionApiResponse } from "@/types/notion";
import SectionTitle from "@/components/general/sectiontitle";
import LandingPageContainer from "@/components/LandingPageContainer";
import { saveSlugIdMapToJson } from "@/lib/helpers";

const BlogPage: React.FC = async () => {
  const databaseId = `${process.env.NOTION_BLOG_DB_ID}`;
  const rawNotionDatabaseData = await fetchNotionData(databaseId);
  const parsedNotionDatabaseData = await parseNotionData(
    rawNotionDatabaseData as NotionApiResponse
  );
  // clearCacheFile();
  saveSlugIdMapToJson(parsedNotionDatabaseData);

  return (
    <LandingPageContainer>
      <div className="flex flex-col gap-16 w-full">
        {parsedNotionDatabaseData.length > 0 ? (
          <BlogPostsGrid blogPosts={parsedNotionDatabaseData} />
        ) : (
          <SectionTitle title="Coming Soon!" />
        )}
      </div>
    </LandingPageContainer>
  );
};

export default BlogPage;
