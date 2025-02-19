"use client";
import { useEffect, useState } from "react";

interface TableOfContentsProps {
  headings: { id: string; text: string }[];
  contentRef: React.RefObject<HTMLDivElement>;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
  contentRef,
}) => {
  const [activeHeading, setActiveHeading] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const viewportHeight = window.innerHeight;
      const threshold = 100; // 100px above the bottom of the viewport
      let currentActive = "";

      for (let i = 0; i < headings.length; i++) {
        const headingElement = document.getElementById(headings[i].id);
        if (headingElement) {
          const rect = headingElement.getBoundingClientRect();

          // Check if the heading is in view or 100px above the bottom
          if (rect.top >= 0 && rect.bottom <= viewportHeight - threshold) {
            currentActive = headings[i].id;
            break;
          }
        }
      }

      setActiveHeading(currentActive);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings, contentRef]);

  return (
    <div className="hidden lg:block sticky top-20 w-64 text-sm">
      <p className="font-bold  mb-2">TABLE OF CONTENTS</p>
      <ul className="space-y-1 ">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block p-2 rounded transition ${
                activeHeading === heading.id ? "text-orange-300 font-bold" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById(heading.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
