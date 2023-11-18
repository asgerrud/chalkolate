interface ChallengeCardTechniqueItemProps {
  name: string;
}

export function ChallengeCardTechniqueItem({ name }: ChallengeCardTechniqueItemProps) {
  return (
    <div className="rounded-md w-[64px] h-[64px] bg-teal-400 p-1 flex items-center justify-center text-sm font-medium">
      {name}
    </div>
  );
}
