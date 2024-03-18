import fs from "fs";
import path from "path";
import { BlogPost } from "@/types/blogPost";
import { SLUGIDMAPFILE } from "@/constants";

export const saveSlugIdMapToJson = async (
  parsedNotionDatabasePages: BlogPost[]
) => {
  const SlugIdMapping = parsedNotionDatabasePages.reduce<
    Record<string, string>
  >((acc, page) => {
    acc[page.slug] = page.id;
    return acc;
  }, {});

  // Define the path to the JSON file
  const filePath = path.resolve(
    process.cwd(),
    "src",
    "data",
    `${SLUGIDMAPFILE}`
  );

  // Write the mapping to a JSON file
  fs.writeFileSync(filePath, JSON.stringify(SlugIdMapping, null, 2));
};

export const getSlugIdMapFromJson = async () => {
  const filePath = path.join(process.cwd(), "src", "data", `${SLUGIDMAPFILE}`);
  console.log("file path", filePath);
  const jsonData = fs.readFileSync(filePath, "utf8");
  const slugIdMapping = JSON.parse(jsonData);

  return slugIdMapping;
};

export const deleteSlugIdMapJson = async () => {
  console.log("deleted");
  const filePath = path.resolve(
    process.cwd(),
    "src",
    "data",
    `${SLUGIDMAPFILE}`
  );

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
