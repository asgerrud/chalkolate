import Layout from "~/components/Layout";
import { requireAuth } from "~/lib/requireAuth";
import ChallengeCard from "~/components/profile/challenge-card/ChallengeCard";

export function ProfilePage() {
  return (
    <Layout>
      <ChallengeCard />
    </Layout>
  );
}

export const getServerSideProps = requireAuth(() => {
  return { props: {} };
});

export default ProfilePage;
