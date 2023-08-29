import Layout from "~/components/Layout";
import { requireAuth } from "~/utils/requireAuth";
import { NewChallengeForm } from "~/components/NewChallengeForm";

export function ProfilePage() {
  return (
    <Layout>
      <NewChallengeForm />
    </Layout>
  );
}

export const getServerSideProps = requireAuth(() => {
  return { props: {} };
});

export default ProfilePage;
