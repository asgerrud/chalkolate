import { Challenge, ClimbingLocation, ClimbingZone, Grade } from "@/types/database";
import { FC } from "react";
import { Badge, Box, color, Flex, HStack, Progress, Square, Stack, Tag, Text, Wrap } from "@chakra-ui/react";
import { daysBetweenDates, hoursBetweenDates } from "@/utils/date";
import { DAY_IN_MS, WEEK_IN_MS } from "@/constants";
import { formatAmountWithUnit } from "@/utils/string";

interface ChallengeItemProps {
  challenge: Challenge;
  climbingZone: ClimbingZone;
  location: ClimbingLocation;
  grade: Grade;
}

const ChallengeItem: FC<ChallengeItemProps> = ({ challenge, climbingZone, location, grade }) => {
  const now: Date = new Date();
  const challengeStart: Date = new Date(challenge.start_date);
  const challengeEnd: Date = new Date(challenge.end_date);

  const isEnded: boolean = challengeEnd.getTime() < now.getTime();

  const gradeColor: string = grade.name === "black" ? "black" : `${grade.name}.400`;

  const getElapsedTimePercentage = (): number => {
    return ((now.getTime() - challengeStart.getTime()) / (challengeEnd.getTime() - challengeStart.getTime())) * 100;
  };

  const displayTimeRemaining = (): string => {
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
  };

  const isEndingSoon: boolean = !isEnded && getElapsedTimePercentage() > 80;

  // TODO: add compact view for ended challenges

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
          <Square size={10} borderRadius="sm" bgColor={gradeColor} />
          <Box w="100%">
            <Flex justifyContent="space-between">
              <Box>
                <Text fontSize="md">{location.name}</Text>
                <Text fontSize="xs">{climbingZone.name}</Text>
              </Box>
              <Text fontSize="xs" color={isEndingSoon && "red"}>
                {!isEnded ? <span>{displayTimeRemaining()} left</span> : <span>Challenge ended</span>}
              </Text>
            </Flex>
            <Progress w="100%" my={1} value={getElapsedTimePercentage()} />
          </Box>
        </HStack>
      </Box>
    </Flex>
  );
};

export default ChallengeItem;
