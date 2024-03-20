import Image from "next/image";

import BestProfileImg from "../../public/BestProfile.jpg";
import ButtonLink from "./general/buttonlink";

const Landing = () => {
  return (
    <section className="flex flex-col md:flex-row w-full items-center justify-between space-y-12 md:space-y-0 md:space-x-8">
      {/* Text Section */}
      <div className="flex flex-col md:gap-16 gap-8 w-full md:flex-1">
        <header>
          <p className="text-2xl lg:text-4xl space-y-4">
            Hi, I&apos;m Sanjar
            <span className="block">A software engineer.</span>
            <span className="block">
              I design and build things with code. I also write about stuff I
              find interesting.
            </span>
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
  );
};

export default Landing;
