import { Challenge, ChangeSchedule, ClimbingLocation, ClimbingZone, Grade } from "@/types/database";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Heading,
  List,
  ListItem,
  Text
} from "@chakra-ui/react";
import { FC } from "react";
import ChallengeItem from "./ChallengeItem";
import { arrayToObject } from "@/utils/array";
import dayjs from "dayjs";

interface ChallengeListProps {
  challenges: Challenge[];
  climbingZones: ClimbingZone[];
  changeSchedules: ChangeSchedule[];
  locations: ClimbingLocation[];
  grades: Grade[];
}

export const ChallengeList: FC<ChallengeListProps> = ({
  challenges,
  climbingZones,
  changeSchedules,
  locations,
  grades
}) => {
  if (challenges.length === 0) {
    return <Text>No challenges added</Text>;
  }

  const gradesById: Record<string, Grade> = arrayToObject(grades);
  const climbingZonesById: Record<string, ClimbingZone> = arrayToObject(climbingZones);
  const locationsById: Record<string, ClimbingLocation> = arrayToObject(locations);

  const activeChallenges = challenges.filter((challenge: Challenge) => dayjs().isBefore(challenge.end_date));
  const endedChallenges = challenges.filter((challenge: Challenge) => dayjs().isAfter(challenge.end_date));


  function getChangeSchedule(climbingZoneId: string): ChangeSchedule {
    return changeSchedules.find((changeSchedule: ChangeSchedule) => changeSchedule.climbing_zone === climbingZoneId);
  }

  return (
    <>
      <List spacing={3}>
        {activeChallenges.map((challenge: Challenge) => (
          <ListItem key={challenge.id} mb={2}>
            <ChallengeItem
              challenge={challenge}
              climbingZone={climbingZonesById[challenge.climbing_zone]}
              changeSchedule={getChangeSchedule(challenge.climbing_zone)}
              location={locationsById[challenge.location]}
              grade={gradesById[challenge.grade]}></ChallengeItem>
          </ListItem>
        ))}
      </List>
      <Divider my={4} />
      <Accordion variant="flat" allowToggle>
        <AccordionItem>
          <Heading>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Show past challenges
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel py={4}>
            <List spacing={3}>
              {endedChallenges.map((challenge: Challenge) => (
                <ListItem key={challenge.id} mb={2}>
                  <ChallengeItem
                    challenge={challenge}
                    climbingZone={climbingZonesById[challenge.climbing_zone]}
                    changeSchedule={getChangeSchedule(challenge.climbing_zone)}
                    location={locationsById[challenge.location]}
                    grade={gradesById[challenge.grade]}></ChallengeItem>
                </ListItem>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
