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

interface BulletBlockProps {
  richTextElements: RichTextElement[];
}

const BulletBlock: React.FC<BulletBlockProps> = ({ richTextElements }) => {
  return (
    // <motion.li
    //   initial="hidden"
    //   whileInView="visible"
    //   viewport={{ once: true }}
    //   variants={containerVariants}
    //   className="text-xl leading-2"
    // >
    <li className="text-xl leading-2">
      {richTextElements.map((element, index) => {
        switch (element.type) {
          case "link":
            return (
              <a
                key={index}
                href={element.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {element.text}
              </a>
            );
          case "code":
            return (
              <code key={index} className="text-base bg-gray-200 p-0.5 rounded">
                {element.text}
              </code>
            );
          case "bold":
            return (
              <span key={index} className="font-bold">
                {element.text}
              </span>
            );
          case "text":
          default:
            return <span key={index}>{element.text}</span>;
        }
      })}
    </li>
    // {/* </motion.li> */}
  );
};

export default BulletBlock;
