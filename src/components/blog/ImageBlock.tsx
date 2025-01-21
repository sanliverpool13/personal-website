import Image from "next/image";

interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ src, alt, caption }) => {
  return (
    <div className="flex flex-col">
      <div className="relative max-w-full" style={{ height: "450px" }}>
        <Image src={src} alt={alt} fill className="rounded-md" />
      </div>
      {caption && (
        <p className="text-center text-[#949494] text-sm mt-2">{caption}</p>
      )}
    </div>
  );
};

export default ImageBlock;
