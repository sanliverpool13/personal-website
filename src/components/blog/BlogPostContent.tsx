"use client";
import { useState, useRef, useEffect } from "react";
import ImageBlock from "./ImageBlock";
import ParagraphBlock from "./ParagraphBlock";
import HeadingBlock from "./HeadingBlock";
import BulletBlock from "./Bulletblock";
import BulletGroup from "./BulletGroup";
import { NotionBlock } from "@/types/notion";
import CodeBlock from "./CodeBlock";
import Quote from "./Quote";
import Embed from "./Embed";
import { mapRichText } from "@/lib/clientHelpers";
import { FlexBoxComponent } from "@/types";
import FlexDirectionComponent from "../flexbox/flexdirection";
import JustifyContentComponent from "../flexbox/justifyContent";
import AlignItemsComponent from "../flexbox/alignItems";
import GapComponent from "../flexbox/gap";
import OrderComponent from "../flexbox/order";
import FlexGrowComponent from "../flexbox/flexgrow";
import FlexShrinkcomponent from "../flexbox/flexshrink";
import TableOfContents from "./tableofcontents";

interface BlogPostContentProps {
  content: NotionBlock[];
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ content }) => {
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const extractedHeadings = content
      .map((block, index) =>
        block.type === "heading_3"
          ? {
              id: `heading-${index}`,
              text: block.heading_3.rich_text[0].plain_text,
            }
          : null,
      )
      .filter(Boolean) as { id: string; text: string }[];

    setHeadings(extractedHeadings);
  }, [content]);

  const renderContentBlock = (block: NotionBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        const plainText = block.paragraph.rich_text[0].plain_text;
        if (plainText === FlexBoxComponent.direction) {
          return <FlexDirectionComponent key={index} />;
        } else if (plainText === FlexBoxComponent.justify) {
          return <JustifyContentComponent key={index} />;
        } else if (plainText === FlexBoxComponent.align) {
          return <AlignItemsComponent key={index} />;
        } else if (plainText === FlexBoxComponent.gap) {
          return <GapComponent key={index} />;
        } else if (plainText === FlexBoxComponent.order) {
          return <OrderComponent key={index} />;
        } else if (plainText === FlexBoxComponent.grow) {
          return <FlexGrowComponent key={index} />;
        } else if (plainText === FlexBoxComponent.shrink) {
          return <FlexShrinkcomponent key={index} />;
        }
        const mappedRichText = mapRichText(block.paragraph.rich_text);
        return <ParagraphBlock key={index} richTextElements={mappedRichText} />;
      case "bulleted_list_item":
        const mappedBulletRichText = mapRichText(
          block.bulleted_list_item.rich_text,
        );
        return (
          <BulletBlock key={index} richTextElements={mappedBulletRichText} />
        );
      case "bullet_group":
        const mappedRichTexts = block.bullets.map((block) => {
          return mapRichText(block.bulleted_list_item.rich_text);
        });
        return <BulletGroup bullets={mappedRichTexts} />;
      case "image":
        return (
          <ImageBlock
            key={index}
            src={block.image.file.url}
            alt={block.image.caption[0]?.plain_text ?? "Inline image"}
            caption={block.image.caption[0]?.plain_text}
          />
        );
      case "heading_3":
        return (
          <HeadingBlock
            key={index}
            text={block.heading_3.rich_text[0].plain_text}
            id={`heading-${index}`}
          />
        );
      case "code":
        return (
          <CodeBlock key={index} text={block.code.rich_text[0].plain_text} />
        );
      case "quote":
        return <Quote key={index} text={block.quote.rich_text[0].plain_text} />;
      case "embed":
        return <Embed key={index} url={block.embed.url} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-[5%] w-full max-w-6xl mx-auto">
      {/* Blog Content */}
      <div ref={contentRef} className="flex flex-col gap-6 w-full lg:w-[70%]">
        {content.map(renderContentBlock)}
      </div>

      {/* Table of Contents */}
      <div className="hidden lg:block w-[25%] ">
        <div className="sticky top-24 max-h-[80vh] ">
          <TableOfContents headings={headings} contentRef={contentRef} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostContent;
