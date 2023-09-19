import dayjs from "dayjs";

interface ChallengeItemProps {
  location: string;
  zone: string;
  endDate: Date;
}

export default function ChallengeItem({ location, zone, endDate }: ChallengeItemProps) {
  const getTimeUntilDate = (date: Date) => dayjs(date).fromNow(true);

  return (
    <div className="pb-2 border-b-[1px] ">
      <div className="flex items-center space-x-2">
        <div className="flex w-[36px] h-[36px] items-center bg-gray-300"></div>
        <div className="flex flex-1 justify-between">
          <div className="flex flex-col">
            <p className="bold">{location}</p>
            <p className="text-sm">{zone}</p>
          </div>
          <div className="text-right text-sm">{getTimeUntilDate(endDate)} remaining</div>
        </div>
      </div>
    </div>
  );
}
