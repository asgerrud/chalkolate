import { Challenge } from "@/types/database";
import { List, ListItem, Text } from "@chakra-ui/react";
import { FC } from "react";
import ChallengeItem from "./ChallengeItem";

interface ChallengeListProps {
  challenges: Challenge[];
}

export const ChallengeList: FC<ChallengeListProps> = ({ challenges }) => {
  if (challenges.length === 0) {
    return <Text>No challenges added</Text>;
  }

  return (
    <List spacing={3}>
      {challenges.map((challenge: Challenge) => (
        <ListItem key={challenge.id}>
          <ChallengeItem challenge={challenge}></ChallengeItem>
        </ListItem>
      ))}
    </List>
  );
};
