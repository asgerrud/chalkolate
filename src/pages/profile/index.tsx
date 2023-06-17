import Layout from "~/components/Layout";
import { Stack } from "@chakra-ui/react";
import ChallengeCard from "~/components/profile/challenge-card/ChallengeCard";
import ActivityCard from "~/components/profile/activity-card/ActivityCard";
import { type Activity } from ".prisma/client";

interface ProfilePageProps {
  activities: Activity[];
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  changeSchedules: ChangeSchedule[];
  techniques: Technique[];
  grades: Grade[];
}

export function ProfilePage({
  activities,
  locations,
  climbingZones,
  changeSchedules,
  techniques,
  grades
}: ProfilePageProps) {
  return (
    <Layout>
      <Stack w="100%" direction="column" alignItems="center" spacing={6}>
        <ActivityCard activities={activities} locations={locations} />
        <ChallengeCard
          locations={locations}
          climbingZones={climbingZones}
          changeSchedules={changeSchedules}
          techniques={techniques}
          grades={grades}
        />
      </Stack>
    </Layout>
  );
}

export async function getStaticProps() {
  const locations: ClimbingLocation[] = await fetchLocations();
  const activities: Activity[] = await fetchActivities();
  const climbingZones: ClimbingZone[] = await fetchClimbingZones();
  const changeSchedules: ChangeSchedule[] = await fetchChangeSchedules();
  const techniques: Technique[] = await fetchTechniques();
  const grades: Grade[] = await fetchGrades();

  return {
    props: {
      activities,
      locations,
      climbingZones,
      changeSchedules,
      techniques,
      grades
    }
  };
}

export default ProfilePage;
