import Image from "next/image";

interface ImageBlockProps {
  src: string;
  alt: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ src, alt }) => {
  return (
    <div className="relative max-w-full" style={{ height: "450px" }}>
      <Image
        src={src}
        alt={alt}
        layout="fill"
        objectFit="cover"
        className="rounded-md"
      />
    </div>
  );
};

export default ImageBlock;
