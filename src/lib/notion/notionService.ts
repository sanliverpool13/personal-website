import {
  NotionApiResponse,
  NotionPage,
  NotionRichText,
  NotionFile,
  NotionTitle,
  NotionCreatedTime,
  NotionHeading3Block,
  NotionImageBlock,
  NotionParagraphBlock,
  NotionBlock,
  NotionBlocksArray,
} from "@/types/notion";
import notion from "./notionClient";
import { v2 as cloudinary } from "cloudinary";
import { BlogPost } from "@/types/blogPost";
import { formatDate } from "../helpers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Notice it's not prefixed with NEXT_PUBLIC_
  secure: true,
});

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
  rawNotionDatabasePageData: NotionApiResponse
): Promise<BlogPost[]> => {
  const parsedNotionDataPromises =
    rawNotionDatabasePageData.results.map(parseNotionPage);
  const blogPosts = await Promise.all(parsedNotionDataPromises);
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
  const createdTime = page.properties["Created time"] as NotionCreatedTime;

  const imgBase64 = await downloadImageToBase64(
    thumbnailProperty.files[0]?.file?.url ?? null
  );
  const cloudinaryImgUrl = await uploadToCloudinary(imgBase64);

  return {
    id: page.id,
    title:
      (page.properties.Name as NotionTitle)?.title[0]?.plain_text ?? "No Title",
    description: introProperty.rich_text[0]?.plain_text ?? null,
    slug: slugProperty.rich_text[0]?.plain_text ?? null,
    readTime: readTimeProperty.rich_text[0]?.plain_text ?? null,
    datePosted: formatDate(createdTime.created_time),
    imageUrl: cloudinaryImgUrl,
    link: "",
  };
};

export const downloadImageToBase64 = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const result = await res.arrayBuffer();
  const img = Buffer.from(result).toString("base64");
  return img;
};

export const uploadToCloudinary = async (
  imgBase64: string
): Promise<string> => {
  const { secure_url: imageExternalUrl } = await cloudinary.uploader.upload(
    `data:image/jpeg;base64,${imgBase64}`
  );

  return imageExternalUrl ? imageExternalUrl : "";
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
      const imgBase64 = await downloadImageToBase64(block.image.file.url);
      const cloudinaryImgUrl = await uploadToCloudinary(imgBase64);
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
    default:
      // Optionally handle other block types or return undefined
      return undefined;
  }
};

// Helper function to parse the array of blocks
export const parseBlocks = async (
  blocks: any[]
): Promise<NotionBlocksArray> => {
  const parsedBlocksPromises = blocks.map(parseBlock);
  const parsedBlocks = await Promise.all(parsedBlocksPromises);

  return parsedBlocks.filter(
    (block): block is NotionBlock => block !== undefined
  );
};

export const fetchBlockChildren = async (pageId: string) => {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
    });

    const parsedBlocks = await parseBlocks(response.results);

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
