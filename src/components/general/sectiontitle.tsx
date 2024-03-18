interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return <h2 className="text-3xl font-bold">{title}</h2>;
};

export default SectionTitle;
