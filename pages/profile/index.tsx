import Layout from "@/components/Layout";
import { Activity, ClimbingLocation, ClimbingZone, Grade, Technique } from "@/types/database";
import { FC } from "react";
import { Stack } from "@chakra-ui/react";
import { fetchLocations } from "@/api/location";
import { fetchActivities } from "@/api/activity";
import { fetchClimbingZones } from "@/api/climbing-zone";
import { fetchTechniques } from "@/api/technique";
import { fetchGrades } from "@/api/grade";
import ChallengeCard from "@/components/pages/profile/ChallengeCard";
import ActivityCard from "@/components/pages/profile/ActivityCard";

interface ProfilePageProps {
  activities: Activity[];
  locations: ClimbingLocation[];
  climbingZones: ClimbingZone[];
  techniques: Technique[];
  grades: Grade[];
}

const ProfilePage: FC<ProfilePageProps> = ({ activities, locations, climbingZones, techniques, grades }) => {
  return (
    <Layout>
      <Stack direction="column">
        <ChallengeCard climbingZones={climbingZones} locations={locations} techniques={techniques} grades={grades} />
        <ActivityCard activities={activities} locations={locations} />
      </Stack>
    </Layout>
  );
};

export async function getStaticProps() {
  const locations: ClimbingLocation[] = await fetchLocations();
  const activities: Activity[] = await fetchActivities();
  const climbingZones: ClimbingZone[] = await fetchClimbingZones();
  const techniques: Technique[] = await fetchTechniques();
  const grades: Grade[] = await fetchGrades();

  return {
    props: {
      locations,
      activities,
      grades,
      climbingZones,
      techniques
    }
  };
}

export default ProfilePage;
