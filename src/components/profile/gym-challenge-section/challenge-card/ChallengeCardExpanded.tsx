import { Card, CardContent } from "~/components/ui/card";
import { type ChallengesByLocation } from "~/server/api/routers/challenge";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { ChallengeProgressBar } from "./ChallengeCardProgressBar";
import Image from "next/image";
import { Check } from "lucide-react";

interface ChallengeCardExpandedProps {
  challenge: ChallengesByLocation;
}

export function ChallengeCardExpanded({ challenge }: ChallengeCardExpandedProps) {
  const { id, imageUrl, grade, zone, endDate } = challenge;

  return (
    <div className="fixed top-0 left-0 z-50 flex w-screen h-screen">
      <motion.div
        className="flex w-full h-full mx-auto"
        transition={{ duration: 0.3, delay: 0.1 }}
        layoutId={`card-wrapper-${id}`}>
        <Card className="flex flex-col w-full border-none">
          <motion.div className="relative flex flex-1 overflow-hidden bg-black" layoutId={`card-image-${id}`}>
            <Image
              src={imageUrl}
              className="absolute left-0 top-0 blur-md w-full h-full scale-x-150 scale-y-125 z-[0]"
              width={600}
              height={600}
              alt="Picture of a climbing problem"
            />
            <Image
              src={imageUrl}
              className="relative object-contain w-auto h-full z-[1] mx-auto"
              width={1000}
              height={1000}
              alt="Picture of a climbing problem"
            />
          </motion.div>
          <motion.div className="flex flex-1" layoutId={`card-content-${id}`}>
            <CardContent className="w-full p-3">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div>
                    <p>Zone</p>
                    {zone.name}
                  </div>
                  <ChallengeProgressBar
                    endDate={endDate}
                    changeIntervalWeeks={zone.changeSchedule.changeIntervalWeeks}
                  />
                  Techniques etc
                </div>
                <div className="text-right">
                  <Button>
                    Complete challenge
                    <Check className="ml-1" size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
