import "server-only";
import {
  fetchBlockChildren,
  fetchNotionData,
  fetchPage,
  parseNotionData,
} from "@/lib/notion/notionService";
import { NotionApiResponse } from "@/types/notion";
import { saveSlugIdMapToJson, getSlugIdMapFromJson } from "@/lib/helpers";
import ButtonLink from "@/components/general/buttonlink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostHeader from "@/components/blog/BlogPostHeader";

export const generateStaticParams = async () => {
  const dbId = `${process.env.NOTION_BLOG_DB_ID}`;
  const rawNotionDatabaseData = await fetchNotionData(dbId);
  const parsedNotionDatabaseData = await parseNotionData(
    rawNotionDatabaseData as NotionApiResponse
  );

  // save id in json to be accessed in a bit
  await saveSlugIdMapToJson(parsedNotionDatabaseData);

  const paths = parsedNotionDatabaseData.map((page) => ({
    params: {
      slug: page.slug,
    },
  }));

  return paths;
};

const getPost = async (params: { slug: string }) => {
  const SlugIdMap = await getSlugIdMapFromJson();
  const id = SlugIdMap[params.slug];

  // await deleteSlugIdMapJson();

  const pageResponse = await fetchPage(id);
  const pageContent = await fetchBlockChildren(id);

  return { pageContent, pageResponse };
};

const BlogPostPage = async ({
  params,
}: {
  params: { slug: string; id: string };
}) => {
  const { pageResponse: blogPostDetails, pageContent: blogPostContent } =
    await getPost(params);

  const { title, datePosted, readTime } = blogPostDetails;

  return (
    <div className="flex flex-col gap-16 max-w-3xl w-full">
      <div className="flex flex-col gap-8">
        <BlogPostHeader
          title={title}
          datePosted={datePosted}
          readTime={readTime}
        />
        <BlogPostContent content={blogPostContent} />
      </div>

      <div className="w-full md:w-auto">
        <ButtonLink href="/blog" ariaLabel="Back to blog page button">
          <span>Back To Blog</span>
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </ButtonLink>
      </div>
    </div>
  );
};

export default BlogPostPage;
