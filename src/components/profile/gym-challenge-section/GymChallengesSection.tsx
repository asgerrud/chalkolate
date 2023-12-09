import { api } from "~/lib/api";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useMemo, useState } from "react";
import { CreateChallengeCard } from "./create-challenge-card/CreateChallengeCard";
import ChallengeCard from "./challenge-card/ChallengeCard";
import { type ZoneWithChangeSchedule } from "~/server/api/routers/zone";
import { type ChallengeWithZoneAndGrade } from "~/server/api/routers/challenge";
import { type Grade } from ".prisma/client";

dayjs.extend(isSameOrBefore);

interface GymChallengeCardProps {
  locationId: string;
  locationName: string;
  grades: Grade[];
}

export function GymChallengesSection({ locationId, locationName, grades }: GymChallengeCardProps) {
  const [challenges, setChallenges] = useState<ChallengeWithZoneAndGrade[]>([]);
  const [zones, setZones] = useState<ZoneWithChangeSchedule[]>([]);

  const challengeQuery = api.challenge.findAllByLocation.useQuery(
    {
      locationId: locationId
    },
    {
      onSuccess: (challenges: ChallengeWithZoneAndGrade[]) => {
        setChallenges(challenges);
      }
    }
  );

  const zoneQuery = api.zone.findAllByLocation.useQuery(
    { locationId: locationId },
    {
      onSuccess: (zones: ZoneWithChangeSchedule[]) => {
        setZones(zones);
      }
    }
  );

  const activeChallenges: ChallengeWithZoneAndGrade[] = useMemo(
    () => challenges.filter((challenge) => dayjs().isSameOrBefore(challenge.endDate)),
    [challenges]
  );

  const expiredChallenges: ChallengeWithZoneAndGrade[] = useMemo(
    () => challenges.filter((challenge) => dayjs().isAfter(challenge.endDate)),
    [challenges]
  );

  const gridClasses = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

  if (challengeQuery.isLoading || zoneQuery.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container px-0 space-y-6">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">{locationName}</h3>
      <div className={gridClasses}>
        {activeChallenges.length > 0 && <ChallengeList challenges={activeChallenges} />}
        <CreateChallengeCard locationId={locationId} zones={zones} grades={grades} />
      </div>
      {expiredChallenges.length > 0 && (
        <>
          <h3 className="text-lg font-semibold leading-none tracking-tight text-gray-700">Expired challenges</h3>
          <div className={gridClasses}>
            <ChallengeList challenges={expiredChallenges} />
          </div>
        </>
      )}
    </div>
  );
}

interface ChallengeListProps {
  challenges: ChallengeWithZoneAndGrade[];
}
function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <>
      {challenges?.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </>
  );
}