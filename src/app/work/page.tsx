import LandingPageContainer from "@/components/LandingPageContainer";
import WorkSection from "@/components/work/worksection";
import { NextPage } from "next";

const WorkPage: NextPage = () => {
  return (
    <LandingPageContainer>
      <WorkSection />
    </LandingPageContainer>
  );
};

export default WorkPage;
