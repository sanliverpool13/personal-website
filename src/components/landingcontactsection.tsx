import SectionTitle from "./general/sectiontitle";
import ButtonLink from "./general/buttonlink";

const GetInTouchSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-10">
      <SectionTitle title="Get In Touch" />
      <div className="text-center max-w-xl mx-auto">
        {/* Adjusted div for text content */}
        <p className="text-xl lg:text-4xl">
          Contact me if you have any questions or just want to say hi!
        </p>
      </div>
      <ButtonLink href="/contact" ariaLabel="Contact Me">
        Contact Me
      </ButtonLink>
    </section>
  );
};

export default GetInTouchSection;
