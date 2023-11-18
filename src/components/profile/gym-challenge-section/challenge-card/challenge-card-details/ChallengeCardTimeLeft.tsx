import { cn } from "~/lib/utils";
import dayjs from "dayjs";

interface ChallengeCardTimeLeftProps {
  endDate: Date;
}

export function ChallengeCardTimeLeft({ endDate }: ChallengeCardTimeLeftProps) {
  const timeRemaining = dayjs(endDate).fromNow(true);
  const inProgress = dayjs() <= dayjs(endDate);
  const timeIndicatorText = inProgress ? `${timeRemaining} remaining` : "Challenge expired";

  return (
    <div
      className={cn(
        "text-right text-sm text-gray-700 bg-gray-200 px-2 py-0.5 rounded-lg  whitespace-nowrap",
        !inProgress && "bg-red-100 text-red-600"
      )}>
      {timeIndicatorText}
    </div>
  );
}
