import Layout from "@/components/Layout";
import ActivityList from "@/components/pages/profile/ActivityList";
import { Card, CardBody } from "@chakra-ui/card";
import { supabase } from "@/lib/supabase";
import { Activity, Challenge, ClimbingLocation, ClimbingZone, Grade, Technique } from "@/types/database";
import { FC, useEffect, useState } from "react";
import { getWeeklyStreak } from "@/utils/streak";
import { CardHeader, Heading, Stack } from "@chakra-ui/react";
import StreakStats from "@/components/pages/profile/StreakStats/StreakStats";
import AddChallenge from "@/components/pages/profile/AddChallenge";
import { Streak } from "@/utils/types/interfaces/Streak";
import { ChallengeList } from "@/components/pages/profile/ChallengeList";
import { useSession } from "@supabase/auth-helpers-react";

interface ProfilePageProps {
  activities: Activity[];
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  challenges: Challenge[];
  techniques: Technique[];
  grades: Grade[];
  weeklyStreak: Streak;
}

const ProfilePage: FC<ProfilePageProps> = ({
  activities,
  locations,
  climbingZones,
  challenges,
  techniques,
  grades,
  weeklyStreak
}) => {
  const [userChallenges, setUserChallenges] = useState<Challenge[]>([]);

  const session = useSession();

  useEffect(() => {
    async function fetchChallenges() {
      try {
        if (!session) {
          return;
        }

        const { data: challenges, error } = await supabase
          .from("challenge")
          .select("*")
          .eq("user_id", session?.user.id)
          .order("end_date", { ascending: true });

        if (error) {
          throw error;
        }

        setUserChallenges(challenges);
      } catch (error) {
        console.error(error);
      }
    }
    fetchChallenges();
  }, [session]);

  const onAddChallenge = (challenge: Challenge): void => {
    const newChallenges = [...userChallenges, challenge].sort((a, b) => a.end_date.localeCompare(b.end_date));
    setUserChallenges(newChallenges);
  };

  return (
    <Layout>
      <Stack direction="column">
        <Card width="lg">
          <CardHeader pb={0}>
            <Heading size="md">Challenges</Heading>
          </CardHeader>
          <CardBody pb={0}>
            <ChallengeList
              challenges={userChallenges}
              climbingZones={climbingZones}
              locations={locations}
              grades={grades}
            />
            <AddChallenge
              locations={locations}
              climbingZones={climbingZones}
              techniques={techniques}
              grades={grades}
              onAddChallenge={(challenge) => onAddChallenge(challenge)}
            />
          </CardBody>
        </Card>
        <Card width="lg">
          <CardBody>
            <StreakStats currentStreak={weeklyStreak.current} highestStreak={weeklyStreak.highest} unit="week" />
            <ActivityList initialActivities={activities} locations={locations} />
          </CardBody>
        </Card>
      </Stack>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: locations } = await supabase.from("locations").select("*");
  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("activity_date", { ascending: false });
  const { data: climbingZones } = await supabase.from("climbing_zone").select("*");
  const { data: techniques } = await supabase.from("technique").select("*");
  const { data: grades } = await supabase.from("grade").select("*");

  const activityDates = activities.map((activity: Activity) => new Date(activity.activity_date));
  const weeklyStreak: Streak = getWeeklyStreak(activityDates);

  return {
    props: {
      locations,
      activities,
      grades,
      climbingZones,
      techniques,
      weeklyStreak
    }
  };
}

export default ProfilePage;
