import { api } from "~/lib/api";
import { ReloadIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { NewChallengeForm } from "~/components/NewChallengeForm";

dayjs.extend(relativeTime);

function NoChallengesFound() {
  return <p>No challenges found</p>;
}

export default function ChallengeList() {
  const challenges = api.challenge.findUserChallenges.useQuery({});

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
    <Card>
      <CardHeader>
        <CardTitle>Challenges</CardTitle>
      </CardHeader>
      <CardContent>
        {hasChallenges ? (
          <div className="flex flex-col space-y-4">
            {challenges?.data?.map((challenge) => {
              const { id, grade, location, zone, endDate } = challenge;
              const timeToChallengeEnd = dayjs(endDate).fromNow(true);

              return (
                <div key={id} className="pb-2 border-b-[1px] ">
                  <div className="flex items-center space-x-2">
                    <div className="flex w-[36px] h-[36px] items-center bg-gray-300"></div>
                    <div className="flex flex-1 justify-between">
                      <div className="flex flex-col">
                        <p className="bold">{location.name}</p>
                        <p className="text-sm">{zone.name}</p>
                      </div>
                      <div className="text-right text-sm">{timeToChallengeEnd} remaining</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <NoChallengesFound />
        )}
        <div className="w-full mt-4">
          <NewChallengeForm />
        </div>
      </CardContent>
    </Card>
  );
}
