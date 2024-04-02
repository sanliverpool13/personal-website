"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";

interface ButtonLinkProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}

const ButtonLink = ({ href, ariaLabel, children }: ButtonLinkProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        aria-label={ariaLabel}
        className="inline-flex items-center btn-color justify-center gap-2 py-2 px-4 rounded-md shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
      >
        {children}
      </motion.a>
    </Link>
  );
};

export default ButtonLink;
