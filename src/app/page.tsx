import { NextPage } from "next";
import Landing from "@/components/landing";
import WorkExperience from "@/components/workexperience";
import LandingBlogSection from "@/components/landingblogsection";
import LandingContactSection from "@/components/landingcontactsection";
import { workExperiences } from "@/data/workexperiences";
import { fetchNotionData, parseNotionData } from "@/lib/notion/notionService";
import { NotionApiResponse } from "@/types/notion";
import LandingPageContainer from "@/components/LandingPageContainer";

const HomePage: NextPage = async () => {
  const databaseId = `${process.env.NOTION_BLOG_DB_ID}`;
  const rawNotionDatabaseData = await fetchNotionData(databaseId);
  const parsedNotionDatabaseData = await parseNotionData(
    rawNotionDatabaseData as NotionApiResponse
  );

  return (
    <LandingPageContainer>
      <Landing key="landing" />
      <WorkExperience
        key="work-experience"
        showButton={true}
        title="Recent Work Experience"
        workExperiences={workExperiences.slice(0, 2)}
      />
      <LandingBlogSection
        key="blog-section"
        blogPosts={parsedNotionDatabaseData.slice(0, 2)}
      />
      <LandingContactSection key="contact-section" />
    </LandingPageContainer>
  );
};

export default HomePage;
