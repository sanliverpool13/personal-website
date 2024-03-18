import Image from "next/image";
import AboutMePic from "../../../public/AboutMe.jpg";
import SectionTitle from "../general/sectiontitle";

const AboutMe = () => {
  return (
    <section className="flex flex-col gap-20">
      <SectionTitle title="About Me" />
      <div className="md:block flex flex-col gap-8 w-full">
        <div className="md:float-left md:mr-9">
          <div className="relative w-full md:w-96">
            <Image
              src={AboutMePic} // Adjust accordingly
              alt="My profile picture"
              className="rounded"
            />
          </div>
        </div>
        <div className="text-xl leading-9 text-justify md:space-y-4 space-y-2">
          <p>
            I&apos;m Sanjar, I like to build things from scratch on the web.
          </p>
          <p>
            I read a lot of books in my free time, as well as run and play
            soccer. I try to eat mostly plant based and am into hiking and
            calisthenics.
          </p>
          <p>
            I have worked as a software engineer since graduating in 2019 from
            the University of Toronto. I dabble with both frontend and backend.
          </p>
          <p>
            My goal with this website is for it to serve as a platform where I
            can create and tinker with projects, as well as share some articles
            about general topics I find interesting. I plan to continuously
            update this website.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
