"use client";

interface EmbedProp {
  url: string;
}

const Embed: React.FC<EmbedProp> = ({ url }) => {
  if (url.includes("codepen.io")) {
    url = url.replace("/pen/", "/embed/") + "?default-tab=html%2Cresult";
  }

  // Check for Gist URL
  if (url.includes("gist.github.com")) {
    url = url.endsWith(".pibb") ? url : `${url}.pibb`;
  }
  return (
    <div style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}>
      <iframe
        src={url}
        style={{ width: "100%", height: "100%", border: "none" }}
        title="CodePen Embed"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  );
};

export default Embed;
