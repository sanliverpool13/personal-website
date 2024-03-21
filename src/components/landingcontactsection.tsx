import SectionTitle from "./general/sectiontitle";
import ButtonLink from "./general/buttonlink";

const GetInTouchSection: React.FC = () => {
  return (
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
  );
};

export default GetInTouchSection;
