import ImageBlock from "./ImageBlock";
import ParagraphBlock from "./ParagraphBlock";
import HeadingBlock from "./HeadingBlock";
import { NotionBlock } from "@/types/notion";

interface BlogPostContentProps {
  content: NotionBlock[];
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  const renderContentBlock = (block: NotionBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <ParagraphBlock
            key={index}
            text={block.paragraph.rich_text[0].plain_text}
          />
        );
      case "image":
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
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">{content.map(renderContentBlock)}</div>
  );
};

export default BlogPostContent;
