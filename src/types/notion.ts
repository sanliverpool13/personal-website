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
  | { id: string; type: "multi_select"; multi_select: NotionMultiSelect[] }
  | NotionCreatedTime
  | NotionTitle
  | NotionLastEditedTime
  | NotionDate;

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

export interface NotionDate {
  id: string;
  type: string;
  date: { end?: string; start: string };
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

export interface NotionMultiSelect {
  color: string;
  id: string;
  name: string;
}

export interface NotionLastEditedTime {
  id: string;
  type: "last_edited_time";
  last_edited_time: string;
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

export interface NotionExternalImageBlock {
  object: string;
  type: "image";
  image: {
    type: string;
    external: {
      url: string;
    };
  };
}

export interface NotionHeading3Block {
  object: string;
  type: "heading_3";
  heading_3: {
    rich_text: NotionRichText[];
  };
}

export interface NotionCodeBlock {
  object: string;
  type: "code";
  code: {
    caption: NotionRichText[];
    rich_text: NotionRichText[];
  };
}

export interface NotionBulletBlock {
  object: string;
  type: "bulleted_list_item";
  bulleted_list_item: {
    rich_text: NotionRichText[];
  };
}

export interface NotionEmbed {
  object: string;
  type: "embed";
  embed: {
    url: string;
  };
}

export interface NotionQuote {
  type: "quote";
  quote: {
    rich_text: NotionRichText[];
    color: string;
  };
}

export interface NotionDivider {
  object: string;
  type: "divider";
  divider: {};
}

export type NotionBlock =
  | NotionParagraphBlock
  | NotionImageBlock
  | NotionHeading3Block
  | NotionCodeBlock
  | NotionBulletBlock
  | NotionEmbed
  | NotionDivider
  | NotionQuote;

export type NotionBlocksArray = NotionBlock[];
