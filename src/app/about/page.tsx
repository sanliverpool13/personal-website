import { NextPage } from "next";
import AboutMe from "@/components/about/aboutme";
import TechStack from "@/components/about/techstack";
import WorkExperience from "@/components/workexperience";
import { workExperiences } from "@/data/workexperiences";
import ThemeSwitch from "@/components/ThemeSwitch";

const AboutPage: NextPage = () => {
  return (
    <>
      <>
        <AboutMe />
        <TechStack />
        <WorkExperience
          title="Work Experience"
          workExperiences={workExperiences}
        />
      </>
    </>
  );
};

export default AboutPage;
