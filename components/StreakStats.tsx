import { Card, CardBody, Flex, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  currentWeeklyStreak: number;
  highestWeeklyStreak: number;
};

const StreakStats: FC<Props> = ({ currentWeeklyStreak, highestWeeklyStreak }) => {
  return (
    <Flex mb={4}>
      {currentWeeklyStreak != null && (
        <Stat>
          <StatLabel>Current streak</StatLabel>
          <StatNumber>{currentWeeklyStreak} weeks</StatNumber>
        </Stat>
      )}
      {highestWeeklyStreak != null && (
        <Stat>
          <StatLabel>Highest streak</StatLabel>
          <StatNumber>{highestWeeklyStreak} weeks</StatNumber>
        </Stat>
      )}
    </Flex>
  );
};

export default StreakStats;
