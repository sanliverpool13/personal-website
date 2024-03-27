"use client";
import Image from "next/image";

import BestProfileImg from "../../public/BestProfile.jpg";
import ButtonLink from "./general/buttonlink";
import { motion } from "framer-motion";

// Define the animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Landing = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <section className="flex flex-col md:flex-row w-full items-center md:justify-between gap-12 md:gap-8">
        {/* Text Section */}
        <div className="flex flex-col md:gap-16 gap-8 w-full md:flex-1">
          <header className="space-y-4">
            <h1 className="text-2xl lg:text-4xl font-bold space-y-4">
              <span className="block">Hi, I&apos;m Sanjar.</span>
              <span>A software engineer.</span>
            </h1>
            <p className="text-base lg:text-xl">
              I design and build things with code. I also write about stuff I
              find interesting.
            </p>
          </header>

          <div className="w-full md:w-auto">
            <ButtonLink href="about" ariaLabel="More About Me">
              More About Me
            </ButtonLink>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:flex-1 flex justify-end">
          <div className="relative w-full md:w-5/6">
            <Image
              src={BestProfileImg}
              alt="Landing Section Profile Picture"
              className="responsive-ellipse rounded-lg md:rounded-none"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Landing;
