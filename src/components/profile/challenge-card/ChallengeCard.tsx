import { fetchUserChallenges } from "~/api/challenge";
import { type Challenge, type ChangeSchedule, type ClimbingLocation, type ClimbingZone, type Grade, type Technique } from "~/types/database";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import AddChallenge from "./add-challenge/AddChallenge";
import ChallengeList from "./challenge-list/ChallengeList";

interface ChallengeCardProps {
  climbingZones: ClimbingZone[];
  changeSchedules: ChangeSchedule[];
  locations: ClimbingLocation[];
  techniques: Technique[];
  grades: Grade[];
}


export default function ChallengeCard({ climbingZones, changeSchedules, locations, techniques, grades }: ChallengeCardProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const session = useSession();

  async function fetchChallenges(): Promise<void> {
    if (!session) {
      return;
    }

    const challenges: Challenge[] = await fetchUserChallenges(session?.user.id);

    if (challenges) {
      setChallenges(challenges);
    }
  }

  const getChallengesSorted = (challenges: Challenge[]): Challenge[] => {
    return challenges.sort((a, b) => a.end_date.localeCompare(b.end_date));
  };


  useEffect(() => {
    fetchChallenges();
  }, [session]);

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
}
