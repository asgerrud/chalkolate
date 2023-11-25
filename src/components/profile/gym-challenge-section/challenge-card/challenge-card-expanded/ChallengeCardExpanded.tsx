import { Card, CardContent } from "~/components/ui/card";
import { type ChallengesByLocation } from "~/server/api/routers/challenge";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import { Check, X } from "lucide-react";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { ChallengeCardExpandedDetails } from "~/components/profile/gym-challenge-section/challenge-card/challenge-card-expanded/challenge-card-expanded-details/ChallengeCardExpandedDetails";
import { ChallengeCardExpandedImage } from "~/components/profile/gym-challenge-section/challenge-card/challenge-card-expanded/challenge-card-expanded-image/challenge-card-expanded-image";

interface ChallengeCardExpandedProps {
  challenge: ChallengesByLocation;
  onClose: () => void;
}

export function ChallengeCardExpanded({ challenge, onClose }: ChallengeCardExpandedProps) {
  useLockBodyScroll();

  const { id, imageUrl, zone, endDate } = challenge;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex w-screen h-[calc(100vh_-_60px)]">
      <motion.div
        className="flex w-full h-full mx-auto"
        transition={{ duration: 0.3, delay: 0.1 }}
        layoutId={`card-wrapper-${id}`}>
        <Card className="flex flex-col w-full border-none">
          <motion.div className="relative flex flex-[4] overflow-hidden bg-black" layoutId={`card-image-${id}`}>
            <div className="absolute z-[2] top-[8px] right-[8px]">
              <Button className="rounded-full w-[28px] h-[28px] p-0" variant="secondary" onClick={() => onClose()}>
                <X size={20} />
              </Button>
            </div>
            <ChallengeCardExpandedImage imageUrl={imageUrl} />
          </motion.div>
          <motion.div className="flex flex-[3]" layoutId={`card-content-${id}`}>
            <CardContent className="w-full p-3">
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <p className="font-bold text-xl">Challenge</p>
                  <ChallengeCardExpandedDetails zoneName={zone.name} endDate={endDate} />
                </div>

                <div className="flex justify-end py-3">
                  <Button>
                    Finish challenge
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
