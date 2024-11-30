import { NextPage } from "next";
import AboutMe from "@/components/about/aboutme";
import TechStack from "@/components/about/techstack";
import WorkExperience from "@/components/workexperience";
import { workExperiences } from "@/data/workexperiences";
import LandingPageContainer from "@/components/LandingPageContainer";

const AboutPage: NextPage = () => {
  return (
    <LandingPageContainer>
      <AboutMe />
      {/* <TechStack /> */}
      <WorkExperience
        title="Work Experience"
        workExperiences={workExperiences}
      />
    </LandingPageContainer>
  );
};

export default AboutPage;
