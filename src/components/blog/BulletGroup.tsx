"use client";

interface RichTextElement {
  type: "text" | "link" | "code" | "bold";
  text: string;
  link?: string;
}

interface BulletBlockProps {
  bullets: RichTextElement[][];
}

const BulletBlock: React.FC<BulletBlockProps> = ({ bullets }) => {
  return (
    <ul className="list-disc pl-8 space-y-1 ">
      {bullets.map((bullet, index) => {
        return (
          <li key={index} className="text-lg ">
            {bullet.map((element, index) => {
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
                    <code
                      key={index}
                      className="code-bg px-1 text-base p-0.5 rounded"
                    >
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
        );
      })}
    </ul>
  );
};

export default BulletBlock;
