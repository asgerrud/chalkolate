import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardContent } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { getChallengeTimePercentagePassed } from "~/util/Challenge.util";
import { type ChallengesByLocation } from "~/server/api/routers/challenge";
import { cn } from "~/lib/utils";

dayjs.extend(relativeTime);

interface ChallengeItemProps {
  challenge: ChallengesByLocation;
}

export default function ChallengeItem({ challenge }: ChallengeItemProps) {
  const { zone, endDate } = challenge;

  const timeRemaining = dayjs(endDate).fromNow(true);
  const challengeInProgress = dayjs() <= dayjs(endDate);
  const timeIndicatorText = challengeInProgress ? `${timeRemaining} remaining` : "Challenge expired";

  const percentagePassed = getChallengeTimePercentagePassed(endDate, zone.changeSchedule.changeIntervalWeeks);

  const getPercentagePassedColor = (percentage: number) => {
    if (percentage > 80) return "bg-red-500";
    if (percentage > 66) return "bg-orange-500";
    if (percentage > 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="w-full md:max-w-[294px] hover:scale-[101%] transition duration-200">
      <img
        src={challenge.imageUrl}
        className={cn("object-cover w-full h-[200px]", !challengeInProgress && "opacity-75")}
        style={{
          backgroundColor: challenge.grade.hex
        }}
      />
      <CardContent className="p-3">
        <div className="flex flex-col flex-1">
          <div className="flex flex-1 justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm">{zone.name}</p>
            </div>
            <div
              className={cn(
                "text-right text-sm text-gray-700 bg-gray-200 px-2 py-0.5 rounded-lg",
                !challengeInProgress && "bg-red-100 text-red-600"
              )}>
              {timeIndicatorText}
            </div>
          </div>
          {challengeInProgress && (
            <Progress
              className="mt-4 h-3"
              color={getPercentagePassedColor(percentagePassed)}
              value={percentagePassed}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
