import { Card, CardBody, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React, { FC } from "react";
import { getPluralizedWord } from "@/utils/string";

interface StreakStatsProps {
  currentStreak: number;
  highestStreak: number;
  unit: string;
}

const StreakStats: FC<StreakStatsProps> = ({ currentStreak, highestStreak, unit }) => {
  return (
    <Flex mb={4}>
      {currentStreak != null && (
        <Stat>
          <StatLabel>Current streak</StatLabel>
          <StatNumber>
            {currentStreak} {getPluralizedWord(unit, currentStreak)}
          </StatNumber>
        </Stat>
      )}
      {highestStreak != null && (
        <Stat>
          <StatLabel>Highest streak</StatLabel>
          <StatNumber>
            {highestStreak} {getPluralizedWord(unit, highestStreak)}
          </StatNumber>
        </Stat>
      )}
    </Flex>
  );
};

export default StreakStats;
