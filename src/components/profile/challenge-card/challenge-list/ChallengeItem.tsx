import { type Challenge, type ChangeSchedule, type ClimbingLocation, type ClimbingZone, type Grade } from "~/types/database";
import { Box, Flex, HStack, Progress, Square, Text } from "@chakra-ui/react";
import { getFormattedDateString, getTimeTo } from "~/utils/date";
import { getGradeColor } from "~/utils/grade";
import { calculateScheduleStart } from "~/utils/schedule";
import dayjs from "dayjs";

interface ChallengeItemProps {
  challenge: Challenge;
  climbingZone: ClimbingZone;
  changeSchedule: ChangeSchedule;
  location: ClimbingLocation;
  grade: Grade;
}

export default function ChallengeItem({ challenge, climbingZone, changeSchedule, location, grade }: ChallengeItemProps) {
  const now: Date = new Date();
  const challengeEnd: Date = new Date(challenge.end_date);
  const isEnded: boolean = dayjs(challengeEnd).isBefore(now);
  const isEndingSoon: boolean = !isEnded && getElapsedTimePercentage() > 75;

  function getElapsedTimePercentage(): number {
    const scheduleStart: Date = calculateScheduleStart(challengeEnd, changeSchedule.change_interval_weeks);
    const percentage = ((now.getTime() - scheduleStart.getTime()) / (challengeEnd.getTime() - scheduleStart.getTime())) * 100;
    return percentage >= 0 ? percentage : 0;
  }

  function displayTimeRemaining(): string {
    return getTimeTo(now, challengeEnd);
  }

  return (
    <Flex
      pointerEvents={isEnded ? "none" : "all"}
      opacity={isEnded ? 0.5 : 1}
      transition="all 0.100s ease"
      _hover={{
        transform: "scale(1.02)",
      }}>
      <Box w="100%" p={4} py={2} bgColor="lightGreen">
        <HStack spacing={4}>
          <Square size={10} borderRadius="sm" bgColor={getGradeColor(grade.name)} />
          <Box w="100%">
            <Flex justifyContent="space-between">
              <Box>
                <Text fontSize="md">{location.name}</Text>
                <Text fontSize="xs">{climbingZone.name}</Text>
              </Box>
              <Box textAlign="right">
                <Text fontSize="xs">{getFormattedDateString(challengeEnd)}</Text>
                <Text fontSize="xs" color={isEndingSoon && "red"}>
                  {!isEnded ? <span>{displayTimeRemaining()} left</span> : <span>Challenge ended</span>}
                  {/* Add icon indicating challenge success or failure */}
                </Text>
              </Box>
            </Flex>
            {!isEnded && <Progress w="100%" my={1} value={getElapsedTimePercentage()} />}
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
}
