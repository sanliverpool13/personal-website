interface SkillsProps {
  skillName: string;
  Icon: React.ElementType;
}

const SkillTile: React.FC<SkillsProps> = ({ skillName, Icon }) => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center box-border p-4 shadow-tile h-24 w-24 skill-tile-dm">
      <Icon />
      <span className="text-sm md:text-base font-medium bg-transparent">
        {skillName}
      </span>
    </div>
  );
};

export default SkillTile;
