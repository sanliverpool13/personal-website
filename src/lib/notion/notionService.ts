import {
  NotionApiResponse,
  NotionPage,
  NotionRichText,
  NotionFile,
  NotionTitle,
  NotionCreatedTime,
  NotionBlock,
  NotionBlocksArray,
  NotionMultiSelect,
  NotionDate,
  NotionLastEditedTime,
} from "@/types/notion";
import notion from "./notionClient";
import { v2 as cloudinary } from "cloudinary";
import { BlogPost } from "@/types/blogPost";
import { formatDate, getCloudinaryThumbnail } from "../helpers";
import crypto from "crypto";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Notice it's not prefixed with NEXT_PUBLIC_
  secure: true,
});

export const generateImageHash = (base64Image: string) => {
  return crypto.createHash("sha256").update(base64Image).digest("hex");
};

export const fetchNotionData = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      select: {
        does_not_equal: "Draft",
      },
    },
  });
  return response;
};

export const parseNotionData = async (
  rawNotionDatabasePageData: NotionApiResponse,
): Promise<BlogPost[]> => {
  const parsedNotionDataPromises =
    rawNotionDatabasePageData.results.map(parseNotionPage);
  const blogPosts = await Promise.all(parsedNotionDataPromises);

  // I also need to save the page properties to the slug id map
  blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return blogPosts;
};

export const parseNotionPage = async (page: NotionPage) => {
  const introProperty = page.properties.Intro as {
    rich_text: NotionRichText[];
  };
  const slugProperty = page.properties.Slug as {
    rich_text: NotionRichText[];
  };
  const readTimeProperty = page.properties.ReadTime as {
    rich_text: NotionRichText[];
  };
  const thumbnailProperty = page.properties.Thumbnail as {
    files: NotionFile[];
  };

  const categoryProperty = page.properties.category as {
    multi_select: NotionMultiSelect[];
  };

  const categories = categoryProperty.multi_select.map((category) => ({
    name: category.name,
  }));

  const createdTime = page.properties["Created time"] as NotionCreatedTime;

  const date = page.properties.Date as NotionDate;
  const lastEditedTime = page.properties[
    "Last edited time"
  ] as NotionLastEditedTime;

  const thumbnailUrl = thumbnailProperty.files[0]?.file?.url ?? null;
  const cloudinaryImgUrl = await getCloudinaryThumbnail(thumbnailUrl);

  return {
    id: page.id,
    title:
      (page.properties.Name as NotionTitle)?.title[0]?.plain_text ?? "No Title",
    description: introProperty.rich_text[0]?.plain_text ?? null,
    slug: slugProperty.rich_text[0]?.plain_text ?? null,
    readTime: readTimeProperty.rich_text[0]?.plain_text ?? null,
    categories,
    datePosted: formatDate(date.date.start),
    imageUrl: cloudinaryImgUrl,
    link: "",
    date: new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date.date.start)),
    lastEditedTime: formatDate(lastEditedTime.last_edited_time),
  };
};

// Helper function to parse a single block
const parseBlock = async (block: any): Promise<NotionBlock | undefined> => {
  switch (block.type) {
    case "paragraph":
      return {
        object: block.object,
        type: block.type,
        paragraph: {
          rich_text: block.paragraph.rich_text,
        },
      };
    case "image":
      // const imgBase64 = await downloadImageToBase64(block.image.file.url);
      // const cloudinaryImgUrl = await uploadToCloudinary(imgBase64, "portfolio");
      const thumbnailUrl = block.image.file
        ? block.image.file.url
        : block.image.external.url;
      let cloudinaryImgUrl = await getCloudinaryThumbnail(thumbnailUrl);

      return {
        object: block.object,
        type: block.type,
        image: {
          file: {
            url: cloudinaryImgUrl,
          },
          caption: block.image.caption,
        },
      };
    case "heading_3":
      return {
        object: block.object,
        type: block.type,
        heading_3: {
          rich_text: block.heading_3.rich_text,
        },
      };
    case "code":
      return {
        object: block.object,
        type: block.type,
        code: {
          caption: block.code.caption,
          rich_text: block.code.rich_text,
        },
      };
    case "bulleted_list_item":
      return {
        object: block.object,
        type: block.type,
        bulleted_list_item: {
          rich_text: block.bulleted_list_item.rich_text,
        },
      };
    case "embed":
      return {
        object: block.object,
        type: block.type,
        embed: {
          url: block.embed.url,
        },
      };
    case "quote":
      return {
        object: block.object,
        type: block.type,
        quote: {
          rich_text: block.quote.rich_text,
          color: block.quote.color,
        },
      };
    default:
      // Optionally handle other block types or return undefined
      return undefined;
  }
};

// Helper function to parse the array of blocks
export const parseBlocks = async (
  blocks: any[],
): Promise<NotionBlocksArray> => {
  const parsedBlocksPromises = blocks.map(parseBlock);
  const parsedBlocks = await Promise.all(parsedBlocksPromises);

  return parsedBlocks.filter(
    (block): block is NotionBlock => block !== undefined,
  );
};

export const fetchBlockChildren = async (pageId: string) => {
  let allBlocks: any[] = [];
  let cursor = undefined;
  try {
    do {
      const response = await notion.blocks.children.list({
        start_cursor: cursor,
        block_id: pageId,
        page_size: 100,
      });

      allBlocks = allBlocks.concat(response.results);
      cursor = response.has_more ? response.next_cursor : undefined;
    } while (cursor);

    const parsedBlocks = await parseBlocks(allBlocks);

    return parsedBlocks;
  } catch (error) {
    console.error("Error fetching block children:", error);
    throw error;
  }
};

export const fetchPage = async (pageId: string) => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    const parsedResponse = await parseNotionPage(response as NotionPage);
    return parsedResponse;
  } catch (error) {
    console.error("Error fetching page from Notion API:", error);
    throw error;
  }
};
