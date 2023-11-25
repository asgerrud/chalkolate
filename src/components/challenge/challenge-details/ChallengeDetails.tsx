import { Stat } from "~/components/ui/custom/Stat";
import dayjs from "dayjs";
import { TechniqueGrid } from "~/components/challenge/challenge-details/technique-grid/TechniqueGrid";

interface ChallengeCardExpandedDetailsProps {
  zoneName: string;
  endDate: Date;
}
export function ChallengeDetails({ zoneName, endDate }: ChallengeCardExpandedDetailsProps) {
  return (
    <>
      <div className="flex justify-between space-x-4">
        <Stat label="Zone">{zoneName}</Stat>
        <Stat label="Grade">5C - 6A</Stat>
      </div>

      <TechniqueGrid />

      <div className="flex text-sm ml-1 flex-col">
        <span className="font-medium">Disappears on</span>
        <div className="flex flex-row">{dayjs(endDate).format("DD/MM/YYYY")}</div>
      </div>
    </>
  );
}
