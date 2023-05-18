import Layout from "@/components/Layout";
import ActivityList from "@/components/ActivityList/ActivityList";
import { Card, CardBody } from "@chakra-ui/card";
import { supabase } from "@/lib/supabase";
import { Activity, ClimbingLocation, ClimbingZone, Grade, Technique } from "@/types/database";
import { FC } from "react";
import { getWeeklyStreak } from "@/utils/streak";
import { Stack } from "@chakra-ui/react";
import StreakStats from "@/components/StreakStats";
import AddChallenge from "@/components/AddChallenge";
import { Streak } from "@/utils/types/interfaces/Streak";

interface ProfilePageProps {
  activities: Activity[];
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  techniques: Technique[];
  grades: Grade[];
  weeklyStreak: Streak;
}

const ProfilePage: FC<ProfilePageProps> = ({
  activities,
  locations,
  climbingZones,
  techniques,
  grades,
  weeklyStreak
}) => {
  return (
    <Layout>
      <Stack direction="column">
        <Card width="lg">
          <CardBody>
            <AddChallenge locations={locations} climbingZones={climbingZones} techniques={techniques} grades={grades} />
            <StreakStats currentStreak={weeklyStreak.current} highestStreak={weeklyStreak.highest} unit="week" />
            {/*           <Box bg="orange" py={4} my={4} textAlign="center">
              <span>Show calendar</span>
  </Box>*/}
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
