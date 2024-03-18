interface ParagraphBlockProps {
  text: string;
}

const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ text }) => {
  return <p className="text-xl leading-9">{text}</p>;
};

export default ParagraphBlock;
