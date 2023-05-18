import { Challenge } from "@/types/database";
import { FC } from "react";

interface ChallengeItemProps {
  challenge: Challenge;
}

const ChallengeItem: FC<ChallengeItemProps> = ({ challenge }) => {
  return <div>{challenge.end_date}</div>;
};

export default ChallengeItem;
