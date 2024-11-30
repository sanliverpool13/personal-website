interface QuoteProps {
  text: string;
}

const Quote: React.FC<QuoteProps> = ({ text }) => {
  return (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
      {text}
    </blockquote>
  );
};

export default Quote;
