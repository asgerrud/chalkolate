interface ChallengeCardTechniqueItemProps {
  name: string;
}

export function TechniqueGridItem({ name }: ChallengeCardTechniqueItemProps) {
  return (
    <div className="rounded-xl w-[64px] h-[24px] bg-teal-400 p-1 flex items-center justify-center text-sm font-medium">
      {name}
    </div>
  );
}
