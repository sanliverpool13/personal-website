import { Works } from "@/data/works";
import WorkCard from "./workcard";

const WorkSection: React.FC = () => {
  return (
    <section className="flex flex-col w-full gap-48">
      {Works.map((workCard, index) => (
        <WorkCard key={workCard.id} work={workCard} />
      ))}
    </section>
  );
};

export default WorkSection;
