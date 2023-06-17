import { Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React from "react";
import { getPluralizedWord } from "@/utils/string";

interface StreakStatsProps {
  currentStreak: number;
  highestStreak: number;
  unit: string;
}

export default function StreakStats({ currentStreak, highestStreak, unit }: StreakStatsProps) {
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
}
