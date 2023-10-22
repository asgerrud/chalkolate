import dayjs from "dayjs";
import Image from "next/image";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardContent } from "~/components/ui/card";
import { type ChallengesByLocation } from "~/server/api/routers/challenge";
import { cn } from "~/lib/utils";
import { ChallengeProgressBar } from "./ChallengeCardProgressBar";
import { ChallengeCardDetails } from "./ChallengeCardDetails";
import { ChallengeCardImage } from "./ChallengeCardImage";

dayjs.extend(relativeTime);

interface ChallengeItemProps {
  challenge: ChallengesByLocation;
}

export default function ChallengeItem({ challenge }: ChallengeItemProps) {
  const { imageUrl, grade, zone, endDate } = challenge;

  const challengeInProgress = dayjs() <= dayjs(endDate);

  return (
    <Card className="w-full hover:scale-[101%] transition duration-200">
      <CardContent className="p-3">
        <div className="flex flex-col flex-1">
          <ChallengeCardDetails zoneName={zone.name} endDate={endDate} />
          {challengeInProgress && (
            <ChallengeProgressBar endDate={endDate} changeIntervalWeeks={zone.changeSchedule.changeIntervalWeeks} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
