export interface BlogPost {
  id: string;
  title: string;
  datePosted: string;
  description: string;
  imageUrl: string;
  readTime: string;
  link: string;
  slug: string;
}

export interface BlogPostBody {
  id: string;
  title: string;
  datePosted: string;
  readTime: string;
  blocks: ContentBlock[];
}

export type ContentBlock = ParagraphBlock | ImageBlock;

export interface ParagraphBlock {
  type: 'paragraph';
  text: string;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
}

export interface RichTextElement {
  type: 'text' | 'link' | 'code' | 'bold';
  text: string;
  link?: string;
}
