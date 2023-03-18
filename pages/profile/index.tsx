import Layout from "@/components/Layout";
import ActivityList from "@/components/ActivityList";
import { Card, CardBody } from "@chakra-ui/card";
import { supabase } from "@/lib/supabase";
import { Activity, ClimbingLocation } from "@/types/database";
import { FC } from "react";

type Props = {
  activities: Activity[];
  locations: ClimbingLocation[];
};

const ProfilePage: FC<Props> = ({ activities, locations }) => {
  return (
    <Layout>
      <Card width="lg">
        <CardBody>
          <ActivityList initialActivities={activities} locations={locations} />
        </CardBody>
      </Card>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: locations } = await supabase.from("locations").select("*");
  const { data: activities } = await supabase.from("activities").select("*");

  const props = {
    locations: locations || [],
    activities: activities || [],
  };

  return { props };
}

export default ProfilePage;
