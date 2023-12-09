import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardContent } from "~/components/ui/card";
import { ChallengeProgressBar } from "./ChallengeCardProgressBar";
import { ChallengeCardDetails } from "./challenge-card-details/ChallengeCardDetails";
import { ChallengeCardImage } from "./ChallengeCardImage";
import { cn } from "~/lib/utils";
import { EPageRoute } from "~/types/enums/EPageRoute";
import Link from "next/link";
import { type ChallengeWithZoneAndGrade } from "~/server/api/routers/challenge";

dayjs.extend(relativeTime);

interface ChallengeCardProps {
  challenge: ChallengeWithZoneAndGrade;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const { id, imageUrl, zone, grade, endDate } = challenge;

  const challengeInProgress = dayjs() <= dayjs(endDate);

  const challengeLink = EPageRoute.CHALLENGE + "/" + id;

  return (
    <Link href={challengeLink}>
      <Card className="w-full cursor-pointer">
        <ChallengeCardImage id={id} imageUrl={imageUrl} gradeColor={grade.hex} />
        <CardContent className="p-3">
          <div className={cn("flex flex-col flex-1 space-y-4")}>
            <ChallengeCardDetails zoneName={zone.name} endDate={endDate} />
            {challengeInProgress && (
              <ChallengeProgressBar endDate={endDate} changeIntervalWeeks={zone.changeSchedule.changeIntervalWeeks} />
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
