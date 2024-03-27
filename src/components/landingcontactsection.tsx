"use client";
import SectionTitle from "./general/sectiontitle";
import ButtonLink from "./general/buttonlink";
import { motion } from "framer-motion";

// Define the animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const GetInTouchSection: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className=" w-full"
    >
      <section className="flex flex-col w-full md:gap-10 gap-6">
        <SectionTitle title="Get In Touch" />
        <div className=" max-w-xl">
          {/* Adjusted div for text content */}
          <p className="text-xl lg:text-2xl">
            Contact me if you have any questions or just want to say hi!
          </p>
        </div>
        <div className="w-full md:w-auto">
          <ButtonLink href="/contact" ariaLabel="Contact Me">
            Contact Me
          </ButtonLink>
        </div>
      </section>
    </motion.div>
  );
};

export default GetInTouchSection;
