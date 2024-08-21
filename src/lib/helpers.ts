import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/types/blogPost';
import { SLUGIDMAPFILE } from '@/constants';
import { RichTextElement } from '@/types/blogPost';
import {
  NotionBulletBlock,
  NotionParagraphBlock,
  NotionRichText,
} from '@/types/notion';

export const saveSlugIdMapToJson = (parsedNotionDatabasePages: BlogPost[]) => {
  try {
    const SlugIdMapping = parsedNotionDatabasePages.reduce<
      Record<string, BlogPost>
    >((acc, page) => {
      acc[page.slug] = page;
      return acc;
    }, {});

    // Define the path to the JSON file
    const filePath = path.resolve(
      process.cwd(),
      'src',
      'data',
      `${SLUGIDMAPFILE}`
    );

    // Write the mapping to a JSON file
    fs.writeFileSync(filePath, JSON.stringify(SlugIdMapping, null, 2));
  } catch (error) {
    throw new Error('Failed to write to file');
  }
};

export const getSlugIdMapFromJson = async () => {
  const filePath = path.join(process.cwd(), 'src', 'data', `${SLUGIDMAPFILE}`);
  const jsonData = fs.readFileSync(filePath, 'utf8');
  const slugIdMapping = JSON.parse(jsonData);

  return slugIdMapping;
};

export const deleteSlugIdMapJson = async () => {
  const filePath = path.resolve(
    process.cwd(),
    'src',
    'data',
    `${SLUGIDMAPFILE}`
  );

  // Check if the file exists before trying to delete
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('SlugIdMapping.json has been deleted');
  } else {
    console.log('SlugIdMapping.json does not exist, nothing to delete');
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const mapRichText = (richText: NotionRichText[]): RichTextElement[] => {
  const mappedRichText: RichTextElement[] = richText.map((text) => {
    if (text.href) {
      return {
        type: 'link',
        text: text.plain_text,
        link: text.href,
      } as RichTextElement;
    }
    if (text.annotations.code) {
      return { type: 'code', text: text.plain_text } as RichTextElement;
    }
    if (text.annotations.bold) {
      return { type: 'bold', text: text.plain_text } as RichTextElement;
    }
    return { type: 'text', text: text.plain_text } as RichTextElement;
  });

  return mappedRichText;
};
