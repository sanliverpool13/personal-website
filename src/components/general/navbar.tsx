"use client";

import React, { ReactNode, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { setTheme, resolvedTheme } = useTheme();
  console.log("themere resolved", resolvedTheme);

  return (
    <nav className="absolute top-0 w-full h-40 lg:px-48 md:px-24 px-10">
      {/* Inner Nav container */}
      <div className="flex justify-between items-center h-full container mx-auto w-full max-w-5xl">
        {/* Container for Logo and Navigation Links */}
        <div className="flex items-center gap-16">
          {/* Logo Section */}
          <Link
            href="/"
            className="text-2xl font-bold"
            style={{ textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)" }}
          >
            SanJ
          </Link>
          <NavLinks layout="horizontal" />
        </div>

        {/* Navigation Links and Sun Icon for small screens */}
        <div
          className={`absolute top-0 left-0 z-50 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden transition duration-300 ease-in-out h-screen w-full flex flex-col items-center justify-center space-y-6`}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-5"
            onClick={() => setIsMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
          <NavLinks layout="vertical" />

          {/* Sun Icon below the navigation links */}
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
        </div>

        <div className="flex items-center justify-center h-full w-6">
          {/* Hamburger Icon For Smaller Screens */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {/* Sun Icon for Larger Screens */}
          <button
            aria-label="Toggle Dark Mode"
            className="hidden lg:flex items-center justify-center text-2xl"
            onClick={() => {
              console.log("clicked");
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
          >
            <FontAwesomeIcon icon={resolvedTheme === "dark" ? faMoon : faSun} />
          </button>
        </div>
      </div>
    </nav>
  );
};

interface NavLinksProps {
  layout: "horizontal" | "vertical";
}

const NavLinks: React.FC<NavLinksProps> = ({ layout }) => {
  // Determine class names based on layout
  const containerClasses =
    layout === "horizontal"
      ? "hidden lg:flex gap-4" // Use 'lg:flex' to show horizontally only on large screens
      : "flex flex-col items-center space-y-6 lg:hidden"; // Use 'lg:hidden' to hide on large screens, display vertically otherwise

  return (
    <div className={containerClasses}>
      {navigationLinks.map((link) => (
        <NavLink key={link.href} href={link.href} text={link.text} />
      ))}
    </div>
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
      className={`hover:text-gray-300 font-normal text-base  p-2.5 ${
        isActive ? "text-[#FBCC75]" : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
};

export default Navbar;
