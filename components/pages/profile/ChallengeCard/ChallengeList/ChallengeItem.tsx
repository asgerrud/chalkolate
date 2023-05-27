import { Challenge, ChangeSchedule, ClimbingLocation, ClimbingZone, Grade } from "@/types/database";
import { FC } from "react";
import { Box, Flex, HStack, Progress, Square, Text } from "@chakra-ui/react";
import { getFormattedDateString } from "@/utils/date";
import { DAY_IN_MS, WEEK_IN_MS } from "@/constants";
import { formatAmountWithUnit } from "@/utils/string";
import { getGradeColor } from "@/utils/grade";
import { calculateScheduleStart } from "@/utils/schedule";

interface ChallengeItemProps {
  challenge: Challenge;
  climbingZone: ClimbingZone;
  changeSchedule: ChangeSchedule;
  location: ClimbingLocation;
  grade: Grade;
}

const ChallengeItem: FC<ChallengeItemProps> = ({ challenge, climbingZone, changeSchedule, location, grade }) => {
  const challengeEnd: Date = new Date(challenge.end_date);

  const now: Date = new Date();
  const isEnded: boolean = challengeEnd.getTime() < now.getTime();
  const isEndingSoon: boolean = !isEnded && getElapsedTimePercentage() > 75;

  function getElapsedTimePercentage(): number {
    const scheduleStart: Date = calculateScheduleStart(challengeEnd, changeSchedule.change_interval_weeks);
    return ((now.getTime() - scheduleStart.getTime()) / (challengeEnd.getTime() - scheduleStart.getTime())) * 100;
  }

  function displayTimeRemaining(): string {
    const remainingTime: number = challengeEnd.getTime() - now.getTime();

    if (remainingTime > WEEK_IN_MS) {
      const weeks = Math.floor(remainingTime / WEEK_IN_MS);
      return formatAmountWithUnit("week", weeks);
    } else if (remainingTime > DAY_IN_MS) {
      const days = Math.floor(remainingTime / DAY_IN_MS);
      return formatAmountWithUnit("day", days);
    } else if (remainingTime > 0) {
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      return formatAmountWithUnit("hour", hours);
    }
  }

  return (
    <Flex
      pointerEvents={isEnded ? "none" : "all"}
      opacity={isEnded ? 0.5 : 1}
      _hover={{
        transform: "scale(1.02)",
        transition: "all 0.100s ease"
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
            <Progress w="100%" my={1} value={getElapsedTimePercentage()} />
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default ChallengeItem;
