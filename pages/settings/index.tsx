import Layout from "@/components/Layout";
import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

export const SettingsPage = () => {
  return (
    <Layout>
      <Card w="100%" maxWidth="lg">
        <CardHeader>
          <Heading size="md">Settings</Heading>
        </CardHeader>
        <CardBody>
          <Text></Text>
        </CardBody>
      </Card>
    </Layout>
  )
}

export default SettingsPage
