import { ChallengeDetails } from "~/components/challenge/challenge-details/ChallengeDetails";
import { Button } from "~/components/ui/button";

interface ChallengeBodyProps {
  zoneName: string;
  endDate: Date;
  completedAt?: Date;
  onFinish: () => void;
}

export default function ChallengeBody({ zoneName, endDate, completedAt, onFinish }: ChallengeBodyProps) {
  return (
    <div className="flex flex-col justify-between w-full bg-white p-4">
      <div className="space-y-4">
        <ChallengeDetails zoneName={zoneName} endDate={endDate} completedAt={completedAt} />
      </div>
      {!completedAt && (
        <div className="text-right py-3">
          <Button onClick={onFinish}>Finish challenge</Button>
        </div>
      )}
    </div>
  );
}
