import Layout from "@/components/Layout";
import ActivityList from "@/components/ActivityList/ActivityList";
import { Card, CardBody } from "@chakra-ui/card";
import { supabase } from "@/lib/supabase";
import { Activity, ClimbingLocation, ClimbingZone, Grade, Technique } from "@/types/database";
import React, { FC } from "react";
import { getCurrentWeeklyStreak, getHighestWeeklyStreak } from "@/utils/streak";
import { Stack } from "@chakra-ui/react";
import StreakStats from "@/components/StreakStats";
import AddChallenge from "@/components/AddChallenge";

type Props = {
  activities: Activity[];
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  techniques: Technique[];
  grades: Grade[];
  currentWeeklyStreak: number;
  highestWeeklyStreak: number;
};

const ProfilePage: FC<Props> = ({
  activities,
  locations,
  climbingZones,
  techniques,
  grades,
  currentWeeklyStreak,
  highestWeeklyStreak
}) => {
  return (
    <Layout>
      <Stack direction="column">
        <Card width="lg">
          <CardBody>
            <AddChallenge locations={locations} climbingZones={climbingZones} techniques={techniques} grades={grades} />
            <StreakStats currentWeeklyStreak={currentWeeklyStreak} highestWeeklyStreak={highestWeeklyStreak} />
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
  const currentWeeklyStreak: number = getCurrentWeeklyStreak(activityDates);
  const highestWeeklyStreak: number = getHighestWeeklyStreak(activityDates);

  return {
    props: {
      locations,
      activities,
      grades,
      climbingZones,
      techniques,
      currentWeeklyStreak,
      highestWeeklyStreak
    }
  };
}

export default ProfilePage;
