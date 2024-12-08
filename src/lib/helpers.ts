import { BlogPost } from "@/types/blogPost";
import { RichTextElement } from "@/types/blogPost";
import {
 
  NotionRichText,
} from "@/types/notion";
import redis from "@/lib/redis"
import { v2 as cloudinary } from "cloudinary";


export const saveSlugIdMapRedis = async (parsedNotionDatabasePages: BlogPost[]) => {
  try {
    // Transform the parsed pages into a Slug ID map
    const slugIdMap = parsedNotionDatabasePages.reduce<Record<string, BlogPost>>(
      (acc, page) => {
        acc[page.slug] = page;
        return acc;
      },
      {}
    );

    // Save the map to Redis
    await redis.set("slugIdMap", JSON.stringify(slugIdMap));
    console.log("saved slug id to reddis")
  } catch (error) {
    console.log(error);
  }
}

export const getSlugIdMapFromRedis = async () => {
  try {
    const slugIdMap = await redis.get("slugIdMap");

    return slugIdMap ? JSON.parse(slugIdMap as string) : {};
  } catch (error) {
    console.log(error);
  }
}


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


export const readThumbnailRedisCache = async () => {
  const cache = await redis.get("thumbnailCache");
  return cache || {};
}

export const updateThumbnailRedisCache = async(key: string, value: string) => {
  // Update the Redis cache with a new Cloudinary URL
  await redis.hset("thumbnailCache", { [key]: value });
}


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
