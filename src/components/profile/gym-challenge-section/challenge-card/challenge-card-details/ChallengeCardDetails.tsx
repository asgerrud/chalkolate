import { ChallengeCardTimeLeft } from "~/components/profile/gym-challenge-section/challenge-card/challenge-card-details/ChallengeCardTimeLeft";

interface ChallengeCardDetailsProps {
  zoneName: string;
  endDate: Date;
}

export function ChallengeCardDetails({ zoneName, endDate }: ChallengeCardDetailsProps) {
  return (
    <div className="flex items-center justify-between flex-1">
      <div className="flex flex-col">
        <p className="text-sm whitespace-nowrap">{zoneName}</p>
      </div>
      <ChallengeCardTimeLeft endDate={endDate} />
    </div>
  );
}
