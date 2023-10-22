import dayjs from "dayjs";
import { cn } from "~/lib/utils";

interface ChallengeCardDetailsProps {
  zoneName: string;
  endDate: Date;
}

export function ChallengeCardDetails({ zoneName, endDate }: ChallengeCardDetailsProps) {
  const timeRemaining = dayjs(endDate).fromNow(true);
  const inProgress = dayjs() <= dayjs(endDate);
  const timeIndicatorText = inProgress ? `${timeRemaining} remaining` : "Challenge expired";

  return (
    <div className="flex items-center justify-between flex-1">
      <div className="flex flex-col">
        <p className="text-sm whitespace-nowrap">{zoneName}</p>
      </div>
      <div
        className={cn(
          "text-right text-sm text-gray-700 bg-gray-200 px-2 py-0.5 rounded-lg  whitespace-nowrap",
          !inProgress && "bg-red-100 text-red-600"
        )}>
        {timeIndicatorText}
      </div>
    </div>
  );
}
