"use client";

interface CodeBlockProps {
  text: string;
}
const CodeBlock: React.FC<CodeBlockProps> = ({ text }) => {
  return (
    <div className="code-bg p-4 rounded overflow-x-scroll">
      <pre className="bg-inherit">
        <code className="bg-inherit font-code">{text}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
