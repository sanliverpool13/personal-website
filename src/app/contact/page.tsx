import LandingPageContainer from "@/components/LandingPageContainer";
import ContactForm from "@/components/contact/contact";
import { NextPage } from "next";

const ContactPage: NextPage = () => {
  return (
    <LandingPageContainer>
      <ContactForm />
    </LandingPageContainer>
  );
};

export default ContactPage;
