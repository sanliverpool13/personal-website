interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => {
  return (
    <span
      className={`inline-block border-2 rounded-lg py-1 px-3 text-sm text-center`}
    >
      {skill}
    </span>
  );
};

export default SkillTag;
