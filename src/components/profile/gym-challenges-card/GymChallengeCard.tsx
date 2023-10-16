import ChallengeItem from "~/components/profile/gym-challenges-card/ChallengeItem";
import { CreateChallengeButton } from "~/components/profile/gym-challenges-card/create-challenge-form-dialog/CreateChallengeButton";
import { type Grades } from "~/server/api/routers/grade";
import { api } from "~/lib/api";
import dayjs from "dayjs";
import { type LocationWithUserChallenges } from "~/server/api/routers/challenge";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible";
import { Button } from "~/components/ui/button";
import { useState } from "react";

dayjs.extend(isSameOrBefore);

interface GymChallengeCardProps {
  challengesByLocation: LocationWithUserChallenges;
  grades: Grades;
}

export function GymChallengeCard({ challengesByLocation, grades }: GymChallengeCardProps) {
  const { data: zones } = api.zone.findZonesByLocation.useQuery({ locationId: challengesByLocation.id });

  const activeChallenges: LocationWithUserChallenges["challenges"] = challengesByLocation.challenges.filter(
    (challenge) => dayjs().isSameOrBefore(challenge.endDate)
  );
  const expiredChallenges: LocationWithUserChallenges["challenges"] = challengesByLocation.challenges.filter(
    (challenge) => dayjs().isAfter(challenge.endDate)
  );

  return (
    <div className="container space-y-6">
      <h3 className="text-2xl font-semibold leading-none tracking-tight">{challengesByLocation.name}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChallengeList challenges={activeChallenges} />
        <CreateChallengeButton location={challengesByLocation} zones={zones} grades={grades} />
      </div>
      <ExpiredChallengeCollapsible>
        <ChallengeList challenges={expiredChallenges} />
      </ExpiredChallengeCollapsible>
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
        <ChallengeItem key={challenge.id} challenge={challenge} />
      ))}
    </>
  );
}

function ExpiredChallengeCollapsible({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost">{isOpen ? "Hide" : "Show"} expired challenges</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
