import { fetchUserChallenges } from "@/api/challenge";
import { ClimbingZone, ClimbingLocation, Technique, Grade, Challenge } from "@/types/database";
import { Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { FC, useState, useEffect } from "react";
import AddChallenge from "./AddChallenge";
import { ChallengeList } from "./ChallengeList";

interface ChallengeCardProps {
  climbingZones: ClimbingZone[];
  locations: ClimbingLocation[];
  techniques: Technique[];
  grades: Grade[];
}

const ChallengeCard: FC<ChallengeCardProps> = ({ climbingZones, locations, techniques, grades }) => {
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
    <Card width="lg">
      <CardHeader pb={0}>
        <Heading size="md">Challenges</Heading>
      </CardHeader>
      <CardBody pb={0}>
        <ChallengeList challenges={challenges} climbingZones={climbingZones} locations={locations} grades={grades} />
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
