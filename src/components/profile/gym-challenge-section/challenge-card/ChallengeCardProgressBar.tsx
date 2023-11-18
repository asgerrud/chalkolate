import { Progress } from "~/components/ui/progress";
import { getChallengeTimePercentagePassed } from "~/util/Challenge.util";

interface ChallengeProgressBarProps {
  endDate: Date;
  changeIntervalWeeks: number;
}

export function ChallengeProgressBar({ endDate, changeIntervalWeeks }: ChallengeProgressBarProps) {
  const percentagePassed = getChallengeTimePercentagePassed(endDate, changeIntervalWeeks);

  const getProgressBarColor = (percentage: number) => {
    if (percentage > 80) return "bg-red-500";
    if (percentage > 66) return "bg-orange-500";
    if (percentage > 50) return "bg-yellow-500";
    return "bg-green-500";
  };

  return <Progress className="h-3" color={getProgressBarColor(percentagePassed)} value={percentagePassed} />;
}
