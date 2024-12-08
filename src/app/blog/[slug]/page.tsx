import { fetchBlockChildren} from "@/lib/notion/notionService";
import {  getSlugIdMapFromRedis } from "@/lib/helpers";
import ButtonLink from "@/components/general/buttonlink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import BlogPostContent from "@/components/blog/BlogPostContent";
import BlogPostHeader from "@/components/blog/BlogPostHeader";


export const generateStaticParams = async () => {
  // Pre-populated static data from Redis
  const slugIdMap = await getSlugIdMapFromRedis();

  if (!slugIdMap) {
    throw new Error("Redis is not pre-populated with slug data.");
  }

  return Object.keys(slugIdMap).map((slug) => ({
    slug,
  }));
}

const getPost = async (params: { slug: string }) => {
  // const SlugIdMap = await getSlugIdMapFromJson();
  const SlugIdMap = await getSlugIdMapFromRedis();
  const pageObject = SlugIdMap[params.slug];
  const id = pageObject["id"];
  const pageContent = await fetchBlockChildren(id);
  return { pageContent, pageObject };
};

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const { pageObject: blogPostDetails, pageContent: blogPostContent } =
    await getPost(params);
  const { title, datePosted, readTime } = blogPostDetails;

  return (
    <div className="flex flex-col gap-16 mx-auto w-full max-w-5xl">
      <div className="flex flex-col items-center justify-center gap-24">
        <BlogPostHeader
          title={title}
          datePosted={datePosted}
          readTime={readTime}
          cover={blogPostDetails.imageUrl}
        />
        <BlogPostContent content={blogPostContent} />
      </div>

      <div className="flex items-center justify-center w-full md:w-auto">
        <ButtonLink href="/blog" ariaLabel="Back to blog page button">
          <span className="btn-color">Back To Blog</span>
          <FontAwesomeIcon className="btn-color" icon={faArrowLeftLong} />
        </ButtonLink>
      </div>
    </div>
  );
};

export default BlogPostPage;
