"use client";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";

interface RichTextElement {
  type: "text" | "link" | "code" | "bold";
  text: string;
  link?: string;
}

interface ParagraphBlockProps {
  richTextElements: RichTextElement[];
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = ({
  richTextElements,
}) => {
  return (
    <>
      {/* // <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="text-xl"
    > */}
      <p className="text-xl">
        {richTextElements.map((element, index) => {
          switch (element.type) {
            case "link":
              return (
                <a
                  key={index}
                  href={element.link}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {element.text}
                </a>
              );
            case "code":
              return (
                <code
                  key={index}
                  className="text-base bg-gray-200 p-0.5 rounded"
                >
                  {element.text}
                </code>
              );
            case "bold":
              return <b key={index}>{element.text}</b>;
            case "text":
            default:
              return <span key={index}>{element.text}</span>;
          }
        })}
      </p>
      {/* </motion.p> */}
    </>
  );
};

export default ParagraphBlock;
