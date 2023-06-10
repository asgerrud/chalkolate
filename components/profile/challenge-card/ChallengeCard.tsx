import { fetchUserChallenges } from "@/api/challenge";
import { Challenge, ChangeSchedule, ClimbingLocation, ClimbingZone, Grade, Technique } from "@/types/database";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { FC, useEffect, useState } from "react";
import AddChallenge from "./add-challenge/AddChallenge";
import { ChallengeList } from "./challenge-list/ChallengeList";

interface ChallengeCardProps {
  climbingZones: ClimbingZone[];
  changeSchedules: ChangeSchedule[];
  locations: ClimbingLocation[];
  techniques: Technique[];
  grades: Grade[];
}

const ChallengeCard: FC<ChallengeCardProps> = ({ climbingZones, changeSchedules, locations, techniques, grades }) => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const session = useSession();

  useEffect(() => {
    async function fetchChallenges() {
      if (!session) {
        return;
      }

      const challenges: Challenge[] = await fetchUserChallenges(session?.user.id);

      if (challenges) {
        setChallenges(challenges);
      }
    }

    fetchChallenges();
  }, [session]);

  const getChallengesSorted = (challenges: Challenge[]): Challenge[] => {
    return challenges.sort((a, b) => a.end_date.localeCompare(b.end_date));
  };

  const onAddChallenge = (challenge: Challenge): void => {
    const newChallenges = getChallengesSorted([...challenges, challenge]);
    setChallenges(newChallenges);
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Challenges</Heading>
      </CardHeader>
      <CardBody>
        <ChallengeList
          challenges={challenges}
          climbingZones={climbingZones}
          changeSchedules={changeSchedules}
          locations={locations}
          grades={grades}
        />
        <AddChallenge
          locations={locations}
          climbingZones={climbingZones}
          techniques={techniques}
          grades={grades}
          onAddChallenge={(challenge) => onAddChallenge(challenge)}
        />
      </CardBody>
    </Card>
  );
};

export default ChallengeCard;
