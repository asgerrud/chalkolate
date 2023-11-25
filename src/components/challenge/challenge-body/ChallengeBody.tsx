import { ChallengeDetails } from "~/components/challenge/challenge-details/ChallengeDetails";
import { Button } from "~/components/ui/button";
import { Check } from "lucide-react";

interface ChallengeBodyProps {
  zoneName: string;
  endDate: Date;
}
export default function ChallengeBody({ zoneName, endDate }: ChallengeBodyProps) {
  return (
    <div className="flex flex-col justify-between w-full bg-white p-4">
      <div className="space-y-4">
        <p className="font-bold text-2xl">Challenge</p>
        <ChallengeDetails zoneName={zoneName} endDate={endDate} />
      </div>

      <div className="text-right py-3">
        <Button>
          Finish challenge
          <Check className="ml-1" size={18} />
        </Button>
      </div>
    </div>
  );
}
