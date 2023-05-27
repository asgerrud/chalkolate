import Layout from "@/components/Layout";
import { Activity, ChangeSchedule, ClimbingLocation, ClimbingZone, Grade, Technique } from "@/types/database";
import { FC } from "react";
import { Stack } from "@chakra-ui/react";
import { fetchLocations } from "@/api/location";
import { fetchActivities } from "@/api/activity";
import { fetchClimbingZones } from "@/api/climbing-zone";
import { fetchTechniques } from "@/api/technique";
import { fetchGrades } from "@/api/grade";
import ChallengeCard from "@/components/pages/profile/ChallengeCard";
import ActivityCard from "@/components/pages/profile/ActivityCard";
import { fetchChangeSchedules } from "@/api/change-schedule";

interface ProfilePageProps {
  activities: Activity[];
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  changeSchedules: ChangeSchedule[];
  techniques: Technique[];
  grades: Grade[];
}

const ProfilePage: FC<ProfilePageProps> = ({
  activities,
  locations,
  climbingZones,
  changeSchedules,
  techniques,
  grades
}) => {
  return (
    <Layout>
      <Stack direction="column">
        <ChallengeCard
          locations={locations}
          climbingZones={climbingZones}
          changeSchedules={changeSchedules}
          techniques={techniques}
          grades={grades}
        />
        <ActivityCard activities={activities} locations={locations} />
      </Stack>
    </Layout>
  );
};

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
