import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardContent } from "~/components/ui/card";
import { type ChallengesByLocation } from "~/server/api/routers/challenge";
import { ChallengeProgressBar } from "./ChallengeCardProgressBar";
import { ChallengeCardDetails } from "./challenge-card-details/ChallengeCardDetails";
import { ChallengeCardImage } from "./ChallengeCardImage";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChallengeCardExpanded } from "./challenge-card-expanded/ChallengeCardExpanded";

dayjs.extend(relativeTime);

interface ChallengeCardProps {
  challenge: ChallengesByLocation;
}

export default function ChallengeCard({ challenge }: ChallengeCardProps) {
  const { id, imageUrl, grade, zone, endDate } = challenge;

  const challengeInProgress = dayjs() <= dayjs(endDate);

  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout>
      <motion.div transition={{ duration: 0.3, delay: 0.1 }} layoutId={`card-wrapper-${id}`}>
        <Card className="w-full hover:scale-[99%] transition duration-200" onClick={() => setExpanded((prev) => !prev)}>
          <ChallengeCardImage id={id} imageUrl={imageUrl} gradeColor={grade.hex} />
          <motion.div layoutId={`card-content-${id}`}>
            <CardContent className="p-3">
              <div className="flex flex-col flex-1">
                <ChallengeCardDetails zoneName={zone.name} endDate={endDate} />
                {challengeInProgress && (
                  <ChallengeProgressBar
                    endDate={endDate}
                    changeIntervalWeeks={zone.changeSchedule.changeIntervalWeeks}
                  />
                )}
              </div>
            </CardContent>
          </motion.div>
        </Card>
      </motion.div>
      {expanded && <ChallengeCardExpanded challenge={challenge} onClose={() => setExpanded((prev) => !prev)} />}
    </motion.div>
  );
}
