import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";
import os from "os";
import { BlogPost } from "@/types/blogPost";
import { SLUGIDMAPFILE } from "@/constants";
import { RichTextElement } from "@/types/blogPost";
import {
  NotionBulletBlock,
  NotionParagraphBlock,
  NotionRichText,
} from "@/types/notion";
import redis from "@/lib/redis"
import { v2 as cloudinary } from "cloudinary";

const isDevelopment = process.env.NODE_ENV === "development";

// Dynamically resolve the file path based on the environment
const getSlugIdMapFilePath = () =>
  isDevelopment
    ? path.join(os.tmpdir(), "SlugIdMapping.json") // Development: Use /tmp
    : path.join(process.cwd(), "src", "data", "SlugIdMapping.json"); // Production: Use src/data

const getImageAssetsFilePath = () =>
  isDevelopment
    ? path.join(os.tmpdir(), "imageAssetsCloudinary.json") // Development: use /tmp
    : path.join(process.cwd(), "src", "data", "imageAssetsCloudinary.json"); // Production: use src/data

export const saveSlugIdMapToJson = (parsedNotionDatabasePages: BlogPost[]) => {
  try {
    const SlugIdMapping = parsedNotionDatabasePages.reduce<
      Record<string, BlogPost>
    >((acc, page) => {
      acc[page.slug] = page;
      return acc;
    }, {});

    // Define the path to the JSON file
    const filePath = getSlugIdMapFilePath();

    // Write the mapping to a JSON file
    fs.writeFileSync(filePath, JSON.stringify(SlugIdMapping, null, 2));
  } catch (error) {
    throw new Error("Failed to write to file");
  }
};

export const getSlugIdMapFromJson = async () => {
  // const filePath = path.join(process.cwd(), "src", "data", `${SLUGIDMAPFILE}`);
  const filePath = getSlugIdMapFilePath();
  const jsonData = fs.readFileSync(filePath, "utf8");
  const slugIdMapping = JSON.parse(jsonData);

  return slugIdMapping;
};

export const deleteSlugIdMapJson = async () => {
  // const filePath = path.resolve(
  //   process.cwd(),
  //   "src",
  //   "data",
  //   `${SLUGIDMAPFILE}`
  // );
  const filePath = getSlugIdMapFilePath();

  // Check if the file exists before trying to delete
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("SlugIdMapping.json has been deleted");
  } else {
    console.log("SlugIdMapping.json does not exist, nothing to delete");
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const mapRichText = (richText: NotionRichText[]): RichTextElement[] => {
  const mappedRichText: RichTextElement[] = richText.map((text) => {
    if (text.href) {
      return {
        type: "link",
        text: text.plain_text,
        link: text.href,
      } as RichTextElement;
    }
    if (text.annotations.code) {
      return { type: "code", text: text.plain_text } as RichTextElement;
    }
    if (text.annotations.bold) {
      return { type: "bold", text: text.plain_text } as RichTextElement;
    }
    return { type: "text", text: text.plain_text } as RichTextElement;
  });

  return mappedRichText;
};

// Use `/tmp` in development and `/src/data` in production
const cacheFilePath = getImageAssetsFilePath();

export const readThumbnailCache = async () => {
  try {
    const data = await fsPromises.readFile(cacheFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading thumbnail cache:", error);
    return {};
  }
};

export const readThumbnailRedisCache = async () => {
  const cache = await redis.get("thumbnailCache");
  return cache || {};
}

export const updateThumbnailRedisCache = async(key: string, value: string) => {
  // Update the Redis cache with a new Cloudinary URL
  await redis.hset("thumbnailCache", { [key]: value });
}

export const updateThumbnailCache = async (cache: Record<string, string>) => {
  try {
    await fsPromises.writeFile(
      cacheFilePath,
      JSON.stringify(cache, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error updating thumbnail cache:", error);
  }
};

export const extractS3Key = (awsUrl: any): string => {
  let url;
  if (typeof awsUrl === "string") {
    url = new URL(awsUrl);
  } else {
    url = new URL(awsUrl.url);
  }
  // Extract the path portion of the URL (everything after the bucket name)
  return url.pathname;
};

export const clearCacheFile = () => {
  const filePath = getImageAssetsFilePath();

  try {
    if (fs.existsSync(filePath)) {
      // Clear the file by overwriting it with an empty JSON object
      fs.writeFileSync(filePath, JSON.stringify({}, null, 2), "utf8");
      console.log(`Cleared contents of ${filePath}`);
    } else {
      console.log(`${filePath} does not exist, nothing to clear.`);
    }
  } catch (error) {
    console.error(`Error clearing cache file at ${filePath}:`, error);
  }
};

export const getCloudinaryThumbnail = async (thumbnailUrl: string | null): Promise<string> => {
  if(!thumbnailUrl) return '';

  // Step 1: Extract the S3 Object key
  const cacheKey = extractS3Key(thumbnailUrl);

  let cloudinaryImgUrl = await redis.hget("thumbnailCache", cacheKey);


  if(!cloudinaryImgUrl){
    // Step 3: Download the image from AWS
    const imageBuffer = await downloadImageFromAWS(thumbnailUrl);

    // Step 4: Upload the buffer to Cloudinary
    cloudinaryImgUrl = await uploadBufferToCloudinary(imageBuffer, "portfolio");

    // Step 5: Update the Redis cache
    await redis.hset("thumbnailCache", { [cacheKey]: cloudinaryImgUrl });
  }
  return `${cloudinaryImgUrl}`;
}

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
