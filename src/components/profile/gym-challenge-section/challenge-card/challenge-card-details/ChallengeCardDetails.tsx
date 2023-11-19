import { ChallengeCardTimeLeft } from "~/components/profile/gym-challenge-section/challenge-card/challenge-card-details/ChallengeCardTimeLeft";
import { motion } from "framer-motion";

interface ChallengeCardDetailsProps {
  zoneName: string;
  endDate: Date;
}

export function ChallengeCardDetails({ zoneName, endDate }: ChallengeCardDetailsProps) {
  return (
    <motion.div className="flex items-center justify-between flex-1">
      <div className="flex flex-col">
        <p className="text-sm whitespace-nowrap">{zoneName}</p>
      </div>
      <ChallengeCardTimeLeft endDate={endDate} />
    </motion.div>
  );
}
