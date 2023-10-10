import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardContent } from "~/components/ui/card";

dayjs.extend(relativeTime);

interface ChallengeItemProps {
  challenge;
}

export default function ChallengeItem({ challenge }: ChallengeItemProps) {
  const { zone, endDate } = challenge;

  const timeRemaining = dayjs(endDate).fromNow(true);

  return (
    <Card className="w-full">
      {/* TODO: show color if no picture selected */}

      <img
        src={challenge.imageUrl}
        className="object-cover w-full h-[200px]"
        style={{
          backgroundColor: challenge.grade.hex
        }}
      />
      <CardContent className="p-3">
        <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-1 justify-between items-center">
            <div className="flex flex-col">
              <p className="text-sm">{zone.name}</p>
            </div>
            <div className="text-right text-sm text-gray-700 bg-gray-200 px-2 py-0.5 rounded-lg">
              {timeRemaining} remaining
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
