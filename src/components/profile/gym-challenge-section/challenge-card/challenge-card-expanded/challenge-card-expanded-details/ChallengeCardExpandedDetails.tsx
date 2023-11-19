import { Stat } from "~/components/ui/custom/Stat";
import { TechniqueGrid } from "~/components/profile/gym-challenge-section/challenge-card/challenge-card-expanded/challenge-card-expanded-details/technique-grid/TechniqueGrid";
import dayjs from "dayjs";

interface ChallengeCardExpandedDetailsProps {
  zoneName: string;
  endDate: Date;
}
export function ChallengeCardExpandedDetails({ zoneName, endDate }: ChallengeCardExpandedDetailsProps) {
  return (
    <>
      <div className="flex justify-between space-x-4">
        <Stat label="Zone">{zoneName}</Stat>
        <Stat label="Grade">
          <div className="flex items-center">
            <p className="mr-2">5C - 6A</p>
          </div>
        </Stat>
      </div>

      <TechniqueGrid />

      <div className="flex text-sm ml-1 flex-col">
        <span className="font-medium">Disappears on</span>
        <div className="flex flex-row">{dayjs(endDate).format("DD/MM/YYYY")}</div>
      </div>
    </>
  );
}
