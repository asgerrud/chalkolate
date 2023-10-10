import ChallengeItem from "~/components/profile/gym-challenges-card/ChallengeItem";
import { CreateChallengeForm } from "~/components/profile/gym-challenges-card/create-challenge-form-dialog/CreateChallengeForm";
import { type Grades } from "~/server/api/routers/grade";
import { api } from "~/lib/api";

interface GymChallengeCardProps {
  location;
  grades: Grades["data"];
}

export function GymChallengeCard({ location, grades }: GymChallengeCardProps) {
  const { data: zones } = api.zone.findZonesByLocation.useQuery({ locationId: location.id });

  return (
    <div className="max-w-[320px] w-full space-y-6">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">{location.name}</h3>
      <CreateChallengeForm location={location} zones={zones} grades={grades} />
      <div className="flex flex-col space-y-4">
        {location.challenges?.map((challenge) => (
          <ChallengeItem key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
}
