import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}

const ButtonLink = ({ href, ariaLabel, children }: ButtonLinkProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <a
        aria-label={ariaLabel}
        className="inline-flex items-center btn-color justify-center gap-2 bg-[#FBCC75]  py-2 px-4 rounded-md shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-[#f2c065]"
      >
        {children}
      </a>
    </Link>
  );
};

export default ButtonLink;
