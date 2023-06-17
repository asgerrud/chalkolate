import Layout from "@/components/Layout";
import { Box, Card, CardBody, CardHeader, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { ConfirmButton } from "@/components/common/dialogs/ConfirmButton";
import { EDialogType } from "@/types/enums/EDialogType";

export const SettingsPage = () => {

  const deleteAccount = () => {
    // TODO: implement
  }

  return (
    <Layout>
      <Container>
        <Card>
          <CardHeader>
            <Heading size="md">Settings</Heading>
          </CardHeader>
          <CardBody>
            <Stack spacing={2}>
              <Text>Change image</Text>
              <Text>Change username</Text>
              <Text>Etc...</Text>
              <Box>
                <ConfirmButton type={EDialogType.DELETE} heading="Delete account" description="Are you sure you want to delete your account? This action cannot be reverted" buttonLabel="Delete account" onConfirm={deleteAccount} />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </Layout>
  );
};

export default SettingsPage;
