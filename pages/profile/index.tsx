import Layout from "@/components/Layout";
import ActivityList from "@/components/ActivityList";
import { Card, CardBody } from "@chakra-ui/card";

const ProfilePage = () => {
  return (
    <Layout>
      <Card width="lg">
        <CardBody>
          <ActivityList />
        </CardBody>
      </Card>
    </Layout>
  );
};

export default ProfilePage;
