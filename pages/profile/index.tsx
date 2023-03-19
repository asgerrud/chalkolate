import Layout from "@/components/Layout";
import ActivityList from "@/components/ActivityList";
import { Card, CardBody } from "@chakra-ui/card";
import { supabase } from "@/lib/supabase";
import { Activity, ClimbingLocation } from "@/types/database";
import { FC } from "react";
import { getCurrentWeeklyStreak } from "@/utils/streak";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";

type Props = {
  activities: Activity[];
  locations: ClimbingLocation[];
};

const ProfilePage: FC<Props> = ({ activities, locations }) => {
  const activityDates = activities.map(
    (activity: Activity) => new Date(activity.activity_date),
  );
  const currentWeeklyStreak: number = getCurrentWeeklyStreak(activityDates);

  return (
    <Layout>
      <Card width="lg">
        <CardBody>
          <Stat>
            <StatLabel>Weekly streak</StatLabel>
            <StatNumber>{currentWeeklyStreak}</StatNumber>
          </Stat>
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

  const props = {
    locations: locations || [],
    activities: activities || [],
  };

  return { props };
}

export default ProfilePage;
