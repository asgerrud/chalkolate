import { TechniqueGridItem } from "~/components/challenge/challenge-details/technique-grid/TechniqueGridItem";

export function TechniqueGrid() {
  const techniques = ["crimps", "slab", "slopers"];

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-3 w-full">
      <p className="text-sm mb-2">Techniques</p>
      <div className="flex flex-wrap space-x-2">
        {techniques.map((technique) => {
          return <TechniqueGridItem key={technique} name={technique} />;
        })}
      </div>
    </div>
  );
}
