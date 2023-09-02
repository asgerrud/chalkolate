import Layout from "~/components/Layout";
import { requireAuth } from "~/utils/requireAuth";
import ChallengeList from "~/components/ChallengeList";
import { Stack } from "@chakra-ui/react";

export function ProfilePage() {
  return (
    <Layout>
      <Stack maxW="480px" w="100%" px={6}>
        <ChallengeList />
      </Stack>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(() => {
  return { props: {} };
});

export default ProfilePage;
