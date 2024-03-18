export interface NotionApiResponse {
  object: string;
  results: NotionPage[];
  next_cursor: null | string;
  has_more: boolean;
  type: string;
  page_or_database: object;
  request_id: string;
}

export interface NotionPage {
  object: string;
  id: string;
  created_time: string;
  last_edited_time: string;
  cover: null; // Adjust if your pages might have covers
  icon: null; // Adjust if your pages might have icons
  parent: {
    type: string;
    database_id: string;
  };
  archived: boolean;
  properties: {
    [key: string]: NotionProperty; // Key-value pairs for properties
  };
  url: string;
  public_url: null | string;
}

type NotionProperty =
  | {
      id: string;
      type: "date";
      date: { start: string; end: null | string; time_zone: null | string };
    }
  | { id: string; type: "rich_text"; rich_text: NotionRichText[] }
  | { id: string; type: "files"; files: NotionFile[] }
  | NotionCreatedTime
  | NotionTitle;

export interface NotionRichText {
  type: "text";
  text: {
    content: string;
    link: null | string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: null | string;
}

export interface NotionCreatedTime {
  id: string;
  type: "created_time";
  created_time: string;
}

export interface NotionFile {
  name: string;
  type: "file";
  file: {
    url: string;
    expiry_time: string;
  };
}

export interface NotionTitle {
  id: string;
  type: "title";
  title: NotionRichText[];
}

export interface NotionParagraphBlock {
  object: string;
  type: "paragraph";
  paragraph: {
    rich_text: NotionRichText[];
  };
}

export interface NotionImageBlock {
  object: string;
  type: "image";
  image: {
    file: {
      url: string;
    };
    caption: NotionRichText[];
  };
}

export interface NotionHeading3Block {
  object: string;
  type: "heading_3";
  heading_3: {
    rich_text: NotionRichText[];
  };
}

export type NotionBlock =
  | NotionParagraphBlock
  | NotionImageBlock
  | NotionHeading3Block;

export type NotionBlocksArray = NotionBlock[];
