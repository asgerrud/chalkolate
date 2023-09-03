import Layout from "~/components/Layout";
import { requireAuth } from "~/lib/requireAuth";
import ChallengeList from "~/components/ChallengeList";

export function ProfilePage() {
  return (
    <Layout>
      <div className="max-w-[480px] w-full px-6">
        <ChallengeList />
      </div>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(() => {
  return { props: {} };
});

export default ProfilePage;
