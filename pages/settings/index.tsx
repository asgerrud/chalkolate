import Layout from "@/components/Layout";
import { Card, CardBody, CardHeader, Container, Heading, Text } from "@chakra-ui/react";

export const SettingsPage = () => {
  return (
    <Layout>
      <Container>
        <Card>
          <CardHeader>
            <Heading size="md">Settings</Heading>
          </CardHeader>
          <CardBody>
            <Text>Change username very very very very long</Text>
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
};

export default SettingsPage;
