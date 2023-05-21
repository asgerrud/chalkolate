import { Challenge, ClimbingLocation, ClimbingZone, Grade } from "@/types/database";
import { List, ListItem, Text } from "@chakra-ui/react";
import { FC } from "react";
import ChallengeItem from "./ChallengeItem";
import { arrayToObject } from "@/utils/array";

interface ChallengeListProps {
  challenges: Challenge[];
  climbingZones: ClimbingZone[];
  locations: ClimbingLocation[];
  grades: Grade[];
}

export const ChallengeList: FC<ChallengeListProps> = ({ challenges, climbingZones, locations, grades }) => {
  if (challenges.length === 0) {
    return <Text>No challenges added</Text>;
  }

  const gradesById: Record<string, Grade> = arrayToObject(grades);
  const climbingZonesById: Record<string, ClimbingZone> = arrayToObject(climbingZones);
  const locationsById: Record<string, ClimbingLocation> = arrayToObject(locations);

  return (
    <List spacing={3}>
      {challenges.map((challenge: Challenge) => (
        <ListItem key={challenge.id} mb={2}>
          <ChallengeItem
            challenge={challenge}
            climbingZone={climbingZonesById[challenge.climbing_zone]}
            location={locationsById[challenge.location]}
            grade={gradesById[challenge.grade]}></ChallengeItem>
        </ListItem>
      ))}
    </List>
  );
};
