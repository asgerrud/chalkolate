import { type Grades } from "~/server/api/routers/grade";
import { api } from "~/lib/api";
import dayjs from "dayjs";
import { type LocationWithUserChallenges } from "~/server/api/routers/challenge";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Button } from "~/components/ui/button";
import { useMemo, useState } from "react";
import { CreateChallengeButton } from "./create-challenge-form-dialog/CreateChallengeFormDialog";
import ChallengeCard from "./challenge-card/ChallengeCard";
import { cn } from "~/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";

dayjs.extend(isSameOrBefore);

interface GymChallengeCardProps {
  challengesByLocation: LocationWithUserChallenges;
  grades: Grades;
}

export function GymChallengeSection({ challengesByLocation, grades }: GymChallengeCardProps) {
  const { data: zones } = api.zone.findZonesByLocation.useQuery({ locationId: challengesByLocation.id });

  const { challenges } = challengesByLocation;

  const activeChallenges: LocationWithUserChallenges["challenges"] = useMemo(
    () => challenges.filter((challenge) => dayjs().isSameOrBefore(challenge.endDate)),
    [challenges]
  );

  const expiredChallenges: LocationWithUserChallenges["challenges"] = useMemo(
    () => challenges.filter((challenge) => dayjs().isAfter(challenge.endDate)),
    [challenges]
  );

  const gridClasses = "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="container px-0 space-y-6">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">{challengesByLocation.name}</h3>
      <div className={gridClasses}>
        <ChallengeList challenges={activeChallenges} />
        <CreateChallengeButton location={challengesByLocation} zones={zones} grades={grades} />
      </div>
      <h3 className="text-lg font-semibold leading-none tracking-tight text-gray-700">Expired challenges</h3>
      <div className={gridClasses}>
        <ChallengeList challenges={expiredChallenges} />
      </div>
    </div>
  );
}

interface ChallengeListProps {
  challenges: LocationWithUserChallenges["challenges"];
}
function ChallengeList({ challenges }: ChallengeListProps) {
  return (
    <>
      {challenges?.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </>
  );
}
