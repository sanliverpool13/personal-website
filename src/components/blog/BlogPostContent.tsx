import ImageBlock from "./ImageBlock";
import ParagraphBlock from "./ParagraphBlock";
import HeadingBlock from "./HeadingBlock";
import BulletBlock from "./Bulletblock";
import { NotionBlock } from "@/types/notion";
import CodeBlock from "./CodeBlock";
import Quote from "./Quote";
import Embed from "./Embed";
import { mapRichText } from "@/lib/helpers";

interface BlogPostContentProps {
  content: NotionBlock[];
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  const renderContentBlock = (block: NotionBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        const mappedRichText = mapRichText(block.paragraph.rich_text);
        return <ParagraphBlock key={index} richTextElements={mappedRichText} />;
      case "bulleted_list_item":
        const mappedBulletRichText = mapRichText(
          block.bulleted_list_item.rich_text
        );
        return (
          <BulletBlock key={index} richTextElements={mappedBulletRichText} />
        );
      case "image":
        if (block.image.file) {
        }
        return (
          <ImageBlock
            key={index}
            src={block.image.file.url}
            alt={block.image.caption[0]?.plain_text ?? "Inline image"}
          />
        );
      case "heading_3":
        return (
          <HeadingBlock
            key={index}
            text={block.heading_3.rich_text[0].plain_text}
          />
        );
      case "code":
        return (
          <CodeBlock key={index} text={block.code.rich_text[0].plain_text} />
        );
      case "quote":
        return <Quote key={index} text={block.quote.rich_text[0].plain_text} />;
      case "embed":
        console.log("embed", block.embed);
        return <Embed key={index} url={block.embed.url} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:w-[80%]">
      {content.map(renderContentBlock)}
    </div>
  );
};

export default BlogPostContent;
