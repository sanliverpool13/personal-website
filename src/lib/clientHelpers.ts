import { RichTextElement } from "@/types/blogPost";
import { NotionRichText } from "@/types/notion";

export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

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

// export const getFlexBoxComponent = (type: string) {
//   switch(text){
//     case FlexBoxComponent.direction:
//       return (<FlexDirection />)
//   }
// }
