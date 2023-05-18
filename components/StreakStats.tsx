import { Card, CardBody, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React, { FC } from "react";

interface StreakStatsProps {
  currentStreak: number;
  highestStreak: number;
  unit: string;
}

const StreakStats: FC<StreakStatsProps> = ({ currentStreak, highestStreak, unit }) => {
  const getPluralSuffix = (count: Number): string => {
    return count > 1 ? "s" : "";
  };

  return (
    <Flex mb={4}>
      {currentStreak != null && (
        <Stat>
          <StatLabel>Current streak</StatLabel>
          <StatNumber>
            {currentStreak} {unit}
            {getPluralSuffix(currentStreak)}
          </StatNumber>
        </Stat>
      )}
      {highestStreak != null && (
        <Stat>
          <StatLabel>Highest streak</StatLabel>
          <StatNumber>
            {highestStreak} {unit}
            {getPluralSuffix(currentStreak)}
          </StatNumber>
        </Stat>
      )}
    </Flex>
  );
};

export default StreakStats;
