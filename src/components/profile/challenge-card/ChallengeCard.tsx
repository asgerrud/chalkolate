import { api } from "~/lib/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Toaster } from "~/components/ui/toaster";
import CreateChallengeForm from "~/components/profile/challenge-card/CreateChallengeForm";
import { type ClimbingLocations } from "~/server/api/routers/location";
import { type Grades } from "~/server/api/routers/grade";
import { type ChallengeDetails } from "~/server/api/routers/challenge";
import ChallengeItem from "~/components/profile/challenge-card/ChallengeItem";

dayjs.extend(relativeTime);

export default function ChallengeCard() {
  const challenges: ChallengeDetails = api.challenge.findUserChallenges.useQuery({});
  const { data: locations }: ClimbingLocations = api.location.findAll.useQuery();
  const { data: grades }: Grades = api.grade.findAll.useQuery();

  const hasChallenges = challenges.data?.length;

  if (challenges.isLoading) {
    return (
      <div className="flex flex-auto items-center justify-center">
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Loading
      </div>
    );
  }

  return (
    <Card className="max-w-[480px] w-full px-6">
      <CardHeader>
        <CardTitle>Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        {hasChallenges ? (
          <div className="flex flex-col space-y-4">
            {challenges?.data?.map((challenge) => {
              const { id, location, zone, endDate } = challenge;

              return <ChallengeItem key={id} location={location.name} zone={zone.name} endDate={endDate} />;
            })}
          </div>
        ) : (
          <p>No challenges found</p>
        )}
        <div className="w-full mt-4">
          <CreateChallengeForm locations={locations} grades={grades} />
          <Toaster />
        </div>
      </CardContent>
    </Card>
  );
}
