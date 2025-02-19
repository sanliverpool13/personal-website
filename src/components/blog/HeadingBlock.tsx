"use client";

interface HeadingBlockProps {
  text: string;
  id: string;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ text, id }) => {
  return (
    <h3 id={id} className="text-3xl font-bold mt-6">
      {text}
    </h3>
  );
};

export default HeadingBlock;
