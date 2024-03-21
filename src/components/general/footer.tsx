import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="flex items-center justify-center w-full md:h-60 h-40 lg:px-48 md:px-24 px-10">
      <div className="flex flex-col items-center justify-center gap-6 container mx-auto max-w-5xl">
        <div className="flex gap-4">
          <a
            href="https://github.com/sanliverpool13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:opacity-50 transition-opacity duration-150"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/sanjarjelet/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:opacity-50 transition-opacity duration-150"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
        <p className="text-center">Designed & built by Sanjar Jelet</p>
      </div>
    </footer>
  );
};

export default Footer;
