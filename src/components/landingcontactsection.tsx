"use client";
import SectionTitle from "./general/sectiontitle";
import ButtonLink from "./general/buttonlink";
import { motion } from "framer-motion";
import {
  containerVariants,
  containerVariantsWithDelay,
} from "@/lib/framer-motion";

const GetInTouchSection: React.FC = () => {
  return (
    <section className="flex flex-col w-full md:gap-10 gap-6">
      <SectionTitle title="Get In Touch" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className=" max-w-xl"
      >
        {/* Adjusted div for text content */}
        <p className="text-xl lg:text-2xl">
          Contact me if you have any questions or just want to say hi!
        </p>
      </motion.div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full md:w-auto"
      >
        <ButtonLink href="/contact" ariaLabel="Contact Me">
          Contact Me
        </ButtonLink>
      </motion.div>
    </section>
  );
};

export default GetInTouchSection;
