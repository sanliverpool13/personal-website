import { Works } from "@/data/works";
import WorkCard from "./workcard";

const WorkSection: React.FC = () => {
  return (
    <section className="flex flex-col w-full md:gap-48 gap-20">
      {Works.sort((a, b) => parseInt(b.id) - parseInt(a.id)).map(
        (workCard, index) => (
          <WorkCard key={workCard.id} work={workCard} />
        ),
      )}
    </section>
  );
};

export default WorkSection;
