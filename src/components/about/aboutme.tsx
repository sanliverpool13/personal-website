"use client";
import Image from "next/image";
import AboutMePic from "../../../public/AboutMe.jpg";
import SectionTitle from "../general/sectiontitle";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";

// Define the animation variants
const titleContainerVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const contentTextContainerVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const contentImageContainerVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } },
};

const AboutMe = () => {
  return (
    <section className="flex flex-col md:gap-20 gap-12">
      <SectionTitle title="I'm Sanjar" />
      {/* <div className="flex flex-col xl:flex-row xl:justify-between lg:gap-12 gap-8 w-full">
        <div className="relative w-full h-48 xl:h-auto">
          <Image
            src={AboutMePic}
            alt="My profile picture"
            className="rounded"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col text-xl leading-8 text-justify md:space-y-4 space-y-2">
          <h2 className="font-bold text-3xl">
            I&apos;m a software engineer from Toronto.
          </h2>
          <p>
            I have been building web apps for the past 5 years. I enjoy building
            the frontend and backend equally.
          </p>
          <p>
            I read a lot of books in my free time, mostly sci-fi, fantasy and
            non-fiction about tech. I love to run and exercise. I am into hiking
            and calisthenics and I have played highly competitive soccer my
            entire life.
          </p>
          <p>
            My goal with this website is just for it to be a playground for me
            to build things I like and write about topics I find interesting.
          </p>
        </div>
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-10 md:gap-4 lg:gap-8 xl:gap-12 gap-8 w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="md:col-span-4 relative w-full h-48 md:h-auto"
        >
          <Image
            src={AboutMePic}
            alt="My profile picture"
            className="rounded"
            fill
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariantsWithDelay}
          className="md:col-start-5 md:col-span-6 flex flex-col text-xl leading-8 text-justify md:space-y-4 space-y-2"
        >
          <h2 className="font-bold text-3xl">
            I&apos;m a software engineer from Toronto.
          </h2>
          <p>
            I have been building web apps for the past 5 years. I enjoy building
            the frontend and backend equally.
          </p>
          <p>
            I read a lot of books in my free time, mostly sci-fi, fantasy and
            non-fiction about tech. I love to run and exercise. I am into hiking
            and calisthenics and I have played highly competitive soccer my
            entire life.
          </p>
          <p>
            My goal with this website is just for it to be a playground for me
            to build things I like and write about topics I find interesting.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
