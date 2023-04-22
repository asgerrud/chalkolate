import Layout from "@/components/Layout";
import ActivityList from "@/components/ActivityList/ActivityList";
import { Card, CardBody } from "@chakra-ui/card";
import { supabase } from "@/lib/supabase";
import { Activity, ClimbingLocation } from "@/types/database";
import { FC } from "react";
import { getCurrentWeeklyStreak, getHighestWeeklyStreak } from "@/utils/streak";
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat";
import { Flex } from "@chakra-ui/react";

type Props = {
  activities: Activity[];
  locations: ClimbingLocation[];
  currentWeeklyStreak: number;
  highestWeeklyStreak: number;
};

const ProfilePage: FC<Props> = ({
  activities,
  locations,
  currentWeeklyStreak,
  highestWeeklyStreak,
}) => {
  return (
    <Layout>
      <Card width="lg">
        <CardBody>
          <Flex mb={4}>
            {currentWeeklyStreak != null && (
              <Stat>
                <StatLabel>Current streak</StatLabel>
                <StatNumber>{currentWeeklyStreak} weeks</StatNumber>
              </Stat>
            )}
            {highestWeeklyStreak != null && (
              <Stat>
                <StatLabel>Highest streak</StatLabel>
                <StatNumber>{highestWeeklyStreak} weeks</StatNumber>
              </Stat>
            )}
          </Flex>
          <ActivityList initialActivities={activities} locations={locations} />
        </CardBody>
      </Card>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: locations } = await supabase.from("locations").select("*");
  const { data: activities } = await supabase
    .from("activities")
    .select("*")
    .order("activity_date", { ascending: false });

  const activityDates = activities.map(
    (activity: Activity) => new Date(activity.activity_date),
  );
  const currentWeeklyStreak: number = getCurrentWeeklyStreak(activityDates);
  const highestWeeklyStreak: number = getHighestWeeklyStreak(activityDates);

  return {
    props: {
      locations: locations || [],
      activities: activities || [],
      currentWeeklyStreak,
      highestWeeklyStreak,
    },
  };
}

export default ProfilePage;
