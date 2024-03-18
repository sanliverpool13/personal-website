interface HeadingBlockProps {
  text: string;
}

const HeadingBlock: React.FC<HeadingBlockProps> = ({ text }) => {
  return <h3 className="text-2xl font-bold">{text}</h3>;
};

export default HeadingBlock;
