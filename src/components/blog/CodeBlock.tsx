'use client';

interface CodeBlockProps {
  text: string;
}
const CodeBlock: React.FC<CodeBlockProps> = ({ text }) => {
  return (
    <div className="bg-gray-800  p-4 rounded font-mono overflow-x-scroll">
      <pre className="bg-inherit">
        <code className="bg-inherit text-white">{text}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
