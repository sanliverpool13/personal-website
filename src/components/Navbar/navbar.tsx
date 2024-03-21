"use client";

import React, { ReactNode, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useTheme } from "next-themes";

const navigationLinks = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About" },
  { href: "/work", text: "Work" },
  { href: "/blog", text: "Blog" },
  // { href: "/resume", text: "Resume" },
  { href: "/contact", text: "Contact" },
];

const Navbar = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="absolute top-0 w-full md:h-60 h-28 lg:px-48 md:px-24 px-10">
      <div className="flex justify-between items-center h-full container mx-auto w-full max-w-5xl">
        <NavLinks />
        <ThemeToggleButton />
      </div>
    </nav>
  );
};

// interface NavLinksProps {
//   layout: "horizontal" | "vertical";
// }

const NavLinks: React.FC = () => {
  return (
    <ul className="list-none flex md:gap-8 gap-2">
      {navigationLinks.map((link, index) => (
        <li key={link.href} className={`p-2 ${index === 0 ? "pl-0" : ""}`}>
          <NavLink href={link.href} text={link.text} />
        </li>
      ))}
    </ul>
  );
};

interface NavLinkProps {
  href: string;
  text: string;
  onClick?: () => void;
}

const NavLink = ({ href, text, onClick }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only call onClick if it's provided
    onClick?.(); // This is equivalent to onClick && onClick();
  };

  return (
    <Link
      href={href}
      passHref
      className={`hover:text-gray-300 text-sm md:text-base leading-none ${
        isActive ? "font-extrabold" : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
};

// ThemeToggleButton Component
const ThemeToggleButton = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center justify-center p-2">
      <button
        aria-label="Toggle Dark Mode"
        className="flex items-center justify-center md:text-2xl text-xl"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      >
        <FontAwesomeIcon icon={resolvedTheme === "dark" ? faMoon : faSun} />
      </button>
    </div>
  );
};

export default Navbar;

// Commented Out Dialog Pop Up Menu, might use in the future
{
  /* <div
className={`absolute top-0 left-0 z-50 transform ${
  isMenuOpen ? "translate-x-0" : "-translate-x-full"
} lg:hidden transition duration-300 ease-in-out h-screen w-full flex flex-col items-center justify-center space-y-6`}
>
<button
  className="absolute top-5 right-5"
  onClick={() => setIsMenuOpen(false)}
>
  <FontAwesomeIcon icon={faTimes} className="text-2xl" />
</button>
<NavLinks layout="vertical" />

<div className="pt-4">
  <button
    aria-label="Toggle Dark Mode"
    className="text-2xl"
    onClick={() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
      setIsMenuOpen(false);
    }}
  >
    <FontAwesomeIcon
      icon={resolvedTheme === "dark" ? faMoon : faSun}
    />
  </button>
</div>
</div> */
}

{
  /* <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="hidden text-2xl"
>
  <FontAwesomeIcon icon={faBars} />
</button> */
}

// Determine class names based on layout for mobile dialo
// const containerClasses =
//   layout === "horizontal"
//     ? "hidden lg:flex gap-8" // Use 'lg:flex' to show horizontally only on large screens
//     : "flex flex-col items-center space-y-6 lg:hidden"; // Use 'lg:hidden' to hide on large screens, display vertically otherwise
