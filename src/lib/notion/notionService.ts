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
  NotionMultiSelect,
  NotionDate,
} from "@/types/notion";
import notion from "./notionClient";
import { v2 as cloudinary } from "cloudinary";
import { BlogPost } from "@/types/blogPost";
import { extractS3Key, formatDate } from "../helpers";
import crypto from "crypto";
import fs from "fs";
import { readThumbnailCache, updateThumbnailCache } from "../helpers";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Notice it's not prefixed with NEXT_PUBLIC_
  secure: true,
});

export const generateImageHash = (base64Image: string) => {
  return crypto.createHash("sha256").update(base64Image).digest("hex");
};

// export const findImageByHash = async (hash: string) => {
//   if (imageDb[hash]) {
//     console.log("Cache hit in file for hash:", hash);
//     return imageDb[hash];
//   }
//   const result = await cloudinary.search.expression(`tags=${hash}`).execute();

//   const secureUrl =
//     result.resources.length > 0 ? result.resources[0].secure_url : null;

//   if (secureUrl) {
//     imageDb[hash] = secureUrl;
//     fs.writeFileSync(imageDbPath, JSON.stringify(imageDb, null, 2));
//   }

//   return secureUrl;
// };

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
  // console.log('database query response', response);
  return response;
};

export const parseNotionData = async (
  rawNotionDatabasePageData: NotionApiResponse
): Promise<BlogPost[]> => {
  const parsedNotionDataPromises =
    rawNotionDatabasePageData.results.map(parseNotionPage);
  const blogPosts = await Promise.all(parsedNotionDataPromises);

  // I also need to save the page properties to the slug id map
  blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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

  // const imgBase64 = await downloadImageToBase64(
  //   thumbnailProperty.files[0]?.file?.url ?? null
  // );
  // const cloudinaryImgUrl = await uploadToCloudinary(imgBase64, "portfolio");

  const thumbnailUrl = thumbnailProperty.files[0]?.file?.url ?? null;

  let cloudinaryImgUrl = null;

  if (thumbnailUrl) {
    // Extract s3 object key
    const cacheKey = extractS3Key(thumbnailUrl);
    console.log("cache key", cacheKey);
    // Step 1: Check the cache for the Cloudinary URL
    const cache = await readThumbnailCache();
    cloudinaryImgUrl = cache[cacheKey];
    // console.log("retrieved cld url", cloudinaryImgUrl);

    if (!cloudinaryImgUrl) {
      // console.log("no cloudinary url");
      // Step 2: Download the image from AWS
      const imageBuffer = await downloadImageFromAWS(thumbnailUrl);

      // Step 3: Upload the buffer to Cloudinary
      cloudinaryImgUrl = await uploadBufferToCloudinary(
        imageBuffer,
        "portfolio"
      );

      // Step 4: Update the cache
      cache[cacheKey] = cloudinaryImgUrl;
      await updateThumbnailCache(cache);
    }
  }

  return {
    id: page.id,
    title:
      (page.properties.Name as NotionTitle)?.title[0]?.plain_text ?? "No Title",
    description: introProperty.rich_text[0]?.plain_text ?? null,
    slug: slugProperty.rich_text[0]?.plain_text ?? null,
    readTime: readTimeProperty.rich_text[0]?.plain_text ?? null,
    categories,
    datePosted: formatDate(createdTime.created_time),
    imageUrl: cloudinaryImgUrl,
    link: "",
    date: date.date.start,
  };
};

export const downloadImageToBase64 = async (url: string): Promise<string> => {
  const res = await fetch(url);
  const result = await res.arrayBuffer();
  const img = Buffer.from(result).toString("base64");
  return img;
};

export const downloadImageFromAWS = async (awsUrl: string): Promise<Buffer> => {
  const response = await fetch(awsUrl, {
    cache: "no-store", // Disable caching
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch resource ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

export const uploadBufferToCloudinary = async (
  imageBuffer: Buffer,
  folderName: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: folderName },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result?.secure_url || "");
      }
    );
    uploadStream.end(imageBuffer);
  });
};

// export const uploadToCloudinary = async (
//   imgBase64: string,
//   folderName: string
// ): Promise<string> => {
//   // Generate image hash
//   const imageHash = generateImageHash(imgBase64);

//   // Check if the image already exists in Cloudinary
//   const existingImageUrl = await findImageByHash(imageHash);
//   if (existingImageUrl) {
//     console.log("Image already exists:", existingImageUrl);
//     return existingImageUrl;
//   }

//   const { secure_url: imageExternalUrl } = await cloudinary.uploader.upload(
//     `data:image/jpeg;base64,${imgBase64}`,
//     { tags: [imageHash], folder: folderName }
//   );

//   return imageExternalUrl ? imageExternalUrl : "";
// };

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
        : block.image.external;
      let cloudinaryImgUrl = null;

      if (thumbnailUrl) {
        // Step 1: Extract the S3 object key
        const cacheKey = extractS3Key(thumbnailUrl);

        // Step 2: Check the cache for the Cloudinary URL
        const cache = await readThumbnailCache();
        cloudinaryImgUrl = cache[cacheKey];

        if (!cloudinaryImgUrl) {
          // Step 3: Download the image from AWS
          const imageBuffer = await downloadImageFromAWS(thumbnailUrl);

          // Step 4: Upload the buffer to Cloudinary
          cloudinaryImgUrl = await uploadBufferToCloudinary(
            imageBuffer,
            "portfolio"
          );

          // Step 5: Update the cache
          cache[cacheKey] = cloudinaryImgUrl;
          await updateThumbnailCache(cache);
        }
      }
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
  blocks: any[]
): Promise<NotionBlocksArray> => {
  const parsedBlocksPromises = blocks.map(parseBlock);
  const parsedBlocks = await Promise.all(parsedBlocksPromises);

  return parsedBlocks.filter(
    (block): block is NotionBlock => block !== undefined
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
