import { Card, CardContent } from "~/components/ui/card";
import { type ChallengesByLocation } from "~/server/api/routers/challenge";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { Stat } from "~/components/ui/custom/Stat";
import { ChallengeCardTechniqueGrid } from "~/components/profile/gym-challenge-section/challenge-card/challenge-card-expanded/ChallengeCardTechniqueGrid";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import dayjs from "dayjs";

interface ChallengeCardExpandedProps {
  challenge: ChallengesByLocation;
  onClose: () => void;
}

export function ChallengeCardExpanded({ challenge, onClose }: ChallengeCardExpandedProps) {
  useLockBodyScroll();

  const { id, imageUrl, zone, endDate } = challenge;

  return (
    <div className="fixed top-0 left-0 z-50 flex w-screen h-screen">
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
          <motion.div className="flex flex-[3]" layoutId={`card-content-${id}`}>
            <CardContent className="w-full p-3 pb-0">
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <p className="font-bold text-xl">Challenge</p>

                  <div className="flex justify-between space-x-4">
                    <Stat label="Zone">{zone.name}</Stat>
                    <Stat label="Grade">
                      <div className="flex items-center">
                        <p className="mr-2">5C - 6A</p>
                      </div>
                    </Stat>
                  </div>

                  <ChallengeCardTechniqueGrid />

                  <div className="flex text-sm ml-1 flex-col">
                    <span className="font-medium">Disappears on</span>
                    {dayjs(endDate).format("DD/MM/YYYY")}
                  </div>
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
