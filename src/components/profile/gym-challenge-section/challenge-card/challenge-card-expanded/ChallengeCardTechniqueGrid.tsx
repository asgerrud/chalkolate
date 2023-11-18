import { ChallengeCardTechniqueItem } from "~/components/profile/gym-challenge-section/challenge-card/challenge-card-expanded/ChallengeCardTechniqueItem";

export function ChallengeCardTechniqueGrid() {
  const techniques = ["crimps", "slab", "slopers"];

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-3 w-full">
      <p className="text-sm mb-2">Techniques</p>
      <div className="flex flex-wrap space-x-2">
        {techniques.map((technique) => {
          return <ChallengeCardTechniqueItem key={technique} name={technique} />;
        })}
      </div>
    </div>
  );
}
