import { api } from "~/lib/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Toaster } from "~/components/ui/toaster";
import CreateChallengeForm from "~/components/CreateChallengeForm";
import { type ClimbingLocations } from "~/server/api/routers/location";
import { type Grades } from "~/server/api/routers/grade";
import { type ChallengeDetails } from "~/server/api/routers/challenge";

dayjs.extend(relativeTime);

export default function ChallengeCard() {
  const challenges: ChallengeDetails = api.challenge.findUserChallenges.useQuery({});
  const { data: locations }: ClimbingLocations = api.location.findAll.useQuery();
  const { data: grades }: Grades = api.grade.findAll.useQuery();

  const hasChallenges = challenges.data?.length;

  const getTimeUntilDate = (date: Date) => dayjs(date).fromNow(true);

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

              return (
                <div key={id} className="pb-2 border-b-[1px] ">
                  <div className="flex items-center space-x-2">
                    <div className="flex w-[36px] h-[36px] items-center bg-gray-300"></div>
                    <div className="flex flex-1 justify-between">
                      <div className="flex flex-col">
                        <p className="bold">{location.name}</p>
                        <p className="text-sm">{zone.name}</p>
                      </div>
                      <div className="text-right text-sm">{getTimeUntilDate(endDate)} remaining</div>
                    </div>
                  </div>
                </div>
              );
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
